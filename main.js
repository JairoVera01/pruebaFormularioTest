$(document).ready(function () {
  var pasoActual = 1;
  var totalPasos = 5;

  $(".siguiente").on("click", function () {
    if (pasoActual < totalPasos) {
      pasoActual++;
      actualizarFormulario();
    }
  });

  $(".anterior").on("click", function () {
    if (pasoActual > 1) {
      pasoActual--;
      actualizarFormulario();
    }
  });

  function actualizarFormulario() {
    $(".step").removeClass("active");
    $(".step-" + pasoActual).addClass("active");
    $("#paso-actual").text(pasoActual);
    var porcentaje = ((pasoActual - 1) * 100) / (totalPasos - 1);
    $("#barra-progreso").css("width", porcentaje + "%");
  }
});
