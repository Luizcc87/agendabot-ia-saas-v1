
import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Copy, 
  Trash2,
  Scissors,
  Sparkles,
  Heart,
  User,
  Clock,
  DollarSign,
  Settings
} from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: number;
  price: number;
  active: boolean;
  professionals: string[];
  allowOnlineBooking: boolean;
  bookingsCount: number;
}

interface ServiceForm {
  name: string;
  category: string;
  description: string;
  duration: number;
  price: number;
  professionals: string[];
  allowOnlineBooking: boolean;
  active: boolean;
}

const serviceCategories = [
  { value: 'corte', label: 'Cortes', icon: Scissors },
  { value: 'beleza', label: 'Beleza', icon: Sparkles },
  { value: 'estetica', label: 'Estética', icon: Heart },
  { value: 'consulta', label: 'Consultas', icon: User },
];

const professionals = [
  { id: '1', name: 'Ana Silva' },
  { id: '2', name: 'João Santos' },
  { id: '3', name: 'Maria Costa' },
];

const durationOptions = [
  { value: 15, label: '15 minutos' },
  { value: 30, label: '30 minutos' },
  { value: 45, label: '45 minutos' },
  { value: 60, label: '1 hora' },
  { value: 90, label: '1h 30min' },
  { value: 120, label: '2 horas' },
];

export default function ServicesSettings() {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Corte Masculino',
      category: 'corte',
      description: 'Corte tradicional ou moderno',
      duration: 30,
      price: 35,
      active: true,
      professionals: ['1', '2'],
      allowOnlineBooking: true,
      bookingsCount: 156
    },
    {
      id: '2',
      name: 'Hidratação Capilar',
      category: 'beleza',
      description: 'Tratamento hidratante para cabelos',
      duration: 60,
      price: 80,
      active: true,
      professionals: ['1'],
      allowOnlineBooking: true,
      bookingsCount: 89
    },
    {
      id: '3',
      name: 'Manicure',
      category: 'beleza',
      description: 'Cuidado completo das unhas',
      duration: 45,
      price: 25,
      active: false,
      professionals: ['3'],
      allowOnlineBooking: true,
      bookingsCount: 234
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const form = useForm<ServiceForm>({
    defaultValues: {
      name: '',
      category: '',
      description: '',
      duration: 30,
      price: 0,
      professionals: [],
      allowOnlineBooking: true,
      active: true,
    }
  });

  const getCategoryInfo = (categoryValue: string) => {
    return serviceCategories.find(cat => cat.value === categoryValue) || { label: categoryValue, icon: Settings };
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (service: Service) => {
    setEditingService(service);
    form.reset({
      name: service.name,
      category: service.category,
      description: service.description,
      duration: service.duration,
      price: service.price,
      professionals: service.professionals,
      allowOnlineBooking: service.allowOnlineBooking,
      active: service.active,
    });
    setIsModalOpen(true);
  };

  const handleSave = (data: ServiceForm) => {
    if (editingService) {
      setServices(services.map(service => 
        service.id === editingService.id 
          ? { ...service, ...data }
          : service
      ));
    } else {
      const newService: Service = {
        ...data,
        id: Date.now().toString(),
        bookingsCount: 0
      };
      setServices([...services, newService]);
    }
    setIsModalOpen(false);
    setEditingService(null);
    form.reset();
  };

  const handleDuplicate = (service: Service) => {
    const newService: Service = {
      ...service,
      id: Date.now().toString(),
      name: `${service.name} (Cópia)`,
      bookingsCount: 0
    };
    setServices([...services, newService]);
  };

  const handleDelete = (serviceId: string) => {
    setServices(services.filter(service => service.id !== serviceId));
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Serviços</h1>
            <p className="text-muted-foreground">
              Gerencie os serviços oferecidos pela sua empresa
            </p>
          </div>
          
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingService(null);
                form.reset();
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Serviço
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingService ? 'Editar Serviço' : 'Novo Serviço'}
                </DialogTitle>
                <DialogDescription>
                  Configure as informações do serviço
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Serviço*</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Corte Masculino"
                      {...form.register('name', { required: true })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select onValueChange={(value) => form.setValue('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            <div className="flex items-center gap-2">
                              <category.icon className="h-4 w-4" />
                              {category.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o serviço..."
                    {...form.register('description')}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração</Label>
                    <Select onValueChange={(value) => form.setValue('duration', parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a duração" />
                      </SelectTrigger>
                      <SelectContent>
                        {durationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      {...form.register('price', { required: true, min: 0 })}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Configurações</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Permite agendamento online</Label>
                      <p className="text-sm text-muted-foreground">
                        Clientes podem agendar via WhatsApp
                      </p>
                    </div>
                    <Switch {...form.register('allowOnlineBooking')} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Serviço ativo</Label>
                      <p className="text-sm text-muted-foreground">
                        Disponível para agendamento
                      </p>
                    </div>
                    <Switch {...form.register('active')} />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingService ? 'Salvar Alterações' : 'Criar Serviço'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar serviços..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {serviceCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const categoryInfo = getCategoryInfo(service.category);
            const CategoryIcon = categoryInfo.icon;
            
            return (
              <Card key={service.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <CategoryIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <Badge variant={service.active ? "default" : "secondary"}>
                          {service.active ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(service)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(service)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDelete(service.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {formatDuration(service.duration)}
                      </div>
                      <div className="flex items-center gap-1 font-medium">
                        <DollarSign className="h-4 w-4" />
                        {formatPrice(service.price)}
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      {service.bookingsCount} agendamentos este mês
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nenhum serviço encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterCategory !== 'all' 
                ? 'Tente ajustar os filtros de busca' 
                : 'Comece adicionando seu primeiro serviço'
              }
            </p>
            {!searchTerm && filterCategory === 'all' && (
              <Button onClick={() => {
                setEditingService(null);
                form.reset();
                setIsModalOpen(true);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Serviço
              </Button>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
