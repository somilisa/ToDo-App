const form = document.querySelector('.todo-form');
const alert = document.querySelector('.alert');
const todo = document.getElementById('todo');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.todo-container');
const todoList = document.querySelector('.todo-list');
const clearBtn = document.querySelector('.clear-btn');
let posts = document.getElementById('posts');
let data = [];

let editElement;
let editFlag = false;
let editID = '';

// submitBtn.addEventListener('submit', addItem);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('button clicked');
  formValidation();
});

let acceptData = () => {
  data['text'] = todo.value;
  console.log(data);
  createPost();
};

let formValidation = () => {
  if (todo.value !== '' && !editFlag) {
    console.log('success');
    acceptData();
  } else if (todo.value !== '' && editFlag) {
    editElement.innerHTML = todo.value;
    displayAlert('item edited', 'success');
    setBackToDefault();
    saveData();
  } else {
    console.log('failure');
    displayAlert('please enter value', 'success');
  }
};
let createPost = () => {
  posts.innerHTML += `
  <div class="posts-item" >
    <p class="title" onClick="completedPost(this)">${data.text}</p>
    <span class="options">
      <button onClick="editPost(this)"<i  class="fas fa-edit" id="edit-btn"></i></button>
      <button onClick="deletePost(this)" id="delete-btn"><i  class="fas fa-trash-alt" ></i></button>
    </span>
    </span>
    <select name="status" id="">
    // <option value="none" selected disabled hidden>Select an Option</option>
    <option value="pending">pending</option>
    <option value="in progress">in progress</option>
    <option value="completed">completed</option>
  </select>
  </div>
  `;
  displayAlert('item added to the list', 'success');
  todo.value = '';
  saveData();
};
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  //remove alert
  setTimeout(function () {
    alert.textContent = '';
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

let deletePost = (e) => {
  e.parentElement.parentElement.remove();
  displayAlert('item removed from list', 'danger');
  saveData();
};
let editPost = (e) => {
  editElement = e.parentElement.previousElementSibling;
  todo.value = editElement.innerHTML;
  editFlag = true;
  console.log(editFlag);
  submitBtn.textContent = 'edit';
};

function completedPost(e) {
  e.classList.toggle('completed');
  displayAlert('task completed', 'success');
}

function setBackToDefault() {
  todo.value = '';
  editFlag = false;
  editID = '';
  submitBtn.textContent = 'submit';
}

const items = document.querySelectorAll('.posts-item');
function clearItems() {
  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }
}
function saveData() {
  localStorage.setItem('data', posts.innerHTML);
}
function showTask() {
  posts.innerHTML = localStorage.getItem('data');
}
showTask();

function showAll() {
  posts.innerHTML = items.filter() 
}

// let paragraphs = [...document.querySelectorAll('.title')];
// console.log(paragraphs);

// paragraphs.forEach((paragraph) => {
//   paragraph.addEventListener('click', function () {
//     console.log(paragraph);
//   });
// });
