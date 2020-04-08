// variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


// event listeners
cargarEventListeners();

function cargarEventListeners(){
    // dispara cuando se presiona agregar al carrito
    cursos.addEventListener('click', comprarCurso);

    // cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // cuando se vacea el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // al cargar el documento, mostrar local storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}


// funciones
// funcion que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault(); 
    // delegation para agregar al carrito
    if (e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;

        // enviamos el curso para tomar los datos
        leerDatosCurso(curso);
    }
}

// lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);

}

// muestra el curso seleccionado en el carrito
function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width = 100>
        </td>    

        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);  
    guardarCursoLocalStorage(curso);          
}

// elminar curso del carrito
function eliminarCurso(e){
    e.preventDefault();
    let curso,
        cursoId;

    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }

    eliminarCursoLocalStorage(cursoId);
}

// vaciar carrito
function vaciarCarrito(e){
    e.preventDefault();
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
   
    // vaciar carrito del local storage
    vaciarLocalStorage();

    return false;

}

// alamacena cursos del carrito al local storage
 function guardarCursoLocalStorage(curso){
     let cursos;

    // toma valores del local storage
     cursos = obtenerCursosLocalStorage();

     // el curso seleccionado se agrega al arreglo
     cursos.push(curso);

     localStorage.setItem('cursos', JSON.stringify(cursos));

 }

// compreuba que haya elementos en local storage
 function obtenerCursosLocalStorage(){
     let cursosLS;

     // comprobamos si hay algo en local storage
     if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
     }
     else {

        cursosLS = JSON.parse(localStorage.getItem('cursos'));
     }
     return cursosLS;

 }

 //imprime los cursos de local storage en el carrito
 function leerLocalStorage(e) {
     e.preventDefault();
     let cursosLS;

     cursosLS = obtenerCursosLocalStorage();
     
     cursosLS.forEach(function(curso) {
         // construir el template
         const row = document.createElement('tr');
         row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width = 100>
        </td>    

        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
         `;
    listaCursos.appendChild(row);
     });
 }

 // elimina el curso o el id en local storage
 function eliminarCursoLocalStorage(curso){
     
        let cursosLS;
        // iteración comparando el id del curso con el de local storage
        cursosLS = obtenerCursosLocalStorage();
        cursosLS.forEach(function(cursoLS, index){
            if (cursoLS.id === curso) {
                cursosLS.splice(index, 1);
            };

        });
        localStorage.setItem('cursos', JSON.stringify(cursosLS));
 }

 // Elimina todos los cursos del local storage

 function vaciarLocalStorage(){
     localStorage.clear();
 }