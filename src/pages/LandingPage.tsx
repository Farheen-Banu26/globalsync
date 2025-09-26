import { Users, Calendar, Brain, Globe, ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlowButton from '../components/GlowButton';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Global Sync</h1>
                <p className="text-blue-200 text-sm">Intelligent Meeting Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <GlowButton
                variant="secondary"
                onClick={() => navigate('/login')}
                className="text-white border border-white/30 bg-white/10 hover:bg-white/20"
              >
                Login
              </GlowButton>
              <GlowButton
                variant="primary"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </GlowButton>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent block">
              Global Meetings
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered meeting assistant that turns vendor-distributor sessions into 
            productive, organized, and timezone-optimized collaborations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <GlowButton
              size="lg"
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </GlowButton>
            <GlowButton
              variant="secondary"
              size="lg"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto text-white border border-white/30 bg-white/10 hover:bg-white/20"
            >
              Login to Dashboard
            </GlowButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Intelligent Meeting Management
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              From scheduling to follow-ups, our AI handles every aspect of your global meetings
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI-Powered Scheduling',
                description: 'Smart timezone optimization and conflict detection for seamless global coordination'
              },
              {
                icon: Calendar,
                title: 'Auto-Generated Agendas',
                description: 'Intelligent agenda creation based on past meetings and sales data'
              },
              {
                icon: Globe,
                title: 'Global Time Zones',
                description: 'Effortless coordination across different time zones and regions'
              },
              {
                icon: Zap,
                title: 'Smart Follow-ups',
                description: 'Automated tracking of action items and reminders with progress gamification'
              },
              {
                icon: Shield,
                title: 'Secure & Reliable',
                description: 'Enterprise-grade security for confidential vendor-distributor discussions'
              },
              {
                icon: Clock,
                title: 'Meeting Insights',
                description: 'Historical analysis and performance metrics to optimize future meetings'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-blue-100 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Meetings?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join leading vendors and distributors who trust Global Sync for their critical meetings
          </p>
          <GlowButton
            size="lg"
            onClick={() => navigate('/signup')}
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </GlowButton>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;