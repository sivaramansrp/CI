import { Catalogo } from '@libs/shared/data-access-user/src';
export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

export const PAIS_DESTINO_CATALOG: Catalogo[] = [
  {
    id: 1,
    descripcion: 'Mexico',
  },
  {
    id: 2,
    descripcion: 'USA',
  },
];
