package mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.service;

import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.model.SolicitudDigitalizarDocumento;
import mx.gob.ventanillaunica.www.common.domain.model.Persona;
import mx.gob.ventanillaunica.www.common.exception.SolicitudException;
import mx.gob.ventanillaunica.www.common.exception.SolicitudNoGuardadaException;
import mx.gob.ventanillaunica.www.common.service.RegistroSolicitudDigiServices;

import com.softtek.idc.exception.ContribuyenteInactivoException;
import com.softtek.idc.exception.ContribuyenteNoEncontradoException;
import com.softtek.idc.exception.IDCException;
import com.softtek.idc.exception.IDCNoDisponibleException;
import com.softtek.idc.exception.RFCNoVigenteException;

public interface RegistroDigitalizarDocumentosServices extends RegistroSolicitudDigiServices<SolicitudDigitalizarDocumento> {
	SolicitudDigitalizarDocumento obtenerSolicitud(Long idSolicitud);
	SolicitudDigitalizarDocumento guardar(SolicitudDigitalizarDocumento solicitud) throws SolicitudException, SolicitudNoGuardadaException;
	void guardaPersonaDocumento(Long idPersona, String idDocumento);
	//Long obtenerPersonaCvePorRFC(String RFC);
	Persona consultarPersonaEnIDC(String rfc) throws IDCNoDisponibleException, IDCException,
		ContribuyenteNoEncontradoException, ContribuyenteInactivoException, RFCNoVigenteException;
	void replicaDD(String folioTramite);
}
