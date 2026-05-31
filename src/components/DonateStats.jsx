import { useEffect, useState } from "react";

const statsData = [
  { value: 25, suffix: "+", label: "YEARS" },
  { value: 8, suffix: "M+", label: "VISITORS ANNUALLY" },
  { value: 245, suffix: "K+", label: "CHARITIES RATED" },
  { value: 338, suffix: "M+", label: "DONATED VIA OUR GIVING BASKET" },
];

export default function DonateStats() {
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const duration = 1200;
    const steps = 60;
    const interval = duration / steps;

    let frame = 0;

    const timer = setInterval(() => {
      frame++;

      setCounts(
        statsData.map((stat) =>
          Math.min(stat.value, Math.floor((stat.value * frame) / steps))
        )
      );

      if (frame >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="cn-stats-section">
      <div className="cn-stats-grid">
        {statsData.map((stat, i) => (
          <div key={i} className="cn-stat-card">
            <h3>
              {counts[i]}
              {stat.suffix}
            </h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
