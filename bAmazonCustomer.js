
//NPM Packages Used//
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTab = require('console.table');
// var table = require("cli-table2"); couldn't get this to work so used consoleTab instead//

//MySQL DB Connection Info and Error Message Handling//
var connection = mysql.createConnection({
    host: "127.0.0.1",

    port: 3306,

    user: "root",

    password: "Password123",
    database: "bAmazon_DB"
})

//Connecting to DB//
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    console.log("Let's Go Shopping! Time to Spend All of Your Money$$$" + "\n");
    viewInventory();
});

//View Inventory Table Function//
function viewInventory() {
    console.log("-------------b A m a z o n----------------");
    console.log("------------------------------------------");
    console.log("      Take a look at our Inventory!       ");
    console.log("------------------------------------------");
    console.log("------------------------------------------");
    console.log("          Low Prices Guaranteed!          ");
    console.log("------------------------------------------");
    console.log("\n");
    connection.query("SELECT item_id,product_name,price FROM bAmazon_DB.products", function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("----------------------------------------------------------");
        console.log("Going Out 'for' Business!!! HaHa Suckers Marketing Scheme!");
        console.log("----------------------------------------------------------");
        shopperPrompt();
    });
}
//Inquirer Prompts presented to Shoppers to obtain their Order Requests Functions//
function shopperPrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the Product ID that you would like to purchase.",
            name: "itemId"
        },
        {
            type: "input",
            message: "How many units of this product would you like to purchase?",
            name: "unitAmount"
        }
    ]).then(function (addtoCart) {
        console.log("Shopping Cart  ", addtoCart);

        var itemId = addtoCart.itemId;
        var userQuantity = addtoCart.unitAmount;


        //Function to Check the Quantity in the DB which is based off of the Customer's Requested Quantity//
        connection.query("SELECT * FROM bAmazon_DB.products WHERE item_id = " + itemId, function (err, res) {
            if (err) throw err;

            var stockQuantity = res[0].stock_quantity, price = res[0].price;
            //If the quantity the user is requesting is less than or equal to what's actually in stock then update the stock quantity by deducting the unit's quantity and present them with their total, Else if there is not sufficient quantity, advise the shopper to pick something else// 
            if (userQuantity <= stockQuantity) {
                var query = connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: stockQuantity - userQuantity
                        },
                        {
                            item_id: itemId
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log("------------------------------------------");
                        console.log("Product Added Successfully to Cart")
                        console.log("------------------------------------------");
                        console.log("------------------------------------------");
                        console.log("Your Current Total Is |$" + price * userQuantity);
                        console.log("------------------------------------------");
                        //console.log(query);//
                        connection.end();
                    }
                );

            } else {
                console.log("----------------------------------------------------------------------------------");
                console.log("This Product is Currently Out of Stock. Please choose another Product to Purhcase.");
                console.log("----------------------------------------------------------------------------------");
                shopperPrompt();
                // connection.end();
            }


        })

    })
}





