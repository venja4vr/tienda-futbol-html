// inicio_sesion.js

document.addEventListener('DOMContentLoaded', () => {
  // --- Helpers de UI ---
  const $ = (id) => document.getElementById(id);

  // Crea (o reutiliza) un <small> para mostrar error debajo del input
  function ensureErrorEl(input) {
    let el = input.nextElementSibling;
    if (!el || !el.classList?.contains('invalid-feedback')) {
      el = document.createElement('small');
      el.className = 'invalid-feedback d-block'; // visible al validar
      input.insertAdjacentElement('afterend', el);
    }
    return el;
  }

  function setOk(input, msg = '') {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    input.setCustomValidity(''); // para checkValidity()
    ensureErrorEl(input).textContent = msg ? msg : '';
  }

  function setError(input, msg) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    input.setCustomValidity(msg); // para checkValidity()
    ensureErrorEl(input).textContent = msg;
  }

  // --- Reglas ---

  // 1) Nombres: mínimo 3 letras (ignorando espacios)
  function validarNombres() {
    const input = $('nombres');
    const valor = (input.value || '').trim();
    const letras = valor.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g, '');
    if (letras.length < 3) {
      return setError(input, 'El nombre debe tener al menos 3 letras.');
    }
    setOk(input);
  }

  // 2) Apellidos: mínimo 8 letras y debe incluir un espacio (dos apellidos)
  function validarApellidos() {
    const input = $('apellidos');
    const valor = (input.value || '').trim();
    const letras = valor.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g, '');
    const tieneEspacio = /\s+/.test(valor);
    if (letras.length < 8 || !tieneEspacio) {
      return setError(
        input,
        'Apellidos: mínimo 8 letras y debe contener un espacio (dos apellidos).'
      );
    }
    setOk(input);
  }

  // 3) RUT: mínimo 11 caracteres y con puntos y guión (formato: XX.XXX.XXX-X)
  //    *No* calculo dígito verificador aquí; solo formato y longitud
  const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;
  function validarRut() {
    const input = $('rut');
    const valor = (input.value || '').trim();
    if (valor.length < 11 || !rutRegex.test(valor)) {
      return setError(
        input,
        'RUT inválido. Usa formato: 12.345.678-9 (con puntos y guión).'
      );
    }
    setOk(input);
  }

  // 4) Nacimiento: sin regla (dejamos siempre OK)
  function validarNacimiento() {
    const input = $('nacimiento');
    setOk(input); // siempre válido según tu pedido
  }

  // 5) País: sin regla (dejamos siempre OK)
  function validarPais() {
    const input = $('pais');
    setOk(input); // siempre válido según tu pedido
  }

  // 6) Email: formato ejemplo@ejemplo.com (básico sólido)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function validarCorreo() {
    const input = $('correo');
    const valor = (input.value || '').trim();
    if (!emailRegex.test(valor)) {
      return setError(input, 'Correo inválido. Ejemplo: usuario@dominio.com');
    }
    setOk(input);
  }

  // 7) Contraseña: 1 mayúscula, 1 minúscula, mínimo 8 caracteres
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  function validarPass() {
    const input = $('pass');
    const valor = input.value || '';
    if (!passRegex.test(valor)) {
      return setError(
        input,
        'La contraseña debe tener al menos 8 caracteres, 1 mayúscula y 1 minúscula.'
      );
    }
    setOk(input);
  }

  // --- Wire-up (en vivo) ---
  const form = $('formLogin');

  // Mapea id -> función para iterar fácil
  const rules = {
    nombres: validarNombres,
    apellidos: validarApellidos,
    rut: validarRut,
    nacimiento: validarNacimiento,
    pais: validarPais,
    correo: validarCorreo,
    pass: validarPass,
  };

  // Escuchar input/blur en cada campo
  Object.keys(rules).forEach((id) => {
    const input = $(id);
    if (!input) return;

    // valida mientras escribe
    input.addEventListener('input', rules[id]);

    // valida al salir del campo (por si pega y se va)
    input.addEventListener('blur', rules[id]);

    // estado inicial (vacío): no marcamos error hasta que toque el campo
    // pero si quieres marcar desde el inicio, descomenta:
    // rules[id]();
  });

  // Submit: valida todo y bloquea si algo falla
  form.addEventListener('submit', (e) => {
    // forzamos validar todo
    Object.values(rules).forEach((fn) => fn());

    if (!form.checkValidity()) {
      e.preventDefault();
      // Muestra el primer error nativo
      const primeroInvalido = form.querySelector('.is-invalid');
      if (primeroInvalido) primeroInvalido.reportValidity?.();
    }
  });
});
