import React, {useEffect} from 'react';
import axios from 'axios'
const CateList = (props) => {
    useEffect(()=>{
        if(props.steps.cateIn.value){
            axios.get(``)
                .then(({data})=>{
                    console.log(data);
                })
                .catch(err=>{throw err})
        }
    },[])
    return (
        <div>
            
        </div>
    );
};

export default CateList;