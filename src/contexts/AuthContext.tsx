import { createContext, useContext, useEffect, useState } from 'react';

export type UserRole = 'superadmin' | 'admin' | 'user' | 'trial';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId?: string;
  trialStart?: string;
  trialEnd?: string;
  trialActive?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  isTrialExpired: () => boolean;
  getDaysLeftInTrial: () => number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Mock user data para demonstração
const mockUsers = {
  'superadmin@agendabot.com': {
    id: '1',
    email: 'superadmin@agendabot.com',
    name: 'Super Admin',
    role: 'superadmin' as UserRole,
    password: '123456'
  },
  'admin@empresa.com': {
    id: '2',
    email: 'admin@empresa.com',
    name: 'Admin Empresa',
    role: 'admin' as UserRole,
    companyId: 'company-1',
    password: '123456'
  },
  'user@empresa.com': {
    id: '3',
    email: 'user@empresa.com',
    name: 'Usuário Comum',
    role: 'user' as UserRole,
    companyId: 'company-1',
    password: '123456'
  },
  'trial@empresa.com': {
    id: '4',
    email: 'trial@empresa.com',
    name: 'Usuário Trial',
    role: 'trial' as UserRole,
    companyId: 'company-2',
    trialStart: '2024-01-15',
    trialEnd: '2024-01-22',
    trialActive: true,
    password: '123456'
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular verificação de autenticação
    const storedUser = localStorage.getItem('agendabot_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const mockUser = mockUsers[email as keyof typeof mockUsers];
    
    if (!mockUser || mockUser.password !== password) {
      throw new Error('Credenciais inválidas');
    }

    const { password: _, ...userWithoutPassword } = mockUser;
    setUser(userWithoutPassword);
    localStorage.setItem('agendabot_user', JSON.stringify(userWithoutPassword));
  };

  const signUp = async (userData: any) => {
    // Mock da criação de usuário trial
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      role: 'trial',
      companyId: `company-${Date.now()}`,
      trialStart: new Date().toISOString().split('T')[0],
      trialEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      trialActive: true
    };

    setUser(newUser);
    localStorage.setItem('agendabot_user', JSON.stringify(newUser));
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('agendabot_user');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    const permissions = {
      superadmin: ['*'], // Acesso total
      admin: [
        'manage_company',
        'manage_team',
        'manage_services',
        'manage_whatsapp',
        'manage_ai_agent',
        'manage_integrations',
        'view_analytics',
        'manage_leads',
        'manage_appointments'
      ],
      user: [
        'view_dashboard',
        'manage_appointments',
        'view_leads',
        'view_calendar'
      ],
      trial: [
        'view_dashboard',
        'manage_appointments',
        'view_leads',
        'view_calendar',
        'manage_company',
        'manage_services',
        'manage_whatsapp',
        'manage_ai_agent'
      ]
    };

    const userPermissions = permissions[user.role] || [];
    return userPermissions.includes('*') || userPermissions.includes(permission);
  };

  const isTrialExpired = (): boolean => {
    if (!user || user.role !== 'trial' || !user.trialEnd) return false;
    return new Date() > new Date(user.trialEnd);
  };

  const getDaysLeftInTrial = (): number => {
    if (!user || user.role !== 'trial' || !user.trialEnd) return 0;
    const now = new Date();
    const trialEnd = new Date(user.trialEnd);
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    hasPermission,
    isTrialExpired,
    getDaysLeftInTrial
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}