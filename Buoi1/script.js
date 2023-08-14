var name= prompt ("nhập tên");
alert ("Tôi tên là " + name);
//function: hàm
//let: khai báo biến cục bộ (ko thể sử dụng ngoài Funtion)
//var = variable
//var tên biến: khai báo biến toàn cục

var arr=[]
function function1() {
    var name="";
    name= document.getElementById("fullname").value;
    //arr = array
    arr.push(name);
    const div= document.getElementsByClassName("div1");
    console.log(arr);
    //str = string
    var str="";
    arr.forEach(el => {
        str+="<br>"+el+"<br>"
    })
    div[1].innerHTML=str;
}