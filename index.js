console.log('a');
let ENTER_KEY_CODE = 13;
document
    .getElementById('newTask')
    .addEventListener('keypress', function() {
      console.log('Pressed Key');
      if(event.which == ENTER_KEY_CODE) {
          console.log(event.target.value);
      }
});
