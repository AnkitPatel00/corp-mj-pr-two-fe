import { useEffect, useState } from "react"
import { useDispatch ,useSelector } from "react-redux"
import { fetchLeads } from "../features/leads/leadsSlice"
import { Link,useSearchParams } from "react-router-dom"
import Loading from "../Component/Loading"

const Dashboard = () => {

  const dispatch = useDispatch()

  const { leads, leadStatus } = useSelector((state) => state.leadState)
  
    console.log(leadStatus)

  const [searchParams, setSearchParams] = useSearchParams();
  
  const queryArray = searchParams.getAll("status")

  const [statusFilter, setStatusFilter] = useState(queryArray);

  useEffect(() => {
    const query = new URLSearchParams();
    statusFilter.forEach((status) => query.append("status", status));
    setSearchParams(query);
  }, [statusFilter]);

  useEffect(() => {
    dispatch(fetchLeads(searchParams.toString()));
  }, [searchParams]);

  const handleFilter = (e) => {
    const { checked, value } = e.target;

    if (checked)
    {
      setStatusFilter((prev)=>[...prev,value])
    }
    else
    {
      setStatusFilter((prev)=>prev.filter((status)=>status!==value))
      }
  };

 const leadsStatus = leads?.map((lead) => lead.status)
  
  const leadsStatusCount = leadsStatus.length > 0 && leadsStatus.reduce((acc,status) => {
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {})

  
  const leadsArrayWithCount = Object.entries(leadsStatusCount).map(([leadStatus, count]) => ({ leadStatus, count }))
  
  const LeadsList = () => {
    return (
      <div className="row my-4 gap-3">
        {
          leads.map((lead) => {
            return (<div className="col-xl-3" key={lead._id}>
              <Link className="link-underline link-underline-opacity-0" to={`/leads/${lead._id}`}>
                <div className="border text-secondary rounded p-3">
                 <h6 ><span className="fs-5">{lead.name}</span> <span className="badge text-bg-secondary fs-7">{lead.status}</span></h6>
                  <i className="fa-solid fa-user me-2"> </i><span>{lead.salesAgent.name}</span>
                </div>
             </Link>
              </div>)
          })
       }
      </div>
    )
  }

  const LeadStatus = () => {
    return (
      <>
        <label className="fs-5">Lead Status:</label>
        <div className="row">
          <div className="col-md-4">

             <ul className="list-group">
{leadsArrayWithCount?.map((lead) => (
  <li key={lead.leadStatus} className="list-group-item d-flex justify-content-between align-items-center">
   <Link to={`/leads?status=${lead.leadStatus}`} className="link-underline text-secondary link-underline-opacity-0">{lead.leadStatus}</Link> 
    <span className="badge text-bg-primary rounded-pill">{lead.count}</span>
        </li>
      ))}
        </ul>
            
          </div>
        </div>
       
      </>
    )
  }

  const Filters = () => {
    return (
      <div>

        <label className="fs-5 form-label">Quick Filters:</label>
        <br/>

        <div className="form-check form-check-inline">
        <input checked={statusFilter.includes("New")} value="New" className="form-check-input" onChange={handleFilter} type="checkbox" id="new"/>
        <label className="form-check-label"  htmlFor="new">New</label>
        </div>

        <div className="form-check form-check-inline">
         <input checked={statusFilter.includes("Contacted")} value="Contacted" className="form-check-input" onChange={handleFilter} type="checkbox" id="contacted"/>
        <label className="form-check-label" htmlFor="contacted">Contacted</label>  
</div>
      </div>
    )
  }


  return (
    <div className="">
      <h2 className="display-6 mb-4">Dashboard</h2>
       <Filters/>
      {leadStatus==="loading" ? <Loading/> : <><LeadsList /> <LeadStatus /></>}

       { leads.length<1 && <h5>No Lead Found</h5>}
     
      <Link to="/leads/add" className="btn btn-primary mt-3">Add New Lead</Link>
      
    </div>
    
  )
}
export default Dashboard