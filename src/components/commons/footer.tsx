import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-full mt-20 bg-gray-100 border-t border-gray-300 py-12 text-gray-700">

            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 text-center">
                <div className="flex flex-col items-center space-y-4">
                    <img
                        src="/logo.png"
                        alt="logo"
                        className="w-28 h-auto opacity-90"
                    />

                    <p className="max-w-sm text-gray-600 leading-relaxed">
                        Profesora de inglés dedicada a transformar el aprendizaje
                        en una experiencia clara, sencilla y efectiva.
                        Ayuda a estudiantes a mejorar su comunicación,
                        ganar confianza y alcanzar nuevos objetivos académicos y profesionales.
                    </p>
                </div>

                <div className="flex flex-col items-center space-y-6">

                    <h3 className="text-xl font-semibold">Contacto</h3>
                    <a
                        href="https://wa.me/5492983693168"
                        target="_blank"
                        className="flex items-center gap-3 hover:text-green-600 transition"
                    >
                        <FaWhatsapp className="text-3xl" />
                        <span className="text-lg">+54 9 2983 69-3168</span>
                    </a>

                    <a
                        href="https://instagram.com/englishwithcami.d"
                        target="_blank"
                        className="flex items-center gap-3 hover:text-purple-600 transition"
                    >
                        <FaInstagram className="text-3xl" />
                        <span className="text-lg">@englishwithcami.d</span>
                    </a>
                </div>
            </div>
            <p className="text-center text-gray-500 text-sm mt-10">
                © {new Date().getFullYear()} English With Cami — Todos los derechos reservados.
            </p>
        </footer>
    );
}
