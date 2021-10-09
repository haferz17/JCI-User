document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() {
    const user = JSON.parse(localStorage.getItem('user'))
    $('#name').html(`${user.name}`)
    $('#phone').html(`${user.phone}`)
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


function request() {
    const { id } = JSON.parse(localStorage.getItem('user'))
    var note = $("input#note").val()

    $.ajax({
        url: getLaundryApi,
        type: 'POST',
        data: { id_user: id, note },
        success: res => {
            console.log("res", res)
            if (res.status) {
                window.location.href = 'activities.html'
                alert('Request Successfully')
            }
        }
    })
}