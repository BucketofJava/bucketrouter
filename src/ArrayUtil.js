function arrayEquals(a1, a2){
    try {
    return a1.length==a2.length&&a1.every((v, i) => (v==a2[i]))}
    catch(err){
        console.error(err)
        return null;
    }
}
function includesOther(a1, a2){
    try {
    return a1.some(v => (arrayEquals(v, a2)))}
    catch(err){
        console.error(err)
        return null;
    }
}
export {arrayEquals, includesOther};