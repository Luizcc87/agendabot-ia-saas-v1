
import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Plus, Filter, Clock, User, Phone } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

const appointments = [
  {
    id: 1,
    customer: 'Maria Silva',
    service: 'Corte e Escova',
    time: '09:00',
    duration: 60,
    status: 'confirmed',
    phone: '(11) 99999-9999',
    notes: 'Cliente preferiu horário da manhã'
  },
  {
    id: 2,
    customer: 'João Santos',
    service: 'Barba e Cabelo',
    time: '10:30',
    duration: 45,
    status: 'pending',
    phone: '(11) 88888-8888',
    notes: ''
  },
  {
    id: 3,
    customer: 'Ana Costa',
    service: 'Manicure',
    time: '14:00',
    duration: 30,
    status: 'confirmed',
    phone: '(11) 77777-7777',
    notes: 'Esmalte vermelho'
  },
  {
    id: 4,
    customer: 'Carlos Oliveira',
    service: 'Massagem',
    time: '15:00',
    duration: 90,
    status: 'confirmed',
    phone: '(11) 66666-6666',
    notes: 'Primeira vez no salão'
  },
];

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

  const getAppointmentForTime = (time: string) => {
    return appointments.find(apt => apt.time === time);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Calendário</h1>
            <p className="text-muted-foreground">
              Gerencie seus agendamentos e horários disponíveis.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </div>
        </div>

        {/* View Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  {selectedDate?.toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex gap-1">
                {(['day', 'week', 'month'] as const).map((mode) => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode(mode)}
                  >
                    {mode === 'day' ? 'Dia' : mode === 'week' ? 'Semana' : 'Mês'}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Picker */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Selecionar Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border-0"
              />
            </CardContent>
          </Card>

          {/* Schedule View */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Agenda do Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {timeSlots.map((time) => {
                  const appointment = getAppointmentForTime(time);
                  
                  return (
                    <div key={time} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50">
                      <div className="w-16 text-sm font-medium text-muted-foreground">
                        {time}
                      </div>
                      
                      {appointment ? (
                        <div className="flex-1 p-3 rounded-lg border bg-card">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{appointment.customer}</span>
                                <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                                  {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                {appointment.service}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {appointment.duration}min
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {appointment.phone}
                                </span>
                              </div>
                              {appointment.notes && (
                                <p className="text-xs text-muted-foreground mt-1 italic">
                                  {appointment.notes}
                                </p>
                              )}
                            </div>
                            <Button variant="ghost" size="sm">
                              Editar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 p-3 rounded-lg border-2 border-dashed border-muted hover:border-primary/50 cursor-pointer transition-colors">
                          <div className="flex items-center justify-center text-muted-foreground">
                            <Plus className="h-4 w-4 mr-2" />
                            <span className="text-sm">Horário disponível</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
