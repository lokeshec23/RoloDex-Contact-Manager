//Get value
var selectRow = null;
var selectError = 1;
const main = document.querySelector("#main");
let firstName = document.querySelector("#first_name");
let lastName = document.querySelector("#last_name");
let phoneNumber = document.querySelector("#phone_number");
const saveBtn = document.querySelector("#save_btn");
const resetBtn = document.querySelector("#reset_btn");
const editBtn = document.querySelector(".edit_btn");
const deleteBtn = document.querySelector(".delete_btn");
const tableBody = document.querySelector("#contact_list");
const form = document.querySelector("#contact_form");
const table = document.querySelector("#storeList");
// console.dir(table);
const loaderContainer = document.querySelector(".loader-container")
// create element and read an element
function createElement()
{ 
   loader();
    if(selectRow == null){
    const newTableRow = document.createElement("tr");
    const newTableDataFirstName = document.createElement("td");
    const newTableDateLastName = document.createElement("td");
    const newTableDatePhoneNumber = document.createElement("td");
    const newTableDataBtn = document.createElement("td");
    const newEditBtn = document.createElement("button");
    const newDeleteBtn = document.createElement("button");
    newTableDataFirstName.append(firstName.value);
    newTableDateLastName.append(lastName.value);
    newTableDatePhoneNumber.append(phoneNumber.value);
    newEditBtn.textContent = "Edit";
    newDeleteBtn.textContent = "Delete";
    newEditBtn.setAttribute('onclick', 'onEdit(this)');
    newEditBtn.classList = "btn btn-warning edit_btn btn-sm me-2 edit";
    newDeleteBtn.classList = "btn btn-danger delete_btn btn-sm delete";
    newTableDataBtn.append(newEditBtn, newDeleteBtn);
    newTableRow.append(
    newTableDataFirstName,
    newTableDateLastName,
    newTableDatePhoneNumber,
    newTableDataBtn
    );
    tableBody.append(newTableRow);
    alertFunction("✅ contact Added!", "success");
    resetInput();
    }
    else{
      
        updateRecord();
        saveBtn.innerText = "save";
        resetInput();
    }
}

function onEdit(td){
    selectRow = td.parentElement.parentElement;
    firstName.value = selectRow.cells[0].innerHTML;
    lastName.value = selectRow.cells[1].innerHTML;
    phoneNumber.value = selectRow.cells[2].innerHTML;
    saveBtn.innerText="update"
}

// update an element
function updateRecord(){
    selectRow.cells[0].innerHTML = firstName.value;
    selectRow.cells[1].innerHTML = lastName.value;
    selectRow.cells[2].innerHTML = phoneNumber.value;
    selectRow = null;
    alertFunction("✅ contact Updated Successfully!","info");
}


form.addEventListener('submit', (e)=>{
  e.preventDefault();
  validation(e);
})

//validation
function validation(e) {
  if(firstName.value.trim() === '' || !(/^[A-Za-z]+$/.test(firstName.value))){
    alertFunction(`⚠️ Please enter only alphabetic characters in first name`, "warning");
    firstName.focus();
  }else if(lastName.value.trim() === '' || !(/^[A-Za-z]+$/.test(lastName.value))){
    alertFunction(`⚠️ Please enter only alphabetic characters in last name`, "warning");
    lastName.focus();
  }else if(phoneNumber.value.trim() === "" || !(/^\d{10}$/.test(phoneNumber.value))){
    alertFunction(`⚠️ Phone number must be exactly ten digits long.`,"warning") ;
    phoneNumber.focus();
  }else{
      createElement()
  }
}

//warning function

function alertFunction(message, className) {
  if(selectError == 1){
    selectError = 0;
    const div = document.createElement("div");
    div.className = `alert alert-${className} container mt-2 p-2`;
    div.appendChild(document.createTextNode(`${message}`));
    main.prepend(div);
    setTimeout(() => {
      selectError = 1;
      document.querySelector(".alert").remove();
    }, 2000);
  }
}


// delete an element
tableBody.addEventListener("click", (event) => {
  target = event.target;
  if (target.classList.contains("delete")) {
    const confirmation = confirm(
      "Are you sure you want to delete this contact?"
    );
    selectRow = null;
    if (confirmation) {
      target.parentElement.parentElement.remove();
      alertFunction("❌ Conatct Deleted!", "danger");
      resetInput();
       loader();
      saveBtn.innerText = "save"
    } else {
      alertFunction("Deletion cancelled!", "success");
      resetInput();
       loader();
      saveBtn.innerText = "save";
    }
  }
});

// reset function
function resetInput() {
  firstName.value = "";
  lastName.value = "";
  phoneNumber.value = "";
}

// reset input box
resetBtn.addEventListener("click", () => {resetInput();});

function loader(){
  table.style.opacity = 0.2;
  const createloader = loaderContainer.children[0];
  createloader.className = "loader";
  setTimeout(() => {
    table.style.opacity = 1;
    createloader.classList.remove("loader");
  }, 1000);}
