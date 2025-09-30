import { DomicilioPayload, PlantasDireccionModelo, Tramite80207State } from '../modelos/subfabricante.model';
import { GUARDAR_PAYLOAD_80207 } from './guardar-payload-80207.base';
import { mapPlantaToDomicilio } from '../servicios/servicios-subfabricante.service';


export type Solicitud80207Payload = typeof GUARDAR_PAYLOAD_80207 & {
  domicilio: DomicilioPayload;
  id_solicitud?: number; // your payload already had "id_solicitud"
};

// Choose the primary plant for domicilio mapping (first in store.plantas)
function pickPrimaryPlanta(plantas?: PlantasDireccionModelo[]): PlantasDireccionModelo | undefined {
  return (plantas && plantas.length > 0) ? plantas[0] : undefined;
}

export function buildSolicitud80207Payload(state: Tramite80207State): Solicitud80207Payload {
  const PRIMARYPLANTA = pickPrimaryPlanta(state.plantas);
  const DOMICILIO = mapPlantaToDomicilio(PRIMARYPLANTA);
 

  return {
    ...GUARDAR_PAYLOAD_80207,
    id_solicitud: state.idSolicitud ?? (GUARDAR_PAYLOAD_80207).id_solicitud,
    domicilio: DOMICILIO,
  };
}
