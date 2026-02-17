console.log("Objetos");

// Son colecciones de datos relacios
// Es una ficha de algo

// Un objeto almacena información usand pares clave-valor
// Clave (propiedad): el nombre de la información
// Valor: el dato en sí

const personArray = ["Ana", 25, "Madrid", "Developer"];

// Datos más organizados por propiedades
const personObject = {
  name: "Ana",
  age: 25,
  city: "madrid",
  job: "Developer"
};

console.log(personObject);
console.log("Nombre:", personObject.name);
console.log("Edad:", personObject.age);
console.log("Food:", personObject.food); // undefined


const product = {
  id: 1001,
  name: "laptop",
  brand: "Dell",
  price: 99.99,
  stock: 16,
  available: true,
};

// objeto vacío
const emptyObject = {};
emptyObject.price = 100;
emptyObject.name = "Mouse";

console.log(emptyObject);

// Valores de cualquier tipo:
const mixed = {
  text: "Hola",
  number: 42,
  boolean: true,
  nothig: null,
  list: [1, 2, 3],
  nested: {
    x: 10,
    y: 20
  }
};

console.log(mixed);

// Formas de acceder a una propiedad

const student = {
  name: "Pepe",
  age: 22,
  course: "Web Development",
  grade: 85,
};

// más común a la hora de acceder a una propiedad
console.log(`Nombre alumno: ${student.name}`);

// usando corchetes
console.log(`Nombre alumno: ${student["name"]}`);

console.log(mixed.nested);
console.log(mixed["nested"]);

// Cuando usar uno u otro
const restaurant = {
  name: "El Pollo loco",
  "opening hours": "9:00 - 22:00",
  "average-price": 25,
  "phone number": "123-456-78",
  opening: {
    firstHour: "9.00",
    lastHour: "22.00"
  }
};

// console.log(restaurant.opening hours); //
console.log(restaurant["opening hours"]);
console.log(restaurant.opening.firstHour);
console.log(restaurant["average-price"]);


const propertyName = "name";
console.log(restaurant[propertyName]);

console.clear();

// Modificar y añadir propiedades

const car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
  color: "white",
};

console.log("Original car", car);

car.year = 2021;
car.color = "red";
console.log("Después de modificar", car);

// añadir una NUEVA propiedad
car.price = 25000;
car.electric = false;

console.log("Después de añadir propiedades", car);


// Eliminar propiedades de un objeto - delete
const account = {
  username: "john_doe",
  email: "john_doe@email.com",
  password: "secret124",
  loginAttempts: 2
};

console.log("Account original", account);

delete account.loginAttempts;
delete account.password;

console.log("Después de eliminar", account);
console.clear();
// Limpiar carrito después de compra
const order = {
  items: ["Laptop", "Mouse"],
  total: 1025,
  tempDiscount: 50,
  couponCode: "TEM2024",
};

console.log("Compra inicial:", order);

order.total -= order.tempDiscount;

delete order.tempDiscount;
// order.total -= order.tempDiscount
// delete order.tempDiscount;
// delete order.couponCode;

console.log("Compra final", order);

console.clear();

const course = {
  name: "JS",
  hour: "19:00",
  price: 10,
};

const courseName = course.name;

delete course.name;

console.log(course);
console.log(courseName);


console.clear();
// RECORRER OBJETOS

// for...in iterar sobre las CLAVES de un objeto

const book = {
  title: "Javascript Guide",
  author: "John Doe",
  pages: 350,
  published: 2024,
  available: true,
};

console.log("Libro", book);

for (let key in book) {
  console.log(`${key}: ${book[key]}`);
}

console.clear();

// Caso práctico:validar campos de form
const formData = {
  username: "zoe_dev",
  email: "zoe@example.com",
  password: "pass123",
  confirmPasswprd: "",
  terms: false,
}

let hasError = false;

for (let field in formData) {

  const value = formData[field];

  if (value === "" || value === false) {
    console.log(`${field} Campo vacío o inválido`);
    hasError = true;
  } else {
    console.log(`${field}: OK`)
  }
}

if (hasError) {
  console.log("Formulario con errores");
} else {
  console.log("Formular válido");
}

console.clear();
// Contar tipos de propiedades
const data = {
  name: "Pepe",
  age: 40,
  active: true,
  score: "100",
  city: "Madrid",
  premium: false,
}

let strings = 0;
let numbers = 0;
let booleans = 0;

for (let key in data) {

  const value = data[key];

  if (typeof value === "string") strings++;
  if (typeof value === "number") numbers++;
  if (typeof value === "boolean") booleans++;

}

console.log(`Strings: ${strings}`);
console.log(`Numbers: ${numbers}`);
console.log(`Booleans: ${booleans}`);