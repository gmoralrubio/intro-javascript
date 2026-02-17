console.log("Bucles");

// Los bucles nos permiten repetir código sin escribirlo múltiples veces

// BUCLE FOR
// Sintaxis: for ( inicio; condición; incremento ){ código }

// contar del 1 al 5

for (let i = 1; i <= 5; i++) {
  console.log(i)
}

const totalUsers = 3;
for (let i = 1; i <= totalUsers; i++) {
  console.log(`Enviando email ${i} de ${totalUsers}`);
}

for (let i = 1; i <= 5; i++) {
  console.log(`Código: PROMO${i}0OFF`);
}

// RECORRER ARRAYS
const students = ["Ana", "Carlos", "Laura", "Pedro"];

for (let i = 0; i < students.length; i++) {
  console.log(`${i + 1}. ${students[i]}`);
}

// calcular el total carrito de compra
const prices = [19.99, 45.50, 12.00, 8.99, 23.50];
let total = 0;

for (let i = 0; i < prices.length; i++) {

  console.log(`Producto ${i + 1}: ${prices[i]}€`);
  total += prices[i]
}

console.log(`Total a pagar: ${total.toFixed(2)} €`);


// WHILE - Repetir mientras se cumpla una condición

// Sintaxis: while (condición) { código }

let count = 1;
while (count <= 5) {
  console.log(count);
  count++;
}

// Sistema de intentos de login
let attempts = 0;
let maxAttempts = 3;
let password = "secret123";
let userInput = "wrong";

while (attempts < maxAttempts && userInput !== password) {

  attempts++;
  console.log(`Intento ${attempts}: Password incorrecto`);

  if (attempts === 2) {
    userInput = "secret123";
  }
}

if (userInput === password) {
  console.log("Login exitoso")
} else {
  console.log("Cuenta bloqueada")
}

// Procesar una cola de tareas
console.log("Procesando tareas:");
const taskQueue = ["Tarea 1", "Tarea 2", "Tarea 3"];

while (taskQueue.length > 0) {
  // extraer la primera tarea
  const task = taskQueue.shift();
  console.log(`Procesando: ${task}`);
  // console.log(`Tareas restantes: ${taskQueue.length}`);
}

console.log(taskQueue)

console.log("todas las tareas completadas");

console.clear()
// Caso buscar en un array hasta encontrar el item
const inventory = ["Laptop", "Mouse", "Keyboard", "Monitor", "Webcam"];
const searchItem = "Keyboard";

let index = 0;
let found = false;

while (index < inventory.length && !found) {

  if (inventory[index] === searchItem) {
    found = true;
    console.log(`${searchItem} encontrado en la posición ${index}`)
  } else {
    console.log(`Revisando posición ${index}`);
  }

  index++;
}

// DO...WHILE -> ejecuta algo primero, al menos una vex y luego verifica la condición
// Sintaxis: do {coóigo} while (condición)

// comparación con while
let x = 10;
while (x < 5) {
  console.log("Esto no se ejecuta");
}

console.log("while no se ejecutó");

let y = 10;

do {
  console.log(`Esto se ejecuta al menos una vez, y = ${y}`);
} while (y < 5);

// Menú de opciones
let option = 0;
let menuShow = 0;

do {
  menuShow++;
  console.log("1. Ver perfil");
  console.log("2. Configuración");
  console.log("3. Salir");
  console.log(`Mostrando menú por ${menuShow} vez`);

  // Simuler elige salir 
  option = menuShow >= 2 ? 3 : 1;
} while (option !== 3);

console.log("Saliendo...");

console.clear();

// FOR...OF - recorre arrays más simple
// Sintaxis: for (let elemento of array){ código }

const fruits = ["Manzana", "Plátano", "Naranja", "Pera", "Uvas"];

for (let fruit of fruits) {
  console.log(fruit);
}

// comparación entre for clásico y for...of
const color = ["Rojo", "Verde", "Amarillo"];
for (let i = 0; i < color.length; i++) {
  console.log(color[i])
}

// for of
for (let colorForOf of color) {
  console.log(colorForOf)
}

const emails = ["ana@mail.com", "invalid-email", "carlos@email.com", "test"];

for (let email of emails) {

  if (email.includes("@") && email.includes(".")) {
    console.log(`${email} es válido`);
  } else {
    console.log(`${email} es INválido`);
  }
}

console.clear()
// BREAK ===> Salir de un bucle
// break detener el bucle completamente

const users = ["Miriam", "Zoe", "Guille", "Angel", "Pepe"];
const userSearch = "Guille";

for (let user of users) {

  console.log(`Revisando: ${user}`);

  if (user === userSearch) {
    console.log("Usuario encontrado!")
    break;
  }
}

console.clear();
// Validar máximos intentos de contraseña incorrecta
const correctPassword = "keepcoding2024";
const passwordAttempts = ["wrong1", "worng2", "keepcoding2024", "wrong3"];


for (let i = 0; i < passwordAttempts.length; i++) {


  console.log(`Intento ${i + 1}: ${passwordAttempts[i]}`);

  if (passwordAttempts[i] === correctPassword) {
    console.log("Acceso concendido");
    break;
  }

  console.log("Password incorrecto");
}

console.clear();
// Continue -> saltar a la siguiente iteración

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let num of numbers) {

  if (num % 2 !== 0) {
    continue;
  }

  console.log(`${num} es par`);
}

// Validar procesar solo emails válidos:
const emailList = ["ana@mail.com", "invalid-email", "carlos@email.com", "test", "laura@email.com"];
let processedEmail = 0;

for (let email of emailList) {


  // Saltar emails inválidos
  if (!email.includes("@") || !email.includes(".")) {
    console.log(`Saltando: ${email} (inválido)`);
    continue;
  }

  processedEmail++;
  console.log(`Procesando ${email}`);

}

console.log(`Total emails procesados: ${processedEmail}`);