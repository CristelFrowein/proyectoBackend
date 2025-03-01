const { getAllProduct } = require('../managers/productManager');  

const getAllProductsController = async (req, res) => {
    try {
        
        const { limit = 10, page = 1, sort = '', query = '' } = req.query;

        
        const result = await getAllProduct({
            limit,
            page,
            sort,
            query
        });

       
        res.json({
            status: 'success',
            payload: result.products,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevLink,
            nextLink: result.nextLink
        });
    } catch (error) {
        
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    getAllProductsController,
};
