/**
 * Lea el archivo user.json y transforme todos los nombres a mayúsculas
(recorra usuario por usuario) validando que solo se permita ingresar letras
mayúsculas (se valida con un proxy)
a. Modifique solo los usuarios que tengan el rol aprendiz en true
b. Modifique solo los usuarios que más de dos nombres ejemplo (John Becerra)
c. Modifique solo los usuarios que contenga la palabra ADSO en su
use
 */

let peticion = async () => { // Declaracion de una funcion asincrona
    let peticionLocal = await fetch(`../json/user.json`); // peticion al archivo local JSON administrado por el instructor
    let usersLocal = await peticionLocal.json(); // Se realiza un parseo de la respuesta que nos dio el formato JSON local, se entrega en texto plano y se convierte en JSON

    let manejador = { // Manejador del proxy
        /**
         * @param {El objetivo original por el cual se esta extrayendo los datos} objetivo 
         * @param {Propiedad la cual se esta modificando del objeto original} propiedad 
         * @param {Valor por el cual esta siendo modificada la propiedad del objeto} valor 
         */
        set: (objetivo, propiedad, valor) => { // Metodo set, para tener los valores que estan entrando 
            // BLOQUE A
            if (valor.aprendiz === true) { // se verifica que el usuarios que esta entrando en el proxy tenga el rol del aprendiz
            // FIN DEL BLOQUE A
                let eliminar = valor.name.split(" ") // Se realiza una separacion de los nombre para almacenarlos en un arreglo para modificar solo los nombre que contengan mas de 3 palabras

                // BLOQUE B
                if (eliminar.length > 2) { // Condicion si la cantidad de palabras es mayor a 2 se realiza la condicion
                // FIN DEL BLOQUE B

                    // Bloque C
                    if (valor.user.toUpperCase().includes("ADSO")) { // Se valida si el username del usuario uncluye la palabra ADSO
                        let mayusculas = valor.name.toUpperCase(); // se convierte el nombre del usuario en mayusculas
                        console.log(mayusculas) // Se imprime en consola todos los nombres que se estan pasando en el proxy
                    }
                    // FIN BLOQUE C
                    else{
                        objetivo[propiedad] = valor // Retornara y no se modificara ningun valor
                    }
                }
                else{
                    objetivo[propiedad] = valor // Retornara y no se modificara ningun valor
                }
            }
            else{
                objetivo[propiedad] = valor // Retornara y no se modificara ningun valor
            }
        }
    }

    let pro = new Proxy({}, manejador); // Creacion del nuevo proxy, pasandole un objeto vacio y el manejador que se declaro anteriormente
    let persona = usersLocal.users.map((elemento) => { // se hace un mapeo de todos los usuarios del JSON local administrado por el instructor
        pro.usuario = elemento // se hace un llamado al proxy donde se le pasara el elemento por el cual se esta iterando en el proceso del mapeo
        return pro.usuario // por si los valores no se modifican retornara todo el objeto sin modificaciones algunas
    })
}

peticion(); // Llamado a la funcion asincrona