var express = require('express');
var router = express.Router();
var request = require('request');

var isRojo = require('./modules/ruleta');

/* Funcion para hacer los request de los aleatorios al equipo 1 */
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

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* Post para primer formulario **ENVIAR A EQUIPO1 */
router.post('/getSaldo', function (req, res, next) {
    console.log(req.body);
    res.send("saldo:  " + req.body.saldo);
});

/* POST Apostar Numero */
router.post('/apostarNum', function (req, res, next) {
    var elegido = parseInt(req.body.num);
    getNum(function (num) {
        var validar = (elegido == num);

        res.render('resultadoNum', {
            title: validar? "Ganaste! :)": "Fallaste :(",
            fondo: validar? "happyElmo": "sadElmo",
            numRuleta: num,
            colorRuleta: isRojo(num)? "red": "black",
            numElegido: elegido,
            colorElegido: isRojo(elegido)? "red": "black",
            saldo: 12
        });
    });
});

/* GET Apostar Rojos */
router.get('/apostarRojos', function (req, res, next) {
    getNum(function (num) {
        var validar = isRojo(num);

        res.render('resultadoColor', {
            title: validar? "Ganaste! :)": "Fallaste :(",
            fondo: validar? "happyElmo": "sadElmo",
            numRuleta: num,
            colorRuleta: isRojo(num)? "red": "black",
            colorElegido: "red",
            saldo: 12
        });
    });
});

/* GET Apostar Negros */
router.get('/apostarNegros', function (req, res, next) {
    getNum(function (num) {
        var validar = !isRojo(num);

        res.render('resultadoColor', {
            title: validar? "Ganaste! :)": "Fallaste :(",
            fondo: validar? "happyElmo": "sadElmo",
            numRuleta: num,
            colorRuleta: isRojo(num)? "red": "black",
            colorElegido: "black",
            saldo: 12
        });
    });
});

/* GET Apostar Pares */
router.get('/apostarPares', function (req, res, next) {
    getNum(function (num) {
        var validar = (num % 2) == 0;

        res.render('resultadoPIP', {
            title: validar? "Ganaste! :)": "Fallaste :(",
            fondo: validar? "happyElmo": "sadElmo",
            numRuleta: num,
            colorRuleta: isRojo(num)? "red": "black",
            colorElegido: "pink",
            pip: "Par",
            saldo: 12
        });
    });
});

/* GET Apostar Impares */
router.get('/apostarImpares', function (req, res, next) {
    getNum(function (num) {
        var validar = (num % 2) != 0;

        res.render('resultadoPIP', {
            title: validar? "Ganaste! :)": "Fallaste :(",
            fondo: validar? "happyElmo": "sadElmo",
            numRuleta: num,
            colorRuleta: isRojo(num)? "red": "black",
            colorElegido: "cyan",
            pip: "Impar",
            saldo: 12
        });
    });
});

module.exports = router;
