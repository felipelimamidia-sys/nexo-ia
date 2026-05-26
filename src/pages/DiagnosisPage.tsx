import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, AlertTriangle, Target, TrendingUp, ChevronRight, Award } from 'lucide-react';
import { NIXMascot } from '../components/NIXMascot';
import { useUser } from '../context/UserContext';

interface DiagnosisResult {
  category: string;
  icon: React.ElementType;
  color: string;
  items: { title: string; description: string; score: number }[];
}

export default function DiagnosisPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<DiagnosisResult[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => { setResults(generateDiagnosis(user)); setIsLoading(false); }, 2500);
    return () => clearTimeout(timer);
  }, [user]);

  const generateDiagnosis = (userData: typeof user): DiagnosisResult[] => {
    const skillLevel = userData?.skillLevel || 'beginner';
    const goals = userData?.goals || [];
    const strengths: { title: string; description: string; score: number }[] = [];
    if (skillLevel === 'advanced') strengths.push({ title: 'Base Sólida', description: 'Seu conhecimento acelera aprendizado avançado', score: 85 });
    if (goals.includes('programming') || goals.includes('ai')) strengths.push({ title: 'Foco Estratégico', description: 'Suas escolhas se alinham com caminhos emergentes', score: 78 });
    if (userData?.timePerDay === '2hours') strengths.push({ title: 'Capacidade de Dedicação', description: 'Investimento de tempo permite compreensão profunda', score: 90 });
    if (strengths.length < 3) strengths.unshift({ title: 'Mentalidade de Crescimento', description: 'Seu compromisso com o aprendizado é a base do sucesso', score: 75 });
    const weaknesses: { title: string; description: string; score: number }[] = [];
    if (userData?.difficulties?.includes('time')) weaknesses.push({ title: 'Otimização de Tempo', description: 'Agendamento estruturado aprimorará seu progresso', score: 35 });
    else weaknesses.push({ title: 'Construção de Consistência', description: 'Hábitos diários formam a base do domínio', score: 45 });
    if (skillLevel === 'beginner') weaknesses.push({ title: 'Construção de Fundação', description: 'Estabelecer conhecimento básico é seu primeiro marco', score: 30 });
    if (weaknesses.length < 3) weaknesses.push({ title: 'Prática Aplicada', description: 'Conectar teoria e implementação prática', score: 50 });
    const gaps: { title: string; description: string; score: number }[] = [];
    if (goals.includes('ai') && skillLevel !== 'advanced') gaps.push({ title: 'Fundações Matemáticas', description: 'Álgebra linear e estatística para IA', score: 25 });
    if (goals.includes('data') && skillLevel !== 'advanced') gaps.push({ title: 'Ferramentas Analíticas', description: 'SQL, Python e domínio de visualização', score: 35 });
    if (goals.includes('programming')) gaps.push({ title: 'Pensamento Algorítmico', description: 'Padrões de resolução e estruturas de dados', score: 40 });
    if (gaps.length < 3) gaps.push({ title: 'Arquitetura de Sistemas', description: 'Princípios de design e escalabilidade', score: 30 });
    return [
      { category: 'Competências', icon: Check, color: 'bg-nexo-success/10 text-nexo-success', items: strengths.slice(0, 3) },
      { category: 'Áreas para Desenvolvimento', icon: AlertTriangle, color: 'bg-nexo-warning/10 text-nexo-warning', items: weaknesses.slice(0, 3) },
      { category: 'Lacunas de Conhecimento', icon: Target, color: 'bg-nexo-error/10 text-nexo-error', items: gaps.slice(0, 3) },
    ];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-nexo-bg flex items-center justify-center">
        <div className="text-center max-w-sm">
          <NIXMascot size="lg" variant="badge" className="mx-auto mb-8" />
          <motion.div className="serif-heading text-2xl mb-4 text-nexo-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Analisando Seu Perfil</motion.div>
          <p className="text-nexo-text-secondary mb-8 text-sm">NIX está construindo seu caminho de aprendizado personalizado</p>
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (<motion.div key={i} className="w-2 h-2 bg-nexo-red rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} />))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nexo-bg">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-center mb-4"><NIXMascot size="md" variant="badge" /></div>
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-nexo-red/8 border border-nexo-red/15 mb-5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
            <Check className="w-4 h-4 text-nexo-red" /><span className="text-sm text-nexo-red font-medium">Análise Concluída</span>
          </motion.div>
          <h1 className="serif-heading text-3xl md:text-4xl mb-3 text-nexo-text">Seu Perfil <span className="text-nexo-red">Intelectual</span></h1>
          <p className="text-nexo-text-secondary max-w-lg mx-auto text-sm">NIX avaliou seu conhecimento, padrões e potencial para excelência</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {results.map((result, index) => {
            const ResultIcon = result.icon;
            return (
              <motion.div key={result.category} className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${result.color}`}><ResultIcon className="w-5 h-5" /></div>
                  <h2 className="serif-heading text-base text-nexo-text">{result.category}</h2>
                </div>
                <div className="space-y-4">
                  {result.items.map((item, idx) => (
                    <motion.div key={item.title} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + idx * 0.08 }}>
                      <div className="flex items-center justify-between mb-1.5"><span className="text-xs font-medium text-nexo-text">{item.title}</span><span className="text-[10px] text-nexo-text-muted">{item.score}%</span></div>
                      <div className="h-1.5 bg-nexo-cream-dark rounded-full overflow-hidden"><motion.div className="h-full rounded-full bg-nexo-red" initial={{ width: 0 }} animate={{ width: `${item.score}%` }} transition={{ duration: 0.8, delay: 0.4 + idx * 0.08 }} /></div>
                      <p className="text-[10px] text-nexo-text-secondary mt-1">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div className="academic-frame mb-14" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="relative w-28 h-28">
                <svg className="w-28 h-28" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="56" cy="56" r="50" stroke="#E8D4C4" strokeWidth="5" fill="none" />
                  <motion.circle cx="56" cy="56" r="50" stroke="#B61F1F" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray={314} initial={{ strokeDashoffset: 314 }} animate={{ strokeDashoffset: 314 * 0.23 }} transition={{ duration: 1, delay: 0.6 }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center"><div className="text-center"><div className="text-2xl font-bold serif-heading text-nexo-red">77%</div><div className="text-[9px] text-nexo-text-secondary uppercase tracking-wider">Potencial</div></div></div>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="serif-heading text-xl mb-2 text-nexo-text">Alto Potencial Intelectual</h3>
              <p className="text-nexo-text-secondary text-sm mb-4">NIX identificou um caminho ótimo para seu crescimento intelectual. Com orientação personalizada, você está posicionado para conquistas significativas.</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-nexo-success" /><span className="text-xs text-nexo-text-secondary">Trajetória favorável</span></div>
                <div className="flex items-center gap-2"><Award className="w-4 h-4 text-nexo-red" /><span className="text-xs text-nexo-text-secondary">Excelência alcançável</span></div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <motion.button onClick={() => navigate('/dashboard')} className="btn-primary text-base px-10 py-4 group inline-flex items-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Começar Sua Jornada <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
