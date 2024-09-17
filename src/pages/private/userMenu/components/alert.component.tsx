import Swal, { SweetAlertIcon } from "sweetalert2";

const useAlert = () => {
    const showAlert = (icon: SweetAlertIcon, title: string, text: string) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
        });
    };

    return { showAlert };
};

export default useAlert;
