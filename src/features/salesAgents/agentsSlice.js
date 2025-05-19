import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const apiURl= "https://anvayacrm-be.vercel.app"

export const fetchAgent = createAsyncThunk("fetch/agent",async() => { 
  try {
     const response = await axios(`${apiURl}/api/agents`)
    return response.data 
  }
  catch (error)
  {
    if (error.response)
    {
      throw new Error(error.response.data.error)
    }
    else {
      throw new Error(error.message)   
    }
  }
})

export const fetchAgentById = createAsyncThunk("fetch/agentbyId",async(agentId) => { 
  try {
     const response = await axios(`${apiURl}/api/agents/${agentId}`)
    return response.data 
  }
  catch (error)
  {
    if (error.response)
    {
      throw new Error(error.response.data.error)
    }
    else {
      throw new Error(error.message)   
    }
  }
})


export const addAgent = createAsyncThunk("add/agent",async(agentData) => {
  
  try {
     const response = await axios.post("${apiURl}/api/agents",agentData)
    return response.data 
  }
  catch (error)
  {
    if (error.response)
    {
      throw new Error(error.response.data.error)
    }
    else {
      throw new Error(error.message)   
    }
  }
})

const agentsSlice = createSlice({
  name: "agentState",
  initialState: {
    agents: [],
    agent:null,
    agentStatus:"idle",
    agentError:null,
    agentByIdStatus:"idle",
    agentByIdError:null,
    addAgentStatus:"idle",
    addAgentError:null
  },
  reducers: {
    
  },
  extraReducers: (builder) => {

    builder.addCase(fetchAgent.pending, (state) => {
      state.agentStatus ="loading"
    })
    builder.addCase(fetchAgent.fulfilled, (state,action) => {
      state.agentStatus = "success"
      state.agents = action.payload
      state.addAgentStatus = "idle"
    })
    builder.addCase(fetchAgent.rejected, (state,action) => {
      state.agentStatus = "reject"
      state.agentError = action.error.message
    })

   builder.addCase(addAgent.pending, (state) => {
      state.addAgentStatus ="loading"
    })
    builder.addCase(addAgent.fulfilled, (state,action) => {
      state.addAgentStatus = "success"
      state.agents = [...state.agents, action.payload]
      state.addAgentError = null
    })
    builder.addCase(addAgent.rejected, (state,action) => {
      state.addAgentStatus = "reject"
      state.addAgentError = action.error.message
    })
    
    
    builder.addCase(fetchAgentById.pending, (state) => {
       state.agentByIdStatus ="loading"
     })
     builder.addCase(fetchAgentById.fulfilled, (state,action) => {
       state.agentByIdStatus = "success"
       state.agent = action.payload
       state.agentByIdError = null
     })
     builder.addCase(fetchAgentById.rejected, (state,action) => {
       state.agentByIdStatus = "reject"
       state.agentByIdError = action.error.message
     })


  }
})

export default agentsSlice.reducer
