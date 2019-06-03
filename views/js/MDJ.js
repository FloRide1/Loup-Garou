const socket = io();


var modalContainer = document.body.querySelector('#modal-container'),
    listUsers = modalContainer.querySelector('#contentUsers ul')

function openUsernameModal() {
    modalContainer.querySelector('#contentUsername').classList.remove('none')
    modalContainer.classList.remove('out')
    document.body.classList.add('modal-active')
}

function closeModal() {
    modalContainer.classList.add('out')
    document.body.classList.remove('modal-active')
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}

function giveimgName(img) {
    switch (img) {
        case "SimpleVillageois":
            Name = "simple.png"
            break;
        case "Voyante":
                Name = "voyante.png"
                break;
        case "Sorcière":
            Name = "sorciere.png"
            break;
        case "Chasseur":
            Name = "chasseur.png"
            break;
        case "PetiteFille":
            Name = "fille.png"
            break;
        case "Cupidon":
            Name = "cupidon.png"
            break;
        case "Corbeau":
            Name = "corbeau.png"
            break;
        case "Salvateur":
            Name = "salvateur.png"
            break;
        case "Chevalier":
            Name = "knight.png"
            break;
        case "Soeurs":
            Name = "sister.png"
            break;
        case "Frères":
            Name = "brothers.png"
            break;
        case "Shaman":
            Name = "shaman.png"
            break;
        case "Ancien":
            Name = "ancien.png"
            break;
        case "Renard":
            Name = "redfox.png"
            break;
        case "Idiot":
            Name = "idiot.png"
            break;
        case "BoucEmissaire":
            Name = "bouc.png"
            break;
        case "MontreurOurs":
            Name = "ours.png"
            break;
        case "JugeBègue":
            Name = "juge.png"
            break;
        case "Villageois-Villageois":
            Name = "simple.png"
            break;
        case "Ankou":
            Name = "ankou.png"
            break;
        case "Marionettiste":
            Name = "marionnetiste.png"
            break;
        case "Servante":
            Name = "servante.png"
            break;
        case "Gentleman":
            Name = "gentleman.png"
            break;
        case "FilsdelaLune":
            Name = "moonson.png"
            break;
        case "Joker":
            Name = "joker.png"
            break;
        case "Loup-Garou":
            Name = "wolf.png"
            break;
        case "Loup-GarouBlanc":
            Name = "whitewolf.png"
            break;
        case "GrandMéchantLoup":
            Name = "bigbadwolf.png"
            break;
        case "InfectPèredesLoups":
            Name = "infect.png"
            break;
        case "EnfantSauvage":
            Name = "wolfchild.png"
            break;
        case "Chien-Loup":
            Name = "wolfdog.png"
            break;
        case "Loup-Rouge":
            Name = "redwolf.png"
            break;
        case "Loup-Bleue":
            Name = "bluewolf.png"
            break;
        case "Loup-Violet":
            Name = "purplewolf.png"
            break;
        case "Voleur":
            Name = "voleur.png"
            break;
        case "JoueurdeFlute":
            Name = "flute.png"
            break;
        case "Ange":
            Name = "ange.png"
            break;
        case "Lapin":
            Name = "rabbit.png"
            break;
        case "AbominableSectaire":
            Name = "sectaire.png"
            break;
        case "ArnaCoeur":
            Name = "arnacoeur.png"
            break;
        case "Detective":
            Name = "detective.jpg"
            break;
        case "Avocat":
            Name = "avocat.png"
            break;
            
    
    }
    return Name
}

host = getUrlParam('host','false');
index = getUrlParam('num','');
if (!(host == "true")) {
    openUsernameModal();
    $(".player-list").remove()
} else {
    socket.emit("host-id",index);
}



formUsername.addEventListener('submit', (event) => {
    event.preventDefault()
    let usernameWanted = inputUsername.value
    socket.emit('setUsername', usernameWanted,index)
    inputUsername.classList.add('hidden')
    loaderUsername.classList.remove('hidden')
})

socket.on('acceptUsername', (card) => {
    img = giveimgName(card)
    $("body").append("<div class=\"card noise\"><h3><img src=\"../img/game/"+img+"\"/><br/>"+card+"</h3></div>")
    closeModal()
})

socket.on("addUser",function(username,card) {
    img = giveimgName(card)
    $(".listofplayer").append("<span>"+username+"<img src=\"../img/game/"+img+"\"/></br></span>");
})

