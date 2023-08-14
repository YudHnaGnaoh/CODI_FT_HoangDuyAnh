var arr=[]
function add() {
    const name= document.getElementById("fullname").value;//chọn value của id="fullname"
    arr.push(name);//hiện chữ đánh
    div= document.getElementsByClassName("div1");//chọn class="div1"
    console.log(arr);//lưu tên của arr vào console dể check
    var str="";
    arr.forEach(el => {
        str= el 
    })//chuỗi vòng, str: thay thế cái đã có, str+: thêm cái mới
    div[1].innerHTML=str;//gắn vào div thứ 2 trong class div1 được khai báo ở trên
}