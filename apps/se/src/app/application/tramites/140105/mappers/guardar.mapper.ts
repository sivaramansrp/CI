import { DesistimientoDePermisoState } from '../estados/desistimiento-de-permiso.store';

export function buildGuardarPayload(solicitudState: DesistimientoDePermisoState): unknown {
    return {
        "tipoDeSolicitud": "guardar",
        "idSolicitud": 0,
        "idTipoTramite": 140105,
        "rfc": solicitudState.rfc || "",
        "cveUnidadAdministrativa": "1401",
        "costoTotal": 0,
        "certificadoSerialNumber": "",
        "certificado": "",
        "numeroFolioTramiteOriginal": "",
        "nombre": solicitudState.nombre || "",
        "apPaterno": solicitudState.apPaterno || "",
        "apMaterno": solicitudState.apMaterno || "",
        "telefono": solicitudState.telefono || "",
        "solicitud": {
            "tipoDesistimiento": solicitudState.tipoDesistimiento || "",
            "motivoDesistimiento": solicitudState.motivoCancelacion || "",
            "numeroPermiso": solicitudState.numeroPermiso || "",
            "fechaDesistimiento": solicitudState.fechaDesistimiento || "",
            "observaciones": solicitudState.observaciones || ""
        }
    };
}

export function buildEnviarPayload(solicitudState: DesistimientoDePermisoState): unknown {
    return {
        "tipoDeSolicitud": "enviar",
        "idSolicitud": solicitudState.idSolicitud,
        "idTipoTramite": 140105,
        "rfc": solicitudState.rfc || "",
        "certificadoSerialNumber": solicitudState.certificadoSerialNumber || "",
        "certificado": solicitudState.certificado || "",
        "solicitud": {
            "tipoDesistimiento": solicitudState.tipoDesistimiento || "",
            "motivoDesistimiento": solicitudState.motivoCancelacion || "",
            "numeroPermiso": solicitudState.numeroPermiso || "",
            "fechaDesistimiento": solicitudState.fechaDesistimiento || "",
            "observaciones": solicitudState.observaciones || ""
        }
    };
}