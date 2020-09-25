const inputTarefaElement = document.querySelector('.input-tarefa');
const btnTarefaElement = document.querySelector('.btn-tarefa');
const tarefasElement = document.querySelector('.tarefas');

inputTarefaElement.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
    if (!inputTarefaElement.value) return;
    createToDo(inputTarefaElement.value);
  }
});

function createRemoveButton(li) {
  li.innerText += ' ';
  const removeButton = document.createElement('button');
  removeButton.innerText = 'Remove';
  removeButton.setAttribute('class', 'button--remove');
  removeButton.setAttribute('title', 'Remove this to do.');
  li.appendChild(removeButton);
}

function clearInput() {
  inputTarefaElement.value = '';
  inputTarefaElement.focus;
}

function createLi() {
  return document.createElement('li');
}

function createToDo(inputText) {
  const liElement = createLi();
  liElement.innerText = inputText;
  tarefasElement.appendChild(liElement);
  createRemoveButton(liElement);
  saveToDoList();
  clearInput();
}

btnTarefaElement.addEventListener('click', function(event) {
  if (!inputTarefaElement.value) return;
  createToDo(inputTarefaElement.value);
});

document.addEventListener('click', function(event) {
  const element = event.target;
  if (element.classList.contains('button--remove')) {
    element.parentElement.remove();
    saveToDoList();
  }
});

function saveToDoList() {
  const liList = tarefasElement.querySelectorAll('li');
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