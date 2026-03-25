// Protect page (redirect if not logged in)
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chartInstance = null;

function addExpense() {
    let desc = document.getElementById("desc").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    if (desc === "" || amount === "") {
        alert("Enter all fields");
        return;
    }

    expenses.push({
        desc: desc,
        amount: Number(amount),
        category: category
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";

    displayExpenses();
}

function displayExpenses() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    let total = 0;

    let categoryTotals = {
        Food: 0,
        Travel: 0,
        Shopping: 0,
        Other: 0
    };

    expenses.forEach((exp, index) => {
        total += exp.amount;
        categoryTotals[exp.category] += exp.amount;

        let li = document.createElement("li");
        li.innerHTML = `${exp.desc} - ₹${exp.amount} (${exp.category})
        <button onclick="deleteExpense(${index})">X</button>`;

        list.appendChild(li);
    });

    document.getElementById("total").innerText = total;

    drawChart(categoryTotals);
    aiInsights(categoryTotals, total);
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}

function drawChart(data) {
    const ctx = document.getElementById("chart").getContext("2d");

    // Destroy old chart before creating new one (VERY IMPORTANT)
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: "pie",
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data)
            }]
        }
    });
}

// Simple AI insight
function aiInsights(data, total) {
    let maxCategory = Object.keys(data).reduce((a, b) =>
        data[a] > data[b] ? a : b
    );

    let message = `You are spending most on ${maxCategory}.`;

    if (total > 5000) {
        message += " ⚠️ High spending!";
    }

    document.getElementById("ai").innerText = message;
}

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// Initial load
displayExpenses();