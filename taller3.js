function desglosarString(texto, tipo) {
    const vocales = "aeiouAEIOU";
    let contador = 0;

    for (let letra of texto) {
        if (tipo === "vocales" && vocales.includes(letra)) {
            contador++;
        } else if (tipo === "consonantes" && letra.match(/[a-zA-Z]/) && !vocales.includes(letra)) {
            contador++;
        }
    }
    
    return contador;
}

// Pruebas
console.log(desglosarString("murcielagos", "vocales"));      
console.log(desglosarString("murcielagos", "consonantes"));  

function twoSum(nums, target) {
    let mapa = new Map();
    let resultados = [];

    for (let i = 0; i < nums.length; i++) {
        let complemento = target - nums[i];

        if (mapa.has(complemento)) {
            resultados.push([mapa.get(complemento), i]); // Guarda todas las combinaciones
        }

        mapa.set(nums[i], i);
    }

    return resultados;
}

// Pruebas
console.log(twoSum([2, 7, 11, 15], 9)); 
console.log(twoSum([3, 4, 2, 4], 6));    
console.log(twoSum([1, 2, 3, 4, 5], 6)); 


function conversionRomana(romano) {
    const valores = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
    };

    let total = 0;

    for (let i = 0; i < romano.length; i++) {
        let actual = valores[romano[i]];
        let siguiente = valores[romano[i + 1]];

        // Si el valor actual es menor que el siguiente, se resta, si no, se suma
        if (siguiente && actual < siguiente) {
            total -= actual;
        } else {
            total += actual;
        }
    }

    return total;
}

// Pruebas
console.log(conversionRomana("III"));    
console.log(conversionRomana("XIV"));     
console.log(conversionRomana("MMXXIV"));  
console.log(conversionRomana("MCMXCVII"));  
