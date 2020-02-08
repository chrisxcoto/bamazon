var mysql = require('mysql');
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
  host      : 'localhost',
  port      : 3306,
  user      : 'root',
  password  : process.env.password,
  database  : 'bamazon'
});

function start(){
const queryString = "select * from products";
connection.query(queryString, function (error, products) {
    if (error) throw error;
    products.forEach(product => console.log(`${product.product_name} || ${product.item_id} || ${product.price} `))
    console.table(products);
  });

  pickItem();

};

connection.connect(function(err){
if (err) throw err;
start();

});

function pickItem(){
    inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item_id you would like to purchase?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?"
    }]).then(function(answer){
        
        var product = answer.item;
        var quantity = answer.quantity;
        var userCost;
        var updateQuantity;

        connection.query("SELECT * FROM products WHERE ?", {item_id: product}, function(err, response){
            if(err) throw err;
            // console.log(response[0]);
            if(quantity > response[0].stock_quantity){
                console.log("Insufficient Quantity!!")
            }else {
                userCost = quantity * response[0].price;
                updateQuantity = response[0].stock_quantity - quantity;
                console.log(`
                You have purchased ${quantity} of ${response[0].product_name}
                Your total is: ${userCost}`);
                connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: updateQuantity}, {item_id: product}], function(err, response){
                    if (err) throw err;
                    console.log("Inventory Updated")
                })
            }
    
         connection.end();

        })
    })

};
 
