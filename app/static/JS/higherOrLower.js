function toggleHigherOrLower() {
    const higherOrLowerDiv = document.querySelector('.higherOrLower');
    if (higherOrLowerDiv.style.display === 'none') {
        higherOrLowerDiv.style.display = 'block';
    } else {
        higherOrLowerDiv.style.display = 'none';
    }
}


document.getElementById('higherOrLower').addEventListener('click', toggleHigherOrLower);