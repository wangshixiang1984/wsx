
//设置cookie
function setCookie (key, value, expire)
{
    let resultVal, expireTime;
    if (!key) return;
    if ( typeof expire !== 'undefined' ) {
        const isNanExpire = parseFloat(expire);
        if( isNaN(isNanExpire)) throw 'wrong expire time';
        expireTime = new Date().getTime() + isNanExpire * 1000;
    }
    if (typeof value !== 'string') {
        resultVal = JSON.stringify(value)
    } else {
        resultVal = value
    }
    
    window.localStorage.setItem(key, JSON.stringify({data: resultVal, time: expireTime }))
}

function getCookie (key)
{
    let resultVal, curTime = new Date().getTime();
    if (key) {
        resultVal = JSON.parse( window.localStorage.getItem(key) );
        if ( resultVal ) {
            if ( typeof resultVal.time !== 'undefined' && resultVal.time < curTime ) {
                return undefined;
            } else {
                return resultVal.data;
            }
        } else {
            return undefined;
        }
    }
    
}

function clearCookie (key)
{
    if( key ) {
        window.localStorage.removeItem(key)
    } else {
        window.localStorage.clear()
    }
}
// export default comMinx;
export {setCookie, getCookie, clearCookie}