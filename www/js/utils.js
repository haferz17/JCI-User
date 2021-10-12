const redirect = (path) => {
    path == 'back' ?
        window.history.back() :
        window.location.replace(path)
}

function getStatus(status) {
    let text = '', icon = ''
    switch (status) {
        case 'unconfirmed':
            text = 'Laundry Belum Dikonfirmasi';
            icon = '../img/unconfirmed.png'
            break;
        case 'confirmed':
            text = 'Laundry Dikonfirmasi';
            icon = '../img/confirmed.png'
            break;
        case 'canceled':
            text = 'Laundry Dibatalkan';
            icon = '../img/canceled.png'
            break;
        case 'pickup':
            text = 'Laundry Dalam Pengambilan';
            icon = '../img/pickup.png'
            break;
        case 'washing':
            text = 'Laundry Dicuci';
            icon = '../img/washing.png'
            break;
        case 'ironing':
            text = 'Laundry Disetrika';
            icon = '../img/ironing.png'
            break;
        case 'delivery':
            text = 'Laundry Dalam Pengantaran';
            icon = '../img/delivery.png'
            break;
        case 'done':
            text = 'Laundry Selesai';
            icon = '../img/done.png'
            break;
    }
    return { text, icon }
}