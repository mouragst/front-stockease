import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Pagina404 from './pages/Pagina404/Pagina404';
import Dashboard from './pages/Dashboard/Dashboard';

// ROTAS DE CADASTRO
import CadastroFornecedor from './pages/Cadastro/CadastroFornecedor';

function AppRoutes() {
    return (
        <Router basename="/">
            <Routes>
                <Route path='/' element={<Navigate to="/login" />} />
                <Route path='/login' element={<Login />} />

                <Route path='/dashboard' element={<Dashboard />} />

                {/** ROTAS DE CADASTRO */}
                <Route path='/cadastro/fornecedor' element={<CadastroFornecedor />} />

                <Route path='*' element={<Pagina404 />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;