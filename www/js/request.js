document.addEventListener('deviceready', onDeviceReady, false)
const user = JSON.parse(localStorage.getItem('user'))

function onDeviceReady() {
    localStorage.setItem('weight', '1')
    localStorage.setItem('imgLaundry', '')
    $('#weight').html(1)
    $('#price').html('Rp 15.000')
    $('#total').html('Rp 15.000')
    $('#user').html(`${user.name} ${user.phone ? `| ${user.phone}` : ''}`)
    $('#address').html(`${user.address}`)
}

function openCamera() {
    navigator.camera.getPicture((res) => {
        $('#result').attr('src', 'data:image/png;base64, ' + res)
        localStorage.setItem('imgLaundry', `data:image/png;base64, ${res}`)
        $('#placeholder').html(``)
    }, (e) => {
    }, {
        quality: 10,
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
    if (user.phone && user.address) {
        const weight = parseInt(localStorage.getItem('weight'))
        const note = $("input#note").val()
        const image = localStorage.getItem('imgLaundry') || ''

        $.ajax({
            url: getLaundryApi,
            type: 'POST',
            data: { id_user: user.id, note, weight, image },
            success: res => {
                if (res.status) {
                    toast('Request Successfully')
                    redirect('back')
                }
            }
        })
    } else toast('Phone and address cannot be empty. Please update your profile first.')
}