// app.js

var express = require('express'),
  db = require('./models/index.js'),
  bodyParser = require('body-parser'),
  methodOvrride = require('method-override'),
  app = express();

app.set('view engine', 'ejs');

app.use(methodOvrride());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

// logging
app.use(function(req, res, next){
  console.log(req.method, req.url);
  next();
});

//list all blog posts in chronological order 
app.get('/', function (req, res){
  db.post.findAll().success(function(allPosts){
    res.render('site/index', {posts: allPosts}); //the posts key is taco to be referenced in ejs 
  });
});

//list all users
app.get('/users', function (req,res) {
  db.user.findAll().success(function(foundUsers){
    res.render('users/index', {users: foundUsers }); //first users is taco key which should match users ejs, second users is what's passed through the function 
  });
});

//list all posts by specific user 
app.get('/users/:id', function (req,res) {
  var id = req.params.id; 
  db.post.findAll({ where: {userId: id} }).success(function(foundPosts){
    res.render('users/show', {posts: foundPosts, userId: id })
    console.log("Found posts by author id")
    console.log(foundPosts)
  })
});

//list specific post
app.get('/posts/:id', function (req,res) {
  var id = req.params.id;

  //

});

//create new post 
app.get('/users/:id/posts/new', function(req, res){
  var id = req.params.id;
  res.render('users/new', {userId: id})
  //
});


app.post('/users/:id/posts', function(req, res){
  var id = req.params.id;
  var postTitle = req.body.postTitle;
  var postBody = req.body.postBody;
    db.post.create({ title: postTitle, body: postBody, userId: id }).success(function(post){
      res.redirect('/blog')  //how would you redirect to /users/id ???
    })
});




app.listen(3000, function(){
  console.log("LISTENING ON PORT 3000")
})
