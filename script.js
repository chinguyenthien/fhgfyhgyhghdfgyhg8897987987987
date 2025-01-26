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
    let shuffledIndices = [];
    let currentIndex = 0;

    // Load words from JSON file
    fetch('wordslist.json')
        .then(response => response.json())
        .then(data => {
            wordsList = data;
            shuffleIndices();
            loadWord();
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
            shuffleIndices();
        }
        const word = wordsList[shuffledIndices[currentIndex]];
        vnField.value = word.vn;
        typeField.value = word.type;
        resizeTextarea(vnField);
        resizeTextarea(enField);
        currentIndex++;
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
