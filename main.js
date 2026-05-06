let titlescrn = document.getElementById("title-screen");
let orderscrn = document.getElementById("order-screen");
let basescrn = document.getElementById("base-screen");
let finalscrn = document.getElementById("final-screen");
let quizscrn = document.getElementById("quiz-screen");
let takeorder = document.getElementById("orderbutton");
let howto = document.getElementById("instructions");

let thing1 = 0;
let thing2 = 0;
let n = 0;
let interval;
let time = 0;
let points = 0;
let done = false;
let numq = 0;

const trashes = [ //10 each
    "un pansement", 
    "le polystyrène", 
    "les emballages plastiques non recyclables", 
    "un crayon", 
    "un stylo", 
    "les produits d'hygiène", 
    "un sac de croustilles", 
    "les jouets", 
    "les vêtements", 
    "une boule de coton"
];
const recycles = [
    "le papier", 
    "une canette de soda", 
    "une bouteille", 
    "un livre", 
    "un journal", 
    "une boîte à oeufs", 
    "une enveloppe", 
    "un magazine", 
    "un sac plastique", 
    "le carton"
];
const composts = [
    "un os", 
    "une coquille d'oeuf", 
    "les feuilles", 
    "la peau de banane", 
    "un sachet de thé", 
    "la viande", 
    "les plantes", 
    "l'huile", 
    "une assiette en papier", 
    "un filtre à café"
];
const qs = [
    "Vrai ou Faux: le bac des ordures est pour les objets qui ne peuvent pas être compostés ni recyclés.",
    "On met cet objet dans le recyclage",
    "Qu'est-ce qu'on met dans le compost?",
    "Vrai ou Faux: Il faut rincer les bouteilles avant de les jeter dans le recyclage.",
    "Vrai ou Faux: Si on fait attention au tri, on protégera mieux l'environnement."
];
const options = [
    "Vrai", "Faux", " ", " ", 
    "Les pelures de fruits", "Les coquilles d'oeufs", "Les canettes", "Les sacs de croustilles",
    "Les restes de nourriture", "Les ampoules", "Les bouteilles", "Les produits d'hygiène",
    "Vrai", "Faux", " ", " ",
    "Vrai", "Faux", " ", " "
]
const as = ["Vrai", "Les canettes", "Les restes de nourriture", "Vrai", "Vrai"];
const chosen = [];
dummy = [];
const fullorder = [];
const strfullorder = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function openhowto() {
    howto.style.display = 'flex';
}

function closehowto() {
    howto.style.display = 'none';
}

window.addEventListener('click', (event) => {
    if (event.target === howto) {
        howto.style.display = 'none';
    }
});

async function orderup() {
    n += 1;
    takeorder.setAttribute("disabled", "disabled")
    fullorder.length = 0;
    strfullorder.length = 0;
    time = 0;
    reset();
    document.getElementById("final-score").innerHTML = "";
    document.getElementById("strnum").innerHTML = `Poubelle # ${n}`;
    
    for (var i = 0; i < 15; i++) {
        thing1 = Math.ceil(Math.random() * 3);
        if (thing1 == 1) {
            dummy = trashes;
        }
        else if (thing1 == 2) {
            dummy = recycles;
        }
        else {
            dummy = composts;
        }
        thing2 = Math.floor(Math.random() * 10);
        fullorder[i] = thing1;
        strfullorder[i] = dummy[thing2];
        document.getElementById("strbase").innerHTML += strfullorder[i];
        document.getElementById("strbase").innerHTML += "<br>";
        await sleep(500);
    }
    document.getElementById("next1").style.display = "block";
}

function begin() {
    titlescrn.style.display = 'none';
    orderscrn.style.display = 'block';
    document.getElementById("order").style.display = 'block';
}

function nextpage() {
    if (orderscrn.style.display === "block") {
        basescrn.style.display = 'block';
        orderscrn.style.display = 'none';
        starttime();
    }
    else if (basescrn.style.display === "block") {
        finalscrn.style.display = 'block';
        basescrn.style.display = 'none';
        stoptime();
        checkdrink();
    }
    else if (finalscrn.style.display === "block") {
        if (!done) {
            takeorder.removeAttribute("disabled");
            orderscrn.style.display = 'block';
            finalscrn.style.display = 'none';
            document.getElementById("strnum").innerHTML = "Poubelle #";
            document.getElementById("strbase").innerHTML = "";
            document.getElementById("next1").style.display = "none";
            done = true;   
        } 
        else {
            quizscrn.style.display = 'block';
            finalscrn.style.display = 'none';
            document.getElementById("order").style.display = 'none';
            nextq();
            time = 0;
            starttime();
        }
    }
}

function reset() {
    for (var i = 0; i < 3; i++) {
        updatetext(i, '')
    }
}

function increment() {
    time += 1;
}

function starttime() {
    interval = setInterval(increment, 1000);
}

function stoptime() {
    clearInterval(interval);
    points += (30 - time);
}

function chuck(a) {
    if(fullorder.length != 0) {
        if(a == fullorder[0]) {
            points += 10;
        }
        else {
            points -= 10;
        }
        fullorder.splice(0, 1);
        strfullorder.splice(0,1);
        document.getElementById("strbase").innerHTML = '';
        for (var i = 0; i < fullorder.length; i++) {
            document.getElementById("strbase").innerHTML += strfullorder[i];
            document.getElementById("strbase").innerHTML += "<br>";
        }
    }
}

function updatetext(a, c) {
    the = document.getElementsByClassName("urorder");
    the[a].innerHTML = c;
}

async function checkdrink() {
    document.getElementById("time-took").innerHTML = `Secondes passés: ${time}`;
    await sleep(1000);
    document.getElementById("final-score").innerHTML = `Score actuel: ${points}`;
}

function answer(a) {
    if (a == as[numq]) {
        points += 20;
    }
    nextq();
    numq++;
}

function nextq() {
    if (numq < qs.length) {
        document.getElementById("thequestion").innerHTML = qs[numq];
        document.getElementById("option1").innerHTML = options[4*numq];
        document.getElementById("option2").innerHTML = options[4*numq +1];
        document.getElementById("option3").innerHTML = options[4*numq +2];
        document.getElementById("option4").innerHTML = options[4*numq +3];
    }
    else {
        quizscrn.style.display = 'none';
        finalscrn.style.display = 'block';
        document.getElementById("encore").style.display = 'none';
        stoptime();
        checkdrink();
    }
}