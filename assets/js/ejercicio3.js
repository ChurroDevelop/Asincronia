/**
 * Basado en la solución del punto 2, transforme esta solución utilizando
async/await
a. muestre los repositorios públicos de cada aprendiz en consola.
b. Una todos los resultados en un solo arreglo
c. Filtre la consulta con solo los aprendices que tengan el rol de
aprendiz, esta solución se deba dar antes de realizar la solicitud al
api
 */

let peticiones = async () => { // Declarando funcion asynconra
    let aprendices = await fetch(`../json/user.json`); // Peticion a un archivo local json donde esta almacenados todos los usuarios
    let respuesta = await aprendices.json(); // guardara el json, despues de que se halla completado la peticion y los parsea a formato json
    let x = [] // Array vacia para juntar todos los repositorios
    let recorrido = respuesta.users.filter( async (elemento) => { // metodo filter para los usuarios que no son aprendices
        if (elemento.aprendiz === true) { // si el aprendiz esta en true, se ejecutara ese bloque de codigo, si no da true lo descarta de una vez
            let repos = await fetch(`https://api.github.com/users/${elemento.user}/repos`); // Peticion a la api de gitub para revisar los repositorios publicos de dicha persona
            let publicos = await repos.json(); // se toma la respuesta de la peticion de los repositorios de las personas y se le havce un parseo a formato json
            let guardados = publicos.map((el) => { // se recorre objeto por objeto de los repositorios de los usuarios
                x.push(el) // se pushea el repositorio al array vacia
                return el // retorna todos los repositorios
            })
            console.log(guardados) // imprime los repositorios de los aprendices
        }
        else{
            console.log("El instructor fuera de aqui") // Se identifica que es un rol diferente al del aprendiz
        }
    })
    console.log(x) // se imprime el arreglo con todas las arrays de los aprendices ADSO
}

peticiones() // se hace llamado a la funcion asincrona