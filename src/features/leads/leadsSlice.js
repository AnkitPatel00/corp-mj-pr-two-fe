import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const apiURl= "https://anvayacrm-be.vercel.app"

export const fetchLeads = createAsyncThunk("fetch/leads", async (query) => {
  
  try {
     const response = await axios(`${apiURl}/api/leads${query ? `?${query}`:''}`)
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

export const salesLeads = createAsyncThunk("sales/leads", async (query) => {
  
  try {
     const response = await axios(`${apiURl}/api/leads${query ? `?${query}`:''}`)
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

export const fetchLeadById = createAsyncThunk("fetchLead/id", async (leadId) => {
   try {
     const response = await axios(`${apiURl}/api/leads/${leadId}`)
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

export const addLeads = createAsyncThunk('add/leads',async(leadData) => {
  try {
    const response = await axios.post(`${apiURl}/api/leads`, leadData)
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

export const updateLeads = createAsyncThunk('update/leads', async (leadData) => {

  try {
    const response = await axios.put(`${apiURl}/api/leads/${leadData._id}`, leadData)
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

export const deleteLeads = createAsyncThunk('delete/leads', async (leadId) => {

  try {
    const response = await axios.delete(`${apiURl}/api/leads/${leadId}`)
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



const leadsSlice = createSlice({
  name: "leadState",
  initialState: {
    leads: [],
    sales: [],
    leadById:null,
    leadStatus:"idle",
    leadError: null,
    salesStatus:"idle",
    salesError: null,
    addLeadStatus:"idle",
    addLeadError:null,
    updateLeadStatus:"idle",
    updateLeadError:null,
    deleteLeadStatus:"idle",
    deleteLeadError:null
  },
  reducers: {

  },

  extraReducers: (builder) => {

    builder.addCase(fetchLeads.pending, (state) => {
      state.leadStatus ="loading"
    })
    builder.addCase(fetchLeads.fulfilled, (state,action) => {
      state.leadStatus = "success"
       state.updateLeadStatus = "idle"
      state.leads = action.payload
      state.addLeadStatus = "idle"
      state.leadError =null
    })
    builder.addCase(fetchLeads.rejected, (state,action) => {
      state.leadStatus = "reject"
      state.leadError = action.error.message
    })
    
    
    builder.addCase(salesLeads.pending, (state) => {
      state.salesStatus ="loading"
    })
    builder.addCase(salesLeads.fulfilled, (state,action) => {
      state.salesStatus = "success"
       state.updateLeadStatus = "idle"
      state.sales = action.payload
      state.addLeadStatus ="idle"
    })
    builder.addCase(salesLeads.rejected, (state,action) => {
      state.salesStatus = "reject"
      state.salesError = action.error.message
    })
    
    
    builder.addCase(fetchLeadById.pending, (state) => {
      state.leadStatus ="loading"
    })
    builder.addCase(fetchLeadById.fulfilled, (state,action) => {
      state.leadStatus = "success"
      state.updateLeadStatus = "idle"
      state.leadById = action.payload
    })
    builder.addCase(fetchLeadById.rejected, (state,action) => {
      state.leadStatus = "reject"
      state.leadError = action.error.message
    })
    
    builder.addCase(addLeads.pending, (state) => {
      state.addLeadStatus ="loading"
    })
    builder.addCase(addLeads.fulfilled, (state,action) => {
      state.addLeadStatus = "success"
      state.leads = [...state.leads, action.payload]
       state.addLeadError = null
    })
    builder.addCase(addLeads.rejected, (state,action) => {
      state.addLeadStatus = "reject"
      state.addLeadError = action.error.message
    })
    
    builder.addCase(updateLeads.pending, (state) => {
      state.updateLeadStatus ="loading"
    })
    builder.addCase(updateLeads.fulfilled, (state,action) => {
      state.updateLeadStatus = "success"
      const leadIndex = state.leads.findIndex((lead)=>lead._id===action.payload._id)
      state.leads[leadIndex] =action.payload
       state.updateLeadError = null
    })
    builder.addCase(updateLeads.rejected, (state,action) => {
      state.updateLeadStatus = "reject"
      state.updateLeadError = action.error.message
    })
    
    
    builder.addCase(deleteLeads.pending, (state) => {
      state.deleteLeadStatus ="loading"
    })
    builder.addCase(deleteLeads.fulfilled, (state,action) => {
      state.deleteLeadStatus = "success"
      state.leads = state.leads.filter((lead)=>lead._id !== action.payload._id)
       state.deleteLeadError = null
    })
    builder.addCase(deleteLeads.rejected, (state,action) => {
      state.deleteLeadStatus = "reject"
      state.deleteLeadError = action.error.message
    })
    
  }
})

export default leadsSlice.reducer

