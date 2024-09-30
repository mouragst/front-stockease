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

const Sidebar = () => {
  const [openFinance, setOpenFinance] = useState(false);
  const [openInventory, setOpenInventory] = useState(false);
  const [openFiscal, setOpenFiscal] = useState(false);
  const [openCadastro, setOpenCadastro] = useState(false);
  
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
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-64 bg-gray-950 shadow-lg flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-white justify-content-center">StockEase</h1>
        </div>
        <nav className="mt-2 flex-grow">
          <ul>
            <li>
              <Link
                to="/dashboard"
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition-all duration-200"
              >
                <AiOutlineDashboard size={'16px'} className='mr-2' />
                Dashboard
              </Link>
            </li>
            <li>
              <div
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 cursor-pointer rounded transition-all duration-200"
                onClick={() => toggleMenu('cadastro')}
                aria-expanded={openCadastro}
              >
                <FaRegMoneyBillAlt size={'16px'} className='mr-2' />
                Cadastro
                {openCadastro ? <IoIosArrowDown className="ml-auto" /> : <IoIosArrowForward className="ml-auto" />}
              </div>
              <ul className={`pl-6 overflow-hidden transition-max-height duration-300 ${openCadastro ? 'max-h-40' : 'max-h-0'}`}>
                <li>
                  <Link
                    to="/cadastro/fornecedor"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-700 rounded transition-all duration-200"
                  >
                    Cadastro de fornecedor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cadastro/produto"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-700 rounded transition-all duration-200"
                  >
                    Cadastro de produto
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <div
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 cursor-pointer rounded transition-all duration-200"
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
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-700 rounded transition-all duration-200"
                  >
                    Contas a pagar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/financeiro/orcamento"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-700 rounded transition-all duration-200"
                  >
                    Orçamentos
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <div
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 cursor-pointer rounded transition-all duration-200"
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
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-700 rounded transition-all duration-200"
                  >
                    Estoque por local
                  </Link>
                </li>
                <li>
                  <Link
                    to="/estoque/produtos"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-700 rounded transition-all duration-200"
                  >
                    Produtos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/estoque/fornecedores"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-700 rounded transition-all duration-200"
                  >
                    Fornecedores
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <div
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 cursor-pointer rounded transition-all duration-200"
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
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-700 rounded transition-all duration-200"
                  >
                    Entrada de Nota Fiscal
                  </Link>
                </li>
                <li>
                  <Link
                    to="/fiscal/relatorio"
                    className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-700 rounded transition-all duration-200"
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
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition-all duration-200"
          >
            <FaUserCog size={'16px'} className='mr-2' />
            Usuários
          </Link>
          <Link
            to="/logout"
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 rounded transition-all duration-200"
          >
            <FaArrowRightFromBracket size={'16px'} className='mr-2' />
            Sair
          </Link>
        </div>
      </div>
      <div className="flex-1 p-4 bg-dark-900 rounded border border-gray-800">
        {/* Conteúdo principal do aplicativo */}
      </div>
    </div>
  );
};

export default Sidebar;
