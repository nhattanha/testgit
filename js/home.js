const Xuat_Cuahang=(chang,tag)=>{
    let html=``
    html+=`
    <h1 class="display-4 fw-bolder">${chang.Ten}</h1>
    <p class="lead fw-normal text-white-50 mb-0">
        Địa chỉ:${chang.Dia_chi} <br> Điện thoại:${chang.Dien_thoai}
    </p>
    `
    tag.innerHTML=html;
}
/*
    Nhóm: 1 -> Camera
    Nhóm: 2 -> Thiết bị lưu trữ
    Nhóm: 3 -> Phụ Kiện  
*/
const Xuat_Khuyenmai=(dsKhuyenmai,tag)=>{
    let html=``;
    dsKhuyenmai.forEach(item=>{
        let nhom=(item.Ma_so.substr(0,1)=="W" || item.Ma_so.substr(0,2)=="TV" || item.Ma_so.substr=="I")?1:(item.Ma_so.substr(0,2)=="TN" || item.Ma_so.substr(0,1)=="O")?2:3
        html+=`
        <div class="col mb-5">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" src="${urlImg}/${item.Ma_so}.png" alt="..." />
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">${item.Ten}</h5>
                                    <!-- Product price-->
                                    ${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup>
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center">
                                <input type="number" value="1" min=1 max=10 id="sl${item.Ma_so}" style="padding-top: 3px;padding-bottom:6px">
                                <a class="btn btn-outline-dark mt-auto" href="javaScript:void(0)" onclick="AddtoCart('${item.Ma_so}',${nhom})" >Mua</a>
                                </div>
                            </div>
                        </div>
                    </div>
        `
    })

    tag.innerHTML=html;

}