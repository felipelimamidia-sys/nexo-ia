import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Compass,
  Trophy,
  Users,
  Award,
  ChevronRight,
  Star,
  Sparkles,
  Brain,
  Target,
  ArrowRight,
} from 'lucide-react';
import { NIXMascot } from '../components/NIXMascot';

export default function LandingPage() {
  const navigate = useNavigate();

  const benefits = [
    { title: 'Caminhos Personalizados', description: 'Currículos curados pela IA especificamente para sua jornada de aprendizado.', icon: Compass },
    { title: 'Mentoria Inteligente', description: 'NIX o guia em cada passo com sabedoria e insights personalizados.', icon: BookOpen },
    { title: 'Excelência Acadêmica', description: 'Conteúdo rigoroso refinado para compreensão profunda e domínio.', icon: Award },
    { title: 'Conquistas Significativas', description: 'Acompanhe seu crescimento através de marcos e rankings significativos.', icon: Trophy },
  ];

  const features = [
    { title: 'Diagnóstico Intelectual', description: 'NIX analisa seu perfil completo: conhecimentos, padrões de aprendizado e objetivos para criar sua jornada personalizada.', icon: Brain },
    { title: 'Trilha Personalizada', description: 'Um caminho de aprendizado único, adaptado ao seu ritmo, estilo e metas. Conteúdo CEFIS curado pela inteligência artificial.', icon: Target },
    { title: 'Gamificação Evolutiva', description: 'XP, níveis, conquistas e streaks transformam seu estudo em uma jornada motivadora e recompensadora.', icon: Sparkles },
  ];

  const testimonials = [
    { name: 'Mariana S.', role: 'Engenheira de Software', text: 'NEXO transformou minha forma de aprender. O NIX entende exatamente o que preciso e me guia com precisão.', rating: 5 },
    { name: 'Rafael C.', role: 'Analista de Dados', text: 'A personalização é impressionante. Cada recomendação faz sentido para minha jornada profissional.', rating: 5 },
    { name: 'Carolina M.', role: 'Estudante de Medicina', text: 'A metodologia premium e o mentor IA fizeram meu estudo muito mais eficiente e motivador.', rating: 5 },
  ];

  const stats = [
    { value: '50.000+', label: 'Alunos Ativos' },
    { value: '200+', label: 'Disciplinas' },
    { value: '98%', label: 'Satisfação' },
    { value: '4.9', label: 'Avaliação' },
  ];

  return (
    <div className="min-h-screen bg-nexo-bg">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nexo-bg/90 backdrop-blur-xl border-b border-nexo-border-light/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <NIXMascot size="sm" variant="simple" />
              <div>
                <h1 className="text-lg font-bold serif-heading text-nexo-red">NEXO</h1>
                <p className="text-[9px] text-nexo-text-secondary font-semibold tracking-[0.15em]">ACADEMY</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#benefits" className="text-sm text-nexo-text-secondary hover:text-nexo-red transition-colors">Benefícios</a>
              <a href="#features" className="text-sm text-nexo-text-secondary hover:text-nexo-red transition-colors">Recursos</a>
              <a href="#testimonials" className="text-sm text-nexo-text-secondary hover:text-nexo-red transition-colors">Depoimentos</a>
              <a href="#philosophy" className="text-sm text-nexo-text-secondary hover:text-nexo-red transition-colors">Filosofia</a>
            </div>
            <motion.button onClick={() => navigate('/onboarding')} className="btn-primary text-sm px-5 py-2.5" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Começar Jornada
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-28 pb-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p className="text-nexo-red font-semibold text-xs mb-6 tracking-[0.2em] uppercase" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              Educação de Excelência com IA
            </motion.p>
            <motion.h1 className="serif-heading text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1] text-nexo-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}>
              Eleve Seu <span className="text-red-gradient">Intelecto</span>
            </motion.h1>
            <motion.p className="text-lg md:text-xl text-nexo-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}>
              Um mentor IA guiando sua evolução. NEXO Academy combina sabedoria clássica com inteligência artificial para transformar seu aprendizado.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}>
              <motion.button onClick={() => navigate('/onboarding')} className="btn-primary text-base px-8 py-4 group inline-flex items-center justify-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                Comece sua Jornada <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <a href="#features" className="btn-secondary text-base px-8 py-4 inline-flex items-center justify-center gap-2">
                Conheça a Plataforma
              </a>
            </motion.div>
            <motion.div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold serif-heading text-nexo-red">{stat.value}</p>
                  <p className="text-xs text-nexo-text-secondary mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div className="flex justify-center mt-16" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.5 }}>
            <NIXMascot size="lg" variant="badge" />
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Benefits */}
      <section id="benefits" className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-nexo-red font-semibold text-xs mb-3 tracking-[0.2em] uppercase">Benefícios</p>
            <h2 className="serif-heading text-3xl md:text-4xl mb-4 text-nexo-text">Por Que NEXO Academy?</h2>
            <p className="text-nexo-text-secondary max-w-xl mx-auto">Uma experiência educacional que se adapta a você, não o contrário.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} className="card-premium group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-nexo-red/8 border border-nexo-red/15 flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-nexo-red/12 group-hover:border-nexo-red/25">
                    <b.icon className="w-5 h-5 text-nexo-red" />
                  </div>
                  <div>
                    <h3 className="serif-heading text-lg mb-2 group-hover:text-nexo-red transition-colors text-nexo-text">{b.title}</h3>
                    <p className="text-sm text-nexo-text-secondary leading-relaxed">{b.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 lg:px-8 bg-nexo-cream-dark/20">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-nexo-red font-semibold text-xs mb-3 tracking-[0.2em] uppercase">Recursos</p>
            <h2 className="serif-heading text-3xl md:text-4xl mb-4 text-nexo-text">A Experiência NEXO</h2>
            <p className="text-nexo-text-secondary max-w-xl mx-auto">Tecnologia de ponta a serviço da sua evolução intelectual.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div key={f.title} className="card-premium text-center" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="w-14 h-14 rounded-2xl bg-nexo-red/8 border border-nexo-red/15 flex items-center justify-center mx-auto mb-5"><f.icon className="w-6 h-6 text-nexo-red" /></div>
                <h3 className="serif-heading text-xl mb-3 text-nexo-text">{f.title}</h3>
                <p className="text-sm text-nexo-text-secondary leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div className="mt-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="serif-heading text-2xl md:text-3xl text-center mb-12 text-nexo-text">Como Funciona</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Diagnóstico', desc: 'NIX analisa seu conhecimento, padrões e objetivos intelectuais.' },
                { step: '02', title: 'Currículo', desc: 'Um caminho personalizado é criado com conteúdo CEFIS curado pela IA.' },
                { step: '03', title: 'Domínio', desc: 'Engaje-se profundamente, progrida significativamente, alcance excelência.' },
              ].map((item, i) => (
                <motion.div key={item.step} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-nexo-red text-white mb-5"><span className="serif-heading text-lg">{item.step}</span></div>
                  <h4 className="serif-heading text-lg mb-2 text-nexo-text">{item.title}</h4>
                  <p className="text-sm text-nexo-text-secondary">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-nexo-red font-semibold text-xs mb-3 tracking-[0.2em] uppercase">Depoimentos</p>
            <h2 className="serif-heading text-3xl md:text-4xl mb-4 text-nexo-text">O Que Dizem Nossos Estudiosos</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} className="card-premium" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (<Star key={j} className="w-3.5 h-3.5 text-nexo-red fill-nexo-red" />))}
                </div>
                <p className="text-sm text-nexo-text-secondary leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-nexo-border-light">
                  <div className="w-9 h-9 rounded-full bg-nexo-red/10 flex items-center justify-center"><span className="text-xs font-semibold text-nexo-red">{t.name[0]}</span></div>
                  <div><p className="text-sm font-medium text-nexo-text">{t.name}</p><p className="text-xs text-nexo-text-secondary">{t.role}</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="py-24 px-6 lg:px-8 bg-nexo-cream-dark/20">
        <div className="max-w-4xl mx-auto">
          <motion.div className="academic-frame text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <NIXMascot size="lg" variant="badge" className="mx-auto mb-8" />
            <h2 className="serif-heading text-3xl md:text-4xl mb-4 text-nexo-text">Pronto para <span className="text-nexo-red">Evoluir</span>?</h2>
            <p className="text-nexo-text-secondary mb-8 max-w-lg mx-auto leading-relaxed">Junte-se a milhares de estudiosos que transformaram suas capacidades intelectuais através de orientação de excelência.</p>
            <div className="flex items-center justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 text-nexo-red fill-nexo-red" />))}
            </div>
            <motion.button onClick={() => navigate('/onboarding')} className="btn-primary text-base px-10 py-4 group inline-flex items-center justify-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Comece sua Jornada <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
            <div className="flex items-center justify-center gap-6 text-sm text-nexo-text-secondary border-t border-nexo-border-light pt-6 mt-8">
              <span className="flex items-center gap-2"><Users className="w-4 h-4" />50.000+ estudiosos</span>
              <span className="flex items-center gap-2"><Award className="w-4 h-4" />Excelência certificada</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-nexo-border-light py-12 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <NIXMascot size="sm" variant="simple" />
            <div><h2 className="font-serif font-bold text-nexo-text">NEXO Academy</h2><p className="text-xs text-nexo-text-secondary">Eleve Seu Intelecto</p></div>
          </div>
          <p className="text-sm text-nexo-text-secondary">2024 NEXO Academy. Excelência em educação.</p>
        </div>
      </footer>
    </div>
  );
}
