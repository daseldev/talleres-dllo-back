// Función que cuenta strings con longitud mayor a 25 caracteres
function contarStringsLargos1(lista) {
    return lista.filter(str => str.length > 25).length;
}

function contarStringsLargos2(lista) {
    let contador = 0;
    for (let str of lista) {
        if (str.length > 25) contador++;
    }
    return contador;
}

function contarStringsLargos3(lista) {
    return lista.reduce((contador, str) => str.length > 25 ? contador + 1 : contador, 0);
}

// Función que calcula la exponenciación sin el operador **
function exponenciacion1(base, exponente) {
    let resultado = 1;
    for (let i = 0; i < Math.abs(exponente); i++) resultado *= base;
    return exponente < 0 ? 1 / resultado : resultado;
}

function exponenciacion2(base, exponente) {
    if (exponente === 0) return 1;
    let resultado = exponenciacion2(base, Math.abs(exponente) - 1) * base;
    return exponente < 0 ? 1 / resultado : resultado;
}

function exponenciacion3(base, exponente) {
    return Math.exp(exponente * Math.log(base));
}

// Función que cuenta las ocurrencias de un elemento en una lista
function contarOcurrencias1(lista, elemento) {
    return lista.filter(e => e === elemento).length;
}

function contarOcurrencias2(lista, elemento) {
    let contador = 0;
    for (let e of lista) {
        if (e === elemento) contador++;
    }
    return contador;
}

function contarOcurrencias3(lista, elemento) {
    return lista.reduce((contador, e) => e === elemento ? contador + 1 : contador, 0);
}

// Función que retorna el elemento n de la serie Fibonacci
function fibonacci1(n) {
    if (n <= 1) return n;
    return fibonacci1(n - 1) + fibonacci1(n - 2);
}

function fibonacci2(n) {
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}

function fibonacci3(n) {
    let fib = [0, 1];
    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib[n];
}

// Función que verifica si una lista tiene duplicados
function tieneDuplicados1(lista) {
    return new Set(lista).size !== lista.length;
}

function tieneDuplicados2(lista) {
    for (let i = 0; i < lista.length; i++) {
        for (let j = i + 1; j < lista.length; j++) {
            if (lista[i] === lista[j]) return true;
        }
    }
    return false;
}

function tieneDuplicados3(lista) {
    let mapa = {};
    for (let elemento of lista) {
        if (mapa[elemento]) return true;
        mapa[elemento] = true;
    }
    return false;
}

// Función que retorna el elemento más repetido de una lista
function elementoMasRepetido1(lista) {
    let mapa = {};
    let maxElemento = lista[0], maxFrecuencia = 0;
    for (let elem of lista) {
        mapa[elem] = (mapa[elem] || 0) + 1;
        if (mapa[elem] > maxFrecuencia) {
            maxFrecuencia = mapa[elem];
            maxElemento = elem;
        }
    }
    return maxElemento;
}

function elementoMasRepetido2(lista) {
    let maxElemento = lista[0], maxFrecuencia = 0;
    for (let i = 0; i < lista.length; i++) {
        let contador = 0;
        for (let j = 0; j < lista.length; j++) {
            if (lista[i] === lista[j]) contador++;
        }
        if (contador > maxFrecuencia) {
            maxFrecuencia = contador;
            maxElemento = lista[i];
        }
    }
    return maxElemento;
}

function elementoMasRepetido3(lista) {
    return lista.sort((a,b) => 
        lista.filter(v => v===a).length - lista.filter(v => v===b).length
    ).pop();
}

// Función que realiza una búsqueda binaria
function busquedaBinaria1(lista, elemento) {
    let izquierda = 0, derecha = lista.length - 1;
    while (izquierda <= derecha) {
        let medio = Math.floor((izquierda + derecha) / 2);
        if (lista[medio] === elemento) return medio;
        else if (lista[medio] < elemento) izquierda = medio + 1;
        else derecha = medio - 1;
    }
    return -1;
}

function busquedaBinaria2(lista, elemento) {
    if (lista.length === 0) return -1;
    let mitad = Math.floor(lista.length / 2);
    if (lista[mitad] === elemento) return mitad;
    else if (lista[mitad] < elemento) {
        let resultado = busquedaBinaria2(lista.slice(mitad + 1), elemento);
        return resultado === -1 ? -1 : mitad + 1 + resultado;
    } else {
        return busquedaBinaria2(lista.slice(0, mitad), elemento);
    }
}

function busquedaBinaria3(lista, elemento, izquierda = 0, derecha = lista.length - 1) {
    if (izquierda > derecha) return -1;
    let medio = Math.floor((izquierda + derecha) / 2);
    if (lista[medio] === elemento) return medio;
    return lista[medio] < elemento 
        ? busquedaBinaria3(lista, elemento, medio + 1, derecha) 
        : busquedaBinaria3(lista, elemento, izquierda, medio - 1);
}

// Función que ordena una lista desordenada
function ordenarLista1(lista) {
    return lista.sort((a, b) => a - b);
}

function ordenarLista2(lista) {
    for (let i = 0; i < lista.length; i++) {
        for (let j = 0; j < lista.length - i - 1; j++) {
            if (lista[j] > lista[j + 1]) {
                [lista[j], lista[j + 1]] = [lista[j + 1], lista[j]];
            }
        }
    }
    return lista;
}

function ordenarLista3(lista) {
    if (lista.length < 2) return lista;
    let pivote = lista[0];
    let menores = lista.slice(1).filter(x => x <= pivote);
    let mayores = lista.slice(1).filter(x => x > pivote);
    return [...ordenarLista3(menores), pivote, ...ordenarLista3(mayores)];
}

// Función que retorna el n-ésimo elemento más grande de una lista
function nEsimoMayor1(lista, n) {
    return lista.sort((a, b) => b - a)[n - 1];
}

function nEsimoMayor2(lista, n) {
    let ordenada = [...lista].sort((a, b) => b - a);
    return ordenada[n - 1];
}

function nEsimoMayor3(lista, n) {
    let conjunto = new Set(lista.sort((a, b) => b - a));
    return Array.from(conjunto)[n - 1];
}

// Función que retorna el producto máximo de dos números en una lista
function productoMaximo1(lista) {
    lista.sort((a, b) => b - a);
    return lista[0] * lista[1];
}

function productoMaximo2(lista) {
    let max1 = -Infinity, max2 = -Infinity;
    for (let num of lista) {
        if (num > max1) {
            max2 = max1;
            max1 = num;
        } else if (num > max2) {
            max2 = num;
        }
    }
    return max1 * max2;
}

function productoMaximo3(lista) {
    let maximo = Math.max(...lista);
    lista.splice(lista.indexOf(maximo), 1);
    let segundoMaximo = Math.max(...lista);
    return maximo * segundoMaximo;
}
