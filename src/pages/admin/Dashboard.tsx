
import { AdminLayout } from '@/components/layout/AdminLayout';
import { MetricCard } from '@/components/ui/metric-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const chartData = [
  { name: 'Seg', agendamentos: 12 },
  { name: 'Ter', agendamentos: 19 },
  { name: 'Qua', agendamentos: 8 },
  { name: 'Qui', agendamentos: 23 },
  { name: 'Sex', agendamentos: 31 },
  { name: 'Sáb', agendamentos: 15 },
  { name: 'Dom', agendamentos: 6 },
];

const recentAppointments = [
  {
    id: 1,
    customer: 'Maria Silva',
    service: 'Corte e Escova',
    time: '14:00',
    status: 'confirmed',
    phone: '(11) 99999-9999'
  },
  {
    id: 2,
    customer: 'João Santos',
    service: 'Barba e Cabelo',
    time: '15:30',
    status: 'pending',
    phone: '(11) 88888-8888'
  },
  {
    id: 3,
    customer: 'Ana Costa',
    service: 'Manicure',
    time: '16:00',
    status: 'confirmed',
    phone: '(11) 77777-7777'
  },
];

const recentMessages = [
  {
    id: 1,
    customer: 'Carlos Oliveira',
    message: 'Oi! Gostaria de agendar para amanhã...',
    time: '2 min atrás',
    unread: true
  },
  {
    id: 2,
    customer: 'Fernanda Lima',
    message: 'Obrigada pelo atendimento!',
    time: '15 min atrás',
    unread: false
  },
  {
    id: 3,
    customer: 'Roberto Silva',
    message: 'Preciso remarcar meu horário',
    time: '1h atrás',
    unread: true
  },
];

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo de volta! Aqui está um resumo do seu negócio hoje.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Hoje
            </Button>
            <Button size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Agendamentos Hoje"
            value="12"
            change={{ value: "+20% vs ontem", type: "positive" }}
            icon={Calendar}
          />
          <MetricCard
            title="Conversas Ativas"
            value="8"
            change={{ value: "3 novas", type: "positive" }}
            icon={MessageSquare}
          />
          <MetricCard
            title="Taxa de Conversão"
            value="85%"
            change={{ value: "+5% vs semana passada", type: "positive" }}
            icon={TrendingUp}
          />
          <MetricCard
            title="Clientes Atendidos"
            value="156"
            change={{ value: "Este mês", type: "neutral" }}
            icon={Users}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Agendamentos da Semana</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="agendamentos" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horários Mais Procurados</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { hour: '08:00', count: 5 },
                  { hour: '10:00', count: 12 },
                  { hour: '14:00', count: 18 },
                  { hour: '16:00', count: 15 },
                  { hour: '18:00', count: 8 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Próximos Agendamentos</CardTitle>
              <Button variant="ghost" size="sm">Ver todos</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{appointment.customer}</p>
                      <p className="text-sm text-muted-foreground">{appointment.service}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {appointment.phone}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{appointment.time}</p>
                    <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                      {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Mensagens Recentes</CardTitle>
              <Button variant="ghost" size="sm">Ver todas</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{message.customer}</p>
                      {message.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{message.message}</p>
                    <p className="text-xs text-muted-foreground">{message.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
