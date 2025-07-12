import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  MessageSquare, 
  CheckCircle, 
  Calendar, 
  User, 
  Building, 
  Phone, 
  Mail, 
  Lock,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const segments = [
  'Salão de Beleza',
  'Barbearia',
  'Clínica Estética',
  'Consultório Médico',
  'Consultório Odontológico',
  'Pet Shop',
  'Academia',
  'Estúdio de Tatuagem',
  'Clínica de Fisioterapia',
  'Outro'
];

const onboardingSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  company: z.string().min(2, 'Nome da empresa é obrigatório'),
  whatsapp: z.string().min(10, 'WhatsApp deve ter pelo menos 10 dígitos'),
  segment: z.string().min(1, 'Selecione um segmento'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
});

type OnboardingData = z.infer<typeof onboardingSchema>;

export default function Onboarding() {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [userData, setUserData] = useState<OnboardingData | null>(null);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const form = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: '',
      company: '',
      whatsapp: '',
      segment: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: OnboardingData) => {
    try {
      await signUp(data);
      setUserData(data);
      setStep('success');
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      // TODO: Mostrar toast de erro
    }
  };

  const trialStartDate = new Date();
  const trialEndDate = new Date();
  trialEndDate.setDate(trialStartDate.getDate() + 7);

  if (step === 'success' && userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-green-600">
              Conta criada com sucesso!
            </CardTitle>
            <CardDescription className="text-lg">
              Seu trial de 7 dias começou agora
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Dados do Lead */}
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Dados da Conta
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Nome</Label>
                  <p className="font-medium">{userData.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Empresa</Label>
                  <p className="font-medium">{userData.company}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{userData.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">WhatsApp</Label>
                  <p className="font-medium">{userData.whatsapp}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Segmento</Label>
                  <p className="font-medium">{userData.segment}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Role</Label>
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    Trial
                  </Badge>
                </div>
              </div>
            </div>

            {/* Período do Trial */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-primary mb-4">
                <Calendar className="h-5 w-5" />
                Período do Trial
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Data de Início</Label>
                  <p className="font-medium">{trialStartDate.toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Data de Término</Label>
                  <p className="font-medium">{trialEndDate.toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">
                  <strong>Importante:</strong> Você tem 7 dias para testar todas as funcionalidades. 
                  Após esse período, será necessário escolher um plano para continuar usando o AgendaBot.
                </p>
              </div>
            </div>

            {/* Próximos Passos */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Próximos Passos
              </h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Configure sua empresa</p>
                    <p className="text-sm text-muted-foreground">Adicione horários de funcionamento e informações básicas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Conecte seu WhatsApp</p>
                    <p className="text-sm text-muted-foreground">Integre sua conta para começar a receber mensagens</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Configure seus serviços</p>
                    <p className="text-sm text-muted-foreground">Adicione os serviços que você oferece e seus preços</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild size="lg" className="flex-1">
                <Link to="/admin/dashboard">
                  Acessar Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1">
                <Link to="/admin/settings">
                  Ir para Configurações
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-2xl">AgendaBot</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Comece seu teste gratuito</h1>
          <p className="text-muted-foreground">
            Preencha seus dados e tenha acesso a todas as funcionalidades por 7 dias
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Criar Conta Trial</CardTitle>
            <CardDescription>
              Apenas alguns dados para personalizar sua experiência
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Nome Completo
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Nome da Empresa
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do seu negócio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        WhatsApp Business
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="(11) 99999-9999" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="segment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Segmento do Negócio</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione seu segmento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {segments.map((segment) => (
                            <SelectItem key={segment} value={segment}>
                              {segment}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Senha
                      </FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Mínimo 6 caracteres" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Criando conta...' : 'Começar Teste Gratuito'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta?{' '}
                <Link to="/auth" className="text-primary hover:underline">
                  Faça login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Trial Benefits */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3 text-center">
              O que está incluso no seu trial:
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Acesso completo por 7 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Integração com WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>IA personalizada para seu negócio</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Suporte completo</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}