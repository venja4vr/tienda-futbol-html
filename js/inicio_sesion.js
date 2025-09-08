document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formLogin');
   

  //limpia los campos al refrescar
  form.reset();

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // evitar que se envíe

    // lista de inputs
    const correo = document.getElementById('correo');
    const pass = document.getElementById('pass');

    // limpiar estados anteriores
    [correo, pass].forEach(input => {
      input.classList.remove('is-valid', 'is-invalid');
    });

        // validaciones
        let formularioValido = true;

    // validaciones simples
    // Email
    const emailIng = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailIng.test(correo.value.trim())) {
      correo.classList.add('is-valid');
    } else {
      correo.classList.add('is-invalid');
    }

    // Contraseña: mínimo 8, 1 mayúscula, 1 minúscula
    const passIng = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (passIng.test(pass.value.trim())) {
      pass.classList.add('is-valid');
    } else {
      pass.classList.add('is-invalid');
    }

        if (formularioValido) {
            alert('¡Inicio de sesion realizado con exito.');
            form.reset(); // Limpia los campos
        }
  });

});

