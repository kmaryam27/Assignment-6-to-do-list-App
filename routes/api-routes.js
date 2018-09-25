// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on todo-list
// ===============================================================================

const todoList = require('../data/todo-list.js');

// Sample table is a dummy table for validation purposes
const sampleTable = require('../data/todo-data-model.json');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  // Make a GET route for getting all todo list items
  app.get('/api/todolist', function(req, res) {
    res.json(todoList);
  });

  // Make a POST route for adding a new todo list item
  app.post('/api/addNewTask', function(req, res) {
    // Checks to make sure every property on the req.body is also on sampleTable
    for(let key in req.body) {
      if(!sampleTable.hasOwnProperty(key)) {
        return res.json({ success: false });
      }
    }

    // Checks to make sure every property on the sampleTable is also on req.body
    for(let key in sampleTable) {
      if(!req.body.hasOwnProperty(key)) {
        return res.json({ success: false });
      }
    }
    //make and add a uniq task_id
    let task_ids =[];
    (todoList.length > 0)? todoList.forEach(e => task_ids.push(parseFloat(e.task_id.substr(1)))): task_ids.push(1);
    //adding a new todo list item
    req.body.task_id = 'a' + (Math.max(...task_ids) + 1);
    todoList.unshift(req.body);//can use push fxn
  

    // Send back a confirmation the POST was successfully processed to end the response
    res.json({ success: true });
  });


  //Make a DELETE route for deleting a todo list item using the X button next to it
  app.delete('/api/removeTask', function(req, res){
      // Grab the selected parameter
      const chosen = req.body.task_id;

      const checkitem = (delTask) =>{
        return delTask.task_id == chosen;
      }
      const i = todoList.findIndex(checkitem);
      todoList.splice(i, 1);

      // Respond with success of the delete operation (true or false)
      res.json(todoList);
  });


  //Make a PUT route for updating a todo list item when it is checked or unchecked
  app.put('/api/updateTask', function(req, res) {
    // Grab the selected parameter
  const chosen = req.body.task_id;
  // let found = false;

  const checkitem = (delTask) =>{
    return delTask.task_id === chosen;
  }
  const i = todoList.findIndex(checkitem);
  selectedTask = {
    task_id: chosen,
    task: todoList[i].task,
    compeleted: req.body.compeleted
  }
  todoList.splice(i, 1, selectedTask);

  return res.json(todoList);
  });

}
