import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MoleculeBackground from "./components/MoleculeBackground";
import PredictPanel from "./components/PredictPanel";
import HistoryPanel from "./components/HistoryPanel";
import Visualization2D from "./components/Visualization2D";
import Visualization3D from "./components/Visualization3D";

const PANELS = {
  predict: PredictPanel,
  history: HistoryPanel,
  viz2d: Visualization2D,
  viz3d: Visualization3D,
};

export default function App() {
  const [active, setActive] = useState("predict");
  const [collapsed, setCollapsed] = useState(false);

  const ActivePanel = PANELS[active];

  return (
    <div className="relative flex h-screen">
      <MoleculeBackground />

      <Sidebar
        active={active}
        onSelect={setActive}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />

      <main className="relative z-10 flex-1 overflow-y-auto px-8 py-10">
        <ActivePanel />
      </main>
    </div>
  );
}
