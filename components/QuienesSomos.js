// components/QuienesSomos.js
import {
  Shield,
  Users,
  FileCheck,
  Handshake,
  Scale,
  Phone,
  MapPinned,
  Mail,
} from "lucide-react";

export default function QuienesSomos() {
  const pilares = [
    { icon: Shield, label: "Procesos Seguros" },
    { icon: Users, label: "Asesoría Personalizada" },
    { icon: FileCheck, label: "Transparencia Garantizada" },
    { icon: Handshake, label: "Acompañamiento Integral" },
    { icon: Scale, label: "Experiencia Jurídica Inmobiliaria" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenido */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ¿Quiénes Somos?
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Somos una empresa inmobiliaria estratégica que combina
              experiencia, visión comercial y respaldo legal para ofrecer
              soluciones seguras y rentables en el mercado inmobiliario del
              Ecuador.
            </p>
            <p className="text-gray-600 text-lg mb-6">
              Contamos con más de 10 años de experiencia acumulada en
              negociación, asesoría jurídica y gestión de bienes raíces, lo que
              nos permite estructurar operaciones sólidas, transparentes y
              eficientes.
            </p>
            <p className="text-gray-600 text-lg mb-6">
              Acompañamos a nuestros clientes en cada etapa del proceso
              —análisis, valoración, negociación y cierre— asegurando decisiones
              inteligentes y protección patrimonial.
            </p>
            <p className="text-gray-600 text-lg">
              Más que intermediar una compraventa, construimos relaciones de
              confianza basadas en ética profesional, resultados y compromiso
              con la excelencia.{" "}
              <span className="text-gray-900 font-bold">
                Transformamos oportunidades inmobiliarias en inversiones
                estratégicas.
              </span>
            </p>
          </div>

          {/* Pilares */}
          <div className="grid grid-cols-2 gap-6">
            {pilares.map((pilar, index) => {
              const Icon = pilar.icon;
              return (
                <div
                  key={index}
                  className="bg-primary-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-gray-900 font-semibold text-sm leading-snug">
                    {pilar.label}
                  </div>
                </div>
              );
            })}
            {/* Espacio vacío para mantener el grid balanceado (5 elementos en grid de 2) */}
            <div></div>
          </div>
        </div>
      </div>

      {/* Mapa y Contactos */}
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto mt-10 gap-6 px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d997.4485719791038!2d-78.4859497!3d-0.1988658!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59bae67b0d60d%3A0xadb7197bac85d10f!2sEsteban%20Donoso%20y%20Asociados!5e0!3m2!1ses!2sec!4v1764379408770!5m2!1ses!2sec"
            width="100%"
            height="350"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación InmoEcuador"
          ></iframe>
        </div>

        <div className="p-6 bg-primary-50 rounded-lg">
          <h3 className="text-center text-3xl font-bold text-primary-900 mb-8">
            Contactos
          </h3>

          <div className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center font-bold text-primary-900 mb-2">
                <Phone className="mr-2 h-5 w-5" />
                Teléfono
              </div>
              <p className="text-gray-700">099 493 2264</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex items-center font-bold text-primary-900 mb-2">
                <Mail className="mr-2 h-5 w-5" />
                Email
              </div>
              <p className="text-gray-700">inmobieraec@gmail.com</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex items-center font-bold text-primary-900 mb-2">
                <MapPinned className="mr-2 h-5 w-5" />
                Dirección
              </div>
              <p className="text-gray-700">
                Yánez Pinzón y Av. Francisco de Orellana
              </p>
              <p className="text-gray-700">Edificio Pinzón</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
