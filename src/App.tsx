import { useEffect, useState } from 'react';
import { Code, Palette, Smartphone, Globe, Mail, Github, Linkedin, ExternalLink, ArrowRight, Star, Zap, Layers } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function GetInTouch() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('https://formspree.io/f/mqalzzww', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        setError('Failed to send message.');
      }
    } catch (err) {
      setError('Failed to send message.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-lg bg-gray-800/80 rounded-2xl p-8 shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Get in Touch</h2>
        {submitted ? (
          <div className="text-center text-green-400 text-lg font-semibold py-12">Thank you for reaching out! I'll get back to you soon.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-300" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-orange-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300" htmlFor="email">Mail ID</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-orange-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300" htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-orange-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300" htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-orange-400 focus:outline-none"
              />
            </div>
            {error && <div className="text-red-400 text-center">{error}</div>}
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Section highlighting logic
      const sections = [
        { id: 'home', offset: 0 },
        { id: 'skills', offset: document.getElementById('skills')?.offsetTop || 0 },
        { id: 'education', offset: document.getElementById('education')?.offsetTop || 0 },
        { id: 'projects', offset: document.getElementById('projects')?.offsetTop || 0 },
        { id: 'work', offset: document.getElementById('work')?.offsetTop || 0 },
        { id: 'contact', offset: document.getElementById('contact')?.offsetTop || 0 },
      ];
      const scrollPos = window.scrollY + 100; // 100px offset for navbar
      let current = 'home';
      for (let i = 0; i < sections.length; i++) {
        if (scrollPos >= sections[i].offset) {
          current = sections[i].id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Frontend Development",
      description: "E-Commerce application built using React.js and styled with CSS for a clean, responsive user interface. It features a dynamic product listing page, detailed product view, shopping cart, and order checkout flow. Redux is used for efficient state management, ensuring smooth updates across components. The UI is mobile-friendly and designed to offer a seamless shopping experience across all devices. Conditional rendering and route protection enhance user navigation and security. Overall, the frontend emphasizes usability, responsiveness, and a modern e-commerce experience.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Tailwind CSS", "JavaScript", "HTML", "CSS"],
      color: "from-orange-500 to-red-500",
      link: "https://freshmarkett.vercel.app/",
      github: "https://github.com/madhurmanoj/e-commerse"
    },
    {
      id: 2,
      title: "Smart Attendance System using Facial Recognition",
      category: "AI & Machine Learning",
      description: "The Smart Attendance System Using Facial Recognition is a full-stack project that automates attendance tracking through real-time face recognition. Built with Python (Flask) for the backend and HTML, CSS, JavaScript for the frontend, it uses OpenCV and the face\_recognition library to detect and identify faces via a webcam. Users can register their face data, and attendance is logged automatically with timestamps. An admin dashboard allows easy management of users and records. The system stores data securely using SQLite and provides a contactless, accurate solution for schools or offices. It showcases skills in AI integration, web development, and database management.",
      image: "https://as2.ftcdn.net/v2/jpg/14/50/55/37/1000_F_1450553776_c1PqBOStzt9q0qCcBV4GyqIIJ653LrUY.jpg",
      tech: ["Python", "Flask", "HTML", "CSS", "JavaScript", "OpenCV", "face_recognition"],
      color: "from-blue-500 to-purple-500",
      link: "",
      github: "https://github.com/madhurmanoj/Smart-Attendance-System-Using-Facial-Recognition"
    },
    {
      id: 3,
      title: "Expense Tracker",
      category: "Full Stack Development",
      description: "UPI Expense Tracker is a full-stack web application that enables users to manually track their UPI-based expenses across platforms like Google Pay, PhonePe, and Paytm. Built with React and Node.js, the app uses Supabase for real-time PostgreSQL database management and secure authentication. Users can add, edit, and delete transactions, assign categories, and analyze spending through an interactive dashboard with filters and charts. Supabase Auth handles user sign-up/login with JWT support. Additional features include CSV export, custom categories, and responsive design. This project demonstrates my expertise in building modern, secure, and scalable applications with real-time backend services.",
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Node.js", "Supabase", "Tailwind CSS"],
      color: "from-green-500 to-teal-500",
      link: "",
      github: "https://github.com/madhurmanoj/upi-expense-tracker"
    },
    {
      id: 4,
      title: "Calculator",
      category: "Frontend Development",
      description: "Calculator project is a straightforward yet essential web application designed to perform basic arithmetic operations. This project is ideal for developers who are looking to practice or demonstrate their skills in creating functional user interfaces with core web technologies.",
      image: "https://images.pexels.com/photos/8962440/pexels-photo-8962440.jpeg",
      tech: ["HTML", "CSS", "JavaScript"],
      color: "from-purple-500 to-pink-500",
      link: "https://calculator-madhurmanoj.vercel.app/",
      github: "https://github.com/madhurmanoj/Calculator"
    },
    {
      id: 5,
      title: "Tic-Tac-Toe",
      category: "Java Development",
      description: "Tic-Tac-Toe is a classic two-player game developed using HTML, CSS, and JavaScript. The project features a clean and interactive UI that allows two users to play turn-by-turn on a 3x3 grid. It includes win-condition checks, a game reset option, and visual highlights for the winning combination. Designed for simplicity and responsiveness, the game runs entirely on the client-side with no external dependencies. This project demonstrates my understanding of DOM manipulation, game logic implementation, and user interface design. It’s a great example of applying core JavaScript skills to build engaging and functional web-based games.",
      image: "https://images.pexels.com/photos/27115293/pexels-photo-27115293.jpeg",
      tech: ["Java", "Java Swing"],
      color: "from-green-500 to-teal-500",
      link: "",
      github: "https://github.com/madhurmanoj/Tic-Tac-Toe"
    },
  ];

  const skills = [
    { name: "React & Next.js", level: 95, icon: Code, color: "text-blue-400" },
    { name: "Node.js & Express", level: 90, icon: Globe, color: "text-green-400" },
    { name: "UI/UX Design", level: 88, icon: Palette, color: "text-purple-400" },
    { name: "Mobile Development", level: 85, icon: Smartphone, color: "text-orange-400" },
    { name: "Database Design", level: 92, icon: Layers, color: "text-teal-400" },
    { name: "DevOps & Cloud", level: 80, icon: Zap, color: "text-yellow-400" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/90 backdrop-blur border-b border-gray-800 shadow-sm">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="font-extrabold text-2xl tracking-widest bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent cursor-pointer" onClick={() => navigate('/')}>Madhur</div>
          <div className="hidden md:flex space-x-8 text-lg font-medium">
            <a href="#" className={`${activeSection === 'home' ? 'text-orange-400 font-bold' : 'hover:text-orange-400'} transition-colors duration-200`}>Home</a>
            <a href="#skills" className={`${activeSection === 'skills' ? 'text-blue-400 font-bold' : 'hover:text-blue-400'} transition-colors duration-200`}>Skills</a>
            <a href="#education" className={`${activeSection === 'education' ? 'text-purple-400 font-bold' : 'hover:text-purple-400'} transition-colors duration-200`}>Education</a>
            <a href="#projects" className={`${activeSection === 'projects' ? 'text-pink-400 font-bold' : 'hover:text-pink-400'} transition-colors duration-200`}>Projects</a>
            <a href="#work" className={`${activeSection === 'work' ? 'text-yellow-400 font-bold' : 'hover:text-yellow-400'} transition-colors duration-200`}>Work Experience</a>
            <a href="#contact" className={`${activeSection === 'contact' ? 'text-red-400 font-bold' : 'hover:text-red-400'} transition-colors duration-200`}>Contact</a>
          </div>
          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            {mobileNavOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
        {/* Mobile menu dropdown */}
        {mobileNavOpen && (
          <div className="md:hidden bg-gray-900/95 px-6 pb-4 pt-2 space-y-2 text-lg font-medium flex flex-col shadow-lg border-b border-gray-800 animate-fade-in-down">
            <a href="#" className="hover:text-orange-400 transition-colors duration-200" onClick={() => setMobileNavOpen(false)}>Home</a>
            <a href="#skills" className="hover:text-blue-400 transition-colors duration-200" onClick={() => setMobileNavOpen(false)}>Skills</a>
            <a href="#education" className="hover:text-purple-400 transition-colors duration-200" onClick={() => setMobileNavOpen(false)}>Education</a>
            <a href="#projects" className="hover:text-pink-400 transition-colors duration-200" onClick={() => setMobileNavOpen(false)}>Projects</a>
            <a href="#work" className="hover:text-yellow-400 transition-colors duration-200" onClick={() => setMobileNavOpen(false)}>Work Experience</a>
            <a href="#contact" className="hover:text-red-400 transition-colors duration-200" onClick={() => setMobileNavOpen(false)}>Contact</a>
          </div>
        )}
      </nav>
      {/* Add padding to main content to prevent it from being hidden behind navbar */}
      <div className="pt-20">
      {/* Grid Overlay */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,107,53,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,53,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center perspective-1000">
        <div className="container mx-auto px-6 z-10">
          <div className="text-center">
            {/* 3D Name */}
            <div className="relative mb-8">
              <h1 
                className="text-6xl md:text-8xl font-black tracking-wider transform-gpu"
                style={{
                  transform: `rotateX(${scrollY * 0.1}deg) rotateY(${mousePosition.x * 0.01}deg)`,
                  textShadow: '0 0 20px rgba(255,107,53,0.5), 0 0 40px rgba(255,107,53,0.3)',
                  background: 'linear-gradient(45deg, #FF6B35, #F7931E, #FFD23F)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                MADHUR
              </h1>
              <h1 
                className="text-6xl md:text-8xl font-black tracking-wider transform-gpu -mt-4"
                style={{
                  transform: `rotateX(${scrollY * -0.1}deg) rotateY(${mousePosition.x * -0.01}deg)`,
                  textShadow: '0 0 20px rgba(74,144,226,0.5), 0 0 40px rgba(74,144,226,0.3)',
                  background: 'linear-gradient(45deg, #4A90E2, #8B5CF6, #EC4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                MANOJ
              </h1>
            </div>

            {/* Subtitle */}
            <div className="mb-12">
              <p className="text-xl md:text-2xl text-gray-300 mb-4 transform transition-transform duration-300 hover:scale-105">
                Full Stack Developer & Designer
              </p>
              <div className="flex justify-center space-x-6">
                <span className="px-4 py-2 bg-orange-500/20 rounded-full text-orange-400 border border-orange-500/30">
                  Frontend Expert
                </span>
                <span className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-400 border border-blue-500/30">
                  Backend Architect
                </span>
                <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-400 border border-purple-500/30">
                  UI/UX Designer
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="relative flex justify-center">
              <a href="#projects" className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full font-semibold text-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/50">
                <span className="flex items-center space-x-2">
                  <span>View My Work</span>
                  <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-400 rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-3xl transform rotate-6 hover:rotate-12 transition-transform duration-500">
                  <div className="absolute inset-4 bg-gray-800 rounded-2xl flex items-center justify-center">
                    <div className="text-6xl">👨‍💻</div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Hi! I'm Madhur Manoj, a passionate full-stack developer and designer with over 5 years of experience creating digital experiences that matter. I specialize in building scalable web applications and crafting beautiful user interfaces.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  My expertise spans across modern frameworks like React and Node.js, cloud technologies, and design tools. I believe in the power of clean code, intuitive design, and collaborative development.
                </p>
                
                <div className="flex space-x-4">
                  <a href="https://github.com/madhurmanoj" className="p-3 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors duration-300">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://www.linkedin.com/in/madhur-manoj-00018417b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_apps" className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 transition-colors duration-300">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="mailto:madhurmanoj.umu.cse@gmail.com" className="p-3 bg-gray-800 rounded-full hover:bg-purple-500 transition-colors duration-300">
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {skills.map((skill) => (
              <div key={skill.name} className="group">
                <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 bg-gray-700 rounded-lg ${skill.color}`}>
                      <skill.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{skill.name}</h3>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400 mt-2 block">{skill.level}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Programming Languages Section */}
          <div className="max-w-4xl mx-auto mt-10">
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-4 text-blue-300">Programming Languages</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <span className="px-4 py-2 bg-blue-700/30 rounded-full text-blue-300 border border-blue-500/30 text-lg font-medium">C</span>
                <span className="px-4 py-2 bg-yellow-700/30 rounded-full text-yellow-300 border border-yellow-500/30 text-lg font-medium">Java</span>
                <span className="px-4 py-2 bg-yellow-500/30 rounded-full text-yellow-400 border border-yellow-500/30 text-lg font-medium">JavaScript</span>
                <span className="px-4 py-2 bg-green-700/30 rounded-full text-green-300 border border-green-500/30 text-lg font-medium">Python</span>
                <span className="px-4 py-2 bg-purple-700/30 rounded-full text-purple-300 border border-purple-500/30 text-lg font-medium">SQL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 relative bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
              <span className="inline-block align-middle mr-2">🎓</span>My <span className="text-green-400">Education</span>
            </span>
          </h2>
          <p className="text-center text-gray-400 mb-16">Academic achievements and continuous learning journey</p>
          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-12">
            {/* BTech */}
            <div className="w-full flex justify-center">
              <div className="inline-block bg-white/10 px-6 py-6 rounded-2xl shadow-lg border border-gray-700 w-full max-w-xl">
                <h3 className="text-2xl font-bold mb-2 text-purple-300">Bachelor of Technology in Computer Science</h3>
                <div className="flex items-center text-left justify-between mb-2">
                  <span className="text-sm text-gray-400">Usha Martin University, Ranchi</span>
                  <span className="ml-4 px-3 py-1 bg-purple-100/10 text-purple-400 rounded-full text-xs font-semibold">2022-2026</span>
                </div>
                <p className="text-gray-300 text-sm">Overall CGPA: 7.8</p>
              </div>
            </div>
            {/* Intermediate */}
            <div className="w-full flex justify-center">
              <div className="inline-block bg-white/10 px-6 py-6 rounded-2xl shadow-lg border border-gray-700 w-full max-w-xl">
                <h3 className="text-2xl font-bold mb-2 text-green-300">Intermediate[PCM]</h3>
                <div className="flex items-center text-left justify-between mb-2">
                  <span className="text-sm text-gray-400">Guru Gobind Singh Public School</span>
                  <span className="ml-4 px-3 py-1 bg-green-100/10 text-green-400 rounded-full text-xs font-semibold">2021-2022</span>
                </div>
                <p className="text-gray-300 text-sm">Board: Central Board of Secondary Education (CBSE)</p>
              </div>
            </div>
            {/* Matriculation */}
            <div className="w-full flex justify-center">
              <div className="inline-block bg-white/10 px-6 py-6 rounded-2xl shadow-lg border border-gray-700 w-full max-w-xl">
                <h3 className="text-2xl font-bold mb-2 text-purple-300">Matriculation</h3>
                <div className="flex items-center text-left justify-between mb-2">
                  <span className="text-sm text-gray-400">Saint Francis School, Banhora, Ranchi</span>
                  <span className="ml-4 px-3 py-1 bg-purple-100/10 text-purple-400 rounded-full text-xs font-semibold">2019-2020</span>
                </div>
                <p className="text-gray-300 text-sm">Board: Council for the Indian School Certificate Examinations (CISCE)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project) => (
              <div key={project.id} className="group perspective-1000">
                <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden transform transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-orange-500/20">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60 mix-blend-multiply`} />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {/* Project Links */}
                    <div className="flex items-center space-x-4 mt-2">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors duration-300 group"
                        >
                          <span>View Project</span>
                          <ExternalLink className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-gray-400 hover:text-white bg-gray-800 border border-gray-700 rounded-full px-3 py-1 transition-colors duration-300"
                          title="View on GitHub"
                        >
                          <Github className="w-5 h-5" />
                          <span className="hidden sm:inline">GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="work" className="py-24 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              <span className="inline-block align-middle mr-2">💼</span>Work Experience
            </span>
          </h2>
          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-12">
            {/* Experience 1 */}
            <div className="w-full flex justify-center">
              <div className="inline-block bg-white/10 px-6 py-6 rounded-2xl shadow-lg border border-gray-700 w-full max-w-xl">
                <h3 className="text-2xl font-bold mb-2 text-orange-300">Mern Stack Intern</h3>
                <div className="flex items-center text-left justify-between mb-2">
                  <span className="text-sm text-gray-400">DUCAT India</span>
                  <span className="ml-4 px-3 py-1 bg-orange-100/10 text-orange-400 rounded-full text-xs font-semibold">July 2025 - August 2025</span>
                </div>
                <p className="text-gray-300 text-sm">6 Weeks MERN Stack Internship. Developed and Maintained web applications that used MERN.</p>
              </div>
            </div>
            {/* Experience 2 */}
            <div className="w-full flex justify-center">
              <div className="inline-block bg-white/10 px-6 py-6 rounded-2xl shadow-lg border border-gray-700 w-full max-w-xl">
                <h3 className="text-2xl font-bold mb-2 text-yellow-300">Software Development Intern</h3>
                <div className="flex items-center text-left justify-between mb-2">
                  <span className="text-sm text-gray-400">Prodigy InfoTech</span>
                  <span className="ml-4 px-3 py-1 bg-yellow-100/10 text-yellow-400 rounded-full text-xs font-semibold">February 2025 - March 2025</span>
                </div>
                <p className="text-gray-300 text-sm">2 Months Internship in the field of Software Development. Developed and Maintained Scalable Software.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Let's Work Together
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Ready to bring your next project to life? I'm always excited to work on new challenges and create something amazing together.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="group">
                <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center justify-center">
                  <Mail className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p className="text-gray-400">madhurmanoj.umu.cse@gmail.com</p>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2">
                  <Linkedin className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">LinkedIn</h3>
                  <p className="text-gray-400">Madhur Manoj</p>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2">
                  <Github className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">GitHub</h3>
                  <p className="text-gray-400">github.com/madhurmanoj</p>
                </div>
              </div>
            </div>
            
            <button
              className="group px-12 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full font-semibold text-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/50"
              onClick={() => navigate('/get-in-touch')}
            >
              <span className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Get In Touch</span>
                <Star className="w-5 h-5 transform transition-transform group-hover:rotate-180" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              © 2025 Madhur Manoj. Crafted with passion and precision.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/madhurmanoj" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/madhur-manoj-00018417b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:madhurmanoj.umu.cse@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/get-in-touch" element={<GetInTouch />} />
      </Routes>
    </Router>
  );
}

export default App;
