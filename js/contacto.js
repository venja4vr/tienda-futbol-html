document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    // limpiar los campos al refrescar la página
    form.reset();

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que se envíe el formulario por defecto

        // imputs
        const nombre = document.getElementById('nombre');
        const correo = document.getElementById('email');
        const mensaje = document.getElementById('mensaje');

        // limpiar campos
        [nombre, correo, mensaje].forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });

        // validaciones
        let formularioValido = true;

        // validación del nombre: mínimo 3 caracteres
        if (nombre.value.trim().length >= 3) {
            nombre.classList.add('is-valid');
        } else {
            nombre.classList.add('is-invalid');
            formularioValido = false;
        }

        // validación del correo: formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(correo.value.trim())) {
            correo.classList.add('is-valid');
        } else {
            correo.classList.add('is-invalid');
            formularioValido = false;
        }

        // validación del mensaje: mínimo 10 caracteres
        if (mensaje.value.trim().length >= 10) {
            mensaje.classList.add('is-valid');
        } else {
            mensaje.classList.add('is-invalid');
            formularioValido = false;
        }

        // si el formulario es válido, muestra el mensaje de éxito
        if (formularioValido) {
            alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
            form.reset(); // Limpia los campos
        }
    });
});