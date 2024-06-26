import { useState, useEffect } from "react"
import { getArticleById, patchVote } from "../../api"
import { useParams } from "react-router-dom"
import Comments from "./Comments"
import LoadingWheel from "./LoadingWheel"
import ErrorHandling from "./ErrorHandling"

export default function SingleArticleCard(){

    const {article_id} = useParams()
    const [article, setArticle] = useState([])
    const [voteChange, setVoteChange] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleVote = (vote) => {
        patchVote(article_id, vote);
        setVoteChange(vote)
    }
    
    useEffect(() => {
        setIsLoading(true)
        getArticleById(article_id)
        .then((articleData) => {
            
            const splitDate = articleData.data.created_at.split("T")
            articleData.data.created_at = splitDate[0].split("-").reverse().join("-")
            setArticle(articleData.data)
            setIsLoading(false)
        })
        .catch((err) => {
            setError(err)
            setIsLoading(false)
          })
    }, [article_id])

    if (error) {
        return <ErrorHandling error={error}/>
    }
    
    return isLoading ? (
        <LoadingWheel/>
    ) 
    :
    (
        <ul className="singleArticlePage">
            <div className="singleArticleCard">
        <div className="image2">
        <img className="imageb2" src={article.article_img_url} alt="no image"/>
        </div>
        <div className="article-title2">
        <h4>{article.title}</h4>
        </div>
        <br>
        </br>
        <div className="body-text">
            <p className="body-text">{article.body}</p>
            </div>
        <br>
        </br>
        <div className="info2">
            <div className="vertical">
        <p>Topic: {article.topic}</p>
        <br></br>
        <p>posted by: {article.author}</p>
        <br></br>
            <p>posted: {article.created_at}</p>
            </div>
        <div className="vote">
        <button disabled={voteChange === 1} onClick ={() => handleVote(1)}>⇞</button>
        <div>Votes
        <p>{article.votes + voteChange}</p>
        <button disabled={voteChange === -1}onClick ={() => handleVote(-1)}>⇟</button>
        </div>
        </div>
        </div>
        </div>
        <div className='comments'>Comment count:
            <p>{article.comment_count}</p>
            <Comments/>
            </div>
    </ul>

    )
}