
import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MessageSquare, 
  QrCode, 
  Copy, 
  RefreshCw, 
  Power, 
  Wifi, 
  WifiOff,
  Clock,
  Filter,
  Download,
  Trash2,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'connection' | 'message' | 'error' | 'webhook';
  event: string;
  status: 'success' | 'error' | 'warning';
  description: string;
}

export default function WhatsAppSettings() {
  const [isConnected, setIsConnected] = useState(true);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [instanceInfo, setInstanceInfo] = useState({
    number: '+55 11 99999-9999',
    instanceId: 'wa_001_agendabot',
    webhookUrl: 'https://api.agendabot.com/webhook/whatsapp',
    lastSync: '2024-01-15 14:30:25',
    messagesCount: 127,
    serverStatus: 'online'
  });

  const [settings, setSettings] = useState({
    messageDelay: 2,
    workingHours: {
      enabled: true,
      start: '08:00',
      end: '18:00'
    },
    offlineMessage: 'Olá! No momento estamos fora do horário de atendimento. Retornaremos às 08:00.',
    autoReply: {
      enabled: true,
      message: 'Obrigado pela mensagem! Em breve alguém da nossa equipe entrará em contato.'
    },
    blacklist: ''
  });

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: '2024-01-15 14:30:25',
      type: 'connection',
      event: 'Instância conectada',
      status: 'success',
      description: 'WhatsApp conectado com sucesso'
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:25:10',
      event: 'Mensagem enviada',
      type: 'message',
      status: 'success',
      description: 'Mensagem para +55 11 98765-4321'
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:20:45',
      event: 'Webhook chamado',
      type: 'webhook',
      status: 'success',
      description: 'POST /webhook/whatsapp - 200 OK'
    },
    {
      id: '4',
      timestamp: '2024-01-15 14:15:32',
      event: 'Erro de envio',
      type: 'error',
      status: 'error',
      description: 'Falha ao enviar mensagem - timeout'
    }
  ]);

  const [logFilter, setLogFilter] = useState('all');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copiado para a área de transferência!');
  };

  const generateQrCode = () => {
    setQrModalOpen(true);
    // Simulate QR code generation
    setTimeout(() => {
      toast.success('QR Code gerado com sucesso!');
    }, 1000);
  };

  const disconnectWhatsApp = () => {
    setIsConnected(false);
    toast.success('WhatsApp desconectado');
  };

  const restartInstance = () => {
    toast.success('Instância reiniciada com sucesso');
  };

  const filteredLogs = logs.filter(log => 
    logFilter === 'all' || log.type === logFilter
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">WhatsApp</h1>
          <p className="text-muted-foreground">
            Gerencie a conexão e configurações do WhatsApp Business
          </p>
        </div>

        {/* Connection Status Card */}
        <Card className="relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${
            isConnected 
              ? 'from-green-500/10 to-emerald-500/10' 
              : 'from-red-500/10 to-orange-500/10'
          }`} />
          <CardContent className="relative pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-full ${
                  isConnected ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                }`}>
                  {isConnected ? (
                    <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-400" />
                  ) : (
                    <MessageSquare className="h-8 w-8 text-red-600 dark:text-red-400" />
                  )}
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-semibold">
                      {isConnected ? 'WhatsApp Conectado' : 'WhatsApp Desconectado'}
                    </h3>
                    <Badge variant={isConnected ? "default" : "destructive"}>
                      {isConnected ? (
                        <>
                          <Wifi className="h-3 w-3 mr-1" />
                          Online
                        </>
                      ) : (
                        <>
                          <WifiOff className="h-3 w-3 mr-1" />
                          Offline
                        </>
                      )}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground">
                    {isConnected 
                      ? `Conectado como ${instanceInfo.number}`
                      : 'Conecte sua conta do WhatsApp para começar'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {isConnected ? (
                  <>
                    <Button variant="outline" onClick={restartInstance}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reiniciar
                    </Button>
                    <Button variant="destructive" onClick={disconnectWhatsApp}>
                      <Power className="h-4 w-4 mr-2" />
                      Desconectar
                    </Button>
                  </>
                ) : (
                  <Dialog open={qrModalOpen} onOpenChange={setQrModalOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={generateQrCode}>
                        <QrCode className="h-4 w-4 mr-2" />
                        Conectar WhatsApp
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Conectar WhatsApp</DialogTitle>
                        <DialogDescription>
                          Escaneie o QR Code com seu WhatsApp
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center">
                          <QrCode className="h-32 w-32 text-muted-foreground" />
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-2">
                            QR Code expira em: 02:45
                          </p>
                          <Button variant="outline" size="sm" onClick={generateQrCode}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Gerar Novo QR Code
                          </Button>
                        </div>
                        
                        <div className="text-left w-full">
                          <h4 className="font-medium mb-2">Como conectar:</h4>
                          <ol className="text-sm text-muted-foreground space-y-1">
                            <li>1. Abra o WhatsApp no seu celular</li>
                            <li>2. Toque em Menu ou Configurações</li>
                            <li>3. Toque em Aparelhos conectados</li>
                            <li>4. Toque em Conectar um aparelho</li>
                            <li>5. Aponte seu telefone para esta tela</li>
                          </ol>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Instance Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informações da Instância</CardTitle>
              <CardDescription>
                Detalhes técnicos da conexão WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Número</Label>
                  <p className="font-mono text-sm">{instanceInfo.number}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Status do Servidor</Label>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm capitalize">{instanceInfo.serverStatus}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">ID da Instância</Label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-muted px-2 py-1 rounded text-sm">
                    {instanceInfo.instanceId}
                  </code>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyToClipboard(instanceInfo.instanceId)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Webhook URL</Label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-muted px-2 py-1 rounded text-sm break-all">
                    {instanceInfo.webhookUrl}
                  </code>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyToClipboard(instanceInfo.webhookUrl)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Última Sincronização</Label>
                  <p className="text-sm">{instanceInfo.lastSync}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Mensagens Hoje</Label>
                  <p className="text-sm font-medium">{instanceInfo.messagesCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Mensagens</CardTitle>
              <CardDescription>
                Configure o comportamento das mensagens automáticas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Delay entre mensagens: {settings.messageDelay}s</Label>
                <Slider
                  value={[settings.messageDelay]}
                  onValueChange={(value) => setSettings(prev => ({ 
                    ...prev, 
                    messageDelay: value[0] 
                  }))}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Horário de atendimento automático</Label>
                  <Switch 
                    checked={settings.workingHours.enabled}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      workingHours: { ...prev.workingHours, enabled: checked }
                    }))}
                  />
                </div>
                
                {settings.workingHours.enabled && (
                  <div className="grid grid-cols-2 gap-2 ml-6">
                    <div>
                      <Label className="text-sm">Início</Label>
                      <Input 
                        type="time" 
                        value={settings.workingHours.start}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          workingHours: { ...prev.workingHours, start: e.target.value }
                        }))}
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Fim</Label>
                      <Input 
                        type="time" 
                        value={settings.workingHours.end}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          workingHours: { ...prev.workingHours, end: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="offline-message">Mensagem fora de horário</Label>
                <Textarea
                  id="offline-message"
                  value={settings.offlineMessage}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    offlineMessage: e.target.value 
                  }))}
                  rows={3}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Auto-resposta quando offline</Label>
                  <Switch 
                    checked={settings.autoReply.enabled}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      autoReply: { ...prev.autoReply, enabled: checked }
                    }))}
                  />
                </div>
                
                {settings.autoReply.enabled && (
                  <Textarea
                    value={settings.autoReply.message}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      autoReply: { ...prev.autoReply, message: e.target.value }
                    }))}
                    rows={2}
                    className="ml-6"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blacklist */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Bloqueio</CardTitle>
            <CardDescription>
              Números que não receberão mensagens automáticas (um por linha)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="+55 11 99999-9999&#10;+55 11 88888-8888"
              value={settings.blacklist}
              onChange={(e) => setSettings(prev => ({ ...prev, blacklist: e.target.value }))}
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Activity Logs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Logs de Atividade</CardTitle>
                <CardDescription>
                  Histórico de eventos e atividades da instância
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-2">
                <Select value={logFilter} onValueChange={setLogFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="connection">Conexão</SelectItem>
                    <SelectItem value="message">Mensagens</SelectItem>
                    <SelectItem value="webhook">Webhooks</SelectItem>
                    <SelectItem value="error">Erros</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Horário</TableHead>
                  <TableHead>Evento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {log.event}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        <span className="text-sm capitalize">{log.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                      {log.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Avançadas</CardTitle>
            <CardDescription>
              Operações de manutenção e gerenciamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reiniciar Instância
              </Button>
              <Button variant="outline">
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar Fila de Mensagens
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Backup de Conversas
              </Button>
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Testar Conexão
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
