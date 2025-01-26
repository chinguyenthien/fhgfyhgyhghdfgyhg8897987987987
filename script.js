document.addEventListener('DOMContentLoaded', () => {
    const vnField = document.getElementById('vn');
    const typeField = document.getElementById('type');
    const enField = document.getElementById('en');
    const message = document.getElementById('message');
    const submitButton = document.getElementById('submit');
    const hintButton = document.getElementById('goiy');
    const editButton = document.getElementById('edit');
    const deleteButton = document.getElementById('deleteA');
    const nextQuesButton = document.getElementById('nextQues');

    let wordsList = [];

    // Load words from JSON file
    fetch('wordslist.json')
        .then(response => response.json())
        .then(data => {
            wordsList = data;
            loadRandomWord();
        });

    function resizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }

    // Auto resize textarea fields
    vnField.addEventListener('input', () => resizeTextarea(vnField));
    enField.addEventListener('input', () => resizeTextarea(enField));

    // Load a random word
    function loadRandomWord() {
        const randomIndex = Math.floor(Math.random() * wordsList.length);
        const word = wordsList[randomIndex];
        vnField.value = word.vn;
        typeField.value = word.type;
        resizeTextarea(vnField);
        resizeTextarea(enField);
    }

    // Submit button click event
    submitButton.addEventListener('click', () => {
        const vnValue = vnField.value;
        const enValue = enField.value.toLowerCase().trim();
        const word = wordsList.find(w => w.vn === vnValue);

        if (word && word.en.toLowerCase() === enValue) {
            message.style.color = 'green';
            message.innerHTML = `Correct! <br> IPA: ${word.ipa}`;
            loadRandomWord();
        } else {
            message.style.color = 'red';
            message.textContent = 'Incorrect, try again.';
        }
    });

    // Hint button click event
    hintButton.addEventListener('click', () => {
        const vnValue = vnField.value;
        const word = wordsList.find(w => w.vn === vnValue);
        if (word) {
            enField.value = word.en;
            resizeTextarea(enField);
        }
    });

    // Edit button click event
    editButton.addEventListener('click', () => {
        window.location.href = 'edit.html';
    });

    // Delete button click event
    deleteButton.addEventListener('click', () => {
        enField.value = '';
        message.textContent = '';
        resizeTextarea(enField);
    });

    // Next Question button click event
    nextQuesButton.addEventListener('click', () => {
        loadRandomWord();
        enField.value = ''; // Clear the English input field
        message.textContent = ''; // Clear the message
        resizeTextarea(enField);
    });
});