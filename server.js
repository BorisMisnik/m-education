var express  = require("express"),
    dataBase = require('./models/init'),
    routes   = require('./routers.json');

var app = express();

//  configuration node
app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.cookieSession({
        key: 'session',
        secret: '1234',
        cookie : {
            path : '/',
            httpOnly: true,
            maxAge: null
        }
    }));
    app.use(app.router);
    app.use(express.static( __dirname + '/assets' ));

    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');
});

// routes
for( var i = 0; i < routes.length; i++ ){
    var controller = require(routes[i].path);
    app[routes[i].type](routes[i].url, controller[routes[i].func]);
}

// connect to db and start server
dataBase.dbConnect(function(){
    var port = process.env.PORT || 5000;
    app.listen(port, function() {
        console.log("Listening on " + port);
    });  
});
