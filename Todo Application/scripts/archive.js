document.addEventListener('DOMContentLoaded', () => {
    const archiveTableBody = document.querySelector('#archive-table tbody');
    const priorityFilter = document.getElementById('priority-filter');
    const statusFilter = document.getElementById('status-filter');

    const loadArchivedTodos = () => {
        const archivedTodos = JSON.parse(localStorage.getItem('archive')) || [];
        archiveTableBody.innerHTML = '';
        archivedTodos.forEach((todo, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${todo.title}</td>
                <td style="background-color: ${getPriorityColor(todo.priority)}">${todo.priority}</td>
                <td>${todo.status}</td>
                <td><button class="restore">Restore</button></td>
                <td><button class="delete">Delete</button></td>
            `;

            row.querySelector('.restore').addEventListener('click', () => restoreTodo(index));
            row.querySelector('.delete').addEventListener('click', () => deleteTodo(index));

            archiveTableBody.appendChild(row);
        });
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'medium': return 'rgb(255,255,0)';
            case 'high': return 'rgb(255,0,0)';
            default: return 'transparent';
        }
    };

    const restoreTodo = (index) => {
        const archivedTodos = JSON.parse(localStorage.getItem('archive')) || [];
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const [todo] = archivedTodos.splice(index, 1);
        todos.push(todo);
        localStorage.setItem('archive', JSON.stringify(archivedTodos));
        localStorage.setItem('todos', JSON.stringify(todos));
        loadArchivedTodos();
    };

    const deleteTodo = (index) => {
        const archivedTodos = JSON.parse(localStorage.getItem('archive')) || [];
        archivedTodos.splice(index, 1);
        localStorage.setItem('archive', JSON.stringify(archivedTodos));
        loadArchivedTodos();
    };

    const filterTodos = () => {
        const priority = priorityFilter.value;
        const status = statusFilter.value;

        const archivedTodos = JSON.parse(localStorage.getItem('archive')) || [];
        const filteredTodos = archivedTodos.filter(todo =>
            (priority === '' || todo.priority === priority) &&
            (status === '' || todo.status === status)
        );

        archiveTableBody.innerHTML = '';
        filteredTodos.forEach((todo, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${todo.title}</td>
                <td style="background-color: ${getPriorityColor(todo.priority)}">${todo.priority}</td>
                <td>${todo.status}</td>
                <td><button class="restore">Restore</button></td>
                <td><button class="delete">Delete</button></td>
            `;

            row.querySelector('.restore').addEventListener('click', () => restoreTodo(index));
            row.querySelector('.delete').addEventListener('click', () => deleteTodo(index));

            archiveTableBody.appendChild(row);
        });
    };

    priorityFilter.addEventListener('change', filterTodos);
    statusFilter.addEventListener('change', filterTodos);

    loadArchivedTodos();
});
