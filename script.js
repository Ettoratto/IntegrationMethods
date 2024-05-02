const evalUsrFx = x => eval(fx.value.toLowerCase())

const checkLimits = (a, b) => {

    document.getElementById("a").value = 
}

let fx = document.getElementById("fx")
let output = document.getElementById("output")

let precision = document.getElementById("dec")
precision.addEventListener(`focus`, () => precision.select())

function calculate() {
    
    a = parseFloat(document.getElementById("a").value)
    b = parseFloat(document.getElementById("b").value)
    n = parseFloat(document.getElementById("int").value)

    dX = (b - a) / n
    

    switch (document.getElementById("rule").value) {
        case "rect":
            output.innerHTML = rectRule(dX)
            break
        case "trap":
            output.innerHTML = trapRule(dX)
            break
        case "parab":
            output.innerHTML = parabRule(dX)
            break
    }
}



function rectRule(dX) {
    
    let sum = 0 
    for (i = 0; i < n; i++) {
        x1 = a + i*dX
        x2 = x1 + dX
        area = dX*evalUsrFx((x1 + x2)/2)
        sum += area
    }
    return sum.toFixed(precision.value)
}


function trapRule(dX) {

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
    return (sum*0.5*dX).toFixed(precision.value)
}

function parabRule(dX) {
    
    dX = (b - a) / n
    odd = n - 1
    even = odd - 1
    val = 0
    
    let sum = 0
    for (i = 1; i <= odd; i += 2) {
        x = a + i * dX
        sum += evalUsrFx(x)
    }
    val = sum * 4
    
    sum = 0
    for (i = 2; i <= even; i += 2) {
        x = a + i * dX
        sum += evalUsrFx(x)
    }
    val += 2 * sum + evalUsrFx(a) + evalUsrFx(b)
    return (val * dX / 3).toFixed(precision.value)
}

function checkInt(){

    method = document.getElementById("rule").value
    let int = document.getElementById("int")
    if((int.value % 2 != 0) && method == "parab")
        int.value++
}