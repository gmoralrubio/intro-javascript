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

console.clear();

// Filter - array.filter()
const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const numerosPares = numbers2.filter(num => num % 2 === 0);
console.log(numerosPares);

const allUser = [
  { name: "Ana", age: 25 },
  { name: "Carlos", age: 17 },
  { name: "Laura", age: 30 },
  { name: "Pedro", age: 16 },
];

// Obtener los usuarios +18
const adults = allUser.filter((user) => user.age >= 18);
console.log(adults);

const allProducts = [
  { name: "MacBook Pro", category: "laptops" },
  { name: "Magic Mouse", category: "accessories" },
  { name: "ipad pro", category: "tablets" },
  { name: "AirPods", category: "accessories" }
];


const searchTerm = "pro";

const searchResults = allProducts.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

console.log(searchResults);

console.clear()
// Reduce
// Sintaxis: array.reduce((accumulator, currentValue) => {...}, initialValue )

const nums = [1, 2, 3, 4, 5];

const sum = nums.reduce((acc, num) => {
  return acc + num;
}, 0);

console.log(`Suma total: ${sum}`);

const cart = [
  { name: "Laptop", price: 999, quantity: 1 },
  { name: "Mouse", price: 25, quantity: 2 },
  { name: "Keyboard", price: 75, quantity: 1 }
];

const totalCart = cart.reduce((total, item) => {

  return total + (item.price * item.quantity);
}, 0);

console.log("carrito", cart);
console.log("total carrito:", totalCart);

const scores = [85, 92, 78, 95, 88];

const maxScore = scores.reduce((max, score) => {

  return score > max ? score : max;
});

console.log(`Score máximo: ${maxScore}`);

const store = [
  { name: "laptop", category: "electronics" },
  { name: "shirt", category: "clothing" },
  { name: "mouse", category: "electronics" },
  { name: "pants", category: "clothing" },
  { name: "monitor", category: "electronics" },
  { name: "Lego", category: "toys" }
];

const grouped = store.reduce((groups, product) => {

  const category = product.category;

  if (!groups[category]) {
    groups[category] = [];
  }

  groups[category].push(product.name);
  return groups;

}, {});

console.log("Productos agrupados", grouped);

// Object.groupBy()

const mercado = [
  { nombre: "manzana", tipo: "fruta" },
  { nombre: "plátano", tipo: "fruta" },
  { nombre: "zanahoria", tipo: "verdura" }
];

const agrupado = Object.groupBy(mercado, (producto) => producto.tipo);
console.log(agrupado);

/**
 * const agrupado = [
 * {fruta: [{}, {} ]},
 * {verdura: [{}]}
 * ]
 *
 */

console.clear();

// Find
// Sintaxis: array.find();

const nums3 = [23, 7, 12, 5, 20];
const primerMayor10 = nums3.find(num => num > 10);

console.log(primerMayor10);

const users = [
  { id: 1, name: "Victor", active: true },
  { id: 2, name: "Luis", active: false },
  { id: 3, name: "Marta", active: true },
];

const user = users.find(u => u.id === 2);

console.log(user);
console.clear();

// Some
// Sintaxis: array.some(...)
// Devuelve true si al menos un elemento cumple la condición, y devuelve false si ninguno la cumple
// Para la ejecución cuando encuentra la primera coincidencia

const edades = [14, 17, 22, 15, 78, 90];

const hayAdulto = edades.some(e => e >= 18);
console.log("Hay adulto?", hayAdulto);


const carrito = [
  { producto: "libro", precio: 15, en_oferta: false },
  { producto: "curso", precio: 50, en_oferta: true },
  { producto: "teclado", precio: 120, en_oferta: false }
];

const tieneOferta = carrito.some(item => item.en_oferta);
console.log(`Tiene oferta? ${tieneOferta}`);

const hayCaros = carrito.some(item => item.precio > 100);
console.log(hayCaros);

console.clear();


// Every
// sintaxis: array.every(...);

const notas = [85, 90, 78, 92, 88];

// Esto es para saber si todos aprobaron
const todosAprobaron = notas.every(n => n >= 60);
console.log('Todos aprobaron?', todosAprobaron);


const inventario = [
  { producto: "manzana", stock: 50 },
  { producto: "pera", stock: 30 },
  { producto: "uva", stock: 0 },
];


const todoDisponible = inventario.every(p => p.stock > 0);
console.log("Todos disponibles", todoDisponible);

const datosValidos = inventario.every(p => p.stock >= 0);
console.log("Datos válidos", datosValidos);