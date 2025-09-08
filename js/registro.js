document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formRegistro');
   

  //limpia los campos al refrescar
  form.reset();

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // evitar que se envíe

    // lista de inputs
    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const rut = document.getElementById('rut');
    const correo = document.getElementById('correo');
    const pass = document.getElementById('pass');

    // limpiar estados anteriores
    [nombre, apellidos, rut, correo, pass].forEach(input => {
      input.classList.remove('is-valid', 'is-invalid');
    });

    // validaciones simples
    if (nombre.value.trim().length >= 3) {
      nombre.classList.add('is-valid');
    } else {
      nombre.classList.add('is-invalid');
    }

    if (apellidos.value.trim().length >= 3) {
      apellidos.classList.add('is-valid');
    } else {
      apellidos.classList.add('is-invalid');
    }


    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(correo.value.trim())) {
      correo.classList.add('is-valid');
    } else {
      correo.classList.add('is-invalid');
    }

    // Contraseña: mínimo 8, 1 mayúscula, 1 minúscula
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (passRegex.test(pass.value.trim())) {
      pass.classList.add('is-valid');
    } else {
      pass.classList.add('is-invalid');
    }
  });
});

