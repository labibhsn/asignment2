// Fortune Generator
const fortunes = [
    "True wisdom comes not from knowledge, but from understanding.",
    "The best way to predict the future is to create it.",
    "Success is not final, failure is not fatal.",
    "The only way to do great work is to love what you do.",
    "Life is what happens while you're busy making other plans.",
    "The journey of a thousand miles begins with one step.",
    "Believe you can and you're halfway there.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Everything you can imagine is real.",
    "The only limit to our realization of tomorrow will be our doubts of today."
];

const fortuneBox = document.getElementById('fortune-box');
const fortuneText = document.getElementById('fortune-text');
const fontColorBtn = document.getElementById('font-color-btn');
const bgColorBtn = document.getElementById('bg-color-btn');
const borderColorBtn = document.getElementById('border-color-btn');
const fontStyleBtn = document.getElementById('font-style-btn');

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
const fonts = ['Arial', 'Times New Roman', 'Georgia', 'Verdana', 'Courier New'];
const fontSizes = ['16px', '18px', '20px', '22px', '24px'];

function getRandomFortune() {
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    fortuneText.textContent = fortunes[randomIndex];
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomFont() {
    const fontIndex = Math.floor(Math.random() * fonts.length);
    return {
        family: fonts[fontIndex],
        size: fontSizes[fontIndex]
    };
}

fontColorBtn.addEventListener('click', () => {
    fortuneText.style.color = getRandomColor();
});

bgColorBtn.addEventListener('click', () => {
    fortuneBox.style.backgroundColor = getRandomColor();
});

borderColorBtn.addEventListener('click', () => {
    fortuneBox.style.borderColor = getRandomColor();
});

fontStyleBtn.addEventListener('click', () => {
    const fontStyle = getRandomFont();
    fortuneText.style.fontFamily = fontStyle.family;
    fortuneText.style.fontSize = fontStyle.size;
});

// Initialize fortune on page load
getRandomFortune();

// Stopwatch
const display = document.getElementById('display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');

let time = 0;
let interval = null;
let isRunning = false;

function updateDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(() => {
            if (time < 30) {
                time += 3;
                updateDisplay();
            } else {
                stopTimer();
            }
        }, 3000);
        startBtn.disabled = true;
    }
}

function stopTimer() {
    isRunning = false;
    clearInterval(interval);
    startBtn.disabled = false;
}

function resetTimer() {
    stopTimer();
    time = 0;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

// Todo List
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (todo.completed) li.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        li.classList.toggle('completed', todo.completed);
        saveTodos();
    });

    const span = document.createElement('span');
    span.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', () => {
        todos = todos.filter(t => t !== todo);
        li.remove();
        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        const todo = { text, completed: false };
        todos.push(todo);
        todoList.appendChild(createTodoElement(todo));
        todoInput.value = '';
        saveTodos();
    }
}

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

// Initialize todo list
todos.forEach(todo => {
    todoList.appendChild(createTodoElement(todo));
}); 