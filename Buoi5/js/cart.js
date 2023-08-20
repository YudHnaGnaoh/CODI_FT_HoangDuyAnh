$(document).ready(function () {
    login(); logout(); loadDataNavbar(); loadCart();
});
///------------------------------------------------------------------------------------

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
                          <li><a class="dropdown-item" href="#">`+ el.name + `</a></li>
                          `
                    });
                    $("#brandUL").html(str);
                }
                if (categrories.length > 0) {
                    var str = ""
                    categrories.forEach(el => {
                        str += `
                          <li><a class="dropdown-item" href="#">`+ el.name + `</a></li>
                          `
                    });
                    $("#cateUL").html(str);
                }
            }
        })
    }
}
//------------------------------------------------------------------------------------
function loadCart() {
    if (localStorage.getItem("cart") && localStorage.getItem("cart") != null) {
        var cart = localStorage.getItem("cart");
        var id = JSON.parse(cart);
        $.ajax({
            type: "GET",
            url: "https://students.trungthanhweb.com/api/getCart",
            data: {
                apitoken: localStorage.getItem("token"),
                id: id,
            },
            dataType: "JSON",
            success: function (res) {
                if (res.result.length > 0) {
                    var str = "";
                    var sum = 0;
                    res.result.forEach((el, index) => {
                        str += `
                    <tr>
                        <td>`+ (++index) + `</td>
                        <td style="width: 200px"><img style="height: 100px; margin: 10px" src="`+ el[3] + `" alt="Image"></td>
                        <td>`+ el[1] + `</td>
                        <td>`+ Intl.NumberFormat('en-US').format(el[2]) + `</td>
                        <td>`+ el[4] + `</td>
                        <td>`+ Intl.NumberFormat('en-US').format(el[5]) + `</td>
                    </tr>
                    `;
                        sum += el[5];
                    });
                    str += `
                    <tr style="font-weight: bold;font-size: 20px;">
                    <td colspan="5" style=" text-align: left; padding-left: 20px;">Final payment</td>
                    <td>`+ Intl.NumberFormat('en-US').format(sum) + `</td>
                    `
                    $("#cartTable").html(str);
                }
            }
        });
    }
}