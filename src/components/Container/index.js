import {Checkbox} from "antd";
import React, {useState} from "react";
import {useCallback} from "react/cjs/react.production.min";
import Child from "../Child";
const Container = ()=>{

const [obj, setObj] = useState({
    "a": 1,
    "b": 2,
    "c": 3
});

const [forceDeleteAll, setForceDeleteAll] = useState(null);

const onChange = useCallback((key)=>{
    const newObj = {...obj};
    delete newObj[key];
    setObj(newObj)
},[obj,setObj]);

return (<>
    {Object.keys(obj).map((key)=>{
        return (<Child key={key} id={key} forceDeleteAll={forceDeleteAll}/>);
        })}
    <Checkbox onChange={onChange}>Mark all</Checkbox>
</>);
};
export default Container;