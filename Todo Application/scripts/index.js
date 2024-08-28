document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoTitleInput = document.getElementById('todo-title');
    const todoPrioritySelect = document.getElementById('todo-priority');
    const todoTableBody = document.querySelector('#todo-table tbody');

    const loadTodos = () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todoTableBody.innerHTML = '';
        todos.forEach((todo, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${todo.title}</td>
                <td style="background-color: ${getPriorityColor(todo.priority)}">${todo.priority}</td>
                <td><button class="status">${todo.status}</button></td>
                <td><button class="archive">Archive</button></td>
            `;

            row.querySelector('.status').addEventListener('click', () => toggleStatus(index));
            row.querySelector('.archive').addEventListener('click', () => archiveTodo(index));

            todoTableBody.appendChild(row);
        });
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'medium': return 'rgb(255,255,0)';
            case 'high': return 'rgb(255,0,0)';
            default: return 'transparent';
        }
    };

    const toggleStatus = (index) => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos[index].status = todos[index].status === 'Pending🔃' ? 'Completed✅' : 'Pending🔃';
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodos();
    };

    const archiveTodo = (index) => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const archivedTodos = JSON.parse(localStorage.getItem('archive')) || [];
        const [todo] = todos.splice(index, 1);
        archivedTodos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('archive', JSON.stringify(archivedTodos));
        loadTodos();
    };

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = todoTitleInput.value.trim();
        const priority = todoPrioritySelect.value;

        if (!title) {
            alert('Todo cannot be empty!');
            return;
        }

        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ title, priority, status: 'Pending🔃' });
        localStorage.setItem('todos', JSON.stringify(todos));
        todoTitleInput.value = '';
        loadTodos();
    });

    loadTodos();
});
