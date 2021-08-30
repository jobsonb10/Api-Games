const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://jobsonb10:kakashi123@cluster0.u51db.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
