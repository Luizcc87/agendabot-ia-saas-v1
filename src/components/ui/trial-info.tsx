import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Crown, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TrialInfo() {
  const { user, isTrialExpired, getDaysLeftInTrial } = useAuth();

  if (!user || user.role !== 'trial') {
    return null;
  }

  const expired = isTrialExpired();
  const daysLeft = getDaysLeftInTrial();

  if (expired) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <div className="font-medium text-red-900">Trial Expirado</div>
                <div className="text-sm text-red-700">Escolha um plano para continuar</div>
              </div>
            </div>
            <Button asChild size="sm">
              <Link to="/admin/billing">
                <Crown className="mr-2 h-3 w-3" />
                Assinar Plano
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isUrgent = daysLeft <= 3;
  const cardClass = isUrgent 
    ? "border-yellow-200 bg-yellow-50" 
    : "border-blue-200 bg-blue-50";

  return (
    <Card className={cardClass}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isUrgent ? 'bg-yellow-100' : 'bg-blue-100'
            }`}>
              <Clock className={`h-4 w-4 ${isUrgent ? 'text-yellow-600' : 'text-blue-600'}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-medium ${isUrgent ? 'text-yellow-900' : 'text-blue-900'}`}>
                  Trial Ativo
                </span>
                <Badge variant="outline" className={isUrgent ? 'text-yellow-600 border-yellow-300' : 'text-blue-600 border-blue-300'}>
                  {daysLeft} dia{daysLeft !== 1 ? 's' : ''} restante{daysLeft !== 1 ? 's' : ''}
                </Badge>
              </div>
              <div className={`text-sm ${isUrgent ? 'text-yellow-700' : 'text-blue-700'}`}>
                {isUrgent ? 'Seu trial expira em breve' : 'Aproveite todas as funcionalidades'}
              </div>
            </div>
          </div>
          {isUrgent && (
            <Button asChild size="sm" variant="outline">
              <Link to="/admin/billing">
                Ver Planos
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}