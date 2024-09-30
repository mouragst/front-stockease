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
  
  // Gerenciador de submenu
  const toggleMenu = (menu) => {
    if (menu === 'finance') {
      setOpenFinance(!openFinance);
      setOpenInventory(false); // Fecha outros menus
      setOpenFiscal(false);
    } else if (menu === 'inventory') {
      setOpenInventory(!openInventory);
      setOpenFinance(false);
      setOpenFiscal(false);
    } else if (menu === 'fiscal') {
      setOpenFiscal(!openFiscal);
      setOpenFinance(false);
      setOpenInventory(false);
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
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700"
              >
                <AiOutlineDashboard size={'16px'} className='mr-2' />
                Dashboard
              </Link>
            </li>
            <li>
              <div
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 cursor-pointer"
                onClick={() => toggleMenu('finance')}
                aria-expanded={openFinance}
              >
                <FaRegMoneyBillAlt size={'16px'} className='mr-2' />
                Financeiro
                {openFinance ? <IoIosArrowDown className="ml-auto" /> : <IoIosArrowForward className="ml-auto" />}
              </div>
              {openFinance && (
                <ul className="pl-6 transition-all duration-200">
                  <li>
                    <Link
                      to="/finance/receipts"
                      className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-700"
                    >
                      Recibos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/finance/budgets"
                      className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-700"
                    >
                      Orçamentos
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <div
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 cursor-pointer"
                onClick={() => toggleMenu('inventory')}
                aria-expanded={openInventory}
              >
                <BsBoxSeam size={'16px'} className='mr-2' />
                Estoque
                {openInventory ? <IoIosArrowDown className="ml-auto" /> : <IoIosArrowForward className="ml-auto" />}
              </div>
              {openInventory && (
                <ul className="pl-6 transition-all duration-200">
                  <li>
                    <Link
                      to="/inventory/products"
                      className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-700"
                    >
                      Produtos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/inventory/suppliers"
                      className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-700"
                    >
                      Fornecedores
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <div
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 cursor-pointer"
                onClick={() => toggleMenu('fiscal')}
                aria-expanded={openFiscal}
              >
                <GrDocumentNotes size={'16px'} className='mr-2' />
                Fiscal
                {openFiscal ? <IoIosArrowDown className="ml-auto" /> : <IoIosArrowForward className="ml-auto" />}
              </div>
              {openFiscal && (
                <ul className="pl-6 transition-all duration-200">
                  <li>
                    <Link
                      to="/fiscal/taxes"
                      className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-700"
                    >
                      Impostos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/fiscal/reports"
                      className="flex items-center py-2 px-4 text-gray-400 hover:bg-gray-700"
                    >
                      Relatórios Fiscais
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Link
            to="/users"
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700"
          >
            <FaUserCog size={'16px'} className='mr-2' />
            Usuários
          </Link>
          <Link
            to="/logout"
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700"
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
