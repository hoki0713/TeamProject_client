import * as React from 'react';
import { MapImage } from '../../items';
import { useHistory } from 'react-router-dom';

const pointArray: object = {
  "연천군": "226, 57, 327, 169 ",
  "포천시": "338, 145, 417, 224",
  "파주시": "111, 195, 214, 299",
  "동두천시": "278, 199, 334, 237",
  "양주시": "241, 244 ,298, 302",
  "의정부시": "267, 315 ,319, 345",
  "가평군": "426, 250 , 530, 343",
  "고양시": "150, 349 , 214, 401",
  '김포시': "36, 333 , 107, 396",
  '남양주시': "341, 343, 427, 408",
  '구리시': "303, 405 , 341, 432",
  '하남시': "341, 448 , 381, 470",
  '양평군': "472, 432 , 599, 515",
  '광주시': "370, 498 , 450, 562",
  '여주시': "530, 548 , 619, 654",
  '이천시': "460, 617 , 512, 684",
  '용인시': "336, 605 , 422, 696",
  '안성시': "353, 728 , 467, 796",
  '평택시': "222, 740 , 301, 804",
  '화성시': "170, 642 , 241, 728",
  '수원시': "246, 589 , 289, 624",
  '오산시': "273, 664 , 313, 698",
  '안산시': "164, 565 , 208, 594",
  '군포시': "213, 555 , 244, 576",
  '의왕시': "248, 541 , 274, 565",
  '안양시': "212, 518 , 249, 539",
  '과천시': "245, 493 , 281, 514",
  '부천시': "143, 457 , 177, 483",
  '광명시': "185, 484 , 225, 508",
  '성남시': "298, 514 , 336, 548",
  '시흥시': "146, 524 , 192, 552"
}


const MainMap = () => {

  const history = useHistory();

  return (
    <div className="container map">
      <MapImage />
      <map name="mainMap" id="mainMap">
        {Object.entries(pointArray).map(([key, value]) =>

          <area style={{cursor:"pointer"}} shape="rect" coords={value} alt={key}
            onClick={() => {
              sessionStorage.setItem("location", key);
              history.push("/find-by-map")
            }} />

        )}
      </map>
    </div>
  );
}

export default MainMap;



