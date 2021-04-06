const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createToDoItem = (todo) => {
  return `<li class=list-group-item>${escape(todo.contents)}</li>`;
};

const renderTodos = (todos) => {
  for(let todo of todos){
    console.log('todo', todo);
    // $(`#${todo.category}`).append(createToDoItem(todo.name));
  }
};

$(() => {
  $('form').on("submit", function(event){
    event.preventDefault();
    $.ajax({
      method:"POST",
      url:"/lists/",
      data: $(this).serialize(),
      success: (() => {
        console.log('posting into db success')
        $.ajax({
          method:"GET",
          url:"/lists/",
          // getting an array of all the list then rendering them out
          success: (lists) => {
            console.log(lists)
            for(let list of lists){
              renderTodos(list);
            }
          }
        });
      })
    });
  })
});
