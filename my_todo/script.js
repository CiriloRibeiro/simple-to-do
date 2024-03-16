function createTask(taskName) {
    // Get tasks from local storage or initiate a new array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Create a new task object
    const task = {
        id: Date.now(),
        name: taskName,
        completed: false,
    };

    // Add the new task to the tasks array
    tasks.push(task);

    // Save the tasks array back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Display the updated tasks
    displayTasks();
}

function removeTask(taskId) {
    // Debugging statement
    console.log('Task ID to be removed:', taskId);
    // Get tasks from local storage or initiate a new array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log('Tasks', tasks);
    // Filter out the task with the specified ID
    const updatedTasks = tasks.filter(task => task.id != taskId);
    console.log('Updated tasks', updatedTasks);
    // Save the updated tasks array back to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Display the updated tasks
    displayTasks();
}

function displayTasks() {
    // Get the tasks container element
    const tasksDiv = document.querySelector('.tasks');

    // Get tasks from local storage or initiate an empty array
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (tasks.length === 0) {
        tasksDiv.style.display = 'none';
    } else {
        tasksDiv.style.display = 'block';
    }

    // Clear previous content in the tasks container
    tasksDiv.innerHTML = '';

    // Iterate over each task and create HTML elements to display them
    tasks.forEach(task => {
        // Create a task item element
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        // Set task item content
        taskItem.innerHTML = `
            <div class='wrapper'>
                <input type="checkbox" ${task.completed ? 'checked' : ''} />
                <span>${task.name}</span>
            </div>
            <button class="remove-task" data-task-id="${task.id}">Remove</button>
        `;

        // Append the task item to the tasks container
        tasksDiv.appendChild(taskItem);

        // Attach event listener for remove task button
        const removeTaskButton = taskItem.querySelector('.remove-task');
        removeTaskButton.addEventListener('click', () => {
            const taskId = removeTaskButton.dataset.taskId;
            console.log('Clicked task ID:', taskId); // Debugging statement
            removeTask(taskId);

        });
    });
}

const taskButton = document.querySelector('.push');
const input = document.querySelector('.create-task input');

taskButton.addEventListener('click', () => {
    if (input.value.length === 0) {
        alert('Please enter a task name');
    } else {
        const taskName = input.value.trim();
        createTask(taskName);
        input.value = ''; // Clear the input field after adding the task
    }
});

// Initial call to displayTasks to render tasks from local storage
displayTasks();
