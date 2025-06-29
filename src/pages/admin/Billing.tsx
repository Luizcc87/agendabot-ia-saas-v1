
import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CreditCard, 
  Download, 
  Eye, 
  Mail, 
  MoreHorizontal, 
  QrCode, 
  FileText, 
  Shield, 
  Check, 
  X, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const invoices = [
    {
      id: '#2025-006',
      date: '15/06/2025',
      period: 'Jun/2025',
      amount: 'R$ 97,00',
      status: 'Pago',
      statusVariant: 'default' as const
    },
    {
      id: '#2025-005',
      date: '15/05/2025',
      period: 'Mai/2025',
      amount: 'R$ 97,00',
      status: 'Pago',
      statusVariant: 'default' as const
    },
    {
      id: '#2025-004',
      date: '15/04/2025',
      period: 'Abr/2025',
      amount: 'R$ 97,00',
      status: 'Pago',
      statusVariant: 'default' as const
    }
  ];

  const plans = [
    {
      name: 'Starter',
      price: 47,
      features: [
        { name: '100 agendamentos/mês', included: true },
        { name: '1 usuário', included: true },
        { name: 'WhatsApp básico', included: true },
        { name: 'Integrações', included: false }
      ],
      isCurrent: false,
      canDowngrade: true
    },
    {
      name: 'PRO',
      price: 97,
      features: [
        { name: '500 agendamentos/mês', included: true },
        { name: '5 usuários', included: true },
        { name: 'WhatsApp ilimitado', included: true },
        { name: 'Integrações básicas', included: true }
      ],
      isCurrent: true,
      canDowngrade: false
    },
    {
      name: 'Business',
      price: 197,
      features: [
        { name: 'Agendamentos ilimitados', included: true },
        { name: 'Usuários ilimitados', included: true },
        { name: 'Multi-unidades', included: true },
        { name: 'API completa', included: true }
      ],
      isCurrent: false,
      canDowngrade: false
    }
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header com Cards de Resumo */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Faturamento</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Card Plano Atual */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Plano Atual</p>
                  <Badge>PRO</Badge>
                </div>
                <p className="text-2xl font-bold">R$ 97,00</p>
                <p className="text-xs text-gray-500">por mês</p>
              </CardContent>
            </Card>

            {/* Card Próxima Cobrança */}
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-2">Próxima Cobrança</p>
                <p className="text-2xl font-bold">15/07/2025</p>
                <p className="text-xs text-gray-500">R$ 97,00</p>
              </CardContent>
            </Card>

            {/* Card Uso do Mês */}
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-2">Agendamentos</p>
                <p className="text-2xl font-bold">156/500</p>
                <Progress value={31} className="mt-2" />
              </CardContent>
            </Card>

            {/* Card Economia */}
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 mb-2">Economia Total</p>
                <p className="text-2xl font-bold text-green-600">R$ 582,00</p>
                <p className="text-xs text-gray-500">vs. contratação manual</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs de Navegação */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="payment">Forma de Pagamento</TabsTrigger>
            <TabsTrigger value="upgrade">Fazer Upgrade</TabsTrigger>
          </TabsList>

          {/* Tab Visão Geral */}
          <TabsContent value="overview">
            <div className="grid gap-6">
              {/* Detalhes do Plano */}
              <Card>
                <CardHeader>
                  <CardTitle>Plano PRO</CardTitle>
                  <CardDescription>
                    Seu plano atual e recursos incluídos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4">Recursos Incluídos</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-600" />
                          <span>500 agendamentos/mês</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-600" />
                          <span>WhatsApp ilimitado</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-600" />
                          <span>5 usuários da equipe</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-600" />
                          <span>Integrações avançadas</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-600" />
                          <span>Suporte prioritário</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Uso Atual</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Agendamentos</span>
                            <span>156 de 500</span>
                          </div>
                          <Progress value={31} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Usuários</span>
                            <span>3 de 5</span>
                          </div>
                          <Progress value={60} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Armazenamento</span>
                            <span>2.3 GB de 10 GB</span>
                          </div>
                          <Progress value={23} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle>Perguntas Frequentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        Como funciona a cobrança?
                      </AccordionTrigger>
                      <AccordionContent>
                        A cobrança é feita mensalmente via cartão de crédito, PIX ou boleto. 
                        O valor é debitado sempre no mesmo dia do mês.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        Posso cancelar a qualquer momento?
                      </AccordionTrigger>
                      <AccordionContent>
                        Sim! Você pode cancelar quando quiser. O acesso continua até o fim do período pago.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        O que acontece se exceder os limites?
                      </AccordionTrigger>
                      <AccordionContent>
                        Você será notificado e poderá fazer upgrade do plano ou aguardar o próximo ciclo.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab Histórico */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Histórico de Faturas</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fatura</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Período</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.period}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>
                          <Badge variant={invoice.statusVariant}>{invoice.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                Visualizar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Baixar PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="w-4 h-4 mr-2" />
                                Reenviar por email
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Forma de Pagamento */}
          <TabsContent value="payment">
            <div className="grid gap-6">
              {/* Método Atual */}
              <Card>
                <CardHeader>
                  <CardTitle>Método de Pagamento Atual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="p-2 bg-gray-100 rounded">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Cartão de Crédito</p>
                      <p className="text-sm text-gray-600">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-600">Expira em 12/2027</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Adicionar Cartão de Crédito</DialogTitle>
                        </DialogHeader>
                        <form className="space-y-4">
                          <div>
                            <Label>Número do Cartão</Label>
                            <Input placeholder="1234 5678 9012 3456" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Validade</Label>
                              <Input placeholder="MM/AA" />
                            </div>
                            <div>
                              <Label>CVV</Label>
                              <Input placeholder="123" type="password" />
                            </div>
                          </div>
                          <div>
                            <Label>Nome no Cartão</Label>
                            <Input placeholder="NOME COMPLETO" />
                          </div>
                          <div>
                            <Label>CPF do Titular</Label>
                            <Input placeholder="000.000.000-00" />
                          </div>
                        </form>
                        <DialogFooter>
                          <Button variant="outline">Cancelar</Button>
                          <Button>Adicionar Cartão</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              {/* Adicionar Métodos */}
              <Card>
                <CardHeader>
                  <CardTitle>Formas de Pagamento Disponíveis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <Button variant="outline" className="justify-start">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Adicionar Cartão de Crédito
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <QrCode className="w-4 h-4 mr-2" />
                      Configurar PIX
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Pagamento por Boleto
                    </Button>
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      <p className="font-semibold">Pagamento Seguro</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Todos os pagamentos são processados com segurança através da Asaas, 
                      certificada PCI DSS nível 1.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab Upgrade */}
          <TabsContent value="upgrade">
            <div className="space-y-6">
              {/* Comparativo de Planos */}
              <Card>
                <CardHeader>
                  <CardTitle>Escolha o Plano Ideal</CardTitle>
                  <CardDescription>
                    Compare os recursos e escolha o melhor para seu negócio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                      <div 
                        key={plan.name}
                        className={`border rounded-lg p-6 relative ${
                          plan.isCurrent ? 'border-2 border-primary' : ''
                        }`}
                      >
                        {plan.isCurrent && (
                          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                            Plano Atual
                          </Badge>
                        )}
                        <h3 className={`font-bold text-lg mb-2 ${plan.isCurrent ? 'mt-2' : ''}`}>
                          {plan.name}
                        </h3>
                        <div className="mb-4">
                          <span className="text-3xl font-bold">R$ {plan.price}</span>
                          <span className="text-gray-600">/mês</span>
                        </div>
                        <ul className="space-y-2 mb-6">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              {feature.included ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <X className="w-4 h-4 text-gray-400" />
                              )}
                              <span className={feature.included ? '' : 'text-gray-400'}>
                                {feature.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {plan.isCurrent ? (
                          <Button className="w-full" disabled>
                            Plano Atual
                          </Button>
                        ) : plan.canDowngrade ? (
                          <Button variant="outline" className="w-full" disabled>
                            Downgrade
                          </Button>
                        ) : (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                className="w-full" 
                                data-billing-element="upgrade-button"
                                data-billing-plan-id={plan.name.toLowerCase()}
                              >
                                Fazer Upgrade
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirmar Upgrade</DialogTitle>
                                <DialogDescription>
                                  Você está fazendo upgrade do plano PRO para {plan.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                  <p className="font-semibold mb-2">Resumo da mudança:</p>
                                  <div className="space-y-1 text-sm">
                                    <p>Plano atual: PRO (R$ 97/mês)</p>
                                    <p>Novo plano: {plan.name} (R$ {plan.price}/mês)</p>
                                    <p>Cobrança adicional hoje: R$ {Math.round((plan.price - 97) * 0.5)},00</p>
                                    <p className="text-gray-600 text-xs mt-2">
                                      *Valor proporcional aos dias restantes do ciclo
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <Checkbox id="terms" />
                                  <label htmlFor="terms" className="text-sm">
                                    Concordo com os termos de serviço e política de cobrança
                                  </label>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancelar</Button>
                                <Button>Confirmar Upgrade</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Economia Anual */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">Economize 20% no plano anual!</span>
                    </div>
                    <Button variant="link" className="text-blue-600">
                      Mudar para anual →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
