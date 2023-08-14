var name = prompt("What's your name?");
alert("My name is " + name);
//function: hàm
//let: khai báo biến cục bộ (ko thể sử dụng ngoài Funtion)
//var = variable
//var tên biến: khai báo biến toàn cục

var arr = [];
function add() {
  var name = "";
  name = document.getElementById("fullname").value;
  //arr = array
  arr.push(name);
  const div = document.getElementsByClassName("div1");
  console.log(arr);
  //str = string
  var str = "";
  arr.forEach((el) => {
    str += el + "<br>";
  });
  div[1].innerHTML = str;
}

//var: là từ khóa dùng để khai báo biến. Người lập trình có thể khai báo nhiều danh sách biến có những kiểu dữ liệu khác nhau bằng cách tách tên các biến bằng dấu phẩy. Với từ khóa var, ta có thể khai báo đa dạng các kiểu biến như number, string, boolean,…
//const = constant: hằng số. được sử dụng để xác định giá trị của một biến không thể thay đổi sau khi biến đó được gán bằng một giá trị nào đó. Và tất nhiên, nó cũng không thể khai báo lại.
//let: cho phép chúng ta cập nhật giá trị của biến chứ không cho phép chúng ta tái khái báo lại biến đó.