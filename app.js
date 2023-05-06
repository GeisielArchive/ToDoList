// Importing the required modules.
const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");


// Create the app.
const app = express();

// Itens array.
const itens = [];
const workItems = [];


// Setting the view engine to ejs.
app.set('view engine', 'ejs');
// Setting the body parser.
app.use(bodyParser.urlencoded({extended: true}));
// Load static files.
app.use(express.static("public"));


///////////////////////////////////////////////////////////////////////////////
//                                 Pages                                    //
//////////////////////////////////////////////////////////////////////////////
// Send information to list.ejs to create a Day list.
app.get('/', function(req, res) {
    // Get the day.
    const day = date.getDate();
    // Send actual information to list.ejs.
    res.render("list", {listTitle: day, newListemItem: itens});
});

// Send information to list.ejs to create a Work list.
app.get('/work', function(req, res) {
    res.render('list', {listTitle: "Work List", newListemItem: workItems});
});

// About page.
// Create a new page and send information from about.ejs to about page.
app.get('/about', function(req, res) {
    res.render('about');
});


///////////////////////////////////////////////////////////////////////////////
//                               Page posts                                  //
///////////////////////////////////////////////////////////////////////////////
// Create a new item in the list.
app.post('/', function(req, res) {
    // Get string form name="" from HTML and save it into the var item.
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        // Push the new item in array.
        workItems.push(item);
        // Redirect to '/work' route.
        res.redirect('/work');
    } else {
        // Push the new item in array.
        itens.push(item);
        // Redirect to '/' route.
        res.redirect('/');
    }
});

app.post('/work', function(req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
});

///////////////////////////////////////////////////////////////////////////////
//                           Start Express Server                            //
///////////////////////////////////////////////////////////////////////////////
// Starting the server on port 3000.
app.listen(3000, () => {
    console.log('listening on port 3000');
});
