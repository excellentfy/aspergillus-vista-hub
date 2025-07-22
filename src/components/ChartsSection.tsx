
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const chartConfig = {
  agendamentos: {
    label: "Agendamentos",
    color: "hsl(var(--primary))",
  },
  status: {
    label: "Status",
    color: "hsl(var(--primary))",
  },
  performance: {
    label: "Performance",
    color: "hsl(var(--primary))",
  },
};

// Hook para buscar dados dos gráficos
const useChartData = () => {
  return useQuery({
    queryKey: ['chart-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agendamentos_robustos')
        .select('*');

      if (error) {
        console.error('Error fetching chart data:', error);
        throw error;
      }

      // Dados para distribuição por status
      const statusCounts = data?.reduce((acc: any, item) => {
        acc[item.STATUS] = (acc[item.STATUS] || 0) + 1;
        return acc;
      }, {}) || {};

      const statusData = [
        { name: 'AGENDADO', value: statusCounts.AGENDADO || 0, color: '#22c55e' },
        { name: 'CANCELADO', value: statusCounts.CANCELADO || 0, color: '#ef4444' },
        { name: 'REAGENDADO', value: statusCounts.REAGENDADO || 0, color: '#f59e0b' }
      ];

      // Dados para agendamentos por horário - ajustando para o formato de hora correto
      const horarioCounts = data?.reduce((acc: any, item) => {
        const hora = item.HORA ? item.HORA.toString().substring(0, 5) : ''; // Remove seconds if present
        if (hora) {
          acc[hora] = (acc[hora] || 0) + 1;
        }
        return acc;
      }, {}) || {};

      const horarioData = [];
      for (let hour = 8; hour <= 20; hour++) {
        const timeKey = `${hour.toString().padStart(2, '0')}:00`;
        horarioData.push({
          time: timeKey,
          agendamentos: horarioCounts[timeKey] || 0
        });
      }

      // Dados para performance por profissional
      const profissionalCounts = data?.reduce((acc: any, item) => {
        if (item.PROFISSIONAL) {
          acc[item.PROFISSIONAL] = (acc[item.PROFISSIONAL] || 0) + 1;
        }
        return acc;
      }, {}) || {};

      const performanceData = Object.entries(profissionalCounts).map(([name, count], index) => ({
        name,
        agendamentos: count,
        color: index === 0 ? '#3b82f6' : '#f59e0b'
      }));

      return { statusData, horarioData, performanceData };
    },
  });
};

// Componente customizado para barra com animação
const AnimatedBar = (props: any) => {
  return (
    <Bar 
      {...props}
      className="transition-all duration-500 hover:scale-y-110 origin-bottom"
      style={{ transformOrigin: 'bottom' }}
    />
  );
};

export const ChartsSection = () => {
  const { data: chartData, isLoading } = useChartData();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="h-[300px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Distribuição por Status */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Distribuição por Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData?.statusData || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData?.statusData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="flex justify-center mt-4 space-x-4">
            {chartData?.statusData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Agendamentos por Horário */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Agendamentos por Horário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData?.horarioData || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Line 
                  type="monotone" 
                  dataKey="agendamentos" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Performance por Profissional - Ocupa toda a largura e centralizado */}
      <Card className="bg-card border-border col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground text-center">
            Performance por Profissional
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ChartContainer config={chartConfig} className="h-[300px] w-full max-w-4xl">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData?.performanceData || []} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <AnimatedBar 
                  dataKey="agendamentos" 
                  radius={[4, 4, 0, 0]}
                >
                  {chartData?.performanceData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </AnimatedBar>
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
