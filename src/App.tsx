import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Battery, Zap, ShieldAlert, Activity, Lightbulb, ArrowRight, ShieldCheck, ZapOff, Factory, Loader2, CheckCircle2 } from 'lucide-react';
import GeneratedImage from './components/GeneratedImage';

export default function App() {
  const scrollToForm = () => {
    document.getElementById('analyse-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Form State
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    connection: '',
    peak: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '675d9894-ddc4-4343-9f4a-4378cd5c17bb',
          Bedrijfsnaam: formData.company,
          Email: formData.email,
          Hoofdaansluiting: formData.connection,
          Piekverbruik: formData.peak || 'Niet ingevuld',
          subject: 'Nieuwe aanvraag via Peak Shaving Solutions website'
        })
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert('Er ging iets mis bij het versturen. Probeer het later opnieuw.');
      }
    } catch (error) {
      alert('Er ging iets mis bij het versturen. Probeer het later opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-pss-orange selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-pss-navy/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-pss-orange w-8 h-8" />
            <span className="text-white font-bold text-xl tracking-tight">Peak Shaving Solutions</span>
          </div>
          <button 
            onClick={scrollToForm}
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-pss-orange hover:bg-pss-orange-hover transition-colors rounded-lg"
          >
            Gratis Analyse
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=2000&auto=format&fit=crop" 
            alt="Industrial High-Tech Equipment" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Dark Overlay for Text Readability (Reduced Opacity) */}
        <div className="absolute inset-0 bg-pss-navy/75 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pss-navy via-pss-navy/70 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6"
            >
              De veiligste weg naar Peak Shaving: Maximale kracht, minimale footprint.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl"
            >
              Ontdek waarom LTO superieur is aan LFP voor industriële pieken. Onbrandbaar, 30.000+ cycli en een C-rating die uw zwaarste apparatuur moeiteloos opstart met uw huidige aansluiting.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button 
                onClick={scrollToForm}
                className="inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-semibold text-white bg-pss-orange hover:bg-pss-orange-hover transition-all rounded-xl shadow-[0_0_20px_rgba(255,102,0,0.3)] hover:shadow-[0_0_30px_rgba(255,102,0,0.5)] group"
              >
                Laat mijn verbruiksprofiel analyseren
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. DE PIJNPUNTEN */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-pss-navy mb-4">Loopt u tegen de grenzen van uw netaansluiting aan?</h2>
            <div className="w-24 h-1 bg-pss-orange mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ZapOff className="w-8 h-8 text-pss-orange" />,
                title: "Piekboetes",
                desc: "Voorkom onnodig hoge kosten door kortstondige verbruikspieken die uw contractvermogen overschrijden."
              },
              {
                icon: <Factory className="w-8 h-8 text-pss-orange" />,
                title: "Netcongestie",
                desc: "Breid uw machinepark of laadplein direct uit zonder de jarenlange wachtlijst voor een zwaardere aansluiting."
              },
              {
                icon: <ShieldAlert className="w-8 h-8 text-pss-orange" />,
                title: "Veiligheid boven alles",
                desc: "Stop met het accepteren van brandgevaarlijke LFP-systemen in uw bedrijfspand. Kies voor de stabiliteit van LTO."
              }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-pss-navy mb-3">{card.title}</h3>
                <p className="text-pss-slate leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LTO TECHNOLOGIE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-pss-navy mb-6">LTO: De compacte krachtpatser</h2>
                <p className="text-lg text-pss-slate mb-8 leading-relaxed">
                  Standaard LFP-batterijen zijn vaak te groot en te traag voor industrieel piekverbruik. Onze LTO-technologie (Lithium Titanate Oxide) levert extreme kracht (hoge C-rating) uit een compacte behuizing.
                </p>
                
                <ul className="space-y-6">
                  {[
                    { title: "Extreme C-Rating", desc: "Snellere ontlading voor de zwaarste startstromen van machines." },
                    { title: "Brandveilig", desc: "Geen risico op 'Thermal Runaway'. Veilig voor binnenplaatsing." },
                    { title: "Onverwoestbaar", desc: "Gaat met 30.000+ laadcycli tot wel 10x langer mee dan LFP." }
                  ].map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <Zap className="w-6 h-6 text-pss-orange shrink-0 mt-1 mr-4" />
                      <div>
                        <h4 className="text-lg font-bold text-pss-navy">{point.title}</h4>
                        <p className="text-pss-slate">{point.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            <div className="lg:w-1/2 w-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="aspect-square md:aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden relative"
              >
                <img 
                  src="/LTO batterypack Peak shaving solutions.jpg"
                  alt="Geavanceerd LTO Batterijsysteem"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pss-navy/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-pss-navy/90 backdrop-blur p-4 rounded-xl inline-flex items-center gap-3 border border-white/10">
                    <Battery className="w-6 h-6 text-pss-orange" />
                    <span className="font-semibold text-white">LTO Cell Architecture</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INNOVATIE STRATEGIE */}
      <section className="py-24 bg-pss-navy text-white relative overflow-hidden border-y border-pss-orange/20">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Lightbulb className="w-12 h-12 text-pss-orange mx-auto mb-6" />
          <p className="text-xl md:text-2xl font-light leading-relaxed">
            "PSS is een innovatieve partner. Wij leveren geen standaardproduct uit de doos, maar ontwerpen een systeem op maat op basis van uw werkelijke verbruiksdata. <strong className="font-bold text-pss-orange">Wij bouwen voor de koplopers in de energietransitie.</strong>"
          </p>
        </div>
      </section>

      {/* 5. LEAD GENERATIE (Formulier) */}
      <section id="analyse-form" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-pss-navy mb-4">Vraag een Verbruikersprofiel Analyse aan</h2>
              <p className="text-pss-slate">Ontdek hoeveel u kunt besparen en of LTO-technologie de oplossing is voor uw capaciteitsprobleem.</p>
            </div>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-pss-navy mb-2">Aanvraag Ontvangen!</h3>
                <p className="text-pss-slate mb-6">Bedankt voor uw interesse. Wij nemen zo spoedig mogelijk contact met u op om uw verbruiksprofiel te analyseren.</p>
                <button 
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({ company: '', email: '', connection: '', peak: '' });
                  }}
                  className="text-pss-orange font-semibold hover:text-pss-orange-hover transition-colors"
                >
                  Nieuwe aanvraag indienen
                </button>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-medium text-pss-navy">Bedrijfsnaam</label>
                    <input 
                      type="text" 
                      id="company" 
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pss-orange focus:border-pss-orange outline-none transition-all"
                      placeholder="Uw bedrijf"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-pss-navy">E-mailadres</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pss-orange focus:border-pss-orange outline-none transition-all"
                      placeholder="naam@bedrijf.nl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="connection" className="block text-sm font-medium text-pss-navy">Huidige Hoofdaansluiting</label>
                  <select 
                    id="connection" 
                    required
                    value={formData.connection}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pss-orange focus:border-pss-orange outline-none transition-all bg-white"
                  >
                    <option value="">Selecteer uw aansluiting...</option>
                    <option value="3x80A">3x80A</option>
                    <option value=">3x80A">Groter dan 3x80A (Grootzakelijk)</option>
                    <option value="unknown">Weet ik niet precies</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="peak" className="block text-sm font-medium text-pss-navy">Grootste Piekverbruik (indien bekend)</label>
                  <input 
                    type="text" 
                    id="peak" 
                    value={formData.peak}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pss-orange focus:border-pss-orange outline-none transition-all"
                    placeholder="Bijv. 150 kW"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 bg-pss-orange hover:bg-pss-orange-hover disabled:bg-pss-orange/70 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors mt-4 shadow-lg shadow-orange-500/30 text-lg flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin mr-2" />
                      Bezig met verzenden...
                    </>
                  ) : (
                    "Start de Analyse"
                  )}
                </button>
                
                <p className="text-xs text-center text-gray-400 mt-4">
                  Wij gaan zorgvuldig om met uw gegevens. U zit nergens aan vast.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pss-navy py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Activity className="text-pss-orange w-6 h-6" />
            <span className="text-white font-bold text-lg tracking-tight">Peak Shaving Solutions</span>
          </div>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Peak Shaving Solutions. Alle rechten voorbehouden.
          </p>
        </div>
      </footer>
    </div>
  );
}
