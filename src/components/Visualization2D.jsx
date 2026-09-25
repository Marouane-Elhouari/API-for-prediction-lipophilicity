import { useState } from "react";
import { Image as ImageIcon, Loader2, AlertCircle } from "lucide-react";
import { api } from "../api";

export default function Visualization2D() {
  const [smiles, setSmiles] = useState("c1ccccc1");
  const [imageB64, setImageB64] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!smiles.trim()) return;
    setLoading(true);
    setError(null);
    setImageB64(null);
    try {
      const data = await api.mol2d(smiles.trim());
      setImageB64(data.image_base64);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-ink">Visualisation 2D</h1>
        <p className="mt-1 text-sm text-ink/60">
          Génère la représentation 2D de la molécule à partir de son SMILES.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-ember-100 bg-white p-6 shadow-sm">
        <div className="flex gap-3">
          <input
            value={smiles}
            onChange={(e) => setSmiles(e.target.value)}
            placeholder="ex: c1ccccc1"
            className="flex-1 rounded-xl border border-ember-100 bg-ember-50/40 px-4 py-2.5 font-mono text-sm text-ink outline-none focus:border-ember-400 focus:ring-2 focus:ring-ember-100"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-ember-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-ember-600 disabled:opacity-60"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
            Générer
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-5 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {imageB64 && (
        <div className="mt-6 flex justify-center rounded-2xl border border-ember-100 bg-ember-50/40 p-8">
          <img
            src={`data:image/png;base64,${imageB64}`}
            alt={`Structure 2D de ${smiles}`}
            className="max-h-80 rounded-lg bg-white p-4 shadow-sm"
          />
        </div>
      )}
    </div>
  );
}
