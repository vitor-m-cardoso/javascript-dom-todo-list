const taskListStr = 'lista-tarefas';

const createBtns = () => {
  const mainEl = document.getElementsByTagName('main')[0];
  const btnsArr = [
    ['criar-tarefa', 'Adicionar tarefa'],
    ['apaga-tudo', 'Apagar tarefas'],
    ['remover-finalizados', 'Apagar finalizados'],
    ['salvar-tarefas', 'Salvar tarefas'],
    ['mover-cima', 'Mover cima'],
    ['mover-baixo', 'Mover baixo'],
    ['remover-selecionado', 'Remover selecionado'],
  ];

  for (let index = 0; index < btnsArr.length; index += 1) {
    const [elId, elText] = btnsArr[index];
    const btn = document.createElement('button');
    btn.id = elId;
    btn.innerText = elText;
    mainEl.appendChild(btn);
  }
};
createBtns();

const addNewTask = () => {
  const taskBtn = document.getElementById('criar-tarefa');
  const taskOl = document.getElementById(taskListStr);
  taskBtn.addEventListener('click', () => {
    const createLi = document.createElement('li');
    createLi.className = 'list-item';
    const taskInput = document.getElementById('texto-tarefa');
    createLi.innerText = taskInput.value;
    taskOl.appendChild(createLi);
    taskInput.value = '';
  });
};
addNewTask();

const changeListBgColor = () => {
  const taskList = document.getElementById(taskListStr);
  taskList.addEventListener('click', (event) => {
    const selectedEl = document.getElementsByClassName('selected')[0];
    const targetEl = event.target;
    if (selectedEl) {
      selectedEl.classList.remove('selected');
    }
    targetEl.classList.add('selected');
  });
};
changeListBgColor();

const completeTask = () => {
  const taskList = document.getElementById(taskListStr);
  taskList.addEventListener('dblclick', (event) => {
    const targetEl = event.target;
    targetEl.classList.toggle('completed');
  });
};
completeTask();

const saveTasks = (taskList) => {
  localStorage.setItem('taskList', JSON.stringify(taskList.innerHTML));
};

const removeAllTasks = () => {
  const removeBtn = document.getElementById('apaga-tudo');
  removeBtn.addEventListener('click', () => {
    const taskList = document.getElementById(taskListStr);
    const taskListItems = document.getElementsByTagName('li');
    for (let index = taskListItems.length - 1; index >= 0; index -= 1) {
      const listItem = taskListItems[index];
      listItem.remove();
    }
    saveTasks(taskList);
  });
};
removeAllTasks();

const removeCompletedTasks = () => {
  const removeBtn = document.getElementById('remover-finalizados');
  removeBtn.addEventListener('click', () => {
    const taskList = document.getElementById(taskListStr);
    const completedTasks = document.getElementsByClassName('completed');
    if (completedTasks) {
      for (let index = completedTasks.length - 1; index >= 0; index -= 1) {
        const listItem = completedTasks[index];
        listItem.remove();
      }
    }
    saveTasks(taskList);
  });
};
removeCompletedTasks();

const saveTaskOnClick = () => {
  const saveBtn = document.getElementById('salvar-tarefas');
  saveBtn.addEventListener('click', () => {
    const taskList = document.getElementById(taskListStr);

    saveTasks(taskList);
  });
};
saveTaskOnClick();

const loadTasks = () => {
  const taskList = document.getElementById(taskListStr);
  const savedTasks = JSON.parse(localStorage.getItem('taskList'));
  if (savedTasks) {
    taskList.innerHTML = savedTasks;
  }
};
loadTasks();

const moveTaskUp = () => {
  const upBtn = document.getElementById('mover-cima');
  upBtn.addEventListener('click', () => {
    const selectedEl = document.getElementsByClassName('selected')[0];
    if (!selectedEl) return;
    const previusElement = selectedEl.previousElementSibling;
    if (previusElement) {
      previusElement.parentNode.insertBefore(selectedEl, previusElement);
    }
  });
};
moveTaskUp();

const moveTaskDown = () => {
  const downBtn = document.getElementById('mover-baixo');
  downBtn.addEventListener('click', () => {
    const selectedEl = document.getElementsByClassName('selected')[0];
    if (!selectedEl) return;
    const nextElement = selectedEl.nextElementSibling;
    if (nextElement) {
      nextElement.parentNode.insertBefore(selectedEl, nextElement.nextSibling);
    }
  });
};
moveTaskDown();

const removeSelectedTask = () => {
  const removeBtn = document.getElementById('remover-selecionado');
  removeBtn.addEventListener('click', () => {
    const selectedEl = document.getElementsByClassName('selected')[0];

    if (selectedEl) {
      selectedEl.remove();
    }
  });
};
removeSelectedTask();
