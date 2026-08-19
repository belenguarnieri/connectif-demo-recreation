/* Juego "Arma tu Workflow": drag & drop de nodos tipo Connectif */

const NODE_LIB = {
  trg_cart_abandon: { label: "Al abandonar carrito", cls: "trigger", kind: "Disparador" },
  trg_segment_enter: { label: "Al entrar a segmento 'Dormidos'", cls: "trigger", kind: "Disparador" },
  trg_purchase: { label: "Al comprar", cls: "trigger", kind: "Disparador" },
  trg_signup: { label: "Al registrarse en la web", cls: "trigger", kind: "Disparador" },

  wait_1h: { label: "Esperar 1 hora", cls: "system", kind: "Sistema" },
  wait_1d: { label: "Esperar 1 día", cls: "system", kind: "Sistema" },
  wait_7d: { label: "Esperar 7 días", cls: "system", kind: "Sistema" },

  cond_opened_email: { label: "¿Abrió el último email?", cls: "condition", kind: "Condición" },
  cond_has_bought: { label: "¿Ya compró antes?", cls: "condition", kind: "Condición" },

  act_send_email_recover: { label: "Enviar email: recuperar carrito", cls: "email", kind: "Acción" },
  act_send_email_welcome: { label: "Enviar email: bienvenida + cupón", cls: "email", kind: "Acción" },
  act_send_email_birthday: { label: "Enviar email: cupón de cumpleaños", cls: "email", kind: "Acción" },
  act_show_popup: { label: "Mostrar popup con descuento", cls: "web", kind: "Acción" },
  act_send_push: { label: "Enviar notificación push", cls: "web", kind: "Acción" },
  act_assign_coupon: { label: "Asignar cupón", cls: "ecommerce", kind: "Acción" },
  act_add_segment: { label: "Añadir a segmento VIP", cls: "ecommerce", kind: "Acción" },
};

const CHALLENGES = [
  {
    goal: "🎯 Objetivo: Recuperar un carrito abandonado",
    desc: "Cuando alguien abandona el carrito, esperá 1 hora y enviale un email para recuperarlo.",
    correct: ["trg_cart_abandon", "wait_1h", "act_send_email_recover"],
    distractors: ["trg_purchase", "act_send_email_birthday", "wait_7d"],
  },
  {
    goal: "🎯 Objetivo: Dar la bienvenida a nuevos suscriptores",
    desc: "Cuando alguien se registra en la web, enviale un email de bienvenida con cupón y luego asignale el cupón.",
    correct: ["trg_signup", "act_send_email_welcome", "act_assign_coupon"],
    distractors: ["trg_cart_abandon", "wait_7d", "act_send_push"],
  },
  {
    goal: "🎯 Objetivo: Reactivar clientes dormidos",
    desc: "Al entrar al segmento de dormidos, esperá 7 días, comprobá si abrió el email, y si no lo abrió, mostrale un popup con descuento.",
    correct: ["trg_segment_enter", "wait_7d", "cond_opened_email", "act_show_popup"],
    distractors: ["trg_purchase", "act_send_email_recover", "wait_1h"],
  },
  {
    goal: "🎯 Objetivo: Premiar a quien acaba de comprar",
    desc: "Cuando compra, sumalo al segmento VIP y enviale una notificación push de agradecimiento.",
    correct: ["trg_purchase", "act_add_segment", "act_send_push"],
    distractors: ["trg_signup", "wait_1d", "act_send_email_recover"],
  },
];

let currentChallenge = 0;
let placed = [];
let score = 0;
let usedIds = new Set();

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function nodeHTML(id, extraClass = "") {
  const n = NODE_LIB[id];
  return `<div class="wf-node wf-node--${n.cls} ${extraClass}" draggable="true" data-node-id="${id}">
    <span class="wf-node__icon">${n.kind === "Disparador" ? "⚡" : n.kind === "Condición" ? "🔀" : n.kind === "Sistema" ? "⏱" : "▶"}</span>
    ${n.label}
  </div>`;
}

function renderChallenge(index) {
  const ch = CHALLENGES[index];
  document.getElementById("challenge-goal").textContent = ch.goal;
  document.getElementById("challenge-desc").textContent = ch.desc;

  placed = new Array(ch.correct.length).fill(null);
  usedIds = new Set();

  const track = document.getElementById("drop-track");
  track.innerHTML = ch.correct
    .map((_, i) => {
      const arrow = i < ch.correct.length - 1 ? `<span class="track-arrow">→</span>` : "";
      return `<div class="drop-slot" data-slot="${i}">Soltá acá</div>${arrow}`;
    })
    .join("");

  const palette = shuffle([...ch.correct, ...ch.distractors]);
  document.getElementById("node-palette").innerHTML = palette.map((id) => nodeHTML(id)).join("");

  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").className = "";
  document.getElementById("next-btn").style.display = "none";

  attachDnD();
}

function attachDnD() {
  document.querySelectorAll(".node-palette .wf-node").forEach((el) => {
    el.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", el.dataset.nodeId);
    });
  });

  document.querySelectorAll(".drop-slot").forEach((slot) => {
    slot.addEventListener("dragover", (e) => e.preventDefault());
    slot.addEventListener("drop", (e) => {
      e.preventDefault();
      const nodeId = e.dataTransfer.getData("text/plain");
      if (!nodeId || usedIds.has(nodeId)) return;
      const slotIndex = Number(slot.dataset.slot);
      if (placed[slotIndex]) return; // already filled

      placed[slotIndex] = nodeId;
      usedIds.add(nodeId);
      slot.classList.add("filled");
      slot.innerHTML = nodeHTML(nodeId, "placed");

      const paletteItem = document.querySelector(`.node-palette [data-node-id="${nodeId}"]`);
      if (paletteItem) paletteItem.style.opacity = "0.25";

      slot.onclick = () => {
        placed[slotIndex] = null;
        usedIds.delete(nodeId);
        slot.classList.remove("filled");
        slot.textContent = "Soltá acá";
        slot.onclick = null;
        if (paletteItem) paletteItem.style.opacity = "1";
      };
    });
  });
}

function checkAnswer() {
  const ch = CHALLENGES[currentChallenge];
  const feedback = document.getElementById("feedback");

  if (placed.some((p) => p === null)) {
    feedback.textContent = "Completá todos los pasos del flujo antes de comprobar 🙂";
    feedback.className = "";
    return;
  }

  const isCorrect = placed.every((id, i) => id === ch.correct[i]);
  document.querySelectorAll(".drop-slot").forEach((slot, i) => {
    slot.querySelector(".wf-node")?.classList.toggle("correct", placed[i] === ch.correct[i]);
    slot.querySelector(".wf-node")?.classList.toggle("incorrect", placed[i] !== ch.correct[i]);
  });

  if (isCorrect) {
    score += 10;
    document.getElementById("score-pill").textContent = `Puntaje: ${score}`;
    feedback.textContent = "¡Correcto! 🎉 Ese es el flujo ideal para este objetivo.";
    feedback.className = "ok";
    document.getElementById("next-btn").style.display = "inline-flex";
  } else {
    feedback.textContent = "Todavía no es el orden correcto. Fijate qué nodo va primero según el objetivo 🤔";
    feedback.className = "bad";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderChallenge(currentChallenge);
  document.getElementById("check-btn").addEventListener("click", checkAnswer);
  document.getElementById("reset-btn").addEventListener("click", () => renderChallenge(currentChallenge));
  document.getElementById("next-btn").addEventListener("click", () => {
    currentChallenge = (currentChallenge + 1) % CHALLENGES.length;
    renderChallenge(currentChallenge);
  });
});
