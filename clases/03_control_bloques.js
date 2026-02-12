console.log("ESTRUCTURAS DE CONTROL");

// IF/ELSE
// Son condicionales que nos permiten ejecutar código SOLO si se cumple una condición

// IF

const temperatura = 30;
if (temperatura > 25) {
  console.log("Hace calor!");
}

const esAdulto = true;
if (esAdulto) {
  console.log("Eres adulto");
}

// bifurcar IF...ELSE
const edad = 16;

if (edad >= 18) {
  console.log("Puedes entrar");
} else {
  console.log("NO puedes entrar aquí, bye");
}

// If sin llaves
const miEdad = 22;

if (miEdad >= 18)
  console.log("Puedes entrar ahora");

console.log("Bienvenido!");

//
const nombreProducto1 = "T-Shirt";
const precioProducto1 = 50;
let cantidadProducto1 = 2;

const nombreProducto2 = "Jeans";
const precioProducto2 = 40;
let cantidadProducto2 = 1;

const totalDespuesDeDescuento = 45;

if (totalDespuesDeDescuento > 50) {
  console.log("Tienes envío gratis");
} else {
  console.log("Costes de envío aplicados");
}

let mensaje;
if (precioProducto1 < precioProducto2) {
  mensaje = "Producto T-shirt tiene mejor precio que Jeans"
} else {
  mensaje = `Producto ${nombreProducto1} es más caro que ${nombreProducto2}`
}
console.log(mensaje);

// ENCADENAMIENTO DE CONDICIONES
// If....else if .... else

const nota = 60;

if (nota >= 90) {
  console.log("Sobresaliente!");
} else if (nota >= 70) {
  console.log("Notable");
} else if (nota >= 50) {
  console.log("Aprobado");
} else {
  console.log("Suspendido");
}

let mensaje2;
const score = 95;
if (score >= 90) {
  mensaje2 = "Excelente";
} else if (score >= 70) {
  mensaje2 = "Bien";
} else {
  mensaje2 = "Necesitas mejorar";
}

console.log(mensaje2);


// Hoisting

// var:
console.log(userName);
var userName = "Alicia";

// con let
// console.log(userAge);
// let userAge = 30;

// CONDICIONES COMBINADAS:

const edad5 = 25;
const tieneLicencia = false;
const puedeConducir = edad5 >= 18 && tieneLicencia;

if (puedeConducir) {
  console.log("puedes conducir");
} else {
  console.log("no puedes conducir");
}

// caso práctico descuentos
const precioOriginal = 100;
const esEstudiante = false;
const esMiembro = true;

let precioFinal = precioOriginal;

if (esEstudiante) {
  precioFinal = precioOriginal * 0.8;
  console.log("Descuendo de estudiante aplicado");
} else if (esMiembro) {
  precioFinal = precioOriginal * 0.2;
  console.log("Descuendo miembro aplicado");
}

console.log(`Precio original: ${precioOriginal} €`);
console.log(`Precio final: ${precioFinal} €`);

console.log("\nEJERCICIO 2 - Par o Impar:");
const numero2 = 20;

if (numero2 % 2 === 0) {
  console.log(`El número ${numero2} es par`)
} else {
  console.log(`El número ${numero2} es impar`)
}

// OPERADOR TERNARIO
// () ? "" : ""; if...else

const edad3 = 20;

const mensaje3 = edad3 >= 18 ? "Mayor de edad" : "Menor de edad";
console.log(mensaje3);

let mensaje4;
if (edad3 >= 18) {
  mensaje4 = "Mayor de edad";
} else {
  mensaje4 = "Menor de edad";
}
console.log(mensaje4);

// caso práctico
const puntos2 = 50;
const estado = puntos2 >= 100 ? "VIP" : "Regular";
console.log("Estado del cliente:", estado);

let isLoggedIn;
const mensajeHome = isLoggedIn ? "Welcome back" : "Please login";
console.log(mensajeHome);

let isAdmin = true;

const mensajeHome2 = isLoggedIn && isAdmin
  ? "Admin Panel"
  : isLoggedIn
    ? "User panel"
    : "Login";

console.log(mensajeHome2);


// Nos vamos o no a Disney
const tenerVacaciones = false;
const suficienteDinero = false;
const hijaGustaDisney = false;

let mensajeFamilia;

if (tenerVacaciones && suficienteDinero && hijaGustaDisney) {
  mensajeFamilia = "Nos vamos a Disney!";
} else if (tenerVacaciones && suficienteDinero) {
  mensajeFamilia = "Vamos a Murcia";
} else {
  mensajeFamilia = "No podemos ir a Disney AÚN ni MURCIA";
}

console.log(mensajeFamilia);

console.clear();

// === SWITCH ===
// Podemos tener varias condiciones encadenadas, pero podemos mejorar la legibilidad y mantebilidad

const role = "editor";

if (role === "admin") {
  console.log("Full acces IF");
} else if (role === "editor") {
  console.log("Edit acces IF")
} else if (role === "viewer") {
  console.log("Read access IF")
} else {
  console.log("No access");
}

// REFACTOR con Switch ...case ...default
// VALIDA VALOR Y TIPO:

switch (role) {
  case "admin":
    console.log("Full acces SWITCH");
    break;
  case "editor":
    console.log("Edit access SWITCH");
    break;
  case "viewer":
    console.log("Read access SWITCH");
    break;
  default:
    console.log("No access SWITCH");
}

const dia = 5;

let diaDeLaSemana;

switch (dia) {
  case 1:
    diaDeLaSemana = "Lunes";
    break;
  case 2:
    diaDeLaSemana = "Martes";
    break;
  case 3:
    diaDeLaSemana = "Miércoles";
    break;
  case 4:
    diaDeLaSemana = "Jueves";
    break;
  case 5:
    diaDeLaSemana = "Viernes";
    break;
  case 6:
  case 7:
    diaDeLaSemana = "Fin de Semana!!!";
    break;
  default:
    diaDeLaSemana = "Día no válido";
}

console.log(diaDeLaSemana);


// Caso práctico calculadora:
const num1 = 10;
const num2 = 5;
const operacion = "-";

let resultado;
switch (operacion) {
  case "+":
    resultado = num1 + num2;
    break;
  case "-":
    resultado = num1 - num2;
    break;
  case "*":
    resultado = num1 * num2;
    break;
  case "/":
    resultado = num1 / num2;
    break;
  default:
    resultado = "Operación no válida";
}

console.log(resultado);