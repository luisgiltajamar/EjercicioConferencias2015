var dibujarCanvas=function() {
    var canvas = document.getElementById("disposicion");
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.strokeStyle = "blue";
    var radio = 30;
    var pos = 40;
    for (var i = 1; i < 11; i++) {
        ctx.arc(pos * i, 100, 30, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
    }



}
dibujarCanvas();