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
            to_name: "Thomas Auto Garage",
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
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-charcoal border border-white/10 p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh] gsap-reveal-modal">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gold uppercase tracking-tight">
            Book Your Consultation
          </h2>
          <p className="text-gray-400 text-sm mt-2">
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
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-heading">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              {...formik.getFieldProps("name")}
              className={`w-full bg-premium-black border ${formik.touched.name && formik.errors.name ? "border-red-500" : "border-white/10"} px-4 py-3 text-sm focus:border-gold outline-none transition-all`}
              placeholder="John Doe"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-[10px] uppercase tracking-tighter">
                {formik.errors.name}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-heading">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                {...formik.getFieldProps("email")}
                className={`w-full bg-premium-black border ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-white/10"} px-4 py-3 text-sm focus:border-gold outline-none transition-all`}
                placeholder="john@example.com"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-[10px] uppercase tracking-tighter">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-heading">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                {...formik.getFieldProps("phone")}
                className={`w-full bg-premium-black border ${formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-white/10"} px-4 py-3 text-sm focus:border-gold outline-none transition-all`}
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
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-heading">
              Select Service
            </label>
            <select
              name="service"
              {...formik.getFieldProps("service")}
              className={`w-full bg-premium-black border ${formik.touched.service && formik.errors.service ? "border-red-500" : "border-white/10"} px-4 py-3 text-sm focus:border-gold outline-none transition-all appearance-none`}
            >
              <option value="" disabled>
                Choose a service
              </option>
              <option value="Precision Tuning">Precision Tuning</option>
              <option value="Engine Mastery">Engine Mastery</option>
              <option value="Elite Detailing">Elite Detailing</option>
              <option value="Periodic Maintenance">Periodic Maintenance</option>
            </select>
            {formik.touched.service && formik.errors.service && (
              <div className="text-red-500 text-[10px] uppercase tracking-tighter">
                {formik.errors.service}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-heading">
              Message (Optional)
            </label>
            <textarea
              name="message"
              {...formik.getFieldProps("message")}
              rows="3"
              className="w-full bg-premium-black border border-white/10 px-4 py-3 text-sm focus:border-gold outline-none transition-all resize-none"
              placeholder="Tell us about your vehicle..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gold text-black font-bold uppercase tracking-widest py-4 flex items-center justify-center space-x-3 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Confirm Booking</span>
                <Send
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
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
      className="min-h-screen bg-premium-black text-white selection:bg-gold selection:text-black font-body overflow-x-hidden"
    >
      {/* Booking Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-10 h-10 border border-gold/30 p-1.5 rounded-sm group-hover:border-gold transition-colors duration-500">
              <img
                src="/favicon.png"
                alt="Thomas Garage Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl sm:text-2xl font-heading font-bold tracking-tighter">
              THOMAS<span className="text-gold">GARAGE</span>
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
              className="px-6 py-2 border border-gold text-gold text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-300 font-heading"
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
              className={`w-8 h-[2px] bg-white mb-1.5 transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[8px] bg-gold" : "group-hover:w-full"}`}
            />
            <div
              className={`w-8 h-[2px] bg-white mb-1.5 transition-all duration-300 ${isMenuOpen ? "opacity-0" : "group-hover:w-6"}`}
            />
            <div
              className={`w-8 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[8px] bg-gold" : "group-hover:w-full"}`}
            />
          </button>
        </div>

        {/* Immersive Mobile Menu Overlay - Side Slide for maximum reliability */}
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-[100dvh] bg-charcoal/95 backdrop-blur-[40px] z-[90] flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"}`}
        >
          {/* Content container - strictly centered */}
          <div className="flex flex-col items-center justify-center space-y-10 w-full h-full">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-5xl font-heading font-extrabold uppercase tracking-tighter hover:text-gold transition-all duration-500 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
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
                className="px-10 py-5 bg-gold text-black font-bold uppercase tracking-widest font-heading hover:bg-white transition-colors"
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
            <div className="text-gray-500 text-[10px] tracking-[.4em] uppercase">
              Thomas Auto Garage
            </div>
            <div className="text-gray-700 text-[8px] tracking-[.1em] uppercase mt-2 italic">
              Established 1998
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[100svh] flex items-center overflow-hidden hero-section pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero.png"
            alt="Luxury Garage"
            className="hero-bg w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-premium-black via-transparent to-premium-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center sm:text-left">
          <h2 className="text-gold font-heading text-xs sm:text-lg tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 hero-element">
            Established 1998
          </h2>
          <h1 className="text-3xl sm:text-6xl md:text-8xl font-heading font-extrabold leading-[1.1] mb-6 sm:mb-8 hero-element">
            PRECISION <br className="hidden sm:block" />
            <span className="gold-gradient-text text-4xl sm:text-7xl md:text-9xl block sm:inline mt-2 sm:mt-0">
              PERFORMANCE
            </span>
          </h1>
          <p className="max-w-xl mx-auto sm:ml-0 text-gray-400 text-sm sm:text-lg md:text-xl font-light leading-relaxed mb-8 sm:mb-10 hero-element">
            The ultimate destination for luxury automotive care. Where obsessive
            engineering meets uncompromising craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 hero-element items-center sm:items-start">
            <button
              onClick={openBookingModal}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-gold text-black font-bold uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-white transition-all font-heading text-xs sm:text-sm"
            >
              <span>Explore Services</span>
              <ChevronRight size={18} />
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("showcase")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="w-full sm:w-auto px-8 sm:px-10 py-4 border border-white/20 hover:border-white transition-all font-bold uppercase tracking-widest font-heading text-xs sm:text-sm"
            >
              View Showcase
            </button>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 bg-charcoal">
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
                <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-gold mb-1 sm:mb-2">
                  {stat.val}
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-heading">
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
        className="py-20 sm:py-32 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 sm:mb-20">
            <h2 className="text-gold font-heading text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 gsap-reveal opacity-0 invisible">
              Our Expertise
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold gsap-reveal opacity-0 invisible leading-tight">
              UNRIVALED <br className="hidden sm:block" /> SOLUTIONS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Settings className="text-gold" size={32} />,
                title: "Precision Tuning",
                desc: "Optimizing electronic and mechanical systems for ultimate performance and efficiency.",
              },
              {
                icon: <Cpu className="text-gold" size={32} />,
                title: "Engine Mastery",
                desc: "Complete rebuilds and enhancements for high-performance units from the world's best.",
              },
              {
                icon: <Droplets className="text-gold" size={32} />,
                title: "Elite Detailing",
                desc: "Multi-stage correction and protection using advanced ceramic technologies.",
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
                <p className="text-gray-400 font-light leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base flex-grow">
                  {service.desc}
                </p>
                <button className="flex items-center text-gold text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform font-heading">
                  Learn More <ChevronRight size={14} className="ml-1" />
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
        className="py-20 sm:py-32 bg-charcoal relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 sm:mb-20 text-center lg:text-left">
            <h2 className="text-gold font-heading text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 gsap-reveal opacity-0 invisible">
              Masterpieces
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold gsap-reveal opacity-0 invisible leading-tight">
              THE SHOWCASE <br className="hidden sm:block" /> COLLECTION
            </h3>
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
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
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
            <p className="text-gray-400 text-sm sm:text-lg font-light leading-relaxed mb-8 max-w-2xl mx-auto gsap-reveal opacity-0 invisible">
              Every project at Thomas Garage is treated as a masterpiece. Our
              engineers are artisans who specialize in the unique needs of
              premium, European and exotic automobiles worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Booking CTA Section */}
      <section className="relative py-24 sm:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/showroom.png"
            alt="Showroom"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-premium-black/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 sm:mb-10 gsap-reveal opacity-0 invisible leading-tight">
            READY TO ELEVATE <br className="hidden sm:block" /> YOUR DRIVE?
          </h2>
          <p className="text-base sm:text-xl text-gray-400 mb-10 sm:mb-12 gsap-reveal opacity-0 invisible px-2">
            Experience the standard of care your vehicle deserves. Schedule a
            private consultation today.
          </p>
          <button
            onClick={openBookingModal}
            className="w-full sm:w-auto px-10 sm:px-12 py-4 sm:py-5 bg-white text-black font-bold uppercase tracking-widest hover:bg-gold transition-colors font-heading gsap-reveal opacity-0 invisible text-xs sm:text-sm"
          >
            Book My Service
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <footer
        id="contact"
        className="py-16 sm:py-20 bg-premium-black border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
          <div>
            <div className="flex items-center space-x-3 mb-6 sm:mb-8">
              <div className="w-8 h-8 border border-gold/30 p-1 rounded-sm">
                <img
                  src="/favicon.png"
                  alt="Thomas Garage Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-heading font-bold tracking-tighter block">
                THOMAS<span className="text-gold">GARAGE</span>
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed text-sm max-w-sm">
              Premium automotive solutions for discerning owners. Excellence is
              not an option, it's our baseline.
            </p>
          </div>
          <div className="space-y-6">
            <h5 className="text-sm font-heading font-bold uppercase tracking-[0.2em]">
              Contact Us
            </h5>
            <div className="flex items-center space-x-4 text-gray-400">
              <MapPin className="text-gold shrink-0" size={20} />
              <span className="text-xs sm:text-sm">
                Near Oberoi Mall, Goregaon East, Mumbai, MH, India
              </span>
            </div>
            <div className="flex items-center space-x-4 text-gray-400">
              <Phone className="text-gold shrink-0" size={20} />
              <span className="text-xs sm:text-sm">+91 9819712327</span>
            </div>
            <div className="flex items-center space-x-4 text-gray-400">
              <Clock className="text-gold shrink-0" size={20} />
              <span className="text-sm">Mon - Sat: 10:00 AM - 08:00 PM</span>
            </div>
          </div>
          <div className="h-full flex flex-col">
            <h5 className="text-sm font-heading font-bold uppercase tracking-[0.2em] mb-6">
              Find Us
            </h5>
            <div className="w-full h-48 sm:h-full min-h-[160px] grayscale invert opacity-30 hover:opacity-100 transition-all duration-700 bg-charcoal rounded-sm overflow-hidden border border-white/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.397194635674!2d72.85822147576579!3d19.177855348810332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b707bfffffff%3A0x6ac9c4fc7911bf6b!2sOberoi%20Mall!5e0!3m2!1sen!2sin!4v1709773200000!5m2!1sen!2sin"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 flex flex-col md:flex-row justify-between items-center text-gray-600 text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] gap-4">
          <div>© 2026 Thomas Auto Garage. All rights reserved.</div>
          <div className="flex space-x-6 sm:space-x-8">
            <a href="#" className="hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>

      {/* Enhanced Demo Watermark */}
      <div className="fixed bottom-6 right-6 z-[150] select-none pointer-events-none">
        <div className="bg-charcoal px-6 py-4 border-2 border-gold shadow-[0_0_20px_rgba(212,175,55,0.4)] pointer-events-auto cursor-default">
          <div className="flex flex-col items-end">
            <span className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-heading font-bold mb-1">
              Developed by
            </span>
            <a
              href="https://www.linkedin.com/in/jaisilan-nadar-462646206/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold text-lg font-extrabold uppercase tracking-widest font-heading mb-2 hover:text-white transition-colors cursor-pointer"
            >
              Jaisilan Nadar
            </a>
            <div className="h-[2px] w-full bg-gold/50 mb-2" />
            <span className="text-white text-[12px] font-extrabold tracking-widest uppercase font-heading">
              This is Just a Demo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
