const express = require("express"); //Import Express
const Joi = require("joi"); //Import Joi
const app = express(); //Create Express Application on the app variable
app.use(express.json()); //used the json file

const customers = [
    {
        "id" : 1,
        "name" : "saman"
    },

    {
        "id" : 2,
        "name" : "john"

    },

    {
        "id" : 3,
        "name" : "Geethaka"

    },

    {
        "id" : 4,
        "name" : "Keheliya"

    },

];



//Read Request Handlers
// Display the Message when the URL consist of '/'
app.get("/", (req, res) => {
    res.send("Welcome to Our REST API!");
});

//Read Request Handlers
// Display the Message when the URL consist of '/'
app.get("/", (req, res) => {
    res.send("Welcome to Our REST API!");
});

// Display the List Of Customers when URL consists of api customers
app.get("/api/customers", (req, res) => {
    res.send(customers);
});

//Display the information of specific customer when you give the id
app.get("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    
    if(!customer) {
        res.status(404).send('<h2>Oppz customer is not found for id '+req.params.id+'</h2>');
    } else {
        res.send(customers);
    }
});


//create request handler
//create new customer information
app.post("/api/customers", (req, res) => {
    const {error} = validateCustomer(req.body);

    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const newCustomer = {
        id: customers.length + 1,
        name: req.body.name
    };

    customers.push(newCustomer);

    res.send(newCustomer);
});

app.put("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    
    if(!customer) {
        res.status(404).send('<h2>Oppz customer is not found for id '+req.params.id+'</h2>');
    }

    const {error} = validateCustomer(req.body);

    if(error) {
        res.status(400).send(error.details[0].message);
    }

    customer.name = req.body.name;

    res.send(customer);
});

app.delete("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    
    if(!customer) {
        res.status(404).send('<h2>Oppz customer is not found for id '+req.params.id+'</h2>');
    }

    const index = customers.indexOf(customer);
    customers.splice(index, 1);

    res.send("Customer "+customer.name+" is removed!");
});


function validateCustomer(customer) {
    const schema = Joi.object({ name: Joi.string() .min(3) .required()});
    
    const validation = schema.validate(customer);
    
    return validation;
}

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));