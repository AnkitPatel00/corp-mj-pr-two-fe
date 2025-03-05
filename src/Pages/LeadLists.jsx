import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { deleteLeads, fetchLeads } from "../features/leads/leadsSlice"
import { fetchAgent } from "../features/salesAgents/agentsSlice"
const LeadLists = () => {

  const dispatch = useDispatch()

  const { leads } = useSelector((state) => state.leadState)

  const { agents } = useSelector((state) => state.agentState)

console.log(leads)

  const [searchParams, setSearchParams] = useSearchParams()
  
  const statusQuery = searchParams.get("status")|| "All"
  const agentQuery = searchParams.get("salesAgent")|| "All"
  const sortDayQuery = searchParams.get("sortByDay")|| "All"

  const [statusFilter, setStatusFilter] = useState(statusQuery)
  const [agentFilter, setAgentFilter] = useState(agentQuery)
  const [sortByDay, setSortByDay] = useState(sortDayQuery)
  const [sortByPriority, setSortByPriority] = useState("")

  const [filteredLeads,setFilteredLeads]= useState(leads||[])

  useEffect(() => {
setSearchParams((prevParams) => {
    const params = new URLSearchParams(prevParams); 

    if (statusFilter !== "All") {
      params.set("status", statusFilter);
    } else {
      params.delete("status");
    }

    if (agentFilter !== "All") {
      params.set("salesAgent", agentFilter);
    } else {
      params.delete("salesAgent");
  }
  
    if (sortByDay !== "All") {
      params.set("sortByDay", sortByDay);
    } else {
      params.delete("sortByDay");
    }

    return params;
  },{ replace: true });

  }, [statusFilter, agentFilter,sortByDay])
  
  useEffect(() => {
    dispatch(fetchAgent())
  }, [])

  useEffect(() => {
    dispatch(fetchLeads(searchParams.toString()))
  }, [searchParams])

useEffect(() => {
  const priorityOrder = { Low: 1, Medium: 2, High: 3 };

  if (sortByPriority === "lowToHigh") {
    setFilteredLeads([...leads].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]));
  } else if (sortByPriority === "highToLow") {
    setFilteredLeads([...leads].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]));
  } else {
    setFilteredLeads(leads);
  }
}, [sortByPriority]);


  

  useEffect(() => {
    setFilteredLeads(leads)
  },[leads])


 const handleClearFilter = () => {
    setStatusFilter("All")
    setAgentFilter("All")
   setSortByDay("All")
   setSortByPriority("")
  }


  const ClearFilter = () => {
    return (
      <div className="d-flex justify-content-end">
      <button className="btn btn-primary" onClick={handleClearFilter}>Clear</button>
      </div>
    )
  }
  
  const LeadList = () => {

    const handleLeadDelete = (leadId) => {
      dispatch(deleteLeads(leadId))
    }

    return (
       <div className="row my-4 gap-3">
        {
          filteredLeads.map((lead) => {
            return (<div className="col-xxl-3" key={lead._id}>

              
              <div className="card">
                
                <div className="card-body">

                  <Link className="link-underline link-underline-opacity-0" to={`/leads/${lead._id}`}>
                <div className="text-secondary">

                      <h6 ><span className="fs-5">{lead.name}</span> <span className="badge text-bg-secondary fs-7">{lead.status}</span></h6>
                      
                      <div className="text">
                      <i className="fa-solid fa-user mx-2"> </i><span>{lead.salesAgent.name}</span>
                      <i className="fa-solid fa-hourglass-end mx-2"></i><span>{lead.timeToClose} Days</span>
                      <br/>
                    <span className="mx-2">Priority: {lead.priority}</span> 
                    </div>
                      </div>
                 
                  </Link>

                   
                   <button className="btn btn-danger btn-sm mt-2" onClick={() => handleLeadDelete(lead._id)}>Delete</button>
                  
                </div>
                
                </div>
              </div>)
          })
       }
      </div>
    )
  }

  const Filter = () => {
    return (

      <>
        
        <div className="row">
          <div className="col-md-6">
            {(searchParams.toString().length > 0 || sortByPriority) && <ClearFilter />}
       </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-3">
            
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
       
        <div className="col-md-3">
          <label className="form-label">Agents:</label>
          <select name="agent" value={agentFilter} className="form-select" onChange={(e)=>setAgentFilter(e.target.value)} required>
          <option value="All">All</option>
          {agents.map((agent) => {
           return <option value={agent._id} key={agent._id}>{agent.name}</option>
          })}
        </select>
        </div>

      </div>

        <div className="row">

                  
          
          <div className="col-md-3">
  <label className="form-label">Sort By Days:</label>
          <select name="sortDay" value={sortByDay} className="form-select" onChange={(e)=>setSortByDay(e.target.value)} required>
          <option value="All">All</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
              
        </select>
        </div>

          <div className="col-md-3">
            <label className="form-label">Sort By Priority:</label>
          <select name="sortPriority" value={sortByPriority} className="form-select" onChange={(e)=>setSortByPriority(e.target.value)} required>
          <option value="">All</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
        </div>
          
        </div>

      </>
      
    )
  }



  
  return (
    <>
      <h2 className="display-6 mb-4">Lead List</h2>

      <Filter />   
      <LeadList />
      
        { leads.length<1 && <h5>No Lead Found</h5>}

      <Link className="btn btn-primary mt-3" to="/leads/add">Add New Lead</Link>
    </>
  )
}

export default LeadLists