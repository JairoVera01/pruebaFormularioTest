$(document).ready(function () {
  var pasoActual = 1;
  var totalPasos = 5;

  function actualizarFormulario() {
    $(".step").removeClass("active");
    $(".step-" + pasoActual).addClass("active");
    $("#paso-actual").text(pasoActual);
    var porcentaje = ((pasoActual - 1) * 100) / (totalPasos - 1);
    $("#barra-progreso").css("width", porcentaje + "%");
  }

  function showToast() {
    var toast = new bootstrap.Toast(document.getElementById("toastValidacion"));
    toast.show();
  }

  function validarCampos() {
    var allValid = true;
    // $(".step-" + pasoActual)
    //   .find("input, select, textarea")
    //   .each(function () {
    //     if (!this.checkValidity()) {
    //       $(this).addClass("is-invalid");
    //       allValid = false;
    //     } else {
    //       $(this).removeClass("is-invalid");
    //     }
    //   });
    return allValid;
  }

  $(".siguiente").on("click", function () {
    if (pasoActual < totalPasos) {
      if (validarCampos()) {
        pasoActual++;
        actualizarFormulario();
      } else {
        showToast();
      }
    }
  });

  $(".anterior").on("click", function () {
    if (pasoActual > 1) {
      pasoActual--;
      actualizarFormulario();
    }
  });
});

// $(document).ready(function () {
//   $(".datepicker").datepicker({
//     // Opciones de personalización
//   });
// });
// document.addEventListener("DOMContentLoaded", function () {
//   var picker = new Pikaday({
//     field: document.getElementById("datepicker-pikaday"),
//     // Otras opciones de personalización
//   });
// });
document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#datepicker-flatpickr", {
    // Opciones de personalización
  });
});
