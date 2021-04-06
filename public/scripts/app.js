const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createToDoItem = (todo) => {
  return `<tr><th>${escape(todo)}</th></tr>`;
};

const renderTodos = (todos) => {
  for(let todo of todos){
    console.log('todo', todo);
    // $(`#${todo.category}`).append(createToDoItem(todo.name));
  }
};

$(() => {
  $('form').on("submit", function(event) {
    event.preventDefault();
    $.ajax({
      method:"POST",
      url:"/lists/",
      data: $(this).serialize(),
      success: ((data) => {
        $(`#${data.category}-items`).append(createToDoItem(`${data.name}`));
      })
    });
  })
});
