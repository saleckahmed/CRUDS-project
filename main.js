let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

// step 1 calcule totale
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#037003';
    }else{
        total.innerHTML = "" ;
        total.style.background = '#770b0b';
    }
}


// step 2 create new product and save it
let dataPro;
if( localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
    // we use JSON.parse to bring our array from the localStorage as array not string
}else{
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if((title.value != '') 
        && (price.value != '')  
        && (count.value <= 100 ) 
        && (category.value != '') ){
        if(mood === 'create'){
            // step 7 creat the number of product count
            if(newPro.count > 1){
                for(let i = 0; i < newPro.count; i++){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }
        }else{
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block'
        }
        clearData()
    }
    
    


    // we use push to add object to the end of array
    localStorage.setItem('product', JSON.stringify(dataPro));
    // we use JSON.stringify to idenify the our array to the localstorage
    showData()
}


// step 3 clear data from input after create
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// step 4 read data or show it inside the table
function showData(){
    getTotal();
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">updae</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
    }
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = table;

    // step 6 delete all product
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML =`<button onclick="deleteAll()">Delete all (${dataPro.length})</button>`
    }else{
        btnDelete.innerHTML = ''
    }

}

showData();

// step 5 delete one product at time
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}


// step 6 delete all product
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

// step 8 update or change product info
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}


// step 9 search for product
let searchMood = 'title';
function getSearchMoood(id){
    
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
    }else{
        searchMood = 'category'
    }
    search.placeholder = 'search By '+searchMood;
    search.focus();
    search.value = '';
    showData()
}

function searchData(value){
    let table = '';
    if(searchMood == 'title'){
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">updae</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `;            
            }
        }
    }else{
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">updae</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `;            
            }
        }
    }
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = table;
}