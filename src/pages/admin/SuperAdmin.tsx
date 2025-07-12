import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Shield, 
  Users, 
  Calendar, 
  Clock, 
  UserCheck, 
  UserX, 
  Crown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data para demonstração
const mockTrialUsers = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@salaobeleza.com',
    company: 'Salão Beleza Express',
    segment: 'Salão de Beleza',
    whatsapp: '(11) 99999-1111',
    role: 'trial',
    trialStart: '2024-01-15',
    trialEnd: '2024-01-22',
    status: 'active',
    daysLeft: 3
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@barbeariamoderna.com',
    company: 'Barbearia Moderna',
    segment: 'Barbearia',
    whatsapp: '(11) 99999-2222',
    role: 'trial',
    trialStart: '2024-01-10',
    trialEnd: '2024-01-17',
    status: 'expired',
    daysLeft: -2
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos@clinicaestetica.com',
    company: 'Clínica Estética Plus',
    segment: 'Clínica Estética',
    whatsapp: '(11) 99999-3333',
    role: 'trial',
    trialStart: '2024-01-18',
    trialEnd: '2024-01-25',
    status: 'active',
    daysLeft: 6
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana@petshoplove.com',
    company: 'Pet Shop Love',
    segment: 'Pet Shop',
    whatsapp: '(11) 99999-4444',
    role: 'user',
    trialStart: '2024-01-01',
    trialEnd: '2024-01-08',
    status: 'converted',
    daysLeft: 0
  }
];

export default function SuperAdmin() {
  const [users, setUsers] = useState(mockTrialUsers);
  const [selectedUser, setSelectedUser] = useState<typeof mockTrialUsers[0] | null>(null);
  const [extendDays, setExtendDays] = useState('7');
  const { toast } = useToast();

  const handleExtendTrial = (userId: string, days: number) => {
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        const newEndDate = new Date();
        newEndDate.setDate(newEndDate.getDate() + days);
        return {
          ...user,
          trialEnd: newEndDate.toISOString().split('T')[0],
          status: 'active' as const,
          daysLeft: days
        };
      }
      return user;
    }));

    toast({
      title: 'Trial estendido',
      description: `Trial estendido por ${days} dias com sucesso.`,
    });
  };

  const handleApproveUpgrade = (userId: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          role: 'user' as const,
          status: 'converted' as const
        };
      }
      return user;
    }));

    toast({
      title: 'Upgrade aprovado',
      description: 'Usuário convertido para plano pago com sucesso.',
    });
  };

  const handleBlockUser = (userId: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: 'blocked' as const
        };
      }
      return user;
    }));

    toast({
      title: 'Usuário bloqueado',
      description: 'Usuário foi bloqueado com sucesso.',
      variant: 'destructive'
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    
    toast({
      title: 'Usuário excluído',
      description: 'Usuário foi removido do sistema.',
      variant: 'destructive'
    });
  };

  const getStatusBadge = (status: string, daysLeft: number) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="outline" className="text-green-600 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Ativo ({daysLeft}d restantes)
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="outline" className="text-red-600 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Expirado
          </Badge>
        );
      case 'converted':
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            <Crown className="h-3 w-3 mr-1" />
            Convertido
          </Badge>
        );
      case 'blocked':
        return (
          <Badge variant="outline" className="text-orange-600 border-orange-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Bloqueado
          </Badge>
        );
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'trial':
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-200">
            Trial
          </Badge>
        );
      case 'user':
        return (
          <Badge variant="outline" className="text-green-600 border-green-200">
            Usuário
          </Badge>
        );
      case 'admin':
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            Admin
          </Badge>
        );
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  const stats = {
    totalTrials: users.filter(u => u.role === 'trial').length,
    activeTrials: users.filter(u => u.status === 'active').length,
    expiredTrials: users.filter(u => u.status === 'expired').length,
    conversions: users.filter(u => u.status === 'converted').length
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Painel SuperAdmin</h1>
            </div>
            <p className="text-muted-foreground">
              Gerencie trials e conversões de usuários
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Usuário Manual
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Trials</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTrials}</div>
              <p className="text-xs text-muted-foreground">
                Usuários em período de teste
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trials Ativos</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeTrials}</div>
              <p className="text-xs text-muted-foreground">
                Ainda em período de teste
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trials Expirados</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.expiredTrials}</div>
              <p className="text-xs text-muted-foreground">
                Necessitam atenção
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversões</CardTitle>
              <Crown className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.conversions}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalTrials > 0 ? Math.round((stats.conversions / stats.totalTrials) * 100) : 0}% taxa de conversão
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Usuários Trial</CardTitle>
            <CardDescription>
              Lista de todos os usuários com trial ativo, expirado ou convertido
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Segmento</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Trial</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.company}</div>
                        <div className="text-sm text-muted-foreground">{user.whatsapp}</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.segment}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status, user.daysLeft)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(user.trialStart).toLocaleDateString('pt-BR')} -</div>
                        <div>{new Date(user.trialEnd).toLocaleDateString('pt-BR')}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {/* Extend Trial */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Clock className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Estender Trial</DialogTitle>
                              <DialogDescription>
                                Estender o período de trial para {user.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Dias para estender</Label>
                                <Select value={extendDays} onValueChange={setExtendDays}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="3">3 dias</SelectItem>
                                    <SelectItem value="7">7 dias</SelectItem>
                                    <SelectItem value="14">14 dias</SelectItem>
                                    <SelectItem value="30">30 dias</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button 
                                onClick={() => {
                                  handleExtendTrial(user.id, parseInt(extendDays));
                                }}
                              >
                                Estender Trial
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* Approve Upgrade */}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleApproveUpgrade(user.id)}
                          disabled={user.role === 'user'}
                        >
                          <UserCheck className="h-3 w-3" />
                        </Button>

                        {/* Block User */}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleBlockUser(user.id)}
                          disabled={user.status === 'blocked'}
                        >
                          <UserX className="h-3 w-3" />
                        </Button>

                        {/* Delete User */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <XCircle className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Excluir Usuário</DialogTitle>
                              <DialogDescription>
                                Tem certeza que deseja excluir {user.name}? Esta ação não pode ser desfeita.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline">Cancelar</Button>
                              <Button 
                                variant="destructive"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                Excluir
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}