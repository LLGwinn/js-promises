let luckyNum = 3;
let rangeEnd = 9;

// show fact for single number
axios.get(`http://numbersapi.com/${luckyNum}?json`)
    .then(response => {
        document.getElementById('part1-1').append(response.data.text);
    });

// show facts for range of numbers luckyNum-rangeEnd
axios
    .get(`http://numbersapi.com/${luckyNum}..${rangeEnd}?json`)
    .then(response => {
        const ul = document.createElement('ul'); 
        for (let i=luckyNum; i<=rangeEnd; i++) {
            let factLi = document.createElement('li');
            factLi.innerText = response.data[i];
            ul.append(factLi);
            document.getElementById('part1-2').append(ul);
        }
    })
    .catch(err => console.log(err));      


// show 4 facts about luckyNum
let numFacts = [];

for (let i=0; i<4; i++) {
    numFacts.push(axios.get(`http://numbersapi.com/${luckyNum}?json`));
}

Promise.all(numFacts)
    .then(numFacts => {
        const ul = document.createElement('ul'); 
        for (let i=0; i<numFacts.length; i++) {
            console.log(numFacts)
            let factLi = document.createElement('li')
            factLi.innerText = numFacts[i].data['text'];
            ul.append(factLi);
        }
        document.getElementById('part1-3').append(ul);
    })
    .catch(err => console.log('Not all promises were resolved. Sorry!', err));