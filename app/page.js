'use client'
// pages/index.js
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Icons
import { ArrowRight, CheckCircle, Star, Quote, ChevronRight, Mail } from 'lucide-react'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7,
        delay: custom * 0.1,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  }
  
  // Exemples de récits
  const stories = [
    {
      name: "Alice Bertrand",
      profession: "Coach sportive",
      tagline: "De burn-out à 5k€/mois",
      image: "/img/alice-profile.jpg",
      color: "from-teal-500 to-teal-400"
    },
    {
      name: "Ibrahim Moussa",
      profession: "Artiste digital",
      tagline: "J'ai vendu ma première toile à 3€, aujourd'hui elle vaut 1200€",
      image: "/img/ibra-profile.jpg",
      color: "from-indigo-500 to-indigo-400"
    },
    {
      name: "Karim Benali",
      profession: "Développeur freelance",
      tagline: "J'ai codé mon avenir tout seul",
      image: "/img/karim-profile.jpg",
      color: "from-rose-500 to-rose-400"
    }
  ]
  
  const testimonials = [
    {
      content: "Narrativ a transformé ma façon de me présenter aux clients. J'ai gagné 3 gros contrats grâce à mon histoire!",
      author: "Sophie L.",
      role: "Designer UX"
    },
    {
      content: "Avant, je galérais à expliquer mon parcours. Maintenant, mes clients comprennent ma vision et mes valeurs.",
      author: "Thomas M.",
      role: "Photographe"
    },
    {
      content: "Un lien vers mon Narrativ dans ma signature email a boosté mon taux de conversion de 22%!",
      author: "Léa K.",
      role: "Consultante SEO"
    }
  ]

  return (
    <>
      <Head>
        <title>Narrativ | Ta réussite mérite d'être racontée</title>
        <meta name="description" content="Narrativ - La plateforme où les freelancers transforment leur parcours en force" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <header className={`fixed top-0 left-0 w-full z-50 transition duration-300 ${isScrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Narrativ</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#why" className="text-gray-300 hover:text-white transition">Pourquoi Narrativ</Link>
              <Link href="#stories" className="text-gray-300 hover:text-white transition">Histoires</Link>
              <Link href="#how" className="text-gray-300 hover:text-white transition">Comment ça marche</Link>
            </nav>
            <div className="hidden md:block">
              <Link href="/signup" className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-medium px-5 py-2 rounded-lg transition transform hover:scale-105">
                Commencer gratuitement
              </Link>
            </div>
            <div className="md:hidden">
              <button className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-10 z-0"></div>
          <div className="absolute top-1/3 -left-20 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl opacity-10 z-0"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                custom={0}
              >
                Chaque réussite a une histoire.<br/>
                <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
                  Et la tienne mérite d'être racontée.
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                custom={1}
              >
                Narrativ, la plateforme où les freelancers transforment leur parcours en puissance et se démarquent par leurs histoires.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                custom={2}
              >
                <Link href="/signup" className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-medium px-8 py-4 rounded-lg transition text-lg flex items-center justify-center gap-2 transform hover:scale-105">
                  <span>Créer mon récit</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <Link href="#stories" className="w-full sm:w-auto bg-gray-800/80 hover:bg-gray-700/80 text-white font-medium px-8 py-4 rounded-lg transition text-lg flex items-center justify-center gap-2">
                  Découvrir les histoires
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-16 relative max-w-5xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={3}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/60 to-gray-900/30 z-10"></div>
                <Image 
                  src="/api/placeholder/1080/600" 
                  alt="Narrativ Preview" 
                  width={1080} 
                  height={600} 
                  className="w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 flex items-center justify-center">
                      <span className="text-white font-bold">M</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl">Marie Dubois</h3>
                      <p className="text-gray-300">Consultante Marketing Digital</p>
                    </div>
                  </div>
                  <h2 className="text-white text-2xl md:text-3xl font-bold mt-4">"Comment j'ai transformé mes échecs en opportunités"</h2>
                </div>
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-sm text-white z-20">
                  4.5K vues
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-900/60">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-white mb-2">150+</h3>
                <p className="text-gray-400">Récits créés ce mois</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-white mb-2">78%</h3>
                <p className="text-gray-400">Taux d'engagement en plus</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-white mb-2">3X</h3>
                <p className="text-gray-400">Opportunités de business</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Narrativ Section */}
        <section id="why" className="py-24 relative">
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-10 z-0"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-teal-500/10 to-indigo-500/10 text-teal-400 text-sm font-medium mb-4">POURQUOI NARRATIV</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Parce que ton parcours est ta plus grande force</h2>
              <p className="text-xl text-gray-300">Dans un monde saturé d'offres identiques, ce sont les histoires qui créent la différence et la confiance.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-teal-500/30 transition duration-300 hover:transform hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500/20 to-teal-500/5 flex items-center justify-center mb-6">
                  <CheckCircle className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Se démarquer naturellement</h3>
                <p className="text-gray-300">Arrête de te battre sur des arguments techniques. Connecte-toi par ton histoire unique.</p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-teal-500/30 transition duration-300 hover:transform hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500/20 to-teal-500/5 flex items-center justify-center mb-6">
                  <CheckCircle className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Inspirer la confiance</h3>
                <p className="text-gray-300">Les clients ne cherchent pas seulement des compétences, mais des valeurs et une vision alignées.</p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-teal-500/30 transition duration-300 hover:transform hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500/20 to-teal-500/5 flex items-center justify-center mb-6">
                  <CheckCircle className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Valoriser ton parcours</h3>
                <p className="text-gray-300">Tes échecs et tes succès sont des preuves puissantes de ta valeur. Utilise-les.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stories Examples Section */}
        <section id="stories" className="py-24 bg-gray-900/60 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-teal-500/10 to-indigo-500/10 text-teal-400 text-sm font-medium mb-4">HISTOIRES QUI INSPIRENT</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Des récits qui marquent</h2>
              <p className="text-xl text-gray-300">Découvre comment d'autres freelancers ont transformé leur histoire en avantage professionnel.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stories.map((story, index) => (
                <div key={index} className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-teal-500/30 transition duration-300 hover:transform hover:scale-105 group">
                  <div className="h-48 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${story.color} opacity-20 group-hover:opacity-30 transition duration-300`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20">
                        <Image src="/api/placeholder/150/150" alt={story.name} width={150} height={150} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{story.name}</h3>
                    <p className={`text-sm bg-gradient-to-r ${story.color} bg-clip-text text-transparent font-medium mb-4`}>{story.profession}</p>
                    <p className="text-gray-300 mb-6 italic">"{story.tagline}"</p>
                    <Link href={`/story/${index}`} className="inline-flex items-center text-teal-400 hover:text-teal-300 transition">
                      <span>Lire son récit</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link href="/feed" className="bg-gray-800/80 hover:bg-gray-700/80 text-white font-medium px-6 py-3 rounded-lg transition inline-flex items-center gap-2">
                <span>Découvrir plus d'histoires</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how" className="py-24 relative">
          <div className="absolute top-40 -left-40 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-10 z-0"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-teal-500/10 to-indigo-500/10 text-teal-400 text-sm font-medium mb-4">COMMENT ÇA MARCHE</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">3 étapes simples pour faire parler ton parcours</h2>
              <p className="text-xl text-gray-300">Même sans être écrivain, transforme ton expérience en récit captivant.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">1</div>
                <h3 className="text-xl font-bold mb-4">Raconte ton histoire</h3>
                <p className="text-gray-300">Notre éditeur simple t'aide à structurer ton parcours, même si tu n'as jamais écrit.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">2</div>
                <h3 className="text-xl font-bold mb-4">Personnalise ton style</h3>
                <p className="text-gray-300">Choisis le ton qui te représente : inspirant, authentique, professionnel...</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">3</div>
                <h3 className="text-xl font-bold mb-4">Partage et connecte</h3>
                <p className="text-gray-300">Obtiens un lien unique à partager sur tes réseaux et avec tes prospects.</p>
              </div>
            </div>
            
            <motion.div 
              className="mt-16 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href="/signup" className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-medium px-8 py-4 rounded-lg transition text-lg flex items-center justify-center gap-2 transform hover:scale-105">
                <span>Créer mon récit gratuitement</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gray-900/60">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-teal-500/10 to-indigo-500/10 text-teal-400 text-sm font-medium mb-4">TÉMOIGNAGES</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ils ont transformé leur parcours</h2>
              <p className="text-xl text-gray-300">Des freelancers comme toi qui ont fait la différence grâce à leur histoire.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 mr-3"></div>
                    <div>
                      <h4 className="font-bold">{testimonial.author}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-indigo-900/20 z-0"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center bg-gray-800/90 backdrop-blur-md rounded-2xl border border-gray-700/50 p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ton histoire n'est pas banale.<br/>Ne la garde pas pour toi.</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Rejoins la communauté des freelancers qui marquent les esprits grâce à leur storytelling authentique.</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup" className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-medium px-8 py-4 rounded-lg transition text-lg flex items-center justify-center gap-2 transform hover:scale-105">
                  <span>Commencer maintenant</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <Link href="/story/example" className="w-full sm:w-auto bg-gray-700/80 hover:bg-gray-600/80 text-white font-medium px-8 py-4 rounded-lg transition text-lg">
                  Lire un exemple
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Reste inspiré</h2>
              <p className="text-gray-300 mb-6">Reçois des conseils de storytelling et des histoires inspirantes.</p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Ton email professionnel" 
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-6 py-3 rounded-lg transition flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>S'abonner</span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/80 border-t border-gray-800">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">Narrativ</span>
              <p className="text-gray-400 mt-4">La plateforme où les freelancers transforment leur parcours en puissance.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Naviguer</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-teal-400 transition">Accueil</Link></li>
                <li><Link href="/feed" className="text-gray-400 hover:text-teal-400 transition">Explorer</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-teal-400 transition">Tarifs</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-teal-400 transition">À propos</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Légal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-teal-400 transition">Politique de confidentialité</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-teal-400 transition">Conditions d'utilisation</Link></li>
                <li><Link href="/cookies" className="text-gray-400 hover:text-teal-400 transition">Politique de cookies</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-gray-400 hover:text-teal-400 transition">Nous contacter</Link></li>
                <li><Link href="/support" className="text-gray-400 hover:text-teal-400 transition">Support</Link></li>
                <li><a href="mailto:hello@narrativ.fr" className="text-gray-400 hover:text-teal-400 transition">hello@narrativ.fr</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Narrativ. Tous droits réservés.</p>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Fixed Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-900/90 backdrop-blur-md border-t border-gray-800 p-4 z-40">
        <Link href="/signup" className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-medium py-3 rounded-lg transition text-lg flex items-center justify-center gap-2 w-full">
          <span>Commencer gratuitement</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </>
  )
}