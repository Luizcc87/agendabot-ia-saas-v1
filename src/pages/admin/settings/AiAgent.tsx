
import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Bot, 
  Upload, 
  FileText, 
  Trash2,
  MessageSquare,
  Clock,
  Calendar,
  Star,
  Settings,
  TestTube
} from 'lucide-react';
import { useForm } from 'react-hook-form';

interface AgentConfig {
  name: string;
  title: string;
  signature: string;
  personality: {
    formality: number;
    technicality: number;
    verbosity: number;
    humor: number;
  };
  features: {
    useEmojis: boolean;
    askConfirmation: boolean;
    suggestAlternatives: boolean;
    offerComplementary: boolean;
    sendSummary: boolean;
  };
  instructions: string;
  behaviors: {
    minAdvance: string;
    maxAdvance: string;
    allowWaitlist: boolean;
    autoConfirm: boolean;
    sendReminders: boolean;
    reminderTiming: string;
    reminderMessage: string;
    allowCancellation: boolean;
    cancellationDeadline: string;
    requestFeedback: boolean;
    feedbackTiming: string;
  };
}

const templates = [
  {
    id: 'beauty',
    name: 'Salão de Beleza',
    description: 'Focado em serviços de beleza e estética',
    instructions: 'Sou a assistente virtual do {empresa}. Estou aqui para ajudar você a agendar seus serviços de beleza. Posso agendar cortes, coloração, tratamentos e muito mais!'
  },
  {
    id: 'barbershop',
    name: 'Barbearia',
    description: 'Especializado em cortes masculinos',
    instructions: 'E aí, cara! Sou o assistente da {empresa}. Pronto para marcar seu corte? Temos horários disponíveis e os melhores profissionais da cidade!'
  },
  {
    id: 'clinic',
    name: 'Clínica',
    description: 'Para consultas médicas e exames',
    instructions: 'Olá! Sou a assistente da {empresa}. Estou aqui para ajudar no agendamento de consultas e exames. Como posso ajudá-lo hoje?'
  }
];

const variables = [
  '{nome_cliente}', '{empresa}', '{servicos}', '{horarios}', 
  '{endereco}', '{telefone}', '{profissionais}', '{data_hoje}'
];

export default function AiAgentSettings() {
  const [config, setConfig] = useState<AgentConfig>({
    name: 'Sofia',
    title: 'Assistente de Agendamentos',
    signature: 'Equipe {empresa}',
    personality: {
      formality: 6,
      technicality: 3,
      verbosity: 5,
      humor: 4
    },
    features: {
      useEmojis: true,
      askConfirmation: true,
      suggestAlternatives: true,
      offerComplementary: false,
      sendSummary: true
    },
    instructions: 'Olá! Sou a Sofia, assistente virtual da {empresa}. Estou aqui para ajudar você a agendar seus serviços. Como posso ajudá-lo hoje?',
    behaviors: {
      minAdvance: '1h',
      maxAdvance: '30d',
      allowWaitlist: true,
      autoConfirm: false,
      sendReminders: true,
      reminderTiming: '1d',
      reminderMessage: 'Olá! Lembrando do seu agendamento amanhã às {horario} para {servico}. Confirma presença?',
      allowCancellation: true,
      cancellationDeadline: '2h',
      requestFeedback: true,
      feedbackTiming: '1h'
    }
  });

  const [documents, setDocuments] = useState([
    { id: '1', name: 'Manual de Procedimentos.pdf', size: '2.4 MB', type: 'pdf', active: true },
    { id: '2', name: 'FAQ Clientes.txt', size: '156 KB', type: 'text', active: true },
    { id: '3', name: 'Política de Cancelamento.docx', size: '89 KB', type: 'doc', active: false }
  ]);

  const [testMode, setTestMode] = useState(false);

  const form = useForm<AgentConfig>({
    defaultValues: config
  });

  const updatePersonality = (key: keyof AgentConfig['personality'], value: number[]) => {
    setConfig(prev => ({
      ...prev,
      personality: {
        ...prev.personality,
        [key]: value[0]
      }
    }));
  };

  const updateFeature = (key: keyof AgentConfig['features'], value: boolean) => {
    setConfig(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [key]: value
      }
    }));
  };

  const loadTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setConfig(prev => ({
        ...prev,
        instructions: template.instructions
      }));
    }
  };

  const insertVariable = (variable: string) => {
    const currentInstructions = config.instructions;
    setConfig(prev => ({
      ...prev,
      instructions: currentInstructions + ' ' + variable
    }));
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Agente IA</h1>
            <p className="text-muted-foreground">
              Configure a personalidade e comportamento do assistente
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setTestMode(!testMode)}>
              <TestTube className="h-4 w-4 mr-2" />
              {testMode ? 'Sair do Teste' : 'Testar Agente'}
            </Button>
            <Button>Salvar Configurações</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Identity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Identidade do Agente
                </CardTitle>
                <CardDescription>
                  Configure a identidade básica do assistente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder-bot.jpg" />
                    <AvatarFallback>{config.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Alterar Avatar
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Recomendado: 200x200px, formato PNG ou JPG
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Assistente</Label>
                    <Input
                      id="name"
                      value={config.name}
                      onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex: Sofia"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Cargo/Função</Label>
                    <Input
                      id="title"
                      value={config.title}
                      onChange={(e) => setConfig(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Ex: Assistente de Agendamentos"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signature">Assinatura das Mensagens</Label>
                  <Input
                    id="signature"
                    value={config.signature}
                    onChange={(e) => setConfig(prev => ({ ...prev, signature: e.target.value }))}
                    placeholder="Ex: Equipe {empresa}"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Personality */}
            <Card>
              <CardHeader>
                <CardTitle>Personalidade e Tom</CardTitle>
                <CardDescription>
                  Ajuste como o assistente se comunica
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Formalidade</Label>
                      <span className="text-sm text-muted-foreground">
                        {config.personality.formality < 5 ? 'Casual' : 'Formal'}
                      </span>
                    </div>
                    <Slider
                      value={[config.personality.formality]}
                      onValueChange={(value) => updatePersonality('formality', value)}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Casual</span>
                      <span>Formal</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Linguagem Técnica</Label>
                      <span className="text-sm text-muted-foreground">
                        {config.personality.technicality < 5 ? 'Simples' : 'Técnica'}
                      </span>
                    </div>
                    <Slider
                      value={[config.personality.technicality]}
                      onValueChange={(value) => updatePersonality('technicality', value)}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Simples</span>
                      <span>Técnica</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Detalhamento</Label>
                      <span className="text-sm text-muted-foreground">
                        {config.personality.verbosity < 5 ? 'Conciso' : 'Detalhado'}
                      </span>
                    </div>
                    <Slider
                      value={[config.personality.verbosity]}
                      onValueChange={(value) => updatePersonality('verbosity', value)}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Conciso</span>
                      <span>Detalhado</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Humor</Label>
                      <span className="text-sm text-muted-foreground">
                        {config.personality.humor < 5 ? 'Sério' : 'Divertido'}
                      </span>
                    </div>
                    <Slider
                      value={[config.personality.humor]}
                      onValueChange={(value) => updatePersonality('humor', value)}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Sério</span>
                      <span>Divertido</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label>Características</Label>
                  
                  {Object.entries({
                    useEmojis: 'Usa emojis nas respostas',
                    askConfirmation: 'Faz perguntas de confirmação',
                    suggestAlternatives: 'Sugere horários alternativos',
                    offerComplementary: 'Oferece serviços complementares',
                    sendSummary: 'Envia resumo após agendamento'
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between">
                      <Label className="text-sm font-normal">{label}</Label>
                      <Switch
                        checked={config.features[key as keyof AgentConfig['features']]}
                        onCheckedChange={(checked) => updateFeature(key as keyof AgentConfig['features'], checked)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Base de Conhecimento</CardTitle>
                <CardDescription>
                  Configure as instruções principais do assistente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="template">Templates Prontos</Label>
                    <Select onValueChange={loadTemplate}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Carregar template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instructions">Instruções Principais</Label>
                  <Textarea
                    id="instructions"
                    value={config.instructions}
                    onChange={(e) => setConfig(prev => ({ ...prev, instructions: e.target.value }))}
                    placeholder="Digite as instruções para o assistente..."
                    rows={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Variáveis Disponíveis</Label>
                  <div className="flex flex-wrap gap-2">
                    {variables.map((variable) => (
                      <Button
                        key={variable}
                        variant="outline"
                        size="sm"
                        onClick={() => insertVariable(variable)}
                      >
                        {variable}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Documentos e Arquivos</CardTitle>
                <CardDescription>
                  Faça upload de documentos para enriquecer o conhecimento do assistente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Arraste arquivos aqui ou clique para fazer upload
                  </p>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Selecionar Arquivos
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Limite: 10MB por arquivo. Formatos: PDF, TXT, DOC, DOCX
                  </p>
                </div>
                
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.size}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={doc.active}
                          onCheckedChange={(checked) => {
                            setDocuments(documents.map(d => 
                              d.id === doc.id ? { ...d, active: checked } : d
                            ));
                          }}
                        />
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Advanced Behaviors */}
            <Card>
              <CardHeader>
                <CardTitle>Comportamentos Avançados</CardTitle>
                <CardDescription>
                  Configure comportamentos específicos do assistente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="scheduling">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Agendamentos
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Antecedência Mínima</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="1 hora" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30min">30 minutos</SelectItem>
                              <SelectItem value="1h">1 hora</SelectItem>
                              <SelectItem value="2h">2 horas</SelectItem>
                              <SelectItem value="1d">1 dia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Antecedência Máxima</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="30 dias" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="7d">7 dias</SelectItem>
                              <SelectItem value="15d">15 dias</SelectItem>
                              <SelectItem value="30d">30 dias</SelectItem>
                              <SelectItem value="60d">60 dias</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Permitir lista de espera</Label>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Confirmar agendamentos automaticamente</Label>
                          <Switch />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="reminders">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Lembretes
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Enviar lembretes</Label>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Quando enviar</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="1 dia antes" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1h">1 hora antes</SelectItem>
                            <SelectItem value="2h">2 horas antes</SelectItem>
                            <SelectItem value="1d">1 dia antes</SelectItem>
                            <SelectItem value="2d">2 dias antes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Mensagem do lembrete</Label>
                        <Textarea
                          placeholder="Olá! Lembrando do seu agendamento..."
                          rows={3}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="feedback">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        Feedback e Avaliações
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Solicitar avaliação após serviço</Label>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Quando solicitar</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="1 hora depois" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Imediatamente</SelectItem>
                            <SelectItem value="1h">1 hora depois</SelectItem>
                            <SelectItem value="1d">1 dia depois</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Preview do Chat
                </CardTitle>
                <CardDescription>
                  Veja como o assistente se comporta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4 space-y-3 min-h-[300px]">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{config.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="bg-background rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">{config.instructions}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 flex-row-reverse">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Oi, queria agendar um corte</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{config.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="bg-background rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">
                        Perfeito! {config.features.useEmojis ? '✂️ ' : ''}
                        Vou te ajudar com o agendamento. 
                        {config.personality.verbosity > 5 ? ' Temos diversos horários disponíveis e profissionais especializados.' : ''}
                        {config.features.askConfirmation ? ' Qual horário você prefere?' : ''}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <TestTube className="h-4 w-4 mr-2" />
                    Testar
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Status do Agente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status</span>
                  <Badge variant="default">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Última atualização</span>
                  <span className="text-sm text-muted-foreground">Há 2 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Conversas hoje</span>
                  <span className="text-sm font-medium">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Taxa de conversão</span>
                  <span className="text-sm font-medium">73%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
