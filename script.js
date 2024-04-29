// variabili per gesommaPuntiire HTML   
let int_method = document.getElementById("int_method");
let user_function = document.getElementById("user_function");
let output = document.getElementById("output");
let descriptionText = document.getElementById("description");
let parableCase = document.getElementById("parableCase");

// variabili della funziohne
var a = 0; // esommaPuntiremo A
var b = 0; // esommaPuntiremo B
var n = 0; // numero intervalli
var deltaX = 0;   // ampiezza dell'intervallo
var risultato =  0; 
var approx = 5; // numero di cifre decimali

function exB() { // metodo che automaticamente imposommaPuntia il valore minimo dell'esommaPuntiremo B pari a quello di A con l'aggiunta di 1
    document.getElementById("extremeB").min = parseInt(document.getElementById("extremeA").value) + 1;
    document.getElementById("extremeB").value = parseInt(document.getElementById("extremeA").value) + 1;
}

function calculate() {
    if(user_function==""){
        alert("Inserire una funione");
    }
    // verifica funzione utente
    user_function.value = user_function.value.replace(/\^/g, "**"); // modifica carattere potenza
    
    a = parseFloat(document.getElementById("extremeA").value);
    b = parseFloat(document.getElementById("extremeB").value);
    n = parseFloat(document.getElementById("intervals").value);

    if (b <= a) {
        alert("L'esommaPuntiremo B deve essere maggiore al valore dell'esommaPuntiremo A");
        return;
    }

    deltaX = (b - a) / n; // calcola l'ampiezza dell'intervallo
    switch (int_method.value) {
        case "rectangles":
            output.innerHTML = rectangles_method();
            break;
        case "trapezius":
            output.innerHTML = trapezius_method();
            break;
        case "parables":
            output.innerHTML = parables_method();
            break;
    }
}


// valuta la funzione fornita dall'utente con il valore specificato di x
function calcWith_user_function(x) {
    let userFunction = user_function.value.toLowerCase();
    return eval(userFunction);
}

// metodo rettangoli
function rectangles_method() {
    risultato = 0;
    for (var i = 0; i < n; i++) {
        var x1 = a + i * deltaX; // EsommaPuntiremo sinisommaPuntiro del rettangolo
        var x2 = x1 + deltaX; // EsommaPuntiremo desommaPuntiro del rettangolo
        var areaRettangolo = deltaX * calcWith_user_function((x1 + x2) / 2); // Area del rettangolo
        risultato += areaRettangolo; // Aggiungi l'area del rettangolo all'integrale
    }
    return "<label>Risultato:<br></label><h2>" + risultato.toFixed(approx) + "</h2>";
}

// metodo trapezi 
function trapezius_method() {
    risultato = 0;
    var x = a;  // x iniziale
    var fa = calcWith_user_function(x); // Valore di f(a)
    var fxi = 0; // valore di f(xi) 
    var sum = 0;
    for (i = 0; i < n; i++) {
        x = x + deltaX; // Aggiorna il valore di x aggiungendo deltaX
        fxi = calcWith_user_function(x);
        sum += fa + fxi;
        fa = fxi; // Aggiorna fa a fxi per la prossima iterazione.
    }
    risultato = sum * 0.5 * deltaX;
    return "<label>Risultato:<br></label><h2>" + risultato.toFixed(approx) + "</h2>";
}

// metodo delle parabole
function parables_method() {
    risultato = 0;
    if (!(n % 2 == 0)) { //verifica se n è dispari, in tal caso aggiungere 1: il metodo delle parabole accetta solo n pari
        n++;
        parableCase.innerHTML = "Per questo metodo è necessario avere un numero pari di intervalli, pertanto è stato aumentato di 1";
    } else {
        parableCase.innerHTML = "";
    }

    deltaX = (b - a) / n;
    var nDis = n - 1; // numero totale di sottointervalli dispari
    var nPar = nDis - 1; // numero totale di sottointervalli pari
    var val = 0; //valore cumulativo della funzione nei vari punti dispari e pari
    
    var sommaPunti = 0; //somma punti dispari
    for (i = 1; i <= nDis; i += 2) {
        x = a + i * deltaX;
        sommaPunti += calcWith_user_function(x);
    }
    val = sommaPunti * 4;
    
    sommaPunti = 0; //somma punti pari
    for (i = 2; i <= nPar; i += 2) {
        x = a + i * deltaX;
        sommaPunti += calcWith_user_function(x);
    }
    val += 2 * sommaPunti + calcWith_user_function(a) + calcWith_user_function(b);
    risultato = val * deltaX / 3;
    return "<label>Risultato:<br></label><h2>" + risultato.toFixed(approx) + "</h2>";
}

// per rimuovere div con parableCase dinamicamente quando cambio opzione nel select
document.getElementById("int_method").addEventListener("change", function () {
    var selectedMethod = document.getElementById("int_method").value;
    var parableCase = document.getElementById("parableCase");

    if (selectedMethod !== "parables") {
        parableCase.style.display = "none";
    } else {
        parableCase.style.display = "block";
    }
});

// per rimuovere watermark da sito
setTimeout(() => {
    let a = Array.from(document.getElementsByTagName("img"));
    a.forEach(element => {
        if (!element.classList.contains("img")) {
            element.style.display = "none";
        }
    });
}, 1) 

// descrizione metodi e inserimento immagini del codice
function description() {

    var imgOfCode = document.getElementById('imgOfCode');
    // Rimuovi l'immagine esistente, se presente
    while (imgOfCode.firstChild) {
        imgOfCode.removeChild(imgOfCode.firstChild);
    }

    switch (int_method.value) {
        case "rectangles":
            descriptionText.innerHTML = " <label>Metodo dei rettangoli:</label> L'intervallo [a,b] viene diviso in ulteriori intervalli. L'ampiezza di questi intervalli (Δx) corrisponde alla base di dei rettangoli alti quanto la funzone nel punto medio di quell'intervallo, ossia f(c<sub>i</sub>), e la somma delle aree dei rettangoli corrisponde all'area sottesa alla funzione nell'intervallo [a,b]."
            //inserimento immagine
            var img = document.createElement('img');
            img.src = './img/rettangoli.png';
            img.alt = 'immagine non trovata';
            img.setAttribute("class", "img"); //tag "img" aggiunto all'immagine per raggirare il watermark del sito di hosting
            document.getElementById('imgOfCode').appendChild(img);
            break;
        case "trapezius":
            descriptionText.innerHTML = "<label>Metodo dei trapezi:</label>L'intervallo [a,b] viene diviso in ulteriori intervalli. L'ampiezza di questi intervalli (Δx) corrisponde all'altezza di dei trapezzi le cui basi corrispondo ai valori della funzione agli estremi di quell'intervallo Δx, e la somma delle aree dei trapezzi corrisponde all'area sottesa alla funzione nell'intervallo [a,b].";
            //img
            var img = document.createElement('img');
            img.src = './img/trapezi.png';
            img.alt = 'immagine non trovata';
            img.setAttribute("class", "img");
            document.getElementById('imgOfCode').appendChild(img);
            break;
        case "parables":
            descriptionText.innerHTML = "<label>Metodo delle parabole:</label>L'intervallo [a,b] viene diviso in ulteriori intervalli. Si calcolano i valori della funzione ai punti di estremità e ai punti medi di questi intervalli (Δx), e utilizzando la formula di interpolazione di Newton per approssimare l'area con parabole in ciascun sottointervallo per poi sommarlo fra loro.";
            //img
            var img = document.createElement('img');
            img.src = './img/parabole.png';
            img.alt = 'immagine non trovata';
            img.setAttribute("class", "img");
            document.getElementById('imgOfCode').appendChild(img);
            break;
    }
}

function change_approx() {
    approx = document.getElementById("approx").value;
}