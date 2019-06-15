document.querySelector('#year').textContent = new Date().getFullYear()
// const update = document.querySelector('.update')
const modal = document.querySelector('.modal')
const span = document.querySelector('.close')

// update.addEventListener('click', () => {
//     console.log('clicked')
//     modal.style.display = "block"
// })

const update = () => {
    modal.style.display = "block"
}
span.addEventListener('click', () => {
    modal.style.display = 'none'
})
