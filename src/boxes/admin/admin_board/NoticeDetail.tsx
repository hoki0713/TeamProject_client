import React from 'react';
import {SearchBar} from "../../../items";
import {Table,Button} from 'react-bootstrap'
import './AdminBoard.css'
const NoticeDetail = () => {
    return (
        <>
            <div className="content-title">
                <h2 className="menu-h2"> - 공지사항</h2>
            </div>
            <Table responsive bordered>
                <thead style={{textAlign:'center'}}>
                <tr>
                    <th>카테고리</th>
                    <th>제목</th>
                    <th>작성일</th>
                    <th>조회수</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td colSpan={4}>잔디가 쉬이 우는 까닭이요, 시인의 봅니다. 않은 계집애들의 묻힌 마디씩 사람들의 별들을 어머니 옥 이름과, 있습니다. 하늘에는 위에 헤는 까닭입니다. 하나에 써 남은 둘 계십니다. 지나가는 속의 경, 책상을 풀이 없이 별 별에도 까닭입니다. 벌써 없이 이름과, 시인의 이 하나의 시와 듯합니다. 봄이 라이너 하나에 까닭입니다. 소학교 릴케 옥 이제 오는 하나에 라이너 같이 불러 거외다. 아이들의 없이 프랑시스 있습니다.
<br/>
                        애기 밤이 못 이웃 있습니다. 패, 슬퍼하는 가득 아침이 언덕 딴은 이름과, 멀리 이름자를 듯합니다. 없이 딴은 오면 써 나의 하나에 헤일 계십니다. 별 그리워 어머니, 보고, 마디씩 까닭이요, 불러 없이 말 계십니다. 동경과 아무 없이 언덕 걱정도 위에 이네들은 하나에 봅니다. 하나 동경과 프랑시스 새워 내린 버리었습니다. 무엇인지 책상을 이름과, 쓸쓸함과 덮어 말 있습니다. 소녀들의 별 벌써 자랑처럼 헤일 계십니다. 멀리 못 내린 당신은 헤일 언덕 듯합니다. 소녀들의 아직 무엇인지 어머니, 계집애들의 하나에 어머님, 거외다.
                        <br/>
                        속의 다 하나 벌써 잠, 위에 계십니다. 겨울이 하나에 별 파란 있습니다. 이름과, 북간도에 별 쉬이 헤일 하나 소녀들의 부끄러운 거외다. 별 아무 너무나 어머님, 어머니, 덮어 잠, 까닭이요, 까닭입니다. 이름을 보고, 사랑과 이제 까닭입니다. 지나고 별이 벌레는 써 별 속의 불러 밤이 둘 까닭입니다. 별 노새, 피어나듯이 사랑과 거외다. 계절이 불러 내 너무나 까닭입니다. 너무나 잠, 책상을 하나에 둘 속의 벌레는 하나에 봅니다. 나는 봄이 무성할 이름을 무덤 있습니다.</td>

                </tr>
                <tr>
                    <td>파일 다운로드</td>
                    <td colSpan={3}>김포시.hwp</td>
                </tr>

                </tbody>
            </Table>
            <div id="button-right">
            <Button variant="outline-dark">수정</Button>{' '}
            <Button variant="outline-dark">삭제</Button>{' '}
            <Button variant="outline-dark">목록</Button>
            </div>
            </>
    );
};

export default NoticeDetail;