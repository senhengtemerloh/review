document.addEventListener("DOMContentLoaded", () => {
  const model = JSON.parse(localStorage.getItem("selectedModel"));

  const rcpEl = document.getElementById("rcp");
  const finalPriceEl = document.getElementById("final-price");
  const promoInfoBox = document.getElementById("promo-info-box");
  const codeInfoEl = document.getElementById("code-info");

  if (model) {
    rcpEl.textContent = `Before RM ${model.rcp}`;
    finalPriceEl.textContent = `RM ${model.finalPrice}`;
    promoInfoBox.textContent = model.promoInfo || "";

    const codeInfo = model.pacCode ? 
      `Code need to be key in: ${model.pacCode} + Instant Save ${model.instantsave}` :
      model.instantsave ? 
      `Instant Save ${model.instantsave}` : "";

    codeInfoEl.textContent = codeInfo;
  } else {
    console.error("No model data found.");
  }
});

function goBack() {
  window.history.back();
}

function goHome() {
  window.location.href = "index.html";
}
