//inv variable scope for homework
var important = false;
var serverUrl = "https://fsdiapi.azurewebsites.net/";
var myTasks = [];
function init() {
  //load data
  fetchTasks();
  $("#btnSave").click(saveTask);
  $("#important").click(importantButton);
}
//init function is good for two things. To load data, and to enable hook events early.
window.onload = init;
function fetchTasks() {
  $.ajax({
    url: serverUrl + "api/tasks",
    type: "GET",
    success: function (res) {
      var data = JSON.parse(res);

      for (let i = 0; i < data.length; i++) {
        let task = data[i];
        //filter array to get your tasks
        if (task.name === "Andrew") {
          myTasks.push(task);
          displayTask(task);
        }
      }
    },
    error: function (err) {
      console.error("Error getting data", err);
    },
  });
}
function importantButton() {
  if (!important) {
    important = true;
    $("#important").removeClass("far").addClass("fas");
  } else {
    important = false;
    $("#important").removeClass("fas").addClass("far");
  }
}
function clearInputs() {
  $("#txtTitle").val("");
  $("#txtDescription").val("");
  $("#selCategory").val("");
  $("#txtLocation").val("");
  $("#selDueDate").val("");
  $("#selColor").val("");
}
function saveTask() {
  //read values from controls
  let title = $("#txtTitle").val();
  let description = $("#txtDescription").val();
  let category = $("#selCategory").val();
  let location = $("#txtLocation").val();
  let duedate = $("#selDueDate").val();
  let color = $("#selColor").val();
  clearInputs();
  //create an object
  let task = new Task(
    title,
    important,
    category,
    description,
    location,
    duedate,
    color,
    1,
    2
  );
  //send object to a backend server
  $.ajax({
    url: serverUrl + "api/tasks/",
    type: "POST",
    data: JSON.stringify(task),
    contentType: "application/json",
    success: function (res) {
      console.log("Server says:", res);
      //parse json string into an object. display the task
      let task = JSON.parse(res);
      myTasks.push(task);
      displayTask(task);
    },
    error: function (eDetails) {
      console.error("Error saving", eDetails);
    },
  });
}
function displayTask(task) {
  let syntax = `<div id="${task._id}" class="task">
        <i class='important fas fa-star'></i> 
        <div class="description">
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>
        <label class="due-date">${task.duedate}</label>
        <label class="location">${task.location}</label>`;
  if (task.status == 1) {
    syntax += `<button onclick="finishedTask('${task._id}');" id="checkmark" class="btn btn-sm">✅</button></div>`;
    $("#pendingList").append(syntax);
  } else if (task.status == 2) {
    syntax += `<button onclick="removeTask('${task._id}');" class="btn btn-sm btn-danger">🗑️</button> </div>`;
    $("#finishedList").append(syntax);
  }
}
function finishedTask(id) {
  console.log("Marking task completed", id);
  //get the object
  for (let i = 0; i < myTasks.length; i++) {
    let task = myTasks[i];
    if (task._id == id) {
      task.status = 2;
      $.ajax({
        url: serverUrl + "api/tasks",
        type: "PUT",
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function (res) {
          console.log("response: ", res);
          //remove task from pending list
          $(`#${id}`).remove();
          //display task on done list
          displayTask(task);
        },
        error: function (err) {
          console.error("Error updating", err);
        },
      });
    }
  }
}
function removeTask(id) {
  for (let i = 0; i < myTasks.length; i++) {
    let task = myTasks[i];
    if (task._id == id) {
      task.status = 3;
      $.ajax({
        url: serverUrl + "api/tasks",
        type: "PUT",
        data: JSON.stringify(task),
        contentType: "application/json",
        success: function () {
          //remove task from finished list
          $(`#${id}`).remove();
        },
        error: function (err) {
          console.error("Error updating", err);
        },
      });
    }
  }
}
