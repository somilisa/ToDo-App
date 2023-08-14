const form = document.querySelector('.todo-form');
const alert = document.querySelector('.alert');
const todo = document.getElementById('todo');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.todo-container');
const todoList = document.querySelector('.todo-list');
const clearBtn = document.querySelector('.clear-btn');
const deleteBtn = document.getElementById('delete-btn');
const editBtn = document.getElementById('edit-btn');
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
  // data['text'] = todo.value;
  data.push({ text: todo.value });
  localStorage.setItem('data', JSON.stringify(data));

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
  } else {
    console.log('failure');
    displayAlert('please enter value', 'success');
  }
};
let createPost = () => {
  posts.innerHTML = '';
  data.map((x, y) => {
    return (posts.innerHTML += `
    <div id = ${y}> 
    <p class="title" onClick="completedPost(this)">${x.text}</p>
    <span class="options">
      <button onClick="editPost(this)"<i  class="fas fa-edit" id="edit-btn"></i></button>
      <button onClick="deletePost(this)" id="delete-btn"><i  class="fas fa-trash-alt" ></i></button>
    </span>
    </span>
    <select name="status" id="">
    // <option value="none" selected disabled hidden>select status</option>
    <option value="pending">pending</option>
    <option value="in progress">in progress</option>
    <option value="completed">completed</option>
  </select>
  </div>  
 `);
  });
  clearBtn.classList.remove('hide-container');
  displayAlert('item added to the list', 'success');
  todo.value = '';
  // saveData();
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
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem('data', JSON.stringify(data));
  displayAlert('item removed from list', 'danger');
  // saveData();
};
let editPost = (e) => {
  editElement = e.parentElement.previousElementSibling;
  todo.value = editElement.innerHTML;
  editFlag = true;
  submitBtn.textContent = 'edit';
  data[e.parentElement.parentElement.id].text = todo.value;
  console.log(data[e.parentElement.parentElement.id].text);
  localStorage.setItem('data', JSON.stringify(data));
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

function clearItems() {
  let items = [...document.querySelectorAll('#posts div')];
  if (items.length > 0) {
    items.forEach((item) => {
      item.parentNode.removeChild(item);
    });
    clearBtn.classList.add('hide-container');
  }
  setBackToDefault();
  localStorage.removeItem('data');
}

(() => {
  data = JSON.parse(localStorage.getItem('data')) || [];
  console.log(data);
  createPost();
})();

let items = [...document.querySelectorAll('#posts div')];
const result = items.filter(showAll);
function showAll() {
  return items;
}

function completedItems() {
  const result = items.filter(showCompleted());
  console.log(result);
}
function showCompleted() {
  if (items.length > 0) {
    items.find((item) => {
      !item.classList.contains('completed');
    });
  }
}

// let paragraphs = [...document.querySelectorAll('.title')];
// console.log(paragraphs);

// paragraphs.forEach((paragraph) => {
//   paragraph.addEventListener('click', function () {
//     console.log(paragraph);
//   });
// });
