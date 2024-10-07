import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div>
        <h1 className="text-4xl font-bold text-slate-200 mb-4 text-center">StockEase</h1>
        
        {/* Aumentando a largura do formulário */}
        <div className="p-8 rounded-lg shadow-md w-[475px] bg-gray-800 border border-gray-700">
          <h2 className="text-2xl font-semibold text-slate-200">Faça o seu login</h2>
          <form className="mt-4">
            <div>
              <label className="block text-slate-200" htmlFor="email">Seu email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="nome@suacompanhia.com.br"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-slate-200" htmlFor="password">Sua senha</label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="*******"
                required
              />
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="text-slate-200">Lembrar de mim</label>
              <a href="#" className="ml-auto text-green-500 hover:underline">Esqueci minha senha</a>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Entrar
            </button>
          </form>
          <p className="mt-4 text-center text-gray-500">
            Não é cliente? <a href="#" className="text-green-500 hover:underline">Contate o suporte</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
