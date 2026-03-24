const loginCard = document.querySelector(".login-card");
const loginForm = document.querySelector(".login-form");
const usernameInput = loginForm?.querySelector('input[name="studentnummer"]');
const passwordInput = loginForm?.querySelector('input[name="wachtwoord"]');
const loginError = loginForm?.querySelector(".login-error");

if (loginCard) {
  const backgrounds = [
    "images/mensenachtergrond_login.png",
    "images/plantenachtergrond_login.jpg",
    "images/rozenachtergrond_login.png",
    "images/landrostachtergrond_login.png"
  ];

  const randomImage = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  const resolvedUrl = new URL(randomImage, window.location.href).href;
  const img = new Image();

  img.onload = () => {
    loginCard.style.backgroundImage =
      `linear-gradient(105deg, #f0a700 0 18%, transparent 18%), ` +
      `linear-gradient(285deg, #f3cc11 0 14%, transparent 14%), ` +
      `url("${resolvedUrl}")`;
  };

  img.onerror = () => {
    console.error("Achtergrondafbeelding kon niet geladen worden:", resolvedUrl);
  };

  img.src = resolvedUrl;
}

if (loginForm && usernameInput && passwordInput) {
  const clearInputErrors = () => {
    usernameInput.classList.remove("has-error");
    passwordInput.classList.remove("has-error");
  };

  const hideError = () => {
    loginError?.classList.remove("is-visible");
  };

  const showError = () => {
    loginError?.classList.add("is-visible");
  };

  usernameInput.addEventListener("input", () => {
    usernameInput.classList.remove("has-error");
    hideError();
  });

  passwordInput.addEventListener("input", () => {
    passwordInput.classList.remove("has-error");
    hideError();
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const validUsername = "1200521";
    const validPassword = "Welkom01!";
    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value;

    clearInputErrors();

    if (enteredUsername.length === 0) {
      showError();
      usernameInput.classList.add("has-error");
      usernameInput.focus();
      return;
    }

    if (enteredPassword.trim().length === 0) {
      showError();
      passwordInput.classList.add("has-error");
      passwordInput.focus();
      return;
    }

    if (enteredUsername !== validUsername || enteredPassword !== validPassword) {
      showError();
      usernameInput.classList.add("has-error");
      passwordInput.classList.add("has-error");
      passwordInput.focus();
      return;
    }

    hideError();
    window.location.href = "index.html";
  });
}
