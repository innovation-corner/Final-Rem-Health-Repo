module.exports = {
    async selectState(code){
        switch(code){
            case '*384*3086#' :
                return {code:'IM', state: 'Imo'}
        }
    },

    async selectCode(state){
        switch(state){
            case 'Imo' :
                return {code:'IM', state: 'Imo'}
        }
    },
}