import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

// Businesses we've helped grow, by year. Update as real figures come in.
const GROWTH_DATA = [
  { year: "2021", businesses: 6 },
  { year: "2022", businesses: 14 },
  { year: "2023", businesses: 23 },
  { year: "2024", businesses: 34 },
  { year: "2025", businesses: 44 },
  { year: "2026", businesses: 50 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-[#111111] border border-[#FED500]/40 rounded-lg px-4 py-2 shadow-lg">
      <p className="text-white text-sm font-semibold">{label}</p>
      <p className="text-[#FED500] text-xs mt-1">{payload[0].value} businesses grown</p>
    </div>
  );
};

const GrowthChart = () => (
  <div id="growth" className="scroll-mt-24 py-16 md:py-24 px-6 bg-[#090909]">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-[#FED500] text-xs font-semibold tracking-[0.2em] uppercase mb-4 inline-block">
          03 — Impact
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Businesses we've helped grow
        </h2>
        <p className="text-[#a0a0a0] text-base md:text-lg max-w-2xl mx-auto">
          Year over year, more founders and teams have trusted us to build the software behind their growth.
        </p>
      </div>

      <div className="bg-[#111111] border border-[#222222] rounded-xl p-4 md:p-8">
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={GROWTH_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#222222" vertical={false} />
            <XAxis dataKey="year" stroke="#666666" tick={{ fill: "#a0a0a0", fontSize: 12 }} axisLine={{ stroke: "#222222" }} tickLine={false} />
            <YAxis stroke="#666666" tick={{ fill: "#a0a0a0", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(254,213,0,0.06)" }} />
            <Bar dataKey="businesses" radius={[6, 6, 0, 0]} maxBarSize={56}>
              {GROWTH_DATA.map((entry, index) => (
                <Cell
                  key={entry.year}
                  fill={index === GROWTH_DATA.length - 1 ? "#FED500" : "#3a3210"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default GrowthChart;
