import { ConfiguracionColumna } from '@libs/shared/data-access-user/src'; // Adjust the import path as necessary
import { ConfiguracionItem } from '../components/terceros/terceros.component';

export const CONTINUAR: string = "t";
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