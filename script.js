const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const downloadBtn = document.getElementById("downloadBtn");

let expenses = []; // Store expenses in an array

// Add expense and display in the table
expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const amount = document.getElementById("amount").value;

  if (description && category && !isNaN(amount)) {
    // Create a new row in the table
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
            <td>${description}</td>
            <td>${category}</td>
            <td>${amount}</td>
        `;
    expenseList.appendChild(newRow);

    // Add expense to the array
    expenses.push({ description, category, amount });

    // Clear the form fields after submission
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";
    document.getElementById("amount").value = "";
  } else {
    alert("Please fill out all fields with valid data");
  }
});

// Convert the expenses to CSV format and trigger download
downloadBtn.addEventListener("click", function () {
  if (expenses.length === 0) {
    alert("No expenses to download!");
    return;
  }

  // Convert array of objects (expenses) to CSV string
  const csvContent =
    "Description,Category,Amount\n" +
    expenses
      .map(
        (expense) =>
          `${expense.description},${expense.category},${expense.amount}`
      )
      .join("\n");

  // Create a Blob with CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // Create a temporary link to trigger download
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "expenses.csv");
  link.style.display = "none";

  // Append link to body and trigger click
  document.body.appendChild(link);
  link.click();

  // Cleanup: remove the link after download
  document.body.removeChild(link);
});
