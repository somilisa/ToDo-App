const form = document.querySelector('.todo-form');
// const alert = document.querySelector('.alert');
const todo = document.getElementById('todo');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.todo-container');
const todoList = document.querySelector('.todo-list');
const clearBtn = document.querySelector('.clear-btn');
let posts = document.getElementById('posts');

let editElement;
let editFlag = false;
let editID = '';

// submitBtn.addEventListener('submit', addItem);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('button clicked');
  formValidation();
});

let data = {};

let acceptData = () => {
  data['text'] = todo.value;
  console.log(data);
  createPost();
};

let formValidation = () => {
  if (todo.value !== '' && !editFlag) {
    console.log('success');
    msg.innerHTML = '';
    acceptData();
  } else if (todo.value !== '' && editFlag) {
    editElement.innerHTML = todo.value;
    setBackToDefault();
    saveData();
  } else {
    msg.innerHTML = 'Post cannot be blank';
    console.log('failure');
  }
};
let createPost = () => {
  posts.innerHTML += `
  <div class="posts-item" >
    <p class="title">${data.text}</p>
    <span class="options">
      <button onClick="editPost(this)"<i  class="fas fa-edit" id="edit-btn"></i></button>
      <button onClick="deletePost(this)" id="delete-btn"><i  class="fas fa-trash-alt" ></i></button>
    </span>
  </div>
  `;
  todo.value = '';
  saveData();
};
function displayAlert(text, action) {
  alert.textContent = text;
}
let deletePost = (e) => {
  e.parentElement.parentElement.remove();
  saveData();
};
let editPost = (e) => {
  editElement = e.parentElement.previousElementSibling;
  todo.value = editElement.innerHTML;
  editFlag = true;
  console.log(editFlag);
  submitBtn.textContent = 'edit';
};
function setBackToDefault() {
  todo.value = '';
  editFlag = false;
  editID = '';
  submitBtn.textContent = 'submit';
}
function saveData() {
  localStorage.setItem('data', posts.innerHTML);
}
function showTask() {
  posts.innerHTML = localStorage.getItem('data');
}
showTask();
