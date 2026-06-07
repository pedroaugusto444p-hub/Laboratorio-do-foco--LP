import React, { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Check, 
  X, 
  Play, 
  Heart, 
  Smartphone, 
  Clock, 
  Award, 
  Volume2, 
  VolumeX, 
  Users, 
  BookOpen, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  QrCode, 
  CreditCard, 
  Copy, 
  ChevronRight, 
  ArrowDown,
  Star,
  CheckCircle,
  HelpCircle,
  Sparkles,
  PartyPopper
} from "lucide-react";

import { TAB_CONTENTS, BONUS_ITEMS, TESTIMONIALS, PRICING_TIERS, FAQ_ITEMS } from "./data";
import { TabContent, BonusItem, TestimonialChat, PricingTier, FAQItem } from "./types";
import { PurchaseNotification } from "./components/PurchaseNotification";

export default function App() {
  // State for active ala tab
  const [activeTab, setActiveTab] = useState<string>("brinquedos");
  
  // Dynamic statistic percentage loader state
  const [statsPercent, setStatsPercent] = useState<number>(0);

  // Active index for images carousel within active wing
  const [activeImgIdx, setActiveImgIdx] = useState<number>(0);

  const wingGalleries: Record<string, string[]> = {
    brinquedos: [
      "https://i.ibb.co/qYjVjPLY/imagem-01.png"
    ],
    engenhocas: [
      "https://i.ibb.co/BmFtzkB/imagem-02.png"
    ],
    cientistas: [
      "https://i.ibb.co/HLJymTxB/imagem-03.png"
    ],
    magicas: [
      "https://i.ibb.co/wFq5j8tW/imagem-04.png"
    ],
    raciocinio: [
      "https://i.ibb.co/RMCM3FP/imagem-05.png"
    ],
    quintal: [
      "https://i.ibb.co/hJwP2RTz/imagem-06.png"
    ],
    robotica: [
      "https://i.ibb.co/xqYCdhzP/imagem-07.png"
    ]
  };
  
  const testimonialImages = [
    "https://i.ibb.co/hFmkV8j2/Screenshot-4.png",
    "https://i.ibb.co/0j4bXBC5/Screenshot-5.png",
    "https://i.ibb.co/VyWcxNn/Depoimento-06.png",
    "https://i.ibb.co/Q7N58tWd/Screenshot-7.png",
    "https://i.ibb.co/Fqh17QRt/Depoimento-08.png",
    "https://i.ibb.co/tMrb34TJ/Depoimento-03.png"
  ];
  
  // State for active testimonial category/chat index or image index in carousel
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState<number>(0);
  const [isHoveredTestimonial, setIsHoveredTestimonial] = useState<boolean>(false);

  // Auto-play testimonial carousel
  useEffect(() => {
    if (isHoveredTestimonial) return;
    const timer = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % testimonialImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHoveredTestimonial, testimonialImages.length]);
  
  // State for accordion items
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Interactive gift/brinde simulation
  const [isGiftPlaying, setIsGiftPlaying] = useState<boolean>(false);
  const [giftProgress, setGiftProgress] = useState<number>(12);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Auto count stats up to 96%
  useEffect(() => {
    let start = 0;
    const end = 96;
    const duration = 2000; // 2 seconds to complete
    const incrementTime = Math.floor(duration / end);
    const timer = setInterval(() => {
      start += 1;
      setStatsPercent(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);
    return () => clearInterval(timer);
  }, []);

  // Reset image inner index when tab shifts, and scroll selected tab selector into view horizontally only
  useEffect(() => {
    setActiveImgIdx(0);
    const activeEl = document.getElementById(`tab_selector_${activeTab}`);
    if (activeEl) {
      const parent = activeEl.parentElement;
      if (parent) {
        const leftPos = activeEl.offsetLeft - parent.offsetLeft - (parent.clientWidth / 2) + (activeEl.clientWidth / 2);
        parent.scrollTo({
          left: leftPos,
          behavior: "smooth"
        });
      }
    }
  }, [activeTab]);
  
  // Checkout Modal State
  const [selectedPlan, setSelectedPlan] = useState<PricingTier | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [specialOfferModalOpen, setSpecialOfferModalOpen] = useState<boolean>(false);
  const [checkoutName, setCheckoutName] = useState<string>("");
  const [checkoutEmail, setCheckoutEmail] = useState<string>("");
  const [checkoutPhone, setCheckoutPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [cardName, setCardName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCvv, setCardCvv] = useState<string>("");
  const [purchaseStep, setPurchaseStep] = useState<"form" | "processing" | "payment_details" | "success">("form");
  const [isCopiedPix, setIsCopiedPix] = useState<boolean>(false);

  // Auto increment progress bar when "playing" the gift
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGiftPlaying) {
      interval = setInterval(() => {
        setGiftProgress((prev) => {
          if (prev >= 100) {
            setIsGiftPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isGiftPlaying]);

  const specialOfferPlan: PricingTier = {
    id: "super_1490",
    name: "🔥 PLANO GÊNIO DO FOCO (COMPLETO)",
    subtitle: "Parabéns! Você recebeu uma super oferta de upgrade com todo o acervo de vídeos completo e bônus inclusos.",
    price: "14",
    cents: ",90",
    pixPrice: "R$ 14,90",
    installments: "Pagamento único, acesso permanente",
    originalPrice: "R$ 197,00",
    badge: "OFERTA DE UPGRADE COM 90% OFF",
    features: [
      "✅ Recebe o Acervo Completo com +500 Projetos de Estímulo Psicomotor",
      "✅ Acesso Liberado à Ala dos Brinquedos Mecânicos de Alta Concentração",
      "✅ Vídeo-tutoriais curtos com áudio explicativo (Autonomia para a criança)",
      "✅ Filtros avançados por tempo, nível de agitação e materiais de casa",
      "✅ Acesso permanente com todas as atualizações mensais inclusas",
      "✅ Garantia incondicional de 7 dias"
    ],
    nonFeatures: [],
    ctaText: "QUERO APROVEITAR A OFERTA POR R$ 14,90 →",
    highlighted: true
  };

  const scrollToPlans = () => {
    document.getElementById("planos-secao")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenCheckout = (planOrId: string | PricingTier, bypassSpecialOffer = false) => {
    if (typeof planOrId === "string") {
      if (planOrId === "basico" && !bypassSpecialOffer) {
        setSpecialOfferModalOpen(true);
        return;
      }
      if (planOrId === "genio") {
        window.open("https://pay.wiapy.com/Zro0E0P0bQ", "_blank");
        return;
      }
      const plan = PRICING_TIERS.find(p => p.id === planOrId) || PRICING_TIERS[0];
      setSelectedPlan(plan);
    } else {
      if (planOrId.id === "genio") {
        window.open("https://pay.wiapy.com/Zro0E0P0bQ", "_blank");
        return;
      }
      setSelectedPlan(planOrId);
    }
    setPurchaseStep("form");
    setCheckoutModalOpen(true);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "MAKER10" && selectedPlan) {
      setPromoApplied(true);
      const discount = parseFloat(selectedPlan.price) * 0.1;
      setDiscountAmount(discount);
    } else {
      alert("Código inválido! Tente 'MAKER10' para 10% de desconto adicional.");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutEmail || !checkoutPhone) {
      alert("Por favor, preencha todos os campos cadastrais.");
      return;
    }
    setPurchaseStep("processing");
    setTimeout(() => {
      setPurchaseStep("payment_details");
    }, 1500);
  };

  const handleFinishPayment = () => {
    if (paymentMethod === "card") {
      if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
        alert("Por favor, preencha os dados do cartão de crédito.");
        return;
      }
    }
    setPurchaseStep("processing");
    setTimeout(() => {
      setPurchaseStep("success");
    }, 2000);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("00020101021126580014br.gov.bcb.pix01367de592e6-1434-4d45-9ce1-96952f92c86b520400005303986540527.905802BR5925MAOS_A_OBRA_LABORATORIO6009SAO_PAULO62070503***6304CA3F");
    setIsCopiedPix(true);
    setTimeout(() => setIsCopiedPix(false), 2000);
  };

  const currentTabContent = TAB_CONTENTS.find(tab => tab.id === activeTab) || TAB_CONTENTS[0];

  return (
    <div className="bg-[#FCFAF7] text-slate-950 font-sans selection:bg-[#F59E0B] selection:text-black">
      
      {/* Dynamic Header Bar */}
      <div className="bg-[#E63946] text-white py-2 px-4 text-center text-xs md:text-sm font-display tracking-widest font-bold sticky top-0 z-40 shadow-xs">
        <span className="inline-block animate-pulse bg-white/20 px-2 py-0.5 rounded mr-2">OFERTA LIMITADA</span>
        ACESSO IMEDIATO • GARANTIA DE 7 DIAS • PIX OU CARTÃO DE CRÉDITO
      </div>

      {/* Main Container Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* HERO SECTION */}
        <header className="pt-12 pb-20 border-b border-orange-100 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-3 py-1 rounded-full text-amber-800 text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping"></span>
              Edição 2026 — Laboratório Completo
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-5xl text-slate-900 leading-[1.15] tracking-tight text-left">
              De <span className="bg-red-50 text-[#E63946] px-2.5 py-0.5 rounded-lg border border-red-100 font-extrabold italic block sm:inline">&quot;Não para quieto e não tem foco em nada&quot;</span>
              <br className="hidden sm:inline" />
              <span className="block sm:inline sm:mt-1"> Para </span>
              <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-lg border border-emerald-100 font-extrabold italic block sm:inline">&quot;Mãe, olha o que eu montei sozinho concentrado&quot;</span>
              <span className="block mt-2 font-bold text-slate-800">em uma única tarde.</span>
            </h1>

            <p className="text-slate-700 text-base md:text-lg leading-relaxed font-sans max-w-2xl">
              O primeiro Laboratório de Projetos Manuais e Estímulos Sensoriais projetado para acalmar a mente, gastar energia mental e desenvolver a atenção de crianças agitadas ou com TDAH/TEA. Sem telas e sem brigas.
            </p>

            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold text-slate-800">
                <div className="flex items-start gap-2.5 bg-white/40 p-2.5 rounded-xl border border-stone-200/50">
                  <span className="text-xl leading-none flex-shrink-0">🧠</span>
                  <span className="leading-snug">Estimula o foco profundo através do processo psicomotor analógico</span>
                </div>
                <div className="flex items-start gap-2.5 bg-white/40 p-2.5 rounded-xl border border-stone-200/50">
                  <span className="text-xl leading-none flex-shrink-0">🎥</span>
                  <span className="leading-snug">Vídeo-tutoriais curtos com áudio guiado passo a passo para dar autonomia</span>
                </div>
                <div className="flex items-start gap-2.5 bg-white/40 p-2.5 rounded-xl border border-stone-200/50">
                  <span className="text-xl leading-none flex-shrink-0">💡</span>
                  <span className="leading-snug">Filtra por idade, nível de agitação e materiais simples de casa</span>
                </div>
                <div className="flex items-start gap-2.5 bg-white/40 p-2.5 rounded-xl border border-stone-200/50">
                  <span className="text-xl leading-none flex-shrink-0">🔒</span>
                  <span className="leading-snug">Acesso imediato • Compra 100% Segura • 7 dias de garantia</span>
                </div>
              </div>
            </div>

            {/* Pulsing CTA and Trust Elements */}
            <div className="pt-6 space-y-4">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToPlans}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-black text-center text-lg md:text-xl font-extrabold py-4 px-8 md:px-10 rounded-2xl shadow-lg shadow-amber-300/30 transition-all uppercase tracking-wide cursor-pointer w-full md:w-auto flex items-center justify-center gap-3 border-b-4 border-amber-750 font-sans"
              >
                VER PLANOS DISPONÍVEIS
                <ArrowRight className="w-6 h-6" />
              </motion.button>
              
              <div className="flex flex-wrap items-center justify-start gap-4 text-xs font-semibold text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  Garantia incondicional de 7 dias
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  Acesso imediato e seguro
                </span>
              </div>
            </div>
          </div>

          {/* Right Side Responsive Image Display */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-[#FAF6EE] shadow-2xl border-2 border-[#EDDFC3]">
              <img 
                src="https://i.ibb.co/21YWcQSt/Chat-GPT-Image-21-de-mai-de-2026-08-59-01.png" 
                alt="Laboratório Mãos à Obra - Crianças montando brinquedos de papelão" 
                referrerPolicy="no-referrer"
                className="w-full aspect-4/3 object-cover hover:scale-102 transition-transform duration-700"
              />
            </div>
            
            {/* Background blob decorations */}
            <div className="absolute -z-10 -bottom-8 -left-8 w-48 h-48 rounded-full bg-[#EDDFC3]/40 blur-2xl"></div>
            <div className="absolute -z-10 -top-8 -right-8 w-48 h-48 rounded-full bg-[#F59E0B]/20 blur-xl"></div>
          </div>

        </header>

        {/* SECTION 2: VEJA O QUE SEU FILHO VAI CONSTRUIR */}
        <section className="py-20 border-b border-orange-100">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16 px-4">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-extrabold leading-tight">
              Como engenharia e texturas substituem o estímulo do celular...
            </h2>
          </div>

          {/* Grid of Three Large Video Mockups */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-12 px-4">
            
            {/* Project Card 1: Mario Arcade */}
            <div className="group relative bg-[#FFFDF9] rounded-3xl overflow-hidden border border-[#EDDFC3] shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col p-6 space-y-5">
              <div className="space-y-3 flex-1">
                <span className="inline-block bg-[#E63946] text-white text-[10px] font-mono font-bold tracking-widest py-1 px-3 rounded-full uppercase">
                  ALA DOS BRINQUEDOS CASEIROS
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-slate-900 font-extrabold group-hover:text-[#E63946] transition-colors leading-tight">
                  Fliperama do Mario em Caixa de Sapato
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  O desafio mecânico de encaixar e coordenar os movimentos dá ao cérebro o mesmo estímulo de dopamina saudável que o videogame, mas de forma analógica e relaxante.
                </p>
                <div className="pt-3 border-t border-stone-100 flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
                  <Smartphone className="w-4 h-4 text-[#E63946] flex-shrink-0" />
                  <span>MATERIAIS: Caixa de sapato, papelão, cola e imaginação.</span>
                </div>
              </div>
              
              <div className="text-center pt-2 pb-1">
                <span className="inline-flex items-center justify-center gap-2 text-black text-sm sm:text-base font-sans font-black tracking-widest py-2 uppercase">
                  🎥 VEJA O KIT POR DENTRO
                  <ArrowDown className="w-5 h-5 text-black shrink-0 animate-bounce" />
                </span>
              </div>
              
              <div className="relative aspect-[9/16] w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-stone-200">
                <iframe
                  className="w-full h-full border-0 absolute inset-0"
                  src="https://www.youtube.com/embed/n0gC5SLvf6E"
                  title="Fliperama do Mario em Caixa de Sapato"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Project Card 2: Claw Machine */}
            <div className="group relative bg-[#FFFDF9] rounded-3xl overflow-hidden border border-[#EDDFC3] shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col p-6 space-y-5">
              <div className="space-y-3 flex-1">
                <span className="inline-block bg-[#E63946] text-white text-[10px] font-mono font-bold tracking-widest py-1 px-3 rounded-full uppercase">
                  ALA DAS ENGENHOCAS MALUCAS
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-slate-900 font-extrabold group-hover:text-[#E63946] transition-colors leading-tight">
                  Claw Machine (Máquina de Garra)
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Engenharia pura com papelão. O processo de puxar as polias e contrapesos exige foco milimétrico, prendendo a atenção da criança por horas.
                </p>
                <div className="pt-3 border-t border-stone-100 flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
                  <Smartphone className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>MATERIAIS: Polia, contrapeso, braço articulado, papelão.</span>
                </div>
              </div>
              
              <div className="text-center pt-2 pb-1">
                <span className="inline-flex items-center justify-center gap-2 text-black text-sm sm:text-base font-sans font-black tracking-widest py-2 uppercase">
                  🎥 VEJA O KIT POR DENTRO
                  <ArrowDown className="w-5 h-5 text-black shrink-0 animate-bounce" />
                </span>
              </div>
              
              <div className="relative aspect-[9/16] w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-stone-200">
                <iframe
                  className="w-full h-full border-0 absolute inset-0"
                  src="https://www.youtube.com/embed/zaFoxRzWbSE"
                  title="Claw Machine (Máquina de Garra)"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Project Card 3: Bicicleta com Bonequinho que Pedala Sozinho */}
            <div className="group relative bg-[#FFFDF9] rounded-3xl overflow-hidden border border-[#EDDFC3] shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col p-6 space-y-5">
              <div className="space-y-3 flex-1">
                <span className="inline-block bg-[#E63946] text-white text-[10px] font-mono font-bold tracking-widest py-1 px-3 rounded-full uppercase">
                  ALA DA ROBÓTICA MAKER — EXCLUSIVA PLANO GÊNIO
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-slate-900 font-extrabold group-hover:text-[#E63946] transition-colors leading-tight">
                  Bicicleta com Bonequinho que Pedala Sozinho
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Motor, elástico, papelão. Ele assiste de queixo caído.
                </p>
                <div className="pt-3 border-t border-stone-100 flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
                  <Smartphone className="w-4 h-4 text-[#E63946] flex-shrink-0" />
                  <span>MATERIAIS: Mini-motor, elástico, papelão e pilhas.</span>
                </div>
              </div>
              
              <div className="text-center pt-2 pb-1">
                <span className="inline-flex items-center justify-center gap-2 text-black text-sm sm:text-base font-sans font-black tracking-widest py-2 uppercase">
                  🎥 VEJA O KIT POR DENTRO
                  <ArrowDown className="w-5 h-5 text-black shrink-0 animate-bounce" />
                </span>
              </div>
              
              <div className="relative aspect-[9/16] w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-stone-200">
                <iframe
                  className="w-full h-full border-0 absolute inset-0"
                  src="https://www.youtube.com/embed/8y4CS8hQ3vc"
                  title="Bicicleta com Bonequinho que Pedala Sozinho"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

          </div>

          <div className="text-center pt-4 px-4 space-y-1">
            <p className="text-slate-800 font-mono text-sm font-semibold">
              ✨ Esses 3 vídeos são apenas 0,2% do que tem dentro.
            </p>
            <p className="text-slate-500 text-xs font-mono">
              São mais 1.244 projetos te esperando, com vídeo-tutorial ou tutorial passo a passo.
            </p>
          </div>

          <div className="flex justify-center mt-8 px-4">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToPlans}
              className="bg-[#F59E0B] hover:bg-[#D97706] text-black text-center text-lg md:text-xl font-extrabold py-4 px-8 md:px-10 rounded-2xl shadow-lg shadow-amber-300/30 transition-all uppercase tracking-wide cursor-pointer w-full md:w-auto flex items-center justify-center gap-3 border-b-4 border-amber-750 font-sans"
            >
              VER PLANOS DISPONÍVEIS
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>
        </section>

        {/* SECTION 3: UM BRINDE DO PAPELÃO DE GRAÇA */}
        <section className="py-16">
          <div className="bg-[#FFFDF9] border-[3px] border-dashed border-[#F59E0B] rounded-[2.5rem] p-6 sm:p-10 max-w-4xl mx-auto relative shadow-xs">
            
            {/* Heart badge label overlay */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-900 text-[11px] font-mono font-bold tracking-widest py-1 px-5 rounded-full uppercase shadow-md flex items-center gap-1.5 z-20">
              <Heart className="w-3.5 h-3.5 text-[#E63946] fill-[#E63946]" />
              um mimo pra você 💛
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
              
              <div className="md:col-span-6 space-y-4 text-left">
                <h3 className="font-serif text-3xl text-slate-900 font-extrabold leading-tight">
                  Um brinde antes de você decidir
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Um tutorial simples pra você ter uma ideia do que tem dentro. Esse aqui tá resumido e sem áudio explicativo — no Laboratório o tutorial é completo, com voz guiando e cada passo detalhado.
                </p>
                
                <div className="inline-block bg-slate-950 text-[#F59E0B] font-mono text-xs font-bold px-4 py-2 rounded-lg border border-slate-700 tracking-wider">
                  🛠 ROTEIRO: MÃO ROBÓTICA DE PAPELÃO 100% FUNCIONAL
                </div>
              </div>

              {/* Simulated Interactive Video Screen */}
              <div className="md:col-span-6 flex justify-center">
                <div className="bg-slate-950 rounded-[32px] overflow-hidden border-[6px] border-stone-800 shadow-2xl relative aspect-[9/16] w-full max-w-[280px] flex flex-col justify-between group">
                  <AnimatePresence mode="wait">
                    {!isGiftPlaying ? (
                      <motion.div 
                        key="cover"
                        className="absolute inset-0 flex flex-col justify-between p-4 z-10 overflow-hidden"
                      >
                        {/* Background Thumbnail Image with Overlay */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center brightness-75 scale-105 group-hover:scale-110 transition-transform duration-500 z-0"
                          style={{ backgroundImage: "url('https://img.youtube.com/vi/BRvOcM3sKX0/0.jpg')" }}
                        />
                        <div className="absolute inset-0 bg-black/40 z-0" />

                        {/* Watermark logo */}
                        <div className="flex justify-between items-start z-10">
                          <span className="text-[10px] text-zinc-100 bg-black/60 backdrop-blur-md font-mono tracking-widest border border-white/20 py-1 px-2.5 rounded-full uppercase">
                            Mãos à Obra Shorts
                          </span>
                        </div>

                        {/* Play State Simulator */}
                        <div className="flex flex-col items-center justify-center space-y-2 z-10">
                          <motion.button 
                            key="play-btn"
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsGiftPlaying(true)}
                            className="w-16 h-16 rounded-full bg-amber-500 hover:bg-[#F59E0B] text-black flex items-center justify-center shadow-xl cursor-pointer"
                          >
                            <Play className="w-7 h-7 fill-current ml-0.5" />
                          </motion.button>
                          <span className="text-white drop-shadow-md text-xs font-semibold bg-black/50 px-3 py-1 rounded-full backdrop-blur-xs">
                            Assistir Vídeo Demonstrativo
                          </span>
                        </div>

                        {/* Simulated timeline footer */}
                        <div className="w-full space-y-1.5 z-10">
                          <div className="h-1.5 bg-white/25 rounded-full overflow-hidden">
                            <div className="h-full bg-[#F59E0B]" style={{ width: `12%` }}></div>
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-zinc-200 font-mono font-bold bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                            <span>0:00</span>
                            <span className="animate-pulse text-amber-400">Clique para assistir</span>
                            <span>1:00</span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="video-frame"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0"
                      >
                        <iframe
                          className="w-full h-full border-0 absolute inset-0"
                          src="https://www.youtube.com/embed/BRvOcM3sKX0?autoplay=1"
                          title="Fliperama do Mario em Caixa de Sapato"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                        <button
                          onClick={() => setIsGiftPlaying(false)}
                          className="absolute bottom-4 right-4 bg-black/75 hover:bg-black text-white text-[10px] font-mono px-3 py-1.5 rounded-lg border border-white/20 z-20"
                        >
                          Fechar vídeo
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>

            <p className="text-center text-slate-800 text-xs font-mono font-semibold mt-6 uppercase tracking-wider">
              Pacote completo dos <span className="text-[#F59E0B] font-extrabold">1.247</span> projetos com áudio-tutorial e passo a passo: só dentro do Laboratório 👇
            </p>

            {/* Downward indicator */}
            <div className="flex flex-col items-center justify-center pt-8 mt-4 border-t border-[#EDDFC3]">
              <span className="text-[#F59E0B] text-xs font-mono font-bold uppercase tracking-widest animate-bounce">
                continua aqui em baixo
              </span>
            </div>

          </div>
        </section>

        {/* SECTION 4: STATISTIC DENSITY */}
        <section className="py-16 text-center px-4">
          <div className="max-w-4xl mx-auto bg-stone-900 text-white rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-xl">
            {/* Outline numbers */}
            <div className="text-left md:w-1/3 flex-shrink-0">
              <span className="text-stroke-amber text-7xl md:text-8xl lg:text-9xl font-fun block leading-none select-none text-[#F59E0B]">
                {statsPercent}%
              </span>
            </div>
            
            <div className="text-left space-y-3 md:w-2/3">
              <span className="inline-block bg-[#F59E0B]/20 text-[#F59E0B] font-mono text-xs font-bold py-1 px-3 rounded">
                PESQUISA DE SATISFAÇÃO 2026
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-extrabold leading-tight">
                das mães que entraram no Laboratório viram o filho largar o tablet na primeira semana.
              </h3>
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-2xl"></div>
          </div>
        </section>


        {/* SECTION 5: VOCÊ VIVE ESSA ROTINA DENTRO DE CASA? */}
        <section className="py-20 border-b border-orange-100 bg-[#FCFAF5]/50 rounded-3xl p-6 sm:p-10 max-w-5xl mx-auto my-12 shadow-xs border border-orange-50 px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="bg-[#E63946]/10 text-[#E63946] font-mono text-xs font-bold py-1 px-3.5 rounded-full uppercase tracking-wider">
              Você vive essa rotina dentro de casa?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-extrabold leading-tight">
              Você vive essa rotina dentro de casa?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 max-w-5xl mx-auto mb-12 text-left">
            {/* CARD 01 */}
            <div id="routine_card_1" className="bg-[#FFFDF9] border-2 border-red-200/80 hover:border-[#E63946] hover:scale-[1.02] rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 flex flex-col justify-between md:col-span-1 lg:col-span-2">
              <div className="space-y-3">
                <p className="text-[#E63946] font-bold text-[11px] uppercase font-mono tracking-wider flex items-center gap-1.5 w-fit">
                  ❌ CARD 01 — O Sequestro do Foco
                </p>
                <h4 className="font-serif text-lg font-extrabold text-black leading-snug">
                  O tempo de tela parece fora de controle
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Você tenta fazer o almoço, arrumar a casa ou trabalhar, enquanto o algoritmo entrega horas de vídeos rápidos por semana para o seu filho. A atenção dele sumiu.
                </p>
              </div>
            </div>

            {/* CARD 02 */}
            <div id="routine_card_2" className="bg-[#FFFDF9] border-2 border-red-200/80 hover:border-[#E63946] hover:scale-[1.02] rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 flex flex-col justify-between md:col-span-1 lg:col-span-2">
              <div className="space-y-3">
                <p className="text-[#E63946] font-bold text-[11px] uppercase font-mono tracking-wider flex items-center gap-1.5 w-fit">
                  ❌ CARD 02 — A Guerra da Abstinência
                </p>
                <h4 className="font-serif text-lg font-extrabold text-black leading-snug">
                  Tirar o celular sempre vira uma crise
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Cada birra, choro ou explosão de irritação quando você pede para desligar o tablet não é teimosia ou malcriação. É abstinência de dopamina, e ninguém te avisou.
                </p>
              </div>
            </div>

            {/* CARD 03 */}
            <div id="routine_card_3" className="bg-[#FFFDF9] border-2 border-red-200/80 hover:border-[#E63946] hover:scale-[1.02] rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 flex flex-col justify-between md:col-span-1 lg:col-span-2">
              <div className="space-y-3">
                <p className="text-[#E63946] font-bold text-[11px] uppercase font-mono tracking-wider flex items-center gap-1.5 w-fit">
                  ❌ CARD 03 — A Infância Apagada
                </p>
                <h4 className="font-serif text-lg font-extrabold text-black leading-snug">
                  Brincadeiras analógicas foram esquecidas
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Aquela infância criativa, de explorar, inventar e montar coisas que você teve, está sendo completamente apagada por telas superestimulantes que entregam tudo pronto.
                </p>
              </div>
            </div>

            {/* CARD 04 */}
            <div id="routine_card_4" className="bg-[#FFFDF9] border-2 border-red-200/80 hover:border-[#E63946] hover:scale-[1.02] rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 flex flex-col justify-between md:col-span-1 lg:col-span-3">
              <div className="space-y-3">
                <p className="text-[#E63946] font-bold text-[11px] uppercase font-mono tracking-wider flex items-center gap-1.5 w-fit">
                  ❌ CARD 04 — O Alerta Escolar
                </p>
                <h4 className="font-serif text-lg font-extrabold text-black leading-snug">
                  A conta do excesso de telas começou a chegar
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A falta de paciência com os estudos, a agitação excessiva na sala de aula e o déficit de atenção na escola se tornaram uma preocupação real para o futuro dele.
                </p>
              </div>
            </div>

            {/* CARD 05 */}
            <div id="routine_card_5" className="bg-[#FFFDF9] border-2 border-red-200/80 hover:border-[#E63946] hover:scale-[1.02] rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 flex flex-col justify-between md:col-span-1 lg:col-span-3">
              <div className="space-y-3">
                <p className="text-[#E63946] font-bold text-[11px] uppercase font-mono tracking-wider flex items-center gap-1.5 w-fit">
                  ❌ CARD 05 — A Exaustão Materna
                </p>
                <h4 className="font-serif text-lg font-extrabold text-black leading-snug">
                  Você se sente cobrada a ser uma "recreadora"
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Você quer o seu filho longe do celular, mas se sente exausta por ter que inventar brincadeiras novas do zero todo santo dia para conseguir prender a atenção dele.
                </p>
              </div>
            </div>
          </div>

          {/* TRANSITION TEXT */}
          <div className="text-center pt-8 border-t border-orange-100/60 mt-10">
            <p className="font-fun text-[#F59E0B] text-3xl sm:text-4xl tracking-wider select-none transform rotate-[-1deg] font-extrabold leading-none">
              Respira. Hoje isso muda.
            </p>
          </div>
        </section>


        {/* SECTION 6: COMO FUNCIONA O MÉTODO */}
        <section className="py-20 px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-extrabold tracking-tight">
              O caminho para a calmaria em 3 passos simples:
            </h2>
            <p className="text-slate-600 text-lg uppercase font-mono tracking-wide">
              não é curso. não é ebook. é um laboratório.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
            
            {/* Step 1 */}
            <div className="bg-[#FFFDF9] border border-[#EDDFC3] rounded-2xl p-8 relative shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 font-mono font-bold flex items-center justify-center text-xl">
                  01
                </div>
                <h4 className="font-serif text-xl font-extrabold text-slate-900 uppercase leading-snug">
                  PASSO 1: ESCOLHA O PROJETO DO FOCO
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Você entra no portal e usa nossos filtros rápidos. Dá para escolher a atividade pelo nível de agitação do dia, pela idade do seu filho e pelos materiais simples (como caixas velhas ou rolos de papel) que você já tem guardados.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FFFDF9] border border-[#EDDFC3] rounded-2xl p-8 relative shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 font-mono font-bold flex items-center justify-center text-xl">
                  02
                </div>
                <h4 className="font-serif text-xl font-extrabold text-slate-900 uppercase leading-snug">
                  PASSO 2: ELE ASSISTE AO VÍDEO GUIADO
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A maioria dos nossos projetos de alta retenção vem com vídeo-tutorial curto e áudio explicativo bem didático. Seu filho assiste e ganha a autonomia de entender o que precisa fazer sozinho, sem ficar dependendo de você para ler manuais.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FFFDF9] border border-[#EDDFC3] rounded-2xl p-8 relative shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 font-mono font-bold flex items-center justify-center text-xl">
                  03
                </div>
                <h4 className="font-serif text-xl font-extrabold text-slate-900 uppercase leading-snug">
                  PASSO 3: CONCENTRAÇÃO PROFUNDA
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Ele entra no estado de fluxo (foco pleno) montando o projeto. O sistema nervoso se acalma, a agitação diminui e, no final, ele corre orgulhoso para te mostrar o que foi capaz de criar sozinho. Você recupera o silêncio e a paz da sua casa.
                </p>
              </div>
            </div>

          </div>

          <div className="flex justify-center mt-12 px-4">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToPlans}
              className="bg-[#F59E0B] hover:bg-[#D97706] text-black text-center text-lg md:text-xl font-extrabold py-4 px-8 md:px-10 rounded-2xl shadow-lg shadow-amber-300/30 transition-all uppercase tracking-wide cursor-pointer w-full md:w-auto flex items-center justify-center gap-3 border-b-4 border-amber-750 font-sans"
            >
              VER PLANOS DISPONÍVEIS
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>
        </section>


        {/* SECTION 7: INTERACTIVE SHOWCASE - 7 ALAS */}
        <section className="py-20 border-t border-orange-100 bg-[#FCFAF5]/30">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 px-4">
            <span className="bg-[#E63946]/10 text-[#E63946] font-mono text-xs font-bold py-1 px-3.5 rounded-full uppercase tracking-wider">
              Explore as opções digitais
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-extrabold leading-tight">
              7 alas. <span className="text-[#F59E0B] font-extrabold">1.247</span> portas. Uma infância inteira pra redescobrir.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Arraste as categorias para os lados ou use as setas para deslizar pelas alas de brincadeiras. Dentro de cada ala, você também pode explorar fotos adicionais no carrossel de imagens!
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-4 space-y-8">
            
            {/* 1. HORIZONTAL ALAS TABS CAROUSEL WITH INDICATOR ARROWS */}
            <div className="relative flex items-center gap-2 bg-[#FFFDF9] border border-[#EDDFC3] rounded-2xl p-2.5 shadow-sm">
              <button
                onClick={() => {
                  const currentIndex = TAB_CONTENTS.findIndex(tab => tab.id === activeTab);
                  const prevIndex = (currentIndex - 1 + TAB_CONTENTS.length) % TAB_CONTENTS.length;
                  setActiveTab(TAB_CONTENTS[prevIndex].id);
                }}
                className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-[#EDDFC3] transition-all flex-shrink-0 cursor-pointer"
                title="Ala Anterior"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>

              {/* Horizontal Scroll Track */}
              <div 
                className="flex gap-2 overflow-x-auto scrollbar-none py-1 px-1 flex-1 snap-x snap-mandatory scroll-smooth"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {TAB_CONTENTS.map((tab) => {
                  const isActive = tab.id === activeTab;
                  return (
                    <button
                      key={tab.id}
                      id={`tab_selector_${tab.id}`}
                      onClick={() => setActiveTab(tab.id)}
                      className={`snap-center flex-shrink-0 py-2.5 px-5 rounded-xl border flex items-center gap-2.5 transition-all duration-300 font-mono text-xs uppercase cursor-pointer ${
                        isActive 
                          ? "bg-[#F59E0B] border-[#D97706] text-black font-bold shadow-md scale-103"
                          : "bg-white border-stone-200 hover:border-[#EDDFC3] text-slate-600 hover:bg-stone-50"
                      }`}
                    >
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${isActive ? "bg-black/10 text-black" : "bg-stone-100 text-stone-500"}`}>
                        {tab.number}
                      </span>
                      <span>{tab.title.replace("Ala dos ", "").replace("Ala das ", "").replace("Ala do ", "").replace("Ala da ", "")}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  const currentIndex = TAB_CONTENTS.findIndex(tab => tab.id === activeTab);
                  const nextIndex = (currentIndex + 1) % TAB_CONTENTS.length;
                  setActiveTab(TAB_CONTENTS[nextIndex].id);
                }}
                className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-[#EDDFC3] transition-all flex-shrink-0 cursor-pointer"
                title="Próxima Ala"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 2. CENTER-STAGE WING SLIDE PANEL (WITH GESTURES & CAROUSEL NAVIGATION) */}
            <div className="relative group">
              
              {/* Outer Left Arrow to slip Tab */}
              <button
                onClick={() => {
                  const currentIndex = TAB_CONTENTS.findIndex(tab => tab.id === activeTab);
                  const prevIndex = (currentIndex - 1 + TAB_CONTENTS.length) % TAB_CONTENTS.length;
                  setActiveTab(TAB_CONTENTS[prevIndex].id);
                }}
                className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white hover:bg-[#F59E0B] hover:text-black text-slate-800 flex items-center justify-center border-2 border-[#EDDFC3] shadow-lg transition-all duration-300 transform scale-90 sm:scale-100 active:scale-95 group-hover:translate-x-1 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>

              {/* Main Content Card Panel */}
              <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#EDDFC3] p-5 sm:p-8 lg:p-10 shadow-lg min-h-[460px] flex flex-col justify-between overflow-hidden relative">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(e, info) => {
                      if (info.offset.x > 80) {
                        // dragged right -> prev tab
                        const currentIndex = TAB_CONTENTS.findIndex(tab => tab.id === activeTab);
                        const prevIndex = (currentIndex - 1 + TAB_CONTENTS.length) % TAB_CONTENTS.length;
                        setActiveTab(TAB_CONTENTS[prevIndex].id);
                      } else if (info.offset.x < -80) {
                        // dragged left -> next tab
                        const currentIndex = TAB_CONTENTS.findIndex(tab => tab.id === activeTab);
                        const nextIndex = (currentIndex + 1) % TAB_CONTENTS.length;
                        setActiveTab(TAB_CONTENTS[nextIndex].id);
                      }
                    }}
                    className="space-y-6 flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center cursor-mono"
                  >
                    
                    {/* Left Text details */}
                    <div className="md:col-span-7 space-y-4">
                      <div className="inline-block bg-[#E63946] text-white text-[10px] font-mono font-bold tracking-widest py-1 px-3 rounded-full uppercase">
                        ALA {currentTabContent.number} • {currentTabContent.tag}
                      </div>
                      
                      <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                        {currentTabContent.title}
                      </h3>
                      
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {currentTabContent.subtitle}
                      </p>

                      <div className="space-y-3 pt-2">
                        <p className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">EXEMPLOS DE PROJETOS DESTA ALA:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
                          {currentTabContent.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-slate-800 font-semibold bg-white/60 p-1.5 rounded-lg border border-orange-100/50">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse"></span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Images Carousel */}
                    <div className="md:col-span-5 relative w-full aspect-square md:aspect-auto md:h-full min-h-[260px] rounded-2xl overflow-hidden border border-stone-200 shadow-md bg-stone-100">
                      
                      <AnimatePresence mode="wait">
                        <motion.img 
                          key={`${activeTab}-${activeImgIdx}`}
                          src={wingGalleries[activeTab]?.[activeImgIdx] || currentTabContent.image} 
                          alt={`${currentTabContent.title} view ${activeImgIdx + 1}`} 
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.25 }}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover absolute inset-0"
                        />
                      </AnimatePresence>

                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none"></div>
                      
                      {/* Inner Image Indicator dots */}
                      {(wingGalleries[activeTab]?.length > 1) && (
                        <div className="absolute bottom-3 left-12 right-12 flex justify-center gap-1.5 z-10 pointer-events-none">
                          {(wingGalleries[activeTab] || [currentTabContent.image]).map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                activeImgIdx === i ? "bg-amber-500 w-3.5" : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Inner Image Carousel Controls */}
                      {(wingGalleries[activeTab]?.length > 1) && (
                        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between z-15 pointer-events-auto">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const total = wingGalleries[activeTab]?.length || 1;
                              setActiveImgIdx((prev) => (prev - 1 + total) % total);
                            }}
                            className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/10 active:scale-95 transition-all cursor-pointer"
                            title="Imagem Anterior"
                          >
                            <ChevronRight className="w-4 h-4 rotate-180" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const total = wingGalleries[activeTab]?.length || 1;
                              setActiveImgIdx((prev) => (prev + 1) % total);
                            }}
                            className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/10 active:scale-95 transition-all cursor-pointer"
                            title="Próxima Imagem"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 bg-white/95 text-stone-900 text-[10px] font-bold font-mono py-1 px-2.5 rounded shadow-sm uppercase pointer-events-none">
                        🚀 ALA {currentTabContent.tag}
                      </div>

                    </div>

                  </motion.div>
                </AnimatePresence>

                <div className="pt-6 mt-6 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                    <span className="text-slate-500 text-xs font-mono">Deseja liberar este catálogo completo de <span className="text-[#F59E0B] font-extrabold">1.247</span> projetos lúdicos?</span>
                  </div>
                  <button 
                    onClick={() => handleOpenCheckout("genio")}
                    className="bg-slate-900 hover:bg-[#F59E0B] hover:text-black text-white text-xs font-mono uppercase tracking-wider py-2.5 px-6 rounded-xl border border-slate-700 hover:border-[#D97706] transition-all cursor-pointer shadow-md"
                  >
                    Liberar Acesso Completo →
                  </button>
                </div>

              </div>

              {/* Outer Right Arrow to slip Tab */}
              <button
                onClick={() => {
                  const currentIndex = TAB_CONTENTS.findIndex(tab => tab.id === activeTab);
                  const nextIndex = (currentIndex + 1) % TAB_CONTENTS.length;
                  setActiveTab(TAB_CONTENTS[nextIndex].id);
                }}
                className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white hover:bg-[#F59E0B] hover:text-black text-slate-800 flex items-center justify-center border-2 border-[#EDDFC3] shadow-lg transition-all duration-300 transform scale-90 sm:scale-100 active:scale-95 group-hover:-translate-x-1 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

            </div>

          </div>
        </section>


        {/* SECTION 8: CRIADO POR QUEM VIVE A INFÂNCIA DE PERTO */}
        <section className="py-20 bg-[#FAF6F0] rounded-3xl p-8 max-w-6xl mx-auto my-12 border border-stone-100 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                <img 
                  src="https://i.ibb.co/Xx1ZzR6L/Chat-GPT-Image-21-de-mai-de-2026-09-08-59.png" 
                  alt="Nossa equipe de professores e educadores integrados" 
                  referrerPolicy="no-referrer"
                  className="w-full aspect-3/4 object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-xs text-white p-3.5 rounded-xl border border-white/10">
                  <p className="font-serif text-sm font-bold text-[#F59E0B]">Equipe de Especialistas Mãos à Obra</p>
                  <p className="text-[10px] text-zinc-300 font-mono mt-0.5">Neurociência e Pedagogia Integradas.</p>
                </div>
              </div>
            </div>

            {/* Right Column Writing */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="bg-[#E63946]/10 text-[#E63946] font-mono text-xs font-bold py-1 px-3.5 rounded-full uppercase tracking-wider">
                Educação Lúdica de Verdade
              </span>
              
              <h3 className="font-serif text-3xl sm:text-4xl text-slate-900 font-black leading-tight">
                Criado por quem entende o foco infantil de perto.
              </h3>
              
              <p className="text-slate-800 font-medium italic text-base leading-relaxed">
                feito por psicopedagogos e especialistas em neurodesenvolvimento que lidam com a agitação e a falta de atenção de crianças reais todos os dias.
              </p>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  Reunimos mais de 20 anos de experiência com comportamento infantil, dentro e fora do ambiente terapêutico.
                </p>
                <p>
                  Mas esse laboratório nasceu de uma preocupação real: ver crianças reféns das telas e mães exaustas, sem saber como resgatar a concentração e a calmaria dos seus filhos.
                </p>
                <p>
                  Unimos neurociência e prática para criar algo simples: um portal de projetos sensoriais que ajudam a criança a desacelerar, persistir e aprender a focar de verdade.
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* SECTION 9: REVIEWS & TESTIMONIALS (AUTOMATIC VISUAL CAROUSEL) */}
        <section id="depoimentos-secao" className="py-20 border-t border-orange-100 bg-[#FCFAF7]">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 px-4">
            <span className="bg-amber-100 text-amber-800 text-[11px] font-bold font-mono py-1.5 px-3.5 rounded-full uppercase tracking-wider">
              💬 Relatos de Transformação Real
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-extrabold leading-tight">
              Mensagens de mães após começarem o Laboratório
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Não é só tirar da tela. É aproximar a família, ver o filho calmo, orgulhoso e entusiasmado com as próprias criações em casa. Veja alguns relatos reais do nosso WhatsApp:
            </p>
          </div>

          <div 
            id="depoimentos-carousel-container"
            className="w-full max-w-6xl mx-auto px-4 relative group"
            onMouseEnter={() => setIsHoveredTestimonial(true)}
            onMouseLeave={() => setIsHoveredTestimonial(false)}
          >
            {/* Main Carousel Display Box (NO MOLDURA, TRANSPARENT CONTAINER & HIGH DENSITY SCALE) */}
            <div className="relative overflow-hidden flex items-center justify-center h-[420px] sm:h-[540px] md:h-[640px] bg-transparent">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeTestimonialIdx}
                  src={testimonialImages[activeTestimonialIdx]}
                  alt={`História de sucesso e depoimento real ${activeTestimonialIdx + 1}`}
                  referrerPolicy="no-referrer"
                  className="h-full w-auto max-w-full object-contain select-none"
                  initial={{ opacity: 0, x: 50, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </AnimatePresence>

              {/* Navigation overlays - absolute positioned over container edges */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-2 sm:px-6 pointer-events-none z-10">
                {/* Arrow navigation left */}
                <button
                  id="btn-depoimento-anterior"
                  onClick={(e) => {
                    e.stopPropagation();
                    const total = testimonialImages.length;
                    setActiveTestimonialIdx((prev) => (prev - 1 + total) % total);
                  }}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/95 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center border border-white/20 active:scale-95 transition-all cursor-pointer shadow-xl pointer-events-auto"
                  title="Depoimento Anterior"
                >
                  <ChevronRight className="w-5.5 h-5.5 sm:w-6 sm:h-6 rotate-180" />
                </button>

                {/* Arrow navigation right */}
                <button
                  id="btn-depoimento-proximo"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTestimonialIdx((prev) => (prev + 1) % testimonialImages.length);
                  }}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/95 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center border border-white/20 active:scale-95 transition-all cursor-pointer shadow-xl pointer-events-auto"
                  title="Próximo Depoimento"
                >
                  <ChevronRight className="w-5.5 h-5.5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Progress markers - dot dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 justify-center bg-black/60 backdrop-blur-md py-2 px-3.5 rounded-full border border-white/10 z-10">
                {testimonialImages.map((_, idx) => (
                  <button
                    key={idx}
                    id={`dot-depoimento-${idx}`}
                    onClick={() => setActiveTestimonialIdx(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeTestimonialIdx === idx 
                        ? "bg-amber-400 w-5" 
                        : "bg-white/40 hover:bg-white w-2"
                    }`}
                    aria-label={`Ver depoimento ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Subtext info indicators */}
            <div className="text-center mt-4">
              <p className="text-xs text-slate-400 font-mono flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Autoplay ativo • Pausa ao passar o mouse • Depoimento {activeTestimonialIdx + 1} de {testimonialImages.length}
              </p>
            </div>

            <div className="flex justify-center mt-12 px-4">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToPlans}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-black text-center text-lg md:text-xl font-extrabold py-4 px-8 md:px-10 rounded-2xl shadow-lg shadow-amber-300/30 transition-all uppercase tracking-wide cursor-pointer w-full md:w-auto flex items-center justify-center gap-3 border-b-4 border-amber-750 font-sans"
              >
                VER PLANOS DISPONÍVEIS
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </section>


        {/* SECTION 10: É PRA VOCÊ / NÃO É PRA VOCÊ */}
        <section className="py-20 border-t border-orange-100 max-w-5xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-extrabold leading-tight">
              Esse Laboratório é para a sua família?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Column A: É PARA SEU FILHO SE */}
            <div className="bg-[#FFF8F8] border border-red-100 p-8 md:p-10 rounded-3xl space-y-6 shadow-xs">
              <h3 className="font-serif text-xl sm:text-2xl text-red-950 font-extrabold uppercase tracking-wide flex items-center gap-2 leading-tight">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-sm">🔴</span>
                É PARA SEU FILHO SE:
              </h3>
              
              <div className="space-y-4 text-sm text-slate-800 font-semibold leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">🔴</span>
                  <span>Ele mostra sinais de hiperatividade, agitação ou ansiedade</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">🔴</span>
                  <span>Tem diagnóstico ou forte suspeita de TDAH e TEA</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">🔴</span>
                  <span>Fica agressivo ou chora muito na hora de largar o celular</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">🔴</span>
                  <span>Tem entre 4 e 12 anos e precisa treinar a paciência</span>
                </div>
              </div>
            </div>

            {/* Column B: NÃO É PARA SEU FILHO SE */}
            <div className="bg-[#F4F9FF] border border-blue-100 p-8 md:p-10 rounded-3xl space-y-6 shadow-xs">
              <h3 className="font-serif text-xl sm:text-2xl text-blue-950 font-extrabold uppercase tracking-wide flex items-center gap-2 leading-tight">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm">🔵</span>
                NÃO É PARA SEU FILHO SE:
              </h3>
              
              <div className="space-y-4 text-sm text-slate-800 font-semibold leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">🔵</span>
                  <span>Você acha que desenhos &quot;educativos&quot; resolvem o foco dele</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">🔵</span>
                  <span>Você quer um milagre sem dar papelão e tesoura para ele</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">🔵</span>
                  <span>Você está atrás de apostilas teóricas de caligrafia e escrita</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">🔵</span>
                  <span>Você prefere o celular para não ter um pingo de papel recortado na mesa</span>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* SECTION 11: AVISO DE LOTE LIMITADO */}
        <section className="py-16 bg-[#FFFBF0] border-y border-amber-200 px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border-4 border-[#F59E0B]/30 relative overflow-hidden">
            {/* Scarcity alert tape */}
            <div className="absolute top-0 right-0 left-0 bg-[#EA580C] text-white text-center py-2 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              ⚠️ VAGAS ALTAMENTE LIMITADAS ESTE MÊS ⚠️
            </div>

            <div className="pt-6 space-y-8">
              {/* Main Headline Block */}
              <div className="text-center space-y-4">
                <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-xs font-bold py-1.5 px-4 rounded-full border border-red-200 animate-pulse">
                  ⚠️ AVISO: LOTE LIMITADO ⚠️
                </span>
                
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-900 font-extrabold leading-tight col-black">
                  Restam apenas 17 vagas com desconto de lançamento!
                </h2>
                
                <p className="text-slate-800 font-serif font-bold text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                  Garanta o foco do seu filho antes que o preço mude nas próximas horas.
                </p>

                {/* Progress bar for urgency */}
                <div className="max-w-md mx-auto pt-2">
                  <div className="flex justify-between text-xs font-mono font-bold text-slate-500 mb-1">
                    <span>Inscrições no Lote Atual</span>
                    <span className="text-amber-600">83% Preenchido (17 de 100 vagas)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3.5 p-0.5 border border-slate-200">
                    <div className="bg-gradient-to-r from-amber-500 to-red-500 h-2 rounded-full animate-pulse" style={{ width: '83%' }}></div>
                  </div>
                </div>
              </div>

              {/* Informative grid points matching user's copy */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                
                {/* Point 1 */}
                <div className="flex gap-4 p-5 rounded-2xl bg-stone-50/50 border border-stone-100 hover:shadow-xs transition-shadow">
                  <div className="text-2xl mt-0.5 select-none">⏳</div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">Pouco tempo:</h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                      Lote promocional pode encerrar a qualquer momento.
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="flex gap-4 p-5 rounded-2xl bg-stone-50/50 border border-stone-100 hover:shadow-xs transition-shadow">
                  <div className="text-2xl mt-0.5 select-none">🚫</div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">Valor Protegido:</h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                      Preço de R$ 29,90 não será mantido por muito tempo.
                    </p>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="flex gap-4 p-5 rounded-2xl bg-stone-50/50 border border-stone-100 hover:shadow-xs transition-shadow">
                  <div className="text-2xl mt-0.5 select-none">🔥</div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">Alta Procura:</h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                      Centenas de mães garantindo o acesso agora.
                    </p>
                  </div>
                </div>

              </div>
              
            </div>
          </div>
        </section>


        {/* SECTION 12: PRICING CARDS - ESCOLHA SEU ACESSO ALINHADO */}
        <section id="planos-secao" className="py-20 border-t border-orange-100 px-4">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-extrabold leading-tight">
              Escolha o nível de acesso ao Laboratório do Foco
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Por menos do que o preço de um doce ou de um brinquedo de plástico que vai quebrar em dois dias, você garante uma ferramenta de transformação comportamental e foco para o seu filho.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            
            {PRICING_TIERS.map((tier) => {
              return (
                <div 
                  key={tier.id} 
                  id={`price_tier_${tier.id}`}
                  className={`relative flex flex-col justify-between rounded-3xl transition-all duration-300 p-6 md:p-8 ${
                    tier.highlighted 
                      ? "bg-[#FFFDF9] border-[4px] border-[#F59E0B] shadow-xl hover:shadow-2xl z-10 scale-100 hover:scale-101" 
                      : "bg-[#FFFDF9] border-2 border-stone-200 hover:border-stone-300 shadow-md flex-1"
                  }`}
                >
                  {/* Top-banner dynamic header for highlighted tier */}
                  {tier.highlighted && (
                    <div className="absolute top-0 inset-x-0 transform -translate-y-1/2 bg-[#F59E0B] text-black text-center text-[10px] font-mono font-black py-1.5 px-4 rounded-full max-w-xs mx-auto uppercase tracking-wide shadow-sm">
                      {tier.badge}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="text-center pb-6 border-b border-stone-100">
                      {tier.id === "basico" ? (
                        <p className="text-2xl font-black text-black uppercase tracking-wide">Plano Básico</p>
                      ) : (
                        <p className="text-xs font-mono font-extrabold text-stone-500 uppercase tracking-widest">{tier.name}</p>
                      )}
                      
                      {tier.originalPrice ? (
                        <div className="space-y-2 mt-3 text-center">
                          {/* Super balloon showing discount */}
                          <div className="flex flex-wrap items-center justify-center gap-2">
                            <div className="inline-flex items-center gap-1 bg-red-600 text-white font-sans font-extrabold text-[11px] py-1 px-3 rounded-full shadow-md animate-pulse">
                              🔥 85% OFF
                            </div>
                          </div>
                          
                          <p className="text-xs font-mono text-stone-500">
                            De <span className="font-bold text-black line-through decoration-red-600 decoration-2">R$ 197,00</span> por apenas
                          </p>
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-stone-500 text-sm font-mono self-start mt-2">R$</span>
                            <span className="font-serif text-5xl md:text-6xl font-black text-slate-900 tracking-tight">{tier.price}</span>
                            <span className="font-serif text-3xl text-slate-900 font-bold self-end mb-1.5">{tier.cents}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1 mt-4">
                          <span className="text-stone-500 text-sm font-mono self-start mt-2">R$</span>
                          <span className="font-serif text-5xl md:text-6xl font-black text-slate-900 tracking-tight">{tier.price}</span>
                          <span className="font-serif text-3xl text-slate-900 font-bold self-end mb-1.5">{tier.cents}</span>
                        </div>
                      )}
                      
                      <p className="text-xs font-medium text-slate-500 mt-2 font-mono">
                        ({tier.installments})
                      </p>
                      <p className="text-xs text-black font-extrabold italic leading-snug mt-3">
                        &quot;{tier.subtitle}&quot;
                      </p>
                    </div>

                    <div className="space-y-4">
                      <p className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">O QUE ESTÁ INCLUÍDO:</p>
                      
                      <div className="space-y-2.5">
                        {tier.features.map((feat, idx) => {
                          const hasEmoji = feat.startsWith("✅") || feat.startsWith("❌");
                          return (
                            <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                              {!hasEmoji && <Check className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />}
                              <span>{feat}</span>
                            </div>
                          );
                        })}
                      </div>

                      {tier.nonFeatures && tier.nonFeatures.length > 0 && (
                        <div className="space-y-2.5 pt-4 border-t border-stone-100">
                          <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">NÃO INCLUÍDO NESTE PLANO:</p>
                          {tier.nonFeatures.map((nfeat, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-400">
                              <X className="w-4.5 h-4.5 text-red-500 flex-shrink-0 mt-0.5" />
                              <span>{nfeat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-8">
                    {tier.id === "genio" ? (
                      <motion.a
                        id={`pricing_cta_button_${tier.id}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://pay.wiapy.com/Zro0E0P0bQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block py-4 rounded-xl text-sm font-black uppercase tracking-wider shadow-md transition-all border-b-4 cursor-pointer text-center no-underline bg-emerald-600 border-emerald-800 text-white hover:bg-emerald-700 hover:border-emerald-900 animate-pulse"
                      >
                        quero o plano completo
                      </motion.a>
                    ) : (
                      <motion.button
                        id={`pricing_cta_button_${tier.id}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOpenCheckout(tier.id)}
                        className="w-full py-4 rounded-xl text-sm font-black uppercase tracking-wider shadow-md transition-all border-b-4 cursor-pointer text-center bg-emerald-600 border-emerald-800 text-white hover:bg-emerald-700 hover:border-emerald-900"
                      >
                        quero o plano basico
                      </motion.button>
                    )}
                  </div>

                </div>
              );
            })}

          </div>
        </section>


        {/* SECTION 13: WARRANTY DISPLAY */}
        <section className="py-16 max-w-4xl mx-auto px-4">
          <div className="bg-[#991B1B] text-white rounded-[2.5rem] p-8 md:p-12 border-4 border-[#7F1D1D] shadow-xl text-center space-y-6 relative overflow-hidden">
            
            {/* Visual shield badge */}
            <div className="mx-auto w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20 shadow-md">
              <ShieldCheck className="w-10 h-10 text-[#F59E0B]" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold max-w-2xl mx-auto leading-tight uppercase tracking-wider">
              Risco Zero: 7 Dias de Garantia Incondicional
            </h3>
            
            <p className="text-[#FEE2E2] text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-medium">
              Faça a inscrição no plano escolhido agora e entre no portal. Se na primeira semana o seu filho não se concentrar e esquecer o tablet para montar pelo menos uma atividade, ou se você não notar uma melhora na paciência e na calmaria dentro de casa, mande um único e-mail para o nosso suporte. Devolvemos cada centavo do seu dinheiro. Sem perguntas, sem burocracia. O risco é todo nosso.
            </p>

            <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-white/5 blur-xl"></div>
          </div>
        </section>


        {/* SECTION 14: FAQ ACCORDION DISPLAY */}
        <section className="py-20 border-t border-orange-100 max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-bold tracking-tight">
              Perguntas Frequentes — Tirando Dúvidas
            </h2>
            <p className="text-slate-600 text-sm">
              Mais alguma dúvida residual antes de libertar o espírito inovador do seu filho?
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  id={`faq_accordion_item_${idx}`}
                  className="bg-[#FFFDF9] border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:border-[#EDDFC3] transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left py-4.5 px-6 flex justify-between items-center bg-[#FFFDF9] hover:bg-stone-50 cursor-pointer transition-colors"
                  >
                    <span className="font-serif font-bold text-slate-800 text-sm md:text-base">{item.question}</span>
                    <span className="text-stone-400 font-bold ml-2">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-stone-50 border-t border-stone-100 text-xs md:text-sm text-slate-600 leading-relaxed space-y-2">
                          <p>{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </div>


      {/* FOOTER AREA AND LAST CALL TO ACTION */}
      <footer className="bg-stone-950 text-white pt-20 pb-12 mt-20 border-t border-stone-900">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center space-y-12">
          
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="bg-amber-500 text-black font-mono text-[10px] font-black py-1 px-4 rounded-full uppercase tracking-widest">
              A decisão é sua
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-100 font-extrabold leading-tight">
              Hoje ele pode trocar mais uma noite de feeds rápidos por um projeto físico que ele nunca vai esquecer.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
              Garanta o acesso ao Mãos à Obra no valor promocional antes que as inscrições semestrais fechem temporariamente.
            </p>
          </div>

          <div className="pt-10 border-t border-stone-900 text-center text-zinc-500 text-xs font-mono space-y-4">
            <p className="text-stone-300 font-serif font-bold text-sm tracking-wide">
              © 2026 Laboratório Mãos à Obra • Todos os direitos reservados.
            </p>
            <p className="text-[10px] text-zinc-500 leading-relaxed max-w-4xl mx-auto">
              Este produto funciona como ferramenta de apoio lúdico e sensorial. Ele não substitui tratamentos médicos, terapias ocupacionais ou acompanhamento psicológico profissional. Os resultados variam de acordo com a rotina e dedicação da família.
            </p>
          </div>

        </div>
      </footer>


      {/* INTERACTIVE HIGH-FIDELITY CHECKOUT MODAL DRAWER */}
      <AnimatePresence>
        {checkoutModalOpen && selectedPlan && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-xl w-full border border-stone-200 flex flex-col justify-between max-h-[90vh]"
            >
              
              {/* Checkout Modal Header */}
              <div className="bg-stone-900 text-white py-4 px-6 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#F59E0B] uppercase">Checkout Seguro Mãos à Obra</span>
                  <h3 className="font-serif font-bold text-stone-100 text-base">Conclua o seu Acesso</h3>
                </div>
                <button 
                  onClick={() => setCheckoutModalOpen(false)}
                  className="text-stone-400 hover:text-white bg-white/10 p-2 rounded-full cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Dynamic steps of processing */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                
                {/* Step indicators */}
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                  <div className={`pb-2 border-b-2 font-bold ${purchaseStep === "form" ? "border-amber-500 text-slate-800" : "border-stone-250 text-slate-500"}`}>1. CADASTRO</div>
                  <div className={`pb-2 border-b-2 font-bold ${purchaseStep === "payment_details" ? "border-amber-500 text-slate-800" : "border-stone-250 text-slate-500"}`}>2. PAGAMENTO</div>
                  <div className={`pb-2 border-b-2 font-bold ${purchaseStep === "success" ? "border-amber-500 text-emerald-800" : "border-stone-250 text-slate-500"}`}>3. SUCESSO!</div>
                </div>

                {purchaseStep === "form" && (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    
                    {/* Selected Plan Details badge */}
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex justify-between items-center">
                      <div>
                        <p className="text-[9px] font-mono text-amber-800 tracking-wider">PLANO SELECIONADO</p>
                        <h4 className="font-serif font-black text-slate-900 text-lg uppercase tracking-wide">{selectedPlan.name}</h4>
                        <p className="text-xs text-slate-500">Acesso imediato de 1 ano + bônus</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-slate-400 text-xs line-through block font-bold">
                          R$ {selectedPlan.id === "super_1490" ? "29,90" : `${parseFloat(selectedPlan.price) + 21},90`}
                        </span>
                        <span className="font-serif font-black text-2xl text-slate-900">R$ {selectedPlan.price}{selectedPlan.cents}</span>
                      </div>
                    </div>

                    <div className="space-y-3.5 pt-2">
                      <div>
                        <label className="block text-xs font-mono text-slate-500 font-bold uppercase mb-1">Seu Nome Completo:</label>
                        <input 
                          type="text" 
                          required
                          value={checkoutName}
                          onChange={(e) => setCheckoutName(e.target.value)}
                          placeholder="Ex: Maria Oliveira Santos"
                          className="w-full text-sm py-3 px-4 rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-mono text-slate-500 font-bold uppercase mb-1">E-mail para Acesso (Onde você vai receber seu login):</label>
                        <input 
                          type="email" 
                          required
                          value={checkoutEmail}
                          onChange={(e) => setCheckoutEmail(e.target.value)}
                          placeholder="Ex: maria@provedor.com"
                          className="w-full text-sm py-3 px-4 rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-500 font-bold uppercase mb-1">WhatsApp para Notificações urgentes:</label>
                        <input 
                          type="tel" 
                          required
                          value={checkoutPhone}
                          onChange={(e) => setCheckoutPhone(e.target.value)}
                          placeholder="Ex: (11) 98765-4321"
                          className="w-full text-sm py-3 px-4 rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Promocode expander */}
                    <div className="pt-2">
                      {promoApplied ? (
                        <p className="text-xs text-emerald-700 font-bold font-mono">✓ Cupom 'MAKER10' aplicado! Desconto de R$ {discountAmount.toFixed(2)}</p>
                      ) : (
                        <div className="flex gap-2 items-center">
                          <input 
                            type="text" 
                            placeholder="Tem cupom? Digite MAKER10" 
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="text-xs border border-stone-200 bg-stone-50 py-2 px-3 rounded-lg flex-1 outline-hidden"
                          />
                          <button 
                            type="button" 
                            onClick={handleApplyPromo}
                            className="bg-stone-900 text-white text-xs py-2 px-4 rounded-lg font-mono font-bold cursor-pointer"
                          >
                            Aplicar
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit"
                        className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-black py-4 rounded-xl font-black uppercase text-sm tracking-widest cursor-pointer border-b-4 border-amber-700 flex items-center justify-center gap-2"
                      >
                        Ir para Pagamento
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>

                  </form>
                )}


                {purchaseStep === "processing" && (
                  <div className="py-12 flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-serif font-black text-slate-800 text-lg">Processando Dados Seguros...</p>
                    <p className="text-xs text-stone-500 font-mono">Por favor, não feche esta página ou recarregue.</p>
                  </div>
                )}


                {purchaseStep === "payment_details" && (
                  <div className="space-y-6 text-left">
                    
                    {/* Payment methods picker */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setPaymentMethod("pix")}
                        className={`py-3.5 rounded-xl border flex items-center justify-center gap-2 font-mono text-xs uppercase cursor-pointer ${
                          paymentMethod === "pix" 
                            ? "bg-stone-900 border-stone-900 text-white font-bold shadow-xs"
                            : "bg-stone-50 border-stone-205 text-slate-600 hover:bg-stone-100"
                        }`}
                      >
                        <QrCode className="w-4 h-4 text-[#F59E0B]" />
                        Pix (Envio Imediato)
                      </button>

                      <button
                        onClick={() => setPaymentMethod("card")}
                        className={`py-3.5 rounded-xl border flex items-center justify-center gap-2 font-mono text-xs uppercase cursor-pointer ${
                          paymentMethod === "card" 
                            ? "bg-stone-900 border-stone-900 text-white font-bold shadow-xs"
                            : "bg-stone-50 border-stone-205 text-slate-600 hover:bg-stone-100"
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-emerald-500" />
                        Cartão de Crédito
                      </button>
                    </div>

                    {paymentMethod === "pix" ? (
                      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4 text-center">
                        <div className="mx-auto w-36 h-36 bg-white border border-stone-200 rounded-xl p-2 flex items-center justify-center">
                          {/* Real looking styling for simulated QR code */}
                          <div className="relative w-full h-full p-2 bg-slate-900 rounded flex flex-col items-center justify-center text-white text-[11px]">
                            <QrCode className="w-16 h-16 text-[#F59E0B] absolute" />
                            <div className="w-full bg-[#1F2C34] text-white py-1 px-2.5 rounded-sm absolute bottom-1 text-[8px] tracking-wide font-mono z-15 font-bold uppercase">
                              Pix Garantido
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5 font-mono">
                          <p className="text-[10px] text-stone-500 uppercase tracking-widest font-black">VALOR TOTAL COM DESCONTO:</p>
                          <p className="text-3xl font-serif text-slate-900 font-extrabold">R$ {(parseFloat(selectedPlan.price) - discountAmount).toFixed(2).replace(".", ",")}</p>
                        </div>

                        <div className="p-3 bg-white border border-stone-200 rounded-xl text-left">
                          <p className="text-[10px] font-mono text-stone-500 uppercase tracking-wide">Código Copia e Cola Pix:</p>
                          <div className="flex gap-2 items-center justify-between text-xs mt-1.5 font-mono">
                            <span className="truncate flex-1 select-all font-bold bg-stone-50 px-2 py-1 rounded text-stone-500 text-[11px]">
                              00020101021126580014br.gov.bcb.pix...134343166165
                            </span>
                            <button 
                              onClick={handleCopyPix}
                              className="bg-amber-500 hover:bg-[#F59E0B] text-black rounded px-3 py-1 font-bold cursor-pointer transition-colors flex items-center gap-1 shrink-0"
                            >
                              {isCopiedPix ? "Copiado!" : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        <p className="text-[10px] text-zinc-500 font-mono">⚠️ Pague no app do seu banco e receba o login no email <strong>{checkoutEmail}</strong> em 2 minutinhos.</p>
                      </div>
                    ) : (
                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="block text-xs font-mono text-slate-500 font-bold uppercase mb-1">Nome impresso no Cartão:</label>
                          <input 
                            type="text" 
                            required
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="Ex: MARIA O SANTOS"
                            className="w-full text-sm py-3 px-4 rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-500 font-bold uppercase mb-1">Número do Cartão de Crédito:</label>
                          <input 
                            type="text" 
                            required
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4532 1198 2234 4598"
                            className="w-full text-sm py-3 px-4 rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-mono text-slate-500 font-bold uppercase mb-1">Data Expirar:</label>
                            <input 
                              type="text" 
                              required
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/AA"
                              className="w-full text-sm py-3 px-4 rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:border-amber-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono text-slate-500 font-bold uppercase mb-1">Código CVV:</label>
                            <input 
                              type="text" 
                              required
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="123"
                              className="w-full text-sm py-3 px-4 rounded-xl border border-stone-200 bg-stone-50 focus:outline-hidden focus:border-amber-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-4">
                      <button 
                        onClick={handleFinishPayment}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-black uppercase text-sm tracking-widest cursor-pointer border-b-4 border-emerald-900 flex items-center justify-center gap-1"
                      >
                        Confirmar Pagamento Seguro
                        <Lock className="w-4 h-4 ml-1 text-[#F59E0B]" />
                      </button>
                    </div>

                  </div>
                )}


                {purchaseStep === "success" && (
                  <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <PartyPopper className="w-8 h-8 text-emerald-600" />
                    </div>
                    
                    <h4 className="font-serif font-black text-slate-900 text-2xl uppercase tracking-wider">
                      Parabéns, {checkoutName}! 🎉
                    </h4>
                    
                    <p className="text-slate-700 text-sm max-w-sm">
                      Seu acesso ao <strong>{selectedPlan.name}</strong> foi ativado com absoluto sucesso!
                    </p>

                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 inline-block text-left text-xs text-emerald-800 space-y-1.5 font-medium max-w-sm">
                      <p>✓ Um e-mail com as instruções de login foi enviado para: <strong>{checkoutEmail}</strong>.</p>
                      <p>✓ Aceleramos seu cadastro na área de membros de vídeo-tutoriais.</p>
                      <p>✓ Seus 7 bônus grátis já estão liberados dentro do seu painel.</p>
                    </div>

                    <p className="text-[10px] text-zinc-500 font-mono">Dúvidas? Entre em contato agora com nosso atendimento 24h.</p>
                    
                    <div className="pt-4">
                      <button 
                        onClick={() => setCheckoutModalOpen(false)}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-widest py-3 px-6 rounded-xl cursor-pointer"
                      >
                        Ir para Minha Área de Membros
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SPECIAL UPGRADE DOWNSELL POPUP MODAL */}
      <AnimatePresence>
        {specialOfferModalOpen && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-[330px] sm:max-w-[380px] w-full border border-stone-100/85 flex flex-col justify-between my-auto relative"
            >
              {/* Header Title with Emoji Badge */}
              <div className="flex items-center justify-center gap-1.5 pt-6 px-4 sm:px-6 text-center">
                <h3 className="font-sans text-lg sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                  OFERTA ESPECIAL
                </h3>
                <div className="bg-[#FFF4E6] p-1.5 sm:p-2 rounded-xl inline-flex items-center justify-center shrink-0">
                  <span className="text-base sm:text-lg leading-none">🔥</span>
                </div>
              </div>

              {/* Tagline Subtext */}
              <div className="px-4 sm:px-6 text-center text-slate-600 font-medium text-xs sm:text-sm leading-normal mt-2.5">
                Leve o Pacote Completo por <strong className="text-emerald-500 font-black text-[#12B886]">R$ 14,90</strong>
                <span className="block text-slate-700 font-semibold mt-0.5">com todos os bônus incluso</span>
              </div>

              {/* Bonus Card */}
              <div className="mx-4 sm:mx-6 mt-3.5 p-3.5 sm:p-4 bg-[#FFF9F2] border border-[#FFE8CE] rounded-2xl text-left space-y-3">
                <div className="text-amber-600 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 font-sans">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  BÔNUS EXCLUSIVOS INCLUSOS:
                </div>

                <div className="space-y-2.5 text-[11px] sm:text-xs font-bold text-slate-800 leading-snug">
                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full border border-emerald-500 bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3.5px]" />
                    </div>
                    <span>+500 projetos de estímulo psicomotor</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full border border-emerald-500 bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3.5px]" />
                    </div>
                    <span>Ala de brinquedos mecânicos para foco e exploração</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full border border-emerald-500 bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3.5px]" />
                    </div>
                    <span>Vídeo-tutoriais curtos para autonomia total da criança</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full border border-emerald-500 bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3.5px]" />
                    </div>
                    <span>Filtros por tempo, agitação e materiais</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full border border-emerald-500 bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3.5px]" />
                    </div>
                    <span>Acesso vitalício com atualizações mensais</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 sm:p-5 space-y-3">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://pay.wiapy.com/q6ecalqCjL"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSpecialOfferModalOpen(false)}
                  className="w-full bg-[#12B886] hover:bg-[#0ca678] text-white py-3 rounded-xl font-black uppercase text-[10px] sm:text-xs tracking-widest cursor-pointer shadow-lg shadow-emerald-500/10 flex items-center justify-center transition-colors border-none text-center no-underline"
                >
                  QUERO O PACOTE COMPLETO
                </motion.a>

                <a
                  href="https://pay.wiapy.com/LMurEp0eqf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSpecialOfferModalOpen(false)}
                  className="w-full text-slate-400 hover:text-slate-600 text-[10px] sm:text-xs font-black tracking-widest uppercase py-1 cursor-pointer bg-transparent border-none text-center no-underline block"
                >
                  QUERO A OFERTA DE 10
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <PurchaseNotification />

    </div>
  );
}
