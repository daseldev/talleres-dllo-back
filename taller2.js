function findMax(numbers) {
    if (numbers.length === 0) {
        return null;
    }
    let max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}

function includes(numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === target) {
            return true;
        }
    }
    return false;
}

function sum(numbers) {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }
    return total;
}

function missingNumbers(numbers) {
    let min = numbers[0];
    let max = numbers[0];
    
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < min) {
            min = numbers[i];
        }
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    
    let missing = [];
    for (let i = min; i <= max; i++) {
        if (!includes(numbers, i)) {
            missing.push(i);
        }
    }
    return missing;
}



console.log(findMax([3, 7, 2, 9, 5, 15])); // Debería imprimir 15
console.log(findMax([])); // Debería soltar null
console.log(includes([3, 7, 2, 9, 5], 7)); // Debería imprimir true
console.log(includes([3, 7, 2, 9, 5], 4)); // Debería imprimir false
console.log(sum([3, 7, 2, 9, 10])); // Debería imprimir 31
console.log(missingNumbers([3, 7, 2, 9, 5, 25])); // Debería imprimir [4, 6, 8]
