import Swal from 'sweetalert2';

export default function mostrarAlerta(title, text, icon = "info", timer = 2500) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        timer: timer
    });
};