import axios from "axios";

export let storeList=[];
export const storeThunk = loca =>dispatch=>{
    console.log(`storeThunk ${loca}`);
    axios.get(`http://localhost:8080/stores/mapClick/${loca}`)
        .then(({data})=>{
            storeList=[]
            console.log(`1번${data.list[0].latitude},${data.list[0].longitude}`);
            data.list.forEach(elem=>{
                if(elem.latitude!=0) storeList.push(elem);
            });
            console.log(JSON.stringify(storeList[0]));
        })
        .catch(err=>{throw(err)});

}