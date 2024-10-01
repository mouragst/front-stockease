import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Pagina404 from './pages/Pagina404/Pagina404';
import Dashboard from './pages/Dashboard/Dashboard';

// ROTAS DE CADASTRO
import CadastroFornecedor from './pages/Cadastro/CadastroFornecedor';
import CadastroProduto from './pages/Cadastro/CadastroProduto';
import CadastroUnidade from './pages/Cadastro/CadastroUnidade';

// ROTAS DE COMPRAS
import OrdemServico from './pages/Compras/OrdemServico';
import PedidoCompra from './pages/Compras/PedidoCompra';

// ROTAS DO FINANCEIRO
import ContasAPagar from './pages/Financeiro/ContasAPagar';
import Orcamento from './pages/Financeiro/Orcamento';

// ROTAS DE ESTOQUE
import EstoqueLocal from './pages/Estoque/EstoqueLocal';
import EstoqueFornecedor from './pages/Estoque/EstoqueFornecedor';
import EstoqueProduto from './pages/Estoque/EstoqueProduto';

// ROTAS DO FISCAL
import EntradaFiscal from './pages/Fiscal/EntradaFiscal';
import RelatorioFiscal from './pages/Fiscal/RelatorioFiscal';

// ROTAS DO USUARIO
import Perfil from './pages/Usuario/Perfil';

function AppRoutes() {
    return (
        <Router basename="/">
            <Routes>
                <Route path='/' element={<Navigate to="/login" />} />
                <Route path='/login' element={<Login />} />

                <Route path='/dashboard' element={<Dashboard />} />

                {/** ROTAS DE CADASTRO */}
                <Route path='/cadastro/fornecedor' element={<CadastroFornecedor />} />
                <Route path='/cadastro/produto' element={<CadastroProduto />} />
                <Route path='/cadastro/unidades' element={<CadastroUnidade />} />

                {/** ROTAS DE COMPRAS */}
                <Route path='/compras/itens' element={<PedidoCompra />} />
                <Route path='/compras/servicos' element={<OrdemServico />} />

                {/** ROTAS DO FINANCEIRO */}
                <Route path='/financeiro/pagamento' element={<ContasAPagar />} />
                <Route path='/financeiro/orcamento' element={<Orcamento />} />

                {/** ROTAS DE ESTOQUE */}
                <Route path='/estoque/local' element={<EstoqueLocal />} />
                <Route path='/estoque/produtos' element={<EstoqueProduto />} />
                <Route path='/estoque/fornecedores' element={<EstoqueFornecedor />} />

                {/** ROTAS DO FISCAL */}
                <Route path='/fiscal/entrada' element={<EntradaFiscal />} />
                <Route path='/fiscal/relatorio' element={<RelatorioFiscal />} />

                {/** ROTAS DO USUARIO */}
                <Route path='/perfil' element={<Perfil />} />

                <Route path='*' element={<Pagina404 />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;