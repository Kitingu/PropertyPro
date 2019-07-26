
const url = 'https://propertypro-v2.herokuapp.com/api/v2/property'
const token = localStorage.getItem('token')
const jwt_token = `Bearer ${token}`

if (token == null || token == undefined) {
    alert('you are not loged in press login to proceed')
    window.location.replace("login.html");
}
const createAdvert = () => {
    event.preventDefault();
    let formData = new FormData();
    let state = document.getElementById('state').value;
    let city = document.getElementById('city').value;
    let type = document.getElementById('type').value;
    let price = document.getElementById('price').value;
    let address = document.getElementById('address').value;
    let image = document.getElementById('image').files[0];

    formData.append('image', image)
    formData.append('state', state)
    formData.append('city', city)
    formData.append('type', type)
    formData.append('price', price)
    formData.append('address', address)

    fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": jwt_token
        },
        body: formData
    })
        .then((res) => res.json())
        .then((data) => {


            if (data.status == 201) {
                window.location.replace("all_adverts.html")
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
