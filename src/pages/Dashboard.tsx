import { Header } from "@/components/Header";
import { AgendamentosList } from "@/components/AgendamentosList";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center space-x-3">
              <span className="bg-primary/20 p-2 rounded-lg">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <span>Agendamentos</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Visualize e gerencie todos os agendamentos em tempo real
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">Sistema conectado</span>
            </div>
          </div>
        </div>
        <AgendamentosList />
      </main>
    </div>
  );
};