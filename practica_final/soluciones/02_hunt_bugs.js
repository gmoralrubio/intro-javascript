
//EJERCICIO 2: Cazador de bugs


// 2.1. BUG STRING
/*
Un cliente necesita una función que cuente cuántas vocales hay en un texto, pero nos dice 
que siempre cuenta de menos.No nos da más detalles, solo el código.
*/

function countVowels(text) {

  // Solución, añadir tildes y diéresis:
  const vowels = ["a", "e", "i", "o", "u", "á", "é", "í", "ó", "ú", "ü"];
  let counter = 0;

  // Solución, normalizar todo a minúsculas:
  let formattedText = text.toLowerCase();

  for (let i = 0; i < text.length; i++) {
    if (vowels.includes(formattedText[i])) {
      counter++;
    }
  }

  return counter;
}

const phrase = "Antes no programaba. Ahora sí!";
const result = countVowels(phrase);
console.log(`La frase tiene ${result} vocales`);

// Explicación: El código original no funcionaba correctamente, no matchea correctamente y devuelve solo las vocales que están en el array vowels.
// El método includes() es "case sensitive" (tiene en cuenta mayúsculas y minúsculas).
// Solución, normalizar el texto a minúsculas y añadir tildes para que la función includes() funcione correctamente.

// Alternativa con regex:
function countVowelsRegex(text) {
  const matches = text.match(/[aeiouáéíóúü]/gi);
  return matches ? matches.length : 0;
}

const resultRegex = countVowelsRegex(phrase);
console.log(`La frase tiene ${resultRegex} vocales`);


// 2.2 BUG ARRAY
/*
Un cliente necesita una función que duplique cada número en un array (multiplicar por 2), 
pero nos dice que el array original también se está modificando y no quiere eso. 
*/

function duplicateNumbers(numbers) {

  // Solución:
  const copy = [...numbers];

  for (let i = 0; i < copy.length; i++) {
    copy[i] = copy[i] * 2;
  }
  return copy;
}

const original = [1, 2, 3, 4, 5];
const duplicated = duplicateNumbers(original);

console.log("Original:", original);
console.log("Duplicated:", duplicated);

// Explicación: Los arrays en JavaScript son MUTABLES. Y se pasan por REFERENCIA. Por lo tanto, se crea un "puntero" que hace referencia al elemento original
// Solución, crear copia del array dentro de la función.

// Alternativa, usando .map()
const duplicateNumbersMap = (numbers) => {
  return numbers.map(num => num * 2);
}

console.log("Duplicated Map:", duplicateNumbersMap(original));