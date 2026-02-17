const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("emailInput");
const formMessage = document.getElementById("formMessage");

if (newsletterForm && emailInput && formMessage) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();

    if (!email || !email.includes("@") || !email.includes(".")) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.className = "mt-2 text-sm text-red-600";
      return;
    }

    formMessage.textContent =
      "Subscribed successfully. You will get the next issue this Friday.";
    formMessage.className = "mt-2 text-sm text-emerald-600";
    newsletterForm.reset();
  });
}
