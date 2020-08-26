

module.exports = {

    async processTypeRequest(req, res) {
        if (types.indexOf(req.params.type) == -1) {
            return res.status(400).json({message: 'Type not found!'});
        }


    },

    order(itemByTypeList) {
        if (itemByTypeList instanceof Array) {
            return itemByTypeList.sort(item1, item2 => {
                return item1.toLowerCase() > item2.toLowerCase() ? 1 : item1.toLowerCase() < item2.toLowerCase() ? -1 : 0;
            })
        }
        return null;
    },
    
} 