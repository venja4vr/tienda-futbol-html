document.addEventListener('DOMContentLoaded', function() {
    // Obtenemos el contenedor donde se mostrará el producto
    const detalleContainer = document.getElementById('detalle-producto-container');
    
    // Obtenemos el producto guardado en localStorage
    const productoDetalladoJSON = localStorage.getItem('productoDetallado');

    if (productoDetalladoJSON) {
        const camiseta = JSON.parse(productoDetalladoJSON);

        // Calculamos el precio final con descuento
        let precioFinal = camiseta.precio;
        if (camiseta.descuento > 0) {
            precioFinal = camiseta.precio * (1 - camiseta.descuento);
        }

        // Generamos el HTML detallado del producto
        const productoHTML = `
            <div class="col-md-6 d-flex justify-content-center align-items-center">
                <img src="${camiseta.img}" class="img-fluid" alt="Camiseta ${camiseta.nombre}">
            </div>
            <div class="col-md-6">
                <h1 class="mb-3">${camiseta.nombre}</h1>
                <p class="lead"><strong>Equipo:</strong> ${camiseta.equipo}</p>
                <p class="lead"><strong>Continente:</strong> ${camiseta.continente}</p>
                <p class="mt-4">
                    ${camiseta.descuento > 0 ? 
                    `<div>
                        <span class="text-muted text-decoration-line-through me-2 fs-5">$${camiseta.precio.toLocaleString('es-CL')}</span>
                        <span class="fw-bold text-success fs-4">$${precioFinal.toLocaleString('es-CL')}</span>
                    </div>` :
                    `<span class="fw-bold fs-4">$${precioFinal.toLocaleString('es-CL')}</span>`}
                </p>

                <hr class="my-4">
                
                <h5 class="mb-3">Descripción</h5>
                <p>${camiseta.descripcion}</p>

                <h5 class="mt-4 mb-2">Tallas disponibles</h5>
                <div class="d-flex flex-wrap">
                    ${camiseta.tallas.map(talla => `
                        <button type="button" class="btn btn-outline-secondary me-2 mb-2">${talla}</button>
                    `).join('')}
                </div>

                <div class="d-grid gap-2 mt-4">
                    <button class="btn btn-primary btn-lg">Añadir al carrito</button>
                </div>
            </div>
        `;
        
        // Insertamos el HTML en el contenedor
        detalleContainer.innerHTML = productoHTML;
        
    } else {
        // Si no se encuentra un producto, muestra un mensaje de error o redirecciona
        detalleContainer.innerHTML = `
            <div class="col-12 text-center">
                <h1>Producto no encontrado</h1>
                <p>Por favor, regrese a la <a href="productos.html">página de productos</a>.</p>
            </div>
        `;
    }
});