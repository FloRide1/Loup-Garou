let express   = require('express')
let http      = require('http')
let socketio  = require('socket.io')
let config    = require('./config')

const app     = express()
const server  = http.Server(app)
const io      = socketio(server)
const port    = config.express.port
const options = {
    root: __dirname+'/views'
}

Game = ["create","create","create"]

app.use(express.static(options.root))

app.get('/', (req, res) => {
    res.sendFile('index.html', options)
})

app.get('/create/:id',(req, res) => {
    res.sendFile('create.html', options)
})

app.get('/Partie/:id',(req, res) => {
    res.sendFile('MDJgame.html', options)
})

io.on("connection",function(socket){
    console.log("New User Connected")
    socket.on("index-connection",function() {
        console.log("New User Connect to Menu");
        socket.emit("index-list",Game);
    });

    socket.on("create-connect",function(num) {
        console.log("New Game Create : "+num);
        socket.emit("create-game",num);
    });

    socket.on("game-connect",function(num) {
        console.log("New Game Join : "+num);
        socket.emit("join-game",num);
    });

    socket.on("create-game",function(GameN){
        index = GameN[5];
        Game[index-1] = GameN;
        socket.broadcast.emit("index-list",Game);
        socket.emit("join-game",index);
    })

    socket.on("host-id",function(index) {
        Game[index-1][6] = socket.id;
    })

    socket.on("setUsername",function(username,index) {
        creatorid = Game[index-1][6]
        Tableau = Game[index-1][4]
        var ind = Math.floor(Math.random() * Tableau.length);
        if (Tableau[ind] == undefined) {
            card = "SimpleVillageois";
            Game[index-1][1]++
            Game[index-1][2]++
        } else {
            card = Tableau[ind][0];
            Game[index-1][1]++
            console.log(username+" : "+card)
            if (Tableau[ind][1] > 1) {
                Tableau[ind][1]--;
            } else {
                Tableau.splice(ind,1)
            };
        };
        
        Game[index-1][4] = Tableau
        Game[index-1][7].push([]);
        socket.broadcast.emit("index-list",Game);
        socket.emit("acceptUsername",card);
        io.to(creatorid).emit("addUser",username,card);
    });
})


server.listen(port, () => console.log('Server started on port ' + port))