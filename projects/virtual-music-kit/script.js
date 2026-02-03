const bodyElement = document.querySelector('body');

let keyMap = {
    C4: 'D',
    D4: 'F',
    E4: 'G',
    F4: 'H',
    G4: 'J',
    A4: 'K',
    H4: 'L',
    Db4: 'R',
    Eb4: 'T',
    Gb4: 'U',
    Ab4: 'I',
    Hb4: 'O'
}

// console.log(Object.keys(keyMap).find(key => keyMap[key] === 'L'));

const arrNotesWhite = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'H4'];
const arrNotesBlack = ['Db4', 'Eb4', 'x', 'Gb4', 'Ab4', 'Hb4'];

const melody = ['G', 'H', 'G', 'K', 'H', 'G', 'H', 'F'];

function createKeyboard() {
    const keyboardElement = document.createElement('div');
    keyboardElement.classList.add('keyboard');
    
    bodyElement.prepend(keyboardElement);
    
    for (let i = 0; i < 7; i += 1) {
        const whiteKey = document.createElement('div');
        whiteKey.classList.add('white-key');
        whiteKey.setAttribute('data-note', arrNotesWhite[i]);

        const textKeyElement = document.createElement('span');
        textKeyElement.innerText = `${keyMap[arrNotesWhite[i]]}`;

        whiteKey.append(textKeyElement);
        keyboardElement.append(whiteKey);
    }
    
    const boxBlackKey = document.createElement('div');
    boxBlackKey.classList.add('box_black-key');
    keyboardElement.append(boxBlackKey);
    
    for (let i = 0; i < 6; i += 1) {
        const blackeKey = document.createElement('div');
        blackeKey.classList.add('black-key');
        blackeKey.setAttribute('data-note', arrNotesBlack[i]);
        
        const textKeyElement = document.createElement('span');
        textKeyElement.innerText = `${keyMap[arrNotesBlack[i]]}`;
    
        blackeKey.append(textKeyElement);
        boxBlackKey.append(blackeKey);
    }
}

createKeyboard();
// createControlPanel();

let isEditMode = false;

function createKeyEditor(parent) {
    const buttonKeyEditorElement = document.createElement('button');
    buttonKeyEditorElement.classList.add('button-key-editor');
    buttonKeyEditorElement.innerText = 'Edit key';

    parent.append(buttonKeyEditorElement);

    return buttonKeyEditorElement;
}

function createInputField(parent) {
    const inputFieldElement = document.createElement('input');
    inputFieldElement.classList.add('input-field');
    inputFieldElement.name = 'melody-input'
    inputFieldElement.maxLength = 14;
    inputFieldElement.value = melody.join('');

    parent.append(inputFieldElement);

    return inputFieldElement;
}

function createButtonPlay(parent) {
    const buttonPlayElement = document.createElement('button');
    buttonPlayElement.classList.add('button-play');
    buttonPlayElement.innerText = 'Play';
    parent.append(buttonPlayElement);

    return buttonPlayElement;
}

function createControlPanel() {
    const controlPanelElement = document.createElement('div');
    controlPanelElement.classList.add('control-panel');
    controlPanelElement.innerText = 'Press the Edit key button to edit the piano keys, then click the desired key.';
    // controlPanelElement.innerText = 'Нажми кнопку Edit key для редактирования клавиш пианино, затем нажми на нужную клавишу';
    
    const keyboardElement = document.querySelector('.keyboard');
    
    keyboardElement.after(controlPanelElement);
    // createKeyEditor(controlPanelElement);
    // createInputField(controlPanelElement);
    // createButtonPlay(controlPanelElement);
}

document.addEventListener('click', (event) => {
    buttonEditKeyElement = document.querySelector('.button-key-editor');
    buttonPlayElement = document.querySelector('.button-play');
    inputFieldElement = document.querySelector('.input-field');
    if (event.target === buttonEditKeyElement) {
        isEditMode = true;
    };

    if (event.target !== buttonEditKeyElement) {
        isEditMode = false;
    };

    console.log('isEditMode:', isEditMode);
    verificationIsEditMode();

    if (event.target === buttonPlayElement) {
        [...inputFieldElement.value].forEach((item, index) => {
            const note = Object.keys(keyMap).find(key => keyMap[key] === item);

            setTimeout(() => notePlay(note), 300 * index);
            console.log(item, note);
        })
        // console.log([...inputFieldElement.value]);
    }

});
   
function verificationIsEditMode () {
    if (isEditMode === true) {
        activeEditKey();
        console.log('кнопа редактирования Edit key нажата');
        console.log('isEditMode =', isEditMode);
    } else {
        inactiveEditKey();
        console.log('кнопка мыши нажата где-то в документе');
    }
};

function activeEditKey() {
    const editKey = document.querySelector('.button-key-editor');
    console.log('editKey:', editKey);
    editKey.classList.add('active');
};

function inactiveEditKey() {
    const editKey = document.querySelector('.button-key-editor');
    console.log('editKey:', editKey);
    editKey.classList.remove('active');
};

function editKey(note) {
    const newNameKey = prompt('Enter a value for the selected key.').toUpperCase();
    // const newNameKey = prompt('Введите значение для выбраной клавиши').toUpperCase();
    inactiveEditKey();
    keyMap[note] = newNameKey;
    keyboardElement = document.querySelector('.keyboard');
    keyKeyboard = keyboardElement.querySelector(`[data-note="${note}"]`);
    spanElement = keyKeyboard.querySelector('span');
    spanElement.innerText = newNameKey;
}

console.log(isEditMode);

function getAllWhiteKeys() {
    const whiteKeyElement = document.querySelectorAll('.white-key');
    return whiteKeyElement;
}

function getAllBlackKeys() {
    const blackKeyElement = document.querySelectorAll('.black-key');
    return blackKeyElement;
}

function getAllKeys() {
    const allKeys = [...getAllWhiteKeys(), ...getAllBlackKeys()];
    return allKeys;
}

function setStyleCursorPointer(item) {
    item.style.cursor = 'pointer';
}

function removeStyleCursor(item) {
    item.style.cursor = 'default';
}

function setupKeyEvents(key) {
    
    key.forEach(function(key) {
        const note = key.dataset.note;

        key.addEventListener('mouseover', () => { // наведение курсора на клавишу
            setStyleCursorPointer(key);
        }),
        key.addEventListener('mouseout', () => {  // уход курсора с клавиши
            removeStyleCursor(key);
        }),
        key.addEventListener('mousedown', () => { // клик клавишей мыши
            if (isEditMode === false) {
                  notePlay(key);
                if (key.classList.contains('white-key')) {
                    pressVisualWhite(note);
                    console.log('белая клавиша note:' + note);
                } else {
                    pressVisualBlack(note);
                    console.log('чёрная клавиша note:' + note);

                }  
            } else {
                // editKey(note);
            }
            
        }),
        key.addEventListener('mouseup', () => { // отпускание клавиши мыши
            if (key.classList.contains('white-key')) {
                releaseVisualWhite(note);
            } else {
                releaseVisualBlack(note);
            }
        })
    });
}

setupKeyEvents(getAllKeys());

function pressVisualWhite(note) {
    const keyElement = document.querySelector(`[data-note="${note}"]`);
    keyElement.classList.add('press-white');
    return note;
}

function releaseVisualWhite(note) {
    const keyElement = document.querySelector(`[data-note="${note}"]`);
    keyElement.classList.remove('press-white');
}

function pressVisualBlack(note) {
    const keyElement = document.querySelector(`[data-note="${note}"]`);
    keyElement.classList.add('press-black');
}
    
function releaseVisualBlack(note) {
    const keyElement = document.querySelector(`[data-note="${note}"]`);
    keyElement.classList.remove('press-black');
}

function notePlay(key) {
    let nameFiles;
    if (typeof(key) === "object") {
        nameFiles = key.dataset.note;
    } else {
        nameFiles = key;
    }
    new Audio(`sounds/${nameFiles}.mp3`).play();
    // console.log(key, nameFiles);
}

                    // !!!!!! Отслеживание нажатий клавиш клавиатуры !!!!!!

document.addEventListener('keydown', function(event) {
    let i = 0;

    Object.values(keyMap).forEach(function(key) {
        if (event.key.toUpperCase() === key) {
            const note = Object.keys(keyMap)[i];
            console.log(key);
            
            if (arrNotesWhite.includes(note)) {
                pressVisualWhite(note);
            }
            if (arrNotesBlack.includes(note)) {
                pressVisualBlack(note);
            }

            notePlay(note);
        }

        i += 1;
    }
)});

document.addEventListener('keyup', function(event) {
    let i = 0;

    Object.values(keyMap).forEach(function(key) {
        if (event.key.toUpperCase() === key) {
            const note = Object.keys(keyMap)[i];

            releaseVisualWhite(note);
            releaseVisualBlack(note);
        }

        i += 1;
    }
)});