const mongoose = require("mongoose");
const Cart = require("./models/Cart");

mongoose.connect(
  "mongodb+srv://suvadeepmwork:ewS70jhreFhYpf74@cluster0.fgi6n.mongodb.net/shopDB?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

Cart.deleteMany({})
  .then(() => {
    console.log("All cart items deleted successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error deleting cart items:", err);
  });
