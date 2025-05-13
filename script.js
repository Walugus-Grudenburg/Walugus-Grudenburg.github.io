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
  ' ': '/',      ',': '--..--', '.': '.-.-.-'
};

const reverseMorseCodeMap = Object.fromEntries(
  Object.entries(morseCodeMap).map(([k, v]) => [v, k])
);

function translateToMorse() {
  const text = document.getElementById('inputText').value.toUpperCase();
  const morse = text.split('').map(char => morseCodeMap[char] || '').join(' ');
  document.getElementById('outputText').value = morse;
}

function translateToEnglish() {
  const morse = document.getElementById('inputText').value.trim();
  const words = morse.split(' / ');
  const text = words.map(
    word => word.split(' ').map(code => reverseMorseCodeMap[code] || '').join('')
  ).join(' ');
  document.getElementById('outputText').value = text;
}