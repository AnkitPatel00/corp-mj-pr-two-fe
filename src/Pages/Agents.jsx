import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchAgent } from "../features/salesAgents/agentsSlice"
import { Link } from "react-router-dom"

const Agents = () => {

  const dispatch = useDispatch()

  const { agents } = useSelector((state) => state.agentState)


    useEffect(() => {
      dispatch(fetchAgent())
    }, [])
  
  
  const AgentList = () => {
    return (
      <ol className="list-group list-group-numbered mb-3">
        {
          agents.length > 0 && agents.map((agent) => {
            return (
              <li key={agent._id} className="list-group-item d-flex justify-content-between align-items-start p-3">
                <div className="ms-2 me-auto">{agent.name} - Email: {agent.email}</div>
                <Link to={`/agents/view/${agent._id}`} className="btn btn-primary btn-sm">View</Link>
                </li>
          )
        })
      }
      </ol>
    )
  }


  return (
    <>
      <h2 className="display-6 mb-4">Sales Agent List</h2>
      <div className="row">
        <div className="col-6">
           <AgentList /> 
</div>
      </div>
    
      <Link to="/agents/add" className="btn btn-primary">Add New Agent</Link>
</>

  )
}
export default Agents