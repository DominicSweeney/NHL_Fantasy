document.getElementById("scoreForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page refresh

    let scoreValue = document.getElementById("score").value.trim(); 

    if (!scoreValue || isNaN(scoreValue) || parseInt(scoreValue) <= 0) {
        alert("Please enter a valid positive number.");
        return;
    }

    // Store score in sessionStorage for access in endOfRound.html
    sessionStorage.setItem("targetScore", scoreValue);

    // Send score to /pickUpCard
    fetch("/pickUpCard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: scoreValue })
    });

    // Send score to /endOfRound
    fetch("/endOfRound", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: scoreValue })
    }) .then(() => {
        // Redirect to /pickUpCard after both requests complete
        window.location.href = "/pickUpCard";
    }).catch(error => console.error("Error sending score:", error));;
});