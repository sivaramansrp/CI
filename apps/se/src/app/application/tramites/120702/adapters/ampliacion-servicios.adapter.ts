import { Injectable } from '@angular/core';
import { Solicitud120702State } from '../estados/tramite120702.store';






@Injectable({
  providedIn: 'root'
})
export class AmpliacionServiciosAdapter {


 toFormGuardarPayload(datos: any): any {
     const PAYLOAD = {
  "solicitante": {
    "rfc": "AAL0409235E6",
    "nombre": "ACEROS ALVARADO S.A. DE C.V.",
    "actividad_economica": "Fabricación de productos de hierro y acero",
    "correo_electronico": "contacto@acerosalvarado.com",
    "razonSocial": "INTEGRADORA",
    "domicilio": {
      "pais": "México",
      "codigoPostal": "03100",
      "estado": "26",
      "delegacionMunicipio": "Benito Juárez",
      "localidad": "REGION ARROYO SECO",
      "colonia": "Del Valle",
      "calle": "Av. Insurgentes Sur",
      "numeroExterior": "1234",
      "numeroInterior": "A",
      "lada": "1234",
      "telefono": "12345678"
    }
  },
  "asignacion": {
    "añoAutorizacion": datos.añoAutorizacion,
    "montoDisponible": 100,
    "idAsignacion": datos.idAsignacion,
    "mecanismoAsignacion": {
      "requiereImportador": datos?.requiereImportador,
      "requiereProductor": datos?.requiereProductor,
      "fraccionesPorExpedir": datos?.fraccionesPorExpedir,
      "cupo": {
        "tratadoAcuerdo": {
          "clave": ""
        }
      },
      "idMecanismoAsignacion":datos.participante?.idMecanismoAsignacion,
      "solicitarMercancia": datos?.solicitarMercancia
    },
    "expediciones": [
        {
            "cantidad": 50
        },
        {
            "cantidad": 50
        }
    ]
  },
  "numFolioAsignacionAux": datos?.numFolioAsignacion,
  "unidadAdministrativaRepresentacionFederal": {
    "entidadFederativa": {
      "nombre": "",
      "clave": ""
    },
    "nombre": "",
    "clave": ""
  },
  "importador": {
    "nombre": "",
    "domicilio": {
      "informacionExtra": ""
    },
    "idPersonaSolicitud": "",
    "idSolicitud": ""
  },
  "productorCupos": {
    "nombre": "",
    "domicilio": {
      "informacionExtra": ""
    },
    "idPersonaSolicitud":datos?.idPersonaSolicitud,
    "idSolicitud": ""
  }
}
return PAYLOAD;
 }




}