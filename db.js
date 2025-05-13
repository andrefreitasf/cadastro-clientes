const customers = [];

function addCustomer(name, address, cpf){

    const id = customers.length > 0 // if
        ? customers[customers.length - 1].id + 1 // then
        : 1; // else
    customers.push({ name, address, id, cpf });

    return id;
}

function getCustomers(){
    return customers;
}


module.exports = {
    addCustomer, 
    getCustomers

}