/**
 * Lea el archivo user.json y transforme todos los nombres a mayúsculas
(recorra usuario por usuario) validando que solo se permita ingresar letras
mayúsculas (se valida con un proxy)
a. Modifique solo los usuarios que tengan el rol aprendiz en true
b. Modifique solo los usuarios que más de dos nombres ejemplo (John
Becerra)
c. Modifique solo los usuarios que contenga la palabra ADSO en su
use
 */

let peticion = async () => {
    let manejador = {
        set: (obje, prop, value) => {
            console.log(`propiedad: ${prop}, Nuevo valor: ${value}`)
        }
    }

    let peticionLocal = await fetch(`../json/user.json`);
    let dataLocal = await peticionLocal.json();
    let nombreUsuarios = dataLocal.users.map((e) => {
        return e.name.toUpperCase();
    })
    console.log(nombreUsuarios);
    let proxy = new Proxy(nombreUsuarios, manejador);
    let nickUsuarios = dataLocal.users.map((x) => {
        // console.log(x.user)
    })
}

peticion();