import { useDispatch, useSelector } from "react-redux"
import { fetchClosedLead, fetchPipelineLead } from "../features/leadReport/leadReportSlice"
import { fetchLeads } from "../features/leads/leadsSlice"
import { useEffect, useState } from "react"
import { Pie,Bar } from 'react-chartjs-2' 
import { Chart  } from "chart.js/auto";
import Loading from "../Component/Loading"



const Reports = () => {

  const { lastWeekClosedLeads,closeLeadStatus,pipelineLeadStatus,totalLeadsInPipeline: { totalLeadsInPipeline: pipelineLead } } = useSelector((state) => state.leadReportState)
    const { leads ,leadStatus } = useSelector((state) => state.leadState)

  const dispatch = useDispatch()


  
  useEffect(() => {
    dispatch(fetchClosedLead())
    dispatch(fetchPipelineLead())
    dispatch(fetchLeads())
  }, [])



  const closedLeadsCount = lastWeekClosedLeads?.length || 0;
  const pipelineLeadsCount = pipelineLead || 0;


  const pieData = {
    labels: [`Closed Leads ${closedLeadsCount}`, `Pipeline Leads ${pipelineLead}`],
    datasets: [
      {
        data: [closedLeadsCount, pipelineLeadsCount], // Use values dynamically
        backgroundColor: ["#FF6384", "#36A2EB"], // Colors for slices
      },
    ],
  };

  const salesAgents = [... new Set(lastWeekClosedLeads?.map((lead) => lead.salesAgent.name))]

  const salesAgentClosedLead = salesAgents.reduce((acc, agent) => {
    
    acc[agent] = lastWeekClosedLeads?.filter((lead) => lead.salesAgent.name === agent).length
    
    return acc

  }, {})

  const barData = {
    labels: Object.keys(salesAgentClosedLead),
    datasets: [{
      label:"Sales Agent",
      data: Object.values(salesAgentClosedLead)
    }]
  }

    const leadsStatus = leads?.map((lead) => lead.status)
  
  const leadsStatusCount = leadsStatus.length > 0 && leadsStatus.reduce((acc,status) => {
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {})
  

  const leadData = {
    labels: Object.keys(leadsStatusCount),
    datasets: [{
      label: "Leads",
      data: Object.values(leadsStatusCount)
    }]
  }
  
  if (closeLeadStatus === "loading" || pipelineLeadStatus === "loading" || leadStatus === "loading" )
  {
    return (
      <Loading/>
    )
  }


  return (
    <>
      <h2 className="text-center display-5 mb-4">Report Overview</h2>

      <div className="row">

 <div className="col-md-4">
          <h5 className="d-flex justify-content-center">Leads Overview</h5>
          
          {closedLeadsCount > 0 || pipelineLeadsCount > 0 ? (
        <Pie data={pieData} />
      ) : (
        <p>Loading chart data...</p>
      )}
          
        </div>

        <div className="col-md-8">
           <h5 className="d-flex justify-content-center">Leads Closed By Agents</h5>
<Bar data={barData} />
        </div>


        <div className="col-md-12">
          <h5 className="d-flex justify-content-center">Leads By Status</h5>
          <Bar data={leadData} />
        </div>

        
      </div>

    </>

  )
}
export default Reports

