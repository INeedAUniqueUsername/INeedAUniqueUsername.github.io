console.log('a');
let ENTER_KEY_CODE = 13;
document
  .getElementById('newTask')
  .addEventListener('keypress', function() {
    console.log('Pressed Key');
    if(event.which !== ENTER_KEY_CODE) {
        return;
    }
    console.log(event.target.value);
    let newTask = document.createElement('li');
    let newTaskContent = event.target.value;
    
    newTask.textContent = newTaskContent;
    
    document.getElementById("todoList").append(newTask);
});
