const fetch = require('node-fetch');
const fs = require('fs')

const url = 'https://api.themoviedb.org/3/movie/api_key=672f0d697567840361c26dc792975ba7'

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