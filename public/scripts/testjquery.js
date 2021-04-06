// Returns a new the html of a created element to avoid XXS
const escape =  function(str) {
  let newElement = document.createElement('div');
  newElement.appendChild(document.createTextNode(str));
  return newElement.innerHTML;
};

const loadItems = function() {
  $.getJSON('../test.json')
    .then((result) => {
      renderName(result, '#user-list')
      renderItems(result, '#eat-items', 'eat');
      renderItems(result, '#buy-items', 'buy');
      renderItems(result, '#watch-items', 'watch');
      renderItems(result, '#read-items', 'read');
    })
    .catch(err => {
      console.log('ajax error caught');
      console.log(err);
    });
};

//empties and appends list items into list category
const renderItems = function(items, id, categoryName) {
  $(id).empty();
  for (const category of items) {
    for (const item of category) {
      if (item.category === categoryName) {
        $(id).append(createTableElement(item));
      }
    }
  }
};

//empties and appends the user's name as a header
const renderName = function(items, id) {
  console.log(items[0][0].user_name);
  $(id).empty();
  $(id).append(createName(items[0][0].user_name));
}

const createName = function(name){
  let $name =
  `<h3>
    ${escape(name)}'s Lists
  </h3>
`;
  return $name;
}

//Creates a table element with sample json data
const createTableElement = function(item) {

  let $listItem =
  `<tr>
    <th scope="row">${escape(item.name)}</th>
  </tr>
  `;
  return $listItem;
};

$(document).ready(function() {
  console.log('document ready!');
  loadItems();

});
