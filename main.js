// Show features after clicking main button
document.getElementById("mainBtn").addEventListener("click", () => {
  document.getElementById("featureOptions").classList.remove("hidden");
});

// Section toggling
function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(sec => sec.classList.add("hidden"));
  document.getElementById(sectionId).classList.remove("hidden");
}

// Smart Saving Goal Assistant Logic
function calculateSavingGoal() {
  const target = parseFloat(document.getElementById("targetAmount").value);
  const deadline = parseFloat(document.getElementById("deadline").value);
  const current = parseFloat(document.getElementById("currentSavings").value);
  const goalName = document.getElementById("goalName").value.trim();

  if (isNaN(target) || isNaN(deadline) || isNaN(current) || deadline <= 0 || target <= 0) {
    document.getElementById("savingResult").innerText = "Please enter valid goal details.";
    updateProgress(0);
    return;
  }

  const needed = target - current;
  const monthlySaving = (needed > 0) ? (needed / deadline).toFixed(2) : 0;
  const percentage = Math.min((current / target) * 100, 100);

  updateProgress(percentage);

  const feedback = (needed > 0)
    ? `To reach "${goalName}", save P${monthlySaving} every month.`
    : `Congratulations! You've met your "${goalName}" savings goal.`;

  document.getElementById("savingResult").innerText = feedback;
}

// Update circular progress
function updateProgress(percent) {
  const circle = document.querySelector(".progress-ring__circle");
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = offset;
  document.getElementById("progressText").innerText = `${Math.round(percent)}%`;
}

// Loan Eligibility Logic
function checkLoanEligibility() {
  const income = parseFloat(document.getElementById("monthlyIncome").value);
  const loan = parseFloat(document.getElementById("loanAmount").value);
  const repayment = parseFloat(document.getElementById("monthlyRepayment").value);
  const result = document.getElementById("loanResult");

  if (isNaN(income) || isNaN(loan) || isNaN(repayment) || repayment <= 0) {
    result.innerText = "Please enter all loan details correctly.";
    return;
  }

  const maxRepayment = income * 0.4;
  const months = Math.ceil(loan / repayment);

  if (repayment <= maxRepayment) {
    result.innerText = `✅ Eligible. You can repay in approximately ${months} months.`;
  } else {
    result.innerText = `❌ Not Eligible. Your monthly repayment exceeds 40% of your income.`;
  }
}

// Investment Advisor Logic
function getInvestmentAdvice() {
  const cash = parseFloat(document.getElementById("cashInvest").value);
  const duration = parseInt(document.getElementById("investDuration").value);
  const adviceBox = document.getElementById("investmentAdvice");

  if (isNaN(cash) || isNaN(duration) || cash <= 0 || duration <= 0) {
    adviceBox.innerText = "Please enter valid investment details.";
    return;
  }

  let advice = "";

  if (cash < 500) {
    advice = "💡 Use a high-interest savings account or short-term money market.";
  } else if (cash < 5000) {
    advice = "💡 Consider unit trusts (Stanlib, African Alliance) for flexible growth.";
  } else {
    advice = duration >= 12
      ? "💡 Try long-term options like fixed deposits or government bonds."
      : "💡 Use short-term investments like money market or treasury bills.";
  }

  adviceBox.innerText = advice;
}