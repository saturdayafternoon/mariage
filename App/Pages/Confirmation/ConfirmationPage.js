
function ConfirmationPage(param) {

    /* Variable*/
    var self = this;


    /* Récupération du template html */

    var element = Utils.loadHtmlSync("./App/Pages/Confirmation/ConfirmationPage.html");

    var panelLeft = element.querySelector('.panel-left');
    //right
    var panelHome = element.querySelector('.panel-home');
    var panelAdd = element.querySelector('.panel-add');
    var panelEnd = element.querySelector('.panel-end');


    var btnBack = element.querySelector(".back-button");
    var btnHome = element.querySelector(".btn-home");
    var btnAdd = element.querySelector("#btn-add");
    btnAdd.onclick = function(){
        addPersonne();
        self.goToAdd();
    };

    var btnConfInvit  = element.querySelector("#confInvit");
    btnConfInvit.onclick  =function(){
        saveConfInvit();
        self.close();
    };

    var btnEndAdd = element.querySelector("#btn-add-end");
    btnEndAdd.onclick = function(){
        self.goToEnd();
    };

    btnEndAdd.style.display = "none";

    var callBackFct;


    var addPersonne = function(){
        btnEndAdd.style.display = "block";

        var nom = document.getElementById("value-nom");
        var prenom = document.getElementById("value-prenom");
        var isvient = document.getElementById("value-check");
        var info = document.getElementById("value-info");

        var personne= {
            nom:nom.value,
            prenom:prenom.value,
            isVient:isvient.checked,
            info:info.value
        };
        personnes.push(personne);

        var bulle = new BullePersonneAdd(personne);
        panelLeft.appendChild(bulle.getElement());
        bulle.goToInit();
        bulle.goToIn();


        bullesPersonne.push(bulle);
    };


    var saveConfInvit = function(){

        var mot = document.getElementById("value-mot");
        var mail = document.getElementById("value-mail");

        var data = {
            personnes:personnes,
            mot:mot.value,
            mail:mail.value
        };



        Utils.post("http://api.dev.benetjulie.love/mariage/confirmation/",JSON.stringify(data));
    };

    /* INIT */

    this.init = function(){

        element.appendAfter(workspace);


        var tInit = new TimelineLite();

        var widthLeft = panelLeft.offsetWidth;
        var widthRight = panelHome.offsetWidth;

        /* initialisation position */
        tInit .set(panelLeft,{x:-widthLeft})
            .set(panelHome,{x:widthRight})
            .set(panelAdd,{x:widthRight})
            .set(panelEnd,{x:widthRight});

        panelEnd.style.display = "none";
        panelHome.style.display = "none";
        panelAdd.style.display = "none";
        panelLeft.style.display = "none";

    };

    var currentPanelRight;

    var personnes;
    var bullesPersonne;
    this.print = function(callback){

        panelHome.style.display = "block";
        panelLeft.style.display = "block";

        currentPanelRight = panelHome;

        callBackFct = callback;
        ga('send','contact');

        personnes = [];
        bullesPersonne = [];

        var tl = new TimelineLite();
        tl .to(panelLeft,1,{x:0,ease: Power2.easeInOut},"-=1")
            .to(currentPanelRight,1,{x:0,ease: Power2.easeInOut},"-=1");
    };

    var cleatValueAdd = function(){

        var nom = document.getElementById("value-nom");
        var prenom = document.getElementById("value-prenom");
        var isvient = document.getElementById("value-check");
        var info = document.getElementById("value-info");

        nom.value = "";
        prenom.value = "";
        isvient.checked = false;
        info.value = "";
    };

    this.goToAdd = function(){
        var widthRight = currentPanelRight.offsetWidth;

        var nbPersonne = personnes.length+1;

        document.getElementById("title-panel-add").innerText = "Personne numéros"+nbPersonne;
        panelAdd.style.display = "block";

        var tl = new TimelineLite();
        tl .to(currentPanelRight,1,{x:widthRight,ease: Power2.easeInOut,onComplete:function(){
                cleatValueAdd();
                panelHome.style.display = "none";
        }})
            .to(panelAdd,1,{x:0,ease: Power2.easeInOut});

        currentPanelRight = panelAdd;
    };

    this.goToEnd = function(){
        var widthRight = currentPanelRight.offsetWidth;

        panelEnd.style.display = "block";

        var tl = new TimelineLite();
        tl .to(currentPanelRight,1,{x:widthRight,ease: Power2.easeInOut,onComplete:function(){
                panelAdd.style.display = "none";
        }})
            .to(panelEnd,1,{x:0,ease: Power2.easeInOut});

        currentPanelRight = panelEnd;
    };

    this.close = function(){
        var widthLeft = panelLeft.offsetWidth;
        var widthRight = currentPanelRight.offsetWidth;

        var tl = new TimelineLite();

        tl .to(panelLeft,1,{x:-widthLeft,ease: Power2.easeInOut},"-=1")
            .to(currentPanelRight,1,{x:widthRight,ease: Power2.easeInOut,onComplete:endClose},"-=1")

    };

    btnBack.onclick = self.close;
    btnHome.onclick = self.goToAdd;




    var endClose = function(){
        panelEnd.style.display = "none";
        panelHome.style.display = "none";
        panelAdd.style.display = "none";
        panelLeft.style.display = "none";

        if(callBackFct)
            callBackFct();

    };

    this.getElement = function(){
        return element;
    }
}