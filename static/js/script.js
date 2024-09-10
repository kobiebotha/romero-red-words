document.addEventListener('DOMContentLoaded', function() {
    const wordDisplay = document.getElementById('word-display');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const diceRollBtn = document.getElementById('dice-roll');
    const audioBtn = document.getElementById('audio-btn');

    let currentWordIndex = -1;
    let words = [];

    function fetchWord() {
        fetch('/get_word')
            .then(response => response.json())
            .then(data => {
                words.push(data.word);
                currentWordIndex = words.length - 1;
                displayWord();
            })
            .catch(error => console.error('Error:', error));
    }

    function displayWord() {
        if (currentWordIndex >= 0 && currentWordIndex < words.length) {
            wordDisplay.textContent = words[currentWordIndex];
        }
    }

    function playAudio() {
        const currentWord = words[currentWordIndex];
        if (currentWord) {
            const audio = new Audio(`/get_audio/${currentWord}`);
            audio.play();
        }
    }

    prevBtn.addEventListener('click', function() {
        if (currentWordIndex > 0) {
            currentWordIndex--;
            displayWord();
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentWordIndex < words.length - 1) {
            currentWordIndex++;
            displayWord();
        } else {
            fetchWord();
        }
    });

    diceRollBtn.addEventListener('click', function() {
        fetchWord();
    });

    audioBtn.addEventListener('click', playAudio);

    // Initialize with the first word
    fetchWord();
});
