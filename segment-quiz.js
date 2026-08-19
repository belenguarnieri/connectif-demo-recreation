/* Quiz educativo sobre segmentación de audiencias y marketing automation */

const QUESTIONS = [
  {
    q: "Querés armar una lista con los 20 asistentes a un evento presencial, cargados a mano desde un Excel. ¿Qué tipo de segmento usarías?",
    options: ["Segmento Estático", "Segmento Dinámico", "Segmento Dinámico Plus"],
    correct: 0,
    explain: "Correcto: un segmento Estático te permite asignar contactos manualmente (uno por uno o por importación), ideal para listas fijas que no dependen de reglas automáticas.",
  },
  {
    q: "Querés un segmento que incluya automáticamente a todo contacto cuyo campo 'País' sea 'Argentina'. ¿Qué tipo de segmento es?",
    options: ["Segmento Estático", "Segmento Dinámico", "Segmento Dinámico Plus"],
    correct: 1,
    explain: "Correcto: un segmento Dinámico se actualiza solo en base a condiciones sobre campos del contacto (datos demográficos/CRM).",
  },
  {
    q: "Querés un segmento de 'contactos que visitaron zapatillas running 3+ veces en los últimos 7 días Y tienen el campo VIP = true'. ¿Qué tipo de segmento necesitás?",
    options: ["Segmento Estático", "Segmento Dinámico", "Segmento Dinámico Plus"],
    correct: 2,
    explain: "Correcto: cuando combinás comportamiento (navegación, compras) con campos del contacto, necesitás Dinámico Plus, el nivel más avanzado.",
  },
  {
    q: "En un workflow, ¿qué nodo usarías para pausar el flujo 24 horas antes de continuar?",
    options: ["Un disparador", "Una acción de tipo 'Esperar'", "Una condición"],
    correct: 1,
    explain: "Correcto: las acciones de 'Sistema' incluyen 'Esperar', que detiene el flujo un tiempo determinado antes de seguir a la siguiente acción.",
  },
  {
    q: "¿Cuál de estos es un disparador (trigger), y no una acción?",
    options: ["Enviar email", "Al abandonar carrito", "Asignar cupón"],
    correct: 1,
    explain: "Correcto: 'Al abandonar carrito' inicia el workflow (disparador). 'Enviar email' y 'Asignar cupón' son acciones que el workflow ejecuta después.",
  },
  {
    q: "Un popup que se debe testear en dos versiones para ver cuál convierte más, ¿qué herramienta del sistema usarías dentro del workflow?",
    options: ["Test A/B/X", "Segmento Dinámico Plus", "Cuenta atrás"],
    correct: 0,
    explain: "Correcto: los nodos 'Iniciar Test A/B/X' y 'Evaluar rama A/B/X' permiten repartir tráfico entre variantes y medir cuál funciona mejor.",
  },
  {
    q: "¿Qué tipo de contenido web NO ocupa toda la pantalla ni se superpone al contenido, sino que se inserta dentro del layout de la página?",
    options: ["Full Screen", "Inline", "Floating Bar"],
    correct: 1,
    explain: "Correcto: 'Inline' se inserta como un bloque más dentro del contenido de la página (por ejemplo, un banner dentro de la home), a diferencia de Popup/Full Screen/Floating Bar que flotan sobre la página.",
  },
  {
    q: "¿Para qué sirve el 'Kit de marca' dentro de una plataforma de marketing automation con IA?",
    options: [
      "Para facturar la suscripción",
      "Para que la IA genere diseños (emails, popups) consistentes con los colores/tipografía/logo de tu marca",
      "Para exportar contactos a Excel",
    ],
    correct: 1,
    explain: "Correcto: el Kit de marca guarda los tokens visuales (logo, color, tipografía) para que las generaciones automáticas por IA respeten la identidad visual del negocio.",
  },
];

let qIndex = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const container = document.getElementById("quiz-container");
  if (qIndex >= QUESTIONS.length) {
    container.innerHTML = `
      <div class="quiz-final">
        <div style="font-size:40px;">🏆</div>
        <div class="big-score">${score} / ${QUESTIONS.length}</div>
        <p style="color:var(--color-text-body); margin: 12px 0 20px;">
          ${score === QUESTIONS.length ? "¡Puntaje perfecto! Dominás la lógica de segmentación." : score >= QUESTIONS.length / 2 ? "¡Buen resultado! Ya entendés lo esencial de segmentos y workflows." : "Vale la pena repasar los conceptos — ¡probá de nuevo!"}
        </p>
        <button class="btn btn--primary" id="restart-btn">Repetir quiz</button>
      </div>
    `;
    document.getElementById("restart-btn").addEventListener("click", () => {
      qIndex = 0; score = 0; answered = false;
      document.getElementById("score-pill").textContent = `Puntaje: 0`;
      renderQuestion();
    });
    return;
  }

  const item = QUESTIONS[qIndex];
  answered = false;
  container.innerHTML = `
    <div class="quiz-progress">Pregunta ${qIndex + 1} de ${QUESTIONS.length}</div>
    <div class="quiz-question">${item.q}</div>
    <div class="quiz-options" id="quiz-options"></div>
    <div class="quiz-explain" id="quiz-explain">${item.explain}</div>
    <button class="btn btn--primary" id="next-q-btn" style="display:none;">Siguiente →</button>
  `;

  const optsWrap = document.getElementById("quiz-options");
  item.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = opt;
    btn.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      const correct = i === item.correct;
      btn.classList.add(correct ? "correct" : "incorrect");
      if (!correct) {
        optsWrap.children[item.correct].classList.add("correct");
      } else {
        score++;
        document.getElementById("score-pill").textContent = `Puntaje: ${score}`;
      }
      document.getElementById("quiz-explain").style.display = "block";
      document.getElementById("next-q-btn").style.display = "inline-flex";
    });
    optsWrap.appendChild(btn);
  });

  document.getElementById("next-q-btn").addEventListener("click", () => {
    qIndex++;
    renderQuestion();
  });
}

document.addEventListener("DOMContentLoaded", renderQuestion);
