import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/logo.png";

export default function Navbar() {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const linkClasses = (path: string) =>
        `px-3 py-2 font-semibold tracking-wide 
         transition-all duration-300 text-[18px]
         relative group
         ${
             location.pathname === path
                 ? "text-sky-900"
                 : "text-sky-800 hover:text-sky-900"
         }
    `;

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 
            transition-all duration-300 backdrop-blur-xl shadow-md
            ${
                isScrolled
                    ? "py-2 bg-gray-100/90"
                    : "py-4 bg-white/90"
            }
        `}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                
                <Link to="/" className="flex items-center">
                    <img
                        src={Logo}
                        alt="Cami English Logo"
                        className={`object-contain transition-all duration-300
                        ${isScrolled ? "h-14" : "h-20"} 
                        ml-6 hover:scale-105`}
                    />
                </Link>

                <div className="hidden md:flex gap-8">
                    <Link to="/" className={linkClasses("/")}>
                        Sobre mi
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-sky-700 transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    <Link to="/courses" className={linkClasses("/courses")}>
                        Cursos
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-sky-700 transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    <Link to="/calendar" className={linkClasses("/calendar")}>
                        Agenda tu turno
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-sky-700 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </div>

                <a
                    href="https://wa.me/5492983693168"
                    target="_blank"
                    className="hidden md:flex items-center gap-2 
                               bg-white dark:bg-black
                               text-green-600 dark:text-green-400
                               px-4 py-2 rounded-xl font-semibold
                               transition-all duration-300 
                               hover:bg-green-600 hover:text-white
                               active:bg-green-700
                               hover:scale-105"
                >
                    <FaWhatsapp size={20} /> Contacto
                </a>

                <button
                    className="md:hidden text-sky-900 text-3xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-white/90 backdrop-blur-xl px-6 py-4 
                                flex flex-col gap-4 text-lg text-sky-900 shadow-lg">

                    <Link to="/" onClick={() => setMenuOpen(false)} className="py-2">
                        Sobre mi
                    </Link>

                    <Link to="/courses" onClick={() => setMenuOpen(false)} className="py-2">
                        Cursos
                    </Link>

                    <Link to="/calendar" onClick={() => setMenuOpen(false)} className="py-2">
                        Agenda tu turno
                    </Link>

                    <a
                        href="https://wa.me/5492983693168"
                        target="_blank"
                        className="flex items-center gap-2 
                                   bg-white dark:bg-black
                                   text-green-600 dark:text-green-400
                                   px-4 py-2 rounded-xl font-semibold
                                   transition-all duration-300 
                                   hover:bg-green-600 hover:text-white
                                   active:bg-green-700"
                    >
                        <FaWhatsapp size={20} /> Contacto
                    </a>
                </div>
            )}
        </nav>
    );
}
