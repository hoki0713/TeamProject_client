import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import {StoreChatbot} from "./chatbotComponents/index";


// all available props
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
let arr = [];

const MyChatBot = () => (
    <ThemeProvider theme={theme}>
        <ChatBot
            floating = {true}
            headerTitle = {'지역화폐 가맹점 정보 서비스'}
            enableSmoothScroll = {true}
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
                        { value: 1, label: '가맹점 찾기' ,trigger:'storeQ'},
                        { value: 2, label: '내게 맞는 정책 찾기', trigger: 'policyQ' },
                        { value: 3, label: '내게 맞는 가맹점', trigger: 'recoInfo' },
                    ],
                },
                {
                    id: 'storeQ',
                    message: '찾고자 하는 가맹점 이름이 무엇인가요?',
                    trigger: 'storeIn',
                },
                {
                    id:'storeIn',
                    user:true,
                    trigger: 'storeList'
                },
                {
                    id: 'storeList',
                    component: <StoreChatbot/>,
                    trigger: '1'
                },
                {
                    id: 'policyQ',
                    message: '정책관련 질문??',
                    trigger: 'policyIn'
                },
                {
                    id: 'policyIn',
                    user:true,
                    trigger: 'policyInfo'
                },
                {
                    id: 'policyInfo',
                    component: <>{'정책정보'}</>,
                    trigger: '1'
                },
                {
                    id: 'recoInfo',
                    component: <>{"유저기반 추천가맹점들"}</>,
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
                        { value: 1, label: '업종 별로 보기' ,trigger:'cateQ'},
                        { value: 2, label: '우리 시 전체 순위 100 보기', trigger: 'storeRank'},
                        { value: 3, label: '돌아가기', trigger: '1'},
                    ],
                },
                {
                    id: 'cateQ',
                    message: '원하는 업종이 무엇입니까?',
                    trigger: 'cateIn'
                },
                {
                    id: 'cateIn',
                    user:true,
                    trigger: 'cateList'
                },
                {
                    id: 'cateList',
                    component: <>{"업종별 리스트"}</>,
                    trigger: 'selectReco'
                },
                {
                    id:'storeRank',
                    component: <>{"전체순위100"}</>,
                    trigger: 'selectReco'
                }

            ]}
        />
    </ThemeProvider>

);

export default MyChatBot;