const comMinx = {
    methods: {
        isObject (value)
        {
            if(value == '') return '';
            return Object.prototype.toString.call(value) === '[object Object]' ? true : false;
        }
    }
}

export default comMinx;