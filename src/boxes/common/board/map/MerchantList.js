import React, {useContext, useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {StoreSearchContext} from "../../../../items/context/StoreSearchContext";
import {Link} from "react-router-dom";


const MerchantList=()=> {
    const {setStore}=useContext(StoreSearchContext);
    const [state,setState]=useState('시/군');
    const [cate,setCate]=useState('업종');
    const [storeList, setStoreList]=useState([]);
    const [drop1Show, setDrop1Show] = useState(false);
    const [drop2Show, setDrop2Show] = useState(false);
    const [pageNow,setPageNow]=useState(0);
    const [totalCount,setTotalCount]=useState(0);
    const [pageSize]=useState(10);
    const [blockSize]=useState(10);
    const [blockNow,setBlockNow]=useState(0);
    const [blockCount,setBlockCount]=useState(0)
    const [pageEnd,setPageEnd]=useState(0);
    const [pageStart,setPageStart]=useState(0);
    const [rowStart,setRowStart]=useState(0);
    const [pageCount,setPageCount]=useState(0);
    const [rowEnd,setRowEnd]=useState(0);
    const [existPrev, setExistPrev]=useState(0);
    const [existNext,setExistNext]=useState(0);
    const [prevBlock,setPrevBlock]=useState(0);
    const [nextBlock,setNextBlock]=useState(0);
    const [pageList, setPageList]=useState([]);
    const [pageNumArr,setPageNumArr]=useState([]);
    const [trigger,setTrigger]=useState(false);

    const [stateList]=useState(
        ['연천군', '포천시', '파주시', '동두천시', '양주시', '의정부시', '가평군', '고양시',
            '김포시', '남양주시', '구리시', '하남시', '양평군', '광주시', '여주시', '이천시', '용인시', '안성시',
            '평택시', '화성시', '수원시', '오산시', '안산시', '군포시', '의왕시', '안양시', '과천시', '부천시',
            '광명시', '성남시', '시흥시' ]);
    const [cateList]=useState(
        ['숙박업', '여행', '레져용품','가구','건강식품','건축자재','광학제품', '기타','기타의료기관', '농업',
            '레저업소', '문화.취미','병원', '보건위생', '사무통신','서적문구','수리서비스','숙박업','신변잡화','약국','용역 서비스',
            '유통업 영리','음료식품' ]);
    const toggle1 = () => setDrop1Show(prevState => !prevState);
    const toggle2 = () => setDrop2Show(prevState => !prevState);

    const stateCheck=(stateName)=>{
        setState(stateName);
        // getSpecificS();
    };
    const cateCheck=(category)=>{
        setCate(category);
        // getSpecificS();
    };
    function pageNation(){
        setBlockNow(parseInt(pageNow/blockSize));
        setBlockCount(parseInt((pageCount % blockSize != 0) ? pageCount / blockSize +1:pageCount / blockSize));
        setPageEnd(parseInt((blockNow != (blockCount -1)) ? (blockNow+1)*blockSize -1: pageCount - 1));
        setPageStart(parseInt(blockNow *  blockSize));
        setRowStart(parseInt(pageNow*pageSize));
        setPageCount(parseInt((totalCount % pageSize != 0) ? (totalCount / pageSize +1) :(totalCount / pageSize )));
        setRowEnd(parseInt((pageNow != (pageCount -1)) ? (pageNow+1)*pageSize-1:totalCount-1));
        setExistPrev(parseInt(blockNow!=0));
        setExistNext( parseInt(blockNow !=(blockCount-1)));
        setNextBlock(pageStart + blockSize);
        setPrevBlock(pageStart - blockSize);
    }

    function setPageNums() {
        let pageNumArr=[];
        let startNum=0;
        for(let i=pageStart;i<nextBlock;i++){
            pageNumArr[startNum]=i;
            startNum++;
        }
        setPageNumArr(pageNumArr);

    }


    useEffect(()=>{
        axios.get(`http://localhost:8080/stores/getSome/""/""/${pageNow}/${blockSize*pageSize}`)
            .then(({data})=>{
                setStoreList(data.list);
                setTotalCount(data.count);
                let startNum =0;
                let tmpArr =[];
                for(let i=rowStart;i<rowStart+pageSize;i++){
                    tmpArr[startNum]=data.list[i];
                    startNum++;
                }
                setPageList(tmpArr);
            })
            .catch(err=>{console.log(err);throw err;})
    },[blockNow]);
    useEffect(()=>{
       pageNation();
    },[pageNow,totalCount]);
    useEffect(()=>{
        if(totalCount!=0){
        let startNum =0;
        let tmpArr =[];
        for(let i=rowStart;i<rowStart+pageSize;i++){
            tmpArr[startNum]=storeList[i];
            startNum++;
        }
        setPageList(tmpArr);}
    },[rowStart]);

    useEffect(()=>{
        setPageNums();
    },[pageList]);



    return (
        <div className="container" id={"merchan_list"}>
            <Table striped bordered hover className="list_table">
                {/*<thead>*/}
                {/*<tr>*/}
                {/*    <th></th>*/}
                {/*    <th></th>*/}
                {/*    <th/>*/}
                {/*    <th>*/}
                {/*        <Dropdown isOpen={drop1Show} toggle={toggle1}>*/}
                {/*            <DropdownToggle>*/}
                {/*                {state} <select/>*/}
                {/*            </DropdownToggle>*/}
                {/*            <DropdownMenu*/}
                {/*                modifiers={{*/}
                {/*                    setMaxHeight: {*/}
                {/*                        enabled: true,*/}
                {/*                        order: 890,*/}
                {/*                        fn: (data) => {*/}
                {/*                            return {*/}
                {/*                                ...data,*/}
                {/*                                styles: {*/}
                {/*                                    ...data.styles,*/}
                {/*                                    overflow: 'auto',*/}
                {/*                                    maxHeight: '100px',*/}
                {/*                                },*/}
                {/*                            };*/}
                {/*                        },*/}
                {/*                    },*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                {stateList.map((state)=>(*/}
                {/*                    <DropdownItem onClick={()=>{stateCheck(state)}}>{state}</DropdownItem>))}*/}

                {/*            </DropdownMenu>*/}
                {/*        </Dropdown>*/}
                {/*    </th>*/}
                {/*    <th>*/}
                {/*            <Dropdown isOpen={drop2Show} toggle={toggle2}>*/}
                {/*                <DropdownToggle>*/}
                {/*                    {cate} <select/>*/}
                {/*                </DropdownToggle>*/}
                {/*                <DropdownMenu*/}
                {/*                    modifiers={{*/}
                {/*                        setMaxHeight: {*/}
                {/*                            enabled: true,*/}
                {/*                            order: 890,*/}
                {/*                            fn: (data) => {*/}
                {/*                                return {*/}
                {/*                                    ...data,*/}
                {/*                                    styles: {*/}
                {/*                                        ...data.styles,*/}
                {/*                                        overflow: 'auto',*/}
                {/*                                        maxHeight: '100px',*/}
                {/*                                    },*/}
                {/*                                };*/}
                {/*                            },*/}
                {/*                        },*/}
                {/*                    }}*/}
                {/*                >*/}
                {/*                    {cateList.map((category)=>(<DropdownItem onClick={()=>cateCheck(category)}>{category}</DropdownItem>))}*/}
                {/*                </DropdownMenu>*/}
                {/*            </Dropdown>*/}
                {/*        </th>*/}
                {/*    <th/>*/}
                {/*</tr>*/}
                {/*</thead>*/}

                <tbody>
                <tr>
                    <td>#</td>
                    <td>등록번호</td>
                    <td>가게명</td>
                    <td>가게주소</td>
                    <td>업종</td>
                </tr>


                {pageList.map((store,i)=>(
                        <tr>
                            <td></td>
                            <td>{store.id}</td>
                            <td><Link to={'/storeDetail'} onClick={()=>setStore(store)}>{store.storeName}</Link> </td>
                            <td>{store.address}</td>
                            <td>{store.storeType}</td>
                        </tr>
                    )
                )}


                </tbody>
            </Table>
            <table className={"paging"}>
                <tr>
                    <td onClick={()=>{if(pageNow!==1){setPageNow(pageNow-1)}}}>{"<"}</td>


                            {pageNumArr.map((num)=>(<td onClick={()=>setPageNow(num)}>&nbsp;{num+1}</td>))}


                    <td onClick={()=>{if(pageNow!==pageEnd){setPageNow(pageNow+1)}}}>&nbsp;{">"}</td>
                </tr>
            </table>

        </div>
    );
}

export default MerchantList;