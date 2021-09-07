
function formData(datas: any) {
    let data = new FormData();
    for (let key in datas) {
        data.append(key, datas[key]);
    }
    return data;
}


export default {
    formData
}