import axios from "axios";
import {normal, hospIcon, chinaIcon, conviStore, drug, cafe, hotelIcon,soju} from "./mapIcons/imgIndex"
export let storeList=[];
export const storeThunk = loca =>dispatch=>{
    console.log(`storeThunk ${loca}`);
    axios.get(`http://localhost:8080/stores/mapClick/${loca}`)
        .then(({data})=>{
            storeList=[]
            console.log(`1번${data.list[0].latitude},${data.list[0].longitude}`);
            data.list.forEach(elem=>{
                switch (elem.storeType) {
                    case "의원": elem.icon = hospIcon; storeList.push(elem); return;
                    case "중국식": elem.icon =chinaIcon; storeList.push(elem); return;
                    case "편의점": elem.icon = conviStore; storeList.push(elem);return;
                    case "약국": elem.icon = drug; storeList.push(elem); return;
                    case "기타음료식품": elem.icon=cafe; storeList.push(elem); return;
                    case "숙박업": elem.icon = hotelIcon; storeList.push(elem); return;
                    case "주점": elem.icon = soju; storeList.push(elem); return;
                    default:elem.icon = normal; storeList.push(elem); return;
                }

            });
            console.log(JSON.stringify(storeList[0]));
        })
        .catch(err=>{throw(err)});

}