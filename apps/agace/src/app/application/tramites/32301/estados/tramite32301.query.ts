import { FormularioGrupo } from '../models/avisomodify.model';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite32301Store } from './tramite32301.store';

/**
 * Tramite query
 *
 * @export
 * @class TramiteQuery
 * @extends {Query<FormularioGrupo>}
 */
@Injectable({ providedIn: 'root' })
export class Tramite32301Query extends Query<FormularioGrupo> {

  selectTipoDevAviso$ = this.select((state) => {
    return state.tipoDevAviso;
  });

  selectProveedorExtranjero$ = this.select((state) => {
    return state.proveedorExtranjero;
  });

  selectModificacionSocios$ = this.select((state) => {
    return state.modificacionSocios;
  });

  selectModificacionGoceInmueble$ = this.select((state) => {
    return state.modificacionGoceInmueble;
  });

  selectpersonaFusionEscisionDTO$ = this.select((state) => {
    return state.personaFusionEscisionDTO;
  });
  
  selectFechasSeleccionadas$ = this.select((state) => {
    return state.fechasSeleccionadas;
  });





  selectDatosEmpresa$ = this.select((state) => {
    return state.datosEmpresa;
  });

  setCargaTipo$ = this.select((state) => {
   return state.cargaTipo;
  })

  selectDatosQuienRecibe$ = this.select((state) => {
    return state.datosQuienRecibe;
  });

  selectDatosMercanciaSubmanufactura$ = this.select((state) => {
    return state.datosMercanciaSubmanufactura;
  });

  selectDatosDomicilioLugar$ = this.select((state) => {
    return state.datosDomicilioLugar;
  });


  
  constructor(protected override store: Tramite32301Store) {
    super(store);
  }
}