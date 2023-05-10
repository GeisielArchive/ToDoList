// Importing the required modules.
const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");
const crud = require(__dirname + "/crud.js");


// Create the app.
const app = express();

// Setting the view engine to ejs.
app.set('view engine', 'ejs');
// Setting the body parser.
app.use(bodyParser.urlencoded({extended: true}));
// Load static files.
app.use(express.static("public"));


///////////////////////////////////////////////////////////////////////////////
//                                 Pages                                     //
///////////////////////////////////////////////////////////////////////////////

// Display the daily tasks list
app.get('/', function(req, res) {
    // Specify the collection name for daily tasks.
    const collection = 'DailyTask'
    // Get the current date.
    const day = date.getDate();
    // Retrieve all items from the daily tasks collection as an array of strings.
    const dailyTasksPromise = crud.getAllItems(collection);

    dailyTasksPromise
      .then((dailyTasks) => {
        res.render("list", {listTitle: day, newListemItem: dailyTasks});
      })
      .catch((err) => {
        console.log(err);
        res.render("list", {listTitle: day, newListemItem: []});
      });
});


// Display the work tasks list.
app.get('/work', function(req, res) {
    // Specify the collection name for daily tasks.
    const collection = 'WorkTask'
    // Retrieve all items from the daily tasks collection as an array of strings.
    const workTasksPromise = crud.getAllItems(collection);

    workTasksPromise
      .then((content) => {
        res.render("list", {listTitle: "Work List", newListemItem: content});
      })
      .catch((err) => {
        console.log(err);
        res.render("list", {listTitle: "Work List", newListemItem: []});
      });
});

// Render 'views/about.ejs'.
app.get('/about', function(req, res) {
    res.render('about');
});


///////////////////////////////////////////////////////////////////////////////
//                               Page posts                                  //
///////////////////////////////////////////////////////////////////////////////

// Create a new item in the list.
app.post('/', function(req, res) {
    // Get the item from the form.
    let item = req.body.newItem;

    // If the item came from the work page, add it to the work list.
    // else: add it to the day list.
    if (req.body.list === "Work") {
        const itemPromise = crud.addOneItem(item, 'WorkTask');
        itemPromise
            .then(() => {res.redirect('/work')})
            .catch((err) => {console.log(err)});
    } else {
        const itemPromise = crud.addOneItem(item, 'DailyTask');
        itemPromise
            .then(() => {res.redirect('/')})
            .catch((err) => {console.log(err)});
    }
});


///////////////////////////////////////////////////////////////////////////////
//                           Start Express Server                            //
///////////////////////////////////////////////////////////////////////////////
// Starting the server on port 3000.
app.listen(3000, () => {
    console.log('listening on port 3000');
});
