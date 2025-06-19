const passwordInput = document.querySelector('#password')
const confirmPasswordInput = document.querySelector('#confirmPassword')

confirmPasswordInput.addEventListener('input', () => {
  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity('Passwords do not match')
  } else {
    confirmPasswordInput.setCustomValidity('')
  }
})
