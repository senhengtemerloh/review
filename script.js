document.addEventListener("DOMContentLoaded", () => {
  const brandButtonsContainer = document.getElementById("brand-buttons");
  const modelButtonsContainer = document.getElementById("model-buttons");
  const brandSelection = document.getElementById("brand-selection");
  const modelSelection = document.getElementById("model-selection");
  const promoDetails = document.getElementById("promo-details");

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

        if (data.length > 0) {
          populateBrandButtons();
        } else {
          console.error("No data found in the spreadsheet.");
        }
      })
      .catch(error => {
        console.error("Error loading the Excel file:", error);
      });
  }

  // Function to populate brand buttons
  function populateBrandButtons() {
    const brands = [...new Set(data.map(item => item.brand))];

    brands.forEach(brand => {
      const button = document.createElement("button");
      button.textContent = brand;
      button.addEventListener("click", () => showModels(brand));
      brandButtonsContainer.appendChild(button);
    });
  }

  // Function to show models for the selected brand
  function showModels(brand) {
    modelButtonsContainer.innerHTML = ""; // Clear previous buttons
    brandSelection.classList.add("hidden");
    modelSelection.classList.remove("hidden");

    const models = data.filter(item => item.brand === brand);

    models.forEach(model => {
      const button = document.createElement("button");
      button.textContent = model.description;
      button.addEventListener("click", () => showPromoDetails(model));
      modelButtonsContainer.appendChild(button);
    });
  }

  // Function to show promo details for the selected model
  function showPromoDetails(model) {
    modelSelection.classList.add("hidden");
    promoDetails.classList.remove("hidden");

    descriptionEl.textContent = model.description;
    finalPriceEl.textContent = `RM ${model.finalPrice}`;
    promoInfoBox.textContent = model.promoInfo || "";
    codeInfoEl.textContent = `Code need to be key in: ${model.pacCode} + Instant Save ${model.instantsave}`;
  }

  // Load the Excel data on page load
  loadExcelData();
});
