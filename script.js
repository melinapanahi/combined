let vardPlanet = "Mercury"; // sparar vilken planet som är vald just nu, Mercury är standard

const knapp = document.querySelectorAll('.planet-btn'); // hämtar alla planet-knappar (en lista med 7 st)
const vänster_bild = document.querySelector('#pl img'); // hämtar den stora bilden till vänster
const manadval = document.getElementById('ms'); // hämtar dropdown-menyn för månad

knapp.forEach(function(button){ // går igenom varje knapp i listan, en i taget
    button.addEventListener('click', function(){ // lägger till en klick-lyssnare på just den knappen

        const klick = button.querySelector('img'); // hittar bilden inuti knappen som klickades
        vänster_bild.src = klick.src; // byter ut den stora bilden mot den klickade planetens bild
        vänster_bild.alt = klick.alt; // byter ut alt-texten också, så den matchar

        vardPlanet = klick.alt; // sparar namnet på planeten som klickades, t.ex. "Mars"

        if (klick.alt === 'Saturn'){ // om planeten är Saturn...
            vänster_bild.classList.add('saturn-img'); // ...lägg till en klass som visar ringarna korrekt
        } else {
            vänster_bild.classList.remove('saturn-img'); // annars ta bort klassen (om den satt kvar sen förut)
        }

        loadDoc(klick.alt); // hämtar planet-informationen (text) från XML-filen
    });
});

manadval.addEventListener('change', function(){ // körs när användaren väljer en ny månad

    const manad = manadval.value; // hämtar siffran för vald månad, t.ex. "3" för mars
    const bildpath = "images/planets/" + vardPlanet.toLowerCase() + manad + ".png"; // bygger sökvägen till rätt bild

    document.querySelector('#chosen-month img').src = bildpath; // byter bilden i #chosen-month
    document.querySelector('#chosen-month img').alt = vardPlanet + " månad " + manad; // uppdaterar alt-texten
});

function loadDoc(planetNamn) { // funktion som hämtar XML-filen från servern

    var xhttp = new XMLHttpRequest(); // skapar verktyget som hämtar filen

    xhttp.onreadystatechange = function (){ // körs varje gång status på förfrågan ändras
        if (xhttp.readyState === 4 && xhttp.status === 200){ // om filen är klar (4) och allt gick bra (200)
            myFunction(this.responseXML, planetNamn); // skicka vidare XML-innehållet och planetnamnet
        }
    };

    xhttp.open("GET", "planeter.xml", true); // säger vilken fil som ska hämtas, asynkront
    xhttp.send(); // skickar iväg förfrågan
}

function myFunction(xmlDoc, planetNamn) { // letar upp rätt planet i XML:et och visar infon

    var planets = xmlDoc.getElementsByTagName("planet"); // hämtar alla <planet>-taggar

    for (let i = 0; i < planets.length; i++){ // går igenom varje planet i listan

        var name = planets[i].getElementsByTagName("name")[0].textContent; // hämtar namnet på aktuell planet

        if (name === planetNamn){ // om namnet matchar planeten vi letar efter...

            var p = planets[i].getElementsByTagName("p")[0].textContent; // hämtar beskrivningen
            var distans = planets[i].getElementsByTagName("distans")[0].textContent; // hämtar distans
            var diameter = planets[i].getElementsByTagName("diameter")[0].textContent; // hämtar diameter
            var moon = planets[i].getElementsByTagName("moon")[0].textContent; // hämtar antal månar
            var dayLength = planets[i].getElementsByTagName("dayLength")[0].textContent; // hämtar dygnslängd
            var temp = planets[i].getElementsByTagName("temp")[0].textContent; // hämtar temperatur

            document.getElementById("info").innerHTML = `
                <h2> ${name}</h2>
                <p>${p}</p>
                <p>Distans: ${distans}</p>
                <p>Diameter: ${diameter}</p>
                <p>Månar: ${moon}</p>
                <p>Dygnslängd: ${dayLength}</p>
                <p>Temperatur: ${temp}</p>
            `;
        }
    }
}

vänster_bild.src = "images/space/mercury.jpg"; // sätter Mercury som standardbild direkt vid sidladdning
vänster_bild.alt = "Mercury"; // sätter alt-texten för standardbilden
loadDoc("Mercury"); // hämtar och visar Mercury-infon direkt, innan användaren klickat på något

