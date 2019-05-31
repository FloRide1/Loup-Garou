const socket = io();

socket.emit("index-connection")
socket.on("index-list",function(listPart){
    i=0;
    while (i < listPart.length) {
        a = i + 1
        if (listPart[i] != "create") {
            creator = listPart[i][0];
            numberofplayer = listPart[i][1];
            numberofmaxplayer = listPart[i][2];
            typeofpartie = listPart[i][3];
            
            $(".part"+a).replaceWith("<div class=\"part"+a+"\"><h3>Partie "+a+"</h3><p>Createur : "+creator+"</p><p>"+numberofplayer+"/"+numberofmaxplayer+"</p><p>"+typeofpartie+"</p><button onclick=\"ClickConnect("+a+")\"\">Rejoindre</button>");
        } else {
            $(".part"+a).replaceWith("<div class=\"part"+a+"\"><h3>Partie "+a+"</h3><p>Partie Libre</p><button onclick=\"ClickCreate("+a+")\"\">Créer une Partie</button></div>")
        }
        i++
    };
});

socket.on("create-game",function(num){
    window.location.href = "http://localhost:8080/create/"+num;
})

socket.on("join-game",function(num){
    window.location.href = "http://localhost:8080/Partie/"+num+"&num="+num;
})


ClickCreate = function(num) {
    socket.emit("create-connect",num)
}

ClickConnect = function(num) {
    socket.emit("game-connect",num)
}
