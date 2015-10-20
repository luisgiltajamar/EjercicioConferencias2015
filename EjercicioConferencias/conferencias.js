var urlbase =
    "https://alumnoscurso.azure-mobile.net/Tables/conferencias";
var token = "OBGhhcqYAcsixUTbTNhQNUUKdizkcE97";

var cargarDatos=function(datos, seleccionado) {

    var lista;
    if (seleccionado)
        lista = document.getElementById("seleccionadas");
    else
        lista = document.getElementById("disponibles");


    for (var i = 0; i < datos.length; i++) {
        var nodo = document.createElement("li");
        nodo.setAttribute("id", datos[i].id);
        nodo.setAttribute("draggable", "true");
        nodo.ondragstart = drag;
        var texto = document.createTextNode(datos[i].nombre);
        nodo.appendChild(texto);
        lista.appendChild(nodo);
    }


}

var cargarConferencias = function (tipo) {
    var url = urlbase + "?$filter=seleccionada eq " + tipo;

    $.ajax({
        type: "GET",
        url: url,
        headers: {
            "X-ZUMO-APPLICATION":token
        },
        dataType: "json",
        success: function(res) {
            cargarDatos(res, tipo);
        },
        error: function() {
            alert("Error");
        }
    });


}
var allowDrop=function(evt) {
    evt.preventDefault();
}
var drag=function(evt) {
    evt.dataTransfer.setData("elemento", evt.target.id);
}
var drop=function(evt) {
    evt.preventDefault();
    var data = evt.dataTransfer.getData("elemento");
    evt.target.parentNode.appendChild(document.getElementById(data));
}

var crearDatosGuardar=function() {
    var elem = $("#seleccionadas li");
    var total = [];
    for (var i = 0; i < elem.length; i++) {
        var obj = {
            id: elem[i].id,
            nombre: elem[i].innerText,
            seleccionada: true
        };
        total.push(obj);
    }
    var elem2 = $("#disponibles li");
    for (var i = 0; i < elem2.length; i++) {
        var obj = {
            id: elem2[i].id,
            nombre: elem2[i].innerText,
            seleccionada: false
        };
        total.push(obj);
    }
    guardar(total);

}


var guardar=function(items) {
    
    for (var i = 0; i < items.length; i++) {

        $.ajax({
            url: urlbase + "/" + items[i].id,
            data: JSON.stringify(items[i]),
            dataType: "json",
            headers: {
                "Content-Type": "application/json",
                "X-ZUMO-APPLICATION": token
            },
            type: "PATCH",
            error: function() {
                alert("Fallo");
            }
        });


    }




}
document.getElementById("disponibles").ondrop = drop;
document.getElementById("seleccionadas").ondrop = drop;
document.getElementById("disponibles").ondragover = allowDrop;
document.getElementById("seleccionadas").ondragover = allowDrop;
document.getElementById("btnSave").onclick = crearDatosGuardar;
cargarConferencias(true);
cargarConferencias(false);