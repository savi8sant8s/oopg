import Swal from 'sweetalert2';

export default function presentAlert(title, text, icon = "info", timer = 2000){
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        timer: timer
    });
}