
import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  Phone, 
  Clock, 
  Send,
  MessageSquare,
  Calendar,
  User,
  CheckCircle,
  AlertCircle,
  Paperclip
} from 'lucide-react';
import { cn } from '@/lib/utils';

const conversations = [
  {
    id: 1,
    customer: 'Maria Silva',
    phone: '(11) 99999-9999',
    status: 'new',
    lastMessage: 'Oi! Gostaria de agendar um horário para corte de cabelo.',
    lastMessageTime: '10:30',
    unreadCount: 2,
    avatar: null
  },
  {
    id: 2,
    customer: 'João Santos',
    phone: '(11) 88888-8888',
    status: 'in_progress',
    lastMessage: 'Perfeito! Confirmo o horário de amanhã às 14h.',
    lastMessageTime: '09:45',
    unreadCount: 0,
    avatar: null
  },
  {
    id: 3,
    customer: 'Ana Costa',
    phone: '(11) 77777-7777',
    status: 'scheduled',
    lastMessage: 'Obrigada! Até amanhã então.',
    lastMessageTime: 'Ontem',
    unreadCount: 0,
    avatar: null
  },
  {
    id: 4,
    customer: 'Carlos Oliveira',
    phone: '(11) 66666-6666',
    status: 'completed',
    lastMessage: 'Muito obrigado pelo excelente atendimento!',
    lastMessageTime: 'Ter',
    unreadCount: 0,
    avatar: null
  },
];

const messages = [
  {
    id: 1,
    sender: 'customer',
    content: 'Oi! Gostaria de agendar um horário para corte de cabelo.',
    timestamp: '10:25',
    status: 'delivered'
  },
  {
    id: 2,
    sender: 'customer',
    content: 'Vocês têm horário disponível para amanhã?',
    timestamp: '10:26',
    status: 'delivered'
  },
  {
    id: 3,
    sender: 'agent',
    content: 'Olá Maria! Tudo bem? 😊\n\nTemos sim! Que horário seria melhor para você?\n\n• 09:00 - Disponível\n• 14:00 - Disponível\n• 16:30 - Disponível',
    timestamp: '10:28',
    status: 'read'
  },
  {
    id: 4,
    sender: 'customer',
    content: 'O de 14h seria perfeito!',
    timestamp: '10:30',
    status: 'delivered'
  },
];

const statusConfig = {
  new: { label: 'Novo', color: 'bg-blue-500', textColor: 'text-blue-600' },
  in_progress: { label: 'Em Atendimento', color: 'bg-yellow-500', textColor: 'text-yellow-600' },
  scheduled: { label: 'Agendado', color: 'bg-green-500', textColor: 'text-green-600' },
  completed: { label: 'Concluído', color: 'bg-gray-500', textColor: 'text-gray-600' },
};

export default function Leads() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.phone.includes(searchTerm)
  );

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    // Mock send message
    console.log('Sending:', messageText);
    setMessageText('');
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
          {/* Conversations List */}
          <Card className="lg:w-1/3 flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Conversas</CardTitle>
                <Button variant="ghost" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar conversas..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full">
                <div className="space-y-1 p-3">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted",
                        selectedConversation?.id === conversation.id && "bg-muted"
                      )}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.avatar} />
                          <AvatarFallback>
                            {conversation.customer.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={cn(
                          "absolute -top-1 -right-1 w-3 h-3 rounded-full",
                          statusConfig[conversation.status as keyof typeof statusConfig].color
                        )} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{conversation.customer}</h3>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">
                              {conversation.lastMessageTime}
                            </span>
                            {conversation.unreadCount > 0 && (
                              <div className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {conversation.unreadCount}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {statusConfig[conversation.status as keyof typeof statusConfig].label}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {conversation.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:w-2/3 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {selectedConversation.customer.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="font-semibold">{selectedConversation.customer}</h2>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {selectedConversation.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar
                      </Button>
                      <Button variant="outline" size="sm">
                        <User className="h-4 w-4 mr-2" />
                        Perfil
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            "flex",
                            message.sender === 'agent' ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[70%] p-3 rounded-lg whitespace-pre-wrap",
                              message.sender === 'agent'
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            )}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div className="flex items-center justify-end gap-1 mt-1">
                              <span className="text-xs opacity-70">
                                {message.timestamp}
                              </span>
                              {message.sender === 'agent' && (
                                <div className="text-xs opacity-70">
                                  {message.status === 'read' ? (
                                    <CheckCircle className="h-3 w-3" />
                                  ) : (
                                    <Clock className="h-3 w-3" />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Selecione uma conversa</h3>
                  <p className="text-muted-foreground">
                    Escolha uma conversa da lista para começar a responder
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
