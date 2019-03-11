const timeConverterForArray = (array) => {

    return array.map(articleRow => {
        newObj = {
            title: articleRow.title,
            topic: articleRow.topic,
            author: articleRow.author,
            body: articleRow.body,
            created_at: new Date(articleRow.created_at),
        }

        if (articleRow.votes) newObj.votes = articleRow.votes
        return newObj
    }) 
/*
    return array.map(row => {
        newObj = row
        newObj.created_at = new Date(row.created_at)
        return newObj;
    })  */
}


module.exports = timeConverterForArray;