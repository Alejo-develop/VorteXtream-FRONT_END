import Swal, { SweetAlertIcon } from "sweetalert2";
import '../style.css'

const useAlert = () => {
    const showAlert = (icon: SweetAlertIcon, title: string, text: string) => {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            background: "#2F3241", 
            color: 'white',
            customClass: {
                popup: 'custom-popup',
                icon: 'custom-icon',
                confirmButton: 'custom-button' 
            },
            buttonsStyling: false
        });
    };

    return { showAlert };
};

export default useAlert;
