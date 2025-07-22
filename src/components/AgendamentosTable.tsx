
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, Filter } from "lucide-react";

// Mock data baseado na imagem
const agendamentos = [
  {
    id: 1,
    cliente: "Reinaldo Muniz",
    data: "10/07/2025",
    hora: "11:00",
    status: "CANCELADO",
    profissional: "Alan Marques"
  },
  {
    id: 2,
    cliente: "Dacueba Aumentativo",
    data: "09/07/2025",
    hora: "15:00", 
    status: "AGENDADO",
    profissional: "Gil Pedrosa"
  },
  {
    id: 3,
    cliente: "Allan Bidu",
    data: "09/07/2025",
    hora: "09:00",
    status: "REAGENDADO", 
    profissional: "Gil Pedrosa"
  },
  {
    id: 4,
    cliente: "Esquina do Mal",
    data: "08/07/2025",
    hora: "18:00",
    status: "AGENDADO",
    profissional: "Alan Marques"
  },
  {
    id: 5,
    cliente: "Filho Duma Égua",
    data: "07/07/2025", 
    hora: "11:00",
    status: "AGENDADO",
    profissional: "Alan Marques"
  },
  {
    id: 6,
    cliente: "Renato Maia",
    data: "05/07/2025",
    hora: "09:00",
    status: "AGENDADO",
    profissional: "Gil Pedrosa"
  },
  {
    id: 7,
    cliente: "Renato Maia",
    data: "04/07/2025",
    hora: "10:00", 
    status: "AGENDADO",
    profissional: "Alan Marques"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'AGENDADO':
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/50">● AGENDADO</span>;
    case 'CANCELADO':
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/50">● CANCELADO</span>;
    case 'REAGENDADO':
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/50">● REAGENDADO</span>;
    default:
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/50">● {status}</span>;
  }
};

export const AgendamentosTable = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Agendamentos - Tempo Real
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              ● Total: 7 agendamentos
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-gray-500/20 px-2 py-1 rounded border border-gray-500/50 text-gray-400">
              ■ HISTÓRICO - Agendamentos Anteriores 7 de 7
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium">Cliente</TableHead>
                <TableHead className="text-muted-foreground font-medium">Data</TableHead>
                <TableHead className="text-muted-foreground font-medium">Hora</TableHead>
                <TableHead className="text-muted-foreground font-medium">Status</TableHead>
                <TableHead className="text-muted-foreground font-medium">Profissional</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agendamentos.map((agendamento) => (
                <TableRow key={agendamento.id} className="border-border hover:bg-muted/30">
                  <TableCell className="font-medium text-foreground">{agendamento.cliente}</TableCell>
                  <TableCell className="text-muted-foreground">{agendamento.data}</TableCell>
                  <TableCell className="text-muted-foreground">{agendamento.hora}</TableCell>
                  <TableCell>{getStatusBadge(agendamento.status)}</TableCell>
                  <TableCell className="text-muted-foreground">{agendamento.profissional}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Filtros */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Profissional</label>
              <Select>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="alan">Alan Marques</SelectItem>
                  <SelectItem value="gil">Gil Pedrosa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
              <Select>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="agendado">Agendado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                  <SelectItem value="reagendado">Reagendado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Data Inicial</label>
              <Select>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hoje">Hoje</SelectItem>
                  <SelectItem value="semana">Esta semana</SelectItem>
                  <SelectItem value="mes">Este mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Data Final</label>
              <Select>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hoje">Hoje</SelectItem>
                  <SelectItem value="semana">Esta semana</SelectItem>
                  <SelectItem value="mes">Este mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
