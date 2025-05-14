const fs = require('fs');

let customers = [];

//JSON - JavaScript Object Notation 
//serialização - salvar no disco
//desserialização - ler do disco

function addCustomer(name, address, cpf){

    const id = customers.length > 0 // if
        ? customers[customers.length - 1].id + 1 // then
        : 1; // else
    customers.push({ name, address, id, cpf });

    fs.writeFileSync("db.json", JSON.stringify(customers));

    return id;
}

function getCustomers(){
    const customersString = fs.readFileSync("db.json", "utf-8");
    customers = JSON.parse(customersString); //converte string para JSON 
    return customers;

}


module.exports = {
    addCustomer, 
    getCustomers

}