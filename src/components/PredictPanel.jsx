import { useState } from "react";
import { FlaskConical, Loader2, AlertCircle } from "lucide-react";
import { api } from "../api";

export default function PredictPanel() {
  const [smiles, setSmiles] = useState("CCO");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!smiles.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await api.predict(smiles.trim());
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-ink">Prédiction de propriété</h1>
        <p className="mt-1 text-sm text-ink/60">
          Entrez une chaîne SMILES pour obtenir une prédiction du modèle AttentiveFP.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-ember-100 bg-white p-6 shadow-sm">
        <label htmlFor="smiles" className="mb-2 block text-sm font-medium text-ink">
          SMILES
        </label>
        <div className="flex gap-3">
          <input
            id="smiles"
            value={smiles}
            onChange={(e) => setSmiles(e.target.value)}
            placeholder="ex: CC(=O)Oc1ccccc1C(=O)O"
            className="flex-1 rounded-xl border border-ember-100 bg-ember-50/40 px-4 py-2.5 font-mono text-sm text-ink outline-none focus:border-ember-400 focus:ring-2 focus:ring-ember-100"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-ember-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ember-600 disabled:opacity-60"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <FlaskConical size={16} />}
            Prédire
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-5 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="mt-6 rounded-2xl border border-ember-100 bg-ember-50/60 p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-ember-700/70">Résultat</p>
          <p className="mt-2 font-mono text-sm text-ink/70">{result.smiles}</p>
          <p className="mt-3 text-4xl font-semibold text-ember-700">
            {result.prediction.toFixed(4)}
          </p>
          <p className="mt-2 text-xs text-ink/50">Modèle : {result.model_version}</p>
        </div>
      )}
    </div>
  );
}
