console.log("string methods");

// length, includes, trim, tolowercase, touppercase, charat, indexof, slice, replace, chaining

let message = "  Hello Keepcoding!   ";
let course = "Introducción a Javascript";

console.log("Original:", message);
console.log("Curso:", course);

// LENGTH: Longitud de un string
const messageLength = message.length;
console.log(messageLength);
console.log(course.length);

// includes() - verificar si contiene texto
console.log(course.includes("Javascript"));

// caso práctico - validar email
let testEmail = "user@keepcoding";
const tieneArroba = testEmail.includes("@");
const tienePunto = testEmail.includes(".");

if (tieneArroba && tienePunto) {
  console.log("Email válido");
} else {
  console.log('Email inválido');
}

// TRIM - elimina espacios al inicio y al final
console.log(`Original: ${message}`);
console.log(`Trim: ${message.trim()}`);

// toLowerCase -> convertir a minúsculas
console.log(message.toLowerCase());

const messageClean1 = message.trim().toLowerCase();
console.log(messageClean1);

// toUpperCase -> convierte a mayúsculas
const userInput = "keepcoding";
const correctAnswer = "KeepCoding";

console.log(userInput.toUpperCase());

if (userInput.toUpperCase() === correctAnswer.toUpperCase()) {
  console.log("Las respuestas coinciden");
}

// charAt() -> obtener un caracter en una posición dada
let text = "Javascript";
console.log("charAt(6):", text.charAt(6));
console.log("charAt(0):", text.charAt(0));

// indexOf -> buscar la posición de un caracter
console.log("En coruse, la letra a", course.indexOf("Javascript"));
console.log(course.indexOf("Python"));

if (course.indexOf("Javascript") !== -1) {
  console.log("Este curso es de JS");
}

// slice() -> Extraer parte de un string, recibe dos parámetros, el inicio y final.

// let course = "Introducción a Javascript";
console.log("slice(0,12):", course.slice(0, 12));
console.log("slice 17", course.slice(17));
console.log("slice -10", course.slice(-10)); // -> desde el final

// caso práctico, extraer un nomer de usuario de un email:
let email = "italo@keepcoding.io";

let userName = email.slice(0, email.indexOf("@"));
console.log(userName);


// replace() -> reemplaza la PRIMERA ocurrencia
let greeting = "Hello World";
console.log(greeting);

const greetingReplace = greeting.replace("World", "Keepcoding");
console.log(greetingReplace);

const repeated = "hello hello hello";
console.log(repeated.replace("hello", "hi"));

// todas las ocurrencias
console.log(repeated.replaceAll("hello", "hi"));


// Encadenar métodos:
let result = "  Javascript es alucinante!  "
  .trim()
  .toUpperCase()
  .replace("ALUCINANTE", "LA HOSTIA");

console.log(result);

// Método para pasar number strings a number
const parseAge = parseInt("36");
console.log(parseAge);


// EJERCICIO PARA EL FINDE
// === Conversor y analizador de texto

console.log("\nEJERCICIO CASA - Analizador de texto");

let texto = "   Me gusta aprender JavaScript cada día   ";

// 1. Eliminar espacios
let textoLimpio = // COMPLETAR

  console.log("Texto limpio:", textoLimpio);

// 2. Mostrar en mayúsculas
// COMPLETAR

// 3. Mostrar en minúsculas
// COMPLETAR

// 4. ¿Contiene la palabra "javascript"?
// COMPLETAR

// 5️. Mostrar los primeros 5 caracteres
// COMPLETAR

// 6️. Tiene más de 20 caracteres?
// COMPLETAR