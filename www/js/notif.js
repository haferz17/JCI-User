document.addEventListener('deviceready', onDeviceReady, false)

const { id } = JSON.parse(localStorage.getItem('user'))

function onDeviceReady() {
    fetchData()
}

function fetchData() {
    $.ajax({
        url: getNotifApi,
        type: 'POST',
        data: { id },
        success: res => {
            if (res.status) renderList(res.data)
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
                    <p>${item.title}</p>
                    <p class="text-sm text-blue-500">${item.description}</p>
                    <p class="capitalize text-sm text-gray-600">${item.created_at}</p>
                </div>
            </a>
        </div>
        `
    })
    html = $.parseHTML(html)
    $("#list").append(html)
}
