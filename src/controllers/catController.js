let axios = require('axios')
const fs = require('fs')

let getCatBreeds = async function (req, res) {
    try {
        let options = {
            method: 'get',
            url: 'https://catfact.ninja/breeds'
        }

        let response = await axios(options)

        const filename = 'catBreedsResponse.txt';
        await logResponseToFile(filename, JSON.stringify(response.data, null, 2));

        const pageCount = response.data.last_page;

        let allBreeds = await getAllCatBreeds(pageCount);

        let breedsByCountry = groupBreedsByCountry(allBreeds);

        res.status(200).send(breedsByCountry);

    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

async function logResponseToFile(filename, data) {
    try {
        await fs.promises.writeFile(filename, data);
        console.log('Response logged to', filename);
    } catch (error) {
        console.error('Error writing to file:', error);
        throw error;
    }
}

async function getAllCatBreeds(pageCount) {
    let allBreeds = [];

    for (let page = 1; page <= pageCount; page++) {
        let options = {
            method: 'get',
            url: `https://catfact.ninja/breeds?page=${page}`
        };

        let response = await axios(options);
        console.log(response.data);
        allBreeds = allBreeds.concat(response.data.data);
    }

    return allBreeds;
}

function groupBreedsByCountry(breeds) {
    let breedsByCountry = {};

    breeds.forEach(breed => {
        const country = breed.country;
        if (!breedsByCountry[country]) {
            breedsByCountry[country] = [];
        }
        breedsByCountry[country].push({
            breed: breed.breed,
            origin: breed.origin,
            coat: breed.coat,
            pattern: breed.pattern
        });
    });

    return breedsByCountry;
}

module.exports.getCatBreeds = getCatBreeds