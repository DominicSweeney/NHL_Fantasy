// Retrieve target score from sessionStorage
let targetScore = parseInt(sessionStorage.getItem("targetScore")) || 10; 
document.getElementById("firstToX").textContent = `First to: ${targetScore}`;

// Retrieve previous scores or initialize them
let userScore = parseInt(sessionStorage.getItem("userScore")) || 0;
let computerScore = parseInt(sessionStorage.getItem("computerScore")) || 0;

// Example: Update scores based on the round result (Replace this with actual logic)
const roundWinner = sessionStorage.getItem("roundWinner"); // Get winner from sessionStorage

if (roundWinner === "user") {
    userScore++;
} else if (roundWinner === "computer") {
    computerScore++;
}

// Store updated scores in sessionStorage
sessionStorage.setItem("userScore", userScore);
sessionStorage.setItem("computerScore", computerScore);
sessionStorage.setItem("roundWinner", roundWinner);

// Update displayed scores
document.getElementById("userScore").textContent = `User: ${userScore}`;
document.getElementById("computerScore").textContent = `CPU: ${computerScore}`;

// Check if the game is over
if (userScore >= targetScore || computerScore >= targetScore) {

    // Redirect to gameOver.html
    window.location.href = "/gameOver";
} else {
    // Otherwise, display round result and go back to card.html after 5 seconds
    const resultMessage = document.getElementById("resultMessage");
    if (roundWinner === "user") {
        resultMessage.textContent = "Congratulations! You won this round!";
    } else if (roundWinner === "computer") {
        resultMessage.textContent = "The computer won this round. Better luck next time!";
    } else {
        resultMessage.textContent = "It's a tie!";
    }

    setTimeout(() => { 
        window.location.href = "/card"; 
    }, 5000);
}
