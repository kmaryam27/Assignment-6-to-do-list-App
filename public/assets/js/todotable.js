
// jQuery handler that runs the encapsulated code when the page is ready.
$(() => {
  $(document).ready(() => {
    render();
  });

  const renderTables = (outputElement, dataList) => {
    // Loop through and display each of the customers
    
    dataList.forEach(e => {
        // Get a reference to the tableList element and populate it with tables
        const output = $(outputElement);
        // Then display the fields in the HTML (Section Name, Date, URL)
        const listItem = $(`<li class='list-group-item mt-4' id='${e.task_id}'>`);
        let checkedBoolean;
        (e.compeleted === 'false')? checkedBoolean = false: checkedBoolean = true;
        listItem.append(
          $("<input type='checkbox' id='checkboxId'>").prop( "checked", checkedBoolean ),
          $("<p>").text(e.task),
          $("<button style='font-size:24px' class='fas fa-times' id='removeBtn'>").text('')
        );

        output.append(listItem);
    });

  }

  const render = function () {
    $('#inputTxtId').val('');
    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.ajax({ url: "/api/todolist", method: "GET" })
      .then((todoList) => {
       renderTables('#todo', todoList);
      });
  }


  // This function resets all of the data in our tables. This is intended to let you restart a demo.
  const addNewTask = function () {
      event.preventDefault();
      newTask = {
        task_id: '0',
        task: $('#inputTxtId').val(),
        compeleted: 'false'
      }
      
      switch(true){
        case ((newTask.task).trim() !== ''):
            // Clear the tables on the server and then empty the elements on the client
            $.ajax({ url: "/api/addNewTask", method: "POST", data: newTask}).then(() => {
              $("#inputTxtId").empty();
              $("#todo").empty();
              render();
              });
        break;
        default:
            alert('fill task on text place then add please');
        break;
      }
  }

  $("#addBtn").on("click", addNewTask);
   

  const removeTask = function () {
    event.preventDefault();

    taskDel = {
      task_id: String($(this).parent().attr('id'))
    }

    $.ajax({url: "/api/removeTask",  method: "DELETE", data: taskDel}).then(function() {
      $("#todo").empty();
        render();
      });
    }

  $('#todo').on('click','#removeBtn' , removeTask);

  const updateTask = function () {
    event.preventDefault();

    taskDel = {
      task_id: String($(this).parent().attr('id')),
      compeleted: String($(this).prop( "checked"))
    }

    $.ajax({url: "/api/updateTask",  method: "PUT", data: taskDel}).then(function() {
      $("#todo").empty();
        render();
      });
    }

  $('#todo').on('click','#checkboxId' , updateTask);


  /////////////////////////////////////////////////////////////////// Auto text compelete practice
 



  // $('#inputTxtId').on("click", function () {
  //   event.preventDefault();
  //   // let currentFocus = -1;
  //   autoItemCounter = [];
  //   $.ajax({ url: "/api/todolist", method: "GET" })
  //   .then((todoList) => {
  //     const inp = document.getElementById("inputTxtId");
  //     const arr = todoList.map(e => e.task);

  //     $('#inputTxtId').keydown(function (e) {
  //       if (($(this).val().trim() === '')&&((String.fromCharCode(e.keyCode)).trim() === '')) {
  //          return String.fromCharCode(e.keyCode);
  //         }else{
            
           
  //           let val = $(this).val() + (String.fromCharCode(e.keyCode));

  //           if((e.keyCode == 40) || (e.keyCode == 38) || (e.keyCode == 13)){
               
  //           //  if(autoItemCounter.length > 0){
  //           //   if (e.keyCode == 40) {/*arrow DOWN key*/
  //           //     currentFocus++;
  //           //     // addActive(currentFocus);
  //           //   } else if (e.keyCode == 38) {/*arrow UP key*/
  //           //     currentFocus--;
  //           //     // addActive(currentFocus);
  //           //   } else if (e.keyCode == 13) {/*ENTER key*/
  //           //     e.preventDefault();
  //           //     if (currentFocus > -1) {/*"active"*/
                
  //           //     $('#autocomplete-list').empty();/**.detach() */
  //           //     $('#autocomplete-list').on('click','.autoItem' ,function(){
                  
  //           //       $('#inputTxtId').val(`${autoItemCounter[currentFocus]}`);
  //           //     });
                
  //           //     }
  //           //   }
              
  //           //  }
  //           }
  //           else{
  //             $('#autocomplete-list').empty();/**.detach() */
  //             for (i = 0; i < arr.length; i++) {
  //               if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
  //                 autoItemCounter.push(arr[i]);
  //                 addToAutoItems(arr, i, val);
  //               }
  //             }
  //           }

  //         }
  //     });
  //   });
  // });


  // const addToAutoItems = function(arr, i, val){
  //   $('#autocomplete-list').css('display', 'block');
  //   const b = document.createElement('div');
  //   b.classList.add('autoItem');
  //   b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
  //   b.innerHTML += arr[i].substr(val.length);
  //   b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

  //   b.addEventListener("click", function(e) {
  //     $('#inputTxtId').val(`${arr[i]}`);
  //         closeAllLists();
  //       });
  //   $('#autocomplete-list').append(b);
  // }

    

  

});





