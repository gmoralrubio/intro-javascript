
// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

// Genera un ID único para cada reserva
export function generateReservationId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `RES-${timestamp}-${random}`;
}

// Convierte string "YYYY-MM-DD" a objeto Date (sin hora para evitar problemas de zona horaria)
export function parseDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Calcula la diferencia en días entre dos fechas string
export function calcNights(checkIn, checkOut) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return (parseDate(checkOut) - parseDate(checkIn)) / msPerDay;
}

// Comprueba si dos rangos de fechas se solapan
// Una reserva se solapa si: checkIn1 < checkOut2 && checkOut1 > checkIn2
export function datesOverlap(checkIn1, checkOut1, checkIn2, checkOut2) {
  return parseDate(checkIn1) < parseDate(checkOut2) &&
    parseDate(checkOut1) > parseDate(checkIn2);
}

// Validaciones con regex
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone) {
  // Debe empezar por +34, luego 6 o 7, y tener 9 dígitos en total
  return /^\+34[\s-]?[67]\d{2}[\s-]?\d{3}[\s-]?\d{3}$/.test(phone);
}

export function isValidDNI(dni) {
  return /^\d{8}[A-Z]$/.test(dni);
}