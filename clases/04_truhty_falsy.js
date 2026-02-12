console.log("truthy y falsy");

// En JS todos los valores se pueden evaluar como true o false, es útil para condiciones

// 6  valores falsy

// false
if (false) {
  console.log("esto No se ejectuta");
} else {
  console.log("si se ejecuta");
}

// el número 0
if (0) {
  console.log("no se ejecuta 0")
} else {
  console.log("0 es falsy");
}

// string vacío
const emptyString = "";
if (emptyString) {
  console.log("empty string no se jecuta");
} else {
  console.log("si se ejecuta");
}

// null
if (null) {
  console.log("Esto no se ejecuta NULL")
} else {
  console.log("null es falsy")
}

// undefined
const value1 = undefined;
const message1 = value1 ? "Existe el value1" : "No existe value1";
console.log(message1);

// NaN (Not a Number)
if (NaN) {
  console.log("Esto no se ejecuta");
} else {
  console.log("NaN es falsy");
  console.log(typeof NaN);
}

// TODO LO DEMÁS ES TRUTHY....

//Cualquier número diferente de 0
if (42) {
  console.log("42 es truthy");
}

if (-5) {
  console.log("-5 es truthy");
}

// cualquier string diferente de sitrng vacío (o con espacio);
const saludo = " ";
if (saludo) {
  console.log("Mi crush me ha saludado!");
}

if ("0") {
  console.log("0 en string es truthy");
}

// true (obvio)
if (true) {
  console.log("true es truthy");
}

// caso de validación de usuario
let username = "";

if (username) {
  console.log(`Hola ${username}`);
} else {
  console.log("Por favor, introduzca username");
}

username = "Ana";
if (username) {
  console.log(`Hola ${username}`);
} else {
  console.log("Por favor, introduzca username");
}

// validación de edad
let age = 0;

if (age) {
  console.log(`Tu edad es ${age}`);
} else {
  console.log("No hay edad");
}

if (age !== undefined && age !== null) {
  console.log(`tu edad es ${age}`);
} else {
  console.log("No hay edad");
}

// Nullish Coalescing (??)
// Solo considera null y undefined como "vacíos"

const displayAge = age ?? "Age not provided";
console.log(displayAge);

const config1 = { timeout: 0 };
const config2 = { timeout: null };
const config3 = {};

console.log("Con ||:", config1.timeout || 3000);
console.log("Con ??:", config2.timeout ?? 3000);

// Valores que confundend: string "false" y "0"

// Negación !
let value = "";

if (!value) {
  console.log("No hay valor");
} else {
  console.log("Value tiene contenido");
}