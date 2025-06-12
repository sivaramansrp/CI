import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { ProgramaACancelar } from "../models/programa-cancelar.model";

export const PROGRAMA_TABLA:ConfiguracionColumna<ProgramaACancelar>[] = [
    { encabezado: 'Folio Programa', clave: (item:ProgramaACancelar) => item.folioPrograma, orden: 1 },
    { encabezado: 'Selección de Modalidad',clave: (item:ProgramaACancelar) => item.modalidad, orden: 2 },
    { encabezado: 'Representación Federal', clave: (item:ProgramaACancelar) => item.representacionFederal, orden: 3 },
    { encabezado: 'Tipo Programa', clave: (item:ProgramaACancelar) => item.tipoPrograma, orden: 4 },
    { encabezado: 'Estatus', clave: (item:ProgramaACancelar) => item.estatus, orden: 5 },
  ];