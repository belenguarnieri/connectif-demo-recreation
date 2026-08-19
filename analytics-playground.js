/* Simulador simple de KPIs de e-commerce en base a sliders */

function computeKpis({ traffic, openRate, popupRate, ticket }) {
  const abandonedCarts = Math.round(traffic * 0.06); // 6% del tráfico abandona carrito (supuesto)
  const recoveredCarts = Math.round(abandonedCarts * (openRate / 100) * 0.35);
  const directPurchases = Math.round(traffic * (popupRate / 100));
  const totalPurchases = directPurchases + recoveredCarts;
  const revenue = totalPurchases * ticket;
  return { abandonedCarts, recoveredCarts, directPurchases, totalPurchases, revenue };
}

function renderKpis(kpis) {
  const box = document.getElementById("ap-kpis");
  const cards = [
    { label: "Compras totales / semana", value: kpis.totalPurchases.toLocaleString("es-ES") },
    { label: "Ingresos / semana", value: `€${kpis.revenue.toLocaleString("es-ES")}` },
    { label: "Carritos recuperados", value: `${kpis.recoveredCarts} / ${kpis.abandonedCarts}` },
  ];
  box.innerHTML = cards.map((c) => `
    <div class="card kpi-card">
      <div class="kpi-label">${c.label}</div>
      <div class="kpi-value">${c.value}</div>
    </div>
  `).join("");
}

function renderChart(revenue) {
  const svg = document.getElementById("ap-svg");
  const weeks = 12;
  const points = Array.from({ length: weeks }, (_, i) => {
    const noise = 0.75 + Math.random() * 0.5;
    const trend = 0.7 + (i / weeks) * 0.6;
    return Math.max(10, revenue * noise * trend);
  });
  const path = sparklinePath(points, 400, 110);
  svg.innerHTML = `<path d="${path}" />`;
}

function readInputs() {
  return {
    traffic: Number(document.getElementById("in-traffic").value),
    openRate: Number(document.getElementById("in-open").value),
    popupRate: Number(document.getElementById("in-popup").value),
    ticket: Number(document.getElementById("in-ticket").value),
  };
}

function updateAll() {
  const inputs = readInputs();
  document.getElementById("out-traffic").textContent = inputs.traffic.toLocaleString("es-ES");
  document.getElementById("out-open").textContent = inputs.openRate;
  document.getElementById("out-popup").textContent = inputs.popupRate;
  document.getElementById("out-ticket").textContent = inputs.ticket;

  const kpis = computeKpis(inputs);
  renderKpis(kpis);
  renderChart(kpis.revenue);
}

document.addEventListener("DOMContentLoaded", () => {
  ["in-traffic", "in-open", "in-popup", "in-ticket"].forEach((id) => {
    document.getElementById(id).addEventListener("input", updateAll);
  });
  updateAll();
});
