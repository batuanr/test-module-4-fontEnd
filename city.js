getAllCity()
getNation('nation')

function getAllCity(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/city/list",
        success:function (data){
            let content ='';
            for (let i = 0; i < data.content.length; i++) {
                content += getCity(data.content[i])
            }
            document.getElementById('city').innerHTML = content;
        }
    })
}

function getCity(city){
    return `<tr><td><span onclick="viewCity(this)" id="${city.id}">${city.name}</span></td>`+
        `<td>${city.nation.name}</td>`+
        `<td>`+
        `<a href="#editCity" class="edit" onclick="editForm(this)"  id="${city.id}" data-toggle="modal">`+
        `<i class="material-icons"  data-toggle="tooltip" title="Edit">&#xE254;</i>`+
        `</a>`+
        `<a href="#deleteCity" onclick="getFormDelete(this)" class="delete" id="${city.id}" data-toggle="modal">`+
        `<i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>`+
        `</a>`+
        `</td></tr>`;
}
function getNation(id, nationID){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/nation/list",
        success: function (data){
            let content = '';
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === nationID){
                    content += `<option selected value="${data[i].id}" >${data[i].name}</option>`
                }
                else {
                    content += `<option value="${data[i].id}" >${data[i].name}</option>`
                }
            }
            document.getElementById(id).innerHTML = content;
        }
    })
}
function createCity(){
    let name = $('#name').val();
    let nation = $('#nation').val();
    let population = $('#population').val();
    let GDP = $('#GDP').val();
    let area = $('#area').val();
    let description = $('#description').val();
    let city = {
        name:name,
        nation: {id: nation},
        population: population,
        GDP: GDP,
        area: area,
        description: description
    }
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/city/create",
        data:JSON.stringify(city),
        headers:{
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        success: getAllCity
    })
    event.defaultPrevented
}
function getFormDelete(a){
    let id = a.getAttribute("id");
    let content = `<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">`+
        `<input type="submit" href="` +id+ `" onclick="deleteCustomer(this)" class="btn btn-danger" value="Delete">`
    document.getElementById('delete').innerHTML = content;
}
function deleteCustomer(a){
    let id = a.getAttribute("href");
    $.ajax({
        type:"DELETE",
        url:'http://localhost:8080/city/delete/' + id,
        success:getAllCity

    })
    $('#deleteCity').modal('hide');
    event.preventDefault();
}
function editForm(a){
    let id = a.getAttribute("id");
    $.ajax({
        async:false,
        type:"GET",
        url: 'http://localhost:8080/city/findOne/'+ id,
        success:function (data){
            getNation('nation2', data.nation.id);
            document.getElementById('editName').innerHTML = `<label>Name</label>`+
            `<input type="text" id="name2" value="${data.name}" class="form-control" required>`
            let content =
                `<input type="text" value="${data.id}" class="form-control" required id="id">`+
                `<div class="form-group">
                    <label>Population</label>
                    <input id="population2" value="${data.population}" min="1" type="number" class="form-control" required>
                </div>
            <div class="form-group">
                <label>GDP</label>
                <input id="GDP2" value="${data.gdp}" min="1"  type="number" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Area</label>
                <input id="area2" value="${data.area}" min="1" type="number" class="form-control" required>
            </div>`

            document.getElementById('description2').defaultValue = data.description;
            document.getElementById('mid').innerHTML= content;

        },

    })

}
function edit(){
    let id = $('#id').val();
    let name = $('#name2').val();
    let nation = $('#nation2').val();
    let population = $('#population2').val();
    let GDP = $('#GDP2').val();
    let area = $('#area2').val();
    let description = $('#description2').val();
    let city = {
        id: id,
        name:name,
        nation: {id: nation},
        population: population,
        GDP: GDP,
        area: area,
        description: description
    }
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/city/edit/" + id,
        data:JSON.stringify(city),
        headers:{
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        success: getAllCity
    })
    $('#editCity').modal('hide');
    event.defaultPrevented
}
function viewCity(a){
    let id = a.getAttribute("id");
    $.ajax({
        type:"GET",
        url: 'http://localhost:8080/city/findOne/'+ id,
        success:function (data){
            let content = `<h1>sfdgfdgfd</h1>`

            document.getElementById('descriptionView').defaultValue = data.description;
            document.getElementById('mid').innerHTML= content;

        },

    })
}