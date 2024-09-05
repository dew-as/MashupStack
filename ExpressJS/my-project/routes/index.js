var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(`<h1>What is Paragraph?</h1>
    <p>Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph.</p>`)
});
router.get('/lorem', function(req, res, next) {
  const html = "<h2>Hello World</h2>"
  const number = -5
  const names = ['Ajay','Ramu','Raju']
  const obj = {
    name : 'ajay',
    age : 19,
    place : 'delhi'
  }
  const objects = [
    {
      name : 'ajay',
      age : 19,
      place : 'delhi'
    },
    {
      name : 'ramu',
      age : 22,
      place : 'kochi'
    },
    {
      name : 'john',
      age : 32,
      place : 'kanpur'
    }
  ]
  res.render('index', { number: number,html: html,names:names,obj:obj,objects:objects })
});

module.exports = router;

// router.post('/createUser', function(req, res) {  
//   const email = req.body.email
//   res.render("form-data",{
//   email:email, 
//   allData:req.body
//  });
//  console.log(req.body);
// });

// module.exports = router;