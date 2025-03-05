import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiURl= "https://anvayacrm-be.vercel.app"

export const fetchComments = createAsyncThunk("fetch/comment", async (leadId) => {
  try {
    const response =await axios(`${apiURl}/api/leads/${leadId}/comments`)

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

export const addComments = createAsyncThunk("add/comment", async (commentData) => {
  try {
    const response =await axios.post(`${apiURl}/api/leads/${commentData.lead}/comments`,commentData)

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


const leadCommentSlice = createSlice({

  name: "commentState",
  initialState: {
    comments: [],
    fetchCommentStatus :"idle",
    fetchCommentError :null,
    addCommentStatus :"idle",
    addCommentError :null,
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    
    builder.addCase(fetchComments.pending, (state) => {
    state.fetchCommentStatus ="loading"
    })
    builder.addCase(fetchComments.fulfilled, (state,action) => {
      state.fetchCommentStatus = "success"
      state.comments = action.payload
    })
    builder.addCase(fetchComments.rejected, (state) => {
    state.fetchCommentStatus ="failed"
    })
    
    builder.addCase(addComments.pending, (state) => {
    state.addCommentStatus ="loading"
    })
    builder.addCase(addComments.fulfilled, (state,action) => {
      state.addCommentStatus = "success"
      state.comments = [...state.comments,action.payload]
    })
    builder.addCase(addComments.rejected, (state,action) => {
      state.addCommentStatus = "failed"
      state.addCommentError = action.error.message
    })

  }

})


export default leadCommentSlice.reducer

