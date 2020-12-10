const inputTaskElement = document.querySelector('.input--task');
const buttonAddTaskElement = document.querySelector('.button--add');
const tasksElement = document.querySelector('.tasks');

inputTaskElement.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
    if (!inputTaskElement.value) return;
    createToDo(inputTaskElement.value);
  }
});

function createRemoveButton(li) {
  const removeButton = document.createElement('button');
  const iconRemove = document.createElement('img');
  iconRemove.setAttribute('src', './assets/img/delete.svg');
  iconRemove.setAttribute('class', 'icon--remove');
  removeButton.appendChild(iconRemove);
  removeButton.setAttribute('class', 'button');
  removeButton.classList.add('button--remove');
  removeButton.setAttribute('title', 'Remove this to do.');
  li.appendChild(removeButton);
}

function clearInput() {
  inputTaskElement.value = '';
  inputTaskElement.focus;
}

function createLiElement() {
  return document.createElement('li');
}

function createToDo(inputText) {
  const liElement = createLiElement();
  liElement.setAttribute('class', 'task');
  liElement.innerText = inputText;
  createRemoveButton(liElement);
  insertTaskInToDoList(liElement);
}

function insertTaskInToDoList(liElement) {
  tasksElement.appendChild(liElement);
  saveToDoList();
  clearInput();
}

buttonAddTaskElement.addEventListener('click', function(event) {
  if (!inputTaskElement.value) return;
  createToDo(inputTaskElement.value);
});

document.addEventListener('click', function(event) {
  const element = event.target;
  if (element.classList.contains('button--remove')) {
    element.parentElement.remove();
    saveToDoList();
  }
});

function saveToDoList() {
  const liList = tasksElement.querySelectorAll('li');
  const toDoListText = [];

  for (let toDo of liList) {
    let text = toDo.innerText;
    text = text.replace('Remove', '').trim();
    toDoListText.push(text);
  }

  const toDoListJSON = JSON.stringify(toDoListText);
  localStorage.setItem('toDoList', toDoListJSON);
}

function loadToDoList() {
  const toDoListJSON = localStorage.getItem('toDoList');
  const toDoList = JSON.parse(toDoListJSON);
  
  for (let toDo of toDoList) {
    createToDo(toDo);
  }
}

loadToDoList();