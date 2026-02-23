
console.log("extra content");

// 1. Date -> para trabajar con fechas y horas

// fecha actual

const ahora = new Date();
console.log("fecha actual:", ahora);

const fecha1 = new Date(2026, 0, 17);
console.log(fecha1);

const fecha3 = new Date("2026-01-17");
console.log("fecha desde string:", fecha3);

const hoy = new Date();
console.log("Año:", hoy.getFullYear());
console.log("Mes:", hoy.getMonth()); // 0-11
console.log("Dia del mes:", hoy.getDate()); // 1-31


// ===== REGEX() ====

// Expresiones regulares, son patrones para busca y manipular texto

const regex1 = /hola/;
console.log("regex literal", regex1);


const texto = "Hola mundo. Hola a todos.";
const patron = /hola/i; //case insensitive

// test()
console.log("test():", patron.test(texto)); // true


function validarEmail(email) {

  const patron = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return {
    valido: patron.test(email),
    email
  }
}

console.log(validarEmail("ana@example.com"));
console.log(validarEmail("ana@"));
console.clear();


function validatePwd(password) {

  const requirements = {
    longitud: password.length >= 8,
    mayuscula: /[A-Z]/.test(password),
    minusculas: /[a-z]/.test(password),
    numero: /\d/.test(password),
    especial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  }

  const valid = Object.values(requirements).every(r => r)

  return {
    valid,
    requirements,
    message: valid ? "Contraseña segura" : "Contraseña débil"
  }
}

console.log(validatePwd("abc123"));
console.log(validatePwd("Abc12345"));
console.log(validatePwd("Abc12345@!"));
