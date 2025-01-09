// Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDashboard } from "react-icons/ai";
import { GoGear } from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";
import { FaUserCog, FaRegMoneyBillAlt } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { BsBoxSeam } from "react-icons/bs";
import { GrDocumentNotes } from "react-icons/gr";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { AiOutlineProduct } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";

const Sidebar = ({ children }) => {
  const [openFinance, setOpenFinance] = useState(false);
  const [openInventory, setOpenInventory] = useState(false);
  const [openFiscal, setOpenFiscal] = useState(false);
  const [openCadastro, setOpenCadastro] = useState(false);
  const [openCompras, setOpenCompras] = useState(false);

  // Gerenciador de submenu
  const toggleMenu = (menu) => {
    if (menu === 'finance') {
      setOpenFinance(!openFinance);
    } else if (menu === 'inventory') {
      setOpenInventory(!openInventory);
    } else if (menu === 'fiscal') {
      setOpenFiscal(!openFiscal);
    } else if (menu === 'cadastro') {
      setOpenCadastro(!openCadastro);
    } else if (menu === 'compras') {
      setOpenCompras(!openCompras)
    }
  };

  return (
    <div className="flex h-screen bg-gray-950">
      <div className="w-72 bg-gray-950 shadow-lg flex flex-col"> 
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-gray-300 text-center">StockEase</h1>
        </div>
        <nav className="mt-2 flex-grow">
          <ul>
            <li>
              <Link
                to="/dashboard"
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-900 rounded-lg transition-all duration-200 mx-5" 
              >
                <AiOutlineDashboard size={'16px'} className='mr-2' />
                Dashboard
              </Link>
            </li>
            <li>
              <div
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-900 cursor-pointer rounded-lg transition-all duration-200 mx-5"
                onClick={() => toggleMenu('cadastro')}
                aria-expanded={openCadastro}
              >
                <AiOutlineProduct size={'16px'} className='mr-2' />
                Cadastro
                {openCadastro ? <IoIosArrowDown className="ml-auto" /> : <IoIosArrowForward className="ml-auto" />}
              </div>
              <ul className={`pl-6 overflow-hidden transition-max-height duration-300 ${openCadastro ? 'max-h-40' : 'max-h-0'}`}>
                <li>
                  <Link
                    to="/cadastro/fornecedor"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-900 rounded-lg transition-all duration-200 mx-5"
                  >
                    Cadastro de fornecedor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cadastro/produto"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-900 rounded-lg transition-all duration-200 mx-5"
                  >
                    Cadastro de produto
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cadastro/unidades"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-900 rounded-lg transition-all duration-200 mx-5"
                  >
                    Cadastro de unidades
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <div
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-900 cursor-pointer rounded-lg transition-all duration-200 mx-5"
                onClick={() => toggleMenu('compras')}
                aria-expanded={openCompras}
              >
                <BsCartPlus size={'16px'} className='mr-2' />
                Compras
                {openCompras ? <IoIosArrowDown className="ml-auto" /> : <IoIosArrowForward className="ml-auto" />}
              </div>
              <ul className={`pl-6 overflow-hidden transition-max-height duration-300 ${openCompras ? 'max-h-40' : 'max-h-0'}`}>
                <li>
                  <Link
                    to="/compras/itens"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-900 rounded-lg transition-all duration-200 mx-5"
                  >
                    Pedidos de compra
                  </Link>
                </li>
                <li>
                  <Link
                    to="/compras/servicos"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-900 rounded-lg transition-all duration-200 mx-5"
                  >
                    Ordens de serviço
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <div
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-900 cursor-pointer rounded-lg transition-all duration-200 mx-5"
                onClick={() => toggleMenu('finance')}
                aria-expanded={openFinance}
              >
                <FaRegMoneyBillAlt size={'16px'} className='mr-2' />
                Financeiro
                {openFinance ? <IoIosArrowDown className="ml-auto" /> : <IoIosArrowForward className="ml-auto" />}
              </div>
              <ul className={`pl-6 overflow-hidden transition-max-height duration-300 ${openFinance ? 'max-h-40' : 'max-h-0'}`}>
                <li>
                  <Link
                    to="/financeiro/pagamento"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-900 rounded-lg transition-all duration-200 mx-5"
                  >
                    Contas a pagar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/financeiro/orcamento"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-900 rounded-lg transition-all duration-200 mx-5"
                  >
                    Orçamentos
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <div
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-900 cursor-pointer rounded-lg transition-all duration-200 mx-5"
                onClick={() => toggleMenu('inventory')}
                aria-expanded={openInventory}
              >
                <BsBoxSeam size={'16px'} className='mr-2' />
                Estoque
                {openInventory ? <IoIosArrowDown className="ml-auto" /> : <IoIosArrowForward className="ml-auto" />}
              </div>
              <ul className={`pl-6 overflow-hidden transition-max-height duration-300 ${openInventory ? 'max-h-40' : 'max-h-0'}`}>
                <li>
                  <Link
                    to="/estoque/local"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-900 rounded-lg transition-all duration-200 mx-5"
                  >
                    Estoque por local
                  </Link>
                </li>
                <li>
                  <Link
                    to="/estoque/produtos"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-900 rounded-lg transition-all duration-200 mx-5"
                  >
                    Produtos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/estoque/fornecedores"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-900 rounded-lg transition-all duration-200 mx-5"
                  >
                    Fornecedores
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <div
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-900 cursor-pointer rounded-lg transition-all duration-200 mx-5"
                onClick={() => toggleMenu('fiscal')}
                aria-expanded={openFiscal}
              >
                <GrDocumentNotes size={'16px'} className='mr-2' />
                Fiscal
                {openFiscal ? <IoIosArrowDown className="ml-auto" /> : <IoIosArrowForward className="ml-auto" />}
              </div>
              <ul className={`pl-6 overflow-hidden transition-max-height duration-300 ${openFiscal ? 'max-h-40' : 'max-h-0'}`}>
                <li>
                  <Link
                    to="/fiscal/entrada"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-900 rounded-lg transition-all duration-200 mx-5"
                  >
                    Entrada de Nota Fiscal
                  </Link>
                </li>
                <li>
                  <Link
                    to="/fiscal/relatorio"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-900 rounded-lg transition-all duration-200 mx-5"
                  >
                    Relatórios Fiscais
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Link
            to="/perfil"
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-900 rounded-lg transition-all duration-200 mx-2"
          >
            <FaUserCog size={'16px'} className='mr-2' />
            Usuário
          </Link>
          <Link
            to="/logout"
            className="flex items-center py-2 px-4 text-gray-200 hover:bg-gray-900 rounded-lg transition-all duration-200 mx-2"
          >
            <FaArrowRightFromBracket size={'16px'} className='mr-2' />
            Sair
          </Link>
        </div>
      </div>
      <div className="flex-1 p-4 bg-gray-900 rounded-lg border border-gray-800 mt-1">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
