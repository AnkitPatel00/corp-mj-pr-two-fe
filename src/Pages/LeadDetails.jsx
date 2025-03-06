import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { fetchLeadById } from "../features/leads/leadsSlice"
import { addComments, fetchComments } from "../features/leadComments/leadCommentSlice"
import Loading from "../Component/Loading"

const LeadDetails = () => {



  const { leadId } = useParams()
  
  const dispatch = useDispatch()

  const {leadById,leadStatus} = useSelector((state)=>state.leadState)
  const {comments,fetchCommentStatus,addCommentStatus} = useSelector((state)=>state.commentState)

  useEffect(() => {
    dispatch(fetchLeadById(leadId))
    dispatch(fetchComments(leadId))
  }, [])



  
  const LeadInfo = () => {
    return (
      <>
        {leadById && <div>
          
          <p><strong>Lead Name: </strong>{leadById.name}</p>
          <p><strong>Sales Agent: </strong>{leadById.salesAgent.name}</p>
          <p><strong>Lead Source: </strong>{leadById.source}</p>
          <p><strong>Lead Status: </strong>{leadById.status}</p>
          <p><strong>Priority: </strong>{leadById.priority}</p>
          <p><strong>Time to Close: </strong>{leadById.timeToClose}</p>

          <Link to="/leads/add" state={leadById && leadById} className="btn btn-primary">Edit Lead</Link>
        </div>}
      </>
    )
  }

 

  const Comments = () => {
    return  (
      <div className="my-3">
        <h5>Comments: </h5>
        {
          comments.length > 0 && comments.map(({_id,author,commentText,createdAt}) => {
            return <div key={_id}>
              <strong>{author.name} ( {new Date(createdAt).toLocaleString()} ) </strong>
              <p>{commentText}</p></div>
          })
      }
      </div>
    )
  }

 

  const AddNewComment = () => {
    const [comment, setComment] = useState("") 
    
    const handleComment = () => {
      
      const commentData = {
        lead: leadId,
        commentText:comment
      }

    dispatch(addComments(commentData))
  }

    return (
      <div className="row">
<div className="col-4">
        <input type="text" className="form-control mb-2" value={comment} placeholder="comment" onChange={(e)=>setComment(e.target.value)} required/>
        <button className={`btn btn-${addCommentStatus==="loading"?"info":"primary"}`} onClick={handleComment}>{addCommentStatus==="loading"? "adding Comment..." :"add comment"}</button>
      </div>
      </div>
    )
  }


   if (fetchCommentStatus === "loading" || leadStatus === "loading")
  {
     return (
      <Loading/>
    )
  }


  return (
    <>
      <h2 className="display-6">Lead Details : {leadById && leadById.name}</h2>
      <LeadInfo />
      <Comments />
      <AddNewComment />
    </>
  )
}

export default LeadDetails