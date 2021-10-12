document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() {
    localStorage.setItem('weight', '1')
    $('#weight').html(1)
    $('#price').html('Rp 15.000')
    $('#total').html('Rp 15.000')
    const user = JSON.parse(localStorage.getItem('user'))
    $('#user').html(`${user.name} ${user.phone ? `| ${user.phone}` : ''}`)
    $('#address').html(`${user.address}`)
}

function openCamera() {
    navigator.camera.getPicture((res) => {
        $('#result').attr('src', 'data:image/png;base64, ' + res)
        document.getElementById('result').setAttribute('src', 'data:image/png;base64, ' + s)
    }, (e) => {
    }, {
        quality: 60,
        cameraDirection: 1,
        destinationType: 0,
        correctOrientation: true
    })
}

function changeWeight(type) {
    let weight = parseInt(localStorage.getItem('weight'))
    if (type == '+') weight += 1
    else { if (weight - 1 > 0) weight -= 1 }
    localStorage.setItem('weight', weight)
    $('#weight').html(weight)
    $('#price').html(`Rp ${15 * weight}.000`)
    $('#total').html(`Rp ${15 * weight}.000`)
}

function request() {
    const { id } = JSON.parse(localStorage.getItem('user'))
    const weight = parseInt(localStorage.getItem('weight'))
    const note = $("input#note").val()

    $.ajax({
        url: getLaundryApi,
        type: 'POST',
        data: { id_user: id, note, weight },
        success: res => {
            if (res.status) {
                alert('Request Successfully')
                redirect('back')
            }
        }
    })
}