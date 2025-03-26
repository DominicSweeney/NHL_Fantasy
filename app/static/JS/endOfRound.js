        // Retrieve and display the target score from sessionStorage
        let targetScore = sessionStorage.getItem("targetScore") || "--";
        document.getElementById("firstToX").textContent = `First to: ${targetScore}`;

        // Example score values (Replace with actual logic)
        let userScore = 1;
        let computerScore = 0;

        // Update scores
        document.getElementById("userScore").textContent = `User: ${userScore}`;
        document.getElementById("computerScore").textContent = `PC: ${computerScore}`;

        // Example winner determination (Replace with actual logic)
        const winner = "user"; 

        const resultMessage = document.getElementById("resultMessage");
        if (winner === "user") {
            resultMessage.textContent = "Congratulations! You won this round!";
        } else if (winner === "computer") {
            resultMessage.textContent = "The computer won this round. Better luck next time!";
        } else {
            resultMessage.textContent = "It's a tie!";
        }


    //Redirect back to card.html after 5 seconds
     setTimeout(() => { 
         window.location.href = "card.html"; 
     }, 5000);