// js para logica interna
// array de tareas nuevo (que se ajusta a modal)
class Tareas {
    constructor(titulo, descripcion) {
      this.id = Date.now(); // agregar varias tareas al mismo tiempo con diferente id automaticamente
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.completed = false;
    }
  }
  
// Array para almacenar tareas
   let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Guardar tareas en localStorage
 function guardarTareasEnLocal() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }
 
// Funcion de mostrar tareas (lo de tachar y borrarla), span: tiene el texto, inner: concatena
  function mostrarTareas() {
    listaTareas.innerHTML ='';
    tareas.forEach((tarea) => {
      listaTareas.innerHTML += `
        <li class="tarea-lista">
        <div class="tarea-contenido"> 
          <span class="${tarea.completed ? 'completed' : ''}" data-id="${tarea.id}"> 
            ${tarea.titulo}
          </span>
          <p class="${tarea.completed ? 'completed' : ''}">${tarea.descripcion}</p>
          </div>
          <div class="botones-tareas">
          <button class="complete-boton" data-id="${tarea.id}">
            ${tarea.completed ? 'Deshacer' : 'Completar'}
          </button>
          <button class="delete-boton" data-id="${tarea.id}">Eliminar</button> 
          <button class="edit-boton" data-id="${tarea.id}">Editar</button>
        </div>
        </li>
      `;
    });
    
// Mostrar el total de tareas añadidas
    contadorTarea.textContent =  `Total de tareas: ${tareas.length}`;
     // para que los botones sigan funcionando (reactivarlos)
    tareaEdit();
    borrarTarea();
    completeDeshacer();
  }

// Primera función que permite agregar las tareas al momento de clickear el botón de "guardar" de modal

  function agregarTarea () {
    const nuevoTitulo = document.getElementById("guardoTitulo").value
    const nuevaDescrip = document.getElementById("guardoDescripcion").value // value ya que es un input
    if (nuevoTitulo !== '' && nuevaDescrip !== '') { // saveNuevaT es de guardar nueva tarea
     if (saveNuevaT !== null) { // para editar tarea existente
      const tarea = tareas.find(task => task.id === saveNuevaT);
      tarea.titulo = nuevoTitulo;
      tarea.descripcion = nuevaDescrip;
      saveNuevaT = null; // indicación que es de agregar
     } else {
      const newTask = new Tareas(nuevoTitulo, nuevaDescrip) 
      tareas.push(newTask);
     }
      mostrarTareas();
      guardarTareasEnLocal();
      document.getElementById("guardoTitulo").value=''
      document.getElementById("guardoDescripcion").value=''
      const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
      modal.hide(); // para que se cierre el modal una vez se guarda la task en el array pq sino queda ahí pegado
  }
      else {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Recuerda ingresar tanto título como descripción",
        });
  }
}

document.getElementById("ButtonGuardar").addEventListener("click", agregarTarea); // para que se guarde la tarea al darle click en guardar en el modal


// boton de sugerencias con tareas del json que hice
document.getElementById("buttonSugerencias").addEventListener("click", cargarSugerencias);

function cargarSugerencias() {
  fetch("./db/data.json")
    .then(response => response.json())
    .then(data => {
      mostrarSugerencias(data);
    })
    .catch(error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No pudimos cargar las sugerencias en este momento :(",
      });
    });
}

function mostrarSugerencias(sugerencias) {
  const contenedor = document.getElementById("contenedorSugerencias");
  contenedor.innerHTML = ""; // se limpia 
  sugerencias.forEach((sugerencia) => {
    const div = document.createElement("div"); // para que se cree un div por cada sugerencia de mi json
    div.classList.add("card", "mb-2", "p-2"); // parametros del modal 

    // se muestran las sugerencias + el boton de agregar
    div.innerHTML = `
      <h5>${sugerencia.titulo}</h5>
      <p>${sugerencia.descripcion}</p>
      <button class="btn btn-agregar btn-sm">Agregar</button> 
    `;

    // se pasa al array de tareas del usuario
    div.querySelector("button").addEventListener("click", () => {
      const nueva = new Tareas(sugerencia.titulo, sugerencia.descripcion);
      tareas.push(nueva);
      guardarTareasEnLocal();
      mostrarTareas();
      Swal.fire({
        title: "Agregada!",
        text: `"${sugerencia.titulo}" fue añadida a tu lista`,
        icon: "success"
      });
    });

    contenedor.appendChild(div);
  });
}

mostrarTareas();