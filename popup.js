function TodoList() {
  this.created = new Date();
  this.categories = [];
  this.name = '';
};

function Category() {
  this.tasks = [];
  this.created = new Date();
  this.name = '';
};

function Task() {
  this.completed = false;
  this.body = '';
  this.due = null;
  this.created = new Date();
  this.category = '';
  this.updated = null;
};

document.addEventListener('DOMContentLoaded', function() {
  $('body').css('height', '');
  $('#openTab').click(function(event) {
    chrome.tabs.create({ url: 'page.html' });
  });

  $('.checkbox-icon').click(function(event) {
    $(this).toggleClass('fa-square-o').toggleClass('fa-check-square');
    $(this.parentNode).toggleClass('stroke-completed');
  });
});

$('#circle').circleProgress({
  value: 0.75,
  size: 40,
  fill: {
    gradient: ["red", "orange"]
  }
});

// Test to see if the browser supports the HTML template element by checking
// for the presence of the template element's content attribute.
if ('content' in document.createElement('template')) {

  // Instantiate the table with the existing HTML tbody and the row with the template
  var t = document.querySelector('#taskRow'),
  body = t.content.querySelector("span.list-item");
  body.textContent = "1235646565";

  // Clone the new row and insert it into the table
  var tb = document.getElementsByTagName("tbody");
  var clone = document.importNode(t.content, true);
  tb[0].appendChild(clone);
}
