import Header from './Component/Header'
import Sidebar from './Component/Sidebar'
import { Outlet } from 'react-router-dom'


function App() {
  return (
    <>
      <Header />

      <div className='container-fluid  py-4'>
         <div className='row mx-5'>

   <div className='col-12 col-lg-2 p-4 border rounded bg-light '>
      <Sidebar/>
          </div>
        
         <div className='col-12 col-lg-10 border rounded p-4'>
        <Outlet/>
        </div>
       
      </div>
      </div>
     
     
    </>
  )
}

export default App
