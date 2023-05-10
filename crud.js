const mongoose = require('mongoose');
const itemsSchema = { name: String };
const DailyTask = mongoose.model('DailyTask', itemsSchema);
const WorkTask = mongoose.model('WorkTask', itemsSchema);


exports.addManyItens = addManyItens;
exports.addOneItem = addOneItem;
exports.getAllItems = getAllItems;


function selectModel(model) {
    switch (model) {
        case "DailyTask":
            return DailyTask;
        case "WorkTask":
            return WorkTask;
        default:
            return null;
    }
}

function connectDB() {
    const url = "mongodb://127.0.0.1:27017/todolistDB";
    return mongoose.connect(url, {useNewUrlParser: true});
}

function disconnectDB() {
    return mongoose.disconnect();
}

function addManyItens(arrayWithObjects, collection) {
    collection = selectModel(collection);
    return connectDB()
      .then(() => collection.insertMany(arrayWithObjects))
      .catch((err) => console.log(err))
      .finally(() => disconnectDB());
}
  
function addOneItem(str, collection) {
    collection = selectModel(collection);
    const item = new collection({name: str});
    return connectDB()
      .then(() => collection.create(item))
      .catch((err) => console.log(err))
      .finally(() => disconnectDB());
}

function getAllItems(collection) {
  collection = selectModel(collection);
  return connectDB()
    .then(() => collection.find())
    .then((items) => {
      const content = [];
      items.forEach((item) => {
        content.push(item.name);
      })
      return content;
    })
    .catch((err) => console.log(err))
    .finally(() => disconnectDB());
}
