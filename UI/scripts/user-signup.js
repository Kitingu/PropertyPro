


const url = 'https://propertypro-v2.herokuapp.com/api/v2/auth/signup'

const signUp = () => {
    event.preventDefault();

    let firstName = document.getElementById('firstname').value;
    let lastName = document.getElementById('lastname').value;
    let phoneNumber = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch(url,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'firstname': firstName,
                'lastname': lastName,
                'email': email,
                'phoneNumber': phoneNumber,
                'password': password
            })
        })

        .then((res) => res.json())
        .then((data) => {
            if (data.status == 201) {
                localStorage.setItem('token', data.access_token)
                window.location.replace('index.html');
            }
            else {
                
                let error_container = document.getElementById('errors')
                error_container.style.display = 'block'
                if (error_container) {
                    error_container.innerHTML = data.error
                }
            }
        })
        .catch((e) => console.log(e))
}
