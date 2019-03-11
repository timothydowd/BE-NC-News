const createRef = require('./createRef')
const { timeConverter } = require('./timeConverter')

const commentsFormatter = (articles, commentData) => {

    const articleIdTitleRef = createRef(articles, 'title', 'article_id')
    const timeFormatCommentData = timeConverter(commentData)
    
    const commentDataWithArticleId = timeFormatCommentData.map(row => {
      const newCommentRecord = {
        author: row.created_by,
        article_id: articleIdTitleRef[row.belongs_to],
        votes: row.votes,
        created_at: row.created_at,
        body: row.body
      }
      
      return newCommentRecord
    })

    return commentDataWithArticleId

}

module.exports = { commentsFormatter }
