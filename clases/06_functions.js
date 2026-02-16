console.log("Funciones");

// Declaración de funciones
/**
 * function nombreDeFunción(){
 * // Código...
 * }
 */
function saludo() {
  console.log("Hola y bienvenido a Keepcoding");
}

saludo();

// Parámetros
function saludarUsuario(nombre) {
  console.log(`Hola, ${nombre}, bienvenido!!`);
}

saludarUsuario("Alicia");
saludarUsuario("Zoe");
saludarUsuario("Guille");

// Calcular precio con descuento
function calcularDescuento(precio, descuento) {

  if (descuento === 100) {
    console.log("Enhorabuena, este producto es gratis");
    return;
  }

  const precioFinal = precio - (precio * descuento / 100);

  console.log(`Precio original: ${precio} €. Descuento: ${descuento} %. Precio final: ${precioFinal} €`);
}

calcularDescuento(100, 10);
calcularDescuento(100, 25);
calcularDescuento(95, 100);

// === Return ===

// mal:
function mostrarTotal(precio, cantidad) {
  console.log(precio * cantidad);
}

mostrarTotal(10, 3);

let invoice1 = mostrarTotal(10, 3);
console.log("invoice1", invoice1);

// bien:
function calcularTotal(precio, cantidad) {
  return precio * cantidad;
}

let invoice2 = calcularTotal(10, 3);
console.log("invoice2", invoice2);

let subtotal = calcularTotal(10, 3);
let tax = subtotal * 0.21;
let total = subtotal + tax;

console.log(`Subtotal: ${subtotal} €. Tax: ${tax.toFixed(2)}. Total: ${total.toFixed(2)}`);

// verificador de contraseña:
// comprobar que la contraseña tenga longitud mínima 8 caracteres, tenga números del 0 al 9, que contenga mayúscula

function comprobarPassword(password) {

  // 1. verificar que tiene longitud mínima 8 caracteres
  if (password.length < 8) {
    return "Contraseña muy corta!";
  }

  let hasNumber = false;
  if (password.includes("0") || password.includes("1") || password.includes("2") || password.includes("3") || password.includes("4") || password.includes("5") || password.includes("6") || password.includes("7") || password.includes("8") || password.includes("9")) {
    hasNumber = true;
  }

  if (!hasNumber) {
    return "La contraseña debe tener un número al menos";
  }

  // 3. Verificar si contine mayúsculas
  const hasUpperCase = password !== password.toLowerCase();

  if (!hasUpperCase) {
    return "Contraseña debe tener al menos una mayúscula";
  }

  return "Contraseña es válida";
}

console.log(comprobarPassword("abc"));
console.log(comprobarPassword("aabcdefghc"));
console.log(comprobarPassword("abcdefgh1"));
console.log(comprobarPassword("Abcdefgh1"));


// Early return: salida temprana de una función
function ejemploVacio() {
  console.log("Paso 1");

  return;
  console.log("Paso 2");
}

ejemploVacio();

function validarEdad(edad) {
  if (edad < 18) {
    console.log("Eres menor de edad");
    return;
  }

  console.log("Puedes continuar");
}
validarEdad(15);
validarEdad(25);

// para evitar if encadenados:
function procesarPago(cantidad) {

  let mensaje;

  if (cantidad <= 0) {
    mensaje = "Cantidad inválida";
    return mensaje;
  }

  if (cantidad > 1000) {
    mensaje = "No puedo procesar tanto dinero";
    return mensaje;
  }

  return mensaje = `Procesando pago de ${cantidad} €`;
}

console.log(procesarPago(0));
console.log(procesarPago(3000));
console.log(procesarPago(400));

// Es más limpio, reduce anidaciones if...else if...else. Mejora la legibilidad del código

console.clear();
// === SCOPE (ÁMBITO) de una función:

let appName = "Plataforma Keepcoding";
let maxLoginAttempts = 3;

function showAppInfo() {
  console.log(`App Name: ${appName}`);
  console.log(`Max login attempts: ${maxLoginAttempts}`);
}

showAppInfo();

// contador de intentos de sesión con variable local
let attemtps = 0; // Variable global está fuera de la propia función

function validarLogin(username, password) {

  let correctPassword = "secret123";

  attemtps++;

  // early return:
  if (attemtps > maxLoginAttempts) {
    return "Cuenta bloqueada - demasiados intentos"
  }

  if (password === correctPassword) {
    return `Bienvenido ${username}, intentos de login ${attemtps}`
  } else {
    return `Contraseña incorrecta, intentos de login: ${attemtps}`
  }
}

console.log(validarLogin("Miriam", "wrong1"));
console.log(validarLogin("Miriam", "wrong2"));
console.log(validarLogin("Miriam", "wrong3"));
console.log(validarLogin("Miriam", "secret123"));

console.clear();

// === FUNCIONES DE TIPO FLECHA ===
// Forma más moderna y más corta de escribir funciones

/**
 * Sintaxis básica:
 * 
 * (parámetros) => {
 *  código
 * }
 */

function saludarTradicional(nombre) {
  return "Hola " + nombre;
}

console.log(saludarTradicional("Pepe"));

// flecha:
const saludarFlecha = nombre => {
  return "Hola " + nombre;
}

console.log(saludarFlecha("Juanito"));

// return automático:
const sumar = (a, b) => a + b;

console.log(sumar(10, 5));

const mostrarMensaje = () => {
  console.log("Hola Mundo");
}

mostrarMensaje();

// Validacion rápida
const esAdulto = age => age >= 18;

console.log("es adulto:", esAdulto(15));

const esEmailValido = (email) => email.includes("@") && email.includes(".");

console.log("email es válido", esEmailValido("test@email.com"));

const esVacio = string => string.trim().length === 0;

console.log("es vacio", esVacio("  "));


/*
========================================
EJERCICIO: Detectar errores en funciones flecha
Hay varios errores en este código.
Encuéntralos y corrígelos.
========================================
*/

// 1. Error con return implícito
const sumarError = (a, b) => a + b;

console.log("Suma:", sumarError(4, 6));


// 2. Error con paréntesis faltantes
const saludar = (nombre, apellido) => {
  return "Hola " + nombre + " " + apellido;
};

console.log(saludar("Ana", "López"));


// 3. Error llamando antes de definir

// Primero definimos
const multiplicar = (a, b) => a * b;

// Luego la usamos
console.log(multiplicar(3, 5));


/// Con funciones tradicionlas si funciona llamarla antes de declararla
console.log(dividir(10, 2));

function dividir(a, b) {
  return a / b;
}


// 4. Error lógico
const esPar = numero => {
  if (numero % 2 === 0) {
    return "Es par";
  } else {
    return "Es impar";
  }
};

console.log(esPar(4));

console.clear();

// IIFE => Inmediately Invoked Function Expression
// Es una función que se define y se ejecuta inmediatamente

// Sintaxis básica:
/**
 * ( function(){} )();
 */

// No hace falta llamarla, se ejecuta en el momento que se define
(function () {
  console.log("Esta función se ejecuta automáticamente");
})();

(function (nombre) {
  console.log(`Hola ${nombre}`)
})("Augusto");

// Simular config inicial
const usuario = "Carlos";

(function (nombre) {

  console.log("Iniciando sesión para " + nombre);

  if (nombre === "Carlos") {
    console.log("acceso concedido")
  } else {
    console.log("Acceso denegado")
  }
})(usuario);