
// EJERCICIO 3: Transformaciones
/*
Un cliente tiene un array de desarrolladores y nos pide extraer información específica
usando métodos de arrays.Quiere obtener los programadores que tengan como habilidad
JavaScript y un listado de los proyectos en los que están trabajando
*/

const data = [
  {
    id: 1,
    nombre: 'Juan',
    habilidades: ['JavaScript', 'HTML', 'CSS'],
    proyectos: [
      { id: 1, nombre: 'Proyecto 1' },
      { id: 2, nombre: 'Proyecto 2' }
    ]
  },
  {
    id: 2,
    nombre: 'María',
    habilidades: ['Python', 'SQL', 'Django'],
    proyectos: [
      { id: 3, nombre: 'Proyecto 3' },
      { id: 4, nombre: 'Proyecto 4' }
    ]
  },
  {
    id: 3,
    nombre: 'Miriam',
    habilidades: ['UX', 'Figma', 'HTML', 'JavaScript'],
    proyectos: [
      { id: 5, nombre: 'Proyecto 1' },
      { id: 6, nombre: 'Proyecto 4' }
    ]
  }
];


// 1. Filtrar desarrolladores que tengan "JavaScript" como habilidad

const javascriptDevelopers = data.filter(dev => {
  return dev.habilidades.includes("JavaScript")
});

console.log(javascriptDevelopers);


// 2. Extraer un array con TODOS los nombres de proyectos (sin duplicados).

const allProjects = data
  .map(dev => dev.proyectos.map(p => p.nombre))   // [['Proyecto 1', 'Proyecto 2'], ['Proyecto 3', 'Proyecto 4'], ['Proyecto 1', 'Proyecto 4']]
  .flat();                                        // ['Proyecto 1', 'Proyecto 2', 'Proyecto 3', 'Proyecto 4', 'Proyecto 1', 'Proyecto 4']

const uniqueProjects = [...new Set(allProjects)];
console.log(uniqueProjects); // ['Proyecto 1', 'Proyecto 2', 'Proyecto 3', 'Proyecto 4']