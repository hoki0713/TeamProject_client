import React, {useState} from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker, } from 'react-naver-maps';
import {Table} from 'react-bootstrap'
const MerchanDetail = () => {
    const [location, setLocation]=useState({lat: 37.551191, lng: 126.940970})
    const ncpId = 'lyiy7i7pk0';
    const title ='서강대학교';
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
                    ></Marker>

                </NaverMap>
            </RenderAfterNavermapsLoaded><br/>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </Table>
            <table>
                <tr>
                    <th scope="row">상호명</th>
                    <td></td>
                </tr>
                <tr>
                    <th scope="row">영업분류</th>
                    <td></td>
                </tr>
                <tr>
                    <th scope="row">소속시</th>
                    <td></td>
                </tr>
                <tr>
                    <th scope="row">지번주소</th>
                    <td></td>
                </tr>
                <tr>
                    <th scope="row">도로명주소</th>
                    <td></td>
                </tr>
                <tr>
                    <th scope="row">전화번호</th>
                    <td></td>
                </tr>
                <tr>
                    <th scope="row">등록일자</th>
                    <td></td>
                </tr>
        </table>

</div>
    );
};

export default MerchanDetail;