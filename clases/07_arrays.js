console.log("arrays");

// Listado de estudiantes de una clase
const estudiante1 = "Nerea";
const estudiante2 = "Guille";

const estudiantes = ["Nerea", "Guille", "Julia", "Angel", "Ulises", "Cheryl", "Alicia", "Gala"];
console.log(estudiantes);

const carritoCompra = [19.99, 45, 8.60];
console.log(carritoCompra);

const mixed = ["Ana", 25, true, 19.99];
console.log("arary mixto", mixed);

// Acceder a elementos de un array
const playList = ["Song1", "Song2", "Song3", "Song4", "Song5"];

console.log(playList[0]);
console.log(playList[4]);

console.log(playList.length);
console.log(playList[playList.length - 1]);

// split()
let message = "Hola que tal".split("");
console.log(message);

// Modificar elementos de un array
const inventario = ["Laptop", "Mouse", "Teclado"];
console.log(inventario);

inventario[1] = "Mouse sin cable";
console.log("Inventario después de  modificar:", inventario);

const calificaciones = [85, 90, 75, 99, 92];

console.log("Alumno X calificacion:", calificaciones[2]);
calificaciones[2] = 95;

console.log("Nueva calificación:", calificaciones[2]);

const taskStatus = ["pending", "completed", "cancelled"];
console.log("Antes de completar tarea 1:", taskStatus);

taskStatus[0] = "completed";
console.log("Después de completar tarea 1:", taskStatus);

console.clear();
// Length - longitud de un array
const cities = ["Madrid", "Mallorca", "Cáceres", "Machala", " Mexico DF", "Toledo"];

console.log('Ciudades', cities);
console.log(cities.length);

const todoList = ["picar código", "dormir"];

const todoListLength = todoList.length;

if (todoListLength === 0) {
  console.log("No tienes tareas pendientes")
} else {
  console.log(`Tienes ${todoListLength} tarea por hacer`);
}

// Métodos básicos de arrays:

// array.push() - agregar un elemento al final de un array
cities.push("Lima");

console.log("Cities con push", cities);

cities.push("Oviedo");
console.log(cities);

const alerts = [];
alerts.push("Nuevo mensaje recibido");
alerts.push("Actualización disponible");
alerts.push("Batería baja");

console.log(alerts);

// array.pop() -> Eliminar del final

const removed = cities.pop();
console.log("Cities eliminando última ciudad:", removed);

console.log(cities);

// Deshacer acciones
const history = ["Acción 1", "Acción 2", "Acción 3"];
console.log(history);

const lastAction = history.pop();
console.log("Deshaciendo: ", lastAction);
console.log("Historial actualizado", history);

// UNSHIFT - Agregar al inicio
const priorities = ["Media", "Baja"];
console.log("Prioriades", priorities);

priorities.unshift("Alta");
console.log("Prioridades actualizadas", priorities);


// SHIFT - Elimina del inicio
priorities.shift();
console.log("Tareas:", priorities);

priorities.shift();
console.log(priorities);


console.clear();

// Búsqueda de elementos dentro de un array
const menu = ["Hotdog", "Burger", "Pizza", "Salad", "Pizza"];
console.log("Manu:", menu);

// array.indexOf("elemento")
console.log(menu.indexOf("Pasta")); // 2
console.log("Pizzas:", menu.indexOf("Pizza")); // 0 -> Devuelve la posición del primer elemento que encuentre
console.log(menu.indexOf("Sushi")); // -1

// Caso práctico - verificar disponibilidad

const tienda = ["Laptop", "Mouse", "Keyboard", "Monitor"];
const productoBuscar = "Phone";
const posicion = tienda.indexOf(productoBuscar);

if (posicion !== -1) {
  console.log(`${productoBuscar} encontrado! en posicion ${posicion}`);
} else {
  console.log(`${productoBuscar} no disponible`);
}

// array.includes("") - Verificar si existe devuelve tru o false
const allowedUser = ["admin", "user1", "user2", "moderator"];

console.log(allowedUser.includes("admin"));
console.log(allowedUser.includes("guest"));

// Función de sistemas de permisos

function checkAccess(username) {

  const authorizedUsers = ["alice", "bob", "charlie"];

  if (authorizedUsers.includes(username)) {
    return `Acceso concedido a ${username}`;
  } else {
    return `Acceso DENEGADO a ${username}`;
  }
}

console.log(checkAccess("alice"));
console.log(checkAccess("hacker"));

// Verificar lista de ingredientes alérgenos
const ingredients = ["flour", "eggs", "milk", "sugar", "nuts"];
const allergies = ["nuts", "shellfish"];

let hasDanger = false;
if (ingredients.includes(allergies[0]) || ingredients.includes[1]) {
  hasDanger = true;
}

if (hasDanger) {
  console.log("Contiene ingredientes alérgenos");
} else {
  console.log("Producto seguro para este usuario");
}
