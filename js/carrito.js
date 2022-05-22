const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

/* -------------------------------------------------------------------------- */
/*                                  FUNCIONES                                 */
/* -------------------------------------------------------------------------- */

cargarEventListener();

function cargarEventListener() {
    // Cuando agregamos, se hace mediante el boton "agregar a carrito"
    listaCursos.addEventListener('click', agregarCurso)

    // Cuando eliminamos, se hace mediante el boton "Vaciar Carrito"
    carrito.addEventListener('click', eliminarCurso)

    // Mostrar avance usuario Local Storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    })

    // Vaciar Carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reset
        carritoVacio();
        limpiarHTML();
    })
}

// Agregar un curso al listado
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se a añadido al carrito',
            showConfirmButton: false,
            timer: 1500
          })
    }
}

// Eliminar curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')) {
       const cursoId = e.target.getAttribute('data-id');
       

       // Eliminar del ArticulosCarrito por data-id
       articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
       Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Se a eliminado el curso del carrito',
        showConfirmButton: false,
        timer: 1500
      })
       carritoHTML(); // Actualizar el HTML

    }
}

// Leer contenido  del html + extrraccion de información curso
function leerDatosCurso(curso) {
    console.log(curso)
    // Crear el objeto con el contenido del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


// Existe el elemento en el carro?
const existe =  articulosCarrito.some( curso => curso.id === infoCurso.id);
if(existe) {
    // aumentar cantidad
    const curso = articulosCarrito.map( curso => {
        if(curso.id === infoCurso.id) {
            curso.cantidad++;
            return curso; // objeto actualizado
        }
        else{
            return curso; // objeto sin cambios
        }
    })
} else {

    // Agregar curso
    articulosCarrito = [...articulosCarrito, infoCurso];
}


    // Agregar elementos al carrito
    console.log(articulosCarrito)
    carritoHTML();
}

// Mostrar carro de compras
function carritoHTML() {

    //CLEAN
    limpiarHTML();

    // Recorrer carrito y generar listado
    articulosCarrito.forEach(curso => {
        const {
            imagen,
            titulo,
            precio,
            cantidad,
            id
        } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${imagen}" width="100">
        </td>
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td> <a href="#" class="borrar-curso" data-id="${id}"> X </a> </td>
        `;

        // Agregar elementos al listado del carro
        contenedorCarrito.appendChild(row);
    });

    // Agregar selección usuario al Local Storage
    mantenerStorage();
}

function mantenerStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}


// Eliminiar curso repetido del listado
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}


/* -------------------------------------------------------------------------- */
/*                                 SWEET ALERT                                */
/* -------------------------------------------------------------------------- */


function carritoVacio(){
Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'El carrito esta vacío',
    showConfirmButton: false,
    timer: 1500,
  })
}



