var express  = require("express"),
    auth = require('./controllers/auth'),
    main = require('./controllers/main'); 

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
app.get('/', main.main);
app.get('/admin', auth.auth);
app.post('/admin', auth.authorized);

// connect to db and start server
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});  
