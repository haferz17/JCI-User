document.addEventListener('deviceready', onDeviceReady, false);
const { name, id } = JSON.parse(localStorage.getItem('user'))

function onDeviceReady() {
    $('#name').html(`Hi ${name}`)
    fetchData()
    fetchArticle()
}

function fetchData(reload) {
    $.ajax({
        url: getLaundryApi,
        type: 'POST',
        data: { filter: 4, id_user: id },
        success: res => {
            if (res.status) {
                renderOngoing(res.data.slice(0, 1))
                reload && window.location.reload()
            }
        }
    })
}

function fetchArticle() {
    $.ajax({
        url: getArticleApi,
        type: 'GET',
        data: { pageSize: 3 },
        success: res => {
            if (res.status == 'ok') {
                renderArticle(res.articles)
            }
        }
    })
}

function renderOngoing(data) {
    let html = ''
    data.map(item => {
        html = html + `
        <div class="relative">
            <a href="detail.html?${item.id}" class="bg-white py-3 px-1 border rounded-md flex items-center mt-2 mb-2">
                <img src="${getStatus(item.status).icon}" class="w-16 mx-2" />
                <div class="px-1.5 w-full flex justify-between">
                    <div>
                        <p class="text-sm font-bold ${item.status == 'unconfirmed' ? '-mt-6' : ''}">Laundry #${item.id}</p>
                        <p class="text-xs text-gray-500 my-0.5">${getStatus(item.status).text}</p>
                        <p class="text-xs font-bold text-blue-500">${item.admin?.name ? `PIC. ${item.admin?.name}` : ''}</p>
                    </div>
                    <div class="text-right ${item.status == 'unconfirmed' ? '-mt-6' : ''}">
                        <p class="text-xs text-gray-500 mt-0.5">${moment(item.created_at).format('MMM DD')}</p>
                    </div>
                </div>
            </a>
            ${item.status == 'unconfirmed' ? `<button onClick="cancel('${item.id}')" class="absolute bottom-2.5 left-16 ml-7 bg-red-100 py-0.5 px-2 rounded-md mr-2 text-sm">
                <p class="capitalize">Cancel</p>
            </button>` : ''}
        </div>
        `
    })
    html = $.parseHTML(html)
    $("#ongoing").append(html)
}

function renderArticle(data) {
    let html = ''
    data.map(item => {
        html = html + `
        <div class="bg-white py-3 flex items-center border-b">
            <img src="${item.urlToImage}" class="w-16 h-16 rounded-md" />
            <div class="px-3 w-full">
                <p class="text-sm font-bold line-2 mb-1">${item.title}</p>
                <p class="text-xs text-primary">${item.source?.name}</p>
            </div>
        </div>
        `
    })
    html = $.parseHTML(html)
    $("#article").append(html)
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