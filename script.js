zalgoGenerator = import('./zalgo-generator')
const morseCodeMap = {
  'A': '.-',     'B': '-...',   'C': '-.-.',
  'D': '-..',    'E': '.',      'F': '..-.',
  'G': '--.',    'H': '....',   'I': '..',
  'J': '.---',   'K': '-.-',    'L': '.-..',
  'M': '--',     'N': '-.',     'O': '---',
  'P': '.--.',   'Q': '--.-',   'R': '.-.',
  'S': '...',    'T': '-',      'U': '..-',
  'V': '...-',   'W': '.--',    'X': '-..-',
  'Y': '-.--',   'Z': '--..',
  '0': '-----',  '1': '.----',  '2': '..---',
  '3': '...--',  '4': '....-',  '5': '.....',
  '6': '-....',  '7': '--...',  '8': '---..',
  '9': '----.',
  ' ': '/',      ',': '--..--', '.': '.-.-.-', 
  '?' : '..--..', '!' : '-.-.--', '\'' : '.----.', 
  '\"': '.-..-.'
};

const wingdingsMap = {
  'a': '♋︎', 'b': '♌︎', 'c': '♍︎',
  'd': '♎︎', 'e': '♏︎', 'f': '♐︎',
  'g': '♑︎', 'h': '♒︎', 'i': '♓︎',
  'j': '🙰', 'k': '🙵', 'l': '●︎',
  'm': '❍︎', 'n': '■︎', 'o': '□︎',
  'p': '◻︎', 'q': '❑︎', 'r': '❒︎',
  's': '⬧︎', 't': '⧫︎', 'u': '◆︎',
  'v': '❖︎', 'w': '⬥︎', 'x': '⌧︎',
  'y': '⍓︎', 'z': '⌘︎',
  'A': '✌︎', 'B': '👌︎', 'C': '👍︎',
  'D': '👎︎', 'E': '☜︎', 'F': '☞︎',
  'G': '☝︎', 'H': '☟︎', 'I': '✋︎',
  'J': '☺︎', 'K': '😐︎', 'L': '☹︎',
  'M': '💣︎', 'N': '☠︎', 'O': '⚐︎',
  'P': '🏱︎', 'Q': '✈︎', 'R': '☼︎',
  'S': '💧︎', 'T': '❄︎', 'U': '🕆︎',
  'V': '✞︎', 'W': '🕈︎', 'X': '✠︎',
  'Y': '✡︎', 'Z': '☪︎',
  ',': '📪︎', '.': '📬︎', '?': '✍︎', 
  '!': '✏︎', '\'': '🕯︎', '\"': '✂︎',
  '~': '❞︎', ' ': ' '
}

function stripVariationSelectors(str) {
  return str.replace(/[\uFE0E\uFE0F]/g, '');
}

const reverseMorseCodeMap = Object.fromEntries(
  Object.entries(morseCodeMap).map(([k, v]) => [v, k])
);

const reverseWingDingsMap = Object.fromEntries(
  Object.entries(wingdingsMap).map(([k, v]) => [stripVariationSelectors(v), k])
);

let mode = "Al3x/Morse Code"
let modetext = document.getElementById("modeText");
let normalText = document.getElementById('normalText')
let gimmickText = document.getElementById('gimmickText')

function swapSpecialChars(input) {
  return input.replace(/\S+/g, word => {
    var newWord = word;
    const match = word.match(/^([^a-zA-Z0-9]*)([a-zA-Z0-9]+)([^a-zA-Z0-9]*)$/);

    if (!/[a-zA-Z0-9]/.test(word)) {
      return word.split('').reverse().join('');
    }

    else if (match) {
      var [, leading, core, trailing] = match;
      leading = leading.split("").reverse().join("");
      trailing = trailing.split("").reverse().join("");
      return trailing + core + leading;
    }
    return word;
  });
}

function toNormal(){
  switch (mode) {
    case "Al3x/Morse Code":
      fromMorse();
      break;
    case "Xela/Backwards Words":
      fromBW();
      break;
    case "Vibing-J/Backwards Sentences":
      fromBS();
      break;
    case "Vining/Wingdings":
      fromWD();
      break;
    case "Xale/Last Letter First":
      fromLLF();
      break;
    case "Viling/Zalgo Text":
      fromZalgo();
      break; 
    default:
      break;
  }
}

function toGimmick(){
  switch (mode) {
    case "Al3x/Morse Code":
      toMorse();
      break;
    case "Xela/Backwards Words":
      toBW();
      break;
    case "Vibing-J/Backwards Sentences":
      toBS();
      break;
    case "Vining/Wingdings":
      toWD();
      break;
    case "Xale/Last Letter First":
      toLLF();
      break;
    case "Aelx/Alphabetical Letters":
      toAL();
      break;
    case "Xlea/Reverse Alphabetical Letters":
      toRAL();
      break;
    case "Viling/Zalgo Text":
      toZalgo();
      break;  
    default:
      break;
  }
}

function putLastLetterFirst(letters){
  for (i = letters.length - 1; i >= 0; i--) {
      const letter = letters[i]
      if (/[a-zA-Z]+/.test(letter)){
        letters.unshift(letter)
        delete(letters[i + 1]);
        return letters;
      }
    }
  return letters;
}
function putFirstLetterLast(letters){
  for (i = 0; i < letters.length; i++) {
      const letter = letters[i]
      if (/[a-zA-Z]+/.test(letter)){
        letters.push(letter)
        letters.shift();
        return letters;
      }
    }
  return letters;
}

function selectMode(modeToSelect)
{
  mode = modeToSelect;
  modetext.innerHTML = modeToSelect;
  toGimmick();
}

function toMorse() {
  const normal = normalText.value.toUpperCase();
  const gimmick = normal.split('').map(char => morseCodeMap[char] || '').join(' ');
  gimmickText.value = gimmick;
}

function fromMorse() {
  const gimmick = gimmickText.value.trim();
  const words = gimmick.split(' / ');
  const normal = words.map(
    word => word.split(' ').map(code => reverseMorseCodeMap[code] || '').join('')).join(' ');
  normalText.value = normal;
}

function toWD() {
  gimmickText.value = normalText.value.split('').map(char => wingdingsMap[char] || '').join('');
}

function fromWD() {
  normalText.value = [...gimmickText.value].map(char => reverseWingDingsMap[stripVariationSelectors(char)] || '').join('');
}

function toBW(){
  const normal = normalText.value;
  const gimmick = normal.split("").reverse().join("");
  gimmickText.value = gimmick;
}

function fromBW(){
  const gimmick = gimmickText.value;
  const normal = gimmick.split("").reverse().join("");
  normalText.value = normal;
}

function toBS(){
  const normal = normalText.value;
  const gimmick = normal.split(" ").reverse().join(" ");
  gimmickText.value = swapSpecialChars(gimmick);
}

function fromBS(){
  const gimmick = gimmickText.value;
  const normal = gimmick.split(" ").reverse().join(" ");
  normalText.value = swapSpecialChars(normal);
}

function toLLF(){
  let words = normalText.value.split(' ');
  let newWords = [];
  for (let word of words) {
    const letters = word.split('')
    const newLetters = putLastLetterFirst(letters);
    word = newLetters.join('');
    newWords.push(word);
  }
  gimmickText.value = newWords.join(' ')
}

function fromLLF(){
  let words = gimmickText.value.split(' ');
  let newWords = [];
  for (let word of words) {
    const letters = word.split('')
    const newLetters = putFirstLetterLast(letters);
    word = newLetters.join('');
    newWords.push(word);
  }
  normalText.value = newWords.join(' ')
}

function toAL(){
  let words = normalText.value.split(' ');
  let newWords = [];
  for (let word of words) {
    let isCapital = false;
    if (/[A-Z]+/.test(word[0]) && word.length > 1) {
      if (/[a-z]+/.test(word[1]))
      {
        isCapital = true;
      }
    }
    const letters = word.split('')
    const newLetters = letters.sort((a,b) => a.toLowerCase().localeCompare(b.toLowerCase()) * /[a-zA-Z]+/.test(a) * /[a-zA-Z]+/.test(b))
    word = newLetters.join('');
    if (isCapital) {
      word = word.toLowerCase();
      word = word[0].toUpperCase() + word.slice(1);
    }
    newWords.push(word);
  }
  gimmickText.value = newWords.join(' ')
}

function toRAL(){
  let words = normalText.value.split(' ');
  let newWords = [];
  for (let word of words) {
    let isCapital = false;
    if (/[A-Z]+/.test(word[0]) && word.length > 1) {
      if (/[a-z]+/.test(word[1]))
      {
        isCapital = true;
      }
    }
    const letters = word.split('')
    const newLetters = letters.sort((a,b) => a.toLowerCase().localeCompare(b.toLowerCase()) * /[a-zA-Z]+/.test(a) * /[a-zA-Z]+/.test(b) * -1)
    word = newLetters.join('');
    if (isCapital) {
      word = word.toLowerCase();
      word = word[0].toUpperCase() + word.slice(1);
    }
    newWords.push(word);
  }
  gimmickText.value = newWords.join(' ')
}

function fromZalgo(){
  normalText.value = 0;
}

function toZalgo(){
  gimmickText.value = zalgoGenerator.zalgoGeneration(normalText);
}

normalText.addEventListener("keyup", toGimmick)

gimmickText.addEventListener("keyup",toNormal)