/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(".nTarjeta").on("keyup", function () {
    realTimeValidate();
});
document.getElementsByClassName("cardLabel").innerHTML = "MasterCard";
function realTimeValidate() {
    var inputField = $(".nTarjeta").val();

    if (isMasterCard(inputField)) {
        $(".cardLabel").text("MasterCard");
        $(".cardImg").attr("src", "/labo_1-web/Images/mastercard.png");
    } else if (isAmerican(inputField)) {
        $(".cardLabel").text("American Express");
        $(".cardImg").attr("src", "/labo_1-web/Images/american.png");
    } else if (isDiners(inputField)) {
        $(".cardLabel").text("Diners Club");
        $(".cardImg").attr("src", "/labo_1-web/Images/diners.png");
    } else if (isVisa(inputField)) {
        $(".cardLabel").text("Visa");
        $(".cardImg").attr("src", "/labo_1-web/Images/visa.png");
    } else{
        $(".cardLabel").text("No se ha ingresado un número de tarjeta");
        $(".cardImg").attr("src", "/labo_1-web/Images/not-found.png");
    }
}

function isMasterCard(str) {
    if (str.length >= 5) {
        var num = parseInt(str.substring(0, 5));
        if (num >= 77777 && num <= 88888) {
            return true;
        }
    }
    return false;
}

function isAmerican(str) {
    if (str.length >= 5) {
        var num = parseInt(str.substring(0, 5));
        if (num >= 11111 && num <= 22222) {
            return true;
        }
    }
    return false;
}

function isDiners(str) {
    if (str.length >= 5) {
        var num = parseInt(str.substring(0, 5));
        if (num >= 33334 && num <= 44444) {
            return true;
        }
    }
    return false;
}

function isVisa(str) {
    if (str.length >= 5) {
        var num = parseInt(str.substring(0, 5));
        if (num >= 55555 && num <= 66666) {
            return true;
        }
    }
    return false;
}

function myFunction() {
    alert("I am an alert box!");
}