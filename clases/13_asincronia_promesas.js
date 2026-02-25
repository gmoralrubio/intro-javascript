// console.log("promises");

// CALLBACKS -> una función que se ejecuta cuando termina una operación, y es la forma antigua de manejar asincronía

// setTimeout -> contra tiempo para ejecutar función

// console.log("1. Inicio");

// setTimeout(() => {
//   console.log("2. Esto se ejecuta después de un segudo");
// }, 2000);

// console.log("3. Esto se ejecuta, pero sale ANTES del timeout");

console.clear();


// function ensamblarChasis(callback) {

//   console.log("Ensamblando chasis...");

//   setTimeout(() => {
//     console.log("Chasis listo");
//     callback();
//   }, 1000);
// }

// function instalarMotor(callback) {

//   console.log("Instalando motor...");

//   setTimeout(() => {

//     console.log("Motor listo!");
//     callback();
//   }, 1000);
// }

// function montarRuedas(callback) {
//   console.log("Montando ruedas...");

//   setTimeout(() => {
//     console.log("Ruedas montadas!");
//     callback();
//   }, 1000)
// }

// function pintarCoche(callback) {
//   console.log("Pintando coche...");

//   setTimeout(() => {
//     console.log("Coche pintado!");
//     callback();
//   }, 1000);
// }

// ensamblarChasis(() => {
//   instalarMotor(() => {
//     montarRuedas(() => {
//       pintarCoche(() => {
//         console.log("Coche completado!");
//       })
//     })
//   })
// });

console.clear();

// PROMISES

// tres estados:
/**
 * Pending: operación en curso
 * Fullfiled: operación exitosa
 * Rejected: operación fallida
 */

// new Promise

const miPromesa = new Promise((resolve, reject) => {

  const exito = true;

  setTimeout(() => {

    if (exito) {
      resolve("Operación exitosa!");
    } else {
      reject("Algo salió mal");
    }
  }, 1000)

});

// console.log("Prmosea creada", miPromesa);

// then y catch

// miPromesa
//   .then(resultado => {
//     console.log("Then:", resultado);
//   })
//   .catch(error => {
//     console.error("Catch:", error);
//   })
//   .finally(() => {
//     console.log("Promesa finalizada");
//   });


// function planificarViajeDisney() {

//   return new Promise((resolve, reject) => {

//     console.log("Planificando viaje...");

//     setTimeout(() => {

//       const tienePresupuesto = true;
//       const hayVuelos = false;

//       if (tienePresupuesto && hayVuelos) {
//         resolve({
//           destino: "Disneyland Paris",
//           fecha: "07-12-2026",
//           pasajeros: 3,
//           hotel: "Disneyland Hotel"
//         })
//       } else {
//         reject({
//           code: 404,
//           msg: "No hay presupuesto"
//         })
//       }
//     }, 1500);
//   })
// }

// planificarViajeDisney()
//   .then(viaje => {
//     console.log("Viaje confirmado!");
//     console.log('Destino:', viaje.destino);
//     console.log("Fecha", viaje.fecha)
//   })
//   .catch(error => {
//     console.warn("Viaje cancelado", error)
//   });


// REFACTOR CADENA MONTAJE COCHES:

function ensamblarChasisPromise() {

  return new Promise((resolve) => {

    console.log("Ensamblando chasis...");

    setTimeout(() => {
      console.log("Chasis listo");
      resolve("chasis")
    }, 1000);
  })
}

function instalarMotorPromise() {

  return new Promise((resolve) => {

    console.log("Instalando motor...");

    setTimeout(() => {
      console.log("Motor listo!");
      resolve("motor");
    }, 1000);
  })
}

function montarRuedasPromise() {

  return new Promise((resolve) => {
    console.log("Montando ruedas...");

    setTimeout(() => {
      console.log("Ruedas montadas!");
      resolve("ruedas");
    }, 1000)
  })
}

function pintarCochePromise() {

  return new Promise((resolve, reject) => {
    console.log("Pintando coche...");

    setTimeout(() => {
      console.log("Coche pintado!");
      resolve("pintura");
    }, 1000);
  })
}


// Encadenar las promesas (muchos más legible)

// ensamblarChasisPromise()
//   .then(() => instalarMotorPromise())
//   .then(() => montarRuedasPromise())
//   .then(() => pintarCochePromise())
//   .then(() => {
//     console.log("Coche completado!");
//   })
//   .catch(error => {
//     console.log("Error:", error);
//   })

// MÉTODOS DE PROMESAS

// PROMISE.ALL - Esperar a que todas se resuelvan - array de promesas

// function descargarImagen(nombre, tiempo) {

//   return new Promise((resolve) => {

//     console.log(`Descargando ${nombre}...`);
//     setTimeout(() => {
//       console.log(`${nombre} descargada!`);
//       resolve(nombre);
//     }, tiempo)
//   })
// }

// const descargas = [
//   descargarImagen("foto1.png", 1000),
//   descargarImagen("foto2.png", 1500),
//   descargarImagen("foto3.jpg", 800)
// ];

// Promise.all(descargas)
//   .then(resultados => {
//     console.log("Todas las imágenes descargardas:", resultados)
//   })
//   .catch(error => {
//     console.error("Error en la descarga", error);
//   })


// === PROMISE.ALLSETTLED - Espera a todas las promesas (incluso si fallan)


// function fetchAPI(url, tiempoRespuesta, falla = false) {

//   return new Promise((resolve, reject) => {

//     console.log("fetching url:", url);

//     setTimeout(() => {
//       if (falla) {
//         console.log(`${url} falló`);
//         reject(`Error en ${url}`);
//       } else {
//         console.log(`${url} OK`);
//         resolve(`Datos obtenidos de ${url}`)
//       }
//     }, tiempoRespuesta)
//   })
// }

// const peticiones = [
//   fetchAPI("/api/users", 1000),
//   fetchAPI("/api/posts", 1500, true),
//   fetchAPI("/api/comments", 800)
// ];

// Promise.allSettled(peticiones)
//   .then(resultados => {
//     console.log("resultados de las peticiones", resultados)
//   })


// PROMISE.RACE - la primera que termine

// function servidorRespuesta(nombre, tiempo) {

//   return new Promise((resolve) => {

//     setTimeout(() => {
//       console.log(`${nombre} respondió`);
//       resolve(nombre);
//     }, tiempo)
//   })
// }

// const servidores = [
//   servidorRespuesta("Servidor EU", 1500),
//   servidorRespuesta("Servidor US", 1000),
//   servidorRespuesta("Servidor Asia", 2000)
// ];


// Promise.race(servidores)
//   .then(ganador => {
//     console.log(`Servidor más rápido: ${ganador}`);
//   })


// ==== PROMISE.ANY - La primera qu ese resuelva (ignora reject)

function intentarConexion(servidor, exito, tiempo) {

  return new Promise((resolve, reject) => {

    setTimeout(() => {
      if (exito) {
        console.log(`${servidor} conectado`);
        resolve(servidor)
      } else {
        console.log(`${servidor} falló`);
        reject(`Error en ${servidor}`)
      }
    }, tiempo);
  })
}

const intentos = [
  intentarConexion("Servidor 1", false, 500),
  intentarConexion("Servidor 2", true, 1000),
  intentarConexion("Servidor 3", false, 1500)
];

Promise.any(intentos)
  .then(exitoso => {
    console.log(`Conectado a ${exitoso}`)
  })
  .catch(() => {
    console.log("Todos los servidores fallaron")
  })
