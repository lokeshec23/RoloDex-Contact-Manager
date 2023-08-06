//Get value
var selectRow = null;
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

//validation
function validation() {
  if (firstName.value.trim() === "" || lastName.value.trim() === "") {
    alertFunction("⚠️Please enter your name", "warning");
    exit();
  }
  if (phoneNumber.value.trim() === "") {
    alertFunction(`⚠️Please enter valid phone number`, "warning");
    phoneNumber.value = "";
    phoneNumber.focus();
    exit();
  }
}

//warning function
function alertFunction(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className} container mt-2 p-2`;
  div.appendChild(document.createTextNode(`${message}`));
  main.prepend(div);
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 2000);
}

// delete an element
tableBody.addEventListener("click", (event) => {
  target = event.target;
  if (target.classList.contains("delete")) {
    const confirmation = confirm(
      "Are you sure you want to delete this contact?"
    );
    if (confirmation) {
      target.parentElement.parentElement.remove();
      alertFunction("❌ Conatct Deleted!", "danger");
    } else {
      alertFunction("Deletion cancelled!", "success");
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
resetBtn.addEventListener("click", () => {
  resetInput();
});

// create element and read an element
// const tableBody = document.querySelector("tbody");
saveBtn.addEventListener("click", () => {
    if(selectRow == null){
  validation();
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
});

function onEdit(td){
    selectRow = td.parentElement.parentElement;
    document.getElementById('first_name').value = selectRow.cells[0].innerHTML;
    document.getElementById('last_name').value = selectRow.cells[1].innerHTML;
    document.getElementById('phone_number').value = selectRow.cells[2].innerHTML;
    saveBtn.innerText="Update"
}


function updateRecord(){
    selectRow.cells[0].innerHTML = firstName.value;
    selectRow.cells[1].innerHTML = lastName.value;
    selectRow.cells[2].innerHTML = phoneNumber.value;
    alertFunction("✅ contact Updated Successfully!","info");
}