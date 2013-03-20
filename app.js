express = require('express.io')

engine = require('ejs-locals')

app = express().http().io()


// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

//engine = require('ejs-locals')
//app.engine('ejs', engine)
app.set('view engine', 'ejs');

// Setup your sessions, just like normal.
app.use(express.cookieParser())
app.use(express.session({secret: 'monkey'}))
app.use(express.static(__dirname + '/public'));

routes = require('./routes/index')(app);
io_routes = require('./routes/socket-io')(app);

console.log("listening on localhost:8080");
app.listen(8080);
