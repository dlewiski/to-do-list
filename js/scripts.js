//business logic
function hasClass(el, className) {
  return el.classList.contains(className);
}

function updateHtml(tasks) {
  $(".item").remove();

  tasks.forEach(function(item) {
    date = formatDate(getDateArray(item.date));

    var div = "list"
    var className = "";
    if (item.completed) {
      div = "finishedTasks"
      className = "complete";
    }


    var outputName = "<h3>" + item.name + " - Due: " + date + "</h3>";
    var outputDesc = "<p>" + item.description + "</p>";
    var outputDiv = "<div class='well item " + className + "'>" + outputName + outputDesc + "</div>"



    $("#" + div).append(outputDiv);
    
    $(".item").last().click(function () {
      if (item.completed) {
        $(this).removeClass("complete");
        $(this).children("p").hide();
        item.completed = false;
      } else  {
        $(this).addClass("complete");
        $(this).children("p").fadeIn();
        item.completed = true;
      }
      updateHtml(tasks);
    });
  });
}

function sortNewTasks(newTask, tasks) {
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
  this.completed = false;
}

var tasks = [];
$(document).ready(function() {
  $("#new-task").submit(function(event) {
    event.preventDefault();

    var newTask = getInput(tasks);
    sortNewTasks(newTask, tasks);
    updateHtml(tasks);

  });
});
