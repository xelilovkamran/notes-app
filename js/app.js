const add = document.querySelector(".createBtn");
const notesContainer = document.querySelector(".notesContainer");
let deleteEl;
let paragraphs;

const addNote = () => {
  const div = document.createElement("div");
  const p = document.createElement("p");
  const img = document.createElement("img");
  div.classList.add("note");
  img.src = "./img/delete.png";
  img.classList.add("bin");
  p.contentEditable = true;
  div.appendChild(p);
  div.appendChild(img);
  notesContainer.appendChild(div);
};

const updateStorage = () => {
  paragraphs = document.querySelectorAll("p");
  const array = [];
  paragraphs.forEach((paragraph) => {
    console.log(paragraph.innerText);
    if (paragraph.textContent) {
      array.push(paragraph.textContent);
    }
  });
  if (array.length) {
    localStorage.setItem("notes", array);
  }
};

const deleteNote = () => {
  if (event.target.classList.contains("bin")) {
    notesContainer.removeChild(event.target.offsetParent);
  }
  paragraphs = document.querySelectorAll("p");

  // !!!!!!! IMPROVE THIS SECTION
  if (paragraphs.length === 0) {
    localStorage.clear();
  }
};

const takeFromStorage = () => {
  let sentences = localStorage.getItem("notes").split(",");
  for (let i = 0; i < sentences.length; i++) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const img = document.createElement("img");
    div.classList.add("note");
    img.src = "./img/delete.png";
    img.classList.add("bin");
    p.contentEditable = true;
    p.innerHTML = sentences[i];
    div.appendChild(p);
    div.appendChild(img);
    notesContainer.appendChild(div);
    deleteEl = document.querySelectorAll(".note img");
  }
};

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  takeFromStorage();
});

add.addEventListener("click", () => {
  addNote();
  deleteEl = document.querySelectorAll(".note img");
});

notesContainer.addEventListener("keypress", (event) => {
  if (event.target.localName === "p") {
    updateStorage();
  }
});

document.addEventListener("click", (event) => {
  deleteNote();
  updateStorage();
});
