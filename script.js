const db = require("./db");
const readline = require('node:readline/promises');
const { stdin: input, stdout: output, exit } = require('node:process');

const rl = readline.createInterface({ input, output });


function validateName(name){
    // Verifica se 'name' é falsy (null, undefined, "", etc.)
    if(!name) return false;
    // Remove espaços extras e verifica se ainda existe pelo menos um espaço entre as palavras
    if(name.trim().indexOf(" ") === -1) return false;
    // Se passou nos dois testes, retorna true (nome válido)
    return true;
}

function validateAddress(address) {
    if(!address) return false;
    if(address.length < 10) return false;
    return true;
}

async function getAnswer(question, errorMessage, validationFunction){
    let answer = "";
    do {
        answer = await rl.question(question);
        if(!validationFunction(answer)) console.log(errorMessage);
    }while(!validationFunction(answer));

    return answer;
}

async function startRegistration(){
    console.clear();

    const name = await getAnswer("Qual o nome do cliente? ", "Nome inválido, tente novamente.", validateName);
    const address = await getAnswer("Qual o endereço do cliente? ", "Endereço inválido, tente novamente.", validateAddress);
    const cpf = await getAnswer("Qual o CPF do cliente? ", "CPF inválido, tente novamente.", () => { return true})

    db.addCustomer(name, address, cpf);
    
    console.log("Cliente cadastrado com sucesso!")
    await rl.question("Carregue no Enter para avançar...");
    printMenu();
}

function validateId(id){
    return id > 0;

}

function validateUpdateName(name){
    if(!name) return true;
    if(name.trim().indexOf(" ") === -1) return false;
    return true;
    
}

function validateUpdateAddress(address){
    if(!address) return true;
    if(address.length < 10) return false;
    return true;
}

async function startUpdate(){
    console.clear();

    const id = await getAnswer("Qual o ID do cliente? ", "ID inválido, tente novamente.", validateId);
    const name = await getAnswer("Qual o novo nome do cliente? Deixe em branco, se quise manter. ", "Nome inválido, tente novamente.", validateUpdateName);
    const address = await getAnswer("Qual o novo endereço do cliente? Deixe em branco, se quise manter. ", "Endereço inválido, tente novamente.", validateUpdateAddress);
    const cpf = await getAnswer("Qual o CPF do cliente? Deixe em branco, se quise manter. ", "CPF inválido, tente novamente.", () => { return true})

    const result = db.updateCustomer(id, { name, address, cpf });
    
    if(result)
        console.log("Cliente atualizado com sucesso!");
    else
        console.log("Cliente não encontrado!");

    await rl.question("Carregue no Enter para avançar...");
    printMenu();
}


async function listCustomers(){
    console.clear();
    console.log("Clientes cadastrados: ");
    console.log("Nome | CPF | Endereço");

    const customers = db.getCustomers();
    for(let i=0; i < customers.length; i++){
        const customer = customers[i];
        console.log(`${customer.name} | ${customer.cpf} | ${customer.address}`);
    }
    
    await rl.question("Carregue no Enter para avançar...");
    printMenu();
}

async function printMenu(){
    console.clear();
    console.log("Menu:")
    console.log("Opção 1 - Ver Clientes");
    console.log("Opção 2 - Cadastrar Cliente");
    console.log("Opção 3 - Editar Cliente")
    console.log("Opção 5 - Encerrar");

    const answer = await rl.question("Qual opção você deseja? ");
    

    switch(answer){
        case "1": listCustomers(); break;
        case "2": startRegistration(); break;
        case "3": startUpdate(); break;
        case "5": {
            console.clear(); 
            process.exit(0); }
        default: console.log("Opção inválida, tente novamente.");
    }

    await rl.question("Carregue no Enter para avançar...");
    printMenu()

}

printMenu();

