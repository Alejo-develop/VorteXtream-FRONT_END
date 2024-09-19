import Swal, { SweetAlertIcon } from "sweetalert2";
import './confirm.style.css';

const showConfirm = (icon: SweetAlertIcon, title: string, text: string) => {
  return Swal.fire({
    icon,
    title,
    text,
    confirmButtonText: "Yes",
    showCancelButton: true,
    cancelButtonText: "No",
    customClass: {
      title: "titleAlert",
      confirmButton: "confirmAlert",
      cancelButton: "cancelAlert",
      popup: "popupAlert",
    },
  });
};

export default showConfirm;
