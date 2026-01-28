// app/propiedades/[id]/page.js
"use client";
import { useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { usePropiedad } from "@/lib/queries";
import Navbar from "@/components/Navbar";
import MapaPropiedad from "@/components/MapaPropiedad";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Bed,
  Bath,
  Car,
  Maximize,
  Calendar,
  Home,
  MessageCircle,
  ArrowLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function PropiedadDetalle() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [imagenActual, setImagenActual] = useState(0);

  const whatsappNumber = "593999999999"; // Cambia por tu número real

  const fromUrl = searchParams.get("from") || "/propiedades";
  // Usar TanStack Query
  const { data: propiedad, isLoading, error } = usePropiedad(params.id);

  if (isLoading) {
    return (
      <main>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
        </div>
      </main>
    );
  }

  if (error || !propiedad) {
    return (
      <main>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Propiedad no encontrada
          </h1>
          <Link
            href={fromUrl}
            className="flex items-center text-primary-600 hover:text-primary-700 font-semibold"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver a propiedades
          </Link>
        </div>
      </main>
    );
  }

  const whatsappMessage = `Hola, estoy interesado en la propiedad ${propiedad.titulo} - ${propiedad.codigo_propiedad} con precio $${propiedad.precio.toLocaleString()}`;

  return (
    <main>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-primary-600 hover:text-primary-700 font-semibold"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver a propiedades
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Principal - Imágenes e Información */}
          <div className="lg:col-span-2">
            {/* Galería de Imágenes */}
            <div className="mb-8">
              {/* Imagen Principal */}
              <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden mb-4">
                <img
                  src={
                    propiedad.imagenes && propiedad.imagenes[imagenActual]
                      ? propiedad.imagenes[imagenActual]
                      : "/placeholder-property.jpg"
                  }
                  alt={propiedad.titulo}
                  className="object-cover"
                />
              </div>

              {/* Miniaturas */}
              {propiedad.imagenes && propiedad.imagenes.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {propiedad.imagenes.map((imagen, index) => (
                    <button
                      key={index}
                      onClick={() => setImagenActual(index)}
                      className={`relative h-20 rounded-lg overflow-hidden ${
                        imagenActual === index
                          ? "ring-4 ring-primary-600"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={imagen}
                        alt={`${propiedad.titulo} - ${index + 1}`}
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Información Principal */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {propiedad.titulo}
                  </h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="capitalize">
                      {propiedad.mostrar_direccion
                        ? propiedad.direccion
                        : `${propiedad.sector}, Quito`}
                    </span>
                  </div>
                </div>
                {propiedad.destacado && (
                  <div className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-semibold">
                    Destacado
                  </div>
                )}
              </div>

              <div className="text-3xl font-bold text-primary-600 mb-6">
                ${propiedad.precio.toLocaleString()}
              </div>
              {propiedad.aplica_credito_vip && (
                <div className="mb-6">
                  <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Aplica para Crédito VIP
                  </div>
                </div>
              )}

              {/* Características Principales */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b">
                {propiedad.habitaciones && (
                  <div className="flex items-center space-x-2">
                    <Bed className="h-6 w-6 text-primary-600" />
                    <div>
                      <div className="text-sm text-gray-600">Habitaciones</div>
                      <div className="font-semibold">
                        {propiedad.habitaciones}
                      </div>
                    </div>
                  </div>
                )}

                {propiedad.banios && (
                  <div className="flex items-center space-x-2">
                    <Bath className="h-6 w-6 text-primary-600" />
                    <div>
                      <div className="text-sm text-gray-600">Baños</div>
                      <div className="font-semibold">{propiedad.banios}</div>
                    </div>
                  </div>
                )}

                {propiedad.parqueaderos && (
                  <div className="flex items-center space-x-2">
                    <Car className="h-6 w-6 text-primary-600" />
                    <div>
                      <div className="text-sm text-gray-600">Parqueaderos</div>
                      <div className="font-semibold">
                        {propiedad.parqueaderos}
                      </div>
                    </div>
                  </div>
                )}

                {propiedad.area_total && (
                  <div className="flex items-center space-x-2">
                    <Maximize className="h-6 w-6 text-primary-600" />
                    <div>
                      <div className="text-sm text-gray-600">Área Total</div>
                      <div className="font-semibold">
                        {propiedad.area_total}m²
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Descripción */}
              <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Descripción
                </h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {propiedad.descripcion}
                </p>
              </div>
            </div>

            {/* Detalles Adicionales */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Detalles de la Propiedad
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Código:</span>
                  <span className="font-semibold">
                    {propiedad.codigo_propiedad}
                  </span>
                </div>

                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Tipo:</span>
                  <span className="font-semibold capitalize">
                    {propiedad.tipo_inmueble}
                  </span>
                </div>

                {propiedad.area_util && (
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Área Útil:</span>
                    <span className="font-semibold">
                      {propiedad.area_util}m²
                    </span>
                  </div>
                )}

                {propiedad.anio_construccion && (
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Año de Construcción:</span>
                    <span className="font-semibold">
                      {propiedad.anio_construccion}
                    </span>
                  </div>
                )}

                {propiedad.medios_banios > 0 && (
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Medios Baños:</span>
                    <span className="font-semibold">
                      {propiedad.medios_banios}
                    </span>
                  </div>
                )}

                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Amoblado:</span>
                  <span className="font-semibold">
                    {propiedad.amoblado ? "Sí" : "No"}
                  </span>
                </div>
              </div>
            </div>

            {/* Amenidades */}
            {propiedad.amenidades && propiedad.amenidades.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Amenidades
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {propiedad.amenidades.map((amenidad, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700 capitalize">
                        {amenidad}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mapa de Ubicación */}
            {propiedad.latitude && propiedad.longitude && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Ubicación
                </h2>
                <MapaPropiedad
                  latitude={propiedad.latitude}
                  longitude={propiedad.longitude}
                  titulo={propiedad.titulo}
                />
                <p className="text-sm text-gray-500 mt-3">
                  {propiedad.mostrar_direccion
                    ? propiedad.direccion
                    : `Sector: ${propiedad.sector}`}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar - Contacto */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                ¿Te interesa esta propiedad?
              </h3>

              <p className="text-gray-600 mb-6">
                Contáctanos por WhatsApp para más información y para agendar una
                visita.
              </p>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 text-white px-6 py-4 rounded-lg hover:bg-green-600 transition font-semibold flex items-center justify-center gap-2 mb-4"
              >
                <MessageCircle className="h-6 w-6" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Inmobiera. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
