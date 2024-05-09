import axios from "axios";

export function getArticles() {
    return axios
    .get("https://h-nc-news-project.onrender.com/api/articles")
    .catch((err) => {
        console.log(err)
    })
}

export function getArticleById(article_id) {
    return axios
    .get(`https://h-nc-news-project.onrender.com/api/articles/${article_id}`)
    .catch((err) => {
    console.log(err)
    })
}

export function getComments(article_id){
    return axios
    .get(`https://h-nc-news-project.onrender.com/api/articles/${article_id}/comments`)
    .catch((err) => {
        console.log(err)
    })
}

export function patchVote(article_id, vote) {
    return axios
    .patch(`https://h-nc-news-project.onrender.com/api/articles/${article_id}`, {inc_votes: vote})
    .catch((err) => {
        console.log(err)
    })
}

export function postComment(article_id, comment) {
    return axios
    .post(`https://h-nc-news-project.onrender.com/api/articles/${article_id}/comments`, {author: "grumpy19", body: comment})
}

export function deleteComment(comment_id) {
    console.log(comment_id)
    return axios
    .delete(`https://h-nc-news-project.onrender.com/api/comments/${comment_id}`)
}

