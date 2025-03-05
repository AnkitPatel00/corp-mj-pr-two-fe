import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import store from './app/store.js'
import {Provider} from "react-redux"
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Sales from './Pages/Sales.jsx'
import Agents from './Pages/Agents.jsx'
import Settings from './Pages/Settings.jsx'
import Reports from './Pages/Reports.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import AddNewLead from './Pages/AddNewLead.jsx'
import LeadLists from './Pages/LeadLists.jsx'
import LeadDetails from './Pages/LeadDetails.jsx'
import AddNewAgent from './Pages/AddNewAgent.jsx'
import AgentView from './Pages/AgentView.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        index: true,
        element:<Dashboard/>
      },
      {
            path: "/leads",
            element:<LeadLists/>
      },
      {
            path: "/leads/:leadId",
            element:<LeadDetails/>
      },
      {
            path: "/leads/add",
            element:<AddNewLead/>
      },
      {
        path: "/sales",
        element:<Sales/>
      },
      {
        path: "/agents",
        element: <Agents />
      },
      {
            path: "/agents/add",
            element:<AddNewAgent/>
      },
      {
            path: "/agents/view/:agentId",
            element:<AgentView/>
      },
      {
        path: "/reports",
        element:<Reports/>
      },
      {
        path: "/settings",
        element:<Settings/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
