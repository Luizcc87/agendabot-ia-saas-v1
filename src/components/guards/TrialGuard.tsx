import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Crown, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TrialGuardProps {
  children: ReactNode;
  showExpiredWarning?: boolean;
}

export function TrialGuard({ children, showExpiredWarning = true }: TrialGuardProps) {
  const { user, isTrialExpired, getDaysLeftInTrial } = useAuth();

  if (!user) {
    return null;
  }

  // Se não for usuário trial, apenas mostra o conteúdo
  if (user.role !== 'trial') {
    return <>{children}</>;
  }

  const expired = isTrialExpired();
  const daysLeft = getDaysLeftInTrial();

  // Se o trial expirou e devemos mostrar o aviso
  if (expired && showExpiredWarning) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">
              Trial Expirado
            </CardTitle>
            <CardDescription className="text-lg">
              Seu período de teste de 7 dias terminou
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <h3 className="font-semibold text-lg mb-4">
                Continue aproveitando o AgendaBot
              </h3>
              <p className="text-muted-foreground mb-4">
                Escolha um plano que melhor se adapta ao seu negócio e continue 
                automatizando seus agendamentos via WhatsApp.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-4 border rounded-lg">
                  <div className="font-semibold">Starter</div>
                  <div className="text-2xl font-bold text-primary">R$ 97</div>
                  <div className="text-muted-foreground">/mês</div>
                </div>
                <div className="p-4 border-2 border-primary rounded-lg">
                  <Badge className="mb-2">Mais Popular</Badge>
                  <div className="font-semibold">Professional</div>
                  <div className="text-2xl font-bold text-primary">R$ 197</div>
                  <div className="text-muted-foreground">/mês</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-semibold">Enterprise</div>
                  <div className="text-2xl font-bold text-primary">R$ 397</div>
                  <div className="text-muted-foreground">/mês</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="flex-1">
                <Link to="/admin/billing">
                  <Crown className="mr-2 h-4 w-4" />
                  Escolher Plano
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1">
                <Link to="/">
                  Falar com Vendas
                </Link>
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Dúvidas? Entre em contato conosco pelo WhatsApp: 
              <strong> (11) 99999-9999</strong>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Se ainda está no trial, mostra o conteúdo com aviso se necessário
  return (
    <>
      {daysLeft <= 3 && daysLeft > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Seu trial expira em {daysLeft} dia{daysLeft !== 1 ? 's' : ''}!</strong>{' '}
                Escolha um plano para continuar usando o AgendaBot sem interrupções.
              </p>
            </div>
            <div className="ml-auto">
              <Button asChild size="sm" variant="outline">
                <Link to="/admin/billing">
                  Ver Planos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}