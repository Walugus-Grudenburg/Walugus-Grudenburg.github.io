const zalgoUpArray = [
    '\u030d',
    '\u030e',
    '\u0304',
    '\u0305',
    '\u033f',
    '\u0311',
    '\u0306',
    '\u0310',
    '\u0352',
    '\u0357',
    '\u0351',
    '\u0307',
    '\u0308',
    '\u030a',
    '\u0342',
    '\u0343',
    '\u0344',
    '\u034a',
    '\u034b',
    '\u034c',
    '\u0303',
    '\u0302',
    '\u030c',
    '\u0350',
    '\u0300',
    '\u0301',
    '\u030b',
    '\u030f',
    '\u0312',
    '\u0313',
    '\u0314',
    '\u033d',
    '\u0309',
    '\u0363',
    '\u0364',
    '\u0365',
    '\u0366',
    '\u0367',
    '\u0368',
    '\u0369',
    '\u036a',
    '\u036b',
    '\u036c',
    '\u036d',
    '\u036e',
    '\u036f',
    '\u033e',
    '\u035b',
    '\u0346',
    '\u031a', /*     ̚    */
];
const zalgoDownArray = [
    '\u0316',
    '\u0317',
    '\u0318',
    '\u0319',
    '\u031c',
    '\u031d',
    '\u031e',
    '\u031f',
    '\u0320',
    '\u0324',
    '\u0325',
    '\u0326',
    '\u0329',
    '\u032a',
    '\u032b',
    '\u032c',
    '\u032d',
    '\u032e',
    '\u032f',
    '\u0330',
    '\u0331',
    '\u0332',
    '\u0333',
    '\u0339',
    '\u033a',
    '\u033b',
    '\u033c',
    '\u0345',
    '\u0347',
    '\u0348',
    '\u0349',
    '\u034d',
    '\u034e',
    '\u0353',
    '\u0354',
    '\u0355',
    '\u0356',
    '\u0359',
    '\u035a',
    '\u0323', /*     ̣     */
];
const zalgoMidArray = [
    '\u0315',
    '\u031b',
    '\u0340',
    '\u0341',
    '\u0358',
    '\u0321',
    '\u0322',
    '\u0327',
    '\u0328',
    '\u0334',
    '\u0335',
    '\u0336',
    '\u034f',
    '\u035c',
    '\u035d',
    '\u035e',
    '\u035f',
    '\u0360',
    '\u0362',
    '\u0338',
    '\u0337',
    '\u0361',
    '\u0489',
];

const getRandomInt = (max) => Math.floor(Math.random() * max);

const addZalgoToChar = (character, zalgoCount, zalgoArray) => {
    for (let i = 0; i < zalgoCount; i++) {
        character += zalgoArray[getRandomInt(zalgoArray.length)];
    }
    return character;
};
const addZalgoToString = (text, zalgoCount, zalgoArray) => {
    let result = '';
    for (const char of text) {
        result += addZalgoToChar(char, zalgoCount, zalgoArray);
    }
    return result;
};
const zalgoGeneration = (text, zalgoUpCount, zalgoMidCount, zalgoDownCount) => {
    text = addZalgoToString(text, zalgoUpCount, zalgoUpArray);
    text = addZalgoToString(text, zalgoMidCount, zalgoMidArray);
    return addZalgoToString(text, zalgoDownCount, zalgoDownArray);
};
const zalgoRandomGeneration = (text, zalgoCount) => zalgoGeneration(text, getRandomInt(zalgoCount), getRandomInt(zalgoCount), getRandomInt(zalgoCount));

const unzalgoString = (textZalgo, zalgoArray) => {
    for (const zalgoChar of zalgoArray) {
        textZalgo = textZalgo.split(zalgoChar).join('');
    }
    return textZalgo;
};
const unzalgoText = (textZalgo) => {
    textZalgo = unzalgoString(textZalgo, zalgoUpArray);
    textZalgo = unzalgoString(textZalgo, zalgoMidArray);
    textZalgo = unzalgoString(textZalgo, zalgoDownArray);
    return textZalgo;
};

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

const flippedTextMap = {
  'a': 'ɐ', 'b': 'q', 'c': 'ɔ',
  'd': 'p', 'e': 'ǝ', 'f': 'ɟ',
  'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ',
  'j': 'ɾ', 'k': 'ʞ', 'l': 'l',
  'm': 'ɯ', 'n': 'u', 'o': 'o',
  'p': 'd', 'q': 'b', 'r': 'ɹ',
  's': 's', 't': 'ʇ', 'u': 'n',
  'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
  'y': 'ʎ', 'z': 'z',
  'A': '∀', 'B': 'q', 'C': 'Ɔ',
  'D': 'p', 'E': 'Ǝ', 'F': 'Ⅎ',
  'G': 'פ', 'H': 'H', 'I': 'I',
  'J': 'ſ', 'K': 'ʞ', 'L': '˥',
  'M': 'W', 'N': 'N', 'O': 'O',
  'P': 'Ԁ', 'Q': 'Q', 'R': 'ɹ',
  'S': 'S', 'T': '┴', 'U': '∩',
  'V': 'Λ', 'W': 'M', 'X': 'X',
  'Y': '⅄', 'Z': 'Z',
  ',': '\'', '.': '˙', '?': '¿', 
  '!': '¡', '\'': ',', '\"': ',,',
  '~': '~', ' ': ' '
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

const reverseFlippedTextMap = Object.fromEntries(
  Object.entries(flippedTextMap).map(([k, v]) => [stripVariationSelectors(v), k])
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
    case "Unjust/Flipped Text":
      fromFT()
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
    case "Unjust/Flipped Text":
      toFT()
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
  normalText.value = unzalgoText(gimmickText.value);
}

function toZalgo(){
  gimmickText.value = zalgoGeneration(normalText.value,1,1,1);
}

function toFT() {
  gimmickText.value = normalText.value.split('').map(char => flippedTextMap[char] || '').join('');
}

function fromFT() {
  normalText.value = [...gimmickText.value].map(char => reverseFlippedTextMap[stripVariationSelectors(char)] || '').join('');
}

normalText.addEventListener("keyup", toGimmick)

gimmickText.addEventListener("keyup",toNormal)