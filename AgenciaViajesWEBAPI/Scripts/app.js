

var urlDirec = window.location.pathname.split('/').pop();

function tratarFecha(fecha) {
    let d = fecha.split("-");
    let dat = d[2].substring(0, 2) + "/" + d[1] + "/" + d[0];
    return dat;
}

function comboViajero() {
    $.ajax({
        type: "GET",
        url: "/api/Viajeros",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#editNombreViajero")
                .empty()
                .append($("<option></option>")
                    .val("0")
                    .html("-Seleccione Viajero-"));
            $.each(data, function (key, value) {
                var option = $(document.createElement('option'));
                option.html(value.dni + "===>" + value.Nombre);
                //option.val(key);
                option.val(value.ViajeroID)
                $("#editNombreViajero").append(option);
            });

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + " " + XMLHttpRequest.responseText);
        }
    })

}

function comboDestino() {
    $.ajax({
        type: "GET",
        url: "/api/Destinos",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#editCiudadDestino")
                .empty()
                .append($("<option></option>")
                    .val("0")
                    .html("-Seleccione Destino-"));
            $.each(data, function (key, value) {
                var option = $(document.createElement('option'));
                option.html(value.Ciudad + "===>" + value.Pais);
                //option.val(key);
                option.val(value.DestinoID)
                $("#editCiudadDestino").append(option);
            });

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + " " + XMLHttpRequest.responseText);
        }
    })
}

function ajaxDestinos() {
    $.ajax({
        type: "GET",
        url: "../../api/Destinos",
        success: function (data) {
            $('#tableBody').empty();
            for (var i = 0; i < data.length; i++) {
                $('#tableBody').append('<tr><td>' + data[i].DestinoID
                    + '</td><td>' + data[i].Ciudad
                    + '</td><td>' + data[i].Pais
                    + '</td><td><input type="button" id="btnEditar" value="Edit" class="btn btn-success" onclick="editarRegistro(' + data[i].DestinoID + ')"/>'
                    + '</td><td><input type="button" id="btnBorrar" value="Delete" class="btn btn-danger" onclick="borrarRegistro(' + data[i].DestinoID + ')"/>'
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
                    + '</td><td><input type="button" id="btnEditar" value="Edit" class="btn btn-success" onclick="editarRegistro(' + data[i].ViajeroID + ')"/>'
                    + '</td><td><input type="button" id="btnBorrar" value="Delete" class="btn btn-danger" onclick="borrarRegistro(' + data[i].ViajeroID + ')"/>'
                    + '</td></tr>');

            }
        }
    })
}

function ajaxViaje() {
    comboViajero();
    comboDestino();
    $.ajax({
        type: "GET",
        url: "/api/Viajes",
        success: function (data) {
            $('#tableBody').empty();
            for (var i = 0; i < data.length; i++) {
                $('#tableBody').append('<tr><td>' + data[i].ViajeID
                    + '</td><td>' + data[i].Precio
                    + '</td><td>' + tratarFecha(data[i].Fecha_Viaje)
                    + '</td><td>' + data[i].Viajero.Nombre
                    + '</td><td>' + data[i].Viajero.dni
                    + '</td><td>' + data[i].Destino.Ciudad
                    + '</td><td><input type="button" id="btnEditar" class="btn btn-success" value="Edit" onclick="editarRegistro(' + data[i].ViajeID + ')"/>'
                    + '</td><td><input type="button" id="btnBorrar" class="btn btn-danger" value="Delete" onclick="borrarRegistro(' + data[i].ViajeID + ')"/>'
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
        case "Viaje":
            ajaxViaje();
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

        case "Viaje":
            $.ajax({
                type: "DELETE",
                url: "/api/Viajes/" + id,
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

function editarViaje(id) {
    $("#lista").css("display", "none");
    $.ajax({
        type: "GET",
        url: "/api/Viajes/" + id,
        success: function (data) {
            $('#editViajeID').val(data.ViajeID);
            $('#editPrecio').val(data.Precio);
            $('#editFecha_Viaje').val(tratarFecha(data.Fecha_Viaje));
            $('#editNombreViajero').val(data.ViajeroID)
            $('#editCiudadDestino').val(data.DestinoID);
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
        case "Viaje":
            editarViaje(id)
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

function CrearViaje(){
    var precio = $('#editPrecio').val();
    var fecha = $('#editFecha_Viaje').val().toString();
    var viajero = $('#editNombreViajero').val();
    var destino = $('#editCiudadDestino').val();

    var viaje = {
        Precio: precio,
        Fecha_Viaje: fecha,
        ViajeroID: viajero,
        DestinoID: destino
    };

    $.ajax({
        url: "/api/Viajes",
        type: "POST",
        data: JSON.stringify(viaje),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (request) {
            if (request == 200) {
                getData();
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + " " + XMLHttpRequest.responseText);
        }
    })
}

function GuardarViaje() {

    var id = $('#editViajeID').val();
    if (id == "" || id == undefined || id == null) {
        CrearViaje();
        return;
    }

    var precio = $('#editPrecio').val();
    var fecha = $('#editFecha_Viaje').val();
    var viajero = $('#editNombreViajero').val();
    var destino = $('#editCiudadDestino').val();

    var viaje = {
        ViajeID: id,
        Precio: precio,
        Fecha_Viaje: fecha,
        ViajeroID: viajero,
        DestinoID: destino
    };

    $.ajax({
        url: "/api/Viajes/" + id,
        type: "PUT",
        data: JSON.stringify(viaje),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (request) {
            if (request == 200) {
                getData();
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(textStatus + "=>" + XMLHttpRequest.responseText);
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
        case "Viaje":
            GuardarViaje()
            break;
        default:
    }

}