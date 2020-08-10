var table = document.getElementById('myTable');
var form = document.getElementById('myForm');
Task.all = [];
//if statement to prevnt losing localstorage date
if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', Task.all)
} else {
    Task.all = JSON.parse(localStorage.getItem('tasks'))
    render();
}

//constructor
function Task(taskDesc, taskDate, taskUrgency) {
    this.taskDesc = taskDesc;
    this.taskDate = taskDate;
    this.taskUrgency = taskUrgency;
    Task.all.push(this);
}
//eventListner to track any clicks on submit and delete buttons
form.addEventListener('submit', clickHandler);
table.addEventListener('click', removeTask);

//this function validate my form date and creates a new object from the constructor
function clickHandler() {
    event.preventDefault();
    var taskDesc = event.target.taskDesc.value;
    var taskDate = event.target.taskDate.value;
    var taskUrgency = event.target.taskUrgency.value;
    new Task(taskDesc, taskDate, taskUrgency);
    localStorage.setItem('tasks', JSON.stringify(Task.all));

    render();

}
//this function removes object from the main array
function removeTask() {
    if (event.target.tagName == 'SPAN') {
        newArry.splice(event.target.id, 1);
        localStorage.setItem('tasks', JSON.stringify(newArry));
        Task.all = newArry;
        render();
    }

}
//this function types my data into the table after fetch it from the localstorage
function render() {
    newArry = JSON.parse(localStorage.getItem('tasks'));
    total = '';
    generateHeader();
    for (let index = 0; index < newArry.length; index++) {
        code = `
        <tr>
        <td>${newArry[index].taskDesc}</td>
        <td>${newArry[index].taskDate}</td>
        <td>${newArry[index].taskUrgency}</td>
        <td><span id="${index}">x</span></td>
        </tr>
        `
        total += code;
        console.log(total);
    }
    table.innerHTML += total;

}
//this function generates my table header
function generateHeader() {
    table.innerHTML = `
    <tr>
    <th>Task</th>
    <th>Date</th>
    <th>Urgency</th>
    <th>Done</th>
    </tr>`
}
//this function removes all my data
function clearAllTasks() {
    Task.all = [];
    localStorage.setItem('tasks', JSON.stringify(Task.all));
    render();

}
