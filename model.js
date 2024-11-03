document.addEventListener("DOMContentLoaded", () => {
  const modelButtonsContainer = document.getElementById("model-buttons");
  const selectedBrand = localStorage.getItem("selectedBrand");
  let data = [];

  function loadExcelData() {
    fetch("data.xlsx")
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        data = XLSX.utils.sheet_to_json(worksheet);

        if (data.length > 0) {
          populateModelButtons();
        } else {
          console.error("No data found.");
        }
      })
      .catch(error => {
        console.error("Error loading Excel file:", error);
      });
  }

  function populateModelButtons() {
    const models = data.filter(item => item.brand === selectedBrand);
    models.forEach(model => {
      const button = document.createElement("button");
      button.textContent = model.description;
      button.addEventListener("click", () => {
        localStorage.setItem("selectedModel", JSON.stringify(model));
        window.location.href = "promo.html";
      });
      modelButtonsContainer.appendChild(button);
    });
  }

  loadExcelData();
});

function goBack() {
  window.history.back();
}
