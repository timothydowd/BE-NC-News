const timeConverterForArticles = (array) => {

    return array.map(articleRow => {
        /*newObj = {
            title: articleRow.title,
            topic: articleRow.topic,
            author: articleRow.author,
            body: articleRow.body,
            created_at: new Date(articleRow.created_at),
        } 

        if (articleRow.votes) newObj.votes = articleRow.votes
        */
       newObj = articleRow
       newObj.created_at = new Date(articleRow.created_at)

        return newObj
    }) 
}

const timeConverterForComments = (array) => {

    return array.map(commentRow => {
        newObj = commentRow
        newObj.created_at = new Date(commentRow.created_at)
    
        return newObj
    }) 
}
const timeConverter = (array) => {

    return array.map(row => {
        newObj = row
        newObj.created_at = new Date(row.created_at)
    
        return newObj
    }) 
}



module.exports = { timeConverterForArticles, timeConverterForComments, timeConverter }