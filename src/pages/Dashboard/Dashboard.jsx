import 'react';
import Sidebar from '../Sidebar/Sidebar';

function Dashboard() {

    return(
        <div>
            <Sidebar>
                <h1 className="text-slate-200 p-1 font-bold">Dashboard</h1>
                <div className="p-2 border-b border-gray-800" />
            </Sidebar>
            
        </div>
    )
}

export default Dashboard;