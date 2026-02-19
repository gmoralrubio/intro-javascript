console.log("funciones avanzadas");
// FUNCIONES AVANZADAS

// 1. PARÁMETROS PREDETERMINADOS

function greetOld(name) {

  if (name === undefined) {
    name = "Guest";
  }
  console.log(`Hola ${name}`);
}

greetOld("Pedro");
greetOld();

// Hay una manera mejor (ES6):
function greet(name = "Guest Predet", rol = "user") {
  console.log(`Hola ${name}, tu rol es ${rol}`);
}

greet("Angel", "admin");
greet();

function createUser(name = "anonymous", role = "user", active = true) {

  return {
    name,
    role,
    active: active
  }
}

console.log(createUser());
console.log(createUser("Adriana"));

// valores por defecto usand destructuring:
function connectDatabase(config = {}) {

  const {
    host = "localhost",
    port = 5432,
    database = "myapp",
    user = "admin",
    password
  } = config;

  console.log("Conectando a la base de datos:");
  console.log(`Host: ${host}, Puerto: ${port}, Database: ${database}, userName: ${user}`);
  console.log(` Password: ${password ? "***" : "No especificado"}`)
}

connectDatabase();
connectDatabase({ password: "secret1234" });
connectDatabase({
  host: 'production.db',
  port: 3306,
  password: "prod123"
});


// new Date();
function logMessage(message, timestamp = new Date().toISOString()) {

  console.log(`[${timestamp}]: ${message}`);
}

logMessage("Primera llamada");
logMessage("Segunda llamada");

console.clear();

// PARÁMETRO REST (...)
// Agrupar parámetros en un array

function sum(a, b) {
  return a + b;
}

console.log(sum(2, 3));
console.log(sum(2, 3, 7));

function sum1(...numbers) {

  console.log(`${numbers}`);

  let total = 0;
  for (let num of numbers) {
    total += num;
  }

  return total;

}

console.log(sum1(5, 10));
console.log(sum1(1, 2, 5, 10, 34));


console.clear();
// ===== CLOSURES O CIERRES

// Es una función que "recuerda" las variables de su entorno

function outer() {

  const message = "Hola desde fuera";

  function inner() {
    console.log(message); // inner puede acceder a message
  }

  return inner;
}

const myFunction = outer();
myFunction();


// DENTRO DE OBJETOS PUEDO GUARDAR LO QUE SEA, INCLUSO FUNCIONES  
// Caso práctico -> contador
function createCounter() {

  let count = 0; // variable privada

  return {
    increment: function () {
      count++;
      console.log("Count:", count);
    },
    decrement: function () {
      count--;
      console.log("Count:", count);
    },
    getCount: function () {
      return count;
    }
  }
}

const counter1 = createCounter();
counter1.increment();
counter1.increment();
counter1.increment();
counter1.decrement();
counter1.increment();
counter1.increment();
console.log("Valor actual:", counter1.getCount());

const counter2 = createCounter();
counter2.increment();
counter2.increment();
counter2.increment();

console.clear();

// CASO PRÁCTIC: Sistema de autenticación
function createAuth() {

  let isAuthenticated = false;
  let currentUser = null;

  return {

    login: function (username, password) {
      if (password === "secret123") {
        isAuthenticated = true;
        currentUser = username;
        console.log(`${username} is logged in`)
        return true;
      } else {
        console.log("Invalid crendentials");
        return false;
      }
    },
    logout: function () {
      if (isAuthenticated) {
        console.log(`Bye ${currentUser} logged out`);
        isAuthenticated = false;
        currentUser = null;
      }
    },
    getCurrentUser: function () {
      if (isAuthenticated) {
        return currentUser;
      } else {
        return null;
      }
    },
    isLoggedIn: () => isAuthenticated // return implícito
  }
}

const auth = createAuth();
console.log("Logged in?", auth.isLoggedIn());
auth.login("ana", "wrong");
auth.login("ana", "secret123");
console.log("Current user:", auth.getCurrentUser());
auth.logout();

const auth2 = createAuth();
auth2.login("pepe", "secret123");
auth2.logout();