console.log("it is ready to render ");
showNotes(); // checks the task added previously

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let addTime = document.getElementById("addTime");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
    notesObj.push([addTitle.value, addTime.value, addTxt.value]);
    localStorage.setItem("notes", JSON.stringify(notesObj)); // it save the items in the local storage in json formate
  } else {
    notesObj = JSON.parse(notes);
    notesObj.push([addTitle.value, addTime.value, addTxt.value]);
    localStorage.setItem("notes", JSON.stringify(notesObj));
  }
  addTxt.value = "";
  addTitle.value = "";
  addTime.value = "";

  console.log(notesObj);
  showNotes();
});

  // it show the notes also which is not deleted previously 
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = '';
  notesObj.forEach(function (element, index) {
    html += `<tr class='table-content'>
                        
        <td>${element[0]}</td>      
        <td>${element[1]}</td> 
        <td>${element[2]}</td> 
        <td><button id="${index}" onclick="deleteNote(this.id)" class="btn-remove">X</button></td>
      </tr>
      `
  });
  let notesElm = document.getElementById('notes');
  if (notesObj.length != 0) {
    notesElm.innerHTML = html
  } else {
    notesElm.innerHTML = `<td colspan="4" style="text-align: center;">NOTHING ADDED</td>`
  }
}

function deleteNote(index) {
  console.log("deleting " + index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1); // splice delete that specific index task from the array of tasks
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();

}