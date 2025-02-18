// productsInsertion.js
const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect(
  "mongodb+srv://suvadeepmwork:ewS70jhreFhYpf74@cluster0.fgi6n.mongodb.net/shopDB?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const products = [
  {
    _id: 1,
    productName: "IPhone",
    price: 999.0,
    productImage: "http://localhost:5000/images/1.png",
    description: "High-end smartphone",
    category: "mobile", // Added category
  },
  {
    _id: 2,
    productName: "Macbook Pro 2022 (M1)",
    price: 1999.0,
    productImage: "http://localhost:5000/images/2.png",
    description: "Latest Apple laptop",
    category: "laptop", // Added category
  },
  {
    _id: 3,
    productName: "Cannon M50 Camera",
    price: 699.0,
    productImage: "http://localhost:5000/images/3.png",
    description: "Compact DSLR camera",
    category: "camera", // Added category
  },
  {
    _id: 4,
    productName: "WLS Van Gogh Denim Jacket",
    price: 228.0,
    productImage: "http://localhost:5000/images/4.png",
    description: "Trendy denim jacket",
    category: "tshirts", // In this example, using "tshirts" for apparel
  },
];

Product.insertMany(products)
  .then(() => {
    console.log("Products added successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error inserting products:", err);
  });
