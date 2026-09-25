const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const API_KEY = import.meta.env.VITE_API_KEY || "change-me-in-production";

async function request(path, { method = "GET", body } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const data = await res.json();
      detail = data.detail || JSON.stringify(data);
    } catch {

    }
    throw new Error(detail);
  }

  return res.json();
}

export const api = {
  base: API_BASE,

  predict: (smiles) =>
    request("/api/predict", { method: "POST", body: { smiles } }),

  history: () => request("/api/history"),

  exportCsvUrl: () => `${API_BASE}/api/export-csv`,
  exportXlsxUrl: () => `${API_BASE}/api/export-xlsx`,

  mol2d: (smiles) =>
    request("/api/mol-2d", { method: "POST", body: { smiles } }),

  mol3d: (smiles) =>
    request("/api/mol-3d", { method: "POST", body: { smiles } }),

  async fetchAuthedBlob(path) {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { "X-API-Key": API_KEY },
    });
    if (!res.ok) throw new Error(`Échec du téléchargement (${res.status})`);
    return res.blob();
  },

  async mol3dHtml(htmlUrl) {
    const blob = await this.fetchAuthedBlob(htmlUrl);
    return URL.createObjectURL(blob);
  },

  async downloadFile(path, filename) {
    const blob = await this.fetchAuthedBlob(path);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  },

  apiKey: API_KEY,
};
