import { ReactNode } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
}

export function RoleGuard({ children, allowedRoles, fallback }: RoleGuardProps) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle>Acesso Negado</CardTitle>
            <CardDescription>
              Você precisa estar logado para acessar esta página
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/auth">Fazer Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!allowedRoles.includes(user.role)) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle>Permissão Insuficiente</CardTitle>
            <CardDescription>
              Você não tem permissão para acessar esta área. 
              Esta funcionalidade requer nível de acesso: {allowedRoles.join(', ')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              Seu nível atual: <strong className="capitalize">{user.role}</strong>
            </div>
            <Button asChild className="w-full" variant="outline">
              <Link to="/admin/dashboard">Voltar ao Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}

export function SuperAdminGuard({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['superadmin']}>
      {children}
    </RoleGuard>
  );
}

export function AdminGuard({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['superadmin', 'admin']}>
      {children}
    </RoleGuard>
  );
}

export function UserGuard({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['superadmin', 'admin', 'user', 'trial']}>
      {children}
    </RoleGuard>
  );
}