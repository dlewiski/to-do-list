//business logic
function hasClass(el, className) {
  return el.classList.contains(className);
}

function updateHtml(tasks) {
  $(".item").remove();

  tasks.forEach(function(task) {
    date = formatDate(getDateArray(task.date));

    var outputName = "<h3>" + task.name + " - Due: " + date + "</h3>";
    var outputDesc = "<p>" + task.description + "</p>";
    var outputDiv = "<div class='well item'>" + outputName + outputDesc + "</div>"
    $("#list").append(outputDiv);

    $(".item").last().click(function () {
      $(this).children("p").toggle();
      if (hasClass(this, "complete"))
        $(this).removeClass("complete");
      else
        $(this).addClass("complete");
    });
  });
}

function sortTasks(newTask, tasks) {
  var position = tasks.length;
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].date > newTask.date) {
      position = i;
      break;
    }
  }
  tasks.splice(position, 0, newTask);
}

function getInput(tasks) {
  var name = $("#new-name").val();
  var description = $("#new-description").val();
  var dueDate = $("#dueDate").val();
  var newTask = new Task(name, description, dueDate);

  $("#new-name").val("");
  $("#new-description").val("");
  $("#dueDate").val("");

  return newTask;
}

function formatDate(date) {
  var year = date[0];
  var month = date[1];
  var day = date[2];
  return month + "/" + day + "/" + year;
}

function getDateArray(date) {
  return date.split(/-/g);
}

function Task(name, description, date) {
  this.name = name;
  this.description = description;
  this.date = date;
}

var tasks = [];
$(document).ready(function() {
  $("#new-task").submit(function(event) {
    event.preventDefault();

    var newTask = getInput(tasks);
    sortTasks(newTask, tasks);
    updateHtml(tasks);



  });
});
