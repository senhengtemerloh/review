document.addEventListener("DOMContentLoaded", () => {
  const brandButtonsContainer = document.getElementById("brand-buttons");
  let data = [];

  function loadExcelData() {
    fetch("data.xlsx")
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        data = XLSX.utils.sheet_to_json(worksheet);

        if (data.length > 0) {
          populateBrandButtons();
        } else {
          console.error("No data found.");
        }
      })
      .catch(error => {
        console.error("Error loading Excel file:", error);
      });
  }

  function populateBrandButtons() {
    const brands = [...new Set(data.map(item => item.brand))];
    brands.forEach(brand => {
      const button = document.createElement("button");
      button.textContent = brand;
      button.addEventListener("click", () => {
        localStorage.setItem("selectedBrand", brand);
        window.location.href = "model.html";
      });
      brandButtonsContainer.appendChild(button);
    });
  }

  loadExcelData();
});
