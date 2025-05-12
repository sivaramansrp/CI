import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { ComplementosSeccionState, ComplementosSeccionStore } from "../tramites/complementos-seccion.store";

/**
 * comodocs
 * @class ComplementosSeccionQuery
 * @description Clase que extiende de Akita Query para manejar las consultas relacionadas con el estado de la sección de complementos.
 * Proporciona métodos para seleccionar y observar cambios en el estado.
 */
@Injectable({ providedIn: 'root' })
export class ComplementosSeccionQuery extends Query<ComplementosSeccionState> {
  
  /**
   * 
   * @property selectExportarIlustraciones$
   * Observable que selecciona el estado completo de la sección de complementos.
   * @type {Observable<ComplementosSeccionState>}
   */
  selectExportarIlustraciones$ = this.select((state) => {
    return state;
  });

   selectInfoRegistro$ = this.select((state) => state['infoRegistro']);

  selectServicios$ = this.select((state) => state['servicios']);

  selectEmpresas$ = this.select((state) => state['empresas']);

  selectAduanaDeIngreso$ = this.select((state) => state['aduanaDeIngreso']);

  selectDatosImmex$ = this.select((state) => state['datosImmex']);

  selectDatos$ = this.select((state) => state['datos']);

  selectAduanaDeIngresoSelecion$ = this.select(
    (state) => state['aduanaDeIngresoSelecion']
  );

  FormaValida$ = this.select((state) => {
    return Object.values(state['formaValida']).every((value) => value === true);
  });

  selectPaisesOrigen$ = this.select((state) => state['paisesOrigen']);

  selectRfcEmpresa$ = this.select((state) => state['rfcEmpresa']);
  selectNumeroPrograma$ = this.select((state) => state['numeroPrograma']);
  selectTiempoPrograma$ = this.select((state) => state['tiempoPrograma']);
  selectdatosEmpresaExtranjera$ = this.select((state) => {
    return state['datosEmpresaExtranjera'].map((ele:any) => {
      return {
        ...ele,
        entidadFederativaEmpresaExt:
          state['paisesOrigen'].find(
            (paise:any) => paise.id === Number(ele.entidadFederativaEmpresaExt)
          )?.nombre || '',
      };
    });
  });

  selectDatosComplimento$ = this.select((state) => state['datosComplimentos']);

  //empresas-submanufacturer-estadaos
  datosSubcontratistaEstado$ = this.select((state) => {
    return state['empressaSubFabricantePlantas'].datosSubcontratista;
  });
  plantasSubfabricantesAgregar$ = this.select((state) => {
    return state['empressaSubFabricantePlantas'].plantasSubfabricantesAgregar;
  });
  plantasBuscadas$ = this.select((state) => {
    return state['empressaSubFabricantePlantas'].plantasBuscadas;
  });

  plantasPorCompletar$ = this.select((state) => {
    return state['empressaSubFabricantePlantas'].plantasPorCompletar;
  });

  //annexo-dos-tres-queries

  anexoDosTableLista$ = this.select((state) => {
    return state['annexoDosTres'].anexoDosTablaLista
  });

  anexoTresTablaLista$ = this.select((state) => {
    return state['annexoDosTres'].anexoTresTablaLista
  });

  indicePrevioRuta$ = this.select((state) => {
    return state['indicePrevioRuta'];
  });

  selectTablaDatosComplimentos$ = this.select(
    (state) => state['tablaDatosComplimentos']
  );
  selectTablaDatosComplimentosExtranjera$ = this.select(
    (state) => state['tablaDatosComplimentosExtranjera']
  );

  selectImportarTablsDatos$ = this.select(
    (state) => state['annexoUno'].importarDatosTabla
  );
  selectExportarTablsDatos$ = this.select(
    (state) => state['annexoUno'].exportarDatosTabla
  );
  selectDatosParaNavegar$ = this.select(
    (state) => state['annexoUno'].datosParaNavegar
  );

  selectDatosFederatarios$ = this.select(
    (state) => state['tablaDatosFederatarios']
  );
  /**
   *  * compodoc
   * @constructor
   * @description Constructor que inicializa la consulta con el store correspondiente.
   * @param {ComplementosSeccionStore} store - El store que contiene el estado de la sección de complementos.
   */
  constructor(protected override store: ComplementosSeccionStore) {
    super(store);
  }
}