/* Mini editor visual de contenido web (popup / slide in / floating bar) */

const state = {
  type: "popup",
  pos: "c",
  title: "¡10% OFF en tu primera compra!",
  body: "Sumate a nuestra newsletter y llevate un cupón exclusivo.",
  button: "Quiero mi descuento",
  bg: "#5e91eb",
  text: "#ffffff",
};

function updatePreview() {
  const el = document.getElementById("popup-preview");
  el.className = `pd-content pd-content--${state.type} pd-pos-${state.pos}`;
  el.style.background = state.bg;
  el.style.color = state.text;
  document.getElementById("preview-title").textContent = state.title;
  document.getElementById("preview-body").textContent = state.body;
  document.getElementById("preview-button").textContent = state.button;
}

function exportHTML() {
  const html = `<!-- Generado con Popup Designer (demo) -->
<div style="position:fixed; z-index:9999; width:300px; background:${state.bg}; color:${state.text};
  border-radius:16px; padding:26px 22px; box-shadow:0 12px 30px rgba(20,30,45,0.25); text-align:center;
  top:50%; left:50%; transform:translate(-50%,-50%); font-family: 'Source Sans Pro', sans-serif;">
  <button onclick="this.parentElement.remove()" style="position:absolute; top:10px; right:12px; background:none; border:none; color:inherit; opacity:.7; cursor:pointer;">✕</button>
  <div style="font-size:18px; font-weight:600; margin-bottom:8px;">${state.title}</div>
  <div style="font-size:13px; opacity:.92; margin-bottom:16px; line-height:1.5;">${state.body}</div>
  <button style="background:#fff; color:#333; border:none; border-radius:8px; padding:10px 18px; font-weight:600; cursor:pointer;">${state.button}</button>
</div>`;
  const output = document.getElementById("export-output");
  output.value = html;
  output.style.display = "block";
  output.select();
  try {
    document.execCommand("copy");
    alert("HTML copiado al portapapeles. También podés verlo/editarlo en el textarea que apareció al final de la página.");
  } catch (e) {
    alert("No se pudo copiar automáticamente, pero el HTML está disponible en el textarea al final de la página.");
  }
  output.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  updatePreview();

  document.querySelectorAll(".pd-type-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pd-type-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.type = btn.dataset.type;
      updatePreview();
    });
  });

  document.querySelectorAll(".pd-pos-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pd-pos-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.pos = btn.dataset.pos;
      updatePreview();
    });
  });

  document.getElementById("input-title").addEventListener("input", (e) => { state.title = e.target.value; updatePreview(); });
  document.getElementById("input-body").addEventListener("input", (e) => { state.body = e.target.value; updatePreview(); });
  document.getElementById("input-button").addEventListener("input", (e) => { state.button = e.target.value; updatePreview(); });
  document.getElementById("input-bgcolor").addEventListener("input", (e) => { state.bg = e.target.value; updatePreview(); });
  document.getElementById("input-textcolor").addEventListener("input", (e) => { state.text = e.target.value; updatePreview(); });

  document.getElementById("export-btn").addEventListener("click", exportHTML);
});
