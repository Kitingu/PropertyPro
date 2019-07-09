
const forgotModal = document.querySelector('.forgot-password')
const forgotSpan = document.querySelector('.close-forgot')

const forgotPassword = () => {
    forgotModal.style.display = 'block'
}

forgotSpan.addEventListener('click', () => {
    forgotModal.style.display = 'none'
})
const showReset = () => {
    document.querySelector('#reset').style.display = "block"
}
const loginForm = document.querySelector('#forgetPassword').addEventListener('click', () => {
    document.querySelector('.login').style.display = 'none'
})

window.onclick = function (event) {
    if (event.target == forgotModal) {
        forgotModal.style.display = "none";
    }
}
