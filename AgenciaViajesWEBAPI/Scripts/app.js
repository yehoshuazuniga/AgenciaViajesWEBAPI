

var urlDirec = window.location.pathname.split('/').pop();

function tratarFecha(fecha) {
    let d = fecha.split("-");
    let dat = d[2].substring(0, 2) + "/" + d[1] + "/" + d[0];
    return dat;
}

function ajaxDestinos() {
    $.ajax({
        type: "GET",
        url: "/api/Destinos",
        success: function (data) {
            $('#tableBody').empty();
            for (var i = 0; i < data.length; i++) {
                $('#tableBody').append('<tr><td>' + data[i].DestinoID
                    + '</td><td>' + data[i].Ciudad
                    + '</td><td>' + data[i].Pais
                    + '</td><td><input type="button" id="btnEditar" value="Edit" onclick="editarRegistro(' + data[i].DestinoID + ')"/>'
                    + '</td><td><input type="button" id="btnBorrar" value="Delete" onclick="borrarRegistro(' + data[i].DestinoID + ')"/>'
                    + '</td></tr>');

            }
        }
    })
}

function ajaxViajeros() {
    $.ajax({
        type: "GET",
        url: "/api/Viajeros",
        success: function (data) {
            $('#tableBody').empty();
            for (var i = 0; i < data.length; i++) {
                $('#tableBody').append('<tr><td>' + data[i].ViajeroID
                    + '</td><td>' + data[i].dni
                    + '</td><td>' + data[i].Nombre
                    + '</td><td>' + tratarFecha(data[i].Fecha_Nacimiento)
                    + '</td><td>' + data[i].Telefono
                    + '</td><td><input type="button" id="btnEditar" value="Edit" onclick="editarRegistro(' + data[i].ViajeroID + ')"/>'
                    + '</td><td><input type="button" id="btnBorrar" value="Delete" onclick="borrarRegistro(' + data[i].ViajeroID + ')"/>'
                    + '</td></tr>');

            }
        }
    })
}


function getData() {

   // let urlDirec = window.location.href.split('/').pop();
    $("#lista").css("display", "");//show
    $('#editado').css("display", "none");

    switch (urlDirec) {
        case "Viajero":
            ajaxViajeros();
            break;
        case "Destino":
            ajaxDestinos()
            break;
        default:
    }


}

$(function () {
    getData();
});


function borrarRegistro(id) {
    switch (urlDirec) {
        case "Viajero":
            $.ajax({
                type: "DELETE",
                url: "/api/Viajeros/" + id,
                success: function () {
                    getData();
                }
            })
            break;
        case "Destino":
            $.ajax({
                type: "DELETE",
                url: "/api/Destinos/" + id,
                success: function () {
                    getData();
                }
            })
            break;

        default:
    }
}

function editarDestino(id) {
    $("#lista").css("display", "none");
    $.ajax({
        type: "GET",
        url: "/api/Destinos/" + id,
        success: function (data) {
            $('#editDestinoID').val(data.DestinoID);
            $('#editCiudad').val(data.Ciudad);
            $('#editPais').val(data.Pais);
            $('#editado').css("display", "");
        }
    })
}

function editarViajero(id) {
    $("#lista").css("display", "none");
    $.ajax({
        type: "GET",
        url: "/api/Viajeros/" + id,
        success: function (data) {
            $('#editViajeroID').val(data.ViajeroID);
            $('#editDNI').val(data.dni);
            $('#editNombre').val(data.Nombre);
            $('#editFecha_Nacimiento').val(tratarFecha(data.Fecha_Nacimiento))
            $('#editTelefono').val(data.Telefono);
            $('#editado').css("display", "");
        }
    })
}

function editarRegistro(id) {

    switch (urlDirec) {
        case "Destino":
            editarDestino(id) 
            break;
        case "Viajero":
            editarViajero(id) 
            break;
        default:
    }

}

function CrearRegistro() {
    $("#lista").css("display", "none");
    $('#editado').css("display", "");

}

function CrearDestino() {
    var ciudad = $('#editCiudad').val();
    var pais = $('#editPais').val();

    var destino = {
        Ciudad: ciudad,
        Pais: pais
    };

    $.ajax({
        url: "/api/Destinos" ,
        type: "POST",
        data: JSON.stringify(destino),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (request) {
            if (request == 200) {
                getData();
            }

        }
    })
}

function GuardarDestino() {

    var id = $('#editDestinoID').val();
    if (id == "" || id == undefined || id == null) {
        CrearDestino();
        return;
    }
    var ciudad = $('#editCiudad').val();
    var pais = $('#editPais').val();

    var destino = {
        DestinoID: id,
        Ciudad: ciudad,
        Pais: pais
    };

    $.ajax({
        url: "/api/Destinos/" + id,
        type: "PUT",
        data: JSON.stringify(destino),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (request) {
            if (request == 200) {
                getData();
            }

        }
    })

}

function CrearViajero() {

    var DNI = $('#editDNI').val();
    var nombre = $('#editNombre').val();
    var fecha = $('#editFecha_Nacimiento').val();
    var tel = $('#editTelefono').val();

    var viajero = {
        dni: DNI,
        Nombre: nombre,
        Fecha_Nacimiento: fecha,
        Telefono: tel
    };

    $.ajax({
        url: "/api/Viajeros",
        type: "POST",
        data: JSON.stringify(viajero),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (request) {
            if (request == 200) {
                getData();
            }

        }
    })

}

function GuardarViajero() {

    var id = $('#editViajeroID').val();
    if (id == "" || id == undefined || id == null) {
        CrearViajero();
        return;
    }

    var DNI = $('#editDNI').val();
    var nombre = $('#editNombre').val();
    var fecha = $('#editFecha_Nacimiento').val();
    var tel = $('#editTelefono').val();

    var viajero = {
        ViajeroID:id,
        dni: DNI,
        Nombre: nombre,
        Fecha_Nacimiento: fecha,
        Telefono: tel
    };

    $.ajax({
        url: "/api/Viajeros/" + id,
        type: "PUT",
        data: JSON.stringify(viajero),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (request) {
            if (request == 200) {
                getData();
            }

        }
    })

}


function Guardar() {

    switch (urlDirec) {
        case "Destino":
            GuardarDestino()
            break;
        case "Viajero":
            GuardarViajero()
            break;
        default:
    }

}