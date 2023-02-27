import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

// Toast.fire({
//   icon: "success",
//   title: "Signed in successfully",
// });

export const menssageErrorForm = (errorCode) => {
  if (errorCode == "auth/internal-error") {
    Toast.fire({
      icon: "error",
      title: "Datos incorrectos",
    });
  }
  if (errorCode == "auth/invalid-email") {
    Toast.fire({
      icon: "error",
      title: "Email incorrecto",
    });
  }
  if (errorCode == "auth/user-not-found") {
    Toast.fire({
      icon: "error",
      title: "Usuario no registrado",
    });
  }
  if (errorCode == "auth/wrong-password") {
    Toast.fire({
      icon: "error",
      title: "Contraseña incorrecta",
    });
  }
  if (errorCode == "auth/email-already-in-use") {
    Toast.fire({
      icon: "error",
      title: "El usuario ya esta en uso",
    });
  }
  if (errorCode == "auth/weak-password") {
    Toast.fire({
      icon: "error",
      title: "La contraseña debe tener al menos 6 caracteres",
    });
  }
}