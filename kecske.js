window.addEventListener("load", init);

//segédfüggvények
function ID(nev) {
    return document.getElementById(nev);
}

function $(nev) {
    return document.querySelectorAll(nev);
}

//bal part formázása
function balFormaz() {
    $("aside")[0].classList.add("aside_formaz");
    $("#bal p")[0].classList.add("p_formaz");
    for (var i = 0; i < $("#bal img").length; i++) {  //képek igazítása
        $("#bal img")[i].classList.add("img_style");
    }
}

//jobb part formázása
function jobbFormaz() {
    $("aside")[1].classList.add("aside_formaz");
    $("#jobb p")[0].classList.add("p_formaz");
    for (var i = 0; i < $("#jobb p img").length; i++) { //képek igazítása
        $("#jobb p img")[i].classList.add("img_style");
    }
}


function keszitoneve() {
    $("footer p")[0].classList.add("keszito_neve");
    $("footer p")[0].innerHTML = "Készítette: Antal Adrienn";
}

function kiemel() {
    this.classList.add("kiemel");
}

function kiemelLe() {
    this.classList.remove("kiemel");
}

function kepeknekID() {
    $("#bal img")[0].id = "kecske";
    $("#bal img")[1].id = "kaposzta";
    $("#bal img")[2].id = "farkas";

}

function kattintasEsemeny() {
    balFormaz();

    //var tomb = [$("#bal img").length];

    var tomb = [1];   //létrehozok egy tömböt, ebbe helyezze be a kép elérési útját, amelyikre kattintottam
    tomb.push(this.src);
    console.log(tomb.join(""));
    this.style.display = "none";  //elveszem a láthatóságát
    //this.classList.add("kep_eltuntet"); stílus hozzáadásával nem működik!

    var pic = document.createElement("img");  //kreálok egy img tag-et
    pic.src = this.src;                     //átadom neki az aktuális kép forráslinkjét 
    pic.id = this.id;                       //átadom neki az aktuális kép ID-ját 
    $("article div")[0].appendChild(pic);     //belehelyezem az img tag-et az article div tárolóba
    pic.classList.add("kep_csonakba");

    csonakba();
}


function csonak_kepID_tombbe() {  //a csónakban lévő elemek kép ID-jainak tömbbe mentése

    var kep_id = [3];                                       //létrehozok egy tömböt, amely a képek ID-jait tárolja majd (egyszere max. 3 elem lehet a csónakban)
    for (var i = 1; i < $("article div img").length; i++) { //elég 1-től indulni, mert a hajós kép a 0. indexű kép, és azt nem kell belevenni a tömbbe
        kep_id.push($("article div img")[i].id);            //a tömbbe pakolom az aktuális elem ID-ját
    }
    return kep_id;
}



function csonakba() { //az elemek bal partról a csónakba emelése

    var kep_id = csonak_kepID_tombbe();

    if (kep_id.includes("kecske") && kep_id.includes("farkas") && kep_id.includes("kaposzta")) {
        alert("Ez így nem fog menni, mert kecske menet közben megeszi a káposztát, a farkas pedig felfalja a kecskét!");

        boatInit();
        bal_jobb_part_kezdeti();


    } else if
            (kep_id.includes("kecske") && kep_id.includes("kaposzta")) {
        alert("Ez így nem fog menni, mert a kecske menet közben megeszi a káposztát!");

        boatInit();

        $("#bal img")[0].style.display = "inline";  //visszaadjuk a két kép láthatóságát a bal parton
        $("#bal img")[1].style.display = "inline";



    } else if
            (kep_id.includes("kecske") && kep_id.includes("farkas")) {
        alert("Ez így nem fog menni, mert a farkas menet közben felfalja a kecskét!");

        boatInit();

        $("#bal img")[0].style.display = "inline";  //visszaadjuk a két kép láthatóságát a bal parton
        $("#bal img")[2].style.display = "inline";


    } else if
            (kep_id.includes("kaposzta") && kep_id.includes("farkas")) {

//első ablak és gomb létrehozása
        var ablak1 = document.createElement("div");
        $("article div")[0].appendChild(ablak1);

        ablak1.innerHTML = "<p>Kattints a gombra, hogy a farkas és a káposzta a jobb partra kerülhessen!</p> ";

        var gomb1 = document.createElement("input");
        gomb1.type = "button";
        gomb1.value = "Indulás!";
        gomb1.id = "gomb1";
        ablak1.appendChild(gomb1);
        ablak1.classList.add("ablak");
        gomb1.classList.add("gomb");

        ID("gomb1").addEventListener("click", kecske_kaposzta_at);
    }
}



function boatInit() {
    $("article div")[0].innerHTML = "";  //teljesen üres article divvel indítunk
    $("article")[0].style.backgroundColor = "lightskyblue";
    var boat = document.createElement("img");  //kreálok egy img tag-et
    boat.src = "kepek/csonak.png";              //átadom neki hajós kép forráslinkjét    
    $("article div")[0].appendChild(boat);     //belehelyezem az article div tárolóba

}


function kecske_kaposzta_at() {
    //a kecskét és a káposztát a jobb partra viszem (már a csónakban "várakoznak")

    var kep_id = csonak_kepID_tombbe();
    for (var i = 1; i < kep_id.length; i++) {        
        if (["kecske", "kaposzta", "farkas"].includes(kep_id[i])) {
            $("#jobb p")[0].innerHTML += "<img src=" + ID(kep_id[i]).src + ">";
        }
    }

    jobbFormaz();
    $("article div")[0].innerHTML = ""; //legyen üres az article div
    boatInit();

    //második ablak és gomb létrehozása

    var ablak2 = document.createElement("div");
    $("article div")[0].appendChild(ablak2);

    ablak2.innerHTML = "<p>Emeld be a kecskét a csónakba, majd a gombra kattintva segíts neki átjutni a jobb partra!</p> ";

    var gomb2 = document.createElement("input");
    gomb2.type = "button";
    gomb2.value = "Rajta!";
    gomb2.id = "gomb2";
    ablak2.classList.add("ablak");
    ablak2.appendChild(gomb2);
    gomb2.classList.add("gomb");

    ID("gomb2").addEventListener("click", kecske_at);

}


//a kecske átsegítése a jobb partra
function kecske_at() {
    $("#jobb p")[0].innerHTML += "<img src=" + ID("kecske").src + ">";
    $("article div")[0].innerHTML = ""; //legyen üres az article div
    boatInit();
    $("#bal img")[0].style.display = "none"; //elveszem a kecske láthatóságát a bal parton
    jobbFormaz();

    //if ($("#jobb p img").length === 3) {
    var ablak3 = document.createElement("div");
    $("article div")[0].appendChild(ablak3);
    ablak3.classList.add("ablak");
    ablak3.style.backgroundColor = "beige";
    ablak3.innerHTML = "<p>Hurrá, mindenki sikeresen és egy darabban átért a jobb partra!</p> ";
    // }

}

function bal_jobb_part_kezdeti() {

    $("#bal img")[0].style.display = "inline-block";  //visszaadjuk a 3 kép láthatóságát a bal parton
    $("#bal img")[1].style.display = "inline-block";
    $("#bal img")[2].style.display = "inline-block";

    $("#jobb p")[0].innerHTML = "";   //a jobb oldali p ne tartalmazzon képeket, legyen üres

}


function init() {
    //ne duplikálódjon az Újratölt gomb
    var c = $("footer form")[0].childElementCount;  //megszámoljuk a footer form gyerekelemeit    
    if (c === 4)                                    //ha 4 van, akkor törölje a legutolsót (azaz az "előző" Újratölt gombot)
        $("footer form")[0].removeChild($("footer form")[0].lastElementChild);

   //függvények hívása
    boatInit();
    balFormaz();
    keszitoneve();
    kepeknekID();
    bal_jobb_part_kezdeti();

 //eseménykezelés
    for (var i = 0; i < $("#bal img").length; i++) {
        $("#bal img")[i].addEventListener("mouseover", kiemel);
        $("#bal img")[i].addEventListener("mouseleave", kiemelLe);
        $("#bal img")[i].addEventListener("click", kattintasEsemeny);
    }

    jobbFormaz();

  //"Újratölt" gomb létrehozása, kattintáseseménye
    var gomb = document.createElement("input");
    gomb.type = "button";
    gomb.value = "Újratölt";
    gomb.id = "gomb";
    gomb.style.float ="right";    
    $("footer form")[0].appendChild(gomb);
    gomb.classList.add("gomb");
    gomb.addEventListener("click", init);

}

