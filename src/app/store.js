import { configureStore } from '@reduxjs/toolkit'
import leadReducer from '../features/leads/leadsSlice'
import agentReducer from '../features/salesAgents/agentsSlice'
import commentReducer from '../features/leadComments/leadCommentSlice'
import leadReportReducer from '../features/leadReport/leadReportSlice'

const store = configureStore({
  reducer: {
  leadState:leadReducer,
  commentState:commentReducer,
    agentState: agentReducer,
  leadReportState:leadReportReducer
}
})

export default store