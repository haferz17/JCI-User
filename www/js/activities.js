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
    data.map((item, index) => {
        const ongoing0 = data[0].status !== 'done' && data[0].status !== 'canceled'
        html = html + `
        ${index == 0 && item.status !== 'done' && item.status !== 'canceled' ? '<p>Ongoing</p>' : index == 0 ? '<p>Recent</p>' : ''}
        ${index == 1 && item.status !== 'unconfirmed' ? ongoing0 ? '<p>Recent</p>' : '' : ''}
        <a href="detail.html" class="bg-${index !== 0 ? 'gray-50' : ongoing0 ? 'white' : 'gray-50'} py-2.5 px-1 border rounded-md flex items-center mt-${index == 0 || index == 1 ? '2' : '0'} mb-${index == data.length - 1 ? '14' : '2'}">
            <img src="${getStatus(item.status).icon}" class="w-16 mx-2" />
            <div class="px-1.5 w-full flex justify-between">
                <div>
                    <p class="text-sm font-bold">Laundry #${item.id}</p>
                    <p class="text-xs text-gray-500 my-0.5">${getStatus(item.status).text}</p>
                    <p class="text-xs font-bold text-blue-500">${item.admin?.name ? `PIC. ${item.admin?.name}` : ''}</p>
                    ${item.status == 'unconfirmed' ? `<button onClick="cancel('${item.id}')" class="bg-red-100 py-0.5 px-2 rounded-md mr-2 text-sm">
                        <p class="capitalize">Cancel</p>
                    </button>` : ''}
                </div>
                <div class="text-right">
                    <p class="text-xs text-gray-500 mt-0.5">${moment(item.created_at).format('MMM DD')}</p>
                </div>
            </div>
        </a>
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