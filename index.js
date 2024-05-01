import inquirer from 'inquirer';
const todos = [];
let currentId = 1;
async function main() {
    console.log('Welcome to Todo App!');
    while (true) {
        const { choice } = await inquirer.prompt({
            name: 'choice',
            type: 'list',
            message: 'Choose an action:',
            choices: ['Add Todo', 'Mark Todo as Completed', 'List Todos', 'Exit']
        });
        switch (choice) {
            case 'Add Todo':
                await addTodo();
                break;
            case 'Mark Todo as Completed':
                await markTodoCompleted();
                break;
            case 'List Todos':
                listTodos();
                break;
            case 'Exit':
                console.log('Thank you for using Todo App. Goodbye!');
                return;
        }
    }
}
async function addTodo() {
    const { task } = await inquirer.prompt({
        name: 'task',
        message: 'Enter your todo task:',
        type: 'input'
    });
    const todo = {
        id: currentId,
        task,
        completed: false
    };
    currentId++;
    todos.push(todo);
    console.log('Todo added successfully!');
}
async function markTodoCompleted() {
    const { todoId } = await inquirer.prompt({
        name: 'todoId',
        message: 'Enter the id of the todo to mark as completed:',
        type: 'number',
        validate: input => todos.some(todo => todo.id === input) || 'Invalid todo id'
    });
    const todo = todos.find(todo => todo.id === todoId);
    if (todo) {
        todo.completed = true;
        console.log('Todo marked as completed!');
    }
}
function listTodos() {
    console.log('Your Todos:');
    todos.forEach(todo => {
        console.log(`[${todo.completed ? '✓' : 'X'}] ${todo.id}. ${todo.task}`);
    });
}
main();
