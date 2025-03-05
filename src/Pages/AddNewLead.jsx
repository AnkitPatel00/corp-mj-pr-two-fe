import { useDispatch, useSelector } from "react-redux"
import { fetchAgent } from "../features/salesAgents/agentsSlice"
import { addLeads, updateLeads } from "../features/leads/leadsSlice"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const AddNewLead = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const isUpdateLead = location.state
  
  const { agents } = useSelector((state) => state.agentState)

  const initialState ={name:"",source:"Website",salesAgent:"",status:"New",priority:"High",timeToClose:"",tags:"High Value"}

  const [formData, setFormData] = useState(initialState)
  
  const handleFormValue = (e) => {
    const { value, name } = e.target
    setFormData((prev) => ({...prev, [name]: name === "timeToClose"? parseInt(value):value}))
  }

  console.log(formData)

  useEffect(() => {

    if (isUpdateLead)
    {
const { _id, name, priority, salesAgent, source, status, tags, timeToClose } = isUpdateLead
    setFormData((prev)=>({...prev,_id,name,priority,salesAgent:salesAgent._id,source,status,tags,timeToClose}))
    }

    
    
  },[isUpdateLead])

  const dispatch = useDispatch()

  const { addLeadStatus,addLeadError,updateLeadStatus } = useSelector((state) => state.leadState)
  
  useEffect(() => {
    dispatch(fetchAgent())
  }, [])

  useEffect(() => {
    if (agents.length > 0)
    {
setFormData((prev) =>({...prev, salesAgent: isUpdateLead? isUpdateLead.salesAgent._id : agents[0]._id}))
    }
  }, [agents])
  
  
  useEffect(() => {
    if (addLeadStatus === "success")
    {
setFormData({...initialState, salesAgent: agents[0]._id})
    }
  }, [addLeadStatus])


  const handleSubmit = (e) => {
    e.preventDefault()

    if (isUpdateLead)
    {
      dispatch(updateLeads(formData))
    }
    else {
       if (formData.name && formData.source && formData.salesAgent && formData.status && formData.priority && formData.timeToClose)
    {
dispatch(addLeads(formData))
    }
    }
  }
  
  useEffect(() => {
    if (updateLeadStatus === "success")
    {
      console.log("add lead")
      navigate(`/leads/${isUpdateLead._id}`)
    }
},[updateLeadStatus])
  
  

  return (
    <div className="p-3">
      <h5>{isUpdateLead ? "Update Lead" : "Add New Lead"}</h5>
      <div className="row">

        <div className="col-lg-6">

                <form onSubmit={handleSubmit}>

        <label htmlFor="leadName" className="form-label">Lead Name:</label>
        <input className="form-control mb-2" type="text" value={formData.name} name="name" onChange={handleFormValue} id="leadName" required/>

        <label className="form-label">Lead Source:</label>
        <select name="source" value={formData.source} onChange={handleFormValue}  className="form-select mb-2" required>
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Cold Call">Cold Call</option>
          <option value="Advertisement">Advertisement</option>
          <option value="Email">Email</option>
          <option value="Other">Other</option>
        </select>
        
        <label className="form-label">Sales Agent</label>
        <select name="salesAgent" value={formData.salesAgent} onChange={handleFormValue} className="form-select mb-2" required>
          {agents.map((agent) => {
            return <option value={agent._id} key={agent._id}>{agent.name}</option>
          })}
        </select>

        <label className="form-label">Lead Status:</label>
        <select name="status" value={formData.status} onChange={handleFormValue} className="form-select mb-2" required>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          {isUpdateLead && <option value="Closed">Closed</option>}
        </select>

        <label className="form-label">Priority:</label>
        <select name="priority" value={formData.priority} onChange={handleFormValue} className="form-select mb-2" required>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label  className="form-label">Time to Close</label>
        <input name="timeToClose" value={formData.timeToClose} onChange={handleFormValue} className="form-control mb-2" type="number" placeholder="Number of Days" />
        
        <label className="form-label">Tags:</label>
           <select name="tags" value={formData.tags} onChange={handleFormValue} className="form-select mb-2" required>
          <option value="High Value">High Value</option>
          <option value="Follow-up">Follow-up</option>
        </select>

        {!isUpdateLead? <button className="btn btn-primary mt-3">{addLeadStatus === "loading"?"Saving...":"Submit"}</button>:
        <button className="btn btn-primary mt-3">{addLeadStatus === "loading"?"Saving...":"Update Lead"}</button>}

        {addLeadStatus === "success" && <p className="text-info">Lead added Successfully</p>}
        {addLeadError && <p className="text-danger">{addLeadError}</p>}
        
    </form>


        </div>
        
      </div>

    </div>
  )
}
export default AddNewLead