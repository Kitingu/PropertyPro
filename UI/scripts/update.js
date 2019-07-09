const deleteModal = document.querySelector('.delete-modal')
const deleteSpan = document.querySelector('.close-delete')

const modal = document.querySelector('.modal')
const span = document.querySelector('.close')


const update = () => {
    modal.style.display = "block"
}
const deleteUpdate = () => deleteModal.style.display = 'block'

const deleted = document.querySelector('.deleted').addEventListener('click', () => {
    document.querySelector('#deleted').style.display = "block"

})

span.addEventListener('click', () => {
    modal.style.display = 'none'
})

deleteSpan.addEventListener('click', () => {
    deleteModal.style.display = 'none'
})

