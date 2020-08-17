import React, {useState, useEffect, useContext} from 'react';
import { StoreSearchContext } from '../../../../items/context/StoreSearchContext';
import { RenderAfterNavermapsLoaded, NaverMap, Marker, } from 'react-naver-maps';
import {Table} from 'react-bootstrap'
const MerchanDetail = () => {
    const { store } = useContext(StoreSearchContext);
    const [newStore, setNewStore] = useState({});
    const [location, setLocation]=useState({lat: 37.551191, lng: 126.940970})
    const ncpId = 'lyiy7i7pk0';
    const title ='서강대학교';

    useEffect(() => {
        setNewStore(store);
    },[store])


    return (
        <div>
            <RenderAfterNavermapsLoaded
                ncpClientId={ncpId}
                error={<p>Maps Load Error</p>}
                loading={<p>Maps Loading...</p>}
            >
                <NaverMap
                    mapDivId={'find-map'}
                    className="map"
                    defaultCenter={location} // 지도 초기 위치
                    defaultZoom={13} // 지도 초기 확대 배율
                >
                    <Marker
                        position={location}
                        onClick={()=>{alert('알러트이벤')}}
                        title={title}
                        animation={1}
                    />

                </NaverMap>
            </RenderAfterNavermapsLoaded><br/>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>상호명</td>
                    <td>{newStore.storeName}</td>
                </tr>
                <tr>
                    <td>영업분류</td>
                    <td>Jacob</td>
                </tr>
                <tr>
                    <td>소속시</td>
                    <td >Larry the Bird</td>
                </tr>
                <tr>
                    <td>지번주소</td>
                    <td >Larry the Bird</td>
                </tr>
                <tr>
                    <td>도로명주소</td>
                    <td >Larry the Bird</td>
                </tr>
                <tr>
                    <td>전화번호</td>
                    <td >Larry the Bird</td>
                </tr>
                <tr>
                    <td>등록일자</td>
                    <td >Larry the Bird</td>
                </tr>
                </tbody>
            </Table>

        </div>
    );
};

export default MerchanDetail;