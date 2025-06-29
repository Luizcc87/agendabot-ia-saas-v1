
import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Upload, 
  Save, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  Globe,
  Instagram,
  Facebook,
  Loader2
} from 'lucide-react';
import { useForm } from 'react-hook-form';

interface CompanyForm {
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  social: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  timezone: string;
}

interface BusinessHours {
  [key: string]: {
    enabled: boolean;
    start: string;
    end: string;
    break?: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
}

const weekDays = [
  { key: 'monday', label: 'Segunda-feira' },
  { key: 'tuesday', label: 'Terça-feira' },
  { key: 'wednesday', label: 'Quarta-feira' },
  { key: 'thursday', label: 'Quinta-feira' },
  { key: 'friday', label: 'Sexta-feira' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' },
];

const timezones = [
  { value: 'America/Sao_Paulo', label: 'Brasília (GMT-3)' },
  { value: 'America/Manaus', label: 'Manaus (GMT-4)' },
  { value: 'America/Rio_Branco', label: 'Rio Branco (GMT-5)' },
];

export default function CompanySettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const form = useForm<CompanyForm>({
    defaultValues: {
      name: 'Salão Beleza & Arte',
      cnpj: '12.345.678/0001-90',
      email: 'contato@belezaarte.com.br',
      phone: '(11) 99999-9999',
      website: 'https://belezaarte.com.br',
      description: 'Salão de beleza especializado em cortes modernos, coloração e tratamentos capilares. Oferecemos um ambiente acolhedor e profissionais qualificados.',
      address: {
        street: 'Rua das Flores',
        number: '123',
        complement: 'Sala 45',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      },
      social: {
        instagram: '@belezaarte',
        facebook: 'belezaartesalon',
        whatsapp: '5511999999999'
      },
      timezone: 'America/Sao_Paulo'
    }
  });

  const [businessHours, setBusinessHours] = useState<BusinessHours>({
    monday: { enabled: true, start: '08:00', end: '18:00', break: { enabled: true, start: '12:00', end: '13:00' } },
    tuesday: { enabled: true, start: '08:00', end: '18:00', break: { enabled: true, start: '12:00', end: '13:00' } },
    wednesday: { enabled: true, start: '08:00', end: '18:00', break: { enabled: true, start: '12:00', end: '13:00' } },
    thursday: { enabled: true, start: '08:00', end: '18:00', break: { enabled: true, start: '12:00', end: '13:00' } },
    friday: { enabled: true, start: '08:00', end: '18:00', break: { enabled: true, start: '12:00', end: '13:00' } },
    saturday: { enabled: true, start: '09:00', end: '17:00', break: { enabled: false, start: '12:00', end: '13:00' } },
    sunday: { enabled: false, start: '09:00', end: '17:00', break: { enabled: false, start: '12:00', end: '13:00' } },
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (data: CompanyForm) => {
    setIsLoading(true);
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Company data:', { ...data, businessHours });
    setIsLoading(false);
  };

  const updateBusinessHours = (day: string, field: string, value: any) => {
    setBusinessHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Building className="h-5 w-5 text-muted-foreground" />
              <h1 className="text-2xl font-bold">Configurações da Empresa</h1>
            </div>
            <p className="text-muted-foreground">
              Gerencie as informações básicas e horários de funcionamento
            </p>
          </div>
          <Button onClick={form.handleSubmit(handleSubmit)} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Logo Upload */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Logo da Empresa</CardTitle>
              <CardDescription>
                Faça upload do logotipo que aparecerá em seus agendamentos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 border-2 border-dashed border-muted-foreground rounded-lg flex items-center justify-center mb-4">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain rounded-lg" />
                  ) : (
                    <div className="text-center">
                      <Building className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Nenhuma logo</p>
                    </div>
                  )}
                </div>
                <Label htmlFor="logo-upload" className="cursor-pointer">
                  <Button variant="outline" asChild>
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      Escolher Arquivo
                    </span>
                  </Button>
                </Label>
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  PNG, JPG até 2MB<br />
                  Recomendado: 200x200px
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Dados principais da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nome da Empresa</Label>
                  <Input
                    id="company-name"
                    {...form.register('name')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-cnpj">CNPJ</Label>
                  <Input
                    id="company-cnpj"
                    placeholder="00.000.000/0000-00"
                    {...form.register('cnpj')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company-email"
                      type="email"
                      className="pl-10"
                      {...form.register('email')}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company-phone"
                      className="pl-10"
                      placeholder="(11) 99999-9999"
                      {...form.register('phone')}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="company-website"
                    className="pl-10"
                    placeholder="https://seusite.com.br"
                    {...form.register('website')}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-description">Descrição do Negócio</Label>
                <Textarea
                  id="company-description"
                  placeholder="Descreva seu negócio, serviços oferecidos..."
                  rows={3}
                  {...form.register('description')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Select defaultValue="America/Sao_Paulo">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Hours */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Horário de Funcionamento</CardTitle>
            </div>
            <CardDescription>
              Configure os dias e horários em que sua empresa funciona
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weekDays.map((day) => (
                <div key={day.key} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-32">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={businessHours[day.key]?.enabled}
                        onCheckedChange={(checked) => updateBusinessHours(day.key, 'enabled', checked)}
                      />
                      <Label className="font-medium">{day.label}</Label>
                    </div>
                  </div>
                  
                  {businessHours[day.key]?.enabled && (
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Abertura:</Label>
                        <Input
                          type="time"
                          value={businessHours[day.key]?.start}
                          onChange={(e) => updateBusinessHours(day.key, 'start', e.target.value)}
                          className="w-24"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Fechamento:</Label>
                        <Input
                          type="time"
                          value={businessHours[day.key]?.end}
                          onChange={(e) => updateBusinessHours(day.key, 'end', e.target.value)}
                          className="w-24"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={businessHours[day.key]?.break?.enabled}
                          onCheckedChange={(checked) => updateBusinessHours(day.key, 'break', {
                            ...businessHours[day.key].break,
                            enabled: checked
                          })}
                        />
                        <Label className="text-sm">Intervalo:</Label>
                        {businessHours[day.key]?.break?.enabled && (
                          <>
                            <Input
                              type="time"
                              value={businessHours[day.key]?.break?.start}
                              onChange={(e) => updateBusinessHours(day.key, 'break', {
                                ...businessHours[day.key].break,
                                start: e.target.value
                              })}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">às</span>
                            <Input
                              type="time"
                              value={businessHours[day.key]?.break?.end}
                              onChange={(e) => updateBusinessHours(day.key, 'break', {
                                ...businessHours[day.key].break,
                                end: e.target.value
                              })}
                              className="w-20"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {!businessHours[day.key]?.enabled && (
                    <Badge variant="secondary" className="ml-auto">
                      Fechado
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Endereço</CardTitle>
            </div>
            <CardDescription>
              Endereço físico da sua empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3 space-y-2">
                <Label htmlFor="address-street">Rua/Avenida</Label>
                <Input
                  id="address-street"
                  {...form.register('address.street')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address-number">Número</Label>
                <Input
                  id="address-number"
                  {...form.register('address.number')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address-complement">Complemento</Label>
                <Input
                  id="address-complement"
                  placeholder="Apartamento, sala, etc."
                  {...form.register('address.complement')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address-neighborhood">Bairro</Label>
                <Input
                  id="address-neighborhood"
                  {...form.register('address.neighborhood')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address-city">Cidade</Label>
                <Input
                  id="address-city"
                  {...form.register('address.city')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address-state">Estado</Label>
                <Input
                  id="address-state"
                  placeholder="SP"
                  {...form.register('address.state')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address-zipcode">CEP</Label>
                <Input
                  id="address-zipcode"
                  placeholder="00000-000"
                  {...form.register('address.zipCode')}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Redes Sociais</CardTitle>
            <CardDescription>
              Links para suas redes sociais (opcional)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="social-instagram">Instagram</Label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="social-instagram"
                    className="pl-10"
                    placeholder="@seuusuario"
                    {...form.register('social.instagram')}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="social-facebook">Facebook</Label>
                <div className="relative">
                  <Facebook className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="social-facebook"
                    className="pl-10"
                    placeholder="suapagina"
                    {...form.register('social.facebook')}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="social-whatsapp">WhatsApp Business</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="social-whatsapp"
                    className="pl-10"
                    placeholder="5511999999999"
                    {...form.register('social.whatsapp')}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
