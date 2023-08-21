$(document).ready(function () {
  login();
  logout();
  createTodo();
  show();
  searchTodo();
  loadTodo()
});
function login() {
  $("#loginBtn").click(function (e) {
    e.preventDefault();
    $("#loginModal").modal("show");
    $("#submitloginBtn").click(function (e) {
      e.preventDefault();
      var emailaddress = $("#email").val().trim();
      if (emailaddress == '') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1700,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: 'Type something',
        });
      }
      else (
        $.ajax({
          type: "post",
          url: "https://students.trungthanhweb.com/api/checkLoginhtml",
          data: {
            email: emailaddress
          },
          dataType: "JSON",
          success: function (res) {
            if (res.check == true) {
              console.log(res.apitoken);
              localStorage.setItem("token", res.apitoken);
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1700,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })

              Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
              }).then(() => {
                window.location.reload();
              });
            }
            else {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1700,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })

              Toast.fire({
                icon: 'error',
                title: 'Email not exist'
              })
            }
          }
        })
      )
    });
  })
}
//------------------------------------------------------------------------------------
function logout() {
  $("#logoutBtn").click(function (e) {
    e.preventDefault();
    if (localStorage.getItem("token") && localStorage.getItem("token") != null) {
      localStorage.removeItem("token")
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1700,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Logout successfully'
      }).then(() => {
        window.location.reload();
      })
    }
  });
}
//-----------------space-------------------------------
function searchTodo() {
  $("#searchInput").keyup(function (e) { 
    var todo = $(this).val().trim();
    if (todo="") {
      loadTodo()
    }

    else {
      $.ajax({
      type: "post",
      url: "https://students.trungthanhweb.com/api/searchtodo",
      data: {
        apitoken: localStorage.getItem("token"),
        todo: todo
      },
      dataType: "JSON",
      success: function (res) {
        const todo= res.todo
        if (todo.length>0) {
          var str="";
          todo.forEach((el,key) => {
            if (el("status") ==0) {
              str+=`
              <tr class="table-primary">
                <th scope="row">`+(key++)+`</th>
                <td>>`+el("note")+`</td>
                <td><input type="checkbox" data-id="` +el("id")+`" class="checkbox"></td>
                <td>
                        <button class="btn-sm btn-warning editTodoBtn" data-id="` +el("id")+`" data-value="`+el("note")+`">Sửa</button>
                        <button class="btn-sm btn-danger ms-2 deletebtn" data-id="` +el("id")+`" data-key="`+key+`">Xóa</button>
                </td>
              </tr>`;
            } else {
                str +=`
              <tr class="table-primary">
                <th scope="row">`+(key++)+`</th>
                <td>>`+el("note")+`</td>
                <td><input type="checkbox" data-id="` +el("id")+`" class="checkbox"></td>
                <td>
                        <button class="btn-sm btn-warning editTodoBtn" data-id="` +el("id")+`" data-value="`+el("note")+`">Sửa</button>
                        <button class="btn-sm btn-danger ms-2 deletebtn" data-id="` +el("id")+`" data-key="`+key+`">Xóa</button>
                </td>
              </tr>`;
              
            }
          }); 
        }
      }
    });
  }
  });
}
//-----------------space-------------------------------
function loadTodo() {
  if (localStorage.getItem("token")&& localStorage.getItem("token") !=null) {
    $.ajax({
      type: "GET",
      url: "https://students.trungthanhweb.com/api/home",
      data: {
        apitoken: localStorage.getItem("token")
      },
      dataType: "JSON",
      success: function (res) {
      }
    });
  }
}
//-----------------space-------------------------------
function createTodo() {
  if (!localStorage.getItem("token") || localStorage.getItem("token") == null) {
    $("#addTodoBtn").attr("disable", "disable");
    //tại sao lại cần 2 disable ?
  }
  $("#addTodoBtn").click(function (e) {
    e.preventDefault();
    var todo = $("#todo").val().trim();
    if (todo == "") {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1700,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "warning",
        title: "Please type input",
      });
    } else {
      $.ajax({
        type: "post",
        url: "https://students.trungthanhweb.com/api/todo",
        data: {
          apitoken: localStorage.getItem("token"),
          todo: todo,
        },
        dataType: "JSON",
        success: function (res) {
          if (res.check == true) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1700,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              title: "Add successfully",
            }).then(() => {
              window.location.reload();
            });
          } else if (res.check == false) {
            if (res.msg.apitoken) {
              //msg=message
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1700,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "error",
                title: res.msg.apitoken,
              });
            } else if (res.msg.id) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1700,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "error",
                title: res.msg.id,
              });
            }
          }
        },
      });
    }
  });
}
//-----------------space-------------------------------
function checkbox() {
    $(".finish").change(function (e) { 
        e.preventDefault();
        var id = $(this).attr("data-id")
        Swal.fire({
            title: 'Check the box?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Check',
            denyButtonText: `Don't check`,
          }).then((result) => {
            if (result.isConfirmed) {
              
              $.ajax({
                type: "post",
                url: "https://students.trungthanhweb.com/api/statusTodo",
                data: {
                    apitoken: localStorage.getItem("token"),
                    id: id,
                },
                dataType: "JSON",
                success: function (res) {
                    if (res.check==true){
                      Swal.fire('Checked!', '', 'success').then
                    }
                    else if (res.check == false) {
                      const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 1700,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener("mouseenter", Swal.stopTimer);
                          toast.addEventListener("mouseleave", Swal.resumeTimer);
                        },
                      });
        
                      Toast.fire({
                        icon: "error",
                        title: "Not Deleted",
                      });
                    }
                }
            });
            } else if (result.isDenied) {
              Swal.fire('Not checked', '', 'info')
            }
          })
    });
}
//-----------------space-------------------------------
function show() {
  $("#todoTable").hide();
  $("#logoutBtn").hide();
  //đoạn này em đang muốn khi login rồi (có token value) thì nut login sẽ biến mất, chỉ còn Logout thôi nhưng em chưa làm được ạ, canh có thời gian thì chi cho em nhé
  //$("#logintBtn").show();
  //if (!localStorage.getItem("token") || localStorage.getItem("token") == null) {
    //$("#logintBtn").hide();}
//-------------------------------------------------------------
  if (localStorage.getItem("token") && localStorage.getItem("token") != null) {
    $("#logoutBtn").show();
    
    $.ajax({
      type: "get",
      url: "https://students.trungthanhweb.com/api/todo",
      data: {
        apitoken: localStorage.getItem("token"),
      },
      dataType: "JSON",
      success: function (res) {
        //console.log(res.todo);
        const todo = res.todo;
        if (todo.length > 0) {
          var str = "";
          var count = 1;
          todo.forEach((el, key) => {
            if (el.status==0) {
            str +=`
              <tr>
                <th scope="row">`+(count++)+`</th>
                <td><p class="todo">`+el.note+`<p></td>
                <td><input type="checkbox" data-id="` +el.id+`" class="finish"></td>
                <td>
                    <div class="d-flex">
                        <button class="btn-sm btn-warning editTodoBtn" data-id="` +el.id+`" data-value="`+el.note+`">Sửa</button>
                        <button class="btn-sm btn-danger ms-2 deletebtn" data-id="` +el.id+`" data-key="`+key+`">Xóa</button>
                    </div>
                </td>
              </tr>`;
            } else {
                str +=`
              <tr>
                <th scope="row">`+(count++)+`</th>
                <td><p class="todo">`+el.note+`<p></td>
                <td><input type="checkbox" data-id="` +el.id+`" disabled checked class="finish"></td>
                <td>
                    <div class="d-flex">
                        <button class="btn-sm btn-warning editTodoBtn" data-id="` +el.id+`" disabled data-value="`+el.note+`">Sửa</button>
                        <button class="btn-sm btn-danger ms-2 deletebtn" data-id="` +el.id+`" data-key="`+key+`">Xóa</button>
                    </div>
                </td>
              </tr>`;
            }
          });
          $("#result").html(str);
          $("#todoTable").show();
        }
        deletetodo();
        editTodo();checkbox();
      },
    });
  }
}
//-----------------space-------------------------------
function deletetodo() {
  $(".deletebtn").click(function (e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    Swal.fire({
      title: "Do you want to delete?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Xóa",
      denyButtonText: `Không xóa`,
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "post",
          url: "https://students.trungthanhweb.com/api/deletetodo",
          data: {
            apitoken: localStorage.getItem("token"),
            id: id,
          },
          dataType: "JSON",
          success: function (res) {
            if (res.check == true) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1700,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "success",
                title: "Deleted",
              }).then(() => window.location.reload());
            } else if (res.check == false) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1700,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "error",
                title: "Not Deleted",
              });
            }
          },
        });
      } else if (result.isDenied) {
      }
    });
  });
}
//-----------------space-------------------------------
function editTodo() {
  $(".editTodoBtn").click(function (e) {
    e.preventDefault();
    //var key= $(this).attr("data-key");
    //const todo= document.querySelectorAll(".todo");
    //const todo=$(".todo");
    //var old= todo[key].innerText;
    var id = $(this).attr("data-id");
    var old = $(this).attr("data-value");
    $("#editTodo").val(old);
    $("#editModal").modal("show");
    $("#editBtn").click(function (e) {
      e.preventDefault();
      var todo = $("#editTodo").val().trim();
      if (todo == "") {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1700,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
        Toast.fire({
          icon: "error",
          title: "Chưa nhập todo",
        });
      } else if (todo == old) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1700,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
          icon: "error",
          title: "Chưa chỉnh sửa",
        });
      } else {
        $.ajax({
          type: "post",
          url: "https://students.trungthanhweb.com/api/updatetodo",
          data: {
            apitoken: localStorage.getItem("token"),
            todo: todo,
            id: id,
          },
          dataType: "JSON",
          success: function (res) {
            if (res.check == true) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1700,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                Toast.fire({
                icon: "success",
                title: "Đã chỉnh sửa",
              }).then(() => {
                window.location.reload();
              });
            }
            if (res.msg.apitoken) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1700,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                Toast.fire({
                icon: "error",
                title: res.msg.apitoken,
              });
            } else if (res.msg.todo) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1700,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                Toast.fire({
                icon: "error",
                title: res.msg.todo,
              });
            }
          },
        });
      }
    });
  });
}
