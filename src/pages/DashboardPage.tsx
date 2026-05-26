import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Flame, Trophy, Zap, Target, Clock, ChevronRight, Play, Brain, MessageSquare, BookOpen, TrendingUp, Award, Home, Check, GraduationCap, Star, Sparkles } from 'lucide-react';
import { NIXMascot } from '../components/NIXMascot';
import { useUser } from '../context/UserContext';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const missions = [
    { id: '1', title: 'Completar 3 lições', progress: 2, total: 3, xp: 150, completed: false },
    { id: '2', title: 'Praticar fundamentos', progress: 1, total: 1, xp: 100, completed: true },
    { id: '3', title: 'Atingir Nível Bronze', progress: 4, total: 5, xp: 500, completed: false },
    { id: '4', title: 'Finalizar Python Básico', progress: 85, total: 100, xp: 300, completed: false },
  ];

  const cefisCourses = [
    { id: 'python-fundamentals', title: 'Fundamentos de Python', category: 'Programação', progress: 65, duration: '12 horas', level: 'Fundação' },
    { id: 'data-analysis', title: 'Essenciais de Análise de Dados', category: 'Ciência de Dados', progress: 30, duration: '10 horas', level: 'Intermediário' },
  ];

  const cefisRecommendations = [
    { id: 'r1', title: 'Lógica Matemática para IA', category: 'Matemática', duration: '8 horas', xp: 500, reason: 'Baseado no seu objetivo de IA' },
    { id: 'r2', title: 'Estatística Aplicada', category: 'Ciência de Dados', duration: '6 horas', xp: 400, reason: 'Complementa sua trilha de dados' },
    { id: 'r3', title: 'Pensamento Computacional', category: 'Lógica', duration: '4 horas', xp: 300, reason: 'Recomendado pela IA' },
  ];

  const stats = [
    { label: 'Nível Atual', value: user?.altitude || 1, icon: TrendingUp, suffix: '' },
    { label: 'Conquistas', value: user?.flights || 0, icon: Award, suffix: '' },
    { label: 'Progresso Total', value: user?.xp || 0, icon: Zap, suffix: ' XP' },
    { label: 'Concluído', value: user?.completedLessons?.length || 0, icon: BookOpen, suffix: '' },
  ];

  const calculateLevelProgress = () => {
    const currentXP = user?.xp || 0;
    return ((currentXP % 1000) / 1000) * 100;
  };

  const navItems = [
    { icon: Home, label: 'Início', path: '/dashboard', active: true },
    { icon: BookOpen, label: 'Cursos', path: '/course/python-fundamentals', active: false },
    { icon: MessageSquare, label: 'Mentor', path: '/chat', active: false },
    { icon: Trophy, label: 'Conquistas', path: '#', active: false },
  ];

  return (
    <div className="min-h-screen bg-nexo-bg">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-[72px] bg-white border-r border-nexo-border-light flex flex-col items-center py-5 z-40">
        <motion.div className="mb-6" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <NIXMascot size="sm" variant="simple" />
        </motion.div>
        <nav className="flex-1 flex flex-col gap-3">
          {navItems.map((item, index) => (
            <motion.div key={item.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
              <Link to={item.path} className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all group ${item.active ? 'bg-nexo-red/10 text-nexo-red' : 'text-nexo-text-muted hover:text-nexo-text hover:bg-nexo-cream-dark'}`}>
                <item.icon className="w-5 h-5" />
                {item.active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-nexo-red rounded-r" />}
                <div className="absolute left-full ml-2 px-2 py-1 bg-white rounded-lg shadow-elegant text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">{item.label}</div>
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>

      <div className="ml-[72px] p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1 className="serif-heading text-2xl lg:text-3xl mb-1 text-nexo-text" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              Bem-vindo, <span className="text-nexo-red">Estudante</span>
            </motion.h1>
            <p className="text-sm text-nexo-text-secondary">Sua jornada de excelência continua</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-nexo-red/8 border border-nexo-red/15" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Flame className="w-4 h-4 text-nexo-red" /><span className="text-sm font-medium text-nexo-red">{user?.streak || 1} dias</span>
            </motion.div>
            <motion.div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-nexo-cream-dark" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Zap className="w-4 h-4 text-nexo-red" /><span className="text-sm font-medium text-nexo-text">{user?.xp || 0} XP</span>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <motion.div key={stat.label} className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <StatIcon className="w-5 h-5 text-nexo-red mb-3" />
                <div className="text-2xl font-semibold serif-heading mb-0.5 text-nexo-text">{stat.value}<span className="text-sm font-sans text-nexo-text-muted">{stat.suffix}</span></div>
                <p className="text-xs text-nexo-text-secondary">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Level */}
        <motion.div className="card mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0">
              <div className="relative w-14 h-14 rounded-xl bg-nexo-cream-dark border-2 border-nexo-red/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-nexo-red" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-nexo-red flex items-center justify-center"><span className="text-[10px] font-bold text-white">{user?.altitude || 1}</span></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div><h3 className="serif-heading text-base text-nexo-text">Nível {user?.altitude || 1}</h3><p className="text-xs text-nexo-text-secondary">{1000 - ((user?.xp || 0) % 1000)} XP para o próximo nível</p></div>
                <span className="text-sm font-semibold text-nexo-red">{Math.floor(calculateLevelProgress())}%</span>
              </div>
              <div className="h-2 bg-nexo-cream-dark rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-nexo-red to-nexo-red-light rounded-full" initial={{ width: 0 }} animate={{ width: `${calculateLevelProgress()}%` }} transition={{ duration: 0.8 }} />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Missions */}
            <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-nexo-red/8 flex items-center justify-center"><Target className="w-4 h-4 text-nexo-red" /></div><h2 className="serif-heading text-lg text-nexo-text">Missões Diárias</h2></div>
                <span className="text-xs text-nexo-text-secondary">{missions.filter(m => m.completed).length}/{missions.length}</span>
              </div>
              <div className="space-y-2.5">
                {missions.map((mission, index) => (
                  <motion.div key={mission.id} className={`p-3 rounded-xl flex items-center gap-3 ${mission.completed ? 'bg-nexo-success/5 border border-nexo-success/15' : 'bg-nexo-cream-light'}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + index * 0.05 }}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${mission.completed ? 'bg-nexo-success/15 text-nexo-success' : 'bg-nexo-red/8 text-nexo-red'}`}>
                      {mission.completed ? <Check className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1"><span className={`text-sm ${mission.completed ? 'text-nexo-text-muted line-through' : 'text-nexo-text font-medium'}`}>{mission.title}</span><span className="text-xs text-nexo-red">+{mission.xp} XP</span></div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-nexo-divider rounded-full overflow-hidden"><motion.div className="h-full bg-nexo-red rounded-full" initial={{ width: 0 }} animate={{ width: `${(mission.progress / mission.total) * 100}%` }} transition={{ duration: 0.4 }} /></div>
                        <span className="text-[10px] text-nexo-text-muted w-8">{mission.total > 10 ? `${mission.progress}%` : `${mission.progress}/${mission.total}`}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CEFIS Recommendations */}
            <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-nexo-red/8 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-nexo-red" /></div><div><h2 className="serif-heading text-lg text-nexo-text">Conteúdo CEFIS Recomendado</h2><p className="text-[10px] text-nexo-text-muted">Selecionado pela IA para sua trilha</p></div></div>
              </div>
              <div className="space-y-3">
                {cefisRecommendations.map((rec, index) => (
                  <motion.div key={rec.id} className="p-4 rounded-xl bg-nexo-cream-light hover:bg-nexo-cream-dark transition-all cursor-pointer group" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + index * 0.05 }} onClick={() => navigate(`/course/${rec.id}`)}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-nexo-red/8 flex items-center justify-center flex-shrink-0"><Sparkles className="w-5 h-5 text-nexo-red" /></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1"><span className="text-xs px-2 py-0.5 rounded-md bg-nexo-red/8 text-nexo-red">{rec.category}</span></div>
                        <h3 className="text-sm font-medium text-nexo-text mb-1">{rec.title}</h3>
                        <p className="text-[10px] text-nexo-text-secondary mb-2">{rec.reason}</p>
                        <div className="flex items-center gap-3 text-[10px] text-nexo-text-muted"><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{rec.duration}</span><span className="text-nexo-red font-medium">+{rec.xp} XP</span></div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-nexo-text-muted group-hover:text-nexo-red transition-colors mt-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Active Courses */}
            <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-nexo-red/8 flex items-center justify-center"><BookOpen className="w-4 h-4 text-nexo-red" /></div><h2 className="serif-heading text-lg text-nexo-text">Estudos Ativos</h2></div>
                <button className="text-xs text-nexo-red hover:text-nexo-red/80 transition-colors">Ver Todos</button>
              </div>
              <div className="space-y-2.5">
                {cefisCourses.map((course) => (
                  <motion.button key={course.id} onClick={() => navigate(`/course/${course.id}`)} className="w-full p-3 rounded-xl bg-nexo-cream-light hover:bg-nexo-cream-dark transition-all flex items-center gap-4 group" whileHover={{ x: 2 }}>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1"><span className="text-xs px-2 py-0.5 rounded-md bg-nexo-red/8 text-nexo-red">{course.category}</span><span className="text-[10px] text-nexo-text-muted">{course.level}</span></div>
                      <h3 className="text-sm font-medium text-nexo-text mb-1.5">{course.title}</h3>
                      <div className="flex items-center gap-2"><div className="flex-1 h-1 bg-nexo-divider rounded-full overflow-hidden"><motion.div className="h-full bg-nexo-red rounded-full" initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} /></div><span className="text-[10px] text-nexo-text-muted">{course.progress}%</span></div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-nexo-text-muted group-hover:text-nexo-red transition-colors" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            {/* NIX */}
            <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-3 mb-4"><NIXMascot size="sm" variant="simple" /><div><h3 className="font-medium text-sm text-nexo-text">NIX</h3><p className="text-[10px] text-nexo-text-secondary">Seu Mentor IA</p></div></div>
              <p className="text-xs text-nexo-text-secondary mb-4 leading-relaxed">Pronto para guiar sua jornada intelectual, recomendar conteúdo CEFIS e responder perguntas.</p>
              <motion.button onClick={() => navigate('/chat')} className="w-full btn-primary text-sm py-2.5 flex items-center justify-center gap-2" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}><MessageSquare className="w-4 h-4" />Consultar NIX</motion.button>
            </motion.div>

            {/* Study Path */}
            <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <div className="flex items-center gap-2 mb-4"><Star className="w-4 h-4 text-nexo-red" /><h3 className="font-medium text-sm text-nexo-text">Sua Trilha Ideal</h3></div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-nexo-cream-light"><div className="w-8 h-8 rounded-lg bg-nexo-red flex items-center justify-center flex-shrink-0"><span className="text-[10px] font-bold text-white">1</span></div><div><p className="text-xs font-medium text-nexo-text">Fundamentos de Python</p><p className="text-[10px] text-nexo-text-muted">Em progresso - 65%</p></div></div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-nexo-cream-light"><div className="w-8 h-8 rounded-lg bg-nexo-red/20 flex items-center justify-center flex-shrink-0"><span className="text-[10px] font-bold text-nexo-red">2</span></div><div><p className="text-xs font-medium text-nexo-text">Lógica Matemática</p><p className="text-[10px] text-nexo-text-muted">Recomendado pela IA</p></div></div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-nexo-cream-light"><div className="w-8 h-8 rounded-lg bg-nexo-red/20 flex items-center justify-center flex-shrink-0"><span className="text-[10px] font-bold text-nexo-red">3</span></div><div><p className="text-xs font-medium text-nexo-text">Inteligência Artificial</p><p className="text-[10px] text-nexo-text-muted">Próximo na trilha</p></div></div>
              </div>
            </motion.div>

            {/* Evolution */}
            <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="flex items-center gap-2 mb-4"><Brain className="w-4 h-4 text-nexo-red" /><h3 className="font-medium text-sm text-nexo-text">Evolução do Aprendizado</h3></div>
              <div className="space-y-3">
                <div className="flex justify-between text-xs"><span className="text-nexo-text-secondary">Esta semana</span><span className="text-nexo-red font-medium">+350 XP</span></div>
                <div className="flex justify-between text-xs"><span className="text-nexo-text-secondary">Média diária</span><span className="font-medium">50 XP</span></div>
                <div className="flex justify-between text-xs"><span className="text-nexo-text-secondary">Sequência atual</span><span className="text-nexo-red font-medium">{user?.streak || 1} dias</span></div>
                <div className="flex justify-between text-xs"><span className="text-nexo-text-secondary">Lições completadas</span><span className="font-medium">{user?.completedLessons?.length || 0}</span></div>
              </div>
              <div className="mt-4 pt-3 border-t border-nexo-border-light">
                <p className="text-[10px] text-nexo-text-secondary leading-relaxed">Baseado no seu objetivo de <span className="text-nexo-red font-medium">{user?.mainObjective === 'career' ? 'avanço na carreira' : user?.mainObjective === 'skills' ? 'desenvolvimento de habilidades' : 'busca do conhecimento'}</span>, NIX recomenda focar em 2 lições diárias.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
