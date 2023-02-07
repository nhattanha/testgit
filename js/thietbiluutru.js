const sapxepTen=(th)=>{
    
    let co=th.getAttribute("sxTen")
    let danhsachloc=[];
    if(co=="true"){
        // Tăng
        danhsachloc=dsThietbiluutru.sort(function(a, b){return (a.Ten.localeCompare(b.Ten))});
        th.innerHTML=`Sắp xếp Tên Giảm`
        th.setAttribute("sxTen",false)
    }else{
        // Giảm
        danhsachloc=dsThietbiluutru.sort(function(a, b){return (b.Ten.localeCompare(a.Ten))});
        th.innerHTML=`Sắp xếp Tên Tăng`
        th.setAttribute("sxTen",true)
    }
    Xuat_Thietbiluutru(dsThietbiluutru,Th_Thietbiluutru);
}
const sapxepGia=(th)=>{
    
    let co=th.getAttribute("sxGia");
    let danhsachloc=[];
    if(co=="true"){
        // Tăng
        danhsachloc =dsThietbiluutru.sort(function(a, b){return Number(a.Don_gia_Ban) - Number(b.Don_gia_Ban)});
        th.innerHTML=`Sắp xếp Giá Giảm`
        th.setAttribute("sxGia",false)
    }else{
        // Giảm
        danhsachloc =dsThietbiluutru.sort(function(a, b){return Number(b.Don_gia_Ban) - Number(a.Don_gia_Ban)});
        th.innerHTML=`Sắp xếp Giá Tăng`
        th.setAttribute("sxGia",true)
    }
    Xuat_Thietbiluutru(dsThietbiluutru,Th_Thietbiluutru);
}


const taoNhom = () => {
    dsNhom = Array.from(new Set(dsThietbiluutru.map(x => x.Nhom_Mat_hang.Ma_so))).map(Ma_so => {
        nhom = {
            Ma_so: Ma_so,
            Ten: dsThietbiluutru.find(x => x.Nhom_Mat_hang.Ma_so == Ma_so).Nhom_Mat_hang.Ten
        }
        return nhom
    })

    dsNhom.unshift({ Ma_so: 'ALL', Ten: 'Tất cả' }) // Thêm vào mảng tại vị trí đầu
}

const XuatNhom = (dsNhom, The_hien) => {
    let html = ``;
    dsNhom.forEach(nhom => {
        html += `
        <button class="btn btn-sm btn-primary" id='${nhom.Ma_so}' onclick=XuatThietbiluutruTheoNhom('${nhom.Ma_so}')>${nhom.Ten}</button>
        `
    })
    The_hien.innerHTML = html;
}

const XuatThietbiluutruTheoNhom = (Ma_nhom) => {
    let dsNut=document.getElementsByClassName("activeNut");
    dsNut[0].classList.remove("activeNut");
    document.getElementById(`${Ma_nhom}`).classList.add("activeNut");
    if (Ma_nhom == "ALL") {
        //Xuat_Tivi(dsTivi, Th_Tivi)
        dsThietbiluutru=dsGoc;
    } else {
        //let tmp = dsTivi.filter(tivi => tivi.Nhom_Tivi.Ma_so == Ma_nhom);
        //Xuat_Tivi(tmp, Th_Tivi)
        dsThietbiluutru=dsGoc.filter(thietbiluutru => thietbiluutru.Nhom_Mat_hang.Ma_so == Ma_nhom);
    }
    Xuat_Thietbiluutru(dsThietbiluutru, Th_Thietbiluutru)
}

const Xuat_Thietbiluutru=(ds,tag)=>{
    let html=``;
    ds.forEach(item=>{
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
                                <a class="btn btn-outline-dark mt-auto" href="javaScript:void(0)" onclick="AddtoCart('${item.Ma_so}',1)" >Add to Cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
        `
    })

    tag.innerHTML=html;

}

const KeyCode=(event)=>{
    if (event.keyCode == 13) {
        let gt = event.target.value
        console.log(gt)
        dsCamera = dsGoc.filter(x => x.Ten.toLowerCase().includes(gt.toLowerCase()))
        Xuat_Thietbiluutru(dsThietbiluutru, Th_Thietbiluutru)
    }
}