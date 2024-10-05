import {API} from "./api";

const getAll =()=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(API);
        },1);
    });
    //return axiosClient.get(URL,params)
};

export default {getAll};