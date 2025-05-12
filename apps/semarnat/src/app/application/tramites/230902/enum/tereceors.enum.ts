import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
 
export interface ConfiguracionItem {
  pais: string;
  ciudad: string;
  entidadFederativa: string;
  domicilio: string;
  codigoPostal: number;
}
 
 
export const TERCEROS_CONFIGURACION_TABLA: ConfiguracionColumna<ConfiguracionItem>[] = [
    {
      encabezado: 'País',
      clave: (item: ConfiguracionItem) => item.pais,
      orden: 1,
    },
    {
      encabezado: 'Ciudad',
      clave: (item: ConfiguracionItem) => item.ciudad,
      orden: 2,
    },
    {
      encabezado: 'Entidad Federativa',
      clave: (item: ConfiguracionItem) => item.entidadFederativa,
      orden: 3,
    },
    {
      encabezado: 'Domicilio',
      clave: (item: ConfiguracionItem) => item.domicilio,
      orden: 4,
    },
    {
      encabezado: 'Código postal o equivalente',
      clave: (item: ConfiguracionItem) => item.codigoPostal,
      orden: 5,
    }
  ];
 
  export const DESTINARIO_TABLE_ENTRY= {
    pais: 'MEXICO (ESTADOS UNIDOS MEXICANOS)',
    ciudad: '---',
    entidadFederativa: 'MORELOS',
    domicilio: 'prueba',
    codigoPostal: 96533,
  }