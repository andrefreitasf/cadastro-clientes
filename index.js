const readline = require('node:readline/promises');
const { stdin: input, stdout: output, exit } = require('node:process');

const rl = readline.createInterface({ input, output });

//função principal do menu
async function printMenu(){
    console.clear();
    console.log("Escolhe uma opção: ");
    console.log("Opção 1 - Cadastrar Cliente");
    console.log("Opção 2 - Ver lista de Clientes");
    console.log("Opção 3 - Encerrar");

    //espera a resposta e guarda em answer
    const answer = await rl.question('Qual opção você deseja? ');

    if(answer === "3"){
        process.exit(0);
    }
    console.log(answer);

    await rl.question("Pressione Enter para continuar...");
    printMenu();
}

printMenu();