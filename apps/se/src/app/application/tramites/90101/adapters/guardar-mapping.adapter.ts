/**
 * @fileoverview
 * Este archivo contiene el servicio adaptador para convertir entre el estado de Akita y los formatos de payload de API
 * para el trámite de ampliación de servicios 80205.
 */

import { Injectable } from '@angular/core';
import { ProsecState } from '../estados/autorizacion-prosec.store';

@Injectable({
  providedIn: 'root',
})
export class GuardarMappingAdapter {
  /**
   * Convierte del estado de Akita al formato de payload de API usando las mismas claves
   * @param state El estado actual de Akita
   * @returns Payload formateado para la API
   */

  static toFormPayload(state: ProsecState): unknown {
    return {
      solicitud: {
        idSolicitud: null,
        tipoSolicitud: 1,
        programaProsec: {
          idProgramaAutorizado: 90101,
        },
        discriminatorValue: 90101,
        solicitante: {
          rfc: 'AAL0409235E6',
          razonSocial: 'INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV',
          descripcionGiro: 'Siembra, cultivo y cosecha de otros cultivos',
          correoElectronico: 'vucem2021@gmail.com',
          cveUsuario: 'AAL0409235E6',
          domicilio: {
            pais: {
              clave: 'MEX',
              nombre: 'ESTADOS UNIDOS MEXICANOS',
            },
            entidadFederativa: {
              clave: 'SIN',
              nombre: 'SINALOA',
            },
            delegacionMunicipio: {
              clave: '25001',
              nombre: 'AHOME',
            },
            colonia: {
              clave: '00181210001',
              nombre: 'MIGUEL HIDALGO',
            },
            localidad: {
              clave: '00181210008',
              nombre: 'LOS MOCHIS',
            },
            codigoPostal: '81210',
            calle: 'CAMINO VIEJO',
            numeroExterior: '1353',
            numeroInterior: '',
            telefono: '55-98764532',
          },
        },
        cveRolCapturista: 'PersonaMoral',
        cveUsuarioCapturista: 'AAL0409235E6',
        modalidad: 'Productor directo',
        representacionesFederales: state.RepresentacionFederal,
        actividadProductivaProsec: state.ActividadProductiva,
        actividadProductiva: state.ActividadProductiva,
        fraccion: '',
        rfc: '',
      },
      plantasSeleccionadas: state.prosecDatos.map(plantas => ({
        idPlanta: plantas.calle,
      })),
      PROSECSector: [],
      folioPrograma: '',
      fechaFinVigencia: '',
      anioPrograma: '',
      idSolicitudSeleccionada: '',
      inicio: 1,
      repFedSol: '',
      discriminador: '',
      puedeCapturarRepresentanteLegalCG: false,
      entidadFederativaDomicilios: 'SIN',
      mensajeActivado: '',
      sectoresProsecConf: 'XIXa',
      seleccionar: 50,
    };
  }
}
