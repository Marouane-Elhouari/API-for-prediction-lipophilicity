// Decorative, non-interactive backdrop: a few loose "molecule" clusters
// (atoms + bonds) drifting slowly. Pure CSS animation, no JS ticking, so it
// costs nothing at runtime and respects prefers-reduced-motion via Tailwind's
// motion-reduce utilities.

function Molecule({ className, atoms, bonds, size = 220 }) {
  return (
    <svg
      viewBox="0 0 220 220"
      width={size}
      height={size}
      className={`absolute motion-reduce:animate-none ${className}`}
    >
      {bonds.map(([a, b], i) => (
        <line
          key={i}
          x1={atoms[a][0]}
          y1={atoms[a][1]}
          x2={atoms[b][0]}
          y2={atoms[b][1]}
          stroke="#F0650F"
          strokeWidth="2"
          className="animate-pulse-line"
        />
      ))}
      {atoms.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 0 ? 9 : 6}
          fill={i === 0 ? "#DA560A" : "#FB923C"}
          fillOpacity="0.55"
        />
      ))}
    </svg>
  );
}

const ringAtoms = [
  [110, 40],
  [170, 75],
  [170, 145],
  [110, 180],
  [50, 145],
  [50, 75],
];
const ringBonds = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
];

const chainAtoms = [
  [20, 120],
  [70, 90],
  [120, 110],
  [160, 70],
  [200, 90],
];
const chainBonds = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
];

const branchAtoms = [
  [100, 20],
  [100, 80],
  [60, 120],
  [140, 120],
  [140, 170],
];
const branchBonds = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
];

export default function MoleculeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-ember-50 via-white to-white" />

      <Molecule
        atoms={ringAtoms}
        bonds={ringBonds}
        size={260}
        className="-top-10 -left-16 opacity-70 animate-drift"
      />
      <Molecule
        atoms={chainAtoms}
        bonds={chainBonds}
        size={200}
        className="top-1/4 right-[-40px] opacity-60 animate-drift-slow"
      />
      <Molecule
        atoms={branchAtoms}
        bonds={branchBonds}
        size={180}
        className="bottom-10 left-1/3 opacity-50 animate-drift-slower"
      />
      <Molecule
        atoms={ringAtoms}
        bonds={ringBonds}
        size={150}
        className="bottom-[-30px] right-1/4 opacity-40 animate-drift-slow"
      />
      <Molecule
        atoms={chainAtoms}
        bonds={chainBonds}
        size={140}
        className="top-10 right-1/3 opacity-30 animate-drift"
      />
    </div>
  );
}
