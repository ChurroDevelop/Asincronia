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

let api = async () => { // Funcion asincrona para poder trabajar con solicitudes a formatos JSON
    let local = await fetch(`../json/user.json`) // peticion a un formato JSON local para utilizar los datos de los aprendices
    let response = await local.json(); // Se parsea el resultado del formato JSON local, como se entrega en texto plano se parsea a formato JSON
    let users = response.users.map(async (e) => { // se hace un mapeo de todos los usuarios que se tienen en el JSON local, asi mismo realizando una funcion asincrona para poder realizar las peticiones a JSON o apis externas
        let api = await fetch(`https://api.github.com/users/${e.user}/repos`); // Peticion a una api, pasandole el nombre de los usuarios que se estan pasando por el JSON local
        let repositorios = await api.json(); // Se realiza un parseo del resultado que nos arroje la api de github, claro, teniendo en cuenta que se itera por cada persona y mostrara los repositorios por usuarios
        let cantidadRepos = []; // Arreglo que contendra los repositorios que tendran menos de o 5 repositorios publicos
        let nombresRepos = []; // Arreglo que contendra los repositorios que en su nombre contengan la palabra JavaScript
        let ordenRepos = []; // Arreglo que contendra los repositorios publicos de los usuarios, y esto se utilizara para despues poder ordenarlo por peso de bits
        let letrasRepos = []; // Arreglo que contendra los repositoris que tengan mas de 5 letras en su nombre

        // BLOQUE A
        if (repositorios.length <= 5) { // Condicional para poder filtrar los usuarios que tengan menos o igual a 5 repositorios publicos
            cantidadRepos.push(repositorios); // Se agrega al arreglo que se declaro al principio del mapeo de cada aprendiz
            console.log(`El aprendiz ${e.user} tiene menos o 5 repositorios`) // Se realiza una interpolacion para poder identificar cual aprendiz es el que tiene menos de 5 repositorios
            console.table(cantidadRepos); // Se imprime en consola los repositorios que tiene menos de de 5 repositorios publicos
        }
        // FINALIZACION BLOQUE A

        // BLOQUE B
        let busqueda = repositorios.map((r) => { // Se hace un mapeo de los repositorios de las aprendices 1 a 1
            if (r.name.toLowerCase().includes("javascript")) { // se hace un condicional que convierta el nombre del repositorio en minusculas y que si contiene la palabra "javascript" realiza la condicion
                nombresRepos.push(r.name) // se pushea el nombre del repositorio de dicha persona al arreglo que se menciono anteriormente
            }
        })
        console.log(`Repositorios con la palabra JavaScript del usuario ${e.user}`) // Se realiza una interpolacion para poder identificar cual es el aprendiz que contiene en sus repositorio la palabra javascript
        console.table(nombresRepos); // Se imprime en tabla los nombres de los repositorios de dicho aprendiz
        // FINALIZACION BLOQUE B

        // BLOQUE C
        let ordenar = repositorios.map((r) => { // Se realiza un mapeo para obtener los nombres de los repositorios de los aprendices y poder agregarlos a un arreglo para despues ordenarlos de menor a mayor
            ordenRepos.push(r.name); // Se agrega al arreglo que se declaro para poder ordenar los repositorios dependiendo del nombre
        })
        console.log(`Orden de los repositorios por peso de bits de ${e.user}`); // Se realiza una interpolacion para identificar a cual aprendiz se le esta realizando el ordenamiento de los repositorios publicos
        let orden = ordenRepos.sort(); // Metodo sort que ordena por peso de bits los caracteres contenidos por el arreglo
        let reversa = orden.reverse() // Metodo revers para poder ordenarlos de menor a mayor 
        console.table(reversa); // Imprimir en una tabla, el ordenamiento de los repositorios publicos de dicho aprendiz
        // FINALIZACION BLOQUE C

        // BLOQUE D
        let letras = repositorios.map((rep) => { // Mapeo para encontrar el nombre de los repositorios publicos de los aprendices que tengan mas de 5 caracteres
            if (rep.name.length > 5) { // Condicional donde se compara la longitud de los nombres de los repositorios y si es mayor a 5 la longitud de dicho nombre 
                letrasRepos.push(rep.name); // Se agrega el nombre del repositorio que cumpla la condicion para despues imprimirlo en una tabla
            }
        })
        console.log(`Repositorios con nombre de mas de 5 caracteres de ${e.user}`); // Identificar el aprendiz que teenga repositorios con mas de 5 letras en su nombre
        console.table(letrasRepos); // Imprimir en una tabla los repositorios
        // FINALIZACION BLOQUE D

    })
}

api(); // Llamado de la funcion asincrona