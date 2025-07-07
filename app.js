let currentExpression = "";
let history = [];

function updateDisplay() {
  $("#expression").text(currentExpression || "0");
}

function appendValue(val) {
  currentExpression += val;
  updateDisplay();
}

function clearEntry() {
  currentExpression = "";
  updateDisplay();
}

function deleteLast() {
  currentExpression = currentExpression.slice(0, -1);
  updateDisplay();
}

function calculateResult() {
  try {
    let result = eval(currentExpression);
    $("#expression").text(result);
    addHistory(currentExpression + " = " + result);
    currentExpression = result.toString(); // keep result for continued calculations
  } catch {
    $("#expression").text("Error");
    currentExpression = "";
  }
}

function addHistory(entry) {
  history.push(entry);
  const historyHTML = history
    .map(item => `<div class="history-item">${item}</div>`)
    .join("");
  $("#history-list").html(historyHTML);
}

// Handle button clicks
$(".calc-btn").on("click", function () {
  const key = $(this).data("event_key");

  if (!isNaN(key) || "+-*/.".includes(key)) {
    appendValue(key);
  } else if (key === "=") {
    calculateResult();
  } else if (key === "CE") {
    clearEntry();
  } else if (key === "Delete") {
    deleteLast();
  } else if (key === "Num Lock") {
    // no action
  }
});

// Handle keyboard input
$(document).on("keypress", function (e) {
  const key = e.key;
  $(`button[data-event_key="${key}"]`).addClass("active");

  if ((key >= "0" && key <= "9") || "+-*/.".includes(key)) {
    appendValue(key);
  } else if (key === "=" || key === "Enter") {
    calculateResult();
  }
});

// Remove active class on key release
$(document).on("keyup", function (e) {
  const key = e.key;
  $(`button[data-event_key="${key}"]`).removeClass("active");
});

updateDisplay();