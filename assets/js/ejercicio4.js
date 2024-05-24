/**
 * Basados en la solución del punto 3 daremos solución a los siguientes
puntos:
a. Muestre solo los resultados que tengan menos de 5 repositorios
públicos en una tabla por consola.
b. Muestre solo los resultados de los repositorios que contengan la
palabra JavaScript en su name
c. Ordene de menor a mayor según el nombre del repositorio
d. Muestre solo los repositorios que tengan mas de cinco letras en su
nombre
 */

let api = async () => {
    try {
        let menoresCinco = [];
        let palabras = [];
       let peticionLocal = await fetch(`../json/user.json`);
       let dataLocal = await peticionLocal.json();
       console.log(dataLocal);
       let userLocal = dataLocal.users.map( async (eLocal) => {
        if (eLocal.aprendiz === true) {
            let peticionApi = await fetch(`https://api.github.com/users/${eLocal.user}/repos`);
            let dataApi = await peticionApi.json();
            // console.log(dataApi)
            if (dataApi.length <= 5) {
                menoresCinco.push(dataApi);
            }
            else{
                for (let i = 0; i < dataApi.length; i++) {
                    if (dataApi[i].name === "Asincrona") {
                        palabras.push(dataApi);
                    }
                }
            }
            // for(let i of dataApi){
            //     console.log(i)
            // }
            // let condicion = dataApi.filer((e) => {
            //     if (e.length <= 5){
            //         console.log(e)
            //     }
            // })
            // let nombres = dataApi.filter((e) => {
            // })
            // let orden = dataApi.filter((e) => {

            // })
            // console.log(condicion)
        }
       })
       console.log(menoresCinco)
       console.log(palabras)
       
    } catch (error) {
        console.log("Errores de conexion")
    }
}

api();
