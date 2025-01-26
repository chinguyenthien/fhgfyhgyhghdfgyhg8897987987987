document.addEventListener('DOMContentLoaded', () => {
    const vnField = document.getElementById('vn');
    const typeField = document.getElementById('type');
    const enField = document.getElementById('en');
    const addButton = document.getElementById('add');
    const updateButton = document.getElementById('update');
    const deleteButton = document.getElementById('delete');
    const saveButton = document.getElementById('save');
    const backButton = document.getElementById('back');
    const wordListDiv = document.getElementById('word-list');

    let wordsList = [];

    // Load words from JSON file
    fetch('wordslist.json')
        .then(response => response.json())
        .then(data => {
            wordsList = data;
            displayWords();
        });

    // Display words in the list
    function displayWords() {
        wordListDiv.innerHTML = '';
        wordsList.forEach((word, index) => {
            const wordItem = document.createElement('div');
            wordItem.textContent = `${word.vn} (${word.type}) - ${word.en}`;
            wordItem.dataset.index = index;
            wordItem.addEventListener('click', () => {
                selectWord(index);
            });
            wordListDiv.appendChild(wordItem);
        });
    }

    // Select a word from the list
    function selectWord(index) {
        const word = wordsList[index];
        vnField.value = word.vn;
        typeField.value = word.type;
        enField.value = word.en;
        vnField.dataset.index = index;
    }

    // Add a new word
    addButton.addEventListener('click', () => {
        const newWord = {
            vn: vnField.value,
            type: typeField.value,
            en: enField.value
        };
        wordsList.push(newWord);
        displayWords();
        clearFields();
    });

    // Update an existing word
    updateButton.addEventListener('click', () => {
        const index = vnField.dataset.index;
        if (index !== undefined) {
            wordsList[index] = {
                vn: vnField.value,
                type: typeField.value,
                en: enField.value
            };
            displayWords();
            clearFields();
        }
    });

    // Delete a selected word
    deleteButton.addEventListener('click', () => {
        const index = vnField.dataset.index;
        if (index !== undefined) {
            wordsList.splice(index, 1);
            displayWords();
            clearFields();
        }
    });

    // Save the words list to JSON file
    saveButton.addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(wordsList));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "wordslist.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });

    // Navigate back to the main page
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Clear input fields
    function clearFields() {
        vnField.value = '';
        typeField.value = '';
        enField.value = '';
        delete vnField.dataset.index;
    }
});