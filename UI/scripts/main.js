document.querySelector('#year').textContent = new Date().getFullYear()
const deleteModal = document.querySelector('.delete-modal')
const deleteSpan = document.querySelector('.close-delete')
const modal = document.querySelector('.modal')
const span = document.querySelector('.close')


const update = () => {
    modal.style.display = "block"
}
const deleteUpdate = () => deleteModal.style.display = 'block'

span.addEventListener('click', () => {
    modal.style.display = 'none'
})

deleteSpan.addEventListener('click', () => {
    deleteModal.style.display = 'none'
})
