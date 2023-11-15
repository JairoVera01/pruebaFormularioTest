$(document).ready(function () {
  var pasoActual = 1;
  var totalPasos = 5;
  $("#tlfPaciente").on("input", function () {
    var numbers = $(this).val().replace(/\D/g, ""),
      char = { 0: "(", 3: ") ", 6: "-" };
    var newNumber = "";
    for (var i = 0; i < numbers.length; i++) {
      newNumber += (char[i] || "") + numbers[i];
    }
    $(this).val(newNumber.substring(0, 14));
  });

  function actualizarFormulario() {
    $(".step").removeClass("active");
    $(".step-" + pasoActual).addClass("active");
    $("#paso-actual").text(pasoActual);
    var porcentaje = ((pasoActual - 1) * 100) / (totalPasos - 1);
    $("#barra-progreso").css("width", porcentaje + "%");
  }

  function showToast(message) {
    var toastElement = document.getElementById("toastValidacion");
    var toastBody = toastElement.querySelector(".toast-body");
    toastBody.textContent = message; // Set the toast message
    var toast = new bootstrap.Toast(toastElement);
    toast.show();
  }

  function validarTelefono(telefono) {
    var regex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return regex.test(telefono);
  }

  function validarCampos() {
    var allValid = true;
    $(".step-" + pasoActual)
      .find("input, select, textarea")
      .each(function () {
        // Validar email si el campo es de tipo email y no está vacío
        if (
          this.type === "email" &&
          this.value !== "" &&
          !validarEmail(this.value)
        ) {
          $(this).addClass("is-invalid");
          showToast("Por favor, ingresa un correo electrónico válido.");
          allValid = false;
        }
        // Validar teléfono si el campo es el de teléfono y no está vacío
        else if (
          this.id === "tlfPaciente" &&
          this.value !== "" &&
          !validarTelefono(this.value)
        ) {
          $(this).addClass("is-invalid");
          showToast(
            "Por favor, ingresa un número de teléfono válido en el formato (787) 555-1234."
          );
          allValid = false;
        }
        // Validar otros campos con checkValidity
        else if (!this.checkValidity()) {
          $(this).addClass("is-invalid");
          allValid = false;
        } else {
          $(this).removeClass("is-invalid");
        }
      });
    return allValid;
  }

  $(".siguiente").on("click", function () {
    if (pasoActual < totalPasos) {
      if (validarCampos()) {
        pasoActual++;
        actualizarFormulario();
      } else {
        // showToast() ya es llamado dentro de validarCampos() si hay un error
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

// Función para validar el formato del correo electrónico
function validarEmail(email) {
  var regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(email);
}

// Inicialización de Flatpickr
document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#datepicker-flatpickr", {
    // Opciones de personalización
  });
});
