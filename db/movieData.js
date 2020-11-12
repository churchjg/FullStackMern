const fetch = require('node-fetch');
const fs = require('fs')

const url = 'http://www.omdbapi.com/?t=&apikey=54b6e213'

for (let i = 0; i < 10 ; i++) {
fetch(url)
    .then(res => res.json())
    .then(res => {
        let movies = JSON.stringify(res)
        fs.writeFile('./db/data.json', movies, err => {
            if (err) {
                console.log(err)
            } else {
                console.log('File Created')
            }
        })
    })
}