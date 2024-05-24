/**
 *  Lea el archivo users.json suministrado por el instructor y tome como base
las capturas para luego mostrar todos los datos de usuario de cada
aprendiz, este ejercicio de desarrolla con promesas.
a. Imprima el resultado en una tabla donde solo nos mostrar el nombre
y el avatar de cada aprendiz
 */

// A)

let leer = () => { // Funcion para leer las peticiones
    return new Promise((resolve) => { // retorna una nueva promesa con su respectivo resolve
        let usuarios = fetch(`../json/user.json`); // peticion al archivo local de los usuarios
        usuarios
            .then((r) => {
                return r.json(); // se retorna el resultado de la peticion del json y lo castea a json ya que es un texto plano
            })
            .then((data) => { // este funciona para la manipulacion de los datos del json
                console.log(data) // imprime los datos que se estan buscando
                let recorrido = data.users; // se le asigna a una variable el nombre de usuario de dicha persona
                
                let busqueda = data.users.forEach((elemento) => { // se recorre a los usuarios
                    let si = elemento.user; // se le asigna a una variable el valor del nombre de usuarios del json local
                    let github = fetch(`https://api.github.com/users/${si}`); // se hace la peticion a la api de github para revisar el nombre y la url del avatar
                    if (elemento.aprendiz !== true) { // condicion si el rol no es aprendiz
                        console.log("John no entra aqui") // mensaje, si se encontro algun instructor
                    }
                    else{
                        github
                            .then((respuesta) => {
                                return respuesta.json(); // Respuesta de la peticion de la api de github que lo retornara para el otro then
                            })
                            .then((datos) => { // manejo de los datos del json de la api de github
                                console.log(`Datos de --- ${datos.name}`) // imprimir los datos de dicho usuarios de github
                                let x = [datos.name, datos.avatar_url]; // almacenar el nombre del usuario de github y el url del avatar de dicho usuario de github
                                console.table(x); // imprimir en una tabla los datos de dicho usuario de github
                            })
                    }
                })
            })
    })
}

leer();