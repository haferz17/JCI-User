document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    fetchData()
}

function fetchData(reload) {
    const id = window.location.search.replace('?', '')
    $.ajax({
        url: `${getLaundryApi}/${id}`,
        type: 'GET',
        success: res => {
            if (res.status) {
                const data = res.data[0]
                console.log("data", data)
                $('#id').html(`Laundry #${data.id}`)
                $('#avatar').attr('src', data.user.avatar)
                $('#user').html(`${data.user.name}`)
                $('#phone').html(`${data.user.phone}`)
                $('#address').html(`${data.user.address}`)
                $('#date').html(`${data.created_at}`)
                $('#note').html(`${data.note}`)
            }
        }
    })
}