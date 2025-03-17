import { AnexoEncabezado, AnexoImportacionEncabezado, AnexoUnoEncabezado, ProveedorClienteTabla } from "../models/se-shared.model";

export const ANEXO_SERVICIO = [
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: AnexoEncabezado) => ele.ENCABEZADO_FRACCION,
    orden: 1
  },
  {
    encabezado: 'Descripción',
    clave: (ele: AnexoEncabezado) => ele.ENCABEZADO_DESCRIPCION,
    orden: 2
  }
]

export const ANEXO_TRES_ALERTA = `<p>
Herramientas, equipos y accesorios de investigación, de seguridad industrial y de productos necesarios para la higiene, asepsia, y para la prevención y control de la contaminación ambiental de la planta productiva, manuales de trabajo y planos industriales, así como equipo de telecomunicación y cómputo. Maquinaria, aparatos, instrumentos y refacciones para el proceso productivo, equipo de laboratorio, de medición y de prueba de sus productos y los departamentos que con ellos se relacionen; capacitación de su personal; equipo para el manejo de materiales relacionados directamente con los bienes de exportación y otros vinculados con el proceso productivo; así como equipo para el desarrollo administrativo de la empresa, a importar al amparo del programa.</p>`

export const ANEXO_UNO_ALERTA = `<p>
Materiales primas, partes, componentes, materiales auxiliares, envases, material de empaque, etiquetas, folletos, combustibles y lubricantes que se utilicen en el proceso de producción o de servicios de las mercancías de exportación.
</p>`

export const ANEXO_I_SERVICIO = [
  {
    encabezado: 'Fracción',
    clave: (ele: AnexoUnoEncabezado) => ele.ENCABEZADO_FRACCION,
    orden: 1
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: AnexoUnoEncabezado) => ele.ENCABEZADO_FRACCION_ARANCELARIA,
    orden: 2
  },
  {
    encabezado: 'Descripción comercial',
    clave: (ele: AnexoUnoEncabezado) => ele.ENCABEZADO_DESCRIPCION_COMERCIAL,
    orden: 3
  },
  {
    encabezado: 'Anexo II',
    clave: (ele: AnexoUnoEncabezado) => ele.ENCABEZADO_ANEXO_II,
    orden: 4
  },
  {
    encabezado: 'Tipo',
    clave: (ele: AnexoUnoEncabezado) => ele.ENCABEZADO_TIPO,
    orden: 5
  },
  {
    encabezado: 'UMT',
    clave: (ele: AnexoUnoEncabezado) => ele.ENCABEZADO_UMT,
    orden: 6
  },
  {
    encabezado: 'Categoría',
    clave: (ele: AnexoUnoEncabezado) => ele.ENCABEZADO_CATEGORIA,
    orden: 7
  },
  {
    encabezado: 'Valor en mercado',
    clave: (ele: AnexoUnoEncabezado) => ele.ENCABEZADO_VALOR_EN_MERCADO,
    orden: 8
  },
]

export const ANEXO_IMPORTACION_SERVICIO = [
  {
    encabezado: 'Fracción',
    clave: (ele: AnexoImportacionEncabezado) => ele.ENCABEZADO_FRACCION,
    orden: 1
  },
  {
    encabezado: 'Fracción arancelaria del producto de exportación',
    clave: (ele: AnexoImportacionEncabezado) => ele.ENCABEZADO_FRACCION_EXPORTACION,
    orden: 2
  },
  {
    encabezado: 'Descripción comercial',
    clave: (ele: AnexoImportacionEncabezado) => ele.ENCABEZADO_DESCRIPCION_COMERCIAL,
    orden: 3
  },
  {
    encabezado: 'Fracción arancelaria de la mercancía de importación',
    clave: (ele: AnexoImportacionEncabezado) => ele.ENCABEZADO_FRACCION_IMPORTACION,
    orden: 4
  }

  
]
export const PROVEEDOR_CLIENTE_TABLA_CONFIG=[
  {
    encabezado: 'Fracción',
    clave: (ele: ProveedorClienteTabla) => ele.fraccion,
    orden: 1
  },
  {
    encabezado: 'Pais de origen',
    clave: (ele: ProveedorClienteTabla) => ele.paisDeOrigin,
    orden: 2
  },
  {
    encabezado: 'Razón Social Proveedor',
    clave: (ele: ProveedorClienteTabla) => ele.razonSocialProveedor,
    orden: 3
  },
  {
    encabezado: 'Pais destino',
    clave: (ele: ProveedorClienteTabla) => ele.paisDestino,
    orden: 4
  },
  {
    encabezado: 'RFC/Tax ID Cliente',
    clave: (ele: ProveedorClienteTabla) => ele.rfcClinte,
    orden: 5
  },
  {
    encabezado: 'Razón Social',
    clave: (ele: ProveedorClienteTabla) => ele.razonSocial,
    orden: 6
  }
]
