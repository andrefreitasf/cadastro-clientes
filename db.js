const fs = require('fs');

let customers = [];

function addCustomer(name, address, cpf){

    const id = customers.length > 0 // if
        ? customers[customers.length - 1].id + 1 // then
        : 1; // else
    customers.push({ name, address, id, cpf });

    fs.writeFileSync("db.json", JSON.stringify(customers));

    return id;
}

function validateId(id, customer){
    if(customer.id === id) 
        return true;
    else
        return false;
}

// Função para atualizar os dados de um cliente com base no ID
function updateCustomer(id, newData){
    // Procura o índice do cliente no array 'customers' cujo 'id' é igual ao informado
    // 'Number(id)' garante que o valor seja tratado como número
    const customerIndex = customers.findIndex(customer => customer.id === Number(id));
    
    // Se o cliente não for encontrado (índice -1), a função retorna false e para por aqui
    if(customerIndex === -1) return false;

    // Acessa o cliente diretamente no array usando o índice encontrado
    const customer = customers[customerIndex];

    // Se o novo nome foi fornecido, atualiza o nome do cliente
    if(newData.name)
        customer.name = newData.name;

    if(newData.address)
        customer.address = newData.address;

    if(newData.cpf)
        customer.cpf = newData.cpf;
    
    // Salva o cliente atualizado de volta na mesma posição do array
    customers[customerIndex] = customer;

    // Escreve o array atualizado no arquivo 'db.json' para persistência dos dados
    // 'JSON.stringify' converte o array de objetos em texto no formato JSON
    fs.writeFileSync("db.json", JSON.stringify(customers));

    // Retorna true indicando que a atualização foi bem-sucedida
    return true;
}

function getCustomers(){
    const customersString = fs.readFileSync("db.json", "utf-8");
    customers = JSON.parse(customersString); //converte string para JSON 
    return customers;

}


module.exports = {
    addCustomer, 
    getCustomers,
    updateCustomer

}