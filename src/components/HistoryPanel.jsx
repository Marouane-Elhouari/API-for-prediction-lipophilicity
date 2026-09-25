import { useEffect, useState } from "react";
import { Download, RefreshCw, Loader2 } from "lucide-react";
import { api } from "../api";

export default function HistoryPanel() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.history();
      setRows(data.historique || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleExport(kind) {
    try {
      if (kind === "csv") {
        await api.downloadFile("/api/export-csv", "historique.csv");
      } else {
        await api.downloadFile("/api/export-xlsx", "historique.xlsx");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Historique des prédictions</h1>
          <p className="mt-1 text-sm text-ink/60">{rows.length} entrée(s) enregistrée(s)</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={load}
            className="flex items-center gap-2 rounded-xl border border-ember-100 px-3 py-2 text-sm text-ember-700 hover:bg-ember-50"
          >
            <RefreshCw size={15} />
          </button>
          <button
            onClick={() => handleExport("csv")}
            className="flex items-center gap-2 rounded-xl border border-ember-100 px-3 py-2 text-sm text-ember-700 hover:bg-ember-50"
          >
            <Download size={15} /> CSV
          </button>
          <button
            onClick={() => handleExport("xlsx")}
            className="flex items-center gap-2 rounded-xl bg-ember-500 px-3 py-2 text-sm text-white hover:bg-ember-600"
          >
            <Download size={15} /> XLSX
          </button>
        </div>
      </header>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="overflow-hidden rounded-2xl border border-ember-100 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-ink/50">
            <Loader2 size={18} className="animate-spin" /> Chargement…
          </div>
        ) : rows.length === 0 ? (
          <p className="py-16 text-center text-sm text-ink/50">
            Aucune prédiction pour l'instant — lance-en une depuis l'onglet Prédiction.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-ember-50/70 text-xs uppercase tracking-wide text-ember-700/70">
              <tr>
                <th className="px-5 py-3 font-medium">Horodatage</th>
                <th className="px-5 py-3 font-medium">SMILES</th>
                <th className="px-5 py-3 font-medium">Prédiction</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-t border-ember-50">
                  <td className="px-5 py-3 text-ink/60">{row.timestamp}</td>
                  <td className="px-5 py-3 font-mono text-ink">{row.smiles}</td>
                  <td className="px-5 py-3 font-medium text-ember-700">
                    {Number(row.prediction).toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
