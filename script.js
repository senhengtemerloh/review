document.addEventListener("DOMContentLoaded", () => {
  const brandButtonsContainer = document.getElementById("brand-buttons");
  const modelSection = document.getElementById("model-section");
  const modelButtonsContainer = document.getElementById("model-buttons");
  const promoSection = document.getElementById("promo-section");

  const descriptionEl = document.getElementById("description");
  const finalPriceEl = document.getElementById("final-price");
  const promoInfoBox = document.getElementById("promo-info-box");
  const codeInfoEl = document.getElementById("code-info");

  let data = [];

  // Function to load and parse the Excel file
  function loadExcelData() {
    fetch("data.xlsx")
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        data = XLSX.utils.sheet_to_json(worksheet);

        populateBrandButtons();
      })
      .catch(error => console.error("Error loading the Excel file:", error));
  }

  // Function to populate brand buttons
  function populateBrandButtons() {
    const brands = [...new Set(data.map(item => item.brand))];

    brands.forEach(brand => {
      const button = document.createElement("button");
      button.className = "brand-button";
      button.textContent = brand;
      button.addEventListener("click", () => showModels(brand));
      brandButtonsContainer.appendChild(button);
    });
  }

  function showModels(brand) {
    modelButtonsContainer.innerHTML = ""; // Clear previous buttons
    modelSection.classList.remove("hidden");
    
    const models = data.filter(item => item.brand === brand);
    
    models.forEach(model => {
      const button = document.createElement("button");
      button.className = "model-button";
      button.textContent = model.modelCode;
      button.addEventListener("click", () => showPromoDetails(model));
      modelButtonsContainer.appendChild(button);
    });
  }

  function showPromoDetails(model) {
    descriptionEl.textContent = model.description;
    finalPriceEl.textContent = `RM ${model.finalPrice}`;
    promoInfoBox.textContent = model.promoInfo || "";
    codeInfoEl.textContent = `Code need to be key in: ${model.pacCode} + Instant Save ${model.instantsave}`;
    
    promoSection.classList.remove("hidden");
  }

  // Load the Excel data on page load
  loadExcelData();
});
