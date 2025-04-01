import { DatosSolicitudFormState } from '../../../../shared/models/datos-solicitud.model';
import { Destinatario } from '../../../../shared/models/terceros-relacionados.model';
import { Fabricante } from '../../../../shared/models/terceros-relacionados.model';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { Injectable } from '@angular/core';
import { MercanciaForm } from '../../../../shared/models/datos-solicitud.model';
import { PRODUCTO_TABLA_DATA } from '../../../../shared/constantes/datos-solicitud.enum';
import { PagoDerechosFormState } from '../../../../shared/models/terceros-relacionados.model';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import { TABLA_OPCION_DATA } from '../../../../shared/constantes/datos-solicitud.enum';
import { TablaMercanciasDatos } from '../../../../shared/models/datos-solicitud.model';
import { TablaOpcionConfig } from '../../../../shared/models/datos-solicitud.model';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';

export interface Tramite260204State {
  destinatarioFinalTablaDatos: Destinatario[];
  facturadorTablaDatos: Facturador[];
  proveedorTablaDatos: Proveedor[];
  fabricanteTablaDatos: Fabricante[];
  datosSolicitudFormState: DatosSolicitudFormState;
  mercanciaForm: MercanciaForm;
  opcionConfigDatos: TablaOpcionConfig[];
  scianConfigDatos: TablaScianConfig[];
  tablaMercanciasConfigDatos: TablaMercanciasDatos[];
  seleccionadoopcionDatos: TablaOpcionConfig[];
  seleccionadoScianDatos: TablaScianConfig[];
  seleccionadoTablaMercanciasDatos: TablaMercanciasDatos[];
  opcionesColapsableState: boolean;
  pagoDerechos: PagoDerechosFormState;
}

export function createInitialState(): Tramite260204State {
  return {
    destinatarioFinalTablaDatos: [],
    facturadorTablaDatos: [],
    proveedorTablaDatos: [],
    fabricanteTablaDatos: [],
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
      publico: 'si',
      representanteRfc: '',
      representanteNombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
    },
    mercanciaForm: {
      clasificacionProducto: '',
      especificarClasificacionProducto: '',
      denominacionEspecificaProducto: '',
      denominacionDistintiva: '',
      denominacionComun: '',
      tipoProducto: '',
      formaFarmaceutica: '',
      estadoFisico: '',
      fraccionArancelaria: '',
      descripcionFraccion: '',
      cantidadUmtValor: '',
      cantidadUmt: '',
      cantidadUmcValor: '',
      cantidadUmc: '',
      presentacion: '',
      numeroRegistroSanitario: '',
      fechaCaducidad: '',
      paisDeOriginDatos: [],
      paisDeProcedenciaDatos: [],
    },
    opcionConfigDatos: TABLA_OPCION_DATA,
    scianConfigDatos: [], // SCIAN_TABLA_DATA
    tablaMercanciasConfigDatos: PRODUCTO_TABLA_DATA,
    seleccionadoopcionDatos: [],
    seleccionadoScianDatos: [],
    seleccionadoTablaMercanciasDatos: [],
    opcionesColapsableState: false,
    pagoDerechos: {
      claveReferencia: '',
      cadenaDependencia: '',
      estado: '',
      llavePago: '',
      fechaPago: '',
      importePago: '',
    },
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite260204', resettable: true })
export class Tramite260204Store extends Store<Tramite260204State> {
  constructor() {
    super(createInitialState());
  }

  public updateDatosSolicitudFormState(
    datosSolicitudFormState: DatosSolicitudFormState
  ): void {
    this.update((state) => ({
      ...state,
      datosSolicitudFormState,
    }));
  }
  public updateFabricanteTablaDatos(newFabricantes: Fabricante[]): void {
    this.update((state) => ({
      ...state,
      fabricanteTablaDatos: [...state.fabricanteTablaDatos, ...newFabricantes],
    }));
  }

  public updateDestinatarioFinalTablaDatos(
    newDestinatarios: Destinatario[]
  ): void {
    this.update((state) => ({
      ...state,
      destinatarioFinalTablaDatos: [
        ...state.destinatarioFinalTablaDatos,
        ...newDestinatarios,
      ],
    }));
  }

  public updateProveedorTablaDatos(newProveedores: Proveedor[]): void {
    this.update((state) => ({
      ...state,
      proveedorTablaDatos: [...state.proveedorTablaDatos, ...newProveedores],
    }));
  }

  public updateFacturadorTablaDatos(newFacturadores: Facturador[]): void {
    this.update((state) => ({
      ...state,
      facturadorTablaDatos: [...state.facturadorTablaDatos, ...newFacturadores],
    }));
  }

  public updateOpcionConfigDatos(opcionConfigDatos: TablaOpcionConfig[]): void {
    this.update((state) => ({
      ...state,
      opcionConfigDatos,
    }));
  }

  public updateScianConfigDatos(scianConfigDatos: TablaScianConfig[]): void {
    this.update((state) => ({
      ...state,
      scianConfigDatos,
    }));
  }

  public updateTablaMercanciasConfigDatos(
    tablaMercanciasConfigDatos: TablaMercanciasDatos[]
  ): void {
    this.update((state) => ({
      ...state,
      tablaMercanciasConfigDatos,
    }));
  }
  public updatePagoDerechos(nuevoPagoDerechos: PagoDerechosFormState): void {
    this.update((state) => ({
      ...state,
      pagoDerechos: nuevoPagoDerechos,
    }));
  }
}
