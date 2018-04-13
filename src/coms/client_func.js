
/* 公共方法 */

function isRightMobile (value)
{
    const reg = /^1(3|4|5|6|7|8)[0-9]{9}$/;
    if (value == '') return '';
    if ( reg.test(value) ) 
    {
        return true;
    }
    return false;
}

function  isRightPassword (value) 
{
    const reg = /^[0-9a-zA-Z_-]{6,}$/;
    if ( value == '' ) return '';
    if ( value.length < 6 ) return -1;
    if ( reg.test(value)) {
        return true;
    }
    return false;
}

function constraintLen (value, length)
{
    const len = length || 11;
    let val = value;
    if ( value.length > len )
    {
        val = value.substr(0, len);
    }
    return val;
}

// export default comMinx;
export {isRightMobile, isRightPassword, constraintLen}