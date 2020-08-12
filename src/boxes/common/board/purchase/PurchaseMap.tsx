import React from 'react';
import PurchaseMapImg from "../../../../items/PurchaseMapimg";
import './goyang.png'

const pointArray: object = {
    "연천군": "180, 51, 238, 95",
    "포천시": "257, 90, 308, 135",
    "파주시": "83, 123, 156, 174",
    "동두천시": "211, 115, 235, 132",
    "양주시": "184, 149, 217, 170",
    "의정부시": "205, 179 ,235, 194",
    "가평군": "321, 138, 374, 182",
    "고양시": "113, 205, 151, 225",
    '김포시': "33, 197, 73, 228",
    '남양주시': "260, 195, 313, 230",
    '구리시': "222, 237, 254, 250" ,
    '하남시': "256, 261, 282, 276" ,
    '양평군': "352, 259, 446, 294",
    '광주시': "280, 290 , 327, 323",
    '여주시': "403, 325, 452, 373",
    '이천시': "347, 363, 380, 389",
    '용인시': "254, 358, 300, 389",
    '안성시': "272, 429, 320, 464",
    '평택시': "166, 442, 225, 468",
    '화성시': "134, 378, 182, 420",
    '수원시': "185, 346, 211, 364",
    '오산시': "204, 388, 227, 404",
    '안산시': "129, 330, 154, 343",
    '군포시': "160, 326, 180, 338",
    '의왕시': "186, 316, 202, 328",
    '안양시': "161, 306, 180, 313",
    '과천시': "183, 289, 208, 304",
    '부천시': "101, 270, 130, 281",
    '광명시': "141, 285, 162, 295",
    '성남시': "223, 301, 250, 317",
    '시흥시': "112, 310, 140, 321"
}

const localPayImgArray: object = {
    "연천군": "https://res.cloudinary.com/tinaland/image/upload/v1597123689/local_pay_img/yeonchun_rzkjie.png",
    "포천시": "https://res.cloudinary.com/tinaland/image/upload/v1597123689/local_pay_img/pocheon_grwlqp.png",
    "파주시": "https://res.cloudinary.com/tinaland/image/upload/v1597123689/local_pay_img/pajoo_ny1tpb.png",
    "동두천시": "https://res.cloudinary.com/tinaland/image/upload/v1597123687/local_pay_img/dongduchun_ykxgqk.png",
    "양주시": "https://res.cloudinary.com/tinaland/image/upload/v1597123689/local_pay_img/yangjoo_dqzuun.png",
    "의정부시": "https://res.cloudinary.com/tinaland/image/upload/v1597123687/local_pay_img/eejungbu_didptv.png",
    "가평군": "https://res.cloudinary.com/tinaland/image/upload/v1597123687/local_pay_img/gapyeong_vxv07g.png",
    "고양시": "https://res.cloudinary.com/tinaland/image/upload/v1597123688/local_pay_img/goyang_bhrktb.png",
    '김포시': "https://res.cloudinary.com/tinaland/image/upload/v1597123687/local_pay_img/gimpo_hhh3zl.png",
    '남양주시': "https://res.cloudinary.com/tinaland/image/upload/v1597123688/local_pay_img/namyangjoo_nnc7lz.png",
    '구리시': "https://res.cloudinary.com/tinaland/image/upload/v1597123688/local_pay_img/goori_buqams.png" ,
    '하남시': "https://res.cloudinary.com/tinaland/image/upload/v1597123688/local_pay_img/hanam_awrfgy.png" ,
    '양평군': "https://res.cloudinary.com/tinaland/image/upload/v1597123689/local_pay_img/yangpyung_w5qd5c.png",
    '광주시': "https://res.cloudinary.com/tinaland/image/upload/v1597123688/local_pay_img/gwangjo_dhel14.png",
    '여주시': "https://res.cloudinary.com/tinaland/image/upload/v1597123690/local_pay_img/yeojoo_bjxwgw.png",
    '이천시': "https://res.cloudinary.com/tinaland/image/upload/v1597123687/local_pay_img/eechun_utitz1.png",
    '용인시': "https://res.cloudinary.com/tinaland/image/upload/v1597123689/local_pay_img/yongin_h5fgua.png",
    '안성시': "https://res.cloudinary.com/tinaland/image/upload/v1597123687/local_pay_img/ansung_dkytiu.png",
    '평택시': "https://res.cloudinary.com/tinaland/image/upload/v1597123689/local_pay_img/pyeongtaeck_y2qkta.png",
    '화성시': "https://res.cloudinary.com/tinaland/image/upload/v1597123688/local_pay_img/hwasung_yinrdf.png",
    '수원시': "https://res.cloudinary.com/tinaland/image/upload/v1597123689/local_pay_img/soowon_zq93og.png",
    '오산시': "https://res.cloudinary.com/tinaland/image/upload/v1597123688/local_pay_img/osan_z7qc2k.png",
    '안산시': "https://res.cloudinary.com/tinaland/image/upload/v1597123687/local_pay_img/ansan_nrcceo.png",
    '군포시': "https://res.cloudinary.com/tinaland/image/upload/v1597123688/local_pay_img/goonpo_lmjqcj.png",
    '의왕시': "https://res.cloudinary.com/tinaland/image/upload/v1597123687/local_pay_img/eewang_apkqrj.png",
    '안양시': "https://res.cloudinary.com/tinaland/image/upload/v1597123687/local_pay_img/anyang_oyi9kc.png",
    '과천시': "https://res.cloudinary.com/tinaland/image/upload/v1597123688/local_pay_img/gwacheon_umuilq.png",
    '부천시': "https://res.cloudinary.com/tinaland/image/upload/v1597123687/local_pay_img/buchun_mmwsty.png",
    '광명시': "https://res.cloudinary.com/tinaland/image/upload/v1597123688/local_pay_img/gwangmyeong_ryinfs.png",
    '성남시': "https://res.cloudinary.com/tinaland/image/upload/v1597128024/local_pay_img/sungnam_sbiax0.png",
    '시흥시': "https://res.cloudinary.com/tinaland/image/upload/v1597127960/local_pay_img/siheung_cdnwq4.png"
}


function PurchaseMap({setImgsrc, setLocalName}) {
    return (
        <div>
            <PurchaseMapImg/>
            <map name="purchaseMap" id="purchaseMap">
                {Object.entries(pointArray).map(([key,value])=>
                    <area shape="rect" coords={value} alt={key} onClick={()=>
                    {setImgsrc(localPayImgArray[key]); setLocalName(key)}}/>)}
            </map>
        </div>
    );
};
export default PurchaseMap;