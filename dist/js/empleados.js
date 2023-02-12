const nombreInp = document.querySelector("#nombre");
const correoInp = document.querySelector("#correo");
const puestoInp = document.querySelector("#puesto");
const salarioInp = document.querySelector("#salario");

const edimNom = document.querySelector("#Enombre");
const edimCor = document.querySelector("#Ecorreo");
const edimPue = document.querySelector("#Epuesto");
const edimSal = document.querySelector("#Esalario");

const agregar = document.querySelector("#btn-add");
const formulario = document.querySelector("#form-empleado");
const tablaE = document.querySelector("#tabla-emp");

const editBtn = document.querySelector("#btn-edd");

const edInicio = document.querySelectorAll("#ediem");
//const elimEmp = document.querySelector("#eliminar");

document.addEventListener('DOMContentLoaded', ()=>{
    //Mostrar empleados
    const empleados = JSON.parse( localStorage.getItem("empleados") );

    if (empleados === null) {
        const parrafo = document.createElement("p");
        const text_parrafo = document.createTextNode("No hay elementos para mostrar.")
        parrafo.appendChild(text_parrafo);
        tablaE.append(parrafo);
    } else {
        render(empleados)
    }

    agregar.addEventListener('click', (e) =>{
        e.preventDefault();
        const empleados = JSON.parse( localStorage.getItem("empleados") ) || [];

        const nombre = nombreInp.value;
        const correo = correoInp.value;
        const puesto = puestoInp.value;
        const salario = salarioInp.value;

        const empleado = {
            nombre,
            correo, 
            puesto,
            salario
        }

        empleados.push(empleado);
        localStorage.setItem('empleados', JSON.stringify(empleados));
        //console.log("empleado", empleado);  
        //tablaE.innerHTML = '';  
        document.querySelector("tbody").innerHTML = '';    
        $("#modalAgregarE").modal("hide");
        render(empleados)
    })       
    
})
function render(empleados) {

    for(let i = 0; i < empleados.length; i++){
        
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${empleados[i].nombre}</td>
        <td>${empleados[i].correo}</td>
        <td>${empleados[i].puesto}</td>
        <td>${empleados[i].salario}</td>
        <td>
            <button type="button" id="ediem" class="btn btn-light-info btn-circle btn-lg" data-bs-toggle="modal" data-bs-target="#modalEditar">
            <i data-feather="edit"
            class="feather-sm text-danger me-1 ms-1"></i>
            </button>
            <button type="button" id="eliminar" class="btn btn-light-danger btn-circle btn-lg">
            <i data-feather="trash-2"
            class="feather-sm text-danger me-1 ms-1"></i>
            </button>                
        </td>
        `;
        document.querySelector("tbody").appendChild(row);

        row.querySelector("#ediem").onclick = ()=>{
            edimNom.value = empleados[i].nombre;
            edimCor.value = empleados[i].correo;
            edimPue.value = empleados[i].puesto;
            edimSal.value = empleados[i].salario; 

            editBtn.onclick = () =>{
                const empleado = {
                    "nombre": edimNom.value,
                    "correo": edimCor.value, 
                    "puesto": edimPue.value,
                    "salario": edimSal.value
                }
                empleados.splice(i, 1, empleado);
                localStorage.setItem('empleados', JSON.stringify(empleados));
                tablaE.innerHTML = '';
                $("#modalEditar").modal("hide");
                render(empleados);                
            }

        }

        row.querySelector("#eliminar").onclick = ()=>{
            //console.log("elimina");
            eliminaEmpleado(i, empleados)
        }  

    }            
    
}
function eliminaEmpleado(i, empleados) {
    empleados.splice(i, 1);
    localStorage.setItem('empleados', JSON.stringify(empleados));
    //tablaE.innerHTML = '';
    document.querySelector("tbody").innerHTML = '';
    render(empleados)
}