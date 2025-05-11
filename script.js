const readline = require('node:readline/promises');
const { stdin: input, stdout: output, exit } = require('node:process');

const rl = readline.createInterface({ input, output });


const customers = [];

async function startRegistration(){
    console.clear();
    const name = await rl.question("Qual o nome do cliente? ");
    const address = await rl.question("Qual o endereço do cliente? ");
    
    const id = customers.length > 0 
        ? customers[customers.length - 1].id + 1 
        : 1; //operador ternário

    customers.push({ name, address, id });
    console.log("Cliente cadastrado com sucesso!")
    await rl.question("Carregue no Enter para avançar...");
    printMenu();
}

async function listCustomers(){
    console.clear();
    console.log(customers);
    await rl.question("Carregue no Enter para avançar...");
    printMenu();
}

async function printMenu(){
    console.clear();
    console.log("Menu:")
    console.log("Opção 1 - Cadastrar Clientes");
    console.log("Opção 2 - Ver Clientes");
    console.log("Opção 3 - Encerrar");

    const answer = await rl.question("Qual opção você deseja? ");
    

    switch(answer){
        case "1": startRegistration(); break;
        case "2": listCustomers(); break;
        case "3": {
            console.clear(); 
            process.exit(0); }
        default: console.log("Opção inválida, tente novamente.");
    }

    await rl.question("Carregue no Enter para avançar...");
    printMenu()

}

printMenu();

