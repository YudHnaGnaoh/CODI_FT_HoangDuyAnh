$(document).ready(function () {
    login();
  });
  function login() {
    $("#loginBtn").click(function (e) {
      e.preventDefault();
      $("#loginModal").modal("show");
      $("#submitloginBtn").click(function (e) {
        e.preventDefault();
        var emailaddress = $("#email").val().trim();
        if (email == "") {
          alert("Xin hãy điền thông tin email");
        } else
          $.ajax({
            type: "post",
            url: "https://students.trungthanhweb.com/api/checkLoginhtml",
            data: {
              email: emailaddress,
            },
            dataType: "JSON",
            success: function (res) {
              if (res.check == true) {
                console.log(res.apitoken);
                localStorage.setItem("token", res.apitoken);
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
                  title: "Login successfully",
                }).then(() => {
                  window.location.reload();
                });
              } else {
                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                  },
                });
  
                Toast.fire({
                  icon: "error",
                  title: "Fail to Signed in",
                });
              }
            },
          });
      });
    });
  }