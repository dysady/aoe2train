document.addEventListener("DOMContentLoaded", function() {
    var images = [
        ["archery.png", ["s","z"]],
        ["caserne.png", ["s","a"]],
        ["bucheron.png", ["q","r"]],
        ["champ.png", ["q","q"]],
        ["chateau.png", ["s","c"]],
        ["ecurie.png", ["s","e"]],
        ["eglise.png", ["q","f"]],
        ["forge.png", ["q","s"]],
        ["forum.png", ["q","w"]],
        ["marche.png", ["q","t"]],
        ["mineur.png", ["q","e"]],
        ["moulin.png", ["q","z"]],
        ["murb.png", ["s","s"]],
        ["obs.png", ["s","q"]],
        ["port.png", ["q","d"]],
        ["porte.png", ["s","w"]],
        ["siege.png", ["s","r"]],
        ["tour.png", ["s","f"]],
        ["univ.png", ["q","g"]],
        // Ajoutez ici le chemin de vos images
    ];
    var currentIndex;
    var startTime, endTime;
    var combination;
    var iteration = [];
    var total = 0;
    var cont = 0;
    var tempTransi = 500; // 1000 = 1 seconde

    // Fonction pour mettre à jour tempTransi
    function updateTempTransi(value) {
        tempTransi = value;
        console.log("tempTransi mis à jour :", tempTransi);
    }

    // Fonction d'initialisation des boutons
    function initButtons() {
        // Sélection des boutons
        var facileBtn = document.getElementById("facile");
        var moyenBtn = document.getElementById("moyen");
        var durBtn = document.getElementById("dur");
        var instantBtn = document.getElementById("instant");

        // Ajout d'écouteurs d'événements pour chaque bouton
        facileBtn.addEventListener("click", function() {
            updateTempTransi(1000);
            document.getElementById("choice").innerHTML = "facile";
        });

        moyenBtn.addEventListener("click", function() {
            updateTempTransi(500);
            document.getElementById("choice").innerHTML = "moyen";
        });

        durBtn.addEventListener("click", function() {
            updateTempTransi(250);
            document.getElementById("choice").innerHTML = "dur";
        });

        instantBtn.addEventListener("click", function() {
            updateTempTransi(10);
            document.getElementById("choice").innerHTML = "instant";
        });
    }

    function displayRandomImage() {
        currentIndex = Math.floor(Math.random() * images.length);
        document.getElementById("displayedImage").src = "assets/images/" + images[currentIndex][0];
        startTime = new Date();
        //document.getElementById("message").innerHTML = "";
        document.getElementById("correction").innerHTML = "";
        document.getElementById("current").innerHTML = "";
        // Réinitialise la combinaison à celle de l'image actuelle
        combination = images[currentIndex][1].slice();
    }

    function Moy(arr) {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum / arr.length;
    }

    document.addEventListener("keydown", function(event) {
        // Vérifie si Ctrl est enfoncé et si la touche appuyée est une lettre
        if (event.ctrlKey && event.key.length === 1 && event.key.match(/[a-z]/i)) {
            // Empêche le comportement par défaut de l'événement
            event.preventDefault();
            console.log("Combinaison de touches Ctrl + " + event.key + " désactivée.");
        }
    });
    
    function checkCombination(event) {
        var currentKey = String.fromCharCode(event.keyCode).toLowerCase();
        if (cont == 1) {
            return;
        }
        document.getElementById("current").innerHTML = document.getElementById("current").innerHTML + currentKey + " ";
        // Vérifie si la touche actuelle correspond à la prochaine touche de la combinaison
        if (currentKey === combination[0]) {
            combination.shift(); // Supprime la première touche de la combinaison
            if (combination.length === 0) {
                endTime = new Date();
                var timeTaken = endTime - startTime;
                iteration.push(timeTaken);
                total++;
                var timeMoy = Moy(iteration);
                var pourcent = (iteration.length / total) * 100;
                document.getElementById("stat").innerHTML = "moyenne : " + timeMoy.toFixed(2) + " ms;  réussite : " + pourcent.toFixed(2) + "%";
                document.getElementById("message").innerHTML = "Temps écoulé : " + timeTaken + " ms";
                count = 1;
                document.getElementById("imageContainer").style.backgroundColor = "green";
                setTimeout(displayRandomImage, tempTransi); // Change d'image après 1 seconde
                count = 0;
            }
        } else if (combination[0] === 'ctrl' && event.ctrlKey) {
            
            combination.shift(); // Supprime la première touche de la combinaison
            if (combination.length === 0) {
                endTime = new Date();
                var timeTaken = endTime - startTime;
                iteration.push(timeTaken);
                total++;
                var timeMoy = Moy(iteration);
                var pourcent = (iteration.length / total) * 100;
                document.getElementById("stat").innerHTML = "moyenne : " + timeMoy.toFixed(2) + " ms;  réussite : " + pourcent.toFixed(2) + "%";
                document.getElementById("message").innerHTML = "Temps écoulé : " + timeTaken + " ms";
                count = 1;
                document.getElementById("imageContainer").style.backgroundColor = "green";
                setTimeout(displayRandomImage, tempTransi); // Change d'image après 1 seconde
                count = 0;
            }
        } else if (combination[0] === 'mc' && event.button === 3) {
            combination.shift(); // Supprime la première touche de la combinaison
            if (combination.length === 0) {
                endTime = new Date();
                var timeTaken = endTime - startTime;
                iteration.push(timeTaken);
                total++;
                var timeMoy = Moy(iteration);
                var pourcent = (iteration.length / total) * 100;
                document.getElementById("stat").innerHTML = "moyenne : " + timeMoy.toFixed(2) + " ms;  réussite : " + pourcent.toFixed(2) + "%";
                document.getElementById("message").innerHTML = "Temps écoulé : " + timeTaken + " ms";
                count = 1;
                document.getElementById("imageContainer").style.backgroundColor = "green";
                setTimeout(displayRandomImage, tempTransi); // Change d'image après 1 seconde
                count = 0;
                
            }
            
        }else{
            total++;
            var timeMoy = Moy(iteration);
            var pourcent = (iteration.length / total) * 100;
            document.getElementById("stat").innerHTML = "moyenne : " + timeMoy.toFixed(2) + " ms;  réussite : " + pourcent.toFixed(2) + "%";
            document.getElementById("message").innerHTML = "Mauvaise combinaison!";
            var combination2 = images[currentIndex][1].slice();
            document.getElementById("correction").innerHTML = combination2 ;
            document.getElementById("imageContainer").style.backgroundColor = "red";
            count = 1;
            setTimeout(displayRandomImage, tempTransi); // Change d'image après 1 seconde
            count = 0;
        }
    }

    displayRandomImage();
    document.addEventListener("keydown", checkCombination);
    // Appel de la fonction d'initialisation des boutons au chargement de la page
    initButtons();
});
