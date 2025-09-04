import { ConfiguracionItem } from '../models/detalle';
import { Cupo } from '@libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
/**
 * Definición de datos de prueba para cupos y configuraciones.
 * Sirve como valores iniciales o mocks para pruebas unitarias.
 * Incluye información de producto, subproducto, empresa y montos.
 */
export const NUEVO_CUPOS: Cupo = {
  cupo: 100,
  nombreProducto: 'Producto X',
  nombreSubproducto: 'Subproducto Y',
  mecanismoAsignacion: 'Automático',
  tipoCupo: 'Anual'
};
/**
 * Constante que define un objeto de configuración inicial para un cupo.
 * Contiene datos de prueba como folio, razón social, estado, fabricante e importador.
 * También incluye valores numéricos relacionados al cupo: unidad primaria,
 * monto de expediente, monto a cancelar y monto utilizado.
 */
export const NUEVO_DATOS_CUPO: ConfiguracionItem = {
  folioOficioCertificado: 'FOL123456',
  nombreRazonSocial: 'Empresa XYZ S.A.',
  estado: 'CDMX',
  fabricante: 'Fabricante ABC',
  importador: 'Importador DEF',
  unidadPrimaria: 10,
  montoExpediente: 50000,
  montocancelar: 10000,
  montoutilizado: 20000
};
