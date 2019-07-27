let url = "https://propertypro-v2.herokuapp.com/api/v2/property";

// const svg = require('../img')

window.onload = () => {



    viewAll()
}

const viewAll = () => {

    fetch(url, {
        method: 'GET'
    })
        .then((res) => res.json())
        .then((data) => {
            const propertySection = document.querySelector('.homes')
            if (data.status == 200) {
                let properties = data.data

                if (properties.length > 0) {

                    for (property of properties) {
                        const propertyDiv = document.createElement('div')
                        propertyDiv.className = 'home'

                        const propropertySectionpertyImg = document.createElement('img')
                        propertyImg.className = 'home-img'
                        propertyImg.src = property.image_url

                        const propertyType = document.createElement('h5')
                        propertyType.className = 'home-name'
                        propertyType.textContent = property.type

                        const propertyCity = document.createElement('div')
                        const typeSvg = document.createElement('i')
                        typeSvg.className = 'fa fa-map-marker'
                        propertyCity.appendChild(typeSvg)

                        const propertyParagraph = document.createElement('p')
                        propertyCity.className = 'home-location'
                        propertyParagraph.textContent = property.city
                        propertyCity.appendChild(propertyParagraph)

                        const propertyStatus = document.createElement('div')
                        const statusIcon = document.createElement('i')
                        statusIcon.className = 'fa fa-check'
                        propertyStatus.appendChild(statusIcon)
                        propertyStatus.className = 'home-rooms'
                        const statusParagraph = document.createElement('p')
                        statusParagraph.textContent = property.status
                        propertyStatus.appendChild(statusParagraph)

                        const propertyPrice = document.createElement('div')
                        const dollarIcon = document.createElement('i')
                        dollarIcon.className = 'fa fa-usd'
                        propertyPrice.appendChild(dollarIcon)


                        const priceParagraph = document.createElement('p')
                        propertyPrice.className = 'home-price'
                        priceParagraph.textContent = property.price
                        propertyPrice.appendChild(priceParagraph)

                        const propertyState = document.createElement('div')
                        const flagIcon = document.createElement('i')
                        flagIcon.className = 'fa fa-flag'
                        propertyState.appendChild(flagIcon)
                        propertyState.className = 'home-area'
                        const stateParagraph = document.createElement('p')
                        stateParagraph.textContent = property.state
                        propertyState.appendChild(stateParagraph)


                        const buyNow = document.createElement('button')
                        buyNow.classList.add('btn', 'home-btn')
                        buyNow.textContent = 'Buy now'
                        buyNow.addEventListener('click', () => {
                            localStorage.setItem('propertyId', property.propertyid)
                        })


                        propertyDiv.append(propertyImg, propertyType, propertyCity, propertyStatus, propertyPrice, propertyState, buyNow)
                        propertySection.appendChild(propertyDiv)
                    }


                }
                else {
                    const note = document.createElement('h2')
                    note.textContent = "There are no available properties at the moment"
                    propertySection.appendChild(note)
                    propertySection.style.height = '50vh'
                }


            }
            else {
                const note = document.createElement('h2')
                note.textContent = "Something went wrong please try again"
                propertySection.appendChild(note)
                propertySection.style.height = '50vh'
            }
        })
}
