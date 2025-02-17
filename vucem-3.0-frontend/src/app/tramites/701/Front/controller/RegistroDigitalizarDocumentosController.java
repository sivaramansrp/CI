package mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.controller;

import java.io.File;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.constants.ControllerUrlBindingConstantsDigitalizarDocumentos;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.constants.DigitalizarDocumentosConstants;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.constants.JspPagesConstantsDigitalizarDocumentos;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.helper.DigitalizarDocumentosHelper;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.model.SolicitudDigitalizarDocumento;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.rule.DigitalizarDocumentosRules;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.service.RegistroDigitalizarDocumentosServices;
import mx.gob.ventanillaunica.www.common.catalogs.model.TipoDocumento;
import mx.gob.ventanillaunica.www.common.catalogs.model.TipoTramite;
import mx.gob.ventanillaunica.www.common.common.MultiFormatReportVU;
import mx.gob.ventanillaunica.www.common.constant.CommonConstants;
import mx.gob.ventanillaunica.www.common.constant.JspPagesConstansRegistroSolicitud;
import mx.gob.ventanillaunica.www.common.constant.gobmx.JspPagesConstansRegistroSolicitudGobMx;
import mx.gob.ventanillaunica.www.common.constant.ReportesCommonConstans;
import mx.gob.ventanillaunica.www.common.controller.RegistroSolicitudDigiController;
import mx.gob.ventanillaunica.www.common.digitalization.model.DocumentosRequeridos;
import mx.gob.ventanillaunica.www.common.domain.constant.ClasificacionDocumentos;
import mx.gob.ventanillaunica.www.common.domain.constant.EstadoDocumentoOficial;
import mx.gob.ventanillaunica.www.common.domain.model.DocumentoOficialDigi;
import mx.gob.ventanillaunica.www.common.domain.model.ElementoWizard;
import mx.gob.ventanillaunica.www.common.domain.model.Firma;
import mx.gob.ventanillaunica.www.common.domain.model.Persona;
import mx.gob.ventanillaunica.www.common.service.RegistroSolicitudDigiServices;
import mx.gob.ventanillaunica.www.common.service.ReportesDigiServices;
import net.sourceforge.stripes.action.ForwardResolution;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.action.UrlBinding;
import net.sourceforge.stripes.action.Wizard;
import net.sourceforge.stripes.ajax.JavaScriptResolution;
import net.sourceforge.stripes.integration.spring.SpringBean;

import com.softtek.exception.BusinessException;
import com.softtek.report.model.ReportFormat;
import com.softtek.token.annotation.VerifyRequestToken;
import com.softtek.user.model.VuUserProfile;
import com.softtek.web.annotation.SkipExceptionPage;
 
/**
  * Controller para el tramite de digitalizar documentos.
  * @author david.ortiz
  */

@Wizard(startEvents = {"iniciar", "mostrar", "filtrarArchivosGenerales", "filtrarArchivosEspecificos","comboArchivosEspecificos", 
		"buscarUsuarioIDCVU","cargarListDoctosEspecificos","guardarTipoDoctosPorTramite"})
public @UrlBinding(ControllerUrlBindingConstantsDigitalizarDocumentos.REGISTRO_DIGITALIZAR_DOCUMENTOS_URL_BINDING)
		class RegistroDigitalizarDocumentosController extends RegistroSolicitudDigiController<SolicitudDigitalizarDocumento> {

	@SpringBean
	private DigitalizarDocumentosHelper digitalizarDocumentosHelper;
	
	@SpringBean
	private RegistroDigitalizarDocumentosServices registroDigitalizarDocumentosServices;

	private SolicitudDigitalizarDocumento solicitud = new SolicitudDigitalizarDocumento();    

	private List<TipoDocumento> listDoctosEspecificos;

	private @SpringBean
	ReportesDigiServices reportesServices;

	private @SpringBean
	MultiFormatReportVU acuseDocumentoDD;

	private @SpringBean
	DigitalizarDocumentosRules digitalizarDocumentosRules;
	
	/**
	 * Guarda la solicitud, este metodo se ejecuta cuado seleccionamos el boton siguiente en la
	 * sección de solicitante.
	 */
	@Override
	@SkipExceptionPage
	public Resolution guardar() throws BusinessException {
		super.guardar();
		logger.debug("==== SolId en guardar[{}]",getSolicitud().getIdSolicitud()); 
		getContext().storeIntoSession(JspPagesConstansRegistroSolicitud.ID_SOLICITUD, getSolicitud().getIdSolicitud());
		return super.terminaGuardar();
	}

	/**
	 * Este metodo se ejecuta cuando una solicitud queda pendiente y desde la bandeja seleccionamos
	 * la solicitud para terminar con el proceso.
	 */
	@Override
	public Resolution mostrar() throws BusinessException {     
		logger.debug("==== SolId[{}]",getSolicitud().getIdSolicitud());  
		super.mostrar();                     
		return new ForwardResolution(getJspCaptura());       
	}
	
	/**
	 * Este metodo nos direcciona a la pagina correspondiente para realizar 
	 * la seleccion del tipo de documento.
	 */
	@Override    
	@SkipExceptionPage
	public Resolution cargarTiposDocumentos() throws BusinessException {  
		getRegistroSolicitudServices().verificarTipoDoctosSolicitud(getSolicitud());
		setElementosWizard(ElementoWizard.TIPODOCUMENTO);
		return new ForwardResolution(JspPagesConstantsDigitalizarDocumentos.FILTRO_DOCUMENTOS_DIGITALIZAR_DOCUMENTOS);
	}
	
	/**
	 * Este metodo se ejecuta cuando se carga la pantalla que muestra los tipos de documentos disponibles
	 * y los tipos de documentos que puedieron haber sido seleccionados en un intento de registro previo. 
	 */
	@Override
	@SkipExceptionPage(newExceptionPage = JspPagesConstansRegistroSolicitud.ARCHIVOS)
	public Resolution filtrarArchivosEspecificos() throws BusinessException {
		TipoTramite tipoTramite = new TipoTramite(getRegistroSolicitudServices().
				buscarIdTipoTramitePorIdSol(getSolicitud().getIdSolicitud())); 
		List<TipoDocumento> documentosEspecificos = new LinkedList<TipoDocumento>(); 
		logger.debug(getSolicitud().getEsNuevo());
		if(getSolicitud().getEsNuevo().equals(CommonConstants.NO)){
			Long idSol = (Long)getContext().retrieveFromSession(JspPagesConstansRegistroSolicitud.ID_SOLICITUD, false);
			documentosEspecificos = 
				getRegistroSolicitudServices().obtenerDocumentosPorTipoTramite(idSol,tipoTramite, 
						DigitalizarDocumentosConstants.ID_DOCUMENTOS_ESPECIFICOS, 
						ClasificacionDocumentos.CLSDO_RQ);
		}

		getContext().getResponse().setCharacterEncoding("UTF-8");

		return new JavaScriptResolution(documentosEspecificos);
	}
	
	/**
	 * Colocamos en session la lista de tipos de documento que fueron seleccionados.
	 */
	@Override
	public Resolution cargarListDoctosEspecificos() {		
		this.getContext().storeIntoSession(CommonConstants.VARIABLE_SESSION_LISTA_DOCTOS_ESPECIFICOS, this.listDoctosEspecificos);
		return null;
	}
	
	//Se hace override a este metodo para que no cargue doctos generales
	@Override
	@SkipExceptionPage(newExceptionPage = JspPagesConstansRegistroSolicitud.ARCHIVOS)
	public Resolution filtrarArchivosGenerales() throws BusinessException {                                    
		List<TipoDocumento> documentosGenerales = new LinkedList<TipoDocumento>();         
		getContext().getResponse().setCharacterEncoding("UTF-8");
		return new JavaScriptResolution(documentosGenerales);
	}
	
	/**
	 * Guarda los tipos de documentos seleccionados y redirecciona a la pantalla correspondiente
	 * para adjuntar los documentos y asociar rfc's de consulta a cada documentos adjuntado.
	 */
	@Override
	@VerifyRequestToken
	@SkipExceptionPage(newExceptionPage = JspPagesConstansRegistroSolicitud.ARCHIVOS)
    public Resolution guardarTipoDoctosPorTramite() throws BusinessException {
    	return super.guardarTipoDoctosPorTramite();
  	}
	
	/**
     * Verifica que un determinado rfc exista en base de datos, si no existe se busca 
     * en IDC y se inserta en la base de datos de vucem.
     * 
     * @return
     * @throws BusinessException
     */
	@SkipExceptionPage
	public Resolution buscarUsuarioIDCVU() throws BusinessException {
		getContext().getResponse().setCharacterEncoding("UTF-8");
		String msgError = "";
		List<TipoDocumento> documentoUsuario = new LinkedList<TipoDocumento>();      
		TipoDocumento tipoDocumento = new TipoDocumento();
		
		Persona persona = null;

		try {
			
			VuUserProfile userProfile = (VuUserProfile) getUserProfile();
			
			if(solicitud.getRfc() != null && !solicitud.getRfc().trim().equals("")){
				String strRfc = digitalizarDocumentosHelper.unescape(solicitud.getRfc());
				solicitud.setRfc(strRfc);
				
				digitalizarDocumentosRules.validaRFCConsulta(solicitud.getRfc());
				digitalizarDocumentosRules.verificaRFCSolicitanteConRFCConsulta(solicitud.getRfc(), userProfile.getPersona().getClaveUsuario());
				
				//persona = usuariosServices.obtenerPersonaParaCapturaGubernamental(solicitud.getRfc().toUpperCase());
				persona = this.registroDigitalizarDocumentosServices.consultarPersonaEnIDC(solicitud.getRfc().toUpperCase());
				logger.debug("RFC de consulta:[{}] para la solicitud: [{}]" , solicitud.getRfc().toUpperCase(), solicitud.getIdSolicitud());
				//Long cvePersona = registroDigitalizarDocumentosServices.obtenerPersonaCvePorRFC(persona.getRfc().toUpperCase());
			}

			if(persona!=null){

				if(persona.getRazonSocial()!=null){
					tipoDocumento.setNombreCompleto(persona.getRazonSocial());
					tipoDocumento.setCvePersona(persona.getIdPersona());
				}else{
					StringBuffer nombreCompletoDocumento = new StringBuffer(persona.getNombre())
						.append(" ")
						.append(persona.getApellidoPaterno())
						.append(" ")
						.append(persona.getApellidoMaterno());
					
					
					tipoDocumento.setNombreCompleto(nombreCompletoDocumento.toString());
					tipoDocumento.setCvePersona(persona.getIdPersona());
				}

				documentoUsuario.add(tipoDocumento);
			}

		} /*catch(ContribuyenteInactivoException e3) {
			msgError = e3.getMessage();
			return new JavaScriptResolution(msgError);
		}
		catch (RFCException rfcException) {
			msgError = rfcException.getMessage();
			return new JavaScriptResolution(msgError);
		}
		catch (MismoRFCException mismoRFCException) {
			msgError = mismoRFCException.getMessage();
			return new JavaScriptResolution(msgError);
		}*/ catch (BusinessException ex) {
			logger.debug("BusinessException getMessage[{}] ", ex.getMessage());
			msgError = ex.getMessage();
			return new JavaScriptResolution(msgError);
		} 

		return new JavaScriptResolution(documentoUsuario);
	}

	@Override    
	@SkipExceptionPage
	public Resolution mostrarFirma() throws BusinessException {

		setFirma(new Firma(new Date()));
		getFirma().setCadenaOriginal(getRegistroSolicitudServices().generaCadenaOriginal( getSolicitud(), getFirma().getFechaFirma()));
		if(getSolicitud().getDocumentosRequeridos() != null && getSolicitud().getDocumentosRequeridos().size()!=0){
			for(DocumentosRequeridos doctoReq:getSolicitud().getDocumentosRequeridos()){
				logger.debug("mostrarFirma............");
				logger.debug("Documentos a persistir idDocto [{}] cveUsuario[{}]", doctoReq.getIdDocumentoSeleccionado() , doctoReq.getCvePersona());
				registroDigitalizarDocumentosServices.guardaPersonaDocumento(doctoReq.getCvePersona(), doctoReq.getIdDocumentoSeleccionado());
			}
		}
		setElementosWizard(ElementoWizard.FIRMAR);
		return new ForwardResolution(JspPagesConstansRegistroSolicitudGobMx.FIRMA);
	}
	
	@Override
	@SkipExceptionPage(newExceptionPage = JspPagesConstansRegistroSolicitudGobMx.FIRMA)
	@VerifyRequestToken
    public Resolution firmar() throws BusinessException {
    	Resolution resolucion =	super.firmar();
	    String folioTramite = (String) getContext().retrieveFromSession(JspPagesConstansRegistroSolicitud.NUM_FOLIO_TRAMITE, false);
	    registroDigitalizarDocumentosServices.replicaDD(folioTramite);
	    return resolucion;
    }

	@Override
	public void generaAcuseRecibo(String folioTramite) {
		logger.debug("Creando Acuse Recibo General");
		final Map<String, Object> parameters = new LinkedHashMap<String, Object>();
		getAcuseReport().setReportFormat(ReportFormat.PDF);
		parameters.put("BASE_PATH", buildRealPath(new StringBuffer(File.separator).append("images").append(File.separator).append("gobmx").append(File.separator).append("main").append(File.separator).toString()));
		parameters.put("titulo", ReportesCommonConstans.TITULO_ACUSE_DIGITALIZACION);
		parameters.put("SUBREPORT_DIR", buildRealPath(new StringBuffer(File.separator).append("WEB-INF").append(File.separator).append("reports").append(File.separator).append("patterns").append(File.separator).toString()));
		logger.debug("idSol Reporte.... [{}]",  getSolicitud().getIdSolicitud().intValue());
		parameters.put("idSolicitud", getSolicitud().getIdSolicitud().intValue() );
		logger.debug("parametros acuse recibo {}", parameters);
		getAcuseReport().setParameters(parameters);  

		final String urlJasper = buildRealPath(getAcuseReport().getUrl());
		logger.debug("urlJasper[{}]",urlJasper);
		DocumentoOficialDigi documentoOficial = new DocumentoOficialDigi(
				getAcuseReport().getByteArrayOutputStream(urlJasper, parameters).toByteArray());    
		reportesServices.guardarReporteOficial(documentoOficial, folioTramite, EstadoDocumentoOficial.ACUSE_RECEPCION);
		logger.debug("idDoctoOficial[{}]", documentoOficial.getIdDocumentoOficial());  
		getContext().storeIntoSession(JspPagesConstansRegistroSolicitud.ID_DOCTO_OFICIAL, documentoOficial.getIdDocumentoOficial());        
	}
	

	@Override
	public MultiFormatReportVU getAcuseReport() {
		return acuseDocumentoDD;
	}

	@Override
	public String getActionForm() {
		return ControllerUrlBindingConstantsDigitalizarDocumentos.REGISTRO_DIGITALIZAR_DOCUMENTOS_URL_BINDING;
	}

	@Override
	public RegistroSolicitudDigiServices<SolicitudDigitalizarDocumento> getRegistroSolicitudServices() {
		return registroDigitalizarDocumentosServices;
	}

	public SolicitudDigitalizarDocumento getSolicitud() {
		return solicitud;
	}

	public void setSolicitud(SolicitudDigitalizarDocumento solicitud) {
		this.solicitud = solicitud;
	}

	@Override
	public String getJspCaptura() {
		return JspPagesConstantsDigitalizarDocumentos.REGISTRO_DATOS_DIGITALIZAR_DOCUMENTOS;
	}

	@Override
	public boolean requierePersonasParaOir() {
		return false;
	}
	
	public List<TipoDocumento> getListDoctosEspecificos() {
		return listDoctosEspecificos;
	}

	public void setListDoctosEspecificos(List<TipoDocumento> listDoctosEspecificos) {
		this.listDoctosEspecificos = listDoctosEspecificos;
	}

}