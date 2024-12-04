// script.js

// Selectors
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const clearTasksBtn = document.getElementById('clear-tasks-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const toggleThemeBtn = document.getElementById('toggle-theme-btn');

// Functions
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(({ text, completed, date }) => addTask(text, completed, date));
}

function saveTasks() {
    const tasks = Array.from(taskList.children).map(task => ({
        text: task.querySelector('.task-text').textContent,
        completed: task.classList.contains('completed'),
        date: task.querySelector('.date-time').textContent,
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(text, completed = false, date = new Date().toLocaleString()) {
    const taskItem = document.createElement('li');
    taskItem.className = completed ? 'completed' : '';

    const taskText = document.createElement('span');
    taskText.textContent = text;
    taskText.className = 'task-text';

    const taskDate = document.createElement('span');
    taskDate.textContent = date;
    taskDate.className = 'date-time';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
        saveTasks();
    });

    taskItem.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        saveTasks();
    });

    taskItem.appendChild(taskText);
    taskItem.appendChild(taskDate);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
    saveTasks();
}

// Event Listeners
addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text) {
        addTask(text);
        taskInput.value = '';
    }
});

clearTasksBtn.addEventListener('click', () => {
    taskList.innerHTML = '';
    saveTasks();
});

filterBtns.forEach(btn =>
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        filterTasks(btn.dataset.filter);
    })
);

function filterTasks(filter) {
    Array.from(taskList.children).forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'completed':
                task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                break;
            case 'pending':
                task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
                break;
        }
    });
}

toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleThemeBtn.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Initialize
loadTasks();
