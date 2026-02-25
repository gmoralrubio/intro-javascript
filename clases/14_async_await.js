// console.log("async await");

function prepararIngredientes() {

  return new Promise((resolve, reject) => {

    const ok = true;
    console.log("Preparando ingredientes...");
    setTimeout(() => {

      if (ok) {
        console.log("Ingredientes listos");
        resolve();
      } else {
        reject({
          code: 404,
          msg: "No hay ingredientes"
        })
      }

    }, 1000);
  })
}

function cocinarPlato() {

  return new Promise((resolve) => {
    console.log("Cocinando...");
    setTimeout(() => {
      console.log("Plato cocinado");
      resolve();
    }, 1500)
  })
}

function servirPlato() {

  return new Promise((resolve) => {
    console.log("Sirviendo...");
    setTimeout(() => {
      console.log("Plato servido!");
      resolve();
    }, 500);
  })
}


// Then ... catch
// function cocinarConPromises() {

//   console.log("cocinar con promesas:")

//   return prepararIngredientes()
//     .then(() => cocinarPlato())
//     .then(() => servirPlato())
//     .then(() => {
//       console.log("Comida lista")
//     })
//     .catch(error => {
//       console.log("Error", error)
//     })
// }

// cocinarConPromises();

// ASYNC - AWAIT

// async function cocinarConAsync() {

//   console.log("Cocinando con Async/Await")

//   try {
//     await prepararIngredientes();
//     await cocinarPlato();
//     await servirPlato();
//     console.log('Comida lista!');
//   } catch (error) {

//     // CAPTURAR EL ERROR
//     console.error(" Esto ha fallado con error: ", error.msg);
//   } finally {
//     console.log("Todo ha finalizado, limpiar cocina");
//   }


// }

// cocinarConAsync();



// new Error

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function procesarPago(cantidad) {

  try {
    console.log(`Procesando pago de ${cantidad}`);

    await esperar(1000);

    if (cantidad <= 0) {
      throw new Error("Cantidad inválida");
    }

    if (cantidad > 1000) {
      throw new Error("Fondos insufcientes");
    }

    console.log("Pago procesado exitosamente");
    return { ok: true, cantidad, code: 200 }

  } catch (error) {
    console.error("Error en pago", error.message);
    return { ok: false, error }
  } finally {
    console.log("Cerrando conexión con el banco");
  }
}

(async () => {
  const process1 = await procesarPago(500);

  console.log(process1.ok);

  if (process1.ok) {
    alert("Todo ha ido bien, majo!")
  }

  // await procesarPago(1500);
  // await procesarPago(-100);
})();
