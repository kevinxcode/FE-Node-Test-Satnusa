
import Swal from "sweetalert2";

const showSweetAlert = (title, icon) => {
  Swal.fire({
    title: title || "Custom Alert!",
    text: false,
    icon: icon || "success",
    confirmButtonText: "OK",
    customClass: {
      confirmButton: "bg-blue-500 hover:bg-blue-600",
      title: "text-yellow-500",
    },
    allowOutsideClick: false, 
    timer: 2550,
    showConfirmButton: false, 
  });
};

const showLoadingSweetAlert = () => {
  Swal.fire({
    title: "Loading...",
    html: false,
    icon: false,
    allowOutsideClick: false,
    showCancelButton: false,
    cancelButtonText: "Cancel",
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
      
    },
  });
};
const closeLoadingSweetAlert = () => {
  Swal.close();
};

export { showSweetAlert, showLoadingSweetAlert, closeLoadingSweetAlert };
