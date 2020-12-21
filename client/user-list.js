const setEditModal = (userId) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/user/${userId}`, false);
    xhttp.send();

    const user = JSON.parse(xhttp.responseText);
        
    const {
        email, 
        first_name, 
        last_name,
        avatar
    } = user;

    
    document.getElementById('id').value = userId;
    document.getElementById('email').value = email;
    document.getElementById('first_name').value = first_name;
    document.getElementById('last_name').value = last_name;
    document.getElementById('avatar').src = avatar;
  
    // setting up the action url for the book
    document.getElementById('editForm').action = `http://localhost:3000/user/${userId}`;
}

const deleteUser = (id) => {
    const xhttp = new XMLHttpRequest();
   
    xhttp.open("DELETE", `http://localhost:3000/user/${id}`, false);
    xhttp.send();
    location.reload();  
}

const loadUsers = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/user", false);
    xhttp.send();

    const users = JSON.parse(xhttp.responseText);
        
    for (let user of users) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${user.id}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${user.email}</h6>

                        <div>FirstName: ${user.first_name}</div>
                        <div>LastName: ${user.last_name}</div>
                        <div><img src= '${user.avatar}'/></div>

                        <hr>

                        <button type="button" class="btn btn-danger" onClick="deleteUser(${user.id})">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal" 
                            data-target="#editUserModal" onClick="setEditModal(${user.id})">
                            Edit
                        </button>     
                      </div>
                </div>
            </div>
        `

        document.getElementById('users').innerHTML = document.getElementById('users').innerHTML + x;
    }
}

loadUsers();