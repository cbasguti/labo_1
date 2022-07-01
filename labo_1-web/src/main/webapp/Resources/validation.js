// Validacion genericas
function isAlphabet(str) {
    return /^[a-zA-Z]*$/.test(str);
}

function isNumeric(str) {
    return /^[0-9]*$/.test(str);
}

function isEmail(str) {
    return /^(.+)@(.+)$/.test(str);
}

// Para vaciar los inputs
$(".inputCel").each(function () {
    if (!$(this).hasClass('tipo')) {
        $(this).val('');
    }
});

function errorOn(element) {
    $('.btn-save').prop('disabled', true);
    $(element).css('border', '3px solid #be4848');
    $(element).parent().prev('td').children('label').css('color', '#be4848');
    $(element).parent().prev('td').children('label').css('font-weight', 'bold');
}

function errorOff(element) {
    $('.btn-save').prop('disabled', false);
    $(element).css('border', '');
    $(element).parent().prev('td').children('label').css('color', '');
    $(element).parent().prev('td').children('label').css('font-weight', '');
}

$('#j_idt6').submit(function (e) {
    if (existsEmptyField()) {
        validateEmptyFields();
        e.preventDefault();
        alert("Por favor, no dejar campos vacíos");
    } else {
        if (validateNombre()) {
            e.preventDefault();
            alert("NOMBRE: El nombre ingresado no es válido.");
        }
        if (validateApellido()) {
            e.preventDefault();
            alert("APELLIDO: El apellido ingresado no es válido.");
        }
        if (validateCorreo()) {
            e.preventDefault();
            alert("CORREO: El correo ingresado no es válido.");
        }
        if (validateTarjeta()) {
            e.preventDefault();
            alert("TARJETA: El número de tarjeta no debe contener caracteres.");
        }
        if (validateCVV()) {
            e.preventDefault();
            alert("CVV: El CVV no debe contener caracteres.");
        }
        if (validateLengthTarjeta()) {
            e.preventDefault();
            alert("TARJETA: El número de tarjeta debe tener 16 dígitos.");
        }
        if (validateLengthCvv()) {
            e.preventDefault();
            alert("CVV: El CVV debe tener 3 dígitos.");
        }
        if (validateFechaVenc()) {
            e.preventDefault();
            alert("FECHA_VENC: Por favor ingresar la fecha en el formato MM/AA");
        }
        if (validateValor()) {
            e.preventDefault();
            alert("VALOR: Sólo transacciones entre $500 y $10.000");
        }
    }
});

function existsEmptyField() {
    var empty = false;
    $(".inputCel").each(function () {
        if (!$(this).hasClass('tipo')) {
            var inputField = $(this).val();
            if (inputField.length == 0) {
                empty = true;
            }
        }
    });
    return empty;
}

// Validacion general
function validateEmptyFields() {
    $(".inputCel").each(function () {
        if (!$(this).hasClass('tipo')) {
            var inputField = $(this).val();
            if (inputField.length == 0) {
                errorOn($(this));
            } else {
                errorOff($(this));
            }
        }
    });
}


// Validacion NOMBRE
$(".nombre").on("keyup", function () {
    validateNombre();
});

function validateNombre() {
    var inputField = $(".nombre").val();
    if (!isAlphabet(inputField)) {
        alert("NOMBRE: El nombre ingresado no es válido.");
        errorOn($(".nombre"));
        return true;
    } else {
        errorOff($(".nombre"));
        return false;
    }
}

// Validacion APELLIDO
$(".apellido").on("keyup", function () {
    validateApellido();
});

function validateApellido() {
    var inputField = $(".apellido").val();
    if (!isAlphabet(inputField)) {
        alert("APELLIDO: El apellido ingresado no es válido.");
        errorOn($(".apellido"));
        return true;
    } else {
        errorOff($(".apellido"));
        return false;
    }
}

// Validacion CORREO
$(".correo").on("keyup", function () {
    validateCorreo();
});

function validateCorreo() {
    var inputField = $(".correo").val();
    if (!isEmail(inputField)) {
        errorOn($(".correo"));
        return true;
    } else {
        errorOff($(".correo"));
        return false;
    }
}



// Validacion N TARJETA
$(".nTarjeta").on("keyup", function () {
    validateTarjeta();
});

function validateLengthTarjeta() {
    var inputField = $(".nTarjeta").val();
    if (!(inputField.length == 16)) {
        errorOn($(".nTarjeta"));
        return true;
    } else {
        errorOff($(".nTarjeta"));
        return false;
    }
}

function validateTarjeta() {
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
    } else {
        $(".cardLabel").text("No se ha ingresado un número de tarjeta");
        $(".cardImg").attr("src", "/labo_1-web/Images/not-found.png");
    }

    if (!isNumeric(inputField)) {
        alert("TARJETA: El número de tarjeta no debe contener caracteres.");
        errorOn($(".nTarjeta"));
        return true;
    } else {
        errorOff($(".nTarjeta"));
        return false;
    }

    if (inputField.length < 16 || inputField.length > 16) {
        $(".nTarjeta").css('border-color', 'red');
        $(element).parent().prev('td').children('label').css('color', 'red');
        $(element).parent().prev('td').children('label').css('font-weight', 'bold');
    } else {
        $(".nTarjeta").css('border-color', '');
        $(element).parent().prev('td').children('label').css('color', '');
        $(element).parent().prev('td').children('label').css('font-weight', '');
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

// Validacion CVV
$(".cvv").on("keyup", function () {
    validateCVV();
});

function validateCVV() {
    var inputField = $(".cvv").val();
    if (!isNumeric(inputField)) {
        alert("CVV: El CVV no debe contener caracteres.");
        errorOn($(".cvv"));
        return true;
    } else {
        errorOff($(".cvv"));
        return false;
    }
}

function validateLengthCvv() {
    var inputField = $(".cvv").val();
    if (!(inputField.length == 3)) {
        errorOn($(".cvv"));
        return true;
    } else {
        errorOff($(".cvv"));
        return false;
    }
}

// Validacion FECHA_VENC
$(".fechaVenc").on("keyup", function () {
    validateFechaVenc();
});

function validateFechaVenc() {
    var inputField = $(".fechaVenc").val();
    if (!(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(inputField))) {
        errorOn($(".fechaVenc"));
        return true;
    } else {
        errorOff($(".fechaVenc"));
        return false;
    }
}

// Validacion VALOR
$(".valor").on("keyup", function () {
    var inputField = $(".valor").val();
    if (!isNumeric(inputField)) {
        alert("VALOR: El valor no debe contener caracteres.");
        errorOn($(".valor"));
        return true;
    } else {
        errorOff($(".valor"));
        return false;
    }
});

function validateValor() {
    var inputField = $(".valor").val();
    if (inputField < 500 || inputField > 10000) {
        errorOn($(".valor"));
        return true;
    } else {
        errorOff($(".valor"));
        return false;
    }
}

// Jquery Dependency For Currency
$(".valor").attr("data-type", "currency");
$("input[data-type='currency']").on(function () {
    var min = Globalize.parseFloat($(this).attr("min"));
    var max = Globalize.parseFloat($(this).attr("max"));
    var value = Globalize.parseFloat($(this).val());
    if (value < min) {
        value = min;
    }
    if (value > max) {
        value = max;
    }
    $(this).val(value);
});
