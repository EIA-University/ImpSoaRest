var express = require('express');
var router = express.Router();
var request = require('request');

function getNum (callback) {
  request('https://equipo1.jevelasquez.com/aleatonum.php', function (err, res, body) {
    if (!err && res.statusCode == 200) {
      var json = JSON.parse(body);
      var num = json.num;
      console.log(json);
      return callback(num);
    }
  });
}

 var rojos = [3, 32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12];

function isRojo (num) {
  var seguir = true
  var i = 0;

  while(i < rojos.length && seguir) {
    if (rojos[i++] == num)
      seguir = false;
  }

  return !seguir;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ruleta'});
});

router.get('/num', function(req, res, next) {
  res.render('num', { title: 'Apostar Numero'});
});

router.get('/rojo', function(req, res, next) {
  getNum(function(num) {
    var pepe = isRojo(num);
    res.render('resultado', { title: 'Resultados', res: pepe, num: num, isRojo: pepe});
  });
});

router.get('/negro', function(req, res, next) {
  getNum(function(num) {
    var pepe = !isRojo(num);
    res.render('resultado', { title: 'Resultados', res: pepe, num: num, isRojo: !pepe});
  });
});

router.get('/par', function(req, res, next) {
  getNum(function(num) {
    var pepe = (num % 2 == 0);
    res.render('resultado', { title: 'Resultados', res: pepe, num: num, isRojo: isRojo(num)});
  });
});

router.get('/impar', function(req, res, next) {
  getNum(function(num) {
    var pepe = (num % 2 != 0);
    res.render('resultado', { title: 'Resultados', res: pepe, num: num, isRojo: isRojo(num)});
  });
});

router.post('/num', function(req, res, next) {
  var elegido = parseInt(req.body.elegido);
  getNum(function(num) {
    var pepe = (elegido == num);
    res.render('resultado', { title: 'Resultados', res: pepe, num: num, isRojo: isRojo(num)});
  });
});



module.exports = router;
