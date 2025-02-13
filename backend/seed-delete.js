const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect(
  "mongodb+srv://suvadeepmwork:ewS70jhreFhYpf74@cluster0.fgi6n.mongodb.net/shopDB?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

Product.deleteMany({})
  .then(() => {
    console.log("All products deleted successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error deleting products:", err);
  });
