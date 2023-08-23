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
                          <li><a class="dropdown-item" href="cate.html?id=`+el.id+`">`+ el.name + `</a></li>
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
                if (res.check == true) {
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
                        <td>
                        <input type="number" style="width:30%; text-align: center" class="qtyInput" value="`+ el[4] + `" data-id="` + el[0] + `"></td>
                        <td>`+ Intl.NumberFormat('en-US').format(el[5]) + `</td>
                        <td><button class="deleteBtn btn-sm btn-danger ms-2">Xóa</button><td>
                    </tr>
                    `;
                            sum += el[5];
                        });
                        str += `
                    <tr style="font-weight: bold;font-size: 20px;">
                    <td colspan="5" style=" text-align: left; padding-left: 20px;">Final payment</td>
                    <td colspan="2">`+ Intl.NumberFormat('en-US').format(sum) + `</td>
                    `
                        $("#cartTable").html(str);
                    }
                }
                else {
                    str = `
                    <div style="position: relative;margin-top: 100px">Giỏ hàng</div>
                    <div>Trống rỗng</div>
                    `
                    $(".empty").html(str)
                }
                editQuantity()
            },
        });
    }
}
//-----------------space-------------------------------
function editQuantity() {
    $(".qtyInput").change(function (e) {
        e.preventDefault();
        var id = $(this).attr("data-id")
        var qty = $(this).val()
        if (qty == 0) {
            Swal.fire({
                title: 'Do you want remove item from cart?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Yes',
                denyButtonText: `No`,
            }).then((result) => {
                if (result.isConfirmed) {
                    var cart = JSON.parse(localStorage.getItem("cart"));
                    var arr = []
                    cart.forEach(el => {
                        if (el[0] != id) {
                            arr.push(el);
                        }
                    });
                    localStorage.setItem("cart", JSON.stringify(arr));
                    location.reload()
                }
                else if (result.isDenied) {
                    loadCart()
                }
            })
        }
        else {
            var cart = JSON.parse(localStorage.getItem("cart"));
            cart.forEach(el => {
                if (el[0] == id) {
                    el[1] = qty;
                }
            });
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        loadCart()
    });
}

