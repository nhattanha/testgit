const urlData='http://localhost:8080';
const urlImg='https://res.cloudinary.com/dcosob2je/image/upload/v1/hinh';

const apiCuahang=()=>{
    return new Promise((Ket_qua, Loi) => {
        var Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            var Doi_tuong_Kq = JSON.parse(Xu_ly_HTTP.responseText)
            Ket_qua(Doi_tuong_Kq)
        }
        Xu_ly_HTTP.open("GET", `${urlData}/Cuahang`)
        Xu_ly_HTTP.send()
    })
}
const apiCamera=()=>{
    return new Promise((Ket_qua, Loi) => {
        var Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            var Doi_tuong_Kq = JSON.parse(Xu_ly_HTTP.responseText)
            Ket_qua(Doi_tuong_Kq)
        }
        Xu_ly_HTTP.open("GET", `${urlData}/dsCamera`)
        Xu_ly_HTTP.send()
    })
}
const apiThietbiluutru=()=>{
    return new Promise((Ket_qua, Loi) => {
        var Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            var Doi_tuong_Kq = JSON.parse(Xu_ly_HTTP.responseText)
            Ket_qua(Doi_tuong_Kq)
        }
        Xu_ly_HTTP.open("GET", `${urlData}/dsThietbiluutru`)
        Xu_ly_HTTP.send()
    })
}
const apiPhukien=()=>{
    return new Promise((Ket_qua, Loi) => {
        var Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            var Doi_tuong_Kq = JSON.parse(Xu_ly_HTTP.responseText)
            Ket_qua(Doi_tuong_Kq)
        }
        Xu_ly_HTTP.open("GET", `${urlData}/dsPhukien`)
        Xu_ly_HTTP.send()
    })
}

const apiDathang=(dsDonHang)=>{
    return new Promise((Ket_qua, Loi) => {
        var Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            var Doi_tuong_Kq = JSON.parse(Xu_ly_HTTP.responseText)
            Ket_qua(Doi_tuong_Kq)
        }
        Xu_ly_HTTP.open("POST", `${urlData}/Dathang`)
        Xu_ly_HTTP.send(JSON.stringify(dsDonHang))
    })
}


