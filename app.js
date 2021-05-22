// Required libraries
const express = require('express');
const fetch = require('node-fetch');

// App Setup
const app = express();
app.use(express.static('public'));

// Middleware
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
app.get('/', async (req, res) => {

    let inputDate = '';
    if(req.query.inputDate) {
        inputDate = req.query.inputDate;
    }

    const options = {
        method: 'GET',
        url: 'https://covid-19-statistics.p.rapidapi.com/reports/total',
        qs: {date: '2020-04-07'},
        headers: {
          'x-rapidapi-key': '47fe7c30a9msh577ff8aaac05bb1p147aaajsn19d0abdba1c4',
          'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com',
          useQueryString: true
        }
    };

    try {
        const response = await fetch(options.url, options);
        const data = await response.json();
        console.log(data);
        res.render('home', { data });
    } catch(err) { 
    console.log(err);
    }
});

// Start Server
app.listen(4040, () => {
    console.log('Covid 19 Stats app listening on port localhost:4040!');
});