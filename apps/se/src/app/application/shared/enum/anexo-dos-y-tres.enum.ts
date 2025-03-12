import { AnexoEncabezado } from "../models/se-shared.model";

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