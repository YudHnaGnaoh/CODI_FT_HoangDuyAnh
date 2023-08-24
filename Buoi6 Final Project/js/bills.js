$(document).ready(function () {
    login();
    logout(); 
    loadDataNavbar();
    loadData()
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
  //------------------------------------------------------------------------------------
  function loadDataNavbar() {
    $("#logoutBtn").hide();
    if (localStorage.getItem("token") && localStorage.getItem("token") != null) {
      $("#logoutBtn").show();
      $("#loginBtn").hide()
      $.ajax({
        type: "GET",
        url: "https://students.trungthanhweb.com/api/home",
        data: {
          apitoken: localStorage.getItem("token"),
        },
        dataType: "JSON",
        success: function (res) {
          const brands = res.brands;
          const categrories = res.categrories;
          if (brands.length > 0) {
            var str = ""
            brands.forEach(el => {
              str += `
                          <li><a class="dropdown-item" href="brand.html?id=`+ el.id + `">`+ el.name + `</a></li>
                          `
            });
            $("#brandUL").html(str);
          }
          if (categrories.length > 0) {
            var str = ""
            categrories.forEach(el => {
              str += `
                          <li><a class="dropdown-item" href="cate.html?id=`+ el.id + `">`+ el.name + `</a></li>
                          `
            });
            $("#cateUL").html(str);
          }
        }
      })
    }
  }
  //------------------------------------------------------------------------------------
  function loadData() {
    if (localStorage.getItem("token") && localStorage.getItem("token")!=null){
        $.ajax({
            type: "GET",
            url: "https://students.trungthanhweb.com/api/bills",
            data: {
                api_token: localStorage.getItem("token"),
            },
            dataType: "JSON",
            success: function (res) {
                console.log(res);
                console.log(res.bills);
                if (res.check==true && res.bills.lenght>0){
                    alert("good to go")

                    //Đoạn này log res và res.bills đều chạy nhưng alert lại ko hoạt động ạ 


                    // var str="";
                    // const bills = res.bills
                    // console.log(bills);
                    // bills.forEach(el => {
                    //     str+=`
                    //     <li class="list-group-item list-group-item-action">`+el.tenKH+`</li>
                    //     `
                    // });
                    // $("#bills").html(str);
                    // console.log(str);
                    // $("#bills").removeclass("hideclass");
                }
            }
        });
    }
  }