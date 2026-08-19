/* Shared shell: sidebar + Copilot widget.
   Include after icons.js. Call initShell({ base: '', active: 'home' }) on each page. */

const NAV_ITEMS = [
  { key: "home", icon: "home", label: "Inicio", href: "__BASE__index.html" },
  { key: "audience", icon: "users", label: "Audiencia", href: "__BASE__pages/segment-quiz.html" },
  { key: "workflows", icon: "workflow", label: "Workflows", href: "__BASE__pages/workflow-lab.html" },
  { key: "calendar", icon: "calendar", label: "Calendario", href: "__BASE__index.html" },
  { key: "content", icon: "doc", label: "Contenidos", href: "__BASE__pages/popup-designer.html" },
  { key: "ecommerce", icon: "cart", label: "E-commerce", href: "__BASE__index.html" },
  { key: "analytics", icon: "chart", label: "Analítica", href: "__BASE__pages/analytics-playground.html" },
  { key: "settings", icon: "gear", label: "Ajustes", href: "__BASE__index.html" },
];

function initShell({ base = "", active = "home" } = {}) {
  const root = document.getElementById("sidebar-root");
  if (root) {
    const items = NAV_ITEMS.map((item) => {
      const href = item.href.replace("__BASE__", base);
      const isActive = item.key === active ? "active" : "";
      return `<a class="sidebar__item ${isActive}" href="${href}" title="${item.label}">
        ${ICONS[item.icon]}
        <span class="tooltip">${item.label}</span>
      </a>`;
    }).join("");

    root.innerHTML = `
      <img class="sidebar__logo" src="${base}assets/logo.svg" alt="Logo" />
      <nav class="sidebar__nav">${items}</nav>
      <div class="sidebar__footer">
        <div class="sidebar__item" title="Cuenta demo">
          <img src="${base}assets/logo.svg" width="20" height="20" alt="" />
        </div>
      </div>
    `;
  }
  initCopilot(base);
}

/* -------------------- Copilot simulator -------------------- */
const COPILOT_SCRIPTS = {
  default: {
    greeting: "Buenos días 👋 ¿en qué te puedo ayudar?",
    suggestions: [
      { label: "Generar informe de resultados", reply: "Aquí tienes un resumen simulado: tus compras subieron 12% esta semana y el mejor canal fue Email (34% de conversión atribuida). 📈" },
      { label: "¿Cuántos contactos activos hay?", reply: "En esta demo hay <strong>175.000</strong> contactos simulados en la base, de los cuales ~62% están activos en los últimos 90 días." },
      { label: "¿Día con más compras?", reply: "Los <strong>viernes</strong> concentran el 22% de las compras simuladas, seguido del sábado con 19%." },
      { label: "Genera un email de bienvenida", reply: "✉️ Asunto: <em>¡Bienvenido/a a la familia!</em><br>Cuerpo: 'Hola {{nombre}}, gracias por sumarte. Como regalo, tenés 10% OFF en tu primera compra con el código BIENVENIDA10.'" },
    ],
  },
};

function initCopilot(base) {
  if (document.getElementById("copilot-panel")) return; // already injected
  const fab = document.createElement("button");
  fab.className = "copilot-fab";
  fab.id = "copilot-fab";
  fab.innerHTML = ICONS.sparkles;
  document.body.appendChild(fab);

  const panel = document.createElement("div");
  panel.className = "copilot-panel";
  panel.id = "copilot-panel";
  panel.innerHTML = `
    <div class="copilot-panel__header">
      <strong>Copilot (simulado)</strong>
      <button class="copilot-panel__close" id="copilot-close">✕</button>
    </div>
    <div class="copilot-panel__body" id="copilot-body"></div>
    <div class="copilot-panel__input">
      <input id="copilot-input" placeholder="Preguntá lo que quieras (demo)" />
      <button id="copilot-send">➤</button>
    </div>
  `;
  document.body.appendChild(panel);

  const body = panel.querySelector("#copilot-body");

  function addMessage(text, who = "bot") {
    const div = document.createElement("div");
    div.className = `copilot-msg copilot-msg--${who}`;
    div.innerHTML = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function renderIntro() {
    body.innerHTML = "";
    addMessage(COPILOT_SCRIPTS.default.greeting, "bot");
    const wrap = document.createElement("div");
    wrap.className = "copilot-suggestions";
    COPILOT_SCRIPTS.default.suggestions.forEach((s) => {
      const btn = document.createElement("button");
      btn.className = "copilot-suggestion";
      btn.textContent = s.label;
      btn.onclick = () => {
        addMessage(s.label, "user");
        setTimeout(() => addMessage(s.reply, "bot"), 400);
      };
      wrap.appendChild(btn);
    });
    body.appendChild(wrap);
  }

  fab.addEventListener("click", () => {
    panel.classList.toggle("open");
    if (panel.classList.contains("open") && body.children.length === 0) {
      renderIntro();
    }
  });
  panel.querySelector("#copilot-close").addEventListener("click", () => panel.classList.remove("open"));

  const input = panel.querySelector("#copilot-input");
  const send = panel.querySelector("#copilot-send");
  function handleSend() {
    const val = input.value.trim();
    if (!val) return;
    addMessage(val, "user");
    input.value = "";
    setTimeout(() => {
      addMessage("Esto es una simulación sin IA real — pero en la versión completa, Copilot analizaría tu pregunta y respondería usando tus datos. Probá una de las sugerencias 👇", "bot");
    }, 500);
  }
  send.addEventListener("click", handleSend);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") handleSend(); });
}
