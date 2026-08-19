/* Generadores simples de datos ficticios — sin dependencias externas.
   Nunca usar datos reales de clientes: todo acá es inventado a propósito. */

const FAKE_FIRST_NAMES = ["Sofía", "Mateo", "Valentina", "Lucas", "Martina", "Benjamín", "Emma", "Thiago", "Isabella", "Joaquín"];
const FAKE_LAST_NAMES = ["Gómez", "Fernández", "Rodríguez", "López", "Díaz", "Romero", "Alvarez", "Torres", "Ruiz", "Flores"];
const FAKE_PRODUCTS = ["Vestido Floral", "Campera Denim", "Zapatillas Urban", "Remera Básica", "Pantalón Cargo", "Buzo Oversize", "Pollera Plisada", "Camisa Lino"];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function fakeName() {
  return `${pick(FAKE_FIRST_NAMES)} ${pick(FAKE_LAST_NAMES)}`;
}

function fakeContact(i) {
  const name = fakeName();
  return {
    id: i,
    name,
    email: `${name.toLowerCase().replace(/\s+/g, ".")}${i}@demo-mail.test`,
    status: Math.random() > 0.15 ? "Activo" : "Inactivo",
    createdDaysAgo: randInt(0, 400),
  };
}

function fakeKpis(seed = 1) {
  const base = 2000 + seed * 137;
  return {
    purchases: randInt(20, 60),
    purchaseAmount: (base * (0.8 + Math.random() * 0.6)).toFixed(0),
    avgTicket: (base / randInt(20, 40)).toFixed(2),
    recoveredCarts: randInt(2, 15),
  };
}

function sparklinePath(points, width = 100, height = 30) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);
  return points
    .map((p, i) => {
      const x = i * step;
      const y = height - ((p - min) / range) * height;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}
