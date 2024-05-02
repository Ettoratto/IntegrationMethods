let fx = document.getElementById("fx")
let dX

function calculate() {
    
    a = parseFloat(document.getElementById("a").value)
    b = parseFloat(document.getElementById("b").value)
    n = parseFloat(document.getElementById("int").value)

    if (b <= a) {
        alert("The limit a must be lower than b")
        return;
    }

    dX = (b - a) / n;
    let rule = document.getElementById("rule")

    switch (rule.value) {
        case "rectangles":
            output.innerHTML = rectRule()
            break;
        case "":
            output.innerHTML = trapRule()
            break;
        case "parables":
            output.innerHTML = parabRule()
            break;
    }
}



function rectRule() {
    risultato = 0
    for (let i = 0; i < n; i++) {
        let x1 = a + i * dX
        let x2 = x1 + dX
        let areaRettangolo = dX * evalUsrFx((x1 + x2) / 2)
        risultato += areaRettangolo
    }
    return "<label>Risultato:<br></label><h2>" + risultato.toFixed(approx) + "</h2>"
}


function trapRule() {
    risultato = 0
    let x = a
    let fa = evalUsrFx(x)
    let fxi = 0
    let sum = 0
    for (i = 0; i < n; i++) {
        x = x + dX
        fxi = evalUsrFx(x)
        sum += fa + fxi
        fa = fxi
    }
    risultato = sum * 0.5 * dX
    return "<label>Risultato:<br></label><h2>" + risultato.toFixed(approx) + "</h2>"
}

function parabRule() {
    risultato = 0
    if (!(n % 2 == 0)) { 
        n++
        parableCase.innerHTML = "Per questo metodo è necessario avere un numero pari di intervalli, pertanto è stato aumentato di 1"
    } else 
        parableCase.innerHTML = ""
    

    dX = (b - a) / n
    let nDis = n - 1
    let nPar = nDis - 1
    let val = 0
    
    let sommaPunti = 0
    for (i = 1; i <= nDis; i += 2) {
        x = a + i * dX
        sommaPunti += evalUsrFx(x)
    }
    val = sommaPunti * 4
    
    sommaPunti = 0
    for (i = 2; i <= nPar; i += 2) {
        x = a + i * dX
        sommaPunti += evalUsrFx(x)
    }
    val += 2 * sommaPunti + evalUsrFx(a) + evalUsrFx(b)
    risultato = val * dX / 3
    return "<label>Risultato:<br></label><h2>" + risultato.toFixed(approx) + "</h2>"
}


function evalUsrFx() {
    return eval(fx.value.toLowerCase())
}