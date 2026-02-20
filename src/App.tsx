import React, { useState } from 'react';
import { 
  Wrench, 
  Cpu, 
  Car, 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Truck, 
  ChevronRight, 
  Star,
  ShieldCheck,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from './lib/utils';

// --- Types & Schemas ---

const quoteSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  vehicle: z.string().min(2, "Modèle du véhicule requis"),
  service: z.string().min(1, "Veuillez choisir un service"),
  message: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

// --- Components ---

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-100">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(227,6,19,0.03),transparent_70%)]" />
    
    {/* Particles / Grid Effect */}
    <div className="absolute inset-0 opacity-[0.03]" 
         style={{ backgroundImage: 'radial-gradient(circle, #E30613 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02]" />
  </div>
);

const ServiceCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 hover:border-red-500/50 transition-all group relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-red-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
    <div className="w-14 h-14 bg-red-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-all shadow-sm">
      <Icon className="w-7 h-7 text-red-600 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-red-600 transition-colors">{title}</h3>
    <p className="text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">{description}</p>
  </motion.div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteSubmitted, setIsQuoteSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema)
  });

  const onSubmit = async (data: QuoteFormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Quote Request:', data);
    setIsQuoteSubmitted(true);
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 selection:bg-red-600 selection:text-white bg-slate-100">
      <AnimatedBackground />

      {/* Top Header: KR GROUPE & AD Logo */}
      <div className="relative z-50 pt-4 px-6 max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-0">
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 hover:text-red-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          <div className="w-32 hidden md:block" /> {/* Spacer */}
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-xl md:text-2xl font-black tracking-[0.2em] text-[#E30613] uppercase drop-shadow-sm">
              KR GROUPE
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-end group"
          >
            <img 
              src="https://res.cloudinary.com/dcccnesiw/image/upload/v1771587239/logo_AD_q79qrv.png" 
              alt="AD Logo" 
              className="h-12 md:h-20 object-contain drop-shadow-md transition-transform group-hover:scale-110"
            />
            <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Partenaire Réseau</span>
          </motion.div>
        </div>

        {/* Auto Reparis Logo - Just below KR Groupe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex flex-col items-center mb-0 -mt-12 md:-mt-24"
        >
          <img 
            src="https://res.cloudinary.com/dcccnesiw/image/upload/v1771590646/Logo_auto_Reparis_sans_arrie%CC%80re_mnnnn3.png" 
            alt="Auto Reparis Logo" 
            className="h-40 md:h-64 lg:h-80 object-contain relative z-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          />
          
          {/* Red Line Under Logo */}
          <div className="w-64 md:w-80 lg:w-[32rem] h-[3px] bg-red-600 -mt-2 relative z-10 shadow-[0_0_15px_rgba(227,6,19,0.8)]" />
        </motion.div>
      </div>

      {/* Hero Section: Garage Image */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden mx-4 md:mx-8 rounded-[2.5rem] border border-slate-200 shadow-xl -mt-4 md:-mt-8">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dcccnesiw/image/upload/v1771585843/garage_iage_nj4rup.jpg" 
            alt="Garage Auto Reparis" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-100/80 via-transparent to-transparent" />
        </div>
      </section>

      {/* Navigation: Below Hero */}
      <nav className="relative z-50 flex justify-center gap-6 md:gap-16 py-10 uppercase tracking-[0.3em] text-[10px] md:text-xs font-black text-slate-500">
        {[
          { name: 'Accueil', href: '#' },
          { name: 'Services', href: '#services' },
          { name: 'Rendez-vous', href: '#devis' },
          { name: 'Contact', href: '#contact' }
        ].map((item) => (
          <a 
            key={item.name}
            href={item.href} 
            className="hover:text-red-600 transition-colors relative group"
          >
            {item.name}
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-red-600 transition-all group-hover:w-full shadow-[0_0_10px_rgba(227,6,19,0.5)]" />
          </a>
        ))}
      </nav>

      {/* Stats / Trust */}
      <div className="bg-white/80 backdrop-blur-md border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Années d'expérience", value: "15+" },
            { label: "Clients satisfaits", value: "5000+" },
            { label: "Garantie AD", value: "2 Ans" },
            { label: "Experts certifiés", value: "100%" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-red-600 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Innovation Section (Valet) */}
      <section id="innovation" className="py-24 bg-white overflow-hidden relative border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-red-600/5 blur-xl rounded-3xl" />
                <img 
                  src="https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&q=80&w=1000" 
                  alt="Service Valet Innovant" 
                  className="relative rounded-3xl shadow-2xl border border-slate-200"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            <div>
              <div className="text-red-600 font-black uppercase tracking-widest mb-4">Innovation Exclusive</div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-slate-900">
                Pas le temps ? <br />On s'occupe de tout.
              </h2>
              <p className="text-xl text-slate-500 mb-10 leading-relaxed">
                Auto Reparis réinvente le garage traditionnel. Si vous êtes débordé, notre service de conciergerie récupère votre véhicule, effectue les réparations et vous le livre à l'adresse de votre choix.
              </p>
              
              <ul className="space-y-6">
                {[
                  "Récupération à domicile ou au bureau",
                  "Suivi des réparations en temps réel",
                  "Livraison de votre véhicule réparé"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-red-600/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-lg font-medium text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-12 bg-red-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">
                Réserver mon Service Valet
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-4xl md:text-6xl font-black mb-8 text-slate-900 drop-shadow-sm"
            >
              Nos Expertises
            </motion.h2>
            <p className="text-xl text-slate-500">
              Une équipe de techniciens certifiés pour une maintenance irréprochable de votre véhicule.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={Wrench}
              title="Mécanique Générale"
              description="Révision, freinage, distribution, embrayage. Nous intervenons sur toutes les marques avec des pièces d'origine."
              delay={0.1}
            />
            <ServiceCard 
              icon={Cpu}
              title="Électronique & Diagnostic"
              description="Lecture de codes défauts, reprogrammation, recherche de pannes complexes avec les derniers outils de diagnostic."
              delay={0.2}
            />
            <ServiceCard 
              icon={ShieldCheck}
              title="Carrosserie & Peinture"
              description="Remise en état après sinistre, débosselage sans peinture, lustrage et protection céramique."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Achat / Vente Section */}
      <section id="achat-vente" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[3rem] p-12 md:p-24 shadow-2xl border border-slate-200 flex flex-col md:flex-row items-center gap-20">
            <div className="flex-1">
              <div className="inline-block bg-red-600/10 text-red-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-8 border border-red-600/20">
                Opportunités
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 text-slate-900 drop-shadow-sm">Achat & Vente</h2>
              <p className="text-xl text-slate-500 mb-12 leading-relaxed">
                Vendez votre véhicule au meilleur prix ou découvrez notre sélection d'occasions révisées et garanties.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-red-500/30 transition-colors shadow-sm">
                  <div className="font-black text-slate-900 text-lg mb-3 uppercase tracking-wider">Estimation</div>
                  <div className="text-sm text-slate-500">Reprise immédiate de votre véhicule actuel.</div>
                </div>
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-red-500/30 transition-colors shadow-sm">
                  <div className="font-black text-slate-900 text-lg mb-3 uppercase tracking-wider">Garantie</div>
                  <div className="text-sm text-slate-500">Véhicules certifiés sur 110 points de contrôle.</div>
                </div>
              </div>
              <button className="flex items-center gap-3 text-red-600 font-black text-xl group uppercase tracking-widest">
                Voir le stock <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
            <div className="flex-1 w-full relative">
              <div className="absolute -inset-4 bg-red-600/10 blur-3xl rounded-full" />
              <img 
                src="https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=1000" 
                alt="Vente de plusieurs voitures" 
                className="relative rounded-[2rem] shadow-2xl object-cover h-[450px] w-full border border-slate-200"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="devis" className="py-24 bg-slate-200 relative overflow-hidden border-y border-slate-300">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center text-slate-900 mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">Demandez votre Devis</h2>
            <p className="text-xl text-slate-600">
              Réponse rapide garantie sous 24h. C'est gratuit et sans engagement.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
            {isQuoteSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Demande Envoyée !</h3>
                <p className="text-slate-600 mb-8">
                  Merci pour votre confiance. Un expert Auto Reparis vous contactera très prochainement.
                </p>
                <button 
                  onClick={() => setIsQuoteSubmitted(false)}
                  className="text-red-600 font-bold hover:underline"
                >
                  Envoyer une autre demande
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Nom Complet</label>
                    <input 
                      {...register("name")}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all",
                        errors.name && "border-red-500"
                      )}
                      placeholder="Jean Dupont"
                    />
                    {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email</label>
                    <input 
                      {...register("email")}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all",
                        errors.email && "border-red-500"
                      )}
                      placeholder="jean@example.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Téléphone</label>
                    <input 
                      {...register("phone")}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all",
                        errors.phone && "border-red-500"
                      )}
                      placeholder="06 00 00 00 00"
                    />
                    {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Véhicule (Modèle/Année)</label>
                    <input 
                      {...register("vehicle")}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all",
                        errors.vehicle && "border-red-500"
                      )}
                      placeholder="Peugeot 208 - 2021"
                    />
                    {errors.vehicle && <p className="text-xs text-red-500 font-medium">{errors.vehicle.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Service Souhaité</label>
                  <select 
                    {...register("service")}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all",
                      errors.service && "border-red-500"
                    )}
                  >
                    <option value="">Sélectionnez un service</option>
                    <option value="mecanique">Mécanique</option>
                    <option value="electronique">Électronique</option>
                    <option value="carrosserie">Carrosserie</option>
                    <option value="valet">Service Valet (Récupération/Livraison)</option>
                    <option value="achat-vente">Achat / Vente</option>
                  </select>
                  {errors.service && <p className="text-xs text-red-500 font-medium">{errors.service.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Message (Optionnel)</label>
                  <textarea 
                    {...register("message")}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
                    placeholder="Détaillez votre demande..."
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer ma demande"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="contact" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-2xl">
            <h2 className="text-4xl font-black mb-12 text-slate-900 uppercase tracking-tighter">Nous Contacter</h2>
            <div className="space-y-10">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-red-600/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-red-600 transition-all border border-red-500/20">
                  <MapPin className="text-red-600 group-hover:text-white" />
                </div>
                <div>
                  <div className="font-black text-slate-900 text-lg uppercase tracking-widest mb-1">Localisation</div>
                  <p className="text-slate-500">3 avenue de la gare de l’abbaye<br />93600 Aulnay-sous-Bois</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-red-600/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-red-600 transition-all border border-red-500/20">
                  <Phone className="text-red-600 group-hover:text-white" />
                </div>
                <div>
                  <div className="font-black text-slate-900 text-lg uppercase tracking-widest mb-1">Appelez-nous</div>
                  <p className="text-slate-500 font-bold text-xl">01 48 69 92 33</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-red-600/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-red-600 transition-all border border-red-500/20">
                  <Mail className="text-red-600 group-hover:text-white" />
                </div>
                <div>
                  <div className="font-black text-slate-900 text-lg uppercase tracking-widest mb-1">Email</div>
                  <p className="text-slate-500">autoreparisaulny@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-red-600/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-red-600 transition-all border border-red-500/20">
                  <Clock className="text-red-600 group-hover:text-white" />
                </div>
                <div>
                  <div className="font-black text-slate-900 text-lg uppercase tracking-widest mb-1">Horaires</div>
                  <div className="text-slate-500 text-sm space-y-2">
                    <p className="flex justify-between gap-4"><span className="font-bold">Lun - Jeu :</span> 09h00 - 13h00 | 14h00 - 18h00</p>
                    <p className="flex justify-between gap-4"><span className="font-bold">Vendredi :</span> 09h00 - 12h00 | 14h00 - 18h00</p>
                    <p className="flex justify-between gap-4"><span className="font-bold">Samedi :</span> 09h00 - 13h00 | 14h00 - 18h00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-[600px] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2621.144458316139!2d2.493928376846663!3d48.93166667134268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e613768a88888b%3A0x6a0a0a0a0a0a0a0a!2s3%20Av.%20de%20la%20Gare%20de%20l'Abbaye%2C%2093600%20Aulnay-sous-Bois%2C%20France!5e0!3m2!1sfr!2sfr!4v1708420000000!5m2!1sfr!2sfr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 text-slate-900 pt-20 pb-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl font-black tracking-tighter text-red-600">AUTO REPARIS</span>
              </div>
              <p className="text-slate-600 max-w-md mb-8">
                Votre partenaire de confiance pour l'entretien et la réparation de votre véhicule à Aulnay-sous-Bois. Expertise AD et service client premium.
              </p>
              <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <span className="font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <span className="font-bold">in</span>
                </div>
                <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <span className="font-bold">ig</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-red-600">Navigation</h4>
              <ul className="space-y-4 text-slate-600">
                <li><a href="#services" className="hover:text-red-600 transition-colors">Services</a></li>
                <li><a href="#innovation" className="hover:text-red-600 transition-colors">Service Valet</a></li>
                <li><a href="#achat-vente" className="hover:text-red-600 transition-colors">Achat / Vente</a></li>
                <li><a href="#devis" className="hover:text-red-600 transition-colors">Devis</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-red-600">Contact</h4>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-center gap-3"><Phone className="w-4 h-4" /> 01 48 69 92 33</li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4" /> autoreparisaulny@gmail.com</li>
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4" /> 93600 Aulnay-sous-Bois</li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
            <p>© 2024 Auto Reparis. Tous droits réservés. KR GROUPE.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-red-600 transition-colors">Mentions Légales</a>
              <a href="#" className="hover:text-red-600 transition-colors">Confidentialité</a>
              <span className="text-red-600 font-bold">www.autoreparis93600@hotmail.fr</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
