import { DatosSolicitudFormState, TablaMercanciasDatos, TablaOpcionConfig, TablaScianConfig } from "../../../../shared/models/datos-solicitud.model";
import { PRODUCTO_TABLA_DATA, SCIAN_TABLA_DATA, TABLA_OPCION_DATA } from "../../../../shared/constantes/datos-solicitud.enum";
import { Store, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core";

export interface Tramite260204State {
    datosSolicitudFormState: DatosSolicitudFormState;
    opcionConfigDatos: TablaOpcionConfig[];
    scianConfigDatos: TablaScianConfig[];
    tablaMercanciasConfigDatos: TablaMercanciasDatos[];
    seleccionadoopcionDatos: TablaOpcionConfig[];
    seleccionadoScianDatos: TablaScianConfig[];
    seleccionadoTablaMercanciasDatos: TablaMercanciasDatos[];
}

export function createInitialState(): Tramite260204State {
    return {
        datosSolicitudFormState: {
            rfcSanitario: '',
            denominacionRazon: '',
            correoElectronico: '',
            codigoPostal: '',
            estado: '',
            municipioAlcaldia: '',
            localidad: '',
            colonia: '',
            calle: '',
            lada: '',
            telefono: '',
            aviso: '',
            licenciaSanitaria: '',
            regimen: '',
            adunasDeEntradas: '',
            aeropuerto: false,
            publico: 'no',
            representanteRfc: '',
            representanteNombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
          },
            opcionConfigDatos: TABLA_OPCION_DATA,
            scianConfigDatos: SCIAN_TABLA_DATA,
            tablaMercanciasConfigDatos: PRODUCTO_TABLA_DATA,
            seleccionadoopcionDatos: [],
            seleccionadoScianDatos: [],
            seleccionadoTablaMercanciasDatos: [],
        };
    }

@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: "tramite260204", resettable: true })
export class Tramite260204Store extends Store<Tramite260204State> {
  constructor() {
    super(createInitialState());
  }

    public updateDatosSolicitudFormState(datosSolicitudFormState: DatosSolicitudFormState): void{
        this.update((state) => ({
        ...state,
        datosSolicitudFormState,
        }));
    }
}