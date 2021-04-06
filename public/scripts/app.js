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
    // console.log('todo', todo);
    $(`#${todo.category}-items`).append(createToDoItem(todo.name));
  }
};

$(() => {
  // clear textarea and get correct lists for user on reload
  $('#text').val('');
  $.ajax({
    method:'GET',
    url: '/lists/',
    success: (lists) => {
      for (let list of lists){
        renderTodos(list);
      }
    }
  });

  $('form').on("submit", function(event) {
    event.preventDefault();
    $.ajax({
      method:'POST',
      url:'/lists/',
      data: $(this).serialize(),
      success: ((data) => {
        $('#text').val('');
        $(`#${data.category}-items`).append(createToDoItem(`${data.name}`));
      })
    });
  })
});
