document.addEventListener('deviceready', onDeviceReady, false)

const { id } = JSON.parse(localStorage.getItem('user'))

function onDeviceReady() {
    fetchData()
}

function fetchData(reload) {
    $.ajax({
        url: getLaundryApi,
        type: 'POST',
        data: { filter: 3, id_user: id },
        success: res => {
            if (res.status) {
                renderList(res.data)
                reload && window.location.reload()
            }
        }
    })
}

function renderList(data) {
    let html = ''
    data.map(item => {
        html = html + `
        <div class="flex items-center justify-between border-b-2 border-white w-full bg-blue-50">
            <a href="detail.html?${item.id}" class="cursor-pointer w-full bg-blue-50 py-2 px-2 flex items-center justify-between border-b border-white">
                <div>
                    <p>Laundry #${item.id}</p>
                    <p class="capitalize text-sm text-blue-500">status: ${item.status}</p>
                </div>
            </a>
            ${item.status == 'unconfirmed' ? `<button onClick="cancel('${item.id}')" class="bg-red-100 py-1 px-2 rounded-md mr-2">
                <p class="capitalize">Cancel</p>
            </button>`: ''}
        </div>
        `
    })
    html = $.parseHTML(html)
    $("#list").append(html)
}

function cancel(idLaundry) {
    $.ajax({
        url: `${getLaundryApi}/${idLaundry}`,
        type: 'POST',
        data: { status: 'canceled' },
        success: res => {
            if (res.status) {
                fetchData('reload')
                alert('Succesfully cancel laundry')
            }
        }
    })
}