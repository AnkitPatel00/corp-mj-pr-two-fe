import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAgent = createAsyncThunk("fetch/agent",async() => { 
  try {
     const response = await axios("http://localhost:3000/api/agents")
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
     const response = await axios(`http://localhost:3000/api/agents/${agentId}`)
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
     const response = await axios.post("http://localhost:3000/api/agents",agentData)
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
    agentError:"null",
    addAgentStatus:"idle",
    addAgentError:"null"
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
       state.agentStatus ="loading"
     })
     builder.addCase(fetchAgentById.fulfilled, (state,action) => {
       state.agentStatus = "success"
       state.agent = action.payload
     })
     builder.addCase(fetchAgentById.rejected, (state,action) => {
       state.agentStatus = "reject"
       state.agentError = action.error.message
     })


  }
})

export default agentsSlice.reducer
