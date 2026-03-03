
// EJERCICIO 5: Gestión de Taller

/*
Retomamos el ejercicio del parque de coches que vimos en clase. De tal forma que vamos a ampliar las funciones para gestionar el inventario del taller. 
Datos base: Usa el modelo de datos que creamos en clase (puedes simplificarlo si lo necesitas) y añade 5 coches más, con diferentes datos.
*/

const tallerCoches = [
  {
    licensePlate: "1234-ABC",
    brand: "Toyota",
    model: "Corolla",
    year: 2019,
    kilometers: 45000,
    owner: {
      name: "Ana García",
      phone: "+34 612 345 678"
    },
    safety: {
      hasV16Beacon: true,
      v16Approved: true,
      lastITV: "2024-01-10"  // caducada (más de 1 año)
    },
    tires: {
      frontLeft: 2.2,
      frontRight: 2.2,
      rearLeft: 1.7,
      rearRight: 2.0
    },
    visits: [
      { date: "2024-01-10", service: "ITV", cost: 45, description: "ITV pasada con éxito" },
      { date: "2024-06-20", service: "Cambio de aceite", cost: 80, description: "Aceite 5W30 + filtro" }
    ]
  },
  {
    licensePlate: "5678-XYZ",
    brand: "Ford",
    model: "Focus",
    year: 2017,
    kilometers: 98000,
    owner: {
      name: "Carlos López",
      phone: "+34 699 876 543"
    },
    safety: {
      hasV16Beacon: false,
      v16Approved: false,
      lastITV: "2025-03-15"  // vigente
    },
    tires: {
      frontLeft: 1.5,  // baja presión
      frontRight: 2.1,
      rearLeft: 2.0,
      rearRight: 1.4   // baja presión
    },
    visits: [
      { date: "2025-03-15", service: "Revisión general", cost: 120, description: "Frenos + ITV" }
    ]
  },
  {
    licensePlate: "9999-ZZZ",
    brand: "Seat",
    model: "Ibiza",
    year: 2021,
    kilometers: 22000,
    owner: {
      name: "María Torres",
      phone: "+34 655 111 222"
    },
    safety: {
      hasV16Beacon: true,
      v16Approved: true,
      lastITV: "2023-11-01"  // caducada (más de 1 año)
    },
    tires: {
      frontLeft: 2.3,
      frontRight: 2.3,
      rearLeft: 2.1,
      rearRight: 2.2
    },
    visits: []
  },
  {
    licensePlate: "7634-LBN",
    brand: "Seat",
    model: "Tarraco",
    year: 2019,
    kilometers: 149000,
    owner: {
      name: "Francisco Antón",
      phone: "+34 666 333 444"
    },
    safety: {
      hasV16Beacon: false,
      v16Approved: false,
      lastITV: "2026-11-01"
    },
    tires: {
      frontLeft: 1.3,
      frontRight: 2.3,
      rearLeft: 2.1,
      rearRight: 2.2
    },
    visits: [
      { date: "2020-01-10", service: "Revisión sonido motor", cost: 1100, description: "Motor con cadena estropeada" },
      { date: "2022-09-19", service: "Líquido refrigerante", cost: 10, description: "Líquido SW100 añadido" },
      { date: "2024-10-03", service: "Cambio rueda delantera derecha", cost: 60, description: "Rueda delantera derecha con pinchazo" }
    ]
  },
  {
    licensePlate: "6349-HYU",
    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    kilometers: 20000,
    owner: {
      name: "Hermione Granger",
      phone: "+34 766 733 744"
    },
    safety: {
      hasV16Beacon: true,
      v16Approved: false,
      lastITV: "2024-11-01"
    },
    tires: {
      frontLeft: 1.4,
      frontRight: 2.3,
      rearLeft: 2.1,
      rearRight: 0.9
    },
    visits: []
  }
];


// ─────────────────────────────────────────────
// 1. getCarsWithBeacon
// Filtra los coches que tienen baliza V16 (hasV16Beacon === true)
// ─────────────────────────────────────────────
function getCarsWithBeacon(cars) {
  return cars.filter(car => car.safety.hasV16Beacon);
}

console.log(getCarsWithBeacon(tallerCoches));

// ─────────────────────────────────────────────
// 2. getCarsWithApprovedBeacon
// Filtra los coches que tienen baliza V16 Y además está homologada
// Ambas condiciones deben cumplirse a la vez
// ─────────────────────────────────────────────
function getCarsWithApprovedBeacon(cars) {
  return cars.filter(car => car.safety.hasV16Beacon && car.safety.v16Approved);
}

console.log(getCarsWithApprovedBeacon(tallerCoches));

// ─────────────────────────────────────────────
// 3. getCarsWithLowPressure
// Comprueba las 4 ruedas de cada coche.
// Si alguna está por debajo del mínimo, incluye el coche en el resultado
// junto con un array que indica qué ruedas están bajas y su valor.
// ─────────────────────────────────────────────
function getCarsWithLowPressure(cars, minPressure) {
  // Mapeamos todos los coches para calcular sus ruedas bajas
  const results = cars.map(car => {
    const { frontLeft, frontRight, rearLeft, rearRight } = car.tires;

    // Construimos un array con cada rueda y su presión
    const allTires = [
      { position: "Delantera izquierda", pressure: frontLeft },
      { position: "Delantera derecha", pressure: frontRight },
      { position: "Trasera izquierda", pressure: rearLeft },
      { position: "Trasera derecha", pressure: rearRight },
    ];

    // Filtramos solo las que están por debajo del mínimo
    const lowTires = allTires.filter(tire => tire.pressure < minPressure);

    return { car, lowTires };
  });


  // Solo devolvemos los coches que tienen al menos una rueda baja
  return results
    .filter(({ lowTires }) => lowTires.length > 0)
    .map(({ car, lowTires }) => ({
      licensePlate: car.licensePlate,
      brand: car.brand,
      model: car.model,
      owner: car.owner.name,
      lowTires, // ruedas problemáticas con su presión
    }));
}

// Si quisiera manejar un caso en el que mostrar un mensaje si no hay coches que cumplan la condición de presión de las ruedas:
const carsWithLowPressure = getCarsWithLowPressure(tallerCoches, 1.5);
const lowTiresMessage = carsWithLowPressure.length ? carsWithLowPressure : "No se encontraron coches con presión baja en las ruedas.";
console.log(lowTiresMessage);

// ─────────────────────────────────────────────
// 4. getCarReport
// Busca un coche por matrícula con .find().
// Si no existe, devuelve un mensaje de error claro.
// Si existe, construye un informe en texto con toda la info relevante.
// ─────────────────────────────────────────────
function getCarReport(cars, licensePlate) {
  const car = cars.find(c => c.licensePlate === licensePlate);

  if (!car) {
    return `No se encontró ningún coche con la matrícula "${licensePlate}".`;
  }

  const { safety, tires, visits, owner } = car;

  // Datos básicos
  const basicInfo = `Matrícula: ${car.licensePlate}. Marca y modelo: ${car.brand} ${car.model}. Año: ${car.year}. Kilómetros: ${car.kilometers.toLocaleString("es-ES")} km.`;

  // Propietario
  const ownerInfo = `Propietario: ${owner.name}. Teléfono: ${owner.phone}.`;

  // Seguridad
  const safetyInfo = `Baliza V16: ${safety.hasV16Beacon ? "Sí" : "No"}. Homologada: ${safety.v16Approved ? "Sí" : "No"}. Última ITV: ${safety.lastITV}.`;

  // Ruedas
  const tiresInfo = `Presión de ruedas — Delantera izq: ${tires.frontLeft} bar. Delantera dcha: ${tires.frontRight} bar. Trasera izq: ${tires.rearLeft} bar. Trasera dcha: ${tires.rearRight} bar.`;

  const visitHistory = visits.map(v => `${v.date} — ${v.service}`).join(", ");
  const visitHistoryMessage = visitHistory ? `Visitas: ${visitHistory}` : "Sin visitas registradas.";

  // Historial de visitas — alternativa a .join() con reduce
  /* const visitHistory = visits.length === 0
    ? "Sin visitas registradas."
    : visits.reduce((acc, v) => {
      return acc + `${v.date} — ${v.service} (${v.cost}€): ${v.description}. `;
    }, "Visitas: ");
  */
  return `${basicInfo}\n\n${ownerInfo}\n\n${safetyInfo}\n\n${tiresInfo}\n\n${visitHistoryMessage}`;
}

console.log(getCarReport(tallerCoches, "7634-LBN"));