function getData() {
    $("#lista").css("display", "");//show
    $('#editado').css("display", "none");

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

$(function () {
    getData();
});


function borrarRegistro(id) {
    $.ajax({
        type: "DELETE",
        url: "/api/Destinos/" + id,
        success: function () {
            getData();
        }
    })
}
function editarRegistro(id) {
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

function Guardar() {
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