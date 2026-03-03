// ============================================================
// MINI-HOTEL — Sistema de gestión de reservas
// ============================================================

import { generateReservationId, parseDate, calcNights, datesOverlap, isValidEmail, isValidPhone, isValidDNI } from './helpers.js';


// ─────────────────────────────────────────────
// DATOS INICIALES
// ─────────────────────────────────────────────

const initialRooms = [
  { number: 101, type: "single", pricePerNight: 50, status: "available", features: ["wifi", "tv"] },
  { number: 102, type: "single", pricePerNight: 50, status: "available", features: ["wifi", "tv"] },
  { number: 103, type: "single", pricePerNight: 50, status: "available", features: ["wifi", "tv", "balcony"] },
  { number: 104, type: "single", pricePerNight: 50, status: "maintenance", features: ["wifi"] },
  { number: 201, type: "double", pricePerNight: 80, status: "available", features: ["wifi", "tv", "minibar"] },
  { number: 202, type: "double", pricePerNight: 80, status: "available", features: ["wifi", "tv", "minibar"] },
  { number: 203, type: "double", pricePerNight: 80, status: "available", features: ["wifi", "tv", "minibar", "balcony"] },
  { number: 204, type: "double", pricePerNight: 80, status: "available", features: ["wifi", "tv"] },
  { number: 301, type: "suite", pricePerNight: 150, status: "available", features: ["wifi", "tv", "minibar", "jacuzzi"] },
  { number: 302, type: "suite", pricePerNight: 150, status: "available", features: ["wifi", "tv", "minibar", "jacuzzi", "balcony"] },
];



// ─────────────────────────────────────────────
// FUNCIÓN 1: createHotel
// Crea el objeto hotel con sus habitaciones y arrays vacíos de reservas e historial
// ─────────────────────────────────────────────
function createHotel(name, rooms) {
  return {
    name,
    rooms: rooms.map(room => ({ ...room })), // copia para no mutar el original
    reservations: [],
    history: [],
  };
}


// ─────────────────────────────────────────────
// FUNCIÓN 2: searchAvailableRooms
// Busca habitaciones disponibles para unas fechas, con filtro opcional por tipo
// ─────────────────────────────────────────────
function searchAvailableRooms(hotel, checkIn, checkOut, roomType = null) {
  // Habitaciones que no están en mantenimiento
  const activeRooms = hotel.rooms.filter(room => room.status !== "maintenance");

  // IDs de habitaciones ocupadas en ese rango de fechas
  const occupiedRoomNumbers = hotel.reservations
    .filter(res =>
      res.status !== "cancelled" &&
      datesOverlap(checkIn, checkOut, res.checkIn, res.checkOut)
    )
    .map(res => res.roomNumber);

  // Filtramos las disponibles
  return activeRooms.filter(room => {
    const isAvailable = !occupiedRoomNumbers.includes(room.number);
    const matchesType = roomType ? room.type === roomType : true;
    return isAvailable && matchesType;
  });
}


// ─────────────────────────────────────────────
// FUNCIÓN 3: createReservation
// Crea una nueva reserva con todas sus validaciones
// ─────────────────────────────────────────────
function createReservation(hotel, roomNumber, guestData, checkIn, checkOut) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Validaciones de fechas
  if (parseDate(checkIn) < today) {
    return { error: "La fecha de check-in no puede ser en el pasado." };
  }
  if (parseDate(checkOut) <= parseDate(checkIn)) {
    return { error: "La fecha de check-out debe ser posterior al check-in." };
  }

  const nights = calcNights(checkIn, checkOut);
  if (nights < 1 || nights > 14) {
    return { error: "La estancia debe ser de entre 1 y 14 noches." };
  }

  // Validaciones de datos del huésped
  if (!isValidEmail(guestData.email)) {
    return { error: "El formato del email no es válido." };
  }
  if (!isValidPhone(guestData.phone)) {
    return { error: "El teléfono no es válido. Debe empezar por +34 y tener 9 dígitos." };
  }
  if (!isValidDNI(guestData.dni)) {
    return { error: "El DNI no es válido. Formato esperado: 12345678A." };
  }

  // Comprobamos que la habitación existe y está disponible
  const room = hotel.rooms.find(r => r.number === roomNumber);
  if (!room) {
    return { error: `No existe la habitación número ${roomNumber}.` };
  }

  const availableRooms = searchAvailableRooms(hotel, checkIn, checkOut);
  const isAvailable = availableRooms.some(r => r.number === roomNumber);
  if (!isAvailable) {
    return { error: `La habitación ${roomNumber} no está disponible para esas fechas.` };
  }

  const totalPrice = nights * room.pricePerNight;

  const reservation = {
    id: generateReservationId(),
    roomNumber,
    guest: { ...guestData },
    checkIn,
    checkOut,
    nights,
    totalPrice,
    status: "confirmed",
    extras: [],
  };

  hotel.reservations.push(reservation);
  return reservation;
}


// ─────────────────────────────────────────────
// FUNCIÓN 4: addExtras
// Añade servicios extra a una reserva y recalcula el precio total
// ─────────────────────────────────────────────
function addExtras(hotel, reservationId, extras) {
  const reservation = hotel.reservations.find(res => res.id === reservationId);

  if (!reservation) {
    return { error: `No se encontró la reserva con ID ${reservationId}.` };
  }
  if (reservation.status === "cancelled" || reservation.status === "checked-out") {
    return { error: "No se pueden añadir extras a una reserva cancelada o finalizada." };
  }

  // Añadimos los extras al array existente
  extras.forEach(extra => reservation.extras.push({ ...extra }));

  // Recalculamos el precio total: habitación + suma de todos los extras
  const room = hotel.rooms.find(r => r.number === reservation.roomNumber);
  const roomCost = reservation.nights * room.pricePerNight;
  const extrasCost = reservation.extras.reduce((acc, e) => acc + e.price * e.quantity, 0);
  reservation.totalPrice = roomCost + extrasCost;

  return reservation;
}


// ─────────────────────────────────────────────
// FUNCIÓN 5: checkIn
// Realiza el check-in de una reserva confirmada
// ─────────────────────────────────────────────
function checkIn(hotel, reservationId) {
  const reservation = hotel.reservations.find(res => res.id === reservationId);

  if (!reservation) {
    return { error: `No se encontró la reserva con ID ${reservationId}.` };
  }
  if (reservation.status !== "confirmed") {
    return { error: `La reserva debe estar en estado "confirmada" para hacer el check-in. Estado actual: ${reservation.status}.` };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (today < parseDate(reservation.checkIn)) {
    return { error: `El check-in no puede realizarse antes de la fecha prevista (${reservation.checkIn}).` };
  }

  // Actualizamos el estado de la reserva y de la habitación
  reservation.status = "checked-in";
  reservation.realCheckIn = new Date().toISOString().split("T")[0];

  const room = hotel.rooms.find(r => r.number === reservation.roomNumber);
  room.status = "occupied";

  return `Check-in realizado con éxito. Bienvenido/a, ${reservation.guest.name}. Habitación: ${reservation.roomNumber}.`;
}


// ─────────────────────────────────────────────
// FUNCIÓN 6: checkOut
// Realiza el check-out y genera la factura detallada
// ─────────────────────────────────────────────
function checkOut(hotel, reservationId) {
  const reservationIndex = hotel.reservations.findIndex(res => res.id === reservationId);

  if (reservationIndex === -1) {
    return { error: `No se encontró la reserva con ID ${reservationId}.` };
  }

  const reservation = hotel.reservations[reservationIndex];

  if (reservation.status !== "checked-in") {
    return { error: `Solo se puede hacer check-out de reservas en estado "checked-in". Estado actual: ${reservation.status}.` };
  }

  // Actualizamos estados
  reservation.status = "checked-out";
  reservation.realCheckOut = new Date().toISOString().split("T")[0];

  const room = hotel.rooms.find(r => r.number === reservation.roomNumber);
  room.status = "available";

  // Movemos la reserva al historial
  hotel.history.push({ ...reservation });
  hotel.reservations.splice(reservationIndex, 1);

  // Generamos la factura
  const roomCost = reservation.nights * room.pricePerNight;
  const extrasCost = reservation.extras.reduce((acc, e) => acc + e.price * e.quantity, 0);

  const extrasDetail = reservation.extras.length > 0
    ? reservation.extras.map(e => `  - ${e.name}: ${e.quantity} x ${e.price}€ = ${e.quantity * e.price}€`).join("\n")
    : "  Sin extras.";

  const invoice = `
              FACTURA — ${reservation.id}

Huésped   : ${reservation.guest.name}
Email     : ${reservation.guest.email}
DNI       : ${reservation.guest.dni}

Habitación: ${reservation.roomNumber} (${room.type})
Check-in  : ${reservation.checkIn}
Check-out : ${reservation.realCheckOut}
Noches    : ${reservation.nights}

DESGLOSE:
  - Habitación: ${reservation.nights} noches x ${room.pricePerNight}€ = ${roomCost}€
${extrasDetail}

TOTAL     : ${reservation.totalPrice}€
Fecha de emisión: ${new Date().toLocaleDateString("es-ES")}
  `.trim();

  return invoice;
}


// ─────────────────────────────────────────────
// FUNCIÓN 7: cancelReservation
// Cancela una reserva aplicando la política de cancelación
// ─────────────────────────────────────────────
function cancelReservation(hotel, reservationId) {
  const reservationIndex = hotel.reservations.findIndex(res => res.id === reservationId);

  if (reservationIndex === -1) {
    return { error: `No se encontró la reserva con ID ${reservationId}.` };
  }

  const reservation = hotel.reservations[reservationIndex];

  if (reservation.status === "cancelled") {
    return { error: "La reserva ya estaba cancelada." };
  }
  if (reservation.status === "checked-out") {
    return { error: "No se puede cancelar una reserva ya finalizada." };
  }

  // Calculamos la penalización según los días que faltan para el check-in
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntilCheckIn = (parseDate(reservation.checkIn) - today) / (1000 * 60 * 60 * 24);

  let penalty = 0;
  let policyMessage = "";

  if (daysUntilCheckIn > 7) {
    penalty = 0;
    policyMessage = "Cancelación sin cargo (más de 7 días de antelación).";
  } else if (daysUntilCheckIn >= 3) {
    penalty = reservation.totalPrice * 0.5;
    policyMessage = `Penalización del 50% por cancelar entre 3 y 7 días antes del check-in.`;
  } else {
    penalty = reservation.totalPrice;
    policyMessage = `Penalización del 100% por cancelar con menos de 3 días de antelación.`;
  }

  // Actualizamos estados
  reservation.status = "cancelled";
  reservation.cancelledAt = new Date().toISOString().split("T")[0];

  // Si la habitación estaba ocupada (checked-in), la liberamos
  if (reservation.status === "checked-in") {
    const room = hotel.rooms.find(r => r.number === reservation.roomNumber);
    room.status = "available";
  }

  // Movemos al historial
  hotel.history.push({ ...reservation });
  hotel.reservations.splice(reservationIndex, 1);

  return `Reserva ${reservationId} cancelada. ${policyMessage} Importe de penalización: ${penalty}€.`;
}


// ─────────────────────────────────────────────
// FUNCIÓN 8: getOccupancyReport
// Genera un reporte de ocupación para una fecha concreta
// ─────────────────────────────────────────────
function getOccupancyReport(hotel, date) {
  const allRooms = hotel.rooms.filter(r => r.status !== "maintenance");

  // Una habitación está ocupada si existe una reserva activa donde: checkIn <= date < checkOut
  const occupiedRoomNumbers = hotel.reservations
    .filter(res =>
      res.status !== "cancelled" &&
      parseDate(res.checkIn) <= parseDate(date) &&
      parseDate(date) < parseDate(res.checkOut)
    )
    .map(res => res.roomNumber);

  const types = ["single", "double", "suite"];

  const byType = types.reduce((acc, type) => {
    const roomsOfType = allRooms.filter(r => r.type === type);
    const occupiedOfType = roomsOfType.filter(r => occupiedRoomNumbers.includes(r.number));
    acc[type] = {
      total: roomsOfType.length,
      occupied: occupiedOfType.length,
    };
    return acc;
  }, {});

  const totalRooms = allRooms.length;
  const totalOccupied = occupiedRoomNumbers.length;

  return {
    date,
    total: totalRooms,
    occupied: totalOccupied,
    available: totalRooms - totalOccupied,
    percentage: Math.round((totalOccupied / totalRooms) * 100),
    byType,
  };
}


// ─────────────────────────────────────────────
// FUNCIÓN 9: getRevenueReport
// Calcula los ingresos generados en un rango de fechas
// Solo cuenta reservas que hayan tenido check-out en ese periodo
// ─────────────────────────────────────────────
function getRevenueReport(hotel, startDate, endDate) {
  // Buscamos en el historial las reservas completadas dentro del rango
  const completedReservations = hotel.history.filter(res =>
    res.status === "checked-out" &&
    parseDate(res.realCheckOut) >= parseDate(startDate) &&
    parseDate(res.realCheckOut) <= parseDate(endDate)
  );

  const roomRevenue = completedReservations.reduce((acc, res) => {
    const room = hotel.rooms.find(r => r.number === res.roomNumber);
    return acc + res.nights * room.pricePerNight;
  }, 0);

  const extrasRevenue = completedReservations.reduce((acc, res) => {
    return acc + res.extras.reduce((sum, e) => sum + e.price * e.quantity, 0);
  }, 0);

  return {
    period: `${startDate} a ${endDate}`,
    rooms: roomRevenue,
    extras: extrasRevenue,
    total: roomRevenue + extrasRevenue,
    reservations: completedReservations.length,
  };
}


// ─────────────────────────────────────────────
// FUNCIÓN 10: getGuestHistory
// Devuelve todas las reservas de un cliente ordenadas por fecha
// ─────────────────────────────────────────────
function getGuestHistory(hotel, guestEmail) {
  // Buscamos en reservas activas + historial
  const allReservations = [...hotel.reservations, ...hotel.history]
    .filter(res => res.guest.email === guestEmail)
    .sort((a, b) => parseDate(a.checkIn) - parseDate(b.checkIn));

  if (allReservations.length === 0) {
    return { error: `No se encontraron reservas para el email ${guestEmail}.` };
  }

  const totalSpent = allReservations
    .filter(res => res.status === "checked-out")
    .reduce((acc, res) => acc + res.totalPrice, 0);

  return {
    guestEmail,
    guestName: allReservations[0].guest.name,
    totalReservations: allReservations.length,
    totalSpent,
    reservations: allReservations.map(res => ({
      id: res.id,
      status: res.status,
      checkIn: res.checkIn,
      checkOut: res.checkOut,
      totalPrice: res.totalPrice,
    })),
  };
}


// ============================================================
// EJEMPLOS DE USO
// ============================================================

const hotel = createHotel("Hotel Keepcoding", initialRooms);


// Buscar habitaciones disponibles
const available = searchAvailableRooms(hotel, "2026-04-01", "2026-04-05", "double");
console.log(`Habitaciones dobles disponibles: ${available.length}`);

// Crear una reserva
const reservation = createReservation(
  hotel,
  201,
  { name: "Ana García", email: "ana@example.com", phone: "+34 612345678", dni: "12345678A" },
  "2026-04-01",
  "2026-04-05"
);
console.log(`Reserva creada: ${reservation.id} — Total: ${reservation.totalPrice}€`);

// Añadir extras
addExtras(hotel, reservation.id, [
  { name: "Desayuno", price: 10, quantity: 4 },
  { name: "Parking", price: 15, quantity: 4 },
]);
console.log(`Total con extras: ${reservation.totalPrice}€`);

// Segunda reserva para poder probar el historial y el ckeck-in y check-out
const reservation2 = createReservation(
  hotel,
  101,
  { name: "Ana García", email: "ana@example.com", phone: "+34 612345678", dni: "12345678A" },
  "2026-03-02",
  "2026-03-13"
);
console.log(`Segunda reserva creada: ${reservation2.id}`);

// Check-in
const checkInResult = checkIn(hotel, reservation2.id);
console.log(checkInResult);

// Check-out (comentado para que en occupancy report aparezca la habitación ocupada)
// const invoice = checkOut(hotel, reservation2.id);
// console.log(invoice);

// Cancelar la primera reserva
const cancellation = cancelReservation(hotel, reservation.id);
console.log(cancellation);

// Reporte de ocupación
const occupancyReport = getOccupancyReport(hotel, "2026-03-03");
console.log("Reporte de ocupación:", occupancyReport);

// Reporte de ingresos (vacío hasta que haya check-outs en el historial)
const revenueReport = getRevenueReport(hotel, "2026-01-01", "2026-12-31");
console.log("Reporte de ingresos:", revenueReport);

// Historial del cliente
const guestHistory = getGuestHistory(hotel, "ana@example.com");
console.log("Historial de cliente:", guestHistory);


console.log(hotel);


// Consideraciones:

/**
- datesOverlap es el helper clave del ejercicio. La lógica checkIn1 < checkOut2 && checkOut1 > checkIn2 cubre todos los casos posibles de solapamiento de fechas sin necesidad de comparar caso a caso.

- createReservation devuelve un objeto { error: "..." } cuando algo falla, en lugar de lanzar un throw. Esto facilita que el código que la consume pueda simplemente comprobar if (reservation.error) sin necesidad de un try/catch.

- checkOut usa findIndex en lugar de find porque necesita el índice para poder hacer el splice y mover la reserva al historial. Es un buen ejemplo de cuándo findIndex es más útil que find.

- getOccupancyReport usa reduce para construir el objeto byType dinámicamente en lugar de escribir los tres tipos a mano, lo que lo hace más fácil de mantener si se añaden nuevos tipos de habitación.
 */