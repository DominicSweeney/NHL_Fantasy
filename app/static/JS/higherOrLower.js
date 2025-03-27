let selectedStat = ""; // Variable to store the selected stat
let userChoice = ""; // Variable to store the user's choice (Higher or Lower)



// Select all elements with the class "higherOrLower"
const statElements = document.querySelectorAll('.higherOrLower');

function penguin_attack(){
    setTimeout(() => {
        document.getElementById('penguin').src = "../../static/images/loading-bar.gif";
        setTimeout(() => {
            document.getElementById('penguin').src = ""; // Hide the gif by clearing the src
        }, 4000);
    }, 500);
    on_computer_turn();
}

// Add a click event listener to each stat element
statElements.forEach(element => {
    element.addEventListener('click', (event) => {
        const clickedStat = event.target.getAttribute('data-stat'); // Get the stat from the data attribute

        // Check if the clicked stat is already selected
        if (selectedStat === clickedStat) {
            // Hide the higherOrLowerBox and reset the selectedStat
            const higherOrLowerBox = document.querySelector('.higherOrLowerBox');
            higherOrLowerBox.style.display = 'none';
            selectedStat = ""; // Reset the selected stat

            // Clear the user selection message
            const userSelectionText = document.querySelector('.userSelection');
            userSelectionText.textContent = ""; // Clear the message

            console.log("Deselected stat:", clickedStat); // Log the deselection (optional)
        } else {
            // Update the selectedStat and show the higherOrLowerBox
            selectedStat = clickedStat;
            console.log("Selected stat:", selectedStat); // Log the selected stat (optional)

            // Show the higherOrLowerBox
            const higherOrLowerBox = document.querySelector('.higherOrLowerBox');
            higherOrLowerBox.style.display = 'block';

            // Update the higherOrLowerBox text with the selected stat
            const statText = document.querySelector('.higherOrLowerBox h2');
            statText.textContent = `${selectedStat} Selected, Higher or Lower?`;
        }
    });
});

// Add event listeners for the "Higher" and "Lower" buttons
document.getElementById('higherChosen').addEventListener('click', () => {
    userChoice = "Higher";
    console.log("User chose:", userChoice); // Log the user's choice

    // Display the user's selection
    const userSelectionText = document.querySelector('.userSelection');
    userSelectionText.textContent = `You selected ${selectedStat} and chose ${userChoice}.`;
    penguin_attack();
});

document.getElementById('lowerChosen').addEventListener('click', () => {
    userChoice = "Lower";
    console.log("User chose:", userChoice); // Log the user's choice

    // Display the user's selection
    const userSelectionText = document.querySelector('.userSelection');
    userSelectionText.textContent = `You selected ${selectedStat} and chose ${userChoice}.`;
    penguin_attack();
});

