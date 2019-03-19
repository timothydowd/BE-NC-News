    
exports.queryFormatter = (req) => {
    const conditions = {}
    let {
        sort_by,
        order
    } = req.query

    if (sort_by !== 'comment_count' && sort_by !== undefined) sort_by = `articles.${req.query.sort_by}`
    if (order !== 'asc' && order !== 'desc' && order !== undefined) next({ code: 'orderErr', detail: 'sort by order must be asc or desc.' });
    
    for (key in req.query) {
        if (key !== 'sort_by' && key !== 'order') {
        conditions[`articles.${key}`] = req.query[key];
        }
    }

    return { conditions, sortBy, order }

}
    

  