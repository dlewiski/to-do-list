//business logic
function Task(name, description, date) {
  this.name = name;
  this.description = description;
  this.date = date;
}

function addItem(name, description, date) {

  var outputName = "<h3>" + name + " -Due: " + date.replace(/-/g, "/") + "</h3>";
  var outputDesc = "<p>" + description + "</p>";
  var outputDiv = "<div class='item'>" + outputName + outputDesc + "</div>"
  $("#list").append(outputDiv);
}

function hasClass(el, className) {
  return el.classList.contains(className);
}



$(document).ready(function() {
  $("#new-task").submit(function(event) {
    event.preventDefault();

    var name = $("#new-name").val();
    var description = $("#new-description").val();
    var dueDate = $("#dueDate").val();

    var newTask = new Task(name, description. dueDate);

    $("#new-name").val("");
    $("#new-description").val("");

    addItem(name, description, dueDate);

    $(".item").last().click(function () {
      $(this).children("p").toggle();
      if (hasClass(this, "complete"))
        $(this).removeClass("complete");
      else
        $(this).addClass("complete");
    });

  });
});
