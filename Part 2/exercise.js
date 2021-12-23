axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
    .then(response => {
        const cardData = response.data.cards[0];
        console.log(cardData['value'] +' of '+ cardData['suit']);
    })
    .catch(err => console.log(err));

let twoCards = [];

axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
    .then(response => {
        let value = response.data.cards[0]['value'];
        let suit = response.data.cards[0]['suit'];
        twoCards.push(`${value} of ${suit}`);
        const deck = response.data.deck_id;
        return axios.get(`http://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
    })
    .then(response => {
        let value = response.data.cards[0]['value'];
        let suit = response.data.cards[0]['suit'];
        twoCards.push(`${value} of ${suit}`);
        console.log(twoCards[0], ',', twoCards[1]);
    })
    .catch(err => console.log(err));

let part2Deck;

axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(response => {
        part2Deck = response.data.deck_id;
    })

function dealCard() {
    axios.get(`http://deckofcardsapi.com/api/deck/${part2Deck}/draw/?count=1`)
        .then(response => {
            card = response.data.cards[0];
            cardDiv = document.getElementById('cardholder');

            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            let cardImg = document.createElement('img');
            cardImg.src = card['image'];
            cardDiv.append(cardImg);
            cardImg.width = '200';
            cardImg.style.left = '0';
            cardImg.style.right = '0';
            cardImg.style.margin = 'auto'
            cardImg.style.position = 'absolute'
            cardImg.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
            

            if (response.data.remaining === 0) {
                document.getElementById('getCard').remove();
            }
        });
}