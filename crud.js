// Imports the mongoose module, defines the schema and models.
const mongoose = require('mongoose');
const itemsSchema = { name: String };
const DailyTask = mongoose.model('DailyTask', itemsSchema);
const WorkTask = mongoose.model('WorkTask', itemsSchema);

// Exports functions to be used in other files.
exports.addManyItens = addManyItens;
exports.addOneItem = addOneItem;
exports.getAllItems = getAllItems;
exports.deleteOneItem = deleteOneItem;

// Defines a model from a string.
function selectModel(model) {
    switch (model) {
        case "DailyTask":
            return DailyTask;
        case "WorkTask":
            return WorkTask;
        default:
            return console.log("Invalid model string");
    }
}

// Opens a connection to the database.
function connectDB() {
    const url = "mongodb://127.0.0.1:27017/todolistDB";
    return mongoose.connect(url, {useNewUrlParser: true});
}

// Closes the connection to the database.
function disconnectDB() {
    return mongoose.disconnect();
}


// Adds many items to the database.
function addManyItens(arrayWithObjects, collection) {
    // Uses a switch to select the model.
    collection = selectModel(collection);
    // Use a Promise to connect to the database, insert the items and disconnect.
    return connectDB()
      .then(() => collection.insertMany(arrayWithObjects))
      .catch((err) => console.log(err))
      .finally(() => disconnectDB());
}

// Add one item to the database.
function addOneItem(str, collection) {
    // Uses a switch to select the model.
    collection = selectModel(collection);
    // Create an object from the string. Example: {name: "name"}
    const item = new collection({name: str});
    // Use a Promise to connect to the database, insert the item and disconnect.
    return connectDB()
      .then(() => collection.create(item))
      .catch((err) => console.log(err))
      .finally(() => disconnectDB());
}

// Connects to the database, gets all items and disconnects.
function getAllItems(collection) {
  // Uses a switch to select the model.
  collection = selectModel(collection);
  // Use a Promise to return the array of objects.
  // Example: return [{name: "name", id: "_id"}];.
  return connectDB()
    .then(() => collection.find())
    .then((items) => {
      const content = [];
      items.forEach((item) => {
        content.push({name: item.name, id: item._id});
      })
      return content;
    })
    .catch((err) => console.log(err))
    .finally(() => disconnectDB());
}

// Delete an item from the database.
function deleteOneItem(id, collection) {
  // Uses a switch to select the model.
  collection = selectModel(collection);
  // Use a Promise do connect to the database, delete the item and disconnect.
  return connectDB()
    .then(() => collection.deleteOne({_id: id}))
    .catch((err) => console.log(err))
    .finally(() => disconnectDB());
}