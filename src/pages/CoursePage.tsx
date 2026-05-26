import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Check,
  Clock,
  BookOpen,
  Star,
  Brain,
  Lightbulb,
  FileText,
  Zap,
  Users,
  MessageSquare,
} from 'lucide-react';
import { NIXMascot } from '../components/NIXMascot';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'article' | 'quiz' | 'practice';
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  progress: number;
}

const courseData = {
  id: 'python-fundamentals',
  title: 'Fundamentos de Python',
  description: 'Domine a arte da programação através do aprendizado estruturado',
  category: 'Programação',
  level: 'Fundação',
  duration: '12 horas',
  enrolled: 15420,
  modules: [
    {
      id: 'm1',
      title: 'Fundações',
      progress: 100,
      lessons: [
        { id: 'l1', title: 'A Filosofia de Python', duration: '5 min', completed: true, type: 'video' },
        { id: 'l2', title: 'Configurando seu Ambiente', duration: '10 min', completed: true, type: 'video' },
        { id: 'l3', title: 'Seu Primeiro Programa', duration: '15 min', completed: true, type: 'practice' },
        { id: 'l4', title: 'Avaliação: Fundações', duration: '5 min', completed: true, type: 'quiz' },
      ],
    },
    {
      id: 'm2',
      title: 'Domínio de Dados',
      progress: 75,
      lessons: [
        { id: 'l5', title: 'Compreendendo Variáveis', duration: '8 min', completed: true, type: 'video' },
        { id: 'l6', title: 'Números e Strings', duration: '12 min', completed: true, type: 'video' },
        { id: 'l7', title: 'Coleções: Listas e Tuplas', duration: '15 min', completed: true, type: 'video' },
        { id: 'l8', title: 'Dicionários e Conjuntos', duration: '12 min', completed: false, type: 'video' },
        { id: 'l9', title: 'Prática: Tipos de Dados', duration: '20 min', completed: false, type: 'practice' },
        { id: 'l10', title: 'Avaliação: Dados', duration: '5 min', completed: false, type: 'quiz' },
      ],
    },
    {
      id: 'm3',
      title: 'Lógica de Controle',
      progress: 0,
      lessons: [
        { id: 'l11', title: 'Lógica Condicional', duration: '10 min', completed: false, type: 'video' },
        { id: 'l12', title: 'Padrões de Iteração', duration: '15 min', completed: false, type: 'video' },
        { id: 'l13', title: 'Controle de Fluxo', duration: '8 min', completed: false, type: 'video' },
        { id: 'l14', title: 'Prática: Fluxo de Controle', duration: '25 min', completed: false, type: 'practice' },
        { id: 'l15', title: 'Avaliação: Lógica', duration: '5 min', completed: false, type: 'quiz' },
      ],
    },
    {
      id: 'm4',
      title: 'Funções',
      progress: 0,
      lessons: [
        { id: 'l16', title: 'Definindo Funções', duration: '12 min', completed: false, type: 'video' },
        { id: 'l17', title: 'Parâmetros e Argumentos', duration: '10 min', completed: false, type: 'video' },
        { id: 'l18', title: 'Valores de Retorno', duration: '8 min', completed: false, type: 'video' },
        { id: 'l19', title: 'Expressões Lambda', duration: '10 min', completed: false, type: 'video' },
        { id: 'l20', title: 'Prática: Funções', duration: '30 min', completed: false, type: 'practice' },
      ],
    },
  ],
  aiNotes: [
    {
      id: 'n1',
      title: 'Conceito Fundamental: Variáveis',
      content: 'Variáveis são contêineres nomeados para dados. Python tipagem dinamicamente baseado em atribuição.',
      icon: Brain,
    },
    {
      id: 'n2',
      title: 'Melhor Prática: Strings',
      content: 'Use f-strings para formatação moderna de strings: f"Valor: {variável}"',
      icon: Lightbulb,
    },
    {
      id: 'n3',
      title: 'Distinção: Lista vs Tupla',
      content: 'Listas são mutáveis, tuplas imutáveis. Escolha baseado em necessidades de integridade de dados.',
      icon: FileText,
    },
  ],
  revisionCards: [
    {
      id: 'r1',
      front: 'O que é uma variável em Python?',
      back: 'Uma referência nomeada para um valor armazenado. Python determina tipo dinamicamente.',
    },
    {
      id: 'r2',
      front: 'Distinção Lista vs Tupla?',
      back: 'Listas são mutáveis (mutáveis), tuplas imutáveis (fixas após criação).',
    },
    {
      id: 'r3',
      front: 'O que é conversão de tipo?',
      back: 'Convertendo um tipo de dados para outro: int("5") converte string para inteiro.',
    },
  ],
};

export default function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(1);
  const [showRevision, setShowRevision] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const course = courseData;
  const nextLesson = course.modules[activeModule]?.lessons.find(l => !l.completed);

  const getLessonTypeLabel = (type: string) => {
    switch (type) {
      case 'video': return 'Aula';
      case 'article': return 'Leitura';
      case 'quiz': return 'Avaliação';
      case 'practice': return 'Prática';
      default: return 'Aula';
    }
  };

  return (
    <div className="min-h-screen bg-nexo-bg">
      {/* Navigation */}
      <motion.div
        className="bg-nexo-cream-light border-b border-nexo-divider px-6 py-3 sticky top-0 z-40"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg hover:bg-nexo-divider transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-medium serif-heading text-lg text-nexo-red">{course.title}</h1>
              <div className="flex items-center gap-2 text-xs text-nexo-text-secondary">
                <span>{course.category}</span>
                <span>·</span>
                <span>{course.level}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/chat')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-nexo-divider hover:bg-nexo-beige transition-colors"
          >
            <NIXMascot size="sm" />
            <span className="text-xs text-nexo-text">Consultar NIX</span>
          </button>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Course Header */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-lg bg-nexo-red/10 text-nexo-red text-xs">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-lg bg-nexo-red/5 text-nexo-text-secondary text-xs">
                  {course.level}
                </span>
              </div>

              <h1 className="serif-heading text-3xl mb-2 text-nexo-red">{course.title}</h1>
              <p className="text-nexo-text-secondary text-sm mb-4">{course.description}</p>

              <div className="flex items-center gap-5 text-xs text-nexo-text-secondary">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {course.enrolled.toLocaleString()} estudantes
                </span>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-nexo-cream-dark rounded-lg p-4 min-w-[200px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-nexo-text-secondary">Progresso do Curso</span>
                <span className="text-sm font-medium text-nexo-red">65%</span>
              </div>
              <div className="h-1.5 bg-nexo-divider rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-nexo-red rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Module Navigation */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {course.modules.map((module, index) => (
            <motion.button
              key={module.id}
              onClick={() => setActiveModule(index)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeModule === index
                  ? 'bg-nexo-red text-nexo-cream'
                  : 'bg-nexo-cream-light hover:bg-nexo-divider text-nexo-text-secondary'
              }`}
              whileHover={{ scale: activeModule !== index ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
            >
              {module.title}
            </motion.button>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Module Content */}
            <motion.div
              className="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={activeModule}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="serif-heading text-xl text-nexo-red">{course.modules[activeModule].title}</h2>
                  <p className="text-xs text-nexo-text-secondary mt-1">
                    {course.modules[activeModule].progress}% completo
                  </p>
                </div>
                <div className="text-xs text-nexo-red">
                  Módulo {activeModule + 1} de {course.modules.length}
                </div>
              </div>

              <div className="space-y-2">
                {course.modules[activeModule].lessons.map((lesson, index) => (
                  <motion.button
                    key={lesson.id}
                    className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all ${
                      lesson.completed
                        ? 'bg-nexo-red/5 border border-nexo-red/20'
                        : 'bg-nexo-cream-light hover:bg-nexo-divider'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: lesson.completed ? 0 : 2 }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      lesson.completed
                        ? 'bg-nexo-red/20 text-nexo-red'
                        : 'bg-nexo-red/10 text-nexo-red'
                    }`}>
                      {lesson.completed ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-sm ${lesson.completed ? 'text-nexo-text-muted line-through' : ''}`}>
                          {lesson.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-nexo-border">
                          {getLessonTypeLabel(lesson.type)}
                        </span>
                      </div>
                      <span className="text-[10px] text-nexo-text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Revision Cards */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-nexo-red/10 flex items-center justify-center">
                    <Star className="w-4 h-4 text-nexo-red" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Revisão Rápida</h3>
                    <p className="text-[10px] text-nexo-text-secondary">{course.revisionCards.length} cards</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setShowRevision(!showRevision)}
                  className="text-xs text-nexo-red hover:text-nexo-red/80"
                  whileHover={{ scale: 1.02 }}
                >
                  {showRevision ? 'Ocultar' : 'Praticar'}
                </motion.button>
              </div>

              {showRevision && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <div className="bg-nexo-cream-light rounded-lg p-4 mb-3">
                    <p className="text-[10px] text-nexo-text-secondary mb-2">
                      Card {currentCard + 1} de {course.revisionCards.length}
                    </p>
                    <p className="text-sm">
                      {showAnswer
                        ? course.revisionCards[currentCard].back
                        : course.revisionCards[currentCard].front}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => { setCurrentCard(Math.max(0, currentCard - 1)); setShowAnswer(false); }}
                      disabled={currentCard === 0}
                      className="p-2 rounded-lg bg-nexo-cream-light disabled:opacity-30"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setShowAnswer(!showAnswer)}
                      className="px-4 py-2 rounded-lg bg-nexo-red text-nexo-cream text-xs"
                    >
                      {showAnswer ? 'Pergunta' : 'Resposta'}
                    </button>

                    <button
                      onClick={() => { setCurrentCard(Math.min(course.revisionCards.length - 1, currentCard + 1)); setShowAnswer(false); }}
                      disabled={currentCard === course.revisionCards.length - 1}
                      className="p-2 rounded-lg bg-nexo-cream-light disabled:opacity-30"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Next Lesson */}
            {nextLesson && (
              <motion.div
                className="card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-nexo-red" />
                  <h3 className="font-medium text-sm">Continuar Estudos</h3>
                </div>

                <button className="w-full p-3 rounded-lg bg-nexo-cream-light hover:bg-nexo-divider text-left group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-nexo-red flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 text-nexo-cream" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-nexo-text-secondary">Próxima aula</p>
                      <p className="text-sm font-medium">{nextLesson.title}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-nexo-text-secondary group-hover:text-nexo-red transition-colors" />
                  </div>
                </button>
              </motion.div>
            )}

            {/* AI Notes */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <NIXMascot size="sm" />
                <div>
                  <h3 className="font-medium text-sm">Notas NIX</h3>
                  <p className="text-[10px] text-nexo-text-secondary">Insights principais</p>
                </div>
              </div>

              <div className="space-y-2">
                {course.aiNotes.map((note) => {
                  const NoteIcon = note.icon;
                  return (
                    <div key={note.id} className="p-2.5 rounded-lg bg-nexo-cream-light">
                      <div className="flex items-center gap-2 mb-1">
                        <NoteIcon className="w-3.5 h-3.5 text-nexo-red" />
                        <span className="text-xs font-medium">{note.title}</span>
                      </div>
                      <p className="text-[10px] text-nexo-text-secondary leading-relaxed">{note.content}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-medium text-sm mb-4">Estatísticas do Curso</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-nexo-text-secondary">Duração</span>
                  <span>~4 horas restantes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-nexo-text-secondary">XP Disponível</span>
                  <span className="text-nexo-red">+850 XP</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-nexo-text-secondary">Ao Completar</span>
                  <span>+1 Conquista</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-nexo-divider">
                <button
                  onClick={() => navigate('/chat')}
                  className="w-full btn-secondary text-sm py-2.5 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Consultar NIX
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
