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
    const progressText = document.getElementById('progress'); // Thêm phần tử để hiển thị số từ đã học

    let wordsList = [];
    let shuffledIndices = [];
    let currentIndex = 0;

    // Load words from JSON file
    fetch('wordslist.json')
        .then(response => response.json())
        .then(data => {
            wordsList = data;
            shuffleIndices();
            loadWord();
            updateProgress();
        });

    function shuffleIndices() {
        shuffledIndices = Array.from(Array(wordsList.length).keys());
        for (let i = shuffledIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
        }
        currentIndex = 0;
    }

    function loadWord() {
        if (currentIndex >= shuffledIndices.length) {
            alert("You have completed all the words!");
            shuffleIndices();
        }
        const word = wordsList[shuffledIndices[currentIndex]];
        vnField.value = word.vn;
        typeField.value = word.type;
        resizeTextarea(vnField);
        resizeTextarea(enField);
        currentIndex++;
        updateProgress();
    }

    function updateProgress() {
        progressText.textContent = `Words learned: ${currentIndex} / ${wordsList.length}`;
    }

    function resizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }

    // Auto resize textarea fields
    vnField.addEventListener('input', () => resizeTextarea(vnField));
    enField.addEventListener('input', () => resizeTextarea(enField));

    // Submit button click event
    submitButton.addEventListener('click', () => {
        const vnValue = vnField.value;
        const enValue = enField.value.toLowerCase().trim();
        const word = wordsList.find(w => w.vn === vnValue);

        if (word && word.en.toLowerCase() === enValue) {
            message.style.color = 'green';
            message.innerHTML = `Correct! <br> IPA: ${word.ipa}`;
            loadWord();
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
        loadWord();
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
