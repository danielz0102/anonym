const deleteForms = document.querySelectorAll('.delete-message-form')
const confirmModal = document.querySelector('#confirmDeleteDlg')

deleteForms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    confirmModal.showModal()
    confirmModal.classList.remove('hidden')
    confirmModal
      .querySelector('#confirmDeleteBtn')
      .addEventListener('click', () => {
        console.log('Deleting message...')
        form.submit()
      })
  })
})

confirmModal.addEventListener('close', () => {
  confirmModal.classList.add('hidden')
})
