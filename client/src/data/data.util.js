export const convertListToMap = (list) => {
    return list.reduce((acc, restObj) =>{
        acc[restObj.id] = restObj;
        return acc;
    }, {})
}