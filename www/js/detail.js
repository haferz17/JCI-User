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
                renderDetail(res.data[0])
            }
        }
    })
}

function renderDetail(data) {
    const next = getStatus(data.status).next
    let html = `
    <div class="${getStatus(data.status).bg} min-h-screen text-black relative">
        <div class="px-5 pt-3">
            <button onclick="redirect('back')">
                <i class="bi-chevron-left text-xl -ml-0.5"></i>
            </button>
            <div class="flex justify-center">
                <img src="${getStatus(data.status).ill}" class="h-screen-30 my-5" />
            </div>
        </div>
        <div class="bg-gradient-to-b from-transparent ${getStatus(data.status).to} h-10 -mb-5"></div>
        <div class="px-5 rounded-tl-3xl rounded-tr-3xl bg-white h-screen-56 overflow-y-auto scrollbar-hidden">
        <div class="h-5 w-full fixed bg-white rounded-tl-3xl rounded-tr-3xl left-0"></div>    
        <div class="flex mt-5 items-center justify-between mb-2">
                <p class="text-lg text-primary font-bold">Laundry #${data.id}</p>
                <p class="text-sm text-gray-500">${moment(data.created_at).format('ll')}</p>
            </div>
            <div class="bg-white border shadow-md rounded-md mb-3 py-2 flex items-center justify-around">
                <div class="w-${next ? '1/2' : 'full'} flex justify-${next ? 'center' : 'start'}">
                    <div class="flex items-center mt-1">
                        <img src="${getStatus(data.status).icon}" class="w-11 h-11 ${next ? '' : 'ml-3'}" />
                        <div class="ml-2">
                            <p class="font-bold text-sm text-green-500">Current Status</p>
                            <p class="capitalize -mt-0.5">${data.status}</p>
                        </div>
                    </div>
                </div>
                ${next ? `<i class="bi-arrow-right text-2xl text-red-500"></i>
                <div class="w-1/2 flex justify-center">
                    <div class="flex items-center mt-1">
                        <img src="${getStatus(data.status).nextIcon}" class="w-11 h-11" />
                        <div class="ml-2">
                            <p class="font-bold text-sm text-yellow-500">Next Status</p>
                            <p class="capitalize -mt-0.5">${next}</p>
                        </div>
                    </div>
                </div>`: ''}
            </div>
            ${data.admin?.name ? `<div class="bg-white border shadow-md rounded-md mb-3 px-3 py-2">
                <div class="flex items-center">
                    <div class="w-12 h-12 rounded-full border mr-2">
                        <img src="${data.user.avatar}" class="w-full rounded-full object-contain" />
                    </div>
                    <div>
                        <div class="flex items-center">
                            <p class="font-bold">${data.user.name}</p>
                            <p class="text-xs ml-2 mr-1">4.7</p>
                            <i class="bi-star-fill text-sm text-yellow-500 mb-0.5"></i>
                        </div>
                        <p class="text-xs">JCI Staff</p>
                    </div>
                </div>
            </div>`: ''}  
            <div class="flex items-center justify-center -ml-10">
                <img src="../img/laundry2.jpg" class="w-1/3" />
                <div class="flex flex-col ml-3">
                    <p class="mt-0.5 text-xl">JCI Laundry</p>
                    <p class="">${data.weight} KG</p>
                    <p class="-mt-0.5 mb-1 text-lg text-red-500 font-bold">Rp ${data.weight * 15}.000</p>
                </div>
            </div> 
            <div class="flex items-center">
                <i class="bi-geo-alt text-lg text-red-500"></i>
                <p class="ml-2">Pick up & Delivery Address</p>
            </div>
            <div class="bg-white border shadow-md rounded-md px-3 py-2 mb-3 mt-0.5">
                <p class="text-sm">${data.user.name} | ${data.user.phone}</p>
                <p class="text-sm">${data.user.address}</p>
            </div>
            ${data.note || data.image ? `<div class="flex items-center">
                <i class="bi-bookmark-plus text-lg text-green-500"></i>
                <p class="ml-2">Additional Information</p>
            </div>
            <div class="bg-white border shadow-md rounded-md px-3 py-2 mb-5 mt-0.5">
                ${data.image ? `<div class="w-full flex flex-col items-center my-3">
                    <div class="bg-gray-100 rounded-md w-1/2">
                        <img src="${data.image}" class="w-full" />
                    </div>
                </div>`: ''}
                <p class="text-yellow-500">Note</p>
                <p class="text-sm">${data.note}</p>
            </div>`: '<div class="mb-5"/>'}
        </div>
        </div>
        </div>
    `
    html = $.parseHTML(html)
    $("#head").append(html)
}