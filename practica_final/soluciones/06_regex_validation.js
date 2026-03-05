// EJERCICIO 6: Validaciones con Regex

// Crear un sistema completo de validación de formularios usando expresiones regulares (regex).

// Debes crear una función validateForm(data) que valide todos los campos de un formulario.
/* Campos a validar:
  - Email: Formato válido, debe contener @y terminar en.loquesea
  - Password: Mínimo 8 caracteres, al menos una mayúscula, al menos una minúscula, al menos un número, al menos un caracter especial de estos: !@#$ %^&*
  - Phone: Asegurar que contiene + 34. Debe empezar por 6 o 7. El número de teléfono debe tener 9 dígitos.Puede tener espacios, guiones o estar junto.
  - DNI: Formato español: 12345678A, 8 dígitos seguidos de 1 letra mayúscula
  - Birthdate: Formato DD / MM / YYYY, Debe ser una fecha válida.La persona debe ser mayor de 18 años.
*/

// ─────────────────────────────────────────────
// FUNCIONES AUXILIARES DE VALIDACIÓN
// ─────────────────────────────────────────────


function validateEmail(email) {
  const errors = [];

  if (!email) {
    errors.push("El email es obligatorio");
    return errors;
  }

  const emailNormalized = email.trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailNormalized)) {
    errors.push("Formato de email inválido");
  }

  return { errors, value: emailNormalized };
}


function validatePassword(password) {
  const errors = [];

  if (!password) {
    errors.push("La contraseña es obligatoria");
    return errors;
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  if (!passwordRegex.test(password)) {
    errors.push(
      "La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y caracter especial (!@#$%^&*)"
    );
  }

  return errors;
}


function validatePhone(phone) {
  const errors = [];

  if (!phone) {
    errors.push("El teléfono es obligatorio");
    return errors;
  }

  const normalized = phone.replace(/[\s-]/g, "");

  const phoneRegex = /^\+34(6|7)\d{8}$/;

  if (!phoneRegex.test(normalized)) {
    errors.push(
      "Teléfono inválido. Debe ser +34 seguido de 9 dígitos empezando por 6 o 7"
    );
  }

  return { errors, value: normalized };
}


function validateDNI(dni) {
  const errors = [];

  const dniRegex = /^\d{8}[A-Z]$/;

  if (!dniRegex.test(dni)) {
    errors.push("DNI inválido. Formato: 12345678A");
  }

  return errors;
}


function validateBirthdate(birthdate) {
  const errors = [];

  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!dateRegex.test(birthdate)) {
    errors.push("Formato de fecha inválido. Use DD/MM/YYYY");
    return errors;
  }

  const [day, month, year] = birthdate.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  // Verificar que la fecha exista realmente
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    errors.push("Fecha inválida");
    return errors;
  }

  // Calcular edad
  const today = new Date();
  let age = today.getFullYear() - year;

  // Aquí verificamos esta condición: ¿Ya ha pasado su cumpleaños este año? (nos puede dar una edad incorrecta, por ejemplo un usuario que tenga 17 años, pero que aún no los haya cumplido. Si no lo verificamos, al hacer la resta 2026 - 2008 = 18, no cumpliríamos la condición de mayor de edad)

  // CASO 1: El mes actual es mayor ya pasó su cumpleaños (true)
  // CASO 2 — Es el mismo mes, pero ya pasó el día (true)
  // Es false cuando: Estamos en un mes anterior o estamos en el mismo mes pero el día todavía no llegó
  const hasHadBirthdayThisYear =
    today.getMonth() > month - 1 ||
    (today.getMonth() === month - 1 && today.getDate() >= day);

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  if (age < 18) {
    errors.push("Debe ser mayor de 18 años");
  }

  return { errors, age };
}



// ─────────────────────────────────────────────
// FUNCIÓN PRINCIPAL
// ─────────────────────────────────────────────

function validateForm(data) {

  // Usamos el array vacío errors, para luego mostrar si la validación es true o false. De igual forma en las funciones auxiliares. Si al final, errors es vacío, significa que no hay ningún error y por lo tanto los datos son válidos
  const errors = [];
  const processedData = {};

  // EMAIL
  const emailResult = validateEmail(data.email);
  if (emailResult.errors?.length) {
    errors.push({
      field: "email",
      message: emailResult.errors[0]
    });
  } else {
    processedData.email = data.email;
    processedData.emailNormalized = emailResult.value;
  }

  // PASSWORD
  const passwordErrors = validatePassword(data.password);
  if (passwordErrors.length) {
    errors.push({
      field: "password",
      message: passwordErrors[0]
    });
  }

  // PHONE
  const phoneResult = validatePhone(data.phone);
  if (phoneResult.errors?.length) {
    errors.push({
      field: "phone",
      message: phoneResult.errors[0]
    });
  } else {
    processedData.phone = phoneResult.value;
  }

  // DNI - Por privacidad, lo dejamos fuera de data.
  const dniErrors = validateDNI(data.dni);
  if (dniErrors.length) {
    errors.push({
      field: "dni",
      message: dniErrors[0]
    });
  }

  // BIRTHDATE
  const birthdateResult = validateBirthdate(data.birthdate);
  if (birthdateResult.errors?.length) {
    errors.push({
      field: "birthdate",
      message: birthdateResult.errors[0]
    });
  } else {
    processedData.age = birthdateResult.age;
  }

  return {
    valid: errors.length === 0,
    errors,
    data: processedData
  };
}



// ─────────────────────────────────────────────
// CASOS DE PRUEBA
// ─────────────────────────────────────────────

const formData = {
  email: "   ana@example.com",
  password: "Pass123!",
  phone: "+34 612 345 678",
  dni: "55399155K",
  birthdate: "15/03/1990"
};

console.log(validateForm(formData));


/* Caso con errores */

const invalidFormData = {
  email: "anaexample.com",
  password: "123",
  phone: "612345678",
  dni: "1234A",
  birthdate: "27/02/2012",
};

console.log(validateForm(invalidFormData));