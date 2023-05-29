const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/geocode', async (req, res) => {
    const places = ['Victoria Memorial','Howrah Bridge','India Get']
    const apiKey = 'WCg4B7b41rkwKlKxnnKQIjMOhYuQF0qJ';

    try {
        const results = await Promise.all(
            places.map(async (place) => {
                const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${place}`;
                const response = await axios.get(url);
                const { lat, lng } = response.data.results[0].locations[0].latLng;
                return { place, lat, lng };
            })
        );

        res.json(results);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
