
    console.log("JavaScript is connected!");
    let rockButton = document.getElementById("rock");
    let paperButton = document.getElementById("paper");
    let siccorButton = document.getElementById("siccor");
    let playerChoice = null;
    let computerChoice = null;
    let winner = null;
    let playerScore = 0;
    let computerScore = 0;

    let pchoice = document.getElementById("player-choice");
    let cchoice = document.getElementById("computer-choice");
    let winnerResult = document.getElementById("winner");
    let playersc = document.getElementById("player-score");
    let computersc = document.getElementById("computer-score");
    
    rockButton.addEventListener(
        "click", function(){
            playerChoice = "rock";
            console.log(playerChoice);
    pchoice.innerText ="Player choice: "+ playerChoice;
    playGame("rock");
        }
    );

    paperButton.addEventListener(
        "click", function(){
            playerChoice = "paper";
            console.log(playerChoice);
    pchoice.innerText ="Player choice: "+ playerChoice;
    playGame("paper");
        }
    );

    siccorButton.addEventListener(
        "click", function(){
            playerChoice = "siccor";
            console.log(playerChoice);
    pchoice.innerText ="Player choice: "+ playerChoice;
    playGame("siccor");
        }
    );


    function playGame(playerChoice){
    computerChoice = Math.random();      
    computerChoice = computerChoice * 3;  
    computerChoice = Math.floor(computerChoice); 

    console.log(computerChoice);
    
    if(computerChoice == 0){ computerChoice = "rock"}
    else if(computerChoice == 1){ computerChoice = "paper"}
    else if(computerChoice == 2){ computerChoice = "siccor"}
    else {console.log("bye")}

    if(playerChoice == "rock" && computerChoice == "rock"){winner = "Tie"}
    if(playerChoice == "rock" && computerChoice == "paper"){winner = "Computer"}
    if(playerChoice == "rock" && computerChoice == "siccor"){winner = "Player"}
    if(playerChoice == "paper" && computerChoice == "rock"){winner = "Player"}
    if(playerChoice == "paper" && computerChoice == "paper"){winner = "Tie"}
    if(playerChoice == "paper" && computerChoice == "siccor"){winner = "Computer"}
    if(playerChoice == "siccor" && computerChoice == "rock"){winner = "Computer"}
    if(playerChoice == "siccor" && computerChoice == "paper"){winner = "Player"}   
    if(playerChoice == "siccor" && computerChoice == "siccor"){winner = "Tie"}
    cchoice.innerText = "Computer choice: " + computerChoice;
    winnerResult.innerHTML = "Winner: " + winner;

    if (winner == "Player") {playerScore = playerScore +1}
    else if (winner == "Computer") {computerScore = computerScore + 1}
    
        playersc.innerText = "Player score: " + playerScore;
        computersc.innerText = "Computer score: " + computerScore;

    }
