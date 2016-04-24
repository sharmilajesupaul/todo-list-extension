$(document).ready(function() {

  function TodoList() {
    this.created = new Date();
    this.categories = [];
    this.name = '';
  };

  function Category(obj) {
    this.tasks = obj.tasks || [];
    this.created = obj.created || new Date();
    this.name = obj.name;
    this.color = obj.color;
  };

  function Task(obj) {
    this.completed = obj.completed;
    this.body = obj.body;
    this.due = obj.due;
    this.created = obj.created || new Date();
    this.category = obj.category;
    this.updated = obj.updated;
  };

  function createTask(task) {
    // Test to see if the browser supports the HTML template element by checking
    // for the presence of the template element's content attribute.
    if ('content' in document.createElement('template')) {

      // Instantiate the table with the existing HTML tbody and the row with the template
      var t = document.querySelector('#taskRow'),
        body = t.content.querySelector("span.task-body");
      body.textContent = task.body;

      // Clone the new row and insert it into the table
      var tb = document.getElementById("todoListBody");
      var clone = document.importNode(t.content, true);
      tb.appendChild(clone);
    }
  }

  function createCategory(category) {
    // Test to see if the browser supports the HTML template element by checking
    // for the presence of the template element's content attribute.
    if ('content' in document.createElement('template')) {

      // Instantiate the table with the existing HTML tbody and the row with the template
      var t = document.querySelector('#categoryRow'),
      body = t.content.querySelector("span.category-name");
      console.log(body);
      body.textContent = category.name;

      // Clone the new row and insert it into the table
      var tb = document.getElementById("todoListBody");
      var clone = document.importNode(t.content, true);
      tb.appendChild(clone);
    }
  }

  function drawProgress(value) {
    var value = value || 0;
    $('#circle').circleProgress({
      value: value,
      size: 40,
      emptyFill: "#ccc",
      fill: {
        gradient: [
          ['#0681c4', .5],
          ['#4ac5f8', .5]
        ],
        gradientAngle: Math.PI / 4
      }
    });
  }


  function createDemoTask() {
    var task = new Task({
      body: 'This is an example',
      completed: false,
      category: 'default'
    });
    console.info('creating demo task...', task);
    createTask(task);
  }

  function createDefaultCategory() {
    var category = new Category({
      name: 'Unassigned'
    });
    console.info('creating default category...', category);
    createCategory(category);
  }

  function updateTask(el) {
    if ($(el).attr('contenteditable')) {
      $(el).removeAttr('contenteditable');
      $(el).css('background-color', 'lightgreen').delay(500).css('background-color', 'white');
    } else {
      $(el).attr('contenteditable', 'true');
      setEndOfContenteditable(el);
    }

    $($(el).next()[0]).toggleClass('invisible');
  };

  function colorChangeCallback(id, newValue) {
    var textColor = invertColor(newValue);
    var td = $('#' + id).parent().parent();
    td.css('background-color', newValue);
    td.css('color', textColor);
  }

  function run() {
    // getTasks();
    // drawProgress(value);
    createDefaultCategory();
    createDemoTask();
  }

  drawProgress();
  run();

  $('#addTask').click(function(event) {
    console.log(event);
  });
  $('#openTab').click(function(event) {
    chrome.tabs.create({ url: 'page.html' });
  });
  $('.checkbox-icon').click(function(event) {
    $(this).toggleClass('fa-square-o').toggleClass('fa-check-square');
    $(this.parentNode).toggleClass('stroke-completed');
  });

  $('#colorPicker').colorPicker({
    onColorChange: colorChangeCallback
  });

  $('.datedropper').dateDropper({
    lock: "from",
    minYear: 2010,
    maxYear: 2050
  });

  $('.timedropper').timeDropper({
    meridians: true
  });

  $('.wrapper').on('click', '.task-body', function(event) {
    updateTask(event.target);
  });

  $('.wrapper').on('click', '.fa.fa-calendar', function(event) {
    var datepicker = $(event.target).parent().parent().next()[0];
    $(datepicker).slideToggle('slow');
  });

  $('.wrapper').on('click', '.save-due-date', function(event) {
    var datepicker = $(event.target).parent();
    $(datepicker).slideToggle('slow');
  });



  $('.wrapper').on('keypress', '.task-body[contenteditable="true"]', function(event) {
    if (event.keyCode === 13) {
      updateTask(event.target);
    }
  });
});
