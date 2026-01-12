// app/admin/propiedades/nueva/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Loader2, Upload, X } from "lucide-react";
import Link from "next/link";

export default function NuevaPropiedadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  const [formData, setFormData] = useState({
    codigo_propiedad: "",
    titulo: "",
    descripcion: "",
    precio: "",
    tipo_inmueble: "casa",
    direccion: "",
    mostrar_direccion: true,
    sector: "norte",
    latitude: "",
    longitude: "",
    anio_construccion: "",
    area_total: "",
    area_util: "",
    habitaciones: "",
    banios: "",
    medios_banios: "",
    parqueaderos: "",
    amoblado: false,
    destacado: false,
    amenidades: "",
    imagenes: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Validar número máximo de imágenes
    const totalImages = imageFiles.length + files.length;
    if (totalImages > 10) {
      alert("Máximo 10 imágenes por propiedad");
      return;
    }

    // Validar tamaño de cada imagen
    const maxSize = 5 * 1024 * 1024; // 5MB
    const invalidFiles = files.filter((file) => file.size > maxSize);

    if (invalidFiles.length > 0) {
      alert("Algunas imágenes superan el tamaño máximo de 5MB");
      return;
    }

    setImageFiles((prev) => [...prev, ...files]);

    // Crear previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    const uploadedUrls = [];

    for (const file of imageFiles) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("propiedades-imagenes")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("propiedades-imagenes").getPublicUrl(filePath);

      uploadedUrls.push(publicUrl);
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validar que haya al menos una imagen
      if (imageFiles.length === 0) {
        alert("Debes subir al menos una imagen");
        setLoading(false);
        return;
      }

      // Subir imágenes
      setUploadingImages(true);
      const imageUrls = await uploadImages();
      setUploadingImages(false);

      console.log("Imágenes subidas:", imageUrls);

      // Preparar datos
      const amenidadesArray = formData.amenidades
        ? formData.amenidades
            .split(",")
            .map((a) => a.trim())
            .filter((a) => a)
        : [];

      const propiedadData = {
        codigo_propiedad: formData.codigo_propiedad,
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        tipo_inmueble: formData.tipo_inmueble,
        direccion: formData.direccion || null,
        mostrar_direccion: formData.mostrar_direccion,
        sector: formData.sector,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        anio_construccion: formData.anio_construccion
          ? parseInt(formData.anio_construccion)
          : null,
        area_total: formData.area_total
          ? parseFloat(formData.area_total)
          : null,
        area_util: formData.area_util ? parseFloat(formData.area_util) : null,
        habitaciones: formData.habitaciones
          ? parseInt(formData.habitaciones)
          : null,
        banios: formData.banios ? parseInt(formData.banios) : null,
        medios_banios: formData.medios_banios
          ? parseInt(formData.medios_banios)
          : null,
        parqueaderos: formData.parqueaderos
          ? parseInt(formData.parqueaderos)
          : null,
        amoblado: formData.amoblado,
        destacado: formData.destacado,
        amenidades: amenidadesArray,
        imagenes: imageUrls,
      };

      console.log("Datos a insertar:", propiedadData);

      const { data, error } = await supabase
        .from("propiedades")
        .insert([propiedadData])
        .select();

      if (error) {
        console.error("Error de Supabase:", error);
        throw error;
      }

      console.log("Propiedad creada:", data);
      alert("Propiedad creada exitosamente");
      router.push("/admin/propiedades");
    } catch (error) {
      console.error("Error creating propiedad:", error);
      alert(
        "Error al crear la propiedad: " + (error.message || "Error desconocido")
      );
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href="/admin/propiedades"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a la lista
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Nueva Propiedad
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información Básica */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Información Básica
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código de Propiedad *
                </label>
                <input
                  type="text"
                  name="codigo_propiedad"
                  required
                  value={formData.codigo_propiedad}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="PROP-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio (USD) *
                </label>
                <input
                  type="number"
                  name="precio"
                  required
                  value={formData.precio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="150000"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  name="titulo"
                  required
                  value={formData.titulo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Casa moderna en Cumbayá"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  name="descripcion"
                  required
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Describe la propiedad..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Inmueble *
                </label>
                <select
                  name="tipo_inmueble"
                  required
                  value={formData.tipo_inmueble}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="casa">Casa</option>
                  <option value="departamento">Departamento</option>
                  <option value="terreno">Terreno</option>
                  <option value="oficina">Oficina</option>
                  <option value="local">Local Comercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sector *
                </label>
                <select
                  name="sector"
                  required
                  value={formData.sector}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="norte">Norte</option>
                  <option value="centro">Centro</option>
                  <option value="sur">Sur</option>
                  <option value="cumbaya">Cumbayá</option>
                  <option value="tumbaco">Tumbaco</option>
                  <option value="los_chillos">Los Chillos</option>
                </select>
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ubicación</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Calle Principal 123 y Secundaria"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="mostrar_direccion"
                    checked={formData.mostrar_direccion}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Mostrar dirección exacta al público
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitud
                </label>
                <input
                  type="number"
                  step="0.000001"
                  min="-90"
                  max="90"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="-0.180653 (Ecuador típico)"
                />
                <p className="text-xs text-gray-500 mt-1">Entre -90 y 90</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitud
                </label>
                <input
                  type="number"
                  step="0.000001"
                  min="-180"
                  max="180"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="-78.467834 (Ecuador típico)"
                />
                <p className="text-xs text-gray-500 mt-1">Entre -180 y 180</p>
              </div>
            </div>
          </div>

          {/* Características */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Características
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Año de Construcción
                </label>
                <input
                  type="number"
                  name="anio_construccion"
                  value={formData.anio_construccion}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="2020"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área Total (m²)
                </label>
                <input
                  type="number"
                  step="any"
                  name="area_total"
                  value={formData.area_total}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="150"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área Útil (m²)
                </label>
                <input
                  type="number"
                  step="any"
                  name="area_util"
                  value={formData.area_util}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="120"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Habitaciones
                </label>
                <input
                  type="number"
                  name="habitaciones"
                  value={formData.habitaciones}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Baños
                </label>
                <input
                  type="number"
                  name="banios"
                  value={formData.banios}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medios Baños
                </label>
                <input
                  type="number"
                  name="medios_banios"
                  value={formData.medios_banios}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parqueaderos
                </label>
                <input
                  type="number"
                  name="parqueaderos"
                  value={formData.parqueaderos}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="2"
                />
              </div>
            </div>
          </div>

          {/* Amenidades */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Amenidades y Extras
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenidades (separadas por comas)
                </label>
                <input
                  type="text"
                  name="amenidades"
                  value={formData.amenidades}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="piscina, gimnasio, área verde, seguridad 24/7"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Ejemplo: piscina, gimnasio, área verde, seguridad 24/7
                </p>
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="amoblado"
                    checked={formData.amoblado}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Amoblado
                  </span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="destacado"
                    checked={formData.destacado}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Propiedad Destacada
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Imágenes */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Imágenes</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subir Imágenes
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-500 transition">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                      <span>Seleccionar archivos</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">o arrastrar y soltar</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF hasta 10MB
                  </p>
                </div>
              </div>

              {/* Preview de imágenes */}
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="h-32 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <Link
              href="/admin/propiedades"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading || uploadingImages}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading || uploadingImages ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {uploadingImages ? "Subiendo imágenes..." : "Guardando..."}
                </>
              ) : (
                "Crear Propiedad"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
