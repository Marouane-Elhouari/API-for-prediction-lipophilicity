
import json
from pathlib import Path

import torch
from torch_geometric.nn import AttentiveFP
from torch_geometric.utils import from_smiles

MODEL_DIR = Path(__file__).resolve().parent.parent / "artifacts"
MODEL_PATH = MODEL_DIR / "best_afp_model.pt"
PARAMS_PATH = MODEL_DIR / "best_params.json"
MODEL_VERSION = "afp-v1"

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

_model: AttentiveFP | None = None


def load_model() -> AttentiveFP:

    global _model
    if _model is not None:
        return _model

    if not PARAMS_PATH.exists() or not MODEL_PATH.exists():
        raise FileNotFoundError(
            f"Expected {MODEL_PATH} and {PARAMS_PATH}. "
            "Copy your trained model + best_params.json from Kaggle first."
        )

    with open(PARAMS_PATH) as f:
        best_params = json.load(f)

    model = AttentiveFP(
        in_channels=9,
        hidden_channels=best_params["hidden_channels"],
        out_channels=1,
        edge_dim=3,
        num_layers=best_params["num_layers"],
        num_timesteps=2,
        dropout=best_params["dropout"],
    ).to(device)

    model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
    model.eval()

    _model = model
    return _model


@torch.no_grad()
def predict_smiles(smiles: str) -> float:

    model = load_model()

    graph = from_smiles(smiles)
    graph.x = graph.x.float().to(device)
    graph.edge_index = graph.edge_index.to(device)
    graph.edge_attr = graph.edge_attr.float().to(device)
    batch = torch.zeros(graph.x.size(0), dtype=torch.long, device=device)

    out = model(graph.x, graph.edge_index, graph.edge_attr, batch)
    return float(out.item())
