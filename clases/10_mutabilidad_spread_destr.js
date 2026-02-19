console.log("mutability");

// Mutabilidad

// Tipo de datos primitivos: son INMUTABLES (no se pieden cambiar);

let x = 10;
let y = x; // y copia el VALOR

console.log("x:", x);
console.log("y:", y);

x = 20;
console.log("x:", x);
console.log("y:", y);


// MUTABILIDAD EN ARRAYS -> si son mutables, apunta al mismo array

const arr1 = [1, 2, 3];
const arr2 = arr1; // No copia el array, sino que crea una REFERENCIA (apunta al mismo array);

console.log("arr1:", arr1);
console.log("arr2:", arr2);

arr1.push(4);

console.log("arr1", arr1);
console.log("arr2", arr2);


// Objetos tambien  trabajan por referencia
const obj1 = { name: "Miriam", age: 37 };
const obj2 = obj1;

obj1.age = 26;

console.log("obj1", obj1);
console.log("obj2", obj2);

console.clear();
// caso práctico - bug

const cartOriginal = [
  { name: "laptop", price: 999 },
  { name: "mouse", price: 25 },
];

console.log("Carrito original", cartOriginal);

// carrito de descuento:
const cartDiscount = cartOriginal;

for (let item of cartDiscount) {

  item.price = item.price * 0.9;
}

console.log("carrito original", cartOriginal);
console.log("carrito descuento", cartDiscount);


// INMUTABILIDAD - Object.freeze();

const user = {
  name: "Ana",
  age: 30,
};

user.age = 31;
user.city = "Madrid";

// delete user.name;

// console.log(user);

Object.freeze(user);

user.age = 32;
user.city = "Zaragoza";
delete user.name;

console.log(user);

// Object freeze es superficial
const car = {
  brand: "Seat",
  owner: {
    name: "Italo",
  }
};

Object.freeze(car);

car.brand = "Toyota";
car.owner.name = "Zoe";

console.log(car);

console.clear();


// ====== SPREAD OPERATOR ===== sintaxis -> ...

// SPREAD EN ARRAYS -> crea copias
const original = [1, 2, 3];
const copy = [...original]; // copia del array original

console.log(original);
console.log(copy);

copy.push(4);

console.log(original);
console.log(copy);

// SPREAD EN OBJETOS:
const person1 = { name: "Carlos", age: "30" };
const person2 = { ...person1 };

person2.age = 45;

console.log(person1);
console.log(person2);

console.clear();

// WARNING: Hace copias superficiales
// Se queda en el primer nivel;
// El primer es copia y los siguientes son referencias

const cart1 = {
  user: 'pepe',
  name: 'carrito1',
  products: [
    {
      name: "laptop", price: 999, discout: 15,
      views: {
        monday: '2',
      }
    },
    { name: "mouse", price: 25 }
  ]
};

const cart2Wrong = { ...cart1 }; // copia el array, pero los objeto son referencia

cart2Wrong.name = "carrito2";
cart2Wrong.products[0].name = "monitor";

console.log('cart1', cart1);
console.log('cart2Wrong: ', cart2Wrong);

const productsCopy = { ...cart1.products };

productsCopy[1].name = "keyboard";

console.log(productsCopy);

console.log(cart1.products.views);

// SOLUCIÓN: copia profunda manual
const copyCart = structuredClone(cart1);

copyCart.products[0].views = { monday: '45' };
console.log(copyCart.products[0].views);

console.log(copyCart);

console.clear();

// === DESCRUCTURING: -> EXTRAER VALORES O ELEMENTOS DE UNA FORMA MÁS ELEGANTE

// No modifica el array o el objeto

const colors = ["red", "green", "blue"];

const colors1 = colors[0];
const colors2 = colors[1];
const colors3 = colors[2];

console.log(colors1, colors2, colors3);

const [first, secondColor, third] = colors;

console.log(first, secondColor, third);

// saltar elementos:
const numbers = [1, 2, 3, 4, 5];
const [uno, , tres, , cinco] = numbers;

console.log(uno);
console.log(tres);
console.log(cinco);

const coord = [10, 20];

// x2 = 10
const [x2, y2] = coord;
console.log(`Coordenadas: x= ${x2}, y = ${y2}`);

// Desctructurting de objetos"

const user4 = {
  username: "ana_dev",
  email: "ana@example.com",
  age: 34,
  city: "Madrid",
};

const username4 = user4.username;
console.log(username4);

const email = "mail@mail.com";

// Con los dos puntos se renombran las variables del destructuring
const { username, email: emailNuevo, age, city } = user4;

console.log(emailNuevo);

// Valores por defecto:
const settings = {
  theme: "dark",
  language: "es",
};

// settings.notifications = true
const { theme, language, notifications = true } = settings;

console.log(theme, language, notifications);


// Rest de objeto usando destructuring

const fullUser = {
  id: 1,
  name: "Carlos",
  email: "carlos@email.com",
  password: "secret",
  role: "admin",
};

const { password, ...tutu } = fullUser;

console.log(`Password extraída: ${password}`);
console.log("Datos públicos:", tutu);

console.clear()
  ;// destructuring anidado:
const car45 = {
  brand: "Toyota",
  model: "Corolla",
  owner: {
    name: "pedro",
    phone: "+345556566"
  },
  specs: {
    year: 2020,
    color: " white"
  }
};

const nameNormal = car45.owner.name;


let {
  brand,
  owner: { name: ownerName, phone },
  specs: { year }
} = car45;


ownerName = "Gloria";

console.log(`Marca: ${brand}`);
console.log("Propietario:", ownerName);
console.log(`Año: ${year}`);

console.log(car45);