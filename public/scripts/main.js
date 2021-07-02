'use strict'
import { toggle, handleModal } from './modal.js'

const modalWrapper = document.querySelector('.modal-wrapper')
const modal = document.querySelector('.modal-wrapper .modal')
const checkButtons = document.querySelectorAll('.actions a.check')
const deleteButtons = document.querySelectorAll('.actions a.delete')
const cancelButtonModal = document.getElementById('cancel')
const deleteButtonModal = document.querySelector('.modal button')

const handleToggleButtonModal = (button, actionType) => button.addEventListener('click', (event) => {
  event.preventDefault()

  toggle(modalWrapper)
  handleModal(actionType, modal, event)
})

checkButtons.forEach((button) => handleToggleButtonModal(button, 'check'))

deleteButtons.forEach((button) => handleToggleButtonModal(button, 'delete'))

cancelButtonModal.addEventListener('click', () => toggle(modalWrapper))
deleteButtonModal.addEventListener('click', () => toggle(modalWrapper))
