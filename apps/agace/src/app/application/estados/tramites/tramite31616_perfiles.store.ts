import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Solicitud31616PerfilesState {
  procedimientoDocumentado: string;
  indiqueNumero: string;
  cargosFunciones: string;
  casoContratarse: string;
  casoContar: string;
  describirProcedimiento: string;
  indiqueMecanismos: string;
  indicarEmpleados: string;
  indiqueIdentifica: string;
  describaEmpresa: string;
  indiqueAsegura: string;
  procedimientoParaControl: string;
  senaleRegistros: string;
  senaleQuien: string;
  describaRecepion: string;
  indiqueEncargado: string;
  indiqueIdentfica: string;
  senaleComo: string;
  describaCaracteristicas: string;
  senaleAccion: string;
  indiqueLleva: string;
  describaProcedimiento: string;
  indiqueSocios: string;
  indiqueForma: string;
  indiqueExisten: string;
  indiqueCuenta: string;
  procedimientoRealizar: string;
  indiquePeriodicidad: string;
  describaComo: string;
  comoAseguran: string;
  indiqueFormatos: string;
  senalarMedidas: string;
  indiqueAlmacenes: string;
  expliqueBrevemente: string;
  indiqueCerciora: string;
  indiqueEstos: string;
  indiquePertenecen: string;
  indiqueResponsable: string;
  indiqueTecnologia: string;
  describirProcesamiento: string;
  detalleComo: string;
  indiqueUtiliza: string;
  detalleValida: string;
  comoNumero: string;
  senaleAsociados: string;

  indiqueMateriales: string;
  queForma: string;
  personalResponsable: string;
  indiqueCuantas: string;
  indiqueMonitoreadas: string;
  detalleExisten: string;
  describaAcceso: string;
  describirTipo: string;
  describaAreas: string;
  senaleMismas: string;
  casoNoContar: string;
  periodicidadVerifica: string;
  indiqueTareas: string;
  describaManera: string;
  indiqueSepara: string;
  senaleRestringido: string;
  describaMonitoreo: string;
  responsablesControlar: string;
  estacionamientos: string;
  llevaEntrada: string;
  politicasMecanismos: string;
  procedimientoOperacion: string;
  senaleEncuentran: string;
  mencioneCuenta: string;
  queManera: string;
  describaContactar: string;
  indiqueOperativo: string;
  indiqueAparatos: string;
  mantenimiento: string;
  politicasAparatos: string;
  programaMantenimiento: string;
  indiqueRespaldo: string;
  describaAlarma: string;
  indiqueUtilizan: string;
  describaSistemas: string;
  indicarCamaras: string;
  mencioneInspeccion: string;
  senalarUbicacion: string;
  indiqueHorarios: string;
  indiqueRevisan: string;
  indiqueDesignado: string;
  comoDocumentan: string;
  indiqueTiempo: string;
  contarPlanta: string;
  estosSistemas: string;
  indicarCircuito: string;
  describaImplementado: string;
  formaControlan: string;

}

export function createInitialState(): Solicitud31616PerfilesState {
  return {
    procedimientoDocumentado: '',
    indiqueNumero: '',
    cargosFunciones: '',
    casoContratarse: '',
    casoContar: '',
    describirProcedimiento: '',
    indiqueMecanismos: '',
    indicarEmpleados: '',
    indiqueIdentifica: '',
    describaEmpresa: '',
    indiqueAsegura: '',
    procedimientoParaControl: '',
    senaleRegistros: '',
    senaleQuien: '',
    describaRecepion: '',
    indiqueEncargado: '',
    indiqueIdentfica: '',
    senaleComo: '',
    describaCaracteristicas: '',
    senaleAccion: '',
    indiqueLleva: '',
    describaProcedimiento: '',
    indiqueSocios: '',
    indiqueForma: '',
    indiqueExisten: '',
    indiqueCuenta: '',
    procedimientoRealizar: '',
    indiquePeriodicidad: '',
    describaComo: '',
    comoAseguran: '',
    indiqueFormatos: '',
    senalarMedidas: '',
    indiqueAlmacenes: '',
    expliqueBrevemente: '',
    indiqueCerciora: '',
    indiqueEstos: '',
    indiquePertenecen: '',
    indiqueResponsable: '',
    indiqueTecnologia: '',
    describirProcesamiento: '',
    detalleComo: '',
    indiqueUtiliza: '',
    detalleValida: '',
    comoNumero: '',
    senaleAsociados: '',
    indiqueMateriales: '',
    queForma: '',
    personalResponsable: '',
    indiqueCuantas: '',
    indiqueMonitoreadas: '',
    detalleExisten: '',
    describaAcceso: '',
    describirTipo: '',
    describaAreas: '',
    senaleMismas: '',
    casoNoContar: '',
    periodicidadVerifica: '',
    indiqueTareas: '',
    describaManera: '',
    indiqueSepara: '',
    senaleRestringido: '',
    describaMonitoreo: '',
    responsablesControlar: '',
    estacionamientos: '',
    llevaEntrada: '',
    politicasMecanismos: '',
    procedimientoOperacion: '',
    senaleEncuentran: '',
    mencioneCuenta: '',
    queManera: '',
    describaContactar: '',
    indiqueOperativo: '',
    indiqueAparatos: '',
    mantenimiento: '',
    politicasAparatos: '',
    programaMantenimiento: '',
    indiqueRespaldo: '',
    describaAlarma: '',
    indiqueUtilizan: '',
    describaSistemas: '',
    indicarCamaras: '',
    mencioneInspeccion: '',
    senalarUbicacion: '',
    indiqueHorarios: '',
    indiqueRevisan: '',
    indiqueDesignado: '',
    comoDocumentan: '',
    indiqueTiempo: '',
    contarPlanta: '',
    estosSistemas: '',
    indicarCircuito: '',
    describaImplementado: '',
    formaControlan: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite31616Perfiles', resettable: true })
export class Tramite31616PerfilesStore extends Store<Solicitud31616PerfilesState> {
  constructor() {
    super(createInitialState());
  }

  public setProcedimientoDocumentado(procedimientoDocumentado: string): void {
    this.update((state) => ({
      ...state,
      procedimientoDocumentado,
    }));
  }

  public setIndiqueNumero(indiqueNumero: string): void {
    this.update((state) => ({
      ...state,
      indiqueNumero,
    }));
  }

  public setCargosFunciones(cargosFunciones: string): void {
    this.update((state) => ({
      ...state,
      cargosFunciones,
    }));
  }

  public setCasoContratarse(casoContratarse: string): void {
    this.update((state) => ({
      ...state,
      casoContratarse,
    }));
  }

  public setCasoContar(casoContar: string): void {
    this.update((state) => ({
      ...state,
      casoContar,
    }));
  }

  public setDescribirProcedimiento(describirProcedimiento: string): void {
    this.update((state) => ({
      ...state,
      describirProcedimiento,
    }));
  }

  public setIndiqueMecanismos(indiqueMecanismos: string): void {
    this.update((state) => ({
      ...state,
      indiqueMecanismos,
    }));
  }

  public setIndicarEmpleados(indicarEmpleados: string): void {
    this.update((state) => ({
      ...state,
      indicarEmpleados,
    }));
  }

  public setIndiqueIdentifica(indiqueIdentifica: string): void {
    this.update((state) => ({
      ...state,
      indiqueIdentifica,
    }));
  }

  public setDescribaEmpresa(describaEmpresa: string): void {
    this.update((state) => ({
      ...state,
      describaEmpresa,
    }));
  }

  public setIndiqueAsegura(indiqueAsegura: string): void {
    this.update((state) => ({
      ...state,
      indiqueAsegura,
    }));
  }

  public setProcedimientoParaControl(procedimientoParaControl: string): void {
    this.update((state) => ({
      ...state,
      procedimientoParaControl,
    }));
  }

  public setSenaleRegistros(senaleRegistros: string): void {
    this.update((state) => ({
      ...state,
      senaleRegistros,
    }));
  }

  public setSenaleQuien(senaleQuien: string): void {
    this.update((state) => ({
      ...state,
      senaleQuien,
    }));
  }

  public setDescribaRecepion(describaRecepion: string): void {
    this.update((state) => ({
      ...state,
      describaRecepion,
    }));
  }

  public setIndiqueEncargado(indiqueEncargado: string): void {
    this.update((state) => ({
      ...state,
      indiqueEncargado,
    }));
  }

  public setIndiqueIdentfica(indiqueIdentfica: string): void {
    this.update((state) => ({
      ...state,
      indiqueIdentfica,
    }));
  }

  public setSenaleComo(senaleComo: string): void {
    this.update((state) => ({
      ...state,
      senaleComo,
    }));
  }

  public setDescribaCaracteristicas(describaCaracteristicas: string): void {
    this.update((state) => ({
      ...state,
      describaCaracteristicas,
    }));
  }

  public setSenaleAccion(senaleAccion: string): void {
    this.update((state) => ({
      ...state,
      senaleAccion,
    }));
  }

  public setIndiqueLleva(indiqueLleva: string): void {
    this.update((state) => ({
      ...state,
      indiqueLleva,
    }));
  }

  public setDescribaProcedimiento(describaProcedimiento: string): void {
    this.update((state) => ({
      ...state,
      describaProcedimiento,
    }));
  }

  public setIndiqueSocios(indiqueSocios: string): void {
    this.update((state) => ({
      ...state,
      indiqueSocios,
    }));
  }

  public setIndiqueForma(indiqueForma: string): void {
    this.update((state) => ({
      ...state,
      indiqueForma,
    }));
  }

  public setIndiqueExisten(indiqueExisten: string): void {
    this.update((state) => ({
      ...state,
      indiqueExisten,
    }));
  }

  public setIndiqueCuenta(indiqueCuenta: string): void {
    this.update((state) => ({
      ...state,
      indiqueCuenta,
    }));
  }

  public setProcedimientoRealizar(procedimientoRealizar: string): void {
    this.update((state) => ({
      ...state,
      procedimientoRealizar,
    }));
  }

  public setIndiquePeriodicidad(indiquePeriodicidad: string): void {
    this.update((state) => ({
      ...state,
      indiquePeriodicidad,
    }));
  }

  public setDescribaComo(describaComo: string): void {
    this.update((state) => ({
      ...state,
      describaComo,
    }));
  }

  public setComoAseguran(comoAseguran: string): void {
    this.update((state) => ({
      ...state,
      comoAseguran,
    }));
  }

  public setIndiqueFormatos(indiqueFormatos: string): void {
    this.update((state) => ({
      ...state,
      indiqueFormatos,
    }));
  }

  public setSenalarMedidas(senalarMedidas: string): void {
    this.update((state) => ({
      ...state,
      senalarMedidas,
    }));
  }

  public setIndiqueAlmacenes(indiqueAlmacenes: string): void {
    this.update((state) => ({
      ...state,
      indiqueAlmacenes,
    }));
  }

  public setExpliqueBrevemente(expliqueBrevemente: string): void {
    this.update((state) => ({
      ...state,
      expliqueBrevemente,
    }));
  }

  public setIndiqueCerciora(indiqueCerciora: string): void {
    this.update((state) => ({
      ...state,
      indiqueCerciora,
    }));
  }

  public setIndiqueEstos(indiqueEstos: string): void {
    this.update((state) => ({
      ...state,
      indiqueEstos,
    }));
  }

  public setIndiquePertenecen(indiquePertenecen: string): void {
    this.update((state) => ({
      ...state,
      indiquePertenecen,
    }));
  }

  public setIndiqueResponsable(indiqueResponsable: string): void {
    this.update((state) => ({
      ...state,
      indiqueResponsable,
    }));
  }

  public setIndiqueTecnologia(indiqueTecnologia: string): void {
    this.update((state) => ({
      ...state,
      indiqueTecnologia,
    }));
  }

  public setDescribirProcesamiento(describirProcesamiento: string): void {
    this.update((state) => ({
      ...state,
      describirProcesamiento,
    }));
  }

  public setDetalleComo(detalleComo: string): void {
    this.update((state) => ({
      ...state,
      detalleComo,
    }));
  }

  public setIndiqueUtiliza(indiqueUtiliza: string): void {
    this.update((state) => ({
      ...state,
      indiqueUtiliza,
    }));
  }

  public setDetalleValida(detalleValida: string): void {
    this.update((state) => ({
      ...state,
      detalleValida,
    }));
  }

  public setComoNumero(comoNumero: string): void {
    this.update((state) => ({
      ...state,
      comoNumero,
    }));
  }

  public setSenaleAsociados(senaleAsociados: string): void {
    this.update((state) => ({
      ...state,
      senaleAsociados,
    }));
  }

  public setIndiqueMateriales(indiqueMateriales: string): void {
    this.update((state) => ({
      ...state,
      indiqueMateriales,
    }));
  }

  public setQueForma(queForma: string): void {
    this.update((state) => ({
      ...state,
      queForma,
    }));
  }

  public setPersonalResponsable(personalResponsable: string): void {
    this.update((state) => ({
      ...state,
      personalResponsable,
    }));
  }

  public setIndiqueCuantas(indiqueCuantas: string): void {
    this.update((state) => ({
      ...state,
      indiqueCuantas,
    }));
  }

  public setIndiqueMonitoreadas(indiqueMonitoreadas: string): void {
    this.update((state) => ({
      ...state,
      indiqueMonitoreadas,
    }));
  }

  public setDetalleExisten(detalleExisten: string): void {
    this.update((state) => ({
      ...state,
      detalleExisten,
    }));
  }

  public setDescribaAcceso(describaAcceso: string): void {
    this.update((state) => ({
      ...state,
      describaAcceso,
    }));
  }

  public setDescribirTipo(describirTipo: string): void {
    this.update((state) => ({
      ...state,
      describirTipo,
    }));
  }

  public setDescribaAreas(describaAreas: string): void {
    this.update((state) => ({
      ...state,
      describaAreas,
    }));
  }

  public setSenaleMismas(senaleMismas: string): void {
    this.update((state) => ({
      ...state,
      senaleMismas,
    }));
  }

  public setCasoNoContar(casoNoContar: string): void {
    this.update((state) => ({
      ...state,
      casoNoContar,
    }));
  }
  
  public setPeriodicidadVerifica(periodicidadVerifica: string): void {
    this.update((state) => ({
      ...state,
      periodicidadVerifica,
    }));
  }
  
  public setIndiqueTareas(indiqueTareas: string): void {
    this.update((state) => ({
      ...state,
      indiqueTareas,
    }));
  }
  
  public setDescribaManera(describaManera: string): void {
    this.update((state) => ({
      ...state,
      describaManera,
    }));
  }
  
  public setIndiqueSepara(indiqueSepara: string): void {
    this.update((state) => ({
      ...state,
      indiqueSepara,
    }));
  }

  public setSenaleRestringido(senaleRestringido: string): void {
    this.update((state) => ({
      ...state,
      senaleRestringido,
    }));
  }
  
  public setDescribaMonitoreo(describaMonitoreo: string): void {
    this.update((state) => ({
      ...state,
      describaMonitoreo,
    }));
  }
  
  public setResponsablesControlar(responsablesControlar: string): void {
    this.update((state) => ({
      ...state,
      responsablesControlar,
    }));
  }
  
  public setEstacionamientos(estacionamientos: string): void {
    this.update((state) => ({
      ...state,
      estacionamientos,
    }));
  }
  
  public setLlevaEntrada(llevaEntrada: string): void {
    this.update((state) => ({
      ...state,
      llevaEntrada,
    }));
  }

  public setPoliticasMecanismos(politicasMecanismos: string): void {
    this.update((state) => ({
      ...state,
      politicasMecanismos,
    }));
  }
  
  public setProcedimientoOperacion(procedimientoOperacion: string): void {
    this.update((state) => ({
      ...state,
      procedimientoOperacion,
    }));
  }
  
  public setSenaleEncuentran(senaleEncuentran: string): void {
    this.update((state) => ({
      ...state,
      senaleEncuentran,
    }));
  }
  
  public setMencioneCuenta(mencioneCuenta: string): void {
    this.update((state) => ({
      ...state,
      mencioneCuenta,
    }));
  }
  
  public setQueManera(queManera: string): void {
    this.update((state) => ({
      ...state,
      queManera,
    }));
  }

  public setDescribaContactar(describaContactar: string): void {
    this.update((state) => ({
      ...state,
      describaContactar,
    }));
  }
  
  public setIndiqueOperativo(indiqueOperativo: string): void {
    this.update((state) => ({
      ...state,
      indiqueOperativo,
    }));
  }
  
  public setIndiqueAparatos(indiqueAparatos: string): void {
    this.update((state) => ({
      ...state,
      indiqueAparatos,
    }));
  }
  
  public setMantenimiento(mantenimiento: string): void {
    this.update((state) => ({
      ...state,
      mantenimiento,
    }));
  }
  
  public setPoliticasAparatos(politicasAparatos: string): void {
    this.update((state) => ({
      ...state,
      politicasAparatos,
    }));
  }
  
  public setProgramaMantenimiento(programaMantenimiento: string): void {
    this.update((state) => ({
      ...state,
      programaMantenimiento,
    }));
  }
  
  public setIndiqueRespaldo(indiqueRespaldo: string): void {
    this.update((state) => ({
      ...state,
      indiqueRespaldo,
    }));
  }
  
  public setDescribaAlarma(describaAlarma: string): void {
    this.update((state) => ({
      ...state,
      describaAlarma,
    }));
  }
  
  public setIndiqueUtilizan(indiqueUtilizan: string): void {
    this.update((state) => ({
      ...state,
      indiqueUtilizan,
    }));
  }
  
  public setDescribaSistemas(describaSistemas: string): void {
    this.update((state) => ({
      ...state,
      describaSistemas,
    }));
  }

  public setIndicarCamaras(indicarCamaras: string): void {
    this.update((state) => ({
      ...state,
      indicarCamaras,
    }));
  }
  
  public setMencioneInspeccion(mencioneInspeccion: string): void {
    this.update((state) => ({
      ...state,
      mencioneInspeccion,
    }));
  }
  
  public setSenalarUbicacion(senalarUbicacion: string): void {
    this.update((state) => ({
      ...state,
      senalarUbicacion,
    }));
  }
  
  public setIndiqueHorarios(indiqueHorarios: string): void {
    this.update((state) => ({
      ...state,
      indiqueHorarios,
    }));
  }
  
  public setIndiqueRevisan(indiqueRevisan: string): void {
    this.update((state) => ({
      ...state,
      indiqueRevisan,
    }));
  }
  
  public setIndiqueDesignado(indiqueDesignado: string): void {
    this.update((state) => ({
      ...state,
      indiqueDesignado,
    }));
  }
  
  public setComoDocumentan(comoDocumentan: string): void {
    this.update((state) => ({
      ...state,
      comoDocumentan,
    }));
  }
  
  public setIndiqueTiempo(indiqueTiempo: string): void {
    this.update((state) => ({
      ...state,
      indiqueTiempo,
    }));
  }
  
  public setContarPlanta(contarPlanta: string): void {
    this.update((state) => ({
      ...state,
      contarPlanta,
    }));
  }
  
  public setEstosSistemas(estosSistemas: string): void {
    this.update((state) => ({
      ...state,
      estosSistemas,
    }));
  }
  
  public setIndicarCircuito(indicarCircuito: string): void {
    this.update((state) => ({
      ...state,
      indicarCircuito,
    }));
  }
  
  public setDescribaImplementado(describaImplementado: string): void {
    this.update((state) => ({
      ...state,
      describaImplementado,
    }));
  }
  
  public setFormaControlan(formaControlan: string): void {
    this.update((state) => ({
      ...state,
      formaControlan,
    }));
  }
}
