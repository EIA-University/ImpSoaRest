// da los parametros para la ruleta

var rojos = [3, 32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12];

function isRojo (num) {
    var seguir = true;
    var i = 0;
    while(i < rojos.length && seguir) {
        if (rojos[i++] == num)
            seguir = false;
    }

    return !seguir;
}

module.exports = isRojo;