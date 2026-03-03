
// EJERCICIO 4: Arreglar bug asíncrono

/*
El cliente está intentando obtener datos de un usuario usando su ID (el ID 1 debería existir), 
pero siempre obtiene undefined. Nos ha pasado el código para que lo revisemos y
arreglemos.
*/

// 1. ¿Por qué devuelve undefined?
// setTimeout es asíncrono. La función getUser termina su ejecución. Hace return user. Pero el setTimeout todavía no se ha ejecutado

// 2. Explica qué es la asincronía y por qué causa este problema
/**
 * JavaScript es single-threaded, pero puede delegar tareas (como setTimeout, fetch, etc.) al entorno del navegador o Node.
 * Cuando usamos código asíncrono:
 * - Se envía la tarea
 * - JS sigue ejecutando el código
 * - Cuando la tarea termina, vuelve al event loop
 */


// 3. Solución:
/**
 * Ahora hacemos que la función DEVUELVA una Promise.
 * Funciona porque:
 * - No devolvemos el usuario directamente
 * - Devolvemos una Promise
 * - Esperamos el resultado y lo consumimos
 */


// Código arreglado:

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve({ id: 1, name: "John Doe" });
      } else {
        reject("Usuario no encontrado");
      }
    }, 2000);
  });
}


// Puedes usar una de las dos siguientes formas de consumir una promesa:

// 1. Usando then...catch (promises)
getUser(1)
  .then(user => {
    console.log("Usuario:", user);
  })
  .catch(error => {
    console.log("Error:", error);
  });


// 2. Usando async/await:
async function main() {
  try {
    const user = await getUser(1);
    console.log("Usuario:", user);
  } catch (error) {
    console.log("Error:", error);
  }
}

main();