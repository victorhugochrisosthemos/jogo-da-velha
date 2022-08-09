/*
Esse projeto teve como base o canal do YouTube do Felipe Rocha (dicasparadevs)


swap = troca
turn = virar
hover = flutuar
board = quadro
handle = lidar com
draw = empate
mark = marca
set = definir
get = pegue


*/

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector('[data-restart-button]');


let isCircleTurn;

//padrões de vitória salvos em uma array
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

//função de inicialização do jogo
const startGame = () =>{
    isCircleTurn = false;
    for(const cell of cellElements){
        //para limpar as classes antes de começar novamente
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener("click", handleClick)

        //adiciona só uma vez a função handleClick
        cell.addEventListener("click", handleClick, {once: true});
    }

    //para que o jogo novamente não tenha o círculo transparente mas sendo da vez inicial do x
    setBoardHoverClass();

    //remove a classe que viabiliza ver a tela final, assim começando o jogo novamente
    winningMessage.classList.remove('show-winning-message');
}

//verificação final e os conteúdos dispostos na tela da div ".winning-message"
const endGame = (isDraw) => {
    if(isDraw){
        winningMessageTextElement.innerText = "Empate!";
    } else {
        winningMessageTextElement.innerText = isCircleTurn ? "Cículo venceu!" : "X Venceu!";
    }

    //essa classe, quando adicionada, sobrepõe a ".winning-message" para deixar de ser invisível
    winningMessage.classList.add("show-winning-message");

}

//verificando se tem vencedor
const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
}

//verificando se foi empate
const checkForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}

//função para adicionar a classe na div
const placeMark = (cell,classToAdd) => {
    cell.classList.add(classToAdd);
}

//remove as classes de uma div para depois colocar a referente do turno
const setBoardHoverClass = () => {
    board.classList.remove('circle');
    board.classList.remove('x');

    //adiciona a classe circle agora na div
    if(isCircleTurn){
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
}

//mudar para ser a vez do circulo
const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    setBoardHoverClass();
};

//tratamento dos click's
const handleClick = (e) => {
    //colocar a marca (x ou círculo)
    const cell = e.target; // fundamental esse target para considerar o funcionamento da função
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);
    
    //verificar por vitória
    const isWin = checkForWin(classToAdd);

    //verificar por empate
    const isDraw = checkForDraw();

    if(isWin){
        endGame(false);
    } else if (isDraw){
        endGame(true);
    } else {
         //mudar símbolo
        swapTurns();
    }



   
};

//chamando a função
startGame();

//botão para reiniciar o jogo
restartButton.addEventListener('click', startGame);