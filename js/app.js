//**? Variables */
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail');

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

//Uso de expresión regular
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners(){
    //Cuando la app inicia
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Reinicia el formulario
    btnReset.addEventListener('click', recetearFormulario);

    //Enviar email
    formulario.addEventListener('submit', enviarEmail);
}

//**? Funciones */
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e){

    if(e.target.value.length > 0){
        //Eliminar los errores...
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }   

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email'){
        
        //const resultado = e.target.value.indexOf('@');
        if(er.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error) {
                error.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido');
        }
    }


    if(er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }else{

    }

}

function mostrarError(mensaje){
    
    const mensajeError = document.createElement('P');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }
}

function enviarEmail(e){
    e.preventDefault();

    //Agregando animación
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Ocultar Spinner con SetTimeOut
    setTimeout(() =>{
        spinner.style.display = 'none';

        //Mensaje de exito con el envio
        const parrafo = document.createElement('P');
        parrafo.textContent = 'El mensaje se envio correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-3', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        //Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        //Formatear el formulario
        setTimeout(() => {
            parrafo.remove(); //Eliminar el mensaje de exito
            recetearFormulario(); 
        },3000);
    }, 3000);
}

function recetearFormulario(){
    formulario.reset();
    iniciarApp();
}


/**
 * Una forma de validar un formulario es buscando en el string 
 * los caracteres tipocos de un correo. Sin embargo, eso no funciona 
 * del todo bien. Para ello es mejor usar las expresiones regulares
 * 
 * En el caso de los temporizadores como setTimeout o setInterval
 * hay diferencias interesantes.
 * 
 * setTimeout = se ejecuta solo una vez pasando el tiempo designado
 * setInterval = se ejecuta constantemente en los intervalos de tiempo designados
*/