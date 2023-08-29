import { eliminarAnuncio, guardarAnuncio, obtenerAnuncios } from './firebase.js'


//MODAL LOGIN
const title = document.getElementById('title') 
title.addEventListener('click', function(evt){
    console.log("fsd");
    if (evt.detail === 3) {
        modalLogin.style.display = "block";
    }
});

const modalLogin = document.getElementById('modalLogin')
const cerrarModalLogin = document.getElementsByClassName("close")[0];

cerrarModalLogin.onclick = function() {
  modalLogin.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modalLogin) {
    modalLogin.style.display = "none";
    
    
  }
}

const user = document.getElementById('usuarioUser')
const password = document.getElementById('contrasenaUser')
function login(){
  if(user.value == "sabropan" && password.value == "sabropan"){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '¡Bienvenido!',
      text:'¿Que vamos a preparar hoy?',
      showConfirmButton: false,
      timer: 1500
    }).then(()=>{
      modalLogin.style.display = "none";
      modalCrud.style.display = "block";

    })
  }else{
    Swal.fire(
      'Lo sentimos no fue posible iniciar sesión',
      'Oprime el boton para regresar',
      'warning'
    )
  }
}
const btnIniciarSesion = document.getElementById('btnIniciarSesion')
btnIniciarSesion.addEventListener("click",function(){
  login()
})

//MODAL LOGIN

//MODAL CRUD
const modalCrud = document.getElementById('modalCrud')
const cerrarModalCrud = document.getElementById("close2");

cerrarModalCrud.addEventListener('click', function() {
    modalCrud.style.display = "none";
})


//Fecha
let fechaNuevoAnuncio = ""

document.addEventListener('DOMContentLoaded', function() {
  const fechaInput = document.getElementById('fechaInput');
  const resultadoElement = document.getElementById('resultado');

  fechaInput.addEventListener('input', function() {
    const fechaSeleccionada = new Date(fechaInput.value);
    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const opcionesHora = { hour: 'numeric', minute: 'numeric', hour12: true };

    const diaSemana = fechaSeleccionada.toLocaleDateString('es-ES', opcionesFecha);
    const hora = fechaSeleccionada.toLocaleTimeString('es-ES', opcionesHora);

    const resultadoTexto = `${hora} ${diaSemana}`;
    resultadoElement.textContent = resultadoTexto;
    fechaNuevoAnuncio = resultadoTexto
  });
});

//Productos en este horario
const inputNuevoProducto = document.getElementById('inputNuevoProducto')
const containerNuevosProdcutos = document.getElementById('containerNuevosProdcutos')
const btnCrearHorario = document.getElementById('btnCrearHorario')
const inputRestablecer = document.getElementById('inputRestablecer')
const containerCrearHorarios = document.getElementById('containerCrearHorarios')
const btnContainerCrearAviso = document.getElementById('btnContainerCrearAviso')
const publicarAviso = document.getElementById('publicarAviso')
let listaNuevosProductos = []

containerCrearHorarios.style.display = 'none'

btnContainerCrearAviso.addEventListener('click',function(){
    if(containerCrearHorarios.style.display == 'none'){
        containerCrearHorarios.style.display = 'block'
        btnContainerCrearAviso.value = "Cerrar Aviso"  
    }
    else if(containerCrearHorarios.style.display == 'block'){
      containerCrearHorarios.style.display = 'none'
      btnContainerCrearAviso.value = "Crear Aviso"  
    }
})
inputRestablecer.addEventListener('click',function(){
  listaNuevosProductos = []
  containerNuevosProdcutos.innerHTML = "<p>Todavia no hay productos en este horario</p>"
})
publicarAviso.addEventListener('click',function(){
  guardarAnuncioEnDB()
})
btnCrearHorario.addEventListener('click',function(){
  if(inputNuevoProducto.value != ''){
    containerNuevosProdcutos.innerHTML = '' 
    listaNuevosProductos.push(inputNuevoProducto.value)
    for(let nuevoProducto of listaNuevosProductos){
      containerNuevosProdcutos.innerHTML += '<li>'+nuevoProducto+'</li>' 
    }
    console.log(listaNuevosProductos);
  }else{
    alert("Por favor introduce un producto")
  }
})
//Interacciones CRUD 
const containerTargets = document.getElementById('containerTargets')
const containerTargetsCreate = document.getElementById('containerTargetsCreate')

async function pintarAnunciosHome(){
  await obtenerAnuncios().then((anuncios) =>{
    containerTargets.innerHTML = ''

        anuncios.forEach((anuncio)=>{
          const productosDeAnuncio = anuncio.productos.map((producto) => {
            return '<p>➤ ' + producto + '</p>';
          }).join('');

          containerTargets.innerHTML += 
          '<div class="target">'+
          '  <div class="target__img">'+
          '      <img src="imgs/breat.png" alt="imagen pan">'+
          '  </div>'+
          '  <div class="target__info">'+
          '     <h4>'+anuncio.fecha+'</h4>'+ 
          '     <p>'+ productosDeAnuncio +'</p>' +
          '  </div>'+
          '</div>'
        })
    })
}
pintarAnunciosHome()

async function pintarAnunciosCreate(){
  await obtenerAnuncios().then((anuncios) =>{
      containerTargetsCreate.innerHTML = ''
  
          anuncios.forEach((anuncio)=>{
            const productosDeAnuncio = anuncio.productos.map((producto) => {
              return '<p>➤ ' + producto + '</p>';
            }).join('');
  
            containerTargetsCreate.innerHTML += 
            '<div class="target">'+
            '  <div class="target__img">'+
            '      <img src="imgs/breat.png" alt="imagen pan">'+
            '  </div>'+
            '  <div class="target__info">'+
            '     <h4>'+anuncio.fecha+'</h4>'+ 
            '     <p>'+ productosDeAnuncio +'</p>' +
            '      <div>'+
            '          <input type="button" class="eliminarHorario" value="Eliminar" data-id="'+anuncio.id+'">'+
            '      </div>'+
            '  </div>'+
            '</div>'
          })

          const btnsDelete = containerTargetsCreate.querySelectorAll('.eliminarHorario')
          btnsDelete.forEach(btn => {
            console.log(btn);
              btn.addEventListener('click',(e)=>{
                console.log();
                Swal.fire({
                  title: 'Estas seguro quieres borrar este anuncio',
                  text: "No podras recuperarlo",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3dad2e',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Estoy seguro'
                }).then((result) => {
                  if (result.isConfirmed) {
                    eliminarAnuncio(e.target.dataset.id)
                    Swal.fire(
                      'Anuncio eliminado',
                      'El anuncio no podrá ser recuperado',
                      'success'
                    ).then(()=>{
                      pintarAnunciosHome()
                      pintarAnunciosCreate()
                    })
                  }
                })
              })
          });
      })
  }
  pintarAnunciosCreate()

function guardarAnuncioEnDB( ){
  // FALTA validar datos 
  let data =  {
    fecha: fechaNuevoAnuncio,
    productos: listaNuevosProductos
  }
  console.log(data);
  Swal.fire({
    title: 'Se creará un anuncio',
    text: "¿Seguro quieres crear el anuncio?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3dad2e',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Estoy seguro'
  }).then((result) => {
    if (result.isConfirmed) {
      guardarAnuncio(data)
      Swal.fire(
        'Anuncio creado',
        'Haz creado un nuevo anuncio',
        'success'
      ).then(()=>{
        pintarAnunciosHome()
        pintarAnunciosCreate()
      })
    }
  })
}









   