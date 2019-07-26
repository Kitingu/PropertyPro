
const url = 'https://propertypro-v2.herokuapp.com/api/v2/auth/signin'
function signIn() {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
        .then((res) => res.json())
        .then((data) => {


            if (data.status == 200) {
                console.log(data);
                localStorage.setItem('token', data.data)
                window.location.replace("index.html")
            } else {
                let error_container = document.getElementById('errors')
                error_container.style.display = 'block'
                if (error_container) {
                    error_container.innerHTML = data.error
                }
            }

        })
        .catch((e) => console.log(e))
}
