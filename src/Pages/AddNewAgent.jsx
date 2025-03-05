import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addAgent } from "../features/salesAgents/agentsSlice"
import { useNavigate } from "react-router-dom"

const AddNewAgent = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

const {addAgentStatus} = useSelector((state)=>state.agentState)

  const initialState ={name:"",email:""}

  const [formData,setFormData] =useState(initialState)

  const handleFormData = (e) => {
    const { name, value } = e.target
    setFormData((prev)=>({...prev,[name]:value}))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.name && formData.email)
    {
       dispatch(addAgent(formData))
    }

  }

  useEffect(() => {

    if (addAgentStatus === "success")
    {
        navigate("/agents")
    }
    
  },[addAgentStatus])

  return (
    <>
      
      <div className="row">
        <div className="col-md-6">
          
          <form onSubmit={handleSubmit}>

        <label htmlFor="name" className="form-label">Agent Name: </label>
        <input type="text" className="form-control" value={formData.name} name="name" onChange={handleFormData} id="name" required/>

        <label htmlFor="email" className="form-label mt-3">Email Address: </label>
        <input className="form-control" type="email" value={formData.email} name="email" onChange={handleFormData} id="email" required/>
        
        <button className="btn btn-primary mt-3">Create Agent</button>

    </form>

      </div>
      </div>

      
    </>
  )
}
export default AddNewAgent