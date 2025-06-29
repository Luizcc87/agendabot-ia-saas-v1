
import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plug, 
  Calendar, 
  Video, 
  CreditCard, 
  Globe, 
  Webhook,
  Key,
  Copy,
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  Settings,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  status: 'available' | 'soon' | 'beta' | 'connected';
  category: 'calendar' | 'payment' | 'communication' | 'productivity';
  popular?: boolean;
}

interface WebhookLog {
  id: string;
  timestamp: string;
  event: string;
  url: string;
  status: number;
  response: string;
}

const integrations: Integration[] = [
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sincronize agendamentos automaticamente com sua agenda',
    icon: Calendar,
    status: 'soon',
    category: 'calendar',
    popular: true
  },
  {
    id: 'google-meet',
    name: 'Google Meet',
    description: 'Crie reuniões online automaticamente para consultas',
    icon: Video,
    status: 'beta',
    category: 'communication'
  },
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Integração com videoconferências do Zoom',
    icon: Video,
    status: 'soon',
    category: 'communication',
    popular: true
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Pagamentos internacionais com cartão de crédito',
    icon: CreditCard,
    status: 'soon',
    category: 'payment'
  },
  {
    id: 'asaas',
    name: 'Asaas',
    description: 'Cobranças, PIX e assinaturas no Brasil',
    icon: CreditCard,
    status: 'available',
    category: 'payment',
    popular: true
  },
  {
    id: 'mercadopago',
    name: 'Mercado Pago',
    description: 'Pagamentos e PIX para toda América Latina',
    icon: CreditCard,
    status: 'available',
    category: 'payment'
  },
  {
    id: 'outlook',
    name: 'Outlook Calendar',
    description: 'Sincronização com calendário do Microsoft Outlook',
    icon: Calendar,
    status: 'soon',
    category: 'calendar'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Conecte com milhares de aplicativos via Zapier',
    icon: Zap,
    status: 'beta',
    category: 'productivity'
  }
];

export default function IntegrationsSettings() {
  const [webhookConfig, setWebhookConfig] = useState({
    url: 'https://api.suaempresa.com/webhook/agendabot',
    secret: 'whk_1234567890abcdef',
    events: {
      appointmentCreated: true,
      appointmentCanceled: true,
      appointmentCompleted: false,
      conversationStarted: true,
      conversationEnded: false
    }
  });

  const [apiConfig, setApiConfig] = useState({
    apiKey: 'ab_1234567890abcdef1234567890abcdef',
    rateLimit: '1000/hour',
    lastUsed: '2024-01-15 14:30:25'
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [filter, setFilter] = useState('all');

  const [webhookLogs] = useState<WebhookLog[]>([
    {
      id: '1',
      timestamp: '2024-01-15 14:30:25',
      event: 'appointment.created',
      url: webhookConfig.url,
      status: 200,
      response: 'OK'
    },
    {
      id: '2',
      timestamp: '2024-01-15 14:25:10',
      event: 'conversation.started',
      url: webhookConfig.url,
      status: 200,
      response: 'OK'
    },
    {
      id: '3',
      timestamp: '2024-01-15 14:20:45',
      event: 'appointment.canceled',
      url: webhookConfig.url,
      status: 500,
      response: 'Internal Server Error'
    }
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copiado para a área de transferência!');
  };

  const generateApiKey = () => {
    const newKey = 'ab_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiConfig(prev => ({ ...prev, apiKey: newKey }));
    toast.success('Nova API Key gerada!');
  };

  const testWebhook = () => {
    toast.success('Webhook testado com sucesso!');
  };

  const filteredIntegrations = integrations.filter(integration => 
    filter === 'all' || integration.category === filter
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge variant="default">Disponível</Badge>;
      case 'connected':
        return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Conectado</Badge>;
      case 'beta':
        return <Badge variant="secondary">Beta</Badge>;
      case 'soon':
        return <Badge variant="outline">Em breve</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: number) => {
    if (status >= 200 && status < 300) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (status >= 400) {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    } else {
      return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Integrações</h1>
          <p className="text-muted-foreground">
            Conecte o AgendaBot com suas ferramentas favoritas
          </p>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              <SelectItem value="calendar">Calendário</SelectItem>
              <SelectItem value="payment">Pagamentos</SelectItem>
              <SelectItem value="communication">Comunicação</SelectItem>
              <SelectItem value="productivity">Produtividade</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => {
            const IconComponent = integration.icon;
            const isAvailable = integration.status === 'available' || integration.status === 'connected';
            
            return (
              <Card key={integration.id} className="relative">
                {integration.popular && (
                  <Badge className="absolute -top-2 -right-2 z-10">Popular</Badge>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      {getStatusBadge(integration.status)}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="mb-4 min-h-[3rem]">
                    {integration.description}
                  </CardDescription>
                  
                  <div className="flex gap-2">
                    {integration.status === 'connected' ? (
                      <>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="h-4 w-4 mr-2" />
                          Configurar
                        </Button>
                        <Button variant="ghost" size="sm">
                          Desconectar
                        </Button>
                      </>
                    ) : isAvailable ? (
                      <Button size="sm" className="flex-1" disabled>
                        Conectar
                      </Button>
                    ) : integration.status === 'beta' ? (
                      <Button variant="outline" size="sm" className="flex-1">
                        Entrar na lista
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="flex-1">
                        Notificar-me
                      </Button>
                    )}
                    
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Webhooks Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Webhook className="h-5 w-5" />
              Webhooks Personalizados
            </CardTitle>
            <CardDescription>
              Configure webhooks para receber notificações em tempo real
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">URL do Webhook</Label>
                <div className="flex gap-2">
                  <Input
                    id="webhook-url"
                    value={webhookConfig.url}
                    onChange={(e) => setWebhookConfig(prev => ({ 
                      ...prev, 
                      url: e.target.value 
                    }))}
                    placeholder="https://api.suaempresa.com/webhook"
                  />
                  <Button variant="outline" onClick={testWebhook}>
                    Testar
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook-secret">Secret/Token</Label>
                <div className="flex gap-2">
                  <Input
                    id="webhook-secret"
                    type={showSecret ? "text" : "password"}
                    value={webhookConfig.secret}
                    onChange={(e) => setWebhookConfig(prev => ({ 
                      ...prev, 
                      secret: e.target.value 
                    }))}
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowSecret(!showSecret)}
                  >
                    {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(webhookConfig.secret)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Eventos para Notificar</Label>
              
              {Object.entries({
                appointmentCreated: 'Agendamento criado',
                appointmentCanceled: 'Agendamento cancelado',
                appointmentCompleted: 'Agendamento concluído',
                conversationStarted: 'Conversa iniciada',
                conversationEnded: 'Conversa finalizada'
              }).map(([key, label]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={webhookConfig.events[key as keyof typeof webhookConfig.events]}
                    onCheckedChange={(checked) => setWebhookConfig(prev => ({
                      ...prev,
                      events: {
                        ...prev.events,
                        [key]: checked
                      }
                    }))}
                  />
                  <Label htmlFor={key} className="text-sm font-normal">
                    {label}
                  </Label>
                </div>
              ))}
            </div>
            
            <Button>Salvar Configurações do Webhook</Button>
          </CardContent>
        </Card>

        {/* API Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API para Desenvolvedores
            </CardTitle>
            <CardDescription>
              Integre o AgendaBot com suas próprias aplicações
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">API Key</Label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 bg-muted px-2 py-1 rounded text-sm font-mono">
                    {showApiKey ? apiConfig.apiKey : '••••••••••••••••••••••••••••••••'}
                  </code>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyToClipboard(apiConfig.apiKey)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Rate Limit</Label>
                <p className="text-sm font-mono mt-1">{apiConfig.rateLimit}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Último Uso</Label>
                <p className="text-sm font-mono mt-1">{apiConfig.lastUsed}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={generateApiKey}>
                Regenerar API Key
              </Button>
              <Button variant="outline" disabled>
                <ExternalLink className="h-4 w-4 mr-2" />
                Documentação (em breve)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Webhook Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Logs de Webhooks</CardTitle>
            <CardDescription>
              Histórico de webhooks enviados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Evento</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Resposta</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {webhookLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-1 py-0.5 rounded">
                        {log.event}
                      </code>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      <code className="text-xs">{log.url}</code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        <span className="font-mono text-sm">{log.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {log.response}
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
