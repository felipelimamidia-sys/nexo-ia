import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  Target,
  Briefcase,
  TrendingUp,
  Clock,
  BookOpen,
  AlertCircle,
  Rocket,
  Check,
  LucideIcon,
} from 'lucide-react';
import { NIXMascot } from '../components/NIXMascot';
import { useUser } from '../context/UserContext';
import type { UserData } from '../context/UserContext';

interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  field: string;
  options?: { value: string; label: string; icon?: LucideIcon }[];
  multiSelect?: boolean;
}

const steps: OnboardingStep[] = [
  {
    id: 1, title: 'Que conhecimento você busca?', subtitle: 'Selecione as disciplinas que deseja dominar', icon: Target,
    field: 'goals', multiSelect: true,
    options: [
      { value: 'programming', label: 'Programação e Engenharia' },
      { value: 'data', label: 'Ciência de Dados e Análise' },
      { value: 'ai', label: 'Inteligência Artificial' },
      { value: 'design', label: 'Design e Arquitetura' },
      { value: 'business', label: 'Negócios e Estratégia' },
      { value: 'languages', label: 'Idiomas e Literatura' },
      { value: 'sciences', label: 'Ciências Naturais' },
      { value: 'mathematics', label: 'Matemática e Lógica' },
    ],
  },
  {
    id: 2, title: 'Qual é sua área de atuação?', subtitle: 'Isso moldará seu currículo personalizado', icon: Briefcase,
    field: 'professionalArea',
    options: [
      { value: 'technology', label: 'Tecnologia e Engenharia' },
      { value: 'finance', label: 'Finanças e Economia' },
      { value: 'healthcare', label: 'Saúde e Ciências' },
      { value: 'education', label: 'Educação e Academia' },
      { value: 'consulting', label: 'Consultoria e Estratégia' },
      { value: 'entrepreneur', label: 'Empreendedorismo' },
      { value: 'arts', label: 'Artes e Humanidades' },
      { value: 'student', label: 'Busca Acadêmica' },
    ],
  },
  {
    id: 3, title: 'Qual é seu nível de proficiência?', subtitle: 'Avaliação honesta leva a melhor orientação', icon: TrendingUp,
    field: 'skillLevel',
    options: [
      { value: 'beginner', label: 'Iniciante', icon: Target },
      { value: 'intermediate', label: 'Intermediário', icon: TrendingUp },
      { value: 'advanced', label: 'Avançado', icon: Rocket },
    ],
  },
  {
    id: 4, title: 'Quanto tempo pode dedicar diariamente?', subtitle: 'Otimizaremos seu currículo de acordo', icon: Clock,
    field: 'timePerDay',
    options: [
      { value: '15min', label: '15 minutos por dia' },
      { value: '30min', label: '30 minutos por dia' },
      { value: '1hour', label: '1 hora por dia' },
      { value: '2hours', label: '2+ horas por dia' },
    ],
  },
  {
    id: 5, title: 'Como você aprende mais efetivamente?', subtitle: 'Entender seu estilo melhora a retenção', icon: BookOpen,
    field: 'learningStyle',
    options: [
      { value: 'visual', label: 'Visual e Diagramática' },
      { value: 'reading', label: 'Leitura e Textual' },
      { value: 'hands-on', label: 'Prática Aplicada' },
      { value: 'discussion', label: 'Discussão e Diálogo' },
    ],
  },
  {
    id: 6, title: 'O que desafia seu progresso?', subtitle: 'Selecione todos os que se aplicam', icon: AlertCircle,
    field: 'difficulties', multiSelect: true,
    options: [
      { value: 'time', label: 'Tempo Limitado Disponível' },
      { value: 'motivation', label: 'Manter a Motivação' },
      { value: 'focus', label: 'Manter o Foco' },
      { value: 'resources', label: 'Encontrar Bons Recursos' },
      { value: 'structure', label: 'Falta de Estrutura' },
      { value: 'practice', label: 'Oportunidades de Prática' },
    ],
  },
  {
    id: 7, title: 'Qual é seu objetivo final?', subtitle: 'Defina seu destino', icon: Rocket,
    field: 'mainObjective',
    options: [
      { value: 'career', label: 'Avanço na Carreira' },
      { value: 'pivot', label: 'Transição de Carreira' },
      { value: 'skills', label: 'Desenvolvimento de Habilidades' },
      { value: 'knowledge', label: 'Busca do Conhecimento' },
      { value: 'degree', label: 'Credenciais Acadêmicas' },
      { value: 'business', label: 'Objetivos Empresariais' },
    ],
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<UserData>>({ goals: [], difficulties: [] });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (field: string, value: string, multiSelect?: boolean) => {
    if (multiSelect) {
      const currentValues = (formData[field as keyof UserData] as string[]) || [];
      const newValues = currentValues.includes(value) ? currentValues.filter((v) => v !== value) : [...currentValues, value];
      setFormData({ ...formData, [field]: newValues });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const isSelected = (field: string, value: string) => {
    const fieldValue = formData[field as keyof UserData];
    if (Array.isArray(fieldValue)) return fieldValue.includes(value);
    return fieldValue === value;
  };

  const canProceed = () => {
    const step = steps[currentStep];
    const fieldValue = formData[step.field as keyof UserData];
    if (step.multiSelect) return Array.isArray(fieldValue) && fieldValue.length > 0;
    return !!fieldValue;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    else handleSubmit();
  };

  const handleBack = () => { if (currentStep > 0) setCurrentStep(currentStep - 1); };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const userData: UserData = {
        name: 'Estudante',
        goals: (formData.goals as string[]) || [],
        professionalArea: formData.professionalArea || '',
        skillLevel: formData.skillLevel || '',
        timePerDay: formData.timePerDay || '',
        learningStyle: formData.learningStyle || '',
        difficulties: (formData.difficulties as string[]) || [],
        mainObjective: formData.mainObjective || '',
        altitude: 1, flights: 0, streak: 1, xp: 0, completedLessons: [], currentCourses: [],
      };
      setUser(userData);
      navigate('/diagnosis');
    }, 1000);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const step = steps[currentStep];
  const StepIcon = step.icon;

  return (
    <div className="min-h-screen bg-nexo-bg flex flex-col">
      {/* Progress */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-nexo-cream-dark">
          <motion.div className="h-full bg-nexo-red" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: 'easeOut' }} />
        </div>
        <div className="bg-nexo-bg/95 backdrop-blur-lg border-b border-nexo-border-light/50 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2"><NIXMascot size="sm" variant="simple" /><span className="text-xs font-semibold text-nexo-red">NIX</span></div>
          <span className="text-xs text-nexo-text-secondary">{currentStep + 1} de {steps.length}</span>
        </div>
      </div>

      {/* Content - fullscreen centered, one question per screen */}
      <div className="flex-1 flex items-center justify-center px-6 pt-20 pb-24">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div key={currentStep} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35, ease: 'easeOut' }} className="text-center">
              <motion.div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-nexo-red/8 border border-nexo-red/15 mb-8" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                <StepIcon className="w-7 h-7 text-nexo-red" />
              </motion.div>

              {step.multiSelect && (
                <motion.p className="text-[10px] font-semibold text-nexo-red/70 uppercase tracking-[0.15em] mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                  Selecione uma ou mais opções
                </motion.p>
              )}

              <h1 className="serif-heading text-3xl md:text-4xl mb-3 text-nexo-text leading-tight">{step.title}</h1>
              <p className="text-nexo-text-secondary mb-10 text-sm">{step.subtitle}</p>

              <div className="space-y-3 max-w-md mx-auto">
                {step.options?.map((option, index) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleSelect(step.field, option.value, step.multiSelect)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      isSelected(step.field, option.value) ? 'bg-nexo-red/8 border-2 border-nexo-red shadow-sm' : 'bg-white border border-nexo-border-light hover:border-nexo-beige hover:shadow-sm'
                    }`}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + index * 0.04 }} whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {option.icon && <option.icon className={`w-4 h-4 ${isSelected(step.field, option.value) ? 'text-nexo-red' : 'text-nexo-text-muted'}`} />}
                        <span className={`text-sm ${isSelected(step.field, option.value) ? 'font-medium text-nexo-text' : 'text-nexo-text-secondary'}`}>{option.label}</span>
                      </div>
                      {isSelected(step.field, option.value) && (<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}><Check className="w-4 h-4 text-nexo-red" /></motion.div>)}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-nexo-bg/95 backdrop-blur-lg border-t border-nexo-border-light/50 px-6 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <motion.button onClick={handleBack} disabled={currentStep === 0} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-nexo-text-secondary hover:bg-nexo-cream-dark'}`} whileHover={currentStep > 0 ? { x: -2 } : {}}>
            <ChevronLeft className="w-4 h-4" /><span className="text-sm">Anterior</span>
          </motion.button>
          <motion.button onClick={handleNext} disabled={!canProceed() || isSubmitting} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${canProceed() && !isSubmitting ? 'btn-primary' : 'bg-nexo-cream-dark text-nexo-text-muted cursor-not-allowed'}`} whileHover={canProceed() && !isSubmitting ? { scale: 1.02 } : {}} whileTap={canProceed() && !isSubmitting ? { scale: 0.98 } : {}}>
            {isSubmitting ? (<><motion.div className="w-4 h-4 border-2 border-nexo-bg border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} /><span className="text-sm">Analisando...</span></>)
             : currentStep === steps.length - 1 ? (<><span className="text-sm">Concluir</span><Rocket className="w-4 h-4" /></>)
             : (<><span className="text-sm">Continuar</span><ChevronRight className="w-4 h-4" /></>)}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
