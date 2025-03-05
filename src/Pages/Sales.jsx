import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchLeads } from "../features/leads/leadsSlice"
import { Link } from "react-router-dom"

const Sales = () => {


  const [search,setSearch] = useState("")

  const dispatch = useDispatch()

  const { leads } = useSelector((state) => state.leadState)
  
  useEffect(() => {
    
    const query = new URLSearchParams()

    query.set("status","Closed")

dispatch(fetchLeads(query))

  }, [])


  const filteredLeads = leads?.filter((lead)=>lead.name.toLowerCase().includes(search.toLowerCase()))
  

  const SalesList = () => {
    return (
      <div className="row">
        <div className="col-md-6">
           <ol className="list-group list-group-numbered">
        {filteredLeads.length > 0 && filteredLeads.map((lead) => {
          return (
            <li key={lead._id} className="list-group-item d-flex justify-content-between align-items-start">
              <Link className="text-secondary ms-2 me-auto link-underline link-underline-opacity-0" to={`/leads/${lead._id}`}> {lead.name}
             <br/>
                <i className="fa-solid fa-user-large "></i> {lead.salesAgent.name}
                <i class="fa-solid fa-hourglass-end ms-3"></i>  {lead.timeToClose} Days - Priority: {lead.priority}</Link>
            </li>
  )
    })}
      </ol>
        </div>
      </div>
      
    )
  }


  return (
    <>
      <h2 className="display-6 mb-4">Sales</h2>
      <div className="row">
<div className="col-md-4">
 <input className="form-control mb-4" value={search} type="text" placeholder="Search by Lead Name" onChange={(e)=>setSearch(e.target.value)} />
      </div>
      </div>
     
      <SalesList/>
    </>    
  )
}
export default Sales