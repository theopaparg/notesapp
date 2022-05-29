let addButtonNote = document.getElementById("addBtnNote");
let addButtonTitle = document.getElementById("addBtnTitle");
let notesElm = document.getElementById("notes");
let clearNotesButton = document.getElementById("clearNotes");
let cardTitleArray = [];

showNotes();

//Add note
addButtonNote.addEventListener("click", function (e) {
  let addText = document.getElementById("addTxtNote");
  let addTitle = document.getElementById("titleNameInput");
  let notes = localStorage.getItem("notes");
  let titles = localStorage.getItem("titles");

  // Add new note
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  // Add new note
  if (titles == null) {
    titlesObj = [];
  } else {
    titlesObj = JSON.parse(titles);
  }

  titlesObj.push(addTitle.value);
  notesObj.push(addText.value);

  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("titles", JSON.stringify(titlesObj));
  addText.value = "";
  addTitle.value = "";

  showNotes();
});

// Show notes function - generates code for new note
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";

  notesObj.forEach(function (element, index) {
    let title = titlesObj[index];

    html += `
    <div class="card mx-2 my-2 noteCard" style="width: 18rem;">
    <div class="card-body">
      <h5 id='cardTitle'>${title}</h5>
      <p class="cardText" >${element}</p>
      <button id="${index}" class="btn btn-primary" onclick=deleteNote(this.id)>Delete note</button>
    </div>
  </div>
    `;
  });

  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = "Nothing to Show. Add a note first";
  }
}

// Clear all notes
function clearAllNotes() {
  localStorage.clear();
  notesElm.innerHTML = "";
}

clearNotesButton.addEventListener("click", clearAllNotes);

// Clear single note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  let titles = localStorage.getItem("titles");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);

  if (titles == null) {
    titlesObj = [];
  } else {
    titlesObj = JSON.parse(titles);
  }

  titlesObj.splice(index, 1);

  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("titles", JSON.stringify(titlesObj));
  showNotes();
}

//Search function
let search = document.getElementById("searchField");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardText = element.getElementsByTagName("p")[0].innerText;
    if (cardText.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
