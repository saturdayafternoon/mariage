function JourJ(param) {

    /* Variable*/
    var self = this;

/* public */
    var aide;
    var bulles = [];
    var lines = [];

    this.init = function() {
        bulles = [];
        lines = [];
        var bMairie = new BulleDayStep({text:"Mairie",heure:"15h30",size:200,background:"#028c7e",positionLine:1});
        bulles.push(bMairie);

        var bEglise = new BulleDayStep({text:"Eglise",heure:"16h30",size:200,background:"#028c7e",positionLine:3});
        bulles.push(bEglise);

        var bVinHonneur = new BulleDayStep({text:"Vin d'honeur",heure:"18h30",size:200,background:"#028c7e",positionLine:5});
        bulles.push(bVinHonneur);

        var bSoiree = new BulleDayStep({text:"Soirée de mariage",heure:"23h30",size:200,background:"#028c7e",positionLine:7});
        bulles.push(bSoiree);

        var bDodo = new BulleDayStep({text:"Dodo (Hotels)",heure:"Au plus tard :D",size:200,background:"#724823",positionLine:9});
        bulles.push(bDodo);

        var bBrunch = new BulleDayStep({text:"Brunch",heure:"11h30",size:200,background:"#724823",positionLine:11});
        bulles.push(bBrunch);


        var line1 = new Line(bMairie,bEglise,{size:5,color:"#028c7e"});
        lines.push(line1);

        var line2 = new Line(bEglise,bVinHonneur,{size:5,color:"#028c7e"});
        lines.push(line2);

        var line3 = new Line(bVinHonneur,bSoiree,{size:5,color:"#028c7e"});
        lines.push(line3);

        var line4 = new Line(bSoiree,bDodo,{size:5,color:"#028c7e"});
        lines.push(line4);

        var line5 = new Line(bDodo,bBrunch,{size:5,color:"#028c7e"});
        lines.push(line5);

        lines.forEach(function(line){
            workspace.appendChild(line.getElement());
            line.init();
        });

        bulles.forEach(function(bulle){
            workspace.appendChild(bulle.getElement());
            bulle.goToInit();
        });



        aide = document.createElement("div");
        aide.className = "aide";
        aide.innerText="Pour plus d'information cliquez sur une bulle";
        workspace.appendChild(aide);




    };
    this.close = function() {

        if(aide) {
            workspace.removeChild(aide);
            aide = null;
        }

        bulles.forEach(function(bulle){
            bulle.goToOut(function(){
                for(var i=0;i < workspace.children.length;i++)
                {

                //remove bulle
                    if(workspace.children[i] == bulle.getElement()) {
                        workspace.removeChild(bulle.getElement());
                    }

                //remove line
                    lines.forEach(function(line) {
                        if(workspace.children[i] == line.getElement()) {
                            line.remove();
                            workspace.removeChild(line.getElement());
                        }
                    });
                }
            });
        });
    };

    this.getElement = function(){
        return element;

    };
}