import { useParams,Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {  useEffect, useState } from "react"
import { fetchLeads } from "../features/leads/leadsSlice"
import { fetchAgentById } from "../features/salesAgents/agentsSlice"

const AgentView = () => {

  const dispatch = useDispatch()

  const { agentId } = useParams()
  
  const { agent } = useSelector((state) => state.agentState)
  
  const { leads } = useSelector((state) => state.leadState)

  const [statusFilter,setStatusFilter] = useState("All")
  const [priorityFilter,setPriorityFilter] = useState("All")
  const [sortLead,setSortLead] = useState("All")

  useEffect(() => {
    const query = new URLSearchParams()
    query.set("salesAgent",agentId)
    dispatch(fetchLeads(query))
    dispatch(fetchAgentById(agentId))
  }, [])

  const statusFilteredLeads = statusFilter !== "All" ? leads?.filter((lead)=>lead.status === statusFilter) :leads
  const priorityFilteredLeads = priorityFilter !== "All" ? statusFilteredLeads?.filter((lead)=>lead.priority === priorityFilter) :statusFilteredLeads
  const sortFilteredLeads = sortLead !== "All" ? [...priorityFilteredLeads].sort((lead2,lead1)=> sortLead==="lowToHigh" ? lead2.timeToClose-lead1.timeToClose : lead1.timeToClose-lead2.timeToClose) :priorityFilteredLeads


  const Filters = () => {
    return (
      <div className="row mb-4">

        <div className="col-md-6">
           <label className="form-label">Status:</label>
       <select name="status" value={statusFilter} className="form-select" onChange={(e)=>setStatusFilter(e.target.value)} required>
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Closed">Closed</option>
        </select>
</div>
       
        <div className="col-md-6">
          <label className="form-label">Priority:</label>
          <select name="agent" value={priorityFilter} className="form-select" onChange={(e)=>setPriorityFilter(e.target.value)} required>
            <option value="All">All</option>
             <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Sort:</label>
          <select name="agent" value={sortLead} className="form-select" onChange={(e)=>setSortLead(e.target.value)} required>
             <option value="All">Time to Close</option>
             <option value={"lowToHigh"}>Low to High</option>
             <option value={"highToLow"}>High to Low</option>
        </select>
        </div>
        
    </div>
  )
}


  const AgentLeadLists = () => {
    return (
      <ol className="list-group list-group-numbered">
        {leads.length > 0 && sortFilteredLeads.map((lead) => {
          return (
            <li key={lead._id} className="list-group-item d-flex justify-content-between align-items-start">
             <Link className="ms-2 me-auto link-underline link-underline-opacity-0"  to={`/leads/${lead._id}`}> {lead.name} - Status: {lead.status} - Agent: {lead.salesAgent.name} - Close Day : {lead.timeToClose} - Priority: {lead.priority}</Link>
            </li>
  )
    })}
      </ol>
    )
  }

  const NoLeadFound = () => {
    return (
      <>
      <h2 className="display-5">No Lead Found</h2>
      </>
    )
  }

  return (
    <>
      <h2> Lead List by Agent</h2>
      <h5 className="display-5">{agent?.name}</h5>
      <p>Email: {agent?.email}</p>
      <p className="fs-4">Leads:</p>
      <Filters/>
      <AgentLeadLists />
      { sortFilteredLeads.length<1  && <NoLeadFound/>}
    </>
  )
}
export default AgentView