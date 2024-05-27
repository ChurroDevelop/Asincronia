/**
 * Basados en las imágenes solucionar los siguientes puntos:
a. Describa el paso a paso del ejercicio (comente cada línea de
código).
b. Solucione el mismo ejercicio, utilizando solo promesas no
async/await.
c. Describa el paso a paso del ejercicio (comente cada línea de código)
 */

// A) 
// let filtro = x => x.name === "Evaluacion"; // Filtro, para filtrar un repositorio publico de dicho aprendiz que se llame evaluacion;

// (async () => { // Creando una funcion asincrona autoejecutable, se caracteriza por tener () al final
//     //Leer archivo JSON
//     let response = await fetch(`../json/ejemplo.json`); // Haciendo un llamado a un archivo json local, para poder extraer el nombre del usuarios
//     let user = await response.json(); // se parsea a formato Json, la respuesta que de la peticion del archivo local Json
//     // Consultar usuario de github
//     let responseGithub = await fetch(`https://api.github.com/users/${user.name}/repos`); // Se hace una peticion a la api de github haciendole un template String, o una interpolacion para poder colocar el nombre del usuarios que se coloco en el formato json local
//     let usuarioGithub = await responseGithub.json(); // Se parsea a formato Json, la respuesta que de la peticion de la api de github

//     usuarioGithub.forEach((element) => { // A la respuesta de la peticion del api de github como empieza como elementos de array, se le puede agregar un metodo de las arrays e cual es el forEach() lo que hace es recorrer elemento por elemento del arrray, y dentro de ese forEach va a recibir un parametro que es un callback, ese callback tomara element, como el elemento que se esta procesando de la peticion al llamado de githu
//         if(element.name === "Evaluacion"){ // Condicion de que si hay un repositori que se llame evaluacion lo imprima en consola
//             console.log(element); // imprimir el elemento es decir todo lo que contiene ese repositorio llamado Evaluacion
//         }
//     })

//     // let data = usuarioGithub.filter(filtro); // Se le esta asignando a una variable data, el valor de usuarioGithu.filter, lo que hace es buscar dentro de los repositoriso publicos que tiene dicho usuario uno que se llame Evaluacion, el cual esa condicion se declaro al principio de todo el codigo.
//     // console.log(data); // Imprime el repositorio llamado Evalucion por consola, siempre y cuando cumpla la condicion del metodo Filter
//     // console.log(usuarioGithub); // Imprime todos los repositorios pubicos que tiene dicho usuario

// })();




//B) C)
let filtro = x => x.name === "Evaluacion" // Filtro para encontrar un repositorio de dicho usuarios que se llame Evaluacion
let promesa = () => { // Funcion flecha expresada, que retorna una promesa;
    return new Promise((resolve, reject) => { // Retornando una nueva promesa a la funcion, donde tendra su resolve y su reject
        let peticionLocal = fetch(`../json/ejemplo.json`); // peticion al formato json local
            peticionLocal
                .then((respuesta) => { // manejar la respuesta del json local
                    return respuesta.json();
                    // resolve(respuesta.json()); // retornando esa respuesta para que el otro .then puedo manipular los datos, este respuesta.json(), esta parseando el formato plano a un json como tal.
                })
                .then((r) => { 
                    let usuario = r.name // asignandole a una variable usuario el nombre del json local;
                    let github = fetch(`https://api.github.com/users/${usuario}/repos`); // peticion a la api de github para ver los repositorios publicos de dicho usuario
                    github
                        .then((datos) => {
                            return datos.json(); // devolver la respuesta del servidos de la api
                        })
                        .then((data) => {
                            console.log(data) // manipulador de la data de los repositorios
                            let busqueda = data.filter(filtro); // aplicar el filtro para encontrar un repositorio publico de dicho usuario llamado Evaluacion
                            console.log(busqueda) // Imprimir el el repositorio
                        })
                })
    })
}

promesa() // Llamar a la funcion promesa que esta retornando una new Promise()
