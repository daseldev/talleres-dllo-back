function convertidorTemp(gc) {
	const gf = (gc*(9/5))+32;
  return gf
}

function resolvedor(a,b,c, positivo) {
	const disc = Math.pow(b,2)-4*a*c
  if (disc<0) {
  	return "deja el invento"
  }
  const raiz = Math.sqrt(disc)
  if (positivo) {
  return ((-b + raiz)/(2*a) )
  } else {
  return ((-b - raiz)/(2*a) )
  }
}

function mejorParidad (numero) {
return numero % 2 === 0
}

function peorParidad(n) {
    if (n === 1) return false;
    else if (n === 2) return true;
    else if (n === 3) return false;
    else if (n === 4) return true;
    else if (n === 5) return false;
    else if (n === 6) return true;
    else if (n === 7) return false;
    else if (n === 8) return true;
    else if (n === 9) return false;
    else if (n === 10) return true;
    else return "Número fuera del rango";
}

console.log(convertidorTemp(30))
console.log("Positivo: "+ resolvedor(1,5,4, true))
console.log("Negativo: "+ resolvedor(1,5,4, false))
console.log("Paridad: "+ mejorParidad(10))
for (let i = 1; i <= 10; i++) {
    console.log(`El número ${i} es ${peorParidad(i) ? "Par" : "Impar"}`);
}
