
// EJERCICIO 1: Presentación

/**
Crear un objeto que represente tu perfil como desarrollador. Debe tener los siguientes campos:
nombre, apellidos, un array con los temas del bootcamp que ya conoces, si tienes experiencia
previa programando (boolean), un array de objetos con información de alguna red social que
tengas (Linkedin, Github…), ese objeto debe tener el nombre y el link.
 */

const student = {
  name: "Ítalo",
  surname: "Ravina Clemente",
  topicsKnown: [
    "Variables. Operadores. Typeof",
    "Estructuras de control",
    "Métodos de strings. Truthy y false",
    "Arrays. Métodos de arrays. Bucles",
    "Funciones. Funciones avanzadas",
    "Objetos. Mutabilidad. Spread operator. Destructuring",
    "Programación funcional. Promesas, async/await",
    "Contenido extra (Date, regex, etc...)"
  ],
  previousDevExperience: true,
  social: [
    { name: "Linkedin", url: "https://www.linkedin.com/in/italofranco/" },
    { name: "Github", url: "https://github.com/Francker1" },
    { name: "Instagram", url: "https://www.instagram.com/italo.ravina/" }
  ]
};

console.log(student);