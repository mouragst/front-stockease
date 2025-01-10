import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { MdCurrencyExchange } from 'react-icons/md';
import { LiaIndustrySolid } from 'react-icons/lia';
import { GiExpense } from 'react-icons/gi';
import { GrUserWorker, GrDocumentNotes } from 'react-icons/gr';
import { BiTransfer } from "react-icons/bi";
import { AiOutlineProduct } from "react-icons/ai";
import { TbShoppingCartDollar } from "react-icons/tb";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { mes: 'Janeiro', Transferencias: 4000 },
  { mes: 'Fevereiro', Transferencias: 3000 },
  { mes: 'Março', Transferencias: 2000 },
  { mes: 'Abril', Transferencias: 2780 },
  { mes: 'Maio', Transferencias: 1890 },
  { mes: 'Junho', Transferencias: 2390 },
  { mes: 'Julho', Transferencias: 3490 },
  { mes: 'Agosto', Transferencias: 2000 },
  { mes: 'Setembro', Transferencias: 2780 },
  { mes: 'Outubro', Transferencias: 1890 },
  { mes: 'Novembro', Transferencias: 2390 },
  { mes: 'Dezembro', Transferencias: 3490 },
];

const LoadingCard = () => (
  <div className="bg-gray-800 p-4 rounded flex items-center animate-pulse" style={{ height: '6.5rem' }}>
    <div className="text-5xl text-slate-200 mr-4"></div>
    <div>
      <h2 className="text-slate-200 font-bold"></h2>
      <p className="text-slate-200"></p>
    </div>
  </div>
);

const LoadingChart = () => (
  <div className="bg-gray-800 p-4 rounded animate-pulse" style={{ height: '450px' }}>
    <div className="text-slate-200 font-bold mb-4"></div>
  </div>
);

const LoadingText = () => (
  <div className="bg-gray-800 p-4 rounded animate-pulse" style={{ height: '2rem' }}>
    <h2 className="text-slate-200 font-bold mb-4"></h2>
  </div>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Sidebar>
        <h1 className="text-slate-200 p-1 font-bold">Dashboard</h1>
        <div className="p-2 border-b border-gray-800" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {loading ? <LoadingCard /> : (
            <div className="bg-gray-800 p-4 rounded flex items-center">
              <MdCurrencyExchange className="text-5xl text-slate-200 mr-4" />
              <div>
                <h2 className="text-slate-200 font-bold">Valor total em estoque</h2>
                <p className="text-slate-200">R$ 1.500.000,00</p>
              </div>
            </div>
          )}
          {loading ? <LoadingCard /> : (
            <div className="bg-gray-800 p-4 rounded flex items-center">
              <LiaIndustrySolid className="text-5xl text-slate-200 mr-4" />
              <div>
                <h2 className="text-slate-200 font-bold">Unidade com maior estoque</h2>
                <p className="text-slate-200">Unidade 1</p>
                <p className="text-slate-200">R$ 750.000,00</p>
              </div>
            </div>
          )}
          {loading ? <LoadingCard /> : (
            <div className="bg-gray-800 p-4 rounded flex items-center">
              <GiExpense className="text-5xl text-slate-200 mr-4" />
              <div>
                <h2 className="text-slate-200 font-bold">Despesas do mês</h2>
                <p className="text-slate-200">R$ 545.000,00</p>
              </div>
            </div>
          )}
          {loading ? <LoadingCard /> : (
            <div className="bg-gray-800 p-4 rounded flex items-center">
              <GrUserWorker className="text-5xl text-slate-200 mr-4" />
              <div>
                <h2 className="text-slate-200 font-bold">Total de funcionários</h2>
                <p className="text-slate-200">1320</p>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {loading ? <LoadingCard /> : (
            <div className="bg-gray-800 p-4 rounded flex items-center">
              <BiTransfer className="text-5xl text-slate-200 mr-4" />
              <div>
                <h2 className="text-slate-200 font-bold">Transferências neste mês</h2>
                <p className="text-slate-200">2501</p>
              </div>
            </div>
          )}
          {loading ? <LoadingCard /> : (
            <div className="bg-gray-800 p-4 rounded flex items-center">
              <AiOutlineProduct className="text-5xl text-slate-200 mr-4" />
              <div>
                <h2 className="text-slate-200 font-bold">Produto com maior qtd. em estoque</h2>
                <p className="text-slate-200">SKU: ELT3</p>
                <p className="text-slate-200">1320</p>
              </div>
            </div>
          )}
          {loading ? <LoadingCard /> : (
            <div className="bg-gray-800 p-4 rounded flex items-center">
              <TbShoppingCartDollar className="text-5xl text-slate-200 mr-4" />
              <div>
                <h2 className="text-slate-200 font-bold">Pedidos de compra neste mês</h2>
                <p className="text-slate-200">5000</p>
              </div>
            </div>
          )}
          {loading ? <LoadingCard /> : (
            <div className="bg-gray-800 p-4 rounded flex items-center">
              <GrDocumentNotes className="text-5xl text-slate-200 mr-4" />
              <div>
                <h2 className="text-slate-200 font-bold">Notas finalizadas neste mês</h2>
                <p className="text-slate-200">3500</p>
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          {loading ? <LoadingText /> : (
            <h2 className="text-slate-200 font-bold mb-4">Transferências por mês</h2>
          )}
          {loading ? <LoadingChart /> : (
            <ResponsiveContainer width="100%" height={450}>
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTransfers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#888888" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#888888" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="mes" stroke="#ccc" tickLine={true} />
                <YAxis stroke="#ccc" tickLine={true} />
                <Tooltip />
                <Area type="monotone" dataKey="Transferencias" stroke="#888888" fillOpacity={1} fill="url(#colorTransfers)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </Sidebar>
    </div>
  );
};

export default Dashboard;