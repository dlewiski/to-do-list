//business logic
function Task(name, description) {
  this.name = name;
  this.description = description;
}

function addItem(name, description) {

  var outputName = "<h3>" + name + "</h3>";
  var outputDesc = "<p>" + description + "</p>";
  var outputDiv = "<div class='item'>" + outputName + outputDesc + "</div>"
  $("#list").append(outputDiv);
}



$(document).ready(function() {
  $("#new-task").submit(function(event) {
    event.preventDefault();

    var name = $("#new-name").val();
    var description = $("#new-description").val();

    var newTask = new Task(name, description);

    $("#new-name").val("");
    $("#new-description").val("");

    addItem(name, description);

    $(".item").last().click(function () {
      $(this).children("p").toggle();
      $(this).addClass("complete");
    });

  });
});
