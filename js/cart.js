/*
    Nhóm: 1 -> Tivi
    Nhóm: 2 -> Điện thoại
    Nhóm: 3 -> Mặt hàng  
*/
let carts=[]
const AddtoCart=(key,manhom)=>{
    let maso=key;
    let soluong=Number(document.getElementById(`sl${maso}`).value);
    console.log(`Mã số:${maso} - số lượng mua:${soluong}`);
    // Lưu Session 
    let vt = -1;
    // // Lưu vào sessionStorage
    if (sessionStorage.getItem("carts") != undefined) {
        carts = JSON.parse(sessionStorage.getItem("carts"))
        vt = carts.findIndex(item => item.maso == key);
    }

    if (vt == -1) {
        let tmp={}
        if(manhom==1){
            tmp = dsCamera.find(x => x.Ma_so == key);
        }else if(manhom==2){
            tmp = dsThietbiluutru.find(x => x.Ma_so == key);
        }else{
            tmp = dsPhukien.find(x => x.Ma_so == key);
        }
        let cart = {
            maso: key,
            soluong: soluong,
            ten: tmp.Ten,
            dongiaban: Number(tmp.Don_gia_Ban)
        }

        carts.push(cart) // Thêm 
    } else {
        carts[vt].soluong += soluong // Cập nhật lại số lượng
    }


    if (carts.length > 0) {
        sessionStorage.setItem("carts", JSON.stringify(carts))
    } else {
        sessionStorage.removeItem("carts")
    }
    Th_Gio_hang.innerHTML = `<u>${carts.length}</u>`

}

const openCart = () => {
    if (sessionStorage.getItem("carts") != undefined) {
        window.location = `cart.html`
    }
}

const openCart_ = () => {
    if (sessionStorage.getItem("carts") != undefined) {
        window.location = `../cart.html`
    }
}

const Xuat_San_pham_Mua = (carts, Th_Cha) => {
    Th_Cha.innerHTML = ""
    var noi_dung_HTML = ``
    carts.forEach(item => {
        let thanhTien = item.soluong * item.dongiaban
        noi_dung_HTML += `
        <tr>
            <td scope="row">
                <img src=${urlImg}/${item.maso}.png style="width:80px" />
            </td >
            <td class="text-nowrap">${item.ten}</td>
            <td>
                <input onchange="soLuong('${item.maso}',this)" type="number" min="1" max="10" value="${item.soluong}" class="text-right" />
            </td>
            <td>${item.dongiaban}<sup>đ</sup></td>
            <td id="tt${item.maso}">${thanhTien}<sup>đ</sup></td>
            <td class='xoa' onclick="xoaGiohang('${item.maso}')"> Xóa </td>
        </tr >
        `
    })
    noi_dung_HTML += `
        <tr>
                <td colspan="6" id="Th_Tong" style="text-align: right;"></td>
                
        </tr>
    `
    Th_Cha.innerHTML = noi_dung_HTML
    tongThanhtien()

}

const tongThanhtien = () => {
    let kq = 0
    carts = JSON.parse(sessionStorage.getItem("carts"))
    carts.forEach(dt => {
        kq += dt.soluong * dt.dongiaban
    })
    Th_Tong.innerHTML = `<strong>Tổng thành tiền:</strong> ${kq.toLocaleString()}<sup>đ</sup>`
}

const xoaGiohang = (maSo) => {
    let vt = carts.findIndex(x => x.maso == maSo)
    carts.splice(vt, 1)
    if (carts.length > 0) {
        sessionStorage.setItem("carts", JSON.stringify(carts))
        Xuat_San_pham_Mua(carts, Th_Carts)
    } else {
        Th_XoaCarts.click()
    }
}
const soLuong=(maso,sl)=>{
    let soluong=Number(sl.value)
    carts = JSON.parse(sessionStorage.getItem("carts"))
    let item=carts.find(x=>x.maso==maso);
    let thanhtien=soluong * item.dongiaban
    // update Số lượng Carts
    //console.log(item)
    item.soluong=soluong;
    sessionStorage.setItem("carts", JSON.stringify(carts))
    document.getElementById(`tt${item.maso}`).innerHTML=`${thanhtien.toLocaleString()}<sup>đ</sup>`
    tongThanhtien()
}

const datHang=()=>{
    let dsDonHang=[]
    carts = JSON.parse(sessionStorage.getItem("carts"));
    let Khach_hang = {
        "Ho_ten": document.querySelector("#Th_Ho_ten").value,
        "Dien_thoai": document.querySelector("#Th_Dien_thoai").value,
        "Email": document.querySelector("#Th_Email").value,
        "Dia_chi": document.querySelector("#Th_Dia_chi").value
    }
    carts.forEach(item=>{
        let donDathang = {
            "Ngay_Dat_hang": new Date(),
            "Ngay_Giao_hang": document.querySelector("#Th_Ngay_Giao_hang").value,
            "So_luong": Number(item.soluong),
            "Don_gia_Ban": Number(item.dongiaban),
            "Tien": Number(item.soluong)*Number(item.dongiaban),
            "Trang_thai": "CHUA_GIAO_HANG",
            "Khach_hang": Khach_hang
        };
        let maso=item.maso;
        let donhang={
            key:maso,
            dathang:donDathang,
            nhom:item.nhom
        }
        dsDonHang.push(donhang)
        console.log(dsDonHang);
    })
    // Call API
    apiDathang(dsDonHang).then(result=>{
        console.log(result)
        if(result.noi_dung){
            alert("Cảm ơn bạn đã đặt hàng thành công")
            Th_XoaCarts.click()
        }
    }).catch(err=>{
        console.log(err)
    })
}
