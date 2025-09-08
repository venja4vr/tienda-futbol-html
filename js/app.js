// obtenemos el contenedor de los productos
const productosContainer = document.getElementById('productos-container');

// "contactamos al json"
fetch('data/productos.json')
  .then(response => response.json())
  .then(camisetas => {
    // iteramos sobre el array de camisetas
    camisetas.forEach(camiseta => {
      // calculamos si tiene descuento o no
      let precioFinal = camiseta.precio;
      if (camiseta.descuento > 0) {
        precioFinal = camiseta.precio * (1 - camiseta.descuento);
      }

      // creamos el html para las camisetas
      const cardHTML = `
        <div class="col-12 col-md-6 col-lg-4 mb-4">
          <div class="card h-100">
            <img src="${camiseta.img}" class="card-img-top" alt="Camiseta ${camiseta.nombre}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${camiseta.nombre}</h5>
              <p class="card-text mb-1">Equipo: <strong>${camiseta.equipo}</strong></p>
              <p class="card-text mb-1">Continente: <strong>${camiseta.continente}</strong></p>
              <p class="card-text mb-1">Descripción: <em>${camiseta.descripcion}</em></p>
              
              <div class="d-flex justify-content-between align-items-center mt-3">
                ${camiseta.descuento > 0 ? 
                  `<div>
                    <span class="text-muted text-decoration-line-through me-2">$${camiseta.precio.toLocaleString('es-CL')}</span>
                    <span class="fw-bold text-success">$${precioFinal.toLocaleString('es-CL')}</span>
                  </div>` :
                  `<span class="fw-bold">$${precioFinal.toLocaleString('es-CL')}</span>`}
              </div>

              <div class="mt-2">
                <strong>Tallas:</strong>
                ${camiseta.tallas.map(talla => `<span class="badge bg-secondary me-1">${talla}</span>`).join('')}
              </div>

              <button class="btn btn-primary mt-auto btn-ver-detalles" data-id="${camiseta.id}">Ver detalles</button>
            </div>
          </div>
        </div>
      `;
      // agregamos la tarjeta al contenedor
      //el += importante para que se rellenen todas las poleras y no solo la ultima
      productosContainer.innerHTML += cardHTML;
    });
    // Añadir el evento de click a los botones después de que se han creado
    document.querySelectorAll('.btn-ver-detalles').forEach(button => {
        button.addEventListener('click', function(event) {
            const idProducto = event.target.getAttribute('data-id');
            const productoSeleccionado = camisetas.find(c => c.id == idProducto);
            
            // guardar el producto en el localStorage para la página de detalle
            localStorage.setItem('productoDetallado', JSON.stringify(productoSeleccionado));

            // redireccionar a la página de detalle
            window.location.href = 'producto_detallado.html';
        });
    });
  })
  .catch(error => console.error('Error al cargar las camisetas:', error));
  