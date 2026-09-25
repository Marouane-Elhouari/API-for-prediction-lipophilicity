import { FlaskConical, History, Image, Box, ChevronLeft, Atom } from "lucide-react";

const NAV_ITEMS = [
  { id: "predict", label: "Prédiction", icon: FlaskConical },
  { id: "history", label: "Historique", icon: History },
  { id: "viz2d", label: "Visualisation 2D", icon: Image },
  { id: "viz3d", label: "Visualisation 3D", icon: Box },
];

export default function Sidebar({ active, onSelect, collapsed, onToggle }) {
  return (
    <aside
      className={`relative z-10 flex h-screen flex-col border-r border-ember-100 bg-white/90 backdrop-blur-sm transition-all duration-300 ease-out ${
        collapsed ? "w-[76px]" : "w-64"
      }`}
    >
      <div className="flex items-center gap-2 px-5 py-6">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ember-500 text-white">
          <Atom size={18} />
        </div>
        {!collapsed && (
          <div className="leading-tight">
            <p className="text-sm font-semibold text-ink">GNN Predict</p>
            <p className="text-xs text-ember-700/70">AttentiveFP API</p>
          </div>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              title={collapsed ? label : undefined}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-ember-500 text-white shadow-sm shadow-ember-200"
                  : "text-ink/70 hover:bg-ember-50 hover:text-ember-700"
              }`}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>

      <button
        onClick={onToggle}
        className="mx-3 mb-6 flex items-center justify-center gap-2 rounded-xl border border-ember-100 py-2 text-xs font-medium text-ember-700 hover:bg-ember-50"
      >
        <ChevronLeft
          size={16}
          className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
        />
        {!collapsed && "Réduire"}
      </button>
    </aside>
  );
}
