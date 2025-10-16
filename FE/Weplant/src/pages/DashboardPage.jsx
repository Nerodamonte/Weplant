import React from "react";

/** ---------- Small helpers ---------- */
const Card = ({ className = "", children }) => (
  <div
    className={`bg-white rounded-2xl shadow-sm border border-slate-100 ${className}`}
  >
    {children}
  </div>
);

const StatCard = ({ title, value, delta, positive = true, icon }) => (
  <Card className="p-5 flex items-center gap-4">
    <div className="h-11 w-11 rounded-xl grid place-items-center bg-slate-50">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-xs text-slate-500">{title}</p>
      <p className="text-2xl font-semibold text-slate-900 mt-1">{value}</p>
      <p
        className={`text-xs mt-1 ${
          positive ? "text-emerald-600" : "text-rose-600"
        }`}
      >
        {positive ? "+" : ""}
        {delta} from last month
      </p>
    </div>
  </Card>
);

/** ---------- Donut progress (SVG) ---------- */
function Donut({ percent = 75, size = 120, stroke = 10, label = "" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;
  return (
    <div className="relative grid place-items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#E5E7EB"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#3B82F6"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-xl font-semibold text-slate-900">{percent}%</div>
        <div className="text-xs text-slate-500">{label}</div>
      </div>
    </div>
  );
}

/** ---------- Line chart (SVG) ---------- */
function LineChart({ points = [], minY = 0, maxY = 600 }) {
  // size
  const W = 900;
  const H = 340;
  const pad = 32;

  if (!points.length) return null;

  const xs = points.map(
    (_, i) => pad + (i * (W - pad * 2)) / (points.length - 1)
  );
  const ys = points.map((v) => {
    const t = (v - minY) / (maxY - minY);
    return H - pad - t * (H - pad * 2);
  });

  const d = xs
    .map((x, i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${ys[i].toFixed(1)}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[320px]">
      {/* grid lines */}
      {[0, 1, 2, 3, 4].map((i) => {
        const y = pad + (i * (H - pad * 2)) / 4;
        return (
          <line
            key={i}
            x1={pad}
            x2={W - pad}
            y1={y}
            y2={y}
            stroke="#EEF2F7"
            strokeWidth="1"
          />
        );
      })}
      {/* line */}
      <path d={d} fill="none" stroke="#3B82F6" strokeWidth="3" />
      {/* area highlight (optional, subtle) */}
      <path
        d={`${d} L ${W - pad} ${H - pad} L ${pad} ${H - pad} Z`}
        fill="url(#grad)"
        opacity="0.18"
      />
      <defs>
        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** ---------- Product item ---------- */
const ProductItem = ({ img, name, sold, change }) => {
  const positive = change >= 0;
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <img
          src={img}
          alt={name}
          className="h-9 w-9 rounded-md object-cover border border-slate-200"
        />
        <div>
          <p className="text-sm font-medium text-slate-800">{name}</p>
          <p className="text-xs text-slate-500">
            Sold: {sold.toLocaleString()}
          </p>
        </div>
      </div>
      <span
        className={`text-xs font-semibold rounded-full px-2.5 py-1 ${
          positive
            ? "text-emerald-700 bg-emerald-50"
            : "text-rose-700 bg-rose-50"
        }`}
      >
        {positive ? "+" : ""}
        {change}%
      </span>
    </div>
  );
};

/** ---------- Main page ---------- */
export default function DashboardPage() {
  // mock data
  const chartData = [
    210, 320, 300, 360, 430, 360, 470, 420, 510, 340, 360, 580,
  ];
  const products = [
    {
      name: "Maneki Neko Poster",
      sold: 1249,
      change: 15.2,
      img: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Echoes Necklace",
      sold: 1145,
      change: 13.9,
      img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Spiky Ring",
      sold: 1073,
      change: 9.5,
      img: "https://images.unsplash.com/photo-1585386959984-a41552231658?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Pastel Petals Poster",
      sold: 1022,
      change: 2.3,
      img: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=200&auto=format&fit=crop",
    },
    {
      name: "Il Limone",
      sold: 992,
      change: -0.7,
      img: "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-5 pt-6 pb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
          <button className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border bg-white hover:bg-slate-50">
            Monthly
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path
                d="M6 8l4 4 4-4"
                stroke="#475569"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: main content */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-5">
          {/* Stat row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <StatCard
              title="Total profit"
              value="$82,373.21"
              delta="3.4%"
              positive
              icon={<span className="text-slate-700">💰</span>}
            />
            <StatCard
              title="Total order"
              value="7,234"
              delta="2.8%"
              positive={false}
              icon={<span className="text-slate-700">🧾</span>}
            />
            <StatCard
              title="Impression"
              value="3.1M"
              delta="4.6%"
              positive
              icon={<span className="text-slate-700">👁️</span>}
            />
          </div>

          {/* Line chart card */}
          <Card className="p-4">
            <LineChart points={chartData} minY={180} maxY={630} />
            {/* x axis labels */}
            <div className="px-2 pb-2 grid grid-cols-12 text-[11px] text-slate-500">
              {[
                "01 Jun",
                "02 Jun",
                "03 Jun",
                "04 Jun",
                "05 Jun",
                "06 Jun",
                "07 Jun",
                "08 Jun",
                "09 Jun",
                "10 Jun",
                "11 Jun",
                "12 Jun",
              ].map((d) => (
                <div key={d} className="text-center">
                  {d}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: sidebar */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-5">
          {/* Sales target */}
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">
                Sales target
              </p>
              <button className="inline-flex items-center gap-2 text-xs px-2 py-1 rounded-lg border bg-white hover:bg-slate-50">
                Monthly
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M6 8l4 4 4-4"
                    stroke="#475569"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div>
                <p className="text-2xl font-semibold text-slate-900">1.3K</p>
                <p className="text-xs text-slate-500">/ 1.8K Units</p>
                <p className="text-xs text-slate-500 mt-1">
                  Made this month year
                </p>
              </div>
              <div className="justify-self-end">
                <Donut percent={75} label="progress" />
              </div>
            </div>
          </Card>

          {/* Top products */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-slate-900">
                Top product
              </p>
              <button className="text-xs px-2 py-1 rounded-lg border bg-white hover:bg-slate-50">
                View all
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {products.map((p) => (
                <ProductItem key={p.name} {...p} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
