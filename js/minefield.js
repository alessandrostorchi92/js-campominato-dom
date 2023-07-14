// Consegna: Il computer deve generare 16 numeri casuali: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// Procedimento: 
// 1) Genero mediante la funzione Math Random() 16 numeri casuali non ripetuti, che saranno le caselle in cui verranno posizionate le bombe
// 2) Assegno le bombe alle caselle appartenenti
// 3) Impostare la possibilità di cliccare suciascuna casella
// 4) Con una condizione booleana fare in modo che, se l'utente clicca su una casella dove si trova una bomba, la casella diventi rossa,s altrimenti azzurra


"use strict"

const btnPlay = document.querySelector("#btn_play");

const gridContainer = document.querySelector(".grid-container");

// Variabile contente la lista delle caselle contenenti le bombe
const arrayBombs = [];

// Variabile contente tutte le 100 caselle
const grid = [];

/**
 * @type {HTMLButtonElement}
 */

btnPlay.addEventListener("click", onBtnClick);


function onBtnClick() {

    // Codice da eseguire al click del btn Play

    // Genero la griglia in modo virtuale sottoforma di array, ma non viene aggiunta al Dom automaticamente. Successivamente devo aggiungerla al file html
    const gridList = createGrid(100);
    console.log(gridList);

    /**
     * @type {HTMLElement}
     */

    // Invoco la funzione che aggiunge al Dom i vari quadrati.
    printGrid(gridContainer, gridList)
}

/**
 * Questa funzione genera un singolo quadrato virtuale della griglia e lo ritorna
 * @param {string} squareContent Contenuto testuale da inserire all'interno del quadrato creato
 * @returns {HTMLDivElement}
 */

function createSingleSquare(squareContent) {
    const square = document.createElement("div");
    square.classList.add("grid-square");
    square.textContent = squareContent;

    return square;
}

/**
 * Dato il numero di celle da cui sarà composta la griglia (100 celle), facendolo passare come argomento della funzione, creo tutta la griglia
 * @param {number} squaresNumber Numero di quadrati da creare all'interno della griglia
 * @return {HTMLDivElement[]} 
 */

function createGrid(squaresNumber) {
    for (let i = 1; i <= squaresNumber; i++) {
        // Salvo in una variabile l'output della funzione createSingleSquare altrimenti andrei a perdere quell'output 
        const newSquare = createSingleSquare(i);
        grid.push(newSquare);
    }

    // onSquareClick deve essere scritta senza parentesi tonde, perchè sara addEventListener che invocherà la funzione quando l'utente clicca
    // In questo modo sto indicando quale funzione dovrà essere invocata al click 

    newSquare.addEventListener("click", onSquareClick);

    function onSquareClick() {

        // Codice da eseguire al click delle celle
    
        const boom = arrayBombs.includes(newSquare);
    
        if (boom === false) {
            this.classList.toggle("bg-danger");
            alert("HAI PERSO");
        } else {
            this.classList.toggle("bg-primary");
        }
    
    }

    return grid;

}


/**
 * Attraverso un'altra funzione stampo la griglia in html, aggiungendo ad un elemento html la lista dei quadrati
 * Appendo attravrso il ciclo for i quadrati all'elemento html container
 * @param {HTMLElement} container 
 * @param {HTMLDivElement[]} squaresList
 */

function printGrid(container, squaresList) {
    for (let i = 0; i < squaresList.length; i++) {
        container.append(squaresList[i]);
    }
}

// Invoco la funzione per generare le caselle, nelle quali saranno posizionate le bombe
createBombs()

/**
 * Dichiarazione funzione per generare le bombe con un array di 16 numeri casuali non ripetuti compresi tra 1 e 100
 * @return {number[]} arrayBombs è l'array contenente il numero delle celle in cui verrano inserite le bombe
 */

function createBombs() {
    for (let i = 0; i < 16; i++) {
        const bombsBoxes = Math.floor(Math.random() * 100) + 1;
        if (!arrayBombs.includes(bombsBoxes))
            arrayBombs.push(bombsBoxes);
        // Altrimenti potrei usare anche questo metodo per impedire la ripetizione dei numeri delle celle
        // if (arrayBombs.indexOf(bombsBoxes) === -1){
        //     arrayBombs.push(bombsBoxes);
        // } else {
        //     i--
    }
    // Verifico attraverso la funzione console.log se la funzione è corretta
    console.log(`Le caselle delle bombe sono: ${arrayBombs}`);


    return arrayBombs;
}



