import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import {
  Menu,
  X,
  Wrench,
  ShieldCheck,
  Zap,
  MapPin,
  Phone,
  Clock,
  ChevronRight,
  Star,
  Cpu,
  Droplets,
  Settings,
  Send,
  Loader2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.clearScrollMemory();

// Set restoration as early as possible
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const BookingModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      service: Yup.string().required("Please select a service"),
      message: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setStatus(null);

      // EmailJS Configuration
      // Replace with your Service ID, Template ID, and Public Key from EmailJS.com
      const SERVICE_ID = "YOUR_SERVICE_ID";
      const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
      const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

      try {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: values.name,
            from_email: values.email,
            phone_number: values.phone,
            selected_service: values.service,
            message: values.message,
            to_name: "AJINKYA AUTOMOBILE",
          },
          PUBLIC_KEY,
        );
        setStatus("success");
        resetForm();
        setTimeout(() => {
          setStatus(null);
          onClose();
        }, 3000);
      } catch (error) {
        console.error("EmailJS Error:", error);
        setStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-white border border-black/10 p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh] gsap-reveal-modal">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-[#111111] uppercase tracking-tighter">
            Book Your Consultation
          </h2>
          <p className="text-[#666666] text-xs sm:text-sm mt-3 font-medium">
            Schedule a private session with our master engineers.
          </p>
        </div>

        {status === "success" && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 text-green-400 text-sm">
            Thank you! Your appointment request has been sent successfully.
          </div>
        )}

        {status === "error" && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
            Something went wrong. Please try again or call us directly.
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[9px] uppercase tracking-[0.2em] text-[#94a3b8] font-heading font-extrabold">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              {...formik.getFieldProps("name")}
              className={`w-full bg-charcoal border ${formik.touched.name && formik.errors.name ? "border-red-500" : "border-slate-200"} px-5 py-4 text-sm focus:border-gold outline-none transition-all text-[#0f172a] font-medium placeholder:text-slate-400`}
              placeholder="Ex: Alexander Pierce"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-[10px] uppercase tracking-tighter">
                {formik.errors.name}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-[0.2em] text-[#999999] font-heading font-bold">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                {...formik.getFieldProps("email")}
                className={`w-full bg-gray-50 border ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-black/10"} px-4 py-3 text-sm focus:border-gold outline-none transition-all text-black`}
                placeholder="john@example.com"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-[10px] uppercase tracking-tighter">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-[0.2em] text-[#999999] font-heading font-bold">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                {...formik.getFieldProps("phone")}
                className={`w-full bg-gray-50 border ${formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-black/10"} px-4 py-3 text-sm focus:border-gold outline-none transition-all text-black`}
                placeholder="+91 98XXX XXXXX"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500 text-[10px] uppercase tracking-tighter">
                  {formik.errors.phone}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] uppercase tracking-[0.2em] text-[#999999] font-heading font-bold">
              Select Service
            </label>
            <select
              name="service"
              {...formik.getFieldProps("service")}
              className={`w-full bg-gray-50 border ${formik.touched.service && formik.errors.service ? "border-red-500" : "border-black/10"} px-4 py-3 text-sm focus:border-gold outline-none transition-all appearance-none text-black`}
            >
              <option value="" disabled>
                Choose a service
              </option>
              <option value="On-Site Services">On-Site Services</option>
              <option value="Denting & Painting">Denting & Painting</option>
              <option value="Mechanical Repairs">Mechanical Repairs</option>
              <option value="Body Repairs">Body Repairs</option>
              <option value="Electrical Repairs">Electrical Repairs</option>
            </select>
            {formik.touched.service && formik.errors.service && (
              <div className="text-red-500 text-[10px] uppercase tracking-tighter">
                {formik.errors.service}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-[9px] uppercase tracking-[0.2em] text-[#94a3b8] font-heading font-extrabold">
              Message (Optional)
            </label>
            <textarea
              name="message"
              {...formik.getFieldProps("message")}
              rows="3"
              className="w-full bg-charcoal border border-slate-200 px-5 py-4 text-sm focus:border-gold outline-none transition-all resize-none text-[#0f172a] font-medium placeholder:text-slate-400"
              placeholder="Specific requirements for your vehicle..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0f172a] text-white font-bold uppercase tracking-[0.4em] py-5 flex items-center justify-center space-x-4 hover:bg-gold transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group shadow-2xl shadow-[#0f172a]/10"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span className="text-[10px]">Processing Request...</span>
              </>
            ) : (
              <>
                <span className="text-[10px]">Confirm Appointment</span>
                <Send
                  size={16}
                  className="group-hover:translate-x-2 transition-transform duration-500"
                />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const mainRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // useLayoutEffect runs before paint to ensure 0,0 start instantly
  useLayoutEffect(() => {
    // Disable smooth scroll temporarily to ensure an instant jump to top
    const originalScrollBehavior =
      document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    // Immediate scroll
    window.scrollTo(0, 0);

    // Restoration of scroll restoration just in case
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Set back behavior after a tick to allow the jump to happen instantly
    const timeoutId = setTimeout(() => {
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Snappier Hero Entrance
      gsap.from(".hero-element", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "expo.out",
      });

      // Hero Zoom
      gsap.to(".hero-bg", {
        scale: 1.1,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Batch reveals for snappier experience (especially for grids)
      ScrollTrigger.batch(".gsap-reveal", {
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            autoAlpha: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "expo.out",
            overwrite: true,
          }),
        start: "top 92%",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Showcase", href: "#showcase" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div
      ref={mainRef}
      className="min-h-screen bg-[#faf9f6] text-[#1a1c1e] selection:bg-gold selection:text-white font-body overflow-x-hidden"
    >
      {/* Booking Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div
            className="flex items-center space-x-4 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-12 h-12 flex items-center justify-center p-0.5 group-hover:scale-110 transition-transform duration-500">
              <img
                src="/logo.png"
                alt="Ajinkya Automobile Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl sm:text-2xl font-heading font-black tracking-tighter text-[#0f172a]">
              AJINKYA<span className="text-gold">AUTOMOBILE</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 text-xs sm:text-sm font-medium tracking-widest uppercase font-heading">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <button
              onClick={openBookingModal}
              className="px-8 py-3 bg-[#0f172a] text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gold hover:translate-y-[-2px] transition-all duration-300 font-heading shadow-md"
            >
              Book Appointment
            </button>
          </div>

          {/* Custom Animated Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-[100] w-10 h-10 flex flex-col justify-center items-center group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div
              className={`w-8 h-[2px] bg-black mb-1.5 transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[8px] bg-gold" : "group-hover:w-full"}`}
            />
            <div
              className={`w-8 h-[2px] bg-black mb-1.5 transition-all duration-300 ${isMenuOpen ? "opacity-0" : "group-hover:w-6"}`}
            />
            <div
              className={`w-8 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[8px] bg-gold" : "group-hover:w-full"}`}
            />
          </button>
        </div>

        {/* Immersive Mobile Menu Overlay - Side Slide for maximum reliability */}
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-[100dvh] bg-white/95 backdrop-blur-[40px] z-[90] flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"}`}
        >
          {/* Content container - strictly centered */}
          <div className="flex flex-col items-center justify-center space-y-10 w-full h-full">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-5xl font-heading font-extrabold uppercase tracking-tighter text-black hover:text-gold transition-all duration-500 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{
                  transitionDelay: `${isMenuOpen ? 250 + i * 100 : 0}ms`,
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div
              className={`transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: "550ms" }}
            >
              <button
                className="px-10 py-5 bg-gold text-white font-bold uppercase tracking-widest font-heading hover:bg-black transition-colors"
                onClick={() => {
                  setIsMenuOpen(false);
                  openBookingModal();
                }}
              >
                Book Appointment
              </button>
            </div>
          </div>

          <div className="pb-16 text-center">
            <div className="text-[#999999] text-[9px] tracking-[.4em] uppercase font-bold">
              AJINKYA AUTOMOBILE
            </div>
            <div className="text-[#cccccc] text-[8px] tracking-[.1em] uppercase mt-2 italic font-medium">
              Established 1998
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[100svh] flex items-center overflow-hidden hero-section pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/hero.png"
            alt="Ajinkya Automobile Premium Studio"
            fetchpriority="high"
            loading="eager"
            className="hero-bg w-full h-full object-cover opacity-100 transition-opacity duration-1000 scale-105 parallax-bg"
          />
          {/* Targeted Studio Lighting */}
          <div className="absolute inset-0 bg-linear-to-r from-premium-black/30 via-premium-black/10 to-transparent lg:w-[60%] opacity-100 z-0" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-premium-black/20 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-20 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
          {/* Main Content Area */}
          <div className="flex-1 lg:max-w-3xl text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black leading-relaxed mb-8 text-[#0f172a] tracking-tight py-8 overflow-visible relative">
              <span className="opacity-95 drop-shadow-sm bg-white/10 bg-drop-shadow-sm rounded-4xl px-2">
                THE ART OF
              </span>
              <span className="gold-gradient-text italic inline-block pr-8 uppercase drop-shadow-md">
                MASTERY
              </span>
            </h1>

            <p className="max-w-md mx-auto lg:mx-0 text-[#ffffff] text-lg sm:text-xl font-bold leading-relaxed mb-12 hero-element">
              Precision Engineering. Unmatched Elegance.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 hero-element justify-center lg:justify-start">
              <button
                onClick={openBookingModal}
                className="group px-12 py-6 bg-[#0f172a] text-white font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-6 hover:bg-gold transition-all duration-500 font-heading text-xs shadow-2xl"
              >
                <span>Initialize Service</span>
                <div className="w-8 h-[1px] bg-white opacity-40 group-hover:w-12 transition-all" />
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </button>
            </div>
          </div>

          {/* Status Indicator - Right Aligned on Desktop */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center space-x-4 bg-white/70 backdrop-blur-xl px-5 py-2.5 border border-white/80 animate-float hero-element shadow-xs">
              <span className="w-2.5 h-2.5 bg-gold animate-pulse rounded-full shadow-[0_0_10px_rgba(180,83,9,0.5)]" />
              <span className="text-[11px] uppercase tracking-[0.4em] font-heading font-black text-[#0f172a]">
                Accepting New Clients
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-20 sm:py-28 bg-[#f3f2ee] border-y border-[#1a1c1e]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {[
              { label: "Precision Builds", val: "250+" },
              { label: "Expert Engineers", val: "12" },
              { label: "Luxury Brands", val: "15" },
              { label: "Awards Won", val: "48" },
            ].map((stat, i) => (
              <div
                key={i}
                className="gsap-reveal text-center opacity-0 invisible"
              >
                <div className="text-4xl sm:text-5xl md:text-7xl font-heading font-black text-[#0f172a] mb-2 tracking-tighter italic">
                  {stat.val}
                </div>
                <div className="text-[10px] sm:text-[12px] uppercase tracking-[0.3em] text-[#475569] font-heading font-black">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-10 sm:py-10 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 sm:mb-20">
            <h2 className="text-gold font-heading text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 gsap-reveal opacity-0 invisible">
              Our Expertise
            </h2>
            <h3 className="text-3xl sm:text-5xl md:text-7xl font-heading font-black text-[#0f172a] gsap-reveal opacity-0 invisible leading-none tracking-tighter uppercase">
              UNRIVALED <br className="hidden sm:block" /> SOLUTIONS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <ShieldCheck className="text-gold" size={32} />,
                title: "On Site Services",
                desc: "Company authorized dealership support and professional oil change services delivered directly to your location.",
              },
              {
                icon: <Droplets className="text-gold" size={32} />,
                title: "Denting & Painting",
                desc: "Expert car denting and high-end painting services to restore your vehicle's pristine factory finish.",
              },
              {
                icon: <Wrench className="text-gold" size={32} />,
                title: "Mechanical Repairs",
                desc: "Specialized mechanical troubleshooting including professional sunroof repair and system optimization.",
              },
              {
                icon: <Settings className="text-gold" size={32} />,
                title: "Body Repairs",
                desc: "Comprehensive bodywork restoration including expert car door repairs and structural integrity checks.",
              },
              {
                icon: <Zap className="text-gold" size={32} />,
                title: "Electrical Repairs",
                desc: "Advanced electrical diagnostics and premium car battery replacement to ensure peak electronic performance.",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="premium-card p-8 sm:p-10 flex flex-col items-start gsap-reveal opacity-0 invisible group"
              >
                <div className="mb-6 sm:mb-8 p-4 bg-gold/10 group-hover:bg-gold/20 transition-colors uppercase">
                  {service.icon}
                </div>
                <h4 className="text-xl sm:text-2xl font-heading font-bold mb-3 sm:mb-4">
                  {service.title}
                </h4>
                <p className="text-[#334155] font-medium leading-relaxed mb-8 sm:mb-10 text-sm sm:text-base flex-grow">
                  {service.desc}
                </p>
                <button className="flex items-center text-gold text-[11px] font-black uppercase tracking-[0.2em] group-hover:translate-x-3 transition-all duration-300 font-heading border-b-2 border-gold pb-1 leading-none">
                  View Detail <ChevronRight size={14} className="ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase / Experience Section */}
      {/* Showcase Section */}
      <section
        id="showcase"
        className="py-10 sm:py-20 bg-premium-black relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-20 sm:mb-32 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-5xl">
              <h2 className="text-gold font-heading text-xs sm:text-sm tracking-[0.6em] uppercase mb-6 gsap-reveal opacity-0 invisible font-black flex items-center">
                <span className="w-12 h-[1px] bg-gold mr-4" />
                Featured Portfolio
              </h2>
              <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-[#0f172a] gsap-reveal opacity-0 invisible leading-relaxed tracking-tight uppercase py-10 overflow-visible">
                THE SHOWCASE <br />
                <span className="gold-gradient-text italic inline-block pr-12">
                  COLLECTION
                </span>
              </h3>
            </div>
            <div className="lg:mb-4">
              <p className="text-[#0f172a]/50 font-heading text-[10px] uppercase tracking-[0.4em] font-black max-w-[200px] leading-relaxed gsap-reveal opacity-0 invisible">
                Automotive Excellence <br /> Defined Through <br /> Masterful
                Craft.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                img: "/assets/showcase1.png",
                title: "Obsidian Supercar",
                category: "Performance Tuning",
              },
              {
                img: "/assets/showcase2.png",
                title: "Heritage 911",
                category: "Restoration",
              },
              {
                img: "/assets/showcase3.png",
                title: "Phantom SUV",
                category: "Precision Detailing",
              },
              {
                img: "/assets/showcase4.png",
                title: "V12 Mastery",
                category: "Engine Rebuild",
              },
              {
                img: "/assets/showcase5.png",
                title: "Midnight Garage",
                category: "Luxury Storage",
              },
              {
                img: "/assets/showcase6.png",
                title: "Elite Showroom",
                category: "Concourse Prep",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative aspect-[4/5] overflow-hidden gsap-reveal opacity-0 invisible cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-0 group-hover:grayscale group-hover:scale-110 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-gold text-[10px] uppercase tracking-widest mb-2 font-heading">
                    {item.category}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-[#1e293b] text-sm sm:text-lg font-medium leading-relaxed mb-8 max-w-2xl mx-auto gsap-reveal opacity-0 invisible">
              Every project at Ajinkya Automobile is treated as a masterpiece.
              Our engineers are artisans who specialize in the unique needs of
              premium, European and exotic automobiles worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Booking CTA Section */}
      <section className="relative py-10 sm:py-10 bg-premium-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="bg-[#0f172a] rounded-sm overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            <div className="flex-1 p-10 sm:p-20 flex flex-col justify-center">
              <h2 className="text-white text-4xl sm:text-6xl md:text-7xl font-heading font-black mb-8 leading-[1.1] tracking-tight py-2">
                READY TO <br />
                <span className="text-gold italic">ELEVATE</span> <br />
                YOUR DRIVE?
              </h2>
              <p className="text-white/60 text-lg sm:text-xl mb-12 font-medium max-w-md">
                Experience the standard of care your vehicle deserves. Our
                master technicians are ready for your consultation.
              </p>
              <button
                onClick={openBookingModal}
                className="group w-full sm:w-auto px-12 py-6 bg-gold text-white font-black uppercase tracking-[0.3em] hover:bg-white hover:text-[#0f172a] transition-all duration-500 font-heading text-xs shadow-2xl flex items-center justify-center space-x-6"
              >
                <span>Reserve Your Appointment</span>
                <div className="w-8 h-px bg-white group-hover:bg-[#0f172a] transition-all" />
              </button>
            </div>
            <div className="flex-1 lg:min-h-[600px] relative overflow-hidden group">
              <img
                src="/assets/showroom.png"
                alt="Ajinkya Elite Showroom"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-r from-[#0f172a] to-transparent hidden lg:block" />
              <div className="absolute inset-x-0 bottom-0 p-10 flex flex-col items-end">
                <div className="text-white text-[10px] uppercase tracking-[0.8em] font-heading font-black opacity-40 mb-2">
                  Member Service
                </div>
                <div className="text-gold text-2xl font-black italic tracking-tighter uppercase font-heading">
                  Ajinkya Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer
        id="contact"
        className="py-10 sm:py-10 bg-[#faf9f6] border-t border-[#1a1c1e]/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
          <div>
            <div className="flex items-center space-x-4 mb-6 sm:mb-8">
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Ajinkya Automobile Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-heading font-bold tracking-tighter block">
                AJINKYA<span className="text-gold">AUTOMOBILE</span>
              </span>
            </div>
            <p className="text-[#64748b] leading-relaxed text-sm max-w-sm mt-4 font-medium">
              Premium automotive solutions for discerning owners. Excellence is
              not an option, it's our baseline.
            </p>
          </div>
          <div className="space-y-8">
            <h5 className="text-[11px] font-heading font-extrabold uppercase tracking-[0.3em] text-[#0f172a]">
              Contact Us
            </h5>
            <div className="flex items-center space-x-5 text-[#475569]">
              <MapPin className="text-gold shrink-0 opacity-80" size={20} />
              <span className="text-xs sm:text-sm font-medium">
                Gala no.9, Shyam Engineering Works, IB Patel Rd, opp. Zydus, Jay
                Prakash Nagar, Goregaon East, Mumbai, Maharashtra 400063
              </span>
            </div>
            <div className="flex items-center space-x-5 text-[#475569]">
              <Phone className="text-gold shrink-0 opacity-80" size={20} />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-medium">
                  +91 7942690646
                </span>
                <span className="text-xs sm:text-sm font-medium">
                  +91 7738383822
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-5 text-[#475569]">
              <Clock className="text-gold shrink-0 opacity-80" size={20} />
              <span className="text-sm font-medium">Open 24/7</span>
            </div>
          </div>
          <div className="h-full flex flex-col">
            <h5 className="text-[11px] font-heading font-extrabold uppercase tracking-[0.3em] mb-8 text-[#0f172a]">
              Find Us
            </h5>
            <div className="w-full h-48 sm:h-full min-h-[180px] opacity-90 shadow-2xl shadow-black/5 hover:opacity-100 transition-all duration-1000 bg-white rounded-sm overflow-hidden border border-[#1a1c1e]/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2609.5958842779987!2d72.85287104707136!3d19.162201442923465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7574c6e7195%3A0x7d3d16c453a22793!2sAjinkya%20Automobile!5e0!3m2!1sen!2sin!4v1772993010477!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-10 flex flex-col md:flex-row justify-between items-center text-[#1a1c1e]/40 text-[9px] sm:text-[11px] uppercase tracking-[0.4em] gap-6 border-t border-[#1a1c1e]/5">
          <div>© 2026 Ajinkya Automobile. All rights reserved.</div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-gold/60 text-[8px] uppercase tracking-[0.5em] font-heading font-black">
              Designed & Developed By
            </span>
            <a
              href="https://www.linkedin.com/in/jaisilan-nadar-462646206/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0f172a] text-sm font-black uppercase tracking-widest hover:text-gold transition-all duration-700 font-heading flex items-center gap-2"
            >
              Jaisilan Nadar
            </a>
          </div>

          <div className="flex space-x-8 sm:space-x-12">
            <a href="#" className="hover:text-gold transition-colors font-bold">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold transition-colors font-bold">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
