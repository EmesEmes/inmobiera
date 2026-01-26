// components/PropertyCard.js
"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Bed,
  Bath,
  Car,
  Maximize,
  MapPin,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

export default function PropertyCard({ propiedad }) {
  const searchParams = useSearchParams();
  const whatsappNumber = "593999999999"; // Cambia por tu número real
  const whatsappMessage = `Hola, estoy interesado en la propiedad ${propiedad.titulo} - ${propiedad.codigo_propiedad} con precio $${propiedad.precio.toLocaleString()}`;

  // Obtener la primera imagen o usar placeholder
  const imagenPrincipal =
    propiedad.imagenes && propiedad.imagenes.length > 0
      ? propiedad.imagenes[0]
      : "/placeholder-property.jpg";

  // Construir URL con query params para mantener el contexto
  const buildPropertyUrl = () => {
    const queryString = searchParams.toString();
    return queryString
      ? `/propiedades/${propiedad.id}?from=${encodeURIComponent(`/propiedades?${queryString}`)}`
      : `/propiedades/${propiedad.id}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Imagen */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={imagenPrincipal}
          alt={propiedad.titulo}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {propiedad.destacado && (
          <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Destacado
          </div>
        )}
        {propiedad.aplica_credito_vip && (
          <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" />
            Crédito VIP
          </div>
        )}
        <div
          className={`absolute ${propiedad.aplica_credito_vip ? "top-14" : "top-4"} left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-primary-900`}
        >
          ${propiedad.precio.toLocaleString()}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="capitalize">{propiedad.sector}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {propiedad.titulo}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
          {propiedad.descripcion}
        </p>

        {/* Características */}
        <div className="flex items-center justify-between text-gray-700 mb-6 pb-6 border-b">
          {propiedad.habitaciones ? (
            <div className="flex items-center space-x-1">
              <Bed className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-sm">{propiedad.habitaciones}</span>
            </div>
          ) : (
            <div className="w-8"></div>
          )}

          {propiedad.banios ? (
            <div className="flex items-center space-x-1">
              <Bath className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-sm">{propiedad.banios}</span>
            </div>
          ) : (
            <div className="w-8"></div>
          )}

          {propiedad.parqueaderos ? (
            <div className="flex items-center space-x-1">
              <Car className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-sm">{propiedad.parqueaderos}</span>
            </div>
          ) : (
            <div className="w-8"></div>
          )}

          {propiedad.area_total ? (
            <div className="flex items-center space-x-1">
              <Maximize className="h-5 w-5 text-primary-600 shrink-0" />
              <span className="text-sm">{propiedad.area_total}m²</span>
            </div>
          ) : (
            <div className="w-8"></div>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <Link
            href={`/propiedades/${propiedad.id}`}
            className="flex-1 text-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition font-semibold"
          >
            Ver más
          </Link>

          <Link
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center shrink-0"
            title="Contactar por WhatsApp"
          >
            <MessageCircle className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}
