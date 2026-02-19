console.log('Programación funcional');

// COMPARACIÓN Imperative vs Funcional
const numbers = [1, 2, 3, 4, 5];

// tarea duplicar cada número

// Imperativa:
const doubled1 = [];
for (let i = 0; i < numbers.length; i++) {

  doubled1.push(numbers[i] * 2);
}

console.log("original", numbers);
console.log("duplicado imperativo:", doubled1);

// Estilo funcional: (le decimos QUÉ queremos)
const doubled2 = numbers.map(num => num * 2);
console.log("Duplicado funcional", doubled2);

// Código es más legible, a priori es menos propenso a errores

console.clear();
// CALLBACK FUNCTIONS
// Una función que se pasa como argumento a otra función, para ser ejecutada después

function greet(name) {
  console.log(`Hello ${name}`);
}

function processUser(username, callback) {

  console.log("Procesando usuario...");

  callback(username);
};

processUser("Ulises", greet);

const functionName = name => console.log(`Hola ${name}`);
processUser("Laura", functionName);

console.clear();

// === array.forEach()

// Ejecuta una función para cada elemento de un array
const fruits = ["apple", "banana", "orange"];

fruits.forEach(function (fruit) {
  console.log(fruit);
})

fruits.forEach(fruit => console.log(`Mi fruta: ${fruit}`));


// array.map() - transformar cada elemento -> DEVUELVE UN ARRAY NUEVO

const students = [
  { name: "Pepe", nota: 85 },
  { name: "Lucía", nota: 90 },
  { name: "Carlos", nota: 40 }
];

const studentsName = students.map(student => student.name);

console.log("Estudiantes completos", students);
console.log("Nombres de estudiantes", studentsName);

// Añadir propiedades a un array  de objetos:

const orders = [
  { id: 1, total: 100 },
  { id: 2, total: 250 },
  { id: 3, total: 50 },
];

const ordersWithTax = orders.map(order => ({
  ...order,
  tax: order.total * 0.21,
  finalTotal: order.total * 1.21,
}));

console.log("Pedidos originales", orders);
console.log("Pedidos con IVA", ordersWithTax);

// filter
// reduce
// find
// some
// every