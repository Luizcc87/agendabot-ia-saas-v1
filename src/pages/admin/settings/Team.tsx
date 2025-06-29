
import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Settings, Users, Shield, Bell } from 'lucide-react';

export default function TeamSettingsPage() {
  const [autoSignup, setAutoSignup] = useState(false);
  const [editingRole, setEditingRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'admin',
      name: 'Administrador',
      description: 'Acesso total ao sistema',
      isSystem: true,
      permissions: ['Todos os acessos']
    },
    {
      id: 'attendant',
      name: 'Atendente',
      description: 'Gerencia conversas e agendamentos',
      isSystem: false,
      permissions: ['Conversas', 'Agendamentos', 'Clientes']
    },
    {
      id: 'viewer',
      name: 'Visualizador',
      description: 'Apenas visualização de dados',
      isSystem: false,
      permissions: ['Visualizar relatórios', 'Visualizar agenda']
    }
  ];

  const notificationMatrix = [
    { type: 'Novo agendamento', admin: true, attendant: true, viewer: false },
    { type: 'Cancelamento', admin: true, attendant: true, viewer: false },
    { type: 'Nova conversa', admin: true, attendant: true, viewer: false },
    { type: 'Cliente aguardando', admin: true, attendant: true, viewer: false }
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-6 w-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold">Configurações de Equipe</h1>
          </div>
          <p className="text-gray-600">
            Gerencie permissões, perfis e políticas da sua equipe
          </p>
        </div>

        {/* Seção 1: Configurações Gerais */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Políticas de Acesso</CardTitle>
            <CardDescription>
              Defina como novos membros podem entrar na sua equipe
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Auto-cadastro */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Permitir auto-cadastro</Label>
                <p className="text-sm text-gray-500">
                  Membros podem se cadastrar usando email corporativo
                </p>
              </div>
              <Switch checked={autoSignup} onCheckedChange={setAutoSignup} />
            </div>

            {/* Domínios permitidos */}
            <div className="space-y-2">
              <Label>Domínios de email permitidos</Label>
              <div className="flex gap-2">
                <Input placeholder="exemplo.com" />
                <Button>Adicionar</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">
                  @suaempresa.com
                  <button className="ml-2 text-xs">×</button>
                </Badge>
              </div>
            </div>

            {/* Expiração de convites */}
            <div className="space-y-2">
              <Label>Convites expiram em</Label>
              <Select defaultValue="7d">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">24 horas</SelectItem>
                  <SelectItem value="7d">7 dias</SelectItem>
                  <SelectItem value="30d">30 dias</SelectItem>
                  <SelectItem value="never">Nunca</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Limite de usuários */}
            <div className="space-y-2">
              <Label>Limite de usuários</Label>
              <div className="flex items-center gap-4">
                <Progress value={60} className="flex-1" />
                <span className="text-sm font-medium">3 de 5</span>
              </div>
              <p className="text-xs text-gray-500">
                Para aumentar o limite, faça upgrade do plano
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Seção 2: Perfis e Permissões */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Perfis de Acesso</CardTitle>
                <CardDescription>
                  Configure as permissões para cada tipo de usuário
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Criar Perfil
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {roles.map((role) => (
                <div key={role.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        {role.name}
                        {role.isSystem && (
                          <Badge variant="secondary" className="text-xs">Sistema</Badge>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {role.description}
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" disabled={role.isSystem}>
                          <Settings className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Editar Perfil: {role.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Nome do Perfil</Label>
                            <Input defaultValue={role.name} />
                          </div>
                          <div>
                            <Label>Descrição</Label>
                            <Textarea defaultValue={role.description} />
                          </div>
                          <div>
                            <Label>Permissões</Label>
                            <div className="grid grid-cols-2 gap-4 mt-2 p-4 border rounded-lg">
                              <div className="space-y-2">
                                <h4 className="font-medium text-sm">Conversas</h4>
                                <label className="flex items-center gap-2 text-sm">
                                  <Checkbox defaultChecked /> Visualizar
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                  <Checkbox defaultChecked /> Responder
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                  <Checkbox /> Excluir
                                </label>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-medium text-sm">Agendamentos</h4>
                                <label className="flex items-center gap-2 text-sm">
                                  <Checkbox defaultChecked /> Visualizar
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                  <Checkbox defaultChecked /> Criar
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                  <Checkbox defaultChecked /> Editar
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                  <Checkbox /> Cancelar
                                </label>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-medium text-sm">Clientes</h4>
                                <label className="flex items-center gap-2 text-sm">
                                  <Checkbox defaultChecked /> Visualizar
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                  <Checkbox defaultChecked /> Editar
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                  <Checkbox /> Excluir
                                </label>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-medium text-sm">Configurações</h4>
                                <label className="flex items-center gap-2 text-sm">
                                  <Checkbox /> Acessar
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                  <Checkbox /> Editar
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancelar</Button>
                          <Button>Salvar Alterações</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-2">Permissões:</p>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Seção 3: Notificações da Equipe */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Notificações por Perfil</CardTitle>
            </div>
            <CardDescription>
              Configure quais notificações cada perfil deve receber
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo de Notificação</TableHead>
                  <TableHead className="text-center">Admin</TableHead>
                  <TableHead className="text-center">Atendente</TableHead>
                  <TableHead className="text-center">Visualizador</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notificationMatrix.map((notification, index) => (
                  <TableRow key={index}>
                    <TableCell>{notification.type}</TableCell>
                    <TableCell className="text-center">
                      <Checkbox defaultChecked={notification.admin} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox defaultChecked={notification.attendant} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox defaultChecked={notification.viewer} />
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
