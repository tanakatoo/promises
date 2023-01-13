document.querySelector("#submit").addEventListener("click", (e) => {
    const favNum = document.querySelector("#favNum").value
    axios.get(`http://numbersapi.com/${favNum}?json`)
        .then(res => {
            console.log(res.data)
            document.querySelector("#favNumResults").innerHTML = `<p>${res.data.text}<p>`
        })
        .catch(err => console.log('oh no, ' + err))
})


document.querySelector("#submit4").addEventListener("click", (e) => {
    // get random 4 numbers
    let getAllFour = []
    for (let i = 0; i < 4; i++) {
        let ran = Math.floor(Math.random() * 100)
        getAllFour.push(axios.get(`http://numbersapi.com/${ran}?json`))
    }
    Promise.all(getAllFour)
        .then(res_array => {
            let displayData = ""
            console.log(res_array)
            for (res of res_array) {
                displayData += `<p>${res.data.text}<p>`
            }

            document.querySelector("#fourNumResults").innerHTML = displayData
        })
        .catch(err => console.log('oh no, ' + err))
})


document.querySelector("#submitFav4").addEventListener("click", (e) => {
    let getAllFour = []
    for (let i = 0; i < 4; i++) {
        const favNum = document.querySelector("#favNum4").value
        getAllFour.push(axios.get(`http://numbersapi.com/${favNum}?json`))
    }
    Promise.all(getAllFour)
        .then(res_array => {
            let displayData = ""
            console.log(res_array)
            for (res of res_array) {
                displayData += `<p>${res.data.text}<p>`
            }

            document.querySelector("#fourFavNumResults").innerHTML = displayData
        })
        .catch(err => console.log('oh no, ' + err))
})

let deckID = ""
axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
        // save deck id
        deckID = res.data.deck_id
    })
document.querySelector("#getCard").addEventListener("click", (e) => {
    axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
        .then(res => {
            if (res.data.remaining == 0) {
                document.querySelector("#end").innerText = "End of the deck!!"
            } else {
                console.log(res.data.cards[0].suit)
                console.log(res.data.cards[0].value)
                console.log(res.data)
                let ran
                let ranran = Math.ceil(Math.random() * 2 - 1)
                if (ranran == 0) {
                    ran = Math.floor(Math.random() * -45)
                } else {
                    ran = Math.floor(Math.random() * 45)
                }
                document.querySelector("#displayCards").innerHTML += `<img style="transform: rotate(${ran}deg); position: absolute; top:100px;left:100px;" src="${res.data.cards[0].images.png}">`
            }

        })
})
