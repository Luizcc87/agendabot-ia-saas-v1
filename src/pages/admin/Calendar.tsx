
import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Plus, Filter, Clock, User, Phone, ChevronLeft, ChevronRight } from 'lucide-react';

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

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // Create calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const selectDate = (day: number) => {
    const newDate = new Date(year, month, day);
    setSelectedDate(newDate);
  };

  const isToday = (day: number) => {
    return today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year;
  };

  const isSelected = (day: number) => {
    return selectedDate.getDate() === day && 
           selectedDate.getMonth() === month && 
           selectedDate.getFullYear() === year;
  };

  const getAppointmentForTime = (time: string) => {
    return appointments.find(apt => apt.time === time);
  };

  const ResponsiveCalendar = () => (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg md:text-xl">
            {monthNames[month]} {year}
          </CardTitle>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 md:p-6">
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {/* Day headers */}
          {dayNames.map((day) => (
            <div 
              key={day} 
              className="text-center text-xs md:text-sm font-medium text-muted-foreground p-1 md:p-2"
            >
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className="aspect-square flex items-center justify-center"
            >
              {day && (
                <button
                  onClick={() => selectDate(day)}
                  className={`
                    w-full h-full min-h-[32px] md:min-h-[40px] rounded-md text-xs md:text-sm font-medium
                    transition-colors hover:bg-muted
                    ${isToday(day) ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}
                    ${isSelected(day) && !isToday(day) ? 'bg-accent text-accent-foreground' : ''}
                  `}
                >
                  {day}
                </button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="p-3 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Calendário</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Gerencie seus agendamentos e horários disponíveis.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs md:text-sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button size="sm" className="text-xs md:text-sm">
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </div>
        </div>

        {/* View Controls */}
        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm md:text-base font-medium">
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
                    className="text-xs md:text-sm"
                  >
                    {mode === 'day' ? 'Dia' : mode === 'week' ? 'Semana' : 'Mês'}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Calendar Picker */}
          <div className="lg:col-span-1">
            <ResponsiveCalendar />
          </div>

          {/* Schedule View */}
          <Card className="lg:col-span-3">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg md:text-xl">Agenda do Dia</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6">
              <div className="space-y-2 max-h-[400px] md:max-h-[600px] overflow-y-auto">
                {timeSlots.map((time) => {
                  const appointment = getAppointmentForTime(time);
                  
                  return (
                    <div key={time} className="flex items-center gap-2 md:gap-4 p-2 rounded-lg hover:bg-muted/50">
                      <div className="w-12 md:w-16 text-xs md:text-sm font-medium text-muted-foreground flex-shrink-0">
                        {time}
                      </div>
                      
                      {appointment ? (
                        <div className="flex-1 p-2 md:p-3 rounded-lg border bg-card">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <User className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
                                <span className="text-sm md:text-base font-medium truncate">{appointment.customer}</span>
                                <Badge 
                                  variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                                  className="text-xs"
                                >
                                  {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                                </Badge>
                              </div>
                              <p className="text-xs md:text-sm text-muted-foreground mb-1 truncate">
                                {appointment.service}
                              </p>
                              <div className="flex items-center gap-2 md:gap-4 text-xs text-muted-foreground flex-wrap">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {appointment.duration}min
                                </span>
                                <span className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  <span className="hidden sm:inline">{appointment.phone}</span>
                                  <span className="sm:hidden">Tel.</span>
                                </span>
                              </div>
                              {appointment.notes && (
                                <p className="text-xs text-muted-foreground mt-1 italic truncate">
                                  {appointment.notes}
                                </p>
                              )}
                            </div>
                            <Button variant="ghost" size="sm" className="text-xs md:text-sm flex-shrink-0 ml-2">
                              Editar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 p-2 md:p-3 rounded-lg border-2 border-dashed border-muted hover:border-primary/50 cursor-pointer transition-colors">
                          <div className="flex items-center justify-center text-muted-foreground">
                            <Plus className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                            <span className="text-xs md:text-sm">Horário disponível</span>
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
