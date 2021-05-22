// Required libraries
const express = require('express');
const fetch = require('node-fetch');
const axios = require('axios');

// App Setup
const app = express();
app.use(express.static('public'));

// Middleware
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
app.get('/', async (req, res) => {

    date = '';
    if(req.query.date) {
        date = req.query.date;
    }

    const options = {
        method: 'GET',
        url: 'https://covid-19-statistics.p.rapidapi.com/reports/total',
        params: { date: date },
        headers: {
          'x-rapidapi-key': '47fe7c30a9msh577ff8aaac05bb1p147aaajsn19d0abdba1c4',
          'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com',
          useQueryString: true
        }
    };

    try {
        const response = await axios.request(options);
        const jsonData = await response.data;
        const covidData = jsonData.data;
        console.log(covidData);
        res.render('home', { covidData });
    } catch(err) { 
    console.log(err);
    }
});

// Start Server
app.listen(4040, () => {
    console.log('Covid 19 Stats app listening on port localhost:4040!');
});