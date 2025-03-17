// DOM-Elemente
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const emptyState = document.getElementById('empty-state');
const tasksCounter = document.getElementById('tasks-counter');
const completedCounter = document.getElementById('completed-counter');

// App-Daten
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Theme-Wechsel-Funktion
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    
    // Icon wechseln
    if (body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Lade gespeichertes Theme
function loadSavedTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// To-Dos rendern
function renderTodos() {
    todoList.innerHTML = '';
    
    if (todos.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }
    
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('div');
        checkbox.className = 'checkbox';
        checkbox.innerHTML = '<i class="fas fa-check"></i>';
        
        const todoText = document.createElement('span');
        todoText.className = 'todo-text';
        todoText.textContent = todo.text;
        
        const todoActions = document.createElement('div');
        todoActions.className = 'todo-actions';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        
        // Event-Listener für Checkbox
        checkbox.addEventListener('click', () => {
            toggleComplete(index);
        });
        
        // Event-Listener für Löschen-Button
        deleteBtn.addEventListener('click', () => {
            deleteTodo(index);
        });
        
        // Elemente zusammenfügen
        todoActions.appendChild(deleteBtn);
        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoText);
        todoItem.appendChild(todoActions);
        
        todoList.appendChild(todoItem);
    });
    
    updateCounters();
}

// To-Do als erledigt markieren
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

// To-Do löschen
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// Neue To-Do hinzufügen
function addTodo() {
    const text = todoInput.value.trim();
    
    if (text !== '') {
        todos.push({
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        });
        
        todoInput.value = '';
        saveTodos();
        renderTodos();
    }
}

// Zähler aktualisieren
function updateCounters() {
    const totalTasks = todos.length;
    const completedTasks = todos.filter(todo => todo.completed).length;
    
    tasksCounter.textContent = `${totalTasks} Aufgaben insgesamt`;
    completedCounter.textContent = `${completedTasks} erledigt`;
}

// To-Dos im localStorage speichern
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Event-Listener
themeToggle.addEventListener('click', toggleTheme);
addButton.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Beim Laden der Seite
function init() {
    loadSavedTheme();
    renderTodos();
}

// Initialisiere die App
init();