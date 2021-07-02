export const toggle = (modal) => modal.classList.toggle('active')

export const handleModal = (actionType, modal, event) => {
  const [h2, p, form] = modal.children
  const [, button] = form

  const slug = actionType
  const roomId = document.querySelector('#room-id').dataset.id
  const questionId = event.target.dataset.id

  const modalTitle = h2
  const modalDescription = p
  const modalButton = button

  const text = actionType === 'check' ? 'Marcar como lida' : 'Excluir'
  actionType === 'check' ? modalButton.classList.remove('red') : modalButton.classList.add('red')

  modalTitle.innerHTML = `${text} esta pergunta`
  modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
  modalButton.innerHTML = `Sim, ${text.toLowerCase()}`

  form.setAttribute('action', `/room/${roomId}/${questionId}/${slug}`)
}
