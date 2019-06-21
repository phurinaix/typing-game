const express = require('express');
// require('./db/db.js');
const cors = require('cors');
const con = require('./db');
const app = express();
// const Article = require('./models/article.js');
const port = process.env.PORT;

app.set('view engine', 'hbs');
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.render('home.hbs');
});

app.get('/typegame', (req, res) => {
  res.render('typegame.hbs');
});

app.get('/create', (req, res) => {
  res.render('create.hbs');
});

app.get('/about', (req, res) => {
  res.render('about.hbs');
});

app.get('/view', (req, res) => {
  res.render('view.hbs');
})

app.post('/api/create', async (req, res) => {
  var data = req.body;
  try {
    if (!data.article) {
      return res.redirect('/create?status=error');
    }
    if (!(/^[A-Za-z0-9\/\s\."'-]+$/.test(data.article))) {
      return res.redirect('/create?status=error');
    }
    if (data.article.length < 10 || data.article.length > 100) {
      return res.redirect('/create?status=error');
    }
    var article = data.article.trim();
    var sql = "INSERT INTO articles (article) VALUES (" + con.escape(article) + ")";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect("/create?status=success");
    });
  } catch(e) {
    res.redirect('/create?status=error');
  }

  // const article = new Article(req.body);
  // try {
  //   await article.save();
  //   res.redirect('/create?status=success');
  // } catch(e) {
  //   res.redirect('/create?status=error&extra=' + e);
  // }
});

app.get('/api/articles', async (req, res) => {
  try {
    var sql = "SELECT article FROM articles";
    await con.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch(e) {
    res.send({status: 'error'});
  }
  // try {
  //   const articles = await Article.find({});

  //   res.send(articles);
  // } catch(e) {
  //   res.send({status: 'error'});
  // }
});

app.listen(port, () => {
  console.log("Starting Server on port " + port);
});