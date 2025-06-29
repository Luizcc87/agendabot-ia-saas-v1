
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Wrench, 
  Bot, 
  MessageSquare, 
  Users, 
  Plug,
  ChevronRight,
  Settings as SettingsIcon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const settingsNavigation = [
  {
    title: 'Empresa',
    description: 'Informações básicas, horários e dados de contato',
    href: '/admin/settings/company',
    icon: Building,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400'
  },
  {
    title: 'Serviços',
    description: 'Gerencie serviços oferecidos, preços e durações',
    href: '/admin/settings/services',
    icon: Wrench,
    color: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400'
  },
  {
    title: 'Agente IA',
    description: 'Configure a personalidade e comportamento do assistente',
    href: '/admin/settings/ai-agent',
    icon: Bot,
    color: 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-400'
  },
  {
    title: 'WhatsApp',
    description: 'Conecte e gerencie sua instância do WhatsApp',
    href: '/admin/settings/whatsapp',
    icon: MessageSquare,
    color: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400'
  },
  {
    title: 'Equipe',
    description: 'Gerencie usuários, funções e permissões',
    href: '/admin/settings/team',
    icon: Users,
    color: 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-400'
  },
  {
    title: 'Integrações',
    description: 'Conecte com outras ferramentas e serviços',
    href: '/admin/settings/integrations',
    icon: Plug,
    color: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-400'
  }
];

export default function SettingsPage() {
  const location = useLocation();
  const isRootSettings = location.pathname === '/admin/settings';

  if (!isRootSettings) {
    return null; // Let sub-routes handle their own rendering
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <SettingsIcon className="h-6 w-6 text-muted-foreground" />
            <h1 className="text-2xl font-bold">Configurações</h1>
          </div>
          <p className="text-muted-foreground">
            Gerencie todas as configurações do seu AgendaBot
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsNavigation.map((item) => (
            <Link key={item.href} to={item.href}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${item.color}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Configure rapidamente as funcionalidades mais importantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link to="/admin/settings/whatsapp">Conectar WhatsApp</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/admin/settings/services">Adicionar Serviço</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/admin/settings/ai-agent">Configurar IA</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/admin/settings/team">Convidar Usuário</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
