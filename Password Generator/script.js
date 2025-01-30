function generatePassword() {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let length = parseInt(document.getElementById("passwordLength").value);
  length = Math.min(Math.max(length, 4), 64);

  let passText = "";
  if (document.getElementById("lowercase").checked) passText += lowercase;
  if (document.getElementById("uppercase").checked) passText += uppercase;
  if (document.getElementById("numbers").checked) passText += numbers;
  if (document.getElementById("specialChars").checked) passText += special;

  if (!passText) {
    alert("Please select at least one character type!");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * passText.length);
    password += passText[randomIndex];
  }

  document.getElementById("passwordOutput").value = password;
}

function copyPassword() {
  const passwordField = document.getElementById("passwordOutput");
  if (passwordField.value) {
    passwordField.select();
    navigator.clipboard
      .writeText(passwordField.value)
      .then(() => alert("Password copied to clipboard!"));
  }
}
