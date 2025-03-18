import { Tramite80102State, Tramite80102Store } from './tramite80102.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite80102Query extends Query<Tramite80102State> {
  selectInfoRegistro$ = this.select((state) => state.infoRegistro);

  selectServicios$ = this.select((state) => state.servicios);

  selectEmpresas$ = this.select((state) => state.empresas);

  selectAduanaDeIngreso$ = this.select((state) => state.aduanaDeIngreso);

  selectDatosImmex$ = this.select((state) => state.datosImmex);

  selectDatos$ = this.select((state) => state.datos);

  selectAduanaDeIngresoSelecion$ = this.select(
    (state) => state.aduanaDeIngresoSelecion
  );

  FormaValida$ = this.select((state) => {
    return Object.values(state.formaValida).every((value) => value === true);
  });

  selectPaisesOrigen$ = this.select((state) => state.paisesOrigen);

  selectRfcEmpresa$ = this.select((state) => state.rfcEmpresa);
  selectNumeroPrograma$ = this.select((state) => state.numeroPrograma);
  selectTiempoPrograma$ = this.select((state) => state.tiempoPrograma);
  selectdatosEmpresaExtranjera$ = this.select((state) => {
    return state.datosEmpresaExtranjera.map((ele) => {
      return {
        ...ele,
        entidadFederativaEmpresaExt:
          state.paisesOrigen.find(
            (paise) => paise.id === Number(ele.entidadFederativaEmpresaExt)
          )?.nombre || '',
      };
    });
  });

  selectDatosComplimento$ = this.select((state) => state.datosComplimentos);

  //empresas-submanufacturer-estadaos
  datosSubcontratistaEstado$ = this.select((state) => {
    return state.empressaSubFabricantePlantas.datosSubcontratista;
  });
  plantasSubfabricantesAgregar$ = this.select((state) => {
    return state.empressaSubFabricantePlantas.plantasSubfabricantesAgregar;
  });
  plantasBuscadas$ = this.select((state) => {
    return state.empressaSubFabricantePlantas.plantasBuscadas;
  });

  plantasPorCompletar$ = this.select((state) => {
    return state.empressaSubFabricantePlantas.plantasPorCompletar;
  });

  //annexo-dos-tres-queries

  anexoDosTableLista$ = this.select((state) => {
    return state.annexoDosTres.anexoDosTablaLista
  });

  anexoTresTablaLista$ = this.select((state) => {
    return state.annexoDosTres.anexoTresTablaLista
  });

  indicePrevioRuta$ = this.select((state) => {
    return state.indicePrevioRuta;
  });

  selectTablaDatosComplimentos$ = this.select(
    (state) => state.tablaDatosComplimentos
  );
  selectTablaDatosComplimentosExtranjera$ = this.select(
    (state) => state.tablaDatosComplimentosExtranjera
  );

  selectImportarTablsDatos$ = this.select(
    (state) => state.annexoUno.importarDatosTabla
  );
  selectExportarTablsDatos$ = this.select(
    (state) => state.annexoUno.exportarDatosTabla
  );
  selectDatosParaNavegar$ = this.select(
    (state) => state.annexoUno.datosParaNavegar
  );

  selectDatosFederatarios$ = this.select(
    (state) => state.tablaDatosFederatarios
  );

  constructor(protected override store: Tramite80102Store) {
    super(store);
  }
}
