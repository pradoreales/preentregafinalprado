
   // Referencias del DOM
   const agregoTitulo = document.getElementById("guardoTitulo");
   const agregoDescripcion = document.getElementById("guardoDescripcion");
   const listaTareas = document.getElementById("listaTareas");
   const contadorTarea = document.getElementById("contadorTarea");

// Funcion de rellenar los espacios de la tarea (sin que el usuario typee todo de nuevo) con el mismo modal y de editar

let saveNuevaT = null; // variable declarada para saber si toca editar o agregar, igualada null (vacio)
function tareaEdit () {
  const tareaEditar = document.getElementsByClassName("edit-boton");
  for (const boton of tareaEditar) {
  // al dar click al boton editar
  boton.addEventListener("click", () => { 
    const id = Number(boton.getAttribute("data-id")); // Number ya que en la clase tengo date.now (así busca el id de la tarea)
    saveNuevaT = id; // se almacena la task
    const buscarTarea = tareas.find(task => task.id === id); // se mete en el array de tarea y busca el id de la misma
    document.getElementById("guardoTitulo").value = buscarTarea.titulo;
    document.getElementById("guardoDescripcion").value = buscarTarea.descripcion; //se adquiere el ajuste hecho en el modal
    const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show(); // muestra el modal con la tarea completada
  });
  }
}

// función de eliminar tarea

function borrarTarea () {
  const deleteTarea = document.getElementsByClassName("delete-boton");
  for (const borrar of deleteTarea) {
    borrar.addEventListener("click", () => {
      const id = Number(borrar.getAttribute("data-id"));
      tareas = tareas.filter(task => task.id !== id);
      guardarTareasEnLocal();
      mostrarTareas();
    })
  }
}

// función para animación de completar y deshacer

function completeDeshacer () {
  const tacharTask = document.getElementsByClassName("complete-boton");
  for (const tachar of tacharTask) {
    tachar.addEventListener("click", () => {
    const id = Number(tachar.getAttribute("data-id"));
    tareas.forEach(task => {
      if (task.id === id) {
        task.completed = !task.completed; // invierte de true a false u viceversa (entonces se aplica lo de guardartareas)
      }
    });
      guardarTareasEnLocal();
      mostrarTareas();
    });
  }
}

// modo oscuro+dia+y que se guarda en local 

let modoOscuro = localStorage.getItem("modoOscuro") === "true";
const botonModo = document.querySelector(".btn-oscuro");

botonModo.addEventListener("click", () => {
  modoOscuro = !modoOscuro;
  if (modoOscuro) {
    document.body.classList.add("dark-mode");
    botonModo.innerText = "Cambiar a modo claro";
  } else {
    document.body.classList.remove("dark-mode");
    botonModo.innerText = "Cambiar a modo oscuro";
  }
  localStorage.setItem("modoOscuro", modoOscuro);
});

// Al cargar la página, aplicar el modo guardado
if (modoOscuro) {
  document.body.classList.add("dark-mode");
  botonModo.innerText = "Cambiar a modo claro";
} else {
  document.body.classList.remove("dark-mode");
  botonModo.innerText = "Cambiar a modo oscuro";
}
