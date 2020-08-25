import React from 'react';
import { Card,Button } from 'react-bootstrap';

const CommonFooter = () => {
    const date = new Date()

    return (
        <div className={"container"} style={{paddingTop:50, paddingBottom:30}}>
            <Card className={"footer"}>
                <Card.Body>
                    <Card.Title>Team. mobeom</Card.Title>
                    <Card.Text>
                        <table className={"container"}>
                            <thead>
                            <th>members</th>
                            <th>academy</th>
                            <th>detail</th>
                            </thead>
                            <tbody>
                            <tr><td>hojeong</td><td>bitcamp.sinchon</td><td>경기지역화폐 가맹점 정보 제공</td></tr>
                            <tr><td>euna</td><td></td><td>경기지역 화폐 판매</td></tr>
                            <tr><td>hyeyoung</td><td></td><td></td></tr>
                            <tr><td>eunsong</td><td></td><td></td></tr>
                            </tbody>
                        </table>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">{date.toDateString()}</Card.Footer>
            </Card>
        </div>
    );
};

export default CommonFooter;