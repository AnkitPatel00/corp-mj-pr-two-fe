import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiURl= "https://anvayacrm-be.vercel.app"

export const fetchClosedLead = createAsyncThunk("fetch/closedLead", async () => {
  try {
    const response = await axios(`${apiURl}/api/report/last-week`)
    return response.data
  }
  catch (error) {
    console.log(error)
    if (error.response) {
      throw new Error(error.response.data.error)
    } else {
      throw new Error(error.message)
    }
  }
})

export const fetchPipelineLead = createAsyncThunk("fetch/PipelineLead", async () => {
  try {
    const response = await axios(`${apiURl}/api/report/pipeline`)
    return response.data
  }
  catch (error) {
    console.log(error)
    if (error.response) {
      throw new Error(error.response.data.error)
    } else {
      throw new Error(error.message)
    }
  }
})


const leadReportSlice = createSlice({
  name: "leadReportState",
  initialState: {
    lastWeekClosedLeads: [],
    totalLeadsInPipeline: 0,
    closeLeadStatus: "idle",
    closeLeadError:null,
    pipelineLeadStatus: "idle",
    pipelineLeadError:null
  }, reducers: {
    
  },
  extraReducers: (builder) => {
    
    builder.addCase(fetchClosedLead.pending, (state) => {
      state.closeLeadStatus="loading"
    })
    builder.addCase(fetchClosedLead.fulfilled, (state,action) => {
      state.closeLeadStatus = "success"
      state.lastWeekClosedLeads = action.payload
    })
    builder.addCase(fetchClosedLead.rejected, (state,action) => {
      state.closeLeadStatus = "fail"
      state.closeLeadError =action.error.message
    })
    
    builder.addCase(fetchPipelineLead.pending, (state) => {
      state.pipelineLeadStatus="loading"
    })
    builder.addCase(fetchPipelineLead.fulfilled, (state,action) => {
      state.pipelineLeadStatus = "success"
      state.totalLeadsInPipeline = action.payload
    })
    builder.addCase(fetchPipelineLead.rejected, (state) => {
      state.pipelineLeadStatus = "fail"
      state.pipelineLeadError =action.error.message
    })

  }
})

export default leadReportSlice.reducer
