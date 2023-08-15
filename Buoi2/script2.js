const button2 = document.querySelectorAll(".button2");
const tenSP = document.querySelectorAll(".tenSP");
const giaSP = document.querySelectorAll(".giaSP");

button2.forEach(el => {
    console.log(el);
});

var arr=[]
for (let i = 0; i < button2.length; i++) {
    const el = button2[i];
    //arrow function: function/hàm được khai báo nhưng ko có tên function
    el.addEventListener("click",()=>{
        var tenSP1 = tenSP[i].innerHTML;
        var giaSP1 = giaSP[i].innerHTML;

        var item = new Object();
        item.ten = tenSP1;
        item.gia = giaSP1;
        item.soluong = 1;

        var check = 0;
        arr.forEach(el => {
            if (el.ten == tenSP1) {
                el.soluong++;
                check = 1;
            }
        })
        if (check == 0) {
            arr.push(item)
        }
        console.log(arr)
    });
}
