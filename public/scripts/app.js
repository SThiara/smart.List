const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createToDoItem = (todo) => {
  return `<li class=list-group-item>${escape(todo.contents)}</li>`;
};

const renderTodos = (todos) => {
  console.log('todos: ', todos);
};


$(() => {
  $('form').on("submit", function(event){
    event.preventDefault();
    $.ajax({
      method:"POST",
      url:"/lists/",
      success: () => {
        console.log('posting into db success')
        $.ajax({
          method:"GET",
          url:"/lists/",
          // getting an array of all the list then rendering them out
          success: (lists) => {
            for(let list of lists){
              console.log(list)
            }
          }
        });
      }
    });
  })
});
