import Swal from 'sweetalert2';

/**
 * Cria alerta padrão com 2500ms de duração e ícone de info.
 */
export default function mostrarAlerta(title, text, icon = "info", timer = 2500) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        timer: timer
    });
};