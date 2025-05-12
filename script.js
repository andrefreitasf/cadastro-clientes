const readline = require('node:readline/promises');
const { stdin: input, stdout: output, exit } = require('node:process');

const rl = readline.createInterface({ input, output });


const customers = [];

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

    const id = customers.length > 0 // if
        ? customers[customers.length - 1].id + 1 // then
        : 1; // else
    
        
    customers.push({ name, address, id, cpf });
    console.log("Cliente cadastrado com sucesso!")
    await rl.question("Carregue no Enter para avançar...");
    printMenu();
}

async function listCustomers(){
    console.clear();
    console.log("Clientes cadastrados: ");
    console.log("Nome | CPF | Endereço");
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

