import 'react';
import Sidebar from '../Sidebar/Sidebar';
import { MdCurrencyExchange } from 'react-icons/md';
import { LiaIndustrySolid } from 'react-icons/lia';
import { GiExpense } from 'react-icons/gi';
import { GrUserWorker } from 'react-icons/gr';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { mes: 'Janeiro', transferencias: 4000 },
  { mes: 'Fevereiro', transferencias: 3000 },
  { mes: 'Março', transferencias: 2000 },
  { mes: 'Abril', transferencias: 2780 },
  { mes: 'Maio', transferencias: 1890 },
  { mes: 'Junho', transferencias: 2390 },
  { mes: 'Julho', transferencias: 3490 },
  { mes: 'Agosto', transferencias: 2000 },
  { mes: 'Setembro', transferencias: 2780 },
  { mes: 'Outubro', transferencias: 1890 },
  { mes: 'Novembro', transferencias: 2390 },
  { mes: 'Dezembro', transferencias: 3490 },
];

const Dashboard = () => {
  return (
    <div>
      <Sidebar>
        <h1 className="text-slate-200 p-1 font-bold">Dashboard</h1>
        <div className="p-2 border-b border-gray-800" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <div className="bg-gray-800 p-4 rounded flex items-center">
            <MdCurrencyExchange className="text-5xl text-slate-200 mr-4" />
            <div>
              <h2 className="text-slate-200 font-bold">Valor total em estoque</h2>
              <p className="text-slate-200">R$ 1.500.000,00</p>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded flex items-center">
            <LiaIndustrySolid className="text-5xl text-slate-200 mr-4" />
            <div>
              <h2 className="text-slate-200 font-bold">Unidade com maior estoque</h2>
              <p className="text-slate-200">Unidade 1</p>
              <p className="text-slate-200">R$ 750.000,00</p>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded flex items-center">
            <GiExpense className="text-5xl text-slate-200 mr-4" />
            <div>
              <h2 className="text-slate-200 font-bold">Despesas do mês</h2>
              <p className="text-slate-200">R$ 545.000,00</p>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded flex items-center">
            <GrUserWorker className="text-5xl text-slate-200 mr-4" />
            <div>
              <h2 className="text-slate-200 font-bold">Total de funcionários</h2>
              <p className="text-slate-200">1320</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-slate-200 font-bold mb-4">Transferências por mês</h2>
          <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                    <linearGradient id="colorTransfers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#888888" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#888888" stopOpacity={0} />
                    </linearGradient>
                    </defs>
                    <XAxis dataKey="mes" stroke="#ccc" tickLine={false} />
                    <YAxis stroke="#ccc" tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="transferencias" stroke="#888888" fillOpacity={1} fill="url(#colorTransfers)" />
                </AreaChart>
                </ResponsiveContainer>
        </div>
      </Sidebar>
    </div>
  );
};

export default Dashboard;