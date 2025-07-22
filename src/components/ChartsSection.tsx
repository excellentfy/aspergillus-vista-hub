
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, ResponsiveContainer } from "recharts";

// Dados para o gráfico de distribuição por status
const statusData = [
  { name: 'AGENDADO', value: 5, color: '#22c55e' },
  { name: 'CANCELADO', value: 1, color: '#ef4444' },
  { name: 'REAGENDADO', value: 1, color: '#f59e0b' }
];

// Dados para o gráfico de agendamentos por horário
const horarioData = [
  { time: '08:00', agendamentos: 0 },
  { time: '09:00', agendamentos: 2 },
  { time: '10:00', agendamentos: 1 },
  { time: '11:00', agendamentos: 2 },
  { time: '12:00', agendamentos: 0 },
  { time: '13:00', agendamentos: 0 },
  { time: '14:00', agendamentos: 0 },
  { time: '15:00', agendamentos: 1 },
  { time: '16:00', agendamentos: 0 },
  { time: '17:00', agendamentos: 0 },
  { time: '18:00', agendamentos: 1 },
  { time: '19:00', agendamentos: 0 },
  { time: '20:00', agendamentos: 0 }
];

// Dados para performance por profissional
const performanceData = [
  { name: 'Alan Marques', agendamentos: 4, color: '#3b82f6' },
  { name: 'Gil Pedrosa', agendamentos: 3, color: '#f59e0b' }
];

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

export const ChartsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Distribuição por Status */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Distribuição por Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="flex justify-center mt-4 space-x-4">
            {statusData.map((item, index) => (
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
          <CardTitle className="text-lg font-semibold text-foreground">
            Agendamentos por Horário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={horarioData}>
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

      {/* Gráfico de Performance por Profissional - Ocupa toda a largura */}
      <Card className="bg-card border-border lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Performance por Profissional
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
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
                <Bar 
                  dataKey="agendamentos" 
                  radius={[4, 4, 0, 0]}
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
