document.addEventListener('DOMContentLoaded', () => {
    const vnField = document.getElementById('vn');
    const typeField = document.getElementById('type');
    const enField = document.getElementById('en');
    const message = document.getElementById('message');
    const exampleText = document.getElementById('exampleText'); // Thêm phần tử để hiển thị ví dụ
    const submitButton = document.getElementById('submit');
    const hintButton = document.getElementById('goiy');
    const deleteButton = document.getElementById('deleteA');
    const nextQuesButton = document.getElementById('nextQues');
    const exampleButton = document.getElementById('example'); // Thêm nút Example

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

    // Delete button click event
    deleteButton.addEventListener('click', () => {
        enField.value = '';
        message.textContent = '';
        exampleText.textContent = ''; // Clear the example text
        resizeTextarea(enField);
    });

    // Next Question button click event
    nextQuesButton.addEventListener('click', () => {
        loadRandomWord();
        enField.value = ''; // Clear the English input field
        message.textContent = ''; // Clear the message
        exampleText.textContent = ''; // Clear the example text
        resizeTextarea(enField);
    });

    // Example button click event
    exampleButton.addEventListener('click', () => {
        const vnValue = vnField.value;
        const word = wordsList.find(w => w.vn === vnValue);
        if (word) {
            exampleText.textContent = `Example: ${word.example}`;
        }
    });
});
