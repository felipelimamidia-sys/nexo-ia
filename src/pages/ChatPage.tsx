import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Send, BookOpen, Lightbulb, FileText, Brain, ChevronLeft, GraduationCap, Sparkles } from 'lucide-react';
import { NIXMascot } from '../components/NIXMascot';
import { useUser } from '../context/UserContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: { label: string; icon: React.ElementType; action: () => void }[];
}

export default function ChatPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1', role: 'assistant',
      content: `Saudações, ${user?.name || 'Estudante'}. Sou NIX, seu mentor IA nesta jornada de crescimento intelectual.\n\nEstou aqui para:\n- **Iluminar conceitos** e explicar conteúdos\n- **Recomendar cursos CEFIS** para sua trilha\n- **Orientar seus estudos** com base no seu perfil\n- **Criar avaliações** personalizadas\n\nO que vamos explorar hoje?`,
      timestamp: new Date(),
      actions: [
        { label: 'Explicar conceito', icon: Lightbulb, action: () => handleSendMessage('Explique um conceito fundamental') },
        { label: 'Recomendar curso CEFIS', icon: GraduationCap, action: () => handleSendMessage('Recomende um curso CEFIS para mim') },
        { label: 'Orientação de estudo', icon: Brain, action: () => handleSendMessage('Orientar-me no meu estudo') },
        { label: 'Criar avaliação', icon: BookOpen, action: () => handleSendMessage('Crie uma avaliação para mim') },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const suggestions = [
    'Quais cursos CEFIS você recomenda para mim?',
    'Explique o conceito de variáveis em Python',
    'Como devo organizar meu estudo hoje?',
    'Crie um quiz sobre fundamentos de dados',
  ];

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: messageText, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const goalContext = user?.goals?.includes('ai') ? 'IA' : user?.goals?.includes('data') ? 'Ciência de Dados' : user?.goals?.includes('programming') ? 'Programação' : 'conhecimento geral';
      const levelContext = user?.skillLevel === 'beginner' ? 'iniciante' : user?.skillLevel === 'intermediate' ? 'intermediário' : 'avançado';
      const responses: { [key: string]: string } = {
        'recommend': `Com base no seu perfil de ${levelContext} em ${goalContext}, recomendo os seguintes cursos CEFIS:\n\n**1. Fundamentos de Python** - Base essencial para sua trilha\n**2. Lógica Matemática para IA** - Fortaleça seu raciocínio\n**3. Estatística Aplicada** - Complemento indispensável\n\nDeseja que eu detalhe algum deles ou crie um plano de estudo personalizado?`,
        'explain': `Deixe-me iluminar este conceito para você.\n\n**Princípios Fundamentais:**\n1. A premissa fundamental repousa na compreensão de relações\n2. Estes conceitos interconectam-se através de estruturas lógicas\n3. A aplicação prática aprofunda a compreensão\n\nComo estudante de nível ${levelContext}, recomendo focar primeiro na intuição e depois na formalização.\n\nDevo elaborar ou prefere um exemplo prático?`,
        'quiz': `Aqui está uma avaliação personalizada para seu nível ${levelContext}:\n\n**Pergunta:**\nQual é o propósito principal desta metodologia?\n\nA) Primeira abordagem\nB) Segunda abordagem\nC) Terceira abordagem\nD) Quarta abordagem\n\nTome seu tempo. Revelarei a resposta quando estiver preparado.`,
        'study': `Com base no seu perfil, eis sua orientação de estudo para hoje:\n\n**Plano de 1 hora:**\n- 15min: Revisão de conteúdo anterior\n- 30min: Nova lição (Fundamentos de Python - Módulo 2)\n- 15min: Prática e exercícios\n\n**CEFIS recomendado para hoje:**\n- Aula: "Compreendendo Variáveis" (8 min)\n- Prática: Tipos de Dados (20 min)\n\nDeseja que eu adapte este plano ou comece a lição agora?`,
        'default': `Excelente pergunta. Deixe-me orientá-lo.\n\nBaseado no seu perfil de ${goalContext} (nível ${levelContext}), recomendo focar nestes aspectos:\n\n1. **Fundação:** Princípios fundamentais do tema\n2. **Aplicação:** Como a teoria se manifesta na prática\n3. **Domínio:** Prática deliberada para solidificar\n\nPosso recomendar cursos CEFIS específicos ou criar um plano de estudo detalhado. O que prefere?`,
      };
      let responseKey = 'default';
      const lowerText = messageText.toLowerCase();
      if (lowerText.includes('recomend') || lowerText.includes('cefis') || lowerText.includes('curso')) responseKey = 'recommend';
      else if (lowerText.includes('explique') || lowerText.includes('explain') || lowerText.includes('conceito')) responseKey = 'explain';
      else if (lowerText.includes('quiz') || lowerText.includes('avaliação') || lowerText.includes('assessment')) responseKey = 'quiz';
      else if (lowerText.includes('orient') || lowerText.includes('plano') || lowerText.includes('estudo') || lowerText.includes('organizar')) responseKey = 'study';
      const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: responses[responseKey], timestamp: new Date() };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatMessage = (content: string) => {
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={index} className="font-semibold text-nexo-red">{part.slice(2, -2)}</strong>;
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-nexo-bg flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-72 bg-white border-r border-nexo-border-light flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
          <NIXMascot size="lg" className="mx-auto mb-6" />
          <h2 className="serif-heading text-xl mb-1 text-nexo-red">NIX</h2>
          <p className="text-[10px] text-nexo-text-secondary uppercase tracking-[0.15em] mb-8">Seu Mentor IA</p>
          <div className="space-y-3 text-left w-full">
            <div className="flex items-center gap-3 text-sm"><Brain className="w-4 h-4 text-nexo-red" /><span className="text-nexo-text-secondary">Ilumina conceitos</span></div>
            <div className="flex items-center gap-3 text-sm"><GraduationCap className="w-4 h-4 text-nexo-red" /><span className="text-nexo-text-secondary">Recomenda CEFIS</span></div>
            <div className="flex items-center gap-3 text-sm"><BookOpen className="w-4 h-4 text-nexo-red" /><span className="text-nexo-text-secondary">Cria avaliações</span></div>
            <div className="flex items-center gap-3 text-sm"><FileText className="w-4 h-4 text-nexo-red" /><span className="text-nexo-text-secondary">Sintetiza conhecimento</span></div>
            <div className="flex items-center gap-3 text-sm"><Sparkles className="w-4 h-4 text-nexo-red" /><span className="text-nexo-text-secondary">Personaliza trilha</span></div>
          </div>
        </div>
        <div className="p-6 border-t border-nexo-border-light"><p className="text-[10px] text-nexo-text-muted leading-relaxed">NIX adapta suas respostas ao seu perfil, recomenda conteúdo CEFIS e guia sua evolução intelectual.</p></div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col h-screen">
        <motion.div className="bg-white border-b border-nexo-border-light px-6 py-3 flex items-center" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="p-2 rounded-lg hover:bg-nexo-cream-dark transition-colors"><ChevronLeft className="w-5 h-5 text-nexo-text-secondary" /></button>
            <div className="flex items-center gap-2"><NIXMascot size="sm" /><div><h1 className="font-medium serif-heading text-sm text-nexo-red">NIX</h1><div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-nexo-success" /><span className="text-[10px] text-nexo-text-secondary">Pronto para orientar</span></div></div></div>
          </div>
        </motion.div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-2xl mx-auto space-y-5">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div key={message.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: index * 0.03 }} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                  {message.role === 'assistant' && <div className="flex-shrink-0 pt-1"><NIXMascot size="sm" /></div>}
                  <div className={`max-w-lg rounded-2xl p-4 ${message.role === 'user' ? 'bg-nexo-red text-white' : 'bg-white border border-nexo-border-light shadow-sm'}`}>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{formatMessage(message.content)}</div>
                    {message.actions && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-nexo-border-light">
                        {message.actions.map((action) => { const ActionIcon = action.icon; return (<motion.button key={action.label} onClick={action.action} className="px-3 py-1.5 rounded-lg bg-nexo-cream-light hover:bg-nexo-cream-dark transition-all flex items-center gap-2 text-xs" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}><ActionIcon className="w-3.5 h-3.5 text-nexo-red" />{action.label}</motion.button>); })}
                      </div>
                    )}
                  </div>
                  {message.role === 'user' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nexo-red/10 flex items-center justify-center"><span className="text-xs font-medium text-nexo-red">{(user?.name || 'E')[0]}</span></div>}
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <motion.div className="flex gap-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <NIXMascot size="sm" />
                <div className="bg-white border border-nexo-border-light rounded-2xl p-4 shadow-sm">
                  <div className="flex gap-1.5">{[0, 1, 2].map((i) => (<motion.div key={i} className="w-1.5 h-1.5 bg-nexo-red rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }} />))}</div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {messages.length === 1 && (
          <motion.div className="px-6 mb-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="max-w-2xl mx-auto">
              <p className="text-[10px] text-nexo-text-muted mb-2 uppercase tracking-wider">Perguntas sugeridas</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (<motion.button key={s} onClick={() => handleSendMessage(s)} className="px-3 py-1.5 rounded-lg bg-white hover:bg-nexo-cream-dark border border-nexo-border-light transition-all text-xs text-nexo-text-secondary hover:text-nexo-text" whileHover={{ scale: 1.02 }}>{s}</motion.button>))}
              </div>
            </div>
          </motion.div>
        )}

        <motion.div className="px-6 pb-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-nexo-border-light rounded-2xl p-1.5 shadow-sm">
              <div className="flex items-end gap-2">
                <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }} placeholder="Pergunte ao NIX..." className="flex-1 bg-transparent border-none outline-none resize-none px-4 py-2.5 text-sm placeholder:text-nexo-text-muted" rows={1} style={{ minHeight: '40px', maxHeight: '100px' }} />
                <motion.button onClick={() => handleSendMessage()} disabled={!inputValue.trim() || isTyping} className={`p-2.5 rounded-xl transition-all ${inputValue.trim() && !isTyping ? 'bg-nexo-red text-white' : 'bg-nexo-cream-dark text-nexo-text-muted cursor-not-allowed'}`} whileHover={inputValue.trim() && !isTyping ? { scale: 1.05 } : {}} whileTap={inputValue.trim() && !isTyping ? { scale: 0.95 } : {}}>
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            <p className="text-[10px] text-center text-nexo-text-muted mt-2">NIX recomenda cursos CEFIS, explica conceitos e orienta seus estudos</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
