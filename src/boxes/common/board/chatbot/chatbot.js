import React, {useEffect} from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import {StoreChatbot, PolicyInfo, RankState, RecoStores, StarRank} from "./chatbotComponents/index";




const MyChatBot = ({isLogined}) => {

    const theme = {
        background: '#ffffff',
        fontFamily: '',
        headerBgColor: '#4b93c4',
        headerFontColor: '#fff',
        headerFontSize: '20px',
        botBubbleColor: '#397692',
        botFontColor: '#fff',
        userBubbleColor: '#fff',
        userFontColor: '#4a4a4a',
    };

    return(<ThemeProvider theme={theme}>
        <ChatBot
            floating={true}
            headerTitle={'지역화폐 가맹점 정보 서비스'}
            enableSmoothScroll={true}
            steps={[
                //서비스선택
                {
                    id: '1',
                    message: '원하시는 서비스를 선택해주세요.',
                    trigger: '2',
                },
                {
                    id: '2',
                    options: [
                        {value: 1, label: '가맹점 찾기', trigger: 'storeQ'},
                        {value: 2, label: '내게 맞는 지역화폐 지급 정책', trigger: 'policyQ'},
                        {value: 3, label: '내 주변 추천 가맹점', trigger: 'recoInfo'},
                    ],
                },
                {
                    id: 'storeQ',
                    message: '찾고자 하는 가맹점 이름이 무엇인가요?',
                    trigger: 'storeIn',
                },
                {
                    id: 'storeIn',
                    user: true,
                    trigger: 'storeList'
                },
                {
                    id: 'storeList',
                    component: <StoreChatbot/>,
                    trigger: '1'
                },
                {
                    id: 'policyQ',
                    message: '자녀가 있습니까?',
                    trigger: 'policyOp'
                },
                {
                    id: 'policyOp',
                    options: [
                        {value: '유자녀', label: '자녀있음', trigger: 'policyInfo'},
                        {value: '무자녀', label: '자녀없음', trigger: 'policyInfo'},
                    ],
                },
                {
                    id: 'policyInfo',
                    component: <PolicyInfo isLogined={isLogined}/>,
                    trigger: '1'
                },
                {
                    id: 'recoInfo',
                    component: <RecoStores isLogined={isLogined}/>,
                    trigger: 'recoMsg'
                },
                {
                    id: 'recoMsg',
                    message: '다른 추천을 보시겠습니까?',
                    trigger: 'selectReco'
                },
                {
                    id: 'selectReco',
                    options: [
                        {value: 1, label: '우리 시 전체 별점별 순위 50위 보기', trigger: 'starRank'},
                        {value: 2, label: '우리 시 전체 검색결과량 순위 50위 보기', trigger: 'storeRank'},
                        {value: 3, label: '돌아가기', trigger: '1'},
                    ],
                },
                {
                    id: 'storeRank',
                    component: <RankState isLogined={isLogined}/>,
                    trigger: 'selectReco'
                },
                {
                    id: 'starRank',
                    component:<StarRank isLogined={isLogined}/>,
                    trigger: 'selectReco'
                }

            ]}
        />
    </ThemeProvider>)

};

export default MyChatBot;