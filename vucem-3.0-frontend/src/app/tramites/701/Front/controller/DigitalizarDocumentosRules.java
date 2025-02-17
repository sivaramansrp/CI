package mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.rule;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.activation.DataHandler;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import mx.gob.ventanillaunica.www.admon.usuarios.exception.UsuarioExisteException;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.constants.DigitalizarDocumentosConstants;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.exception.CertificadoUtilizadoException;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.exception.CorreoElectronicoException;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.exception.DigitalizarDocumentoException;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.exception.DocumentoException;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.exception.EDocumentException;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.exception.FechaException;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.exception.MismoRFCException;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.exception.OpcionDeConsultaException;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.exception.PersonaFisicaSinFielException;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.exception.RFCException;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.exception.TipoDocumentoException;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.helper.DigitalizarDocumentosHelper;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.model.CatalogoTipoDocumento;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.model.SolicitudDigitalizarDocumento;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.repository.ConsultaDigitalizarDocumentoHistoricoRepository;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.repository.ConsultaDigitalizarDocumentoRepository;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.repository.DigitalizarDocumentosRepository;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.ws.oxml.ConsultaDigitalizarDocumentoRequest;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.ws.oxml.Documento;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.ws.oxml.RegistroDigitalizarDocumentoRequest;
import mx.gob.ventanillaunica.www.common.constant.DiscriminadorTipoTramiteConstants;
import mx.gob.ventanillaunica.www.common.constant.RolesConstants;
import mx.gob.ventanillaunica.www.common.domain.constant.ClasificacionDocumentos;
import mx.gob.ventanillaunica.www.common.domain.constant.TipoCertificado;
import mx.gob.ventanillaunica.www.common.domain.model.CertificadoUtilizado;
import mx.gob.ventanillaunica.www.common.domain.model.DocumentoOficialDigi;
import mx.gob.ventanillaunica.www.common.domain.model.Firma;
import mx.gob.ventanillaunica.www.common.domain.model.Solicitante;
import mx.gob.ventanillaunica.www.common.domain.model.TramiteDigi;
import mx.gob.ventanillaunica.www.common.domain.model.Tramite;
import mx.gob.ventanillaunica.www.common.helper.FirmaHelper;
import mx.gob.ventanillaunica.www.common.repository.model.FilterDataPage;
import mx.gob.ventanillaunica.www.common.ws.helper.WebServiceHelper;
import mx.gob.ventanillaunica.www.common.ws.oxml.respuesta.Errores;
import mx.gob.ventanillaunica.www.common.ws.oxml.respuesta.FirmaElectronica;
import mx.gob.ventanillaunica.www.common.ws.oxml.respuesta.PeticionBase;
import mx.gob.ventanillaunica.www.usuarios.repository.UsuariosRepository;

import org.apache.commons.validator.EmailValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.softtek.codec.helper.CodecHelper;
import com.softtek.idc.exception.ContribuyenteInactivoException;
import com.softtek.idc.exception.ContribuyenteNoEncontradoException;
import com.softtek.idc.exception.IDCException;
import com.softtek.idc.exception.IDCNoDisponibleException;
import com.softtek.idc.exception.RFCNoVigenteException;
import com.softtek.idc.service.IDCService;
import com.softtek.rule.BaseSerializableBusinessRules;
import com.softtek.security.cryptography.exception.FielException;
import com.softtek.security.cryptography.helper.FielHelper;
import com.softtek.security.cryptography.repository.FielRepository;
import com.softtek.user.model.Role;
import com.softtek.user.model.UserProfile;
import com.softtek.user.model.VuUserProfile;

@Component
public class DigitalizarDocumentosRules extends BaseSerializableBusinessRules {
	
	private static final long serialVersionUID = -8669198961626942886L;
	@Autowired
	private CodecHelper codecHelper;
	@Autowired
	private DigitalizarDocumentosHelper digitalizarDocumentosHelper;
	@Autowired
	private FielHelper fielHelper;
	@Autowired
	private WebServiceHelper webServiceHelper;
	@Autowired
	private DigitalizarDocumentosRepository digitalizarDocumentosRepository;	
	@Autowired
	private ConsultaDigitalizarDocumentoRepository documentoRepository;
	@Autowired
	private ConsultaDigitalizarDocumentoHistoricoRepository documentoRepositoryHistorico;
	@Autowired
	private UsuariosRepository usuariosRepository;
	@Autowired
	private FielRepository fielRepository;
	@Autowired
    private FirmaHelper firmaHelper;
	@Autowired
    private IDCService idcService;

	private static final String EXPRESION_VALOR_NUMERICO = "^\\d+$"; 
	public static final String EXPRESION_OPCION_DE_CONSULTA = "^[1-3]{1}$";
	public static final String EXPRESION_EDOCUMENT = "^\\d{6}[a-zA-Z0-9]{7}$";
	// public static final String EXPRESION_EMAIL = "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$";
	public static final String EXPRESION_NOMBRE_DOCUMENTO = "[^\\/:*?\"<>|]{1,}";// encuentra cualquier caracter que no se encuentre en la lista indicada.
	public static final String EXPRESION_RFC = "^([a-zA-ZñÑ&]{3,4})(\\d{2})(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])(([a-zA-ZñÑ&]|\\d){3})$";


	protected final Logger loggerDigitalizacion = LoggerFactory
			.getLogger("digitalizacion");

	/**
	 * Verifica si la opción de consulta es correcta, las opciones de consulta
	 * permitidas son por e-documnet(1), fechas(2) y rfc(3).
	 * 
	 * @param inputOpcionDeConsulta representa la opcion de consulta elegida.
	 * @throws OpcionDeConsultaException si la opcion de consulta no esta permitida.
	 */
	public void validaOpcionDeConsulta(String inputOpcionDeConsulta)
			throws OpcionDeConsultaException {
		if (inputOpcionDeConsulta != null) {
			boolean opcionDeConsultaValida = inputOpcionDeConsulta
					.matches(DigitalizarDocumentosRules.EXPRESION_OPCION_DE_CONSULTA);
			if (!opcionDeConsultaValida) {
				throw new OpcionDeConsultaException("opcionIncorrecta");
			}
		} else {
			throw new OpcionDeConsultaException("opcionRequerida");
		}
	}

	/**
	 * Valida que sean capturada capturadas las fechas.
	 * 
	 * @param fechaInicio es la fecha inicial a validar.
	 * @param fechaFin es la fecha final a validar.
	 * @throws FechaException lanzada si alguna o ambas fechas no fueron proporcionadas.
	 */
	public void validaFechasCapturadas(Date fechaInicio, Date fechaFin) throws FechaException {
		if(fechaInicio == null && fechaFin == null){
			throw new FechaException("fechas.requeridas");
		} else {
			if (fechaFin != null && fechaInicio == null) {
				throw new FechaException("fechaInicio.requerida");
			}

			if (fechaInicio != null && fechaFin == null) {
				throw new FechaException("fechaFin.requerida");
			} 
		}
	}
	
	/**
	 * Valida que sean capturadas las fechas de inicio y fin, que la fecha de inicio
	 * no sea menor a la fecha fin y que no exista una diferencia de dias mayor a la 
	 * definida en la constante DigitalizarDocumentosConstants.MAX_NUM_DIAS_CONSULTA.
	 * 
	 * @see mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.constants.DigitalizarDocumentosConstants.MAX_NUM_DIAS_CONSULTA
	 * @param fechaInicio es la fecha inicial 
	 * @param fechaFin es la fecha final. 
	 * @throws FechaException lanzada si no se prporciona alguna fecha necesaria para la validacion
	 * o bien si existe una diferencia de dias mayor a la definida en DigitalizarDocumentosConstants.MAX_NUM_DIAS_CONSULTA. 
	 */
	public void validarParejaFechas(Date fechaInicio, Date fechaFin)
			throws FechaException {
		
		if(fechaInicio != null && fechaFin != null){
			//Si fechaInicio es > que fechaFin el resultado sera negativo
			//Si fechaInicio es < que fechaFin el resultado sera positivo. 
			int diff = DigitalizarDocumentosHelper.getDiasDeDiferencia(fechaInicio, fechaFin);
			if (diff < 0) {
				throw new FechaException("fechaInicio.mayor");
			}

			if (diff > DigitalizarDocumentosConstants.MAX_NUM_DIAS_CONSULTA) {
				throw new FechaException("fechas.diferencia.mayor", DigitalizarDocumentosConstants.MAX_NUM_DIAS_CONSULTA);
			}
		} else {
			throw new FechaException("fechas.requeridas");
		}	

	}

	/**
	 * Valida que un edocument cumpla con el formato esperado.
	 * 
	 * @see DigitalizarDocumentosRules.EXPRESION_EDOCUMENT
	 * @param inputEDocument es el edocument a validar.
	 * @throws EDocumentException lanzada si y solo si el edocument no cumple con el formato.
	 */
	public void validaEdocument(String inputEDocument)
			throws EDocumentException {
		if (inputEDocument != null) {
			boolean eDocumentValido = inputEDocument
					.matches(DigitalizarDocumentosRules.EXPRESION_EDOCUMENT);
			if (!eDocumentValido) {
				throw new EDocumentException("formatoIncorrecto");
			}
		} else {
			throw new EDocumentException("eDocumentRequerido");
		}		
	}
	
	/**
	 * Varifica el formato de un email.
	 * 
	 * @param inputEmail es la direccion de correo que se desea validar.
	 * @throws CorreoElectronicoException si la direccion de correo es invalida.
	 */
	public void validaEmail(String inputEmail) throws CorreoElectronicoException {
		try {
			if (!EmailValidator.getInstance().isValid(inputEmail)) {
				loggerDigitalizacion.debug("Correo recibido no valido [{}]", inputEmail);
				throw new CorreoElectronicoException("emailInvalido");
			}
			@SuppressWarnings("unused")
			InternetAddress internetAddress = new InternetAddress(inputEmail);
		} catch (AddressException e) {
			loggerDigitalizacion.debug("Correo recibido no valido [{}]", inputEmail);
			throw new CorreoElectronicoException("emailInvalido");
		}
	}
	
	/**
	 * Verifica que se proporcione el nombre del documento y que no contenga los siguientes caracteres: \/:*?"<>|
	 * 
	 * @param inputNombreDoc es el nombre del documento en el cual se desea verificar si no contiene caracteres invalidos.
	 * @return true si el nombre del documento no contiene caracteres invalidos.
	 * @throws DigitalizarDocumentoException si el nombre del documento contiene alguno de los caracteres \/:*?"<>|
	 */
	public boolean validaNombreDocumento(String inputNombreDoc) throws DocumentoException {		
		boolean nombreDocValido = false;
		
		if(inputNombreDoc != null){
			nombreDocValido = inputNombreDoc.matches(DigitalizarDocumentosRules.EXPRESION_NOMBRE_DOCUMENTO);
			if(!nombreDocValido){
				throw new DocumentoException("nombreDocumentoInvalido");
			}
		} else {
			throw new DocumentoException("nombreDocumentoRequerido");
		}
		
		return nombreDocValido;
	}
	
	/**
	 * Valida que un rfc de consulta tenga un formato valido.
	 * 
	 * @param inputRfc es el rfc que se desea validar. 
	 * @throws RFCException lanzada si el rfc no tiene el formato adecuado.
	 */
	public void validaRFCConsulta(String inputRfc) throws RFCException {
		if(inputRfc != null){
			validaRFC(inputRfc);
		} 
	}

	/**
	 * Varifica si el RFC proporcionado cumple con un formato Valido para una
	 * persona moral o persona fisica.
	 * 
	 * @param inputRfc es el rfc que se desea validar.
	 * @throws RFCException si el rfc es null o si no cumple con el formato valido.
	 */
	public void validaRFC(String inputRfc) throws RFCException {
		if(inputRfc != null){
			if(!inputRfc.matches(DigitalizarDocumentosRules.EXPRESION_RFC)){
				throw new RFCException("rfcInvalido", inputRfc);
			}
		} else {
			throw new RFCException("rfcRequerido");//Debe proporcionar el RFC
		}
	}
	
	/**
	 * Verifica si el RFC proporcionado cumple con un formato valido para una
	 * persona fisica o moral.
	 * 
	 * @param inputRfc es el rfc que se desea validar.
	 * @throws RFCException es lanzada si el rfc es null o si no cumple con el formato valido.
	 */
	public void validaRFCSolcitanteAgenteAduanal(String inputRfc) throws RFCException {
		if(inputRfc != null){
			if(!inputRfc.matches(DigitalizarDocumentosRules.EXPRESION_RFC)){
				throw new RFCException("rfcInvalido", inputRfc);
			}
		} else {
			throw new RFCException("rfcSolicitanteParaAARequerido");//Debe proporcionar el RFC del solicitante como un RFC de Consulta.
		}
	}
	
	/**
	 * Verifica si el rfc de consulta es el mismo que el rfc del solicitante.
	 * 
	 * @param rfcConsulta es el rfc de consulta para el documento.
	 * @param rfcSolicitante es el rfc del solicitante.
	 * @return false si el rfc de consulta no es igual al rfc del solicitante.
	 * @throws MismoRFCException si el rfc de consulta es igual al rfc del solicitante.
	 */
	public boolean verificaRFCParaConsulta(String rfcConsulta, String rfcSolicitante) throws MismoRFCException {
		if(rfcConsulta != null && rfcSolicitante != null && rfcConsulta.trim().equals(rfcSolicitante.trim())){
			throw new MismoRFCException("mismo.rfc");
		} else {
			return false;
		}
	}
	
	/**
	 * Verifica si el rfc de consulta es el mismo que el rfc del solicitante.
	 * 
	 * @param rfcConsulta es el rfc de consulta para el documento.
	 * @param rfcSolicitante es el rfc del solicitante.
	 * 
	 * @throws MismoRFCException si el rfc de consulta es igual al rfc del solicitante.
	 */
	public void verificaRFCSolicitanteConRFCConsulta(
			String rfcConsulta, String rfcSolicitante) throws MismoRFCException {
		if (rfcConsulta != null && rfcSolicitante != null
				&& rfcConsulta.trim().equals(rfcSolicitante.trim())) {
			throw new MismoRFCException("mismo.rfc.con.parametros",
					rfcConsulta, rfcSolicitante);
		}
	}
	
	/**
	 * Varifica que la lista de rfc´s no contenga elementos duplicados.
	 * 
	 * @param listaDeRfcs es la lista de elementos a validar.
	 * @throws MismoRFCException lanzada si la lista contiene elementos duplicados.
	 */
	public void validaRfcsDuplicados(List<? extends Object> listaDeRfcs) throws MismoRFCException {
		if(listaDeRfcs != null && !listaDeRfcs.isEmpty()){
			Set<Object> s = new HashSet<Object>(listaDeRfcs);
			
			if(s.size() != listaDeRfcs.size()){
				throw new MismoRFCException("rfcs.duplicados");
			}
		}
	}

	/**
	 * Verifica que el tipo de documento sea un id valido, se encuentre activo y vigente.
	 * 
	 * @param tipoDocumento es el tipo de documento.
	 * @return catTipoDocumento es el objeto que representa el tipo de documento, este
	 * objeto es devuelto si y solo si el id tipo documento esta activo, vigente, especifico 
	 * y si es requerido.
	 * 
	 * @throws TipoDocumentoException lanzada si el id tipo de documento 
	 * es menor o igual a cero o si no esta vigente o activo.
	 * 
	 */
	public CatalogoTipoDocumento validaTipoDeDocumento(int idTipoDocumento,
			Integer idTipoTramite, Integer tipoDocumentoEspecifico,
			String claveClasificacion) throws TipoDocumentoException {
		
		if (idTipoDocumento <= 0) {
			throw new TipoDocumentoException("tipoDocumentoDebeSerMayorACero");
		}
		
		CatalogoTipoDocumento catTipoDocumento = 
			(CatalogoTipoDocumento) this.digitalizarDocumentosRepository.obtenerElementoCatalogo(
					idTipoDocumento, Integer.parseInt(DiscriminadorTipoTramiteConstants.DIGITALIZAR_DOCUMENTOS), 
				DigitalizarDocumentosConstants.ID_DOCUMENTOS_ESPECIFICOS,
				ClasificacionDocumentos.CLSDO_RQ.getClave());
		
		if(catTipoDocumento == null){
			throw new TipoDocumentoException("tipoDocumentoInvalidoInactivo");
		}
		
		return catTipoDocumento;
	}
	
	/**
	 * Varifica que el id del documento proporcionado sea un valor numerico.
	 * 
	 * @param idDocumento es el id del documento.
	 * @throws DocumentoException lanzada si el id del documento es null o 
	 * si el id del documento no es un valor numerico. 
	 */
	public void validaIdDocumento(String idDocumento) throws DocumentoException {
		if(idDocumento != null){
			boolean isNumerico = idDocumento.matches(DigitalizarDocumentosRules.EXPRESION_VALOR_NUMERICO);
			if(!isNumerico){
				throw new DocumentoException("idDocumento.invalido");
			}
		} else {
			throw new DocumentoException("idDocumento.invalido");
		}
	}

	/**
	 * Obtiene el rol principal del usuario, el rol permitido solo puede ser
	 * Persona Moral o Persona Fisica.
	 * 
	 * @param rfcSolicitante es el rfc del solicitante del cual se desea obtener 
	 * su rol principal.
	 * 
	 * @return el rol principal del usuario.
	 * 
	 * @throws UsuarioExisteException si el usuario no tiene un rol permitido, 
	 * los roles permitidos son Persona Fisica o Persona Moral.
	 */
	public String getRolPrincipal(final String rfcSolicitante, final CertificadoUtilizado certificadoUtilizado)
			throws UsuarioExisteException {
		
		// Obtenemos el Rol del usuario
		String rolDelSolicitante = "";
		
		//Verificamos si es un sello cove
		TipoCertificado tipoCertificado = certificadoUtilizado.getTipoCertificado();
		if (tipoCertificado != null && tipoCertificado.equals(TipoCertificado.COVE)) {
			rolDelSolicitante = RolesConstants.EXTERNO_CON_SELLO_COVE;
			return rolDelSolicitante;
		}
				
		//Si es un sello Vucem o una FIEL
		UserProfile usuario = this.usuariosRepository.getProfile(
				rfcSolicitante, true);
		if (usuario == null || usuario.getRoles() == null) {
			loggerDigitalizacion.error("No existe el solicitante [{}] o no tiene roles asignados.", rfcSolicitante);
			throw new UsuarioExisteException("usuario.invalido");
		}

		Collection<Role> roles = usuario.getRoles();
		java.util.Iterator<Role> iteRoles = roles.iterator();
		while (iteRoles.hasNext()) {
			Role rol = iteRoles.next();
					
			if (rol.getName().equals(RolesConstants.PERSONA_MORAL)
					|| rol.getName().equals(RolesConstants.PERSONA_FISICA)) {
				rolDelSolicitante = rol.getName();
				break;
			}
		}

		if (rolDelSolicitante.equals("")) {
			loggerDigitalizacion.error("No existe el solicitante [{}] o no tiene roles asignados.", rfcSolicitante);
			throw new UsuarioExisteException("usuario.invalido");
		}

		return rolDelSolicitante;
	}

	/**
	 * Verifica que el tipo de certificado proporcionado sea de tipo fiel.
	 * 
	 * @param certificadoUtilizado es el certificado utilizado por el usuario
	 * dentro de una session de trabajo.
	 * 
	 * @return true si el tipo de certificado es fiel, false en cualquier otro
	 * caso.
	 */
	public boolean isCertificadoFiel(CertificadoUtilizado certificadoUtilizado) {
		if(certificadoUtilizado != null){
			TipoCertificado tipoCertificado = certificadoUtilizado.getTipoCertificado();

			// Si el certificado es fiel
			if (tipoCertificado.equals(TipoCertificado.FIEL)) {
				return true;
			} else {
				return false;
			}
		}
		 return false;
	}

	/**
	 * Verifica que el certificado utilizado sea valido.
	 * 
	 * @param certificadoUtilizado es el certificado utilizado para realizar alguna
	 * operacion por web service.
	 * 
	 * @throws CertificadoUtilizadoException se lanza cuando el tipo de certificado es invalido.
	 */
	public void isCertificadoValido(CertificadoUtilizado certificadoUtilizado) throws CertificadoUtilizadoException {
		TipoCertificado tipoCertificado = certificadoUtilizado.getTipoCertificado();

		if (tipoCertificado.equals(TipoCertificado.ERRONEO)) {
			throw new CertificadoUtilizadoException("certificadoNoValido");
		}
	}
	
	/**
	 * Genera el CertificadoUtilizado a partir de arreglo de bytes que representa un certificado.
	 * 
	 * @param certificado es una arreglo de bytes que representa un certificado (archivo .cer).
	 * @return un objeto CertificadoUtilizado que encapsulas los datos del archivo .cer.
	 * 
	 * @throws DigitalizarDocumentoException lanzada si el certificado se encuentra revocado o 
	 * si no se pudo realizar la validación por medio del OCSP.
	 */
	public CertificadoUtilizado getCertificadoUtilizado(byte[] certificado) throws DigitalizarDocumentoException {
		CertificadoUtilizado certificadoUtilizado = null;
		try {
			if(certificado != null){
				//Obtenemos el CertificadoUtilizado para validar el tipo de certificado
				String strCertificadoHex = this.codecHelper.encodeHexString(certificado);
				certificadoUtilizado = this.fielRepository.validarTipoCertificado(strCertificadoHex);
				isCertificadoValido(certificadoUtilizado);
			} else {
				loggerDigitalizacion.error("Certificado es null");
				throw new DigitalizarDocumentoException("certificadoUtilizadoNoValido");
			}
			
		} catch (FielException e) {
			loggerDigitalizacion.error("FielException getMessage[{}] ", e.getMessage());
			throw new DigitalizarDocumentoException("certificadoUtilizadoNoValido", e);
			//errores = new Errores();
			//errores.getMensaje().add(e.getMessage());
		} catch (CertificadoUtilizadoException ex){
			loggerDigitalizacion.error("CertificadoUtilizadoException getMessage[{}] ", ex.getMessage());
			throw new DigitalizarDocumentoException("certificadoUtilizadoNoValido", ex);
		}

		return certificadoUtilizado;
	}

	/**
	 * Valida que los datos correspondientes a los filtros de la consulta sean
	 * datos validos.
	 * 
	 * @param opcionDeConsulta indica la opcion de consulta elegida, la cual puede ser
	 * por edcoument, rangos de fechas o rfc de consulta.
	 * @param eDocument es el edocument a consultar.
	 * @param rfcConsulta es el rfc de consulta a consultar.
	 * @param rfcPropietario es el rfc del propietario del documento.
	 * @param fechaInicio es la fecha de inicio por la cual se desea limitar la consulta.
	 * @param fechaFin es la fecha de fin por la cual se desea limitar la consulta.
	 * @throws OpcionDeConsultaException lanzada si la opcion de consulta no es valida.
	 * @throws EDocumentException lanzada si el edocument no cumple con el formato esperado.
	 * @throws RFCException lanzada si el rfc de consulta no cumple con el formato esperado.
	 * @throws MismoRFCException lanzada si el rfc de consulta es el mismo que el rfc del solicitante.
	 */
	public void validaFiltrosDeConsultaDigitalizarDocumentos(String opcionDeConsulta, String eDocument, String rfcConsulta,
			String rfcPropietario, Date fechaInicio, Date fechaFin) throws OpcionDeConsultaException, EDocumentException,
			FechaException, RFCException, MismoRFCException {

		// Validamos el criterio de busqueda elegido.
		validaOpcionDeConsulta(opcionDeConsulta);
		
		if(DigitalizarDocumentosConstants.CONSULTA_POR_E_DOCUMENT.equals(opcionDeConsulta)){
			validaEdocument(eDocument);
		} else if(DigitalizarDocumentosConstants.CONSULTA_POR_FECHA.equals(opcionDeConsulta)){
			validaFechasCapturadas(fechaInicio, fechaFin);
			validarParejaFechas(fechaInicio, fechaFin);
			
			if(rfcConsulta != null && !rfcConsulta.trim().equals("")){
				validaRFCConsulta(rfcConsulta);
				verificaRFCParaConsulta(rfcConsulta, rfcPropietario);
			}
		} /*else if(DigitalizarDocumentosConstants.CONSULTA_POR_RFC.equals(opcionDeConsulta)){
			validaRFCConsulta(rfcConsulta);
			verificaRFCParaConsulta(rfcConsulta, rfcPropietario);
			
			//Validamos las fechas para la consulta con rfc y fechas.
			if(fechaInicio != null || fechaFin != null){
				validaFechasCapturadas(fechaInicio, fechaFin);
				validarParejaFechas(fechaInicio, fechaFin);
			}			
		}*/
		
	}

	/**
	 * Valida el que el certificado este vigente, sea valido, no se encuentre
	 * revocado, exista en base de datos y que la firma electronica sea
	 * correcta.
	 * 
	 * @param firmaElectronica es la firma electronica que se recibe en la petición 
	 * de registro por web service.
	 * 
	 * @param rfcSolicitante es el rfc del usuario que desea realizar el registro.
	 * 
	 * @param cadenaOriginal es la cadena original generada por la aplicacion y la cual
	 * sera comparada con la cadena original que viene dentro de la firma electronica.
	 * 
	 * @return un objeto Errores con una lista de los posibles errores que se haya 
	 * generado dentro de la validacion.
	 */
	//public Errores validarFirmaElectronica(FirmaElectronica firmaElectronica,
	/*public Errores validarFirmaElectronica(Firma firma,
			String rfcSolicitante, String cadenaOriginal, CertificadoUtilizado certificadoUtilizado) {

		//Errores errores = validarCertificadoUtilizado(certificadoUtilizado);
		//if (errores != null && !errores.getMensaje().isEmpty()) {
		//	return errores;
		//}		
		Errores errores = null;
		
		//Generamos la firma con el certificado y el sello codificados en hexadecimal.
		//Firma firma = this.webServiceHelper.obtenerFirma(firmaElectronica);
		
		loggerDigitalizacion.debug("Firma Generada [{}], Cadena original de la firma [{}] vs Cadena original VUCEM: [{}] ",
				new Object[]{firma.getSello(), firma.getCadenaOriginal(), cadenaOriginal});
		if(firma.getCadenaOriginal().equalsIgnoreCase(cadenaOriginal)){
			loggerDigitalizacion.debug("Cadena original Valida!!!");
		}
		
		errores = this.webServiceHelper.validarFirmaElectronica(firma, rfcSolicitante, cadenaOriginal);
		return errores;
	}*/

	/**
	 * Valida el que el certificado este vigente, sea valido, exista en base de
	 * datos y que la firma electronica sea correcta.
	 * 
	 * @param firmaElectronica
	 *            es la firma electronica que se recibe en la petición de
	 *            registro por web service.
	 * @param rfcSolicitante
	 *            es el rfc del usuario que desea realizar el registro.
	 * @param cadenaOriginal
	 *            es la cadena original generada por la aplicacion y la cual
	 *            sera comparada con la cadena original que viene dentro de la
	 *            firma electronica.
	 * @return un objeto Errores con una lista de los posibles errores que se
	 *         haya generado dentro de la validacion.
	 */
	public Errores validarFirmaElectronicaParaConsulta(FirmaElectronica firmaElectronica, 
			String rfcSolicitante, String cadenaOriginal, CertificadoUtilizado certificadoUtilizado) {

		/*Errores errores = validarCertificadoUtilizado(certificadoUtilizado);
		if (errores != null) {
			return errores;
		} else {
			errores = new Errores(); 
		}*/
		
		Errores errores = new Errores();
		// Verificamos la firma electronica.
		Firma firma = this.webServiceHelper.obtenerFirma(firmaElectronica);
		errores = this.webServiceHelper.validarFirmaElectronica(errores, firma, rfcSolicitante, cadenaOriginal, false);
		return errores;
	}

	/**
	 * Verifica que el certificado utilizado sea valido.
	 * 
	 * @param certificadoUtilizado
	 *            es el certificado utilizado para accesar a alguna de las
	 *            operaciones del web service de digitalizacion.
	 * @return un objeto Errores que contiene una lista de mensajes indicando
	 *         los posibles errores que presenta el certificado
	 */
	//public Errores validarCertificadoUtilizado(byte[] certificadoUtilizado) {
	/*public Errores validarCertificadoUtilizado(CertificadoUtilizado certificadoUtilizado) {
		Errores errores = null;

		try {
			isCertificadoValido(certificadoUtilizado);
		} catch (CertificadoUtilizadoException e) {
			loggerDigitalizacion.error("CertificadoUtilizadoException getMessage[{}] ", e.getMessage());
			errores = new Errores();
			errores.getMensaje().add(e.getMessage());
		}

		return errores;
	}*/

	/**
	 * Obtiene una lista de RFC a los cuales se les aplica la funcion inversa al
	 * escapado de caracteres especiales.
	 * 
	 * @param listaRfcsEncode
	 *            lista de rfc que contienen caracteres especiales como el &,
	 *            estos rfc tienen que contener los caracteres escapados.
	 * @return una lista con rfc los cuales con la funcion inversa al escapado
	 *         de caracteres especiales.
	 */
	public List<String> getListaRfcDecode(List<String> listaRfcsEncode) {
		List<String> listaRfcsDecode = new ArrayList<String>();

		if (listaRfcsEncode != null && !listaRfcsEncode.isEmpty()) {
			Iterator<String> iteListaRfcsEncode = listaRfcsEncode.iterator();
			while (iteListaRfcsEncode.hasNext()) {
				String strRfcDecode = iteListaRfcsEncode.next();
				listaRfcsDecode.add(this.digitalizarDocumentosHelper.unescape(strRfcDecode));
			}
		}

		return listaRfcsDecode;
	}

	/**
	 * Varifica que los datos de entrada hacia el web service de digitalización
	 * sean correctos.
	 * 
	 * @param peticion
	 * @param rfcSolicitante
	 * @return un objeto de tipo Errores que contiene una lista de mensajes
	 *         indicando el error ocurrido durante la validacion.
	 */
	public Firma validarDatosDeEntradaRegistroDigitalizacion(Errores errores, RegistroDigitalizarDocumentoRequest peticion, 
			String rfcCapturista, CertificadoUtilizado certificadoUtilizado) {

		//Errores errores = new Errores();
		String hashDocumento = "";
		StringBuilder cadenaOriginal = null;

		//String strIOException = null;
		//String strFielException = null;
		Documento documentoAdjunto = null;

		try {
			// Generamos la cadena original
			cadenaOriginal = new StringBuilder(
					this.digitalizarDocumentosHelper.generarCadenaOriginalRegistroDigitalizacionWS(peticion,
							rfcCapturista));
			
			documentoAdjunto = peticion.getDocumento();
			DataHandler dh = documentoAdjunto.getArchivo();
			
			if(dh != null && dh.getInputStream() != null){
				hashDocumento = this.codecHelper.encodeHexString(this.fielHelper
						.createChecksumFromInputStream(dh.getInputStream()));
				// Completamos la cadena original generada por VUCEM.
				cadenaOriginal.append(hashDocumento);
				cadenaOriginal.append("|");

				loggerDigitalizacion.debug("El Hash del documento [{}] es: [{}] ",
						documentoAdjunto.getNombreDocumento(), hashDocumento);
			} else {
				//strIOException = "No se pudo leer el archivo adjunto, el archivo esta vac\\U00EDo";
				errores.getMensaje().add("No se pudo leer el archivo adjunto, el archivo esta vac\\U00EDo");
			}
			
		} catch (IOException e) {
			loggerDigitalizacion.error("IOException getMessage[{}] ", e.getMessage());
			errores.getMensaje().add("No se pudo leer el archivo adjunto.");
			//strIOException = "No se pudo leer el archivo adjunto.";
		} catch (FielException e) {
			errores.getMensaje().add(e.getMessage());
			//strFielException = e.getMessage();
		}

		loggerDigitalizacion.debug("Cadena Original: [{}] ", cadenaOriginal.toString());
		
		//PeticionBase peticionBase = peticion.getPeticionBase();
		//FirmaElectronica firmaElectronica = peticionBase.getFirmaElectronica();

		// Validamos la firma electronica.
		//errores = validarFirmaElectronica(firma, rfcCapturista,
			//	cadenaOriginal.toString(), certificadoUtilizado);
		Firma firma = this.validarFirma(errores, this.generarFirma(peticion.getPeticionBase().getFirmaElectronica()), 
					 rfcCapturista, cadenaOriginal.toString(), true);
		 
		/*if (strIOException != null) {
			errores.getMensaje().add(strIOException);
		}

		if (strFielException != null) {
			errores.getMensaje().add(strFielException);
		}*/

		// Verificamos el correo electronico
		try {
			validaEmail(peticion.getCorreoElectronico());
		} catch (CorreoElectronicoException ex) {
			errores.getMensaje().add(ex.getMessage());
		}

		// Validamos el nombre del documento.
		try {
			validaNombreDocumento(documentoAdjunto.getNombreDocumento().trim());
		} catch (DocumentoException ex) {
			errores.getMensaje().add(ex.getMessage());
		}		

		//return errores;
		return firma;
	}
	
	/**
	 * Verifica si el tipo de documento pertenece al tramite de SAGARPA, si el tipo de documento pertenece a este
	 * tramite, el RFC de Consulta debe ser obligatorio ya que este RFC quedara registrado con permisos de consulta.
	 * 
	 * Si el tipo de documento pertenece al tramite 701, entonces el RFC de Consulta es opcional.
	 *  
	 * @param rfcCapturista es el rfc del capturista, para el caso del tramite 701 este rfc es el del solicitante, para
	 * el caso del tramite de sagarpa el rfc del capturista debera tener el rol de Agente Aduanal y el RFC de consulta 
	 * debera ser obligatorio, ya que este último debera quedar registrado con permisos de consulta.
	 * 
	 * @param peticion es un objeto que envuelve los datos correspondientes dentro del mensaje SOAP que es enviado atravez
	 * del Web Service.
	 * 
	 * @param errores es un objeto que envuelve la lista de errores que se pueden presentar durante las validaciones 
	 * realizadas con los datos de entrada para registrar el documento vía web service.
	 * 
	 * @return true si y solo si el tipo de documento pertenece al tramite de sagarpa, false en cualquier otro caso.
	 */
	public boolean isTipoDocumentoSagarpa(String rfcCapturista, RegistroDigitalizarDocumentoRequest peticion, Errores errores){
		Documento documentoAdjunto = peticion.getDocumento();
		boolean isAgenteAduanal = false;

		try {
			CatalogoTipoDocumento catTipoDocumento = null;
			
			// Verificamos que el tipo de documento sea valido, exista en catalogo, 
			//se encuentre activo y vigente.
			catTipoDocumento = validaTipoDeDocumento(
					documentoAdjunto.getIdTipoDocumento(),
					Integer.parseInt(DiscriminadorTipoTramiteConstants.DIGITALIZAR_DOCUMENTOS),
					DigitalizarDocumentosConstants.ID_DOCUMENTOS_ESPECIFICOS,
					ClasificacionDocumentos.CLSDO_RQ.getClave());	 
			
			//Validamos si el tipo de documento es de sagarpa.
			loggerDigitalizacion.debug("Verificando el Tipo de Documento...");
			
			if (catTipoDocumento != null && 
					catTipoDocumento.getTipoTramite() != DigitalizarDocumentosConstants.ID_TIPO_TRAMITE_DIGITALIZACION) {
				
				isAgenteAduanal = true;
				
				//Validamos la lista de RFC's de consulta (para el caso de sagarpa el rfc de consulta es obligatorio ya que este es el rfc del solicitante).
				String rfcDelSolicitante = documentoAdjunto.getRfcConsulta();
				
				loggerDigitalizacion.debug("Tipo de Documento pertenece a SAGARPA, validando RFC del Capturista [{}] y RFC del Solicitante [{}]", 
						rfcCapturista, rfcDelSolicitante);
				rfcDelSolicitante = this.digitalizarDocumentosHelper.unescape(rfcDelSolicitante);
				validaRFCSolcitanteAgenteAduanal(rfcDelSolicitante);
				verificaRFCSolicitanteConRFCConsulta(rfcDelSolicitante, rfcCapturista);
								
			} else {
				isAgenteAduanal = false;
				
				// Validamos la lista de RFC's de consulta (para el 701 el rfc de consulta es opcional).
				String rfcDeConsulta = documentoAdjunto.getRfcConsulta();
				
				loggerDigitalizacion.debug("Tipo de Documento pertenece a Digitalizacion, validando RFC de Consulta [{}]", rfcDeConsulta);
				if (rfcDeConsulta != null && !rfcDeConsulta.trim().equals("")) {
					rfcDeConsulta = this.digitalizarDocumentosHelper.unescape(rfcDeConsulta);
					validaRFCConsulta(rfcDeConsulta.trim());
					verificaRFCSolicitanteConRFCConsulta(rfcDeConsulta, rfcCapturista);
				}
				
			}
		
		} catch (TipoDocumentoException e) {
			errores.getMensaje().add(e.getMessage());
		} catch (RFCException ex) {
			errores.getMensaje().add(ex.getMessage());
		} catch (MismoRFCException ex) {
			errores.getMensaje().add(ex.getMessage());
		}
		
		return isAgenteAduanal;
	}

	/**
	 * Valida los datos de entrada para la operacion consulta edocument
	 * digitalizar documentos.
	 * 
	 * @param peticion
	 *            es el elemento que contiene los datos a validar.
	 * @param rfcSolicitante
	 *            representa al usuario solicitante.
	 * @return un objeto que contiene una lista de errores.
	 */
	public Errores validarDatosDeEntradaConsultaEdocument(ConsultaDigitalizarDocumentoRequest peticion, 
			String rfcSolicitante, CertificadoUtilizado certificadoUtilizado) {
		
		String cadenaOriginal = this.digitalizarDocumentosHelper.generarCadenaOriginalConsultarEdocumentWS(peticion, rfcSolicitante);
		PeticionBase peticionBase = peticion.getPeticionBase();
		FirmaElectronica firmaElectronica = peticionBase.getFirmaElectronica();

		// Validamos la firma electronica.
		Errores errores = validarFirmaElectronicaParaConsulta(firmaElectronica,
				rfcSolicitante, cadenaOriginal, certificadoUtilizado);

		if (peticion.getNumeroOperacion() <= DigitalizarDocumentosConstants.CERO) {
			errores.getMensaje().add("El n\u00FAmero de operacion es inv\u00E1lido.");
		}

		return errores;
	}
	
	/**
	 * Genera un objeto Firma a partir del objeto FirmaElectronica.
	 * 
	 * @see mx.gob.ventanillaunica.www.common.domain.model.Firma
	 * @see mx.gob.ventanillaunica.www.common.ws.oxml.respuesta.FirmaElectronica
	 * 
	 * @param firmaElectronica es el objeto que contiene la cadena original y el arreglo de bytes 
	 * que representan el certificado y la firma o sello.
	 * 
	 * @return un objeto Firma que contiene la representacion en cadena de texto codificada en hexadecimal
	 * del certificado y el sello utilizados en una petición dentro del WS.  
	 */
	public Firma generarFirma(FirmaElectronica firmaElectronica) {
        Firma firma = null;
        String certificado = null;
        String sello = null;

        if (firmaElectronica != null) {
        	loggerDigitalizacion.debug("Generando la firma a partir de la firma electronica [{}], [{}], [{}]", 
        			new Object[]{this.codecHelper.encodeByteArrayToBase64(firmaElectronica.getCertificado()), 
        			firmaElectronica.getCadenaOriginal(),
        			this.codecHelper.encodeByteArrayToBase64(firmaElectronica.getFirma())});

            if (firmaElectronica.getCertificado() != null) {
                certificado = this.codecHelper.encodeHexString(firmaElectronica
                        .getCertificado());
            }
            if (firmaElectronica.getFirma() != null) {
                sello = this.codecHelper.encodeHexString(firmaElectronica.getFirma());
            }
            firma = new Firma();
            if (firmaElectronica.getCadenaOriginal() != null) {
                firma.setCadenaOriginal(firmaElectronica.getCadenaOriginal().trim());
            }
            firma.setCertificado(certificado);
            firma.setSello(sello);

        }
        
        return firma;
    }
	
	private Firma validarFirma(Errores errores, Firma firma, String rfcUsuario, 
			String cadenaOriginalGeneradaPorVucem, boolean validaOcsp) {
		
		Firma nuevaFirma = null;
		
		loggerDigitalizacion.debug("Validando la firma [{}]", firma);
		
        //Fima no debe ser nula
        // se reutilizaran las etiquetas usadas en COVE
        if (firma == null) {
            errores.getMensaje().add(this.webServiceHelper.obtenerMensajeError("cove.exepcion.datosgenerales.firma.nula.firmaelectronica"));
        } else {
            // cadena original no puede ser nula
            /*errores = this.webServiceHelper.validarDatoString(errores,
            		firma.getCadenaOriginal(),
                    "cove.firma.cadenaoriginal", true,
                    "cove.exepcion.datosgenerales.firma.nula.cadenaoriginal",
                    "", Integer.MAX_VALUE);
            // certificado no puede ser nulo
            errores = this.webServiceHelper.validarDatoString(errores,
            		firma.getCertificado(),
                    "cove.firma.certificado", true,
                    "cove.exepcion.datosgenerales.firma.certificado", "",
                    Integer.MAX_VALUE);
            // firma no puede ser nula
            errores = this.webServiceHelper.validarDatoString(
                    errores,
                    firma.getSello(),
                    "cove.firma",
                    true,
                    "cove.exepcion.datosgenerales.firma.nula.firmaelectronica.firma",
                    "", Integer.MAX_VALUE);*/
        	/*if(firma.getSello() == null || firma.getSello().isEmpty()){
        		loggerDigitalizacion.debug("Sello invalido.");
        		errores.getMensaje().add(this.webServiceHelper.obtenerMensajeError("cove.exepcion.datosgenerales.firma.invalida"));
        	}*/
        	
            try {
                //RFC del capturista debe ser el mismo que el del certificado.
                if (!rfcUsuario.equalsIgnoreCase(this.fielHelper.obtenerRFC(firma.getCertificado()))) {
                	loggerDigitalizacion.debug("El RFC del solicitante [{}] es distinto al RFC del certificado.", rfcUsuario);
                    errores.getMensaje().add(this.webServiceHelper.obtenerMensajeError("cove.exepcion.datosgenerales.rfc.verficado.distinto"));
                }
            } catch (Throwable e) {
            	loggerDigitalizacion.debug("El RFC del solicitante [{}] es distinto al RFC del certificado.", rfcUsuario);
                errores.getMensaje().add(this.webServiceHelper.obtenerMensajeError("cove.exepcion.datosgenerales.rfc.verficado.distinto"));
            }
            
            
            if (firma.getCadenaOriginal() != null
                    && firma.getCadenaOriginal().length() > 0) {
                //La cadena original recibida debe ser igual a la cadena generada con los datos de la peticion
                if (!firma.getCadenaOriginal().equalsIgnoreCase(cadenaOriginalGeneradaPorVucem)) {
                	loggerDigitalizacion.debug("Cadena original invalida. Cadena original de la firma [{}] vs Cadena original VUCEM: [{}]", 
                			firma.getCadenaOriginal(), cadenaOriginalGeneradaPorVucem);
                    errores.getMensaje().add(this.webServiceHelper.obtenerMensajeError("cove.exepcion.datosgenerales.firma.cadenaoriginal.invalida"));
                } else {
                	loggerDigitalizacion.debug("Cadena original Valida!!!");
                	
                    // la firma debe ser valida
                    Firma validaFirma = new Firma();
                    validaFirma.setCadenaOriginal(this.codecHelper.encodeHexString(firma
                                    .getCadenaOriginal()
                                    .getBytes(
                                            Charset.forName(WebServiceHelper.ENCODING_TYPE))));
                    validaFirma.setCertificado(firma.getCertificado());
                    validaFirma.setSello(firma.getSello());
                    try {
                        validaFirma.setClaveUsuario(rfcUsuario);
                        validaFirma.setClaveRol(RolesConstants.SOLICITANTE);
                        
                        nuevaFirma = this.firmaHelper.crearFirma(validaFirma, validaOcsp);
                        loggerDigitalizacion.debug("Firma generada [{}] para el usuario [{}]", nuevaFirma, rfcUsuario);
                        
                        if(nuevaFirma != null){
                        	if(nuevaFirma.getSello() == null || nuevaFirma.getSello().isEmpty()){
                        		loggerDigitalizacion.debug("Firma Sin sello [{}]", nuevaFirma.getSello());
                            	errores.getMensaje().add(this.webServiceHelper.obtenerMensajeError("cove.exepcion.datosgenerales.firma.invalida"));
                            }
                            
                            if(nuevaFirma.getFirmaElectronica() == null || nuevaFirma.getFirmaElectronica().isEmpty()){
                            	loggerDigitalizacion.debug("Firma sin firma electronica [{}]", nuevaFirma.getFirmaElectronica());
                            	errores.getMensaje().add(this.webServiceHelper.obtenerMensajeError("cove.exepcion.datosgenerales.firma.invalida"));
                            }
                        } else {
                        	errores.getMensaje().add(this.webServiceHelper.obtenerMensajeError("cove.exepcion.datosgenerales.firma.invalida"));
                        }
                        
                        
                    } catch (Exception e) {
                    	loggerDigitalizacion.error("Firma invalida [{}]", e);
                        errores.getMensaje().add(this.webServiceHelper.obtenerMensajeError("cove.exepcion.datosgenerales.firma.invalida"));
                    }
                }
            }
        }
        
        return nuevaFirma;
    }

	/**
	 * Obtiene una lista de documentos digitalizados de acuerdo a las reglas de
	 * negocio para usaurios externos con fiel y sin fiel, usuarios internos, y
	 * usuarios con sello vucem o sello cove.
	 * 
	 * La lista de documentos viene paginada.
	 * 
	 * @param userProfile
	 *            contiene los datos de sesion necesarios para las validaciones,
	 *            como son usuario, rol.
	 * @param filterDataPage
	 *            contiene los filtros de consulta necesarios para la obtencion
	 *            de datos.
	 * @return un objeto FilterDataPage que envuelve la lista de documentos
	 *         digitalzados.
	 */
	public FilterDataPage consultarDocumentosDigitalizados(FilterDataPage filterDataPage, VuUserProfile userProfile)
			throws PersonaFisicaSinFielException {
		long currentPage = filterDataPage.getCurrentPage();
		// Usuario Externo
		if (userProfile.isIngresoComoExterno()) {
			loggerDigitalizacion.debug("<Consultando como Usuario Externo> [{}]>", userProfile.getRfcSolicitante());

			// Usuario con FIEL o con SELLO.
			if (userProfile.isIngresoConFiel()) {
				boolean isFiel = isCertificadoFiel(userProfile.getCertificado());

				// Si el tipo de certificado es diferente de fiel, agregamos el
				// serial number a la consulta para filtrar por certificado.
				if (isFiel) {
					loggerDigitalizacion.debug("<Consultando como Usuario Externo con FIEL [{}]>", userProfile.getRfcSolicitante());
					FilterDataPage resultado = null;
					
					
					if (this.digitalizarDocumentosHelper.validaFiltroRFC(filterDataPage.getConstraints())) {
						resultado = this.documentoRepository.consultarDDPorRfcConsultaFechasComoUsuarioExterno(filterDataPage);
						if(resultado.getData().isEmpty()){
							filterDataPage.setCurrentPage(currentPage);
							resultado = this.documentoRepository.consultarDDPorRfcConsultaFechasComoUsuarioExternoOld(filterDataPage);
						}
						if(resultado.getData().isEmpty()){
							filterDataPage.setCurrentPage(currentPage);
							resultado = this.documentoRepositoryHistorico.consultarDDPorRfcConsultaFechasComoUsuarioExterno(filterDataPage);
						}
						return resultado;
					} else {
						resultado = this.documentoRepository.consultarDDPorEdocumentFechasComoUsuarioExterno(filterDataPage);
						if(resultado.getData().isEmpty()){
							filterDataPage.setCurrentPage(currentPage);
							resultado = this.documentoRepository.consultarDDPorEdocumentFechasComoUsuarioExternoOld(filterDataPage);
						}
						if(resultado.getData().isEmpty()){
							filterDataPage.setCurrentPage(currentPage);
							resultado = this.documentoRepositoryHistorico.consultarDDPorEdocumentFechasComoUsuarioExterno(filterDataPage);
						}
						return resultado;
					}

				} else {
					// Filtramos por certificado utilizado en el momento del
					// registro de digitalizacion.
					loggerDigitalizacion.debug("<Consultando como Usuario Externo con SELLO: [{}] y Serial Number: [{}]>", 
							userProfile.getRfcSolicitante(), userProfile.getCertificado().getCertSerialNumber());
					FilterDataPage resultado = null;
					filterDataPage.setCurrentPage(currentPage);
					
					if (this.digitalizarDocumentosHelper.validaFiltroRFC(filterDataPage.getConstraints())) {
						resultado =  this.documentoRepository.consultarDDPorRfcConsultaFechasConMinifiel(filterDataPage);
						if(resultado.getData().isEmpty()){
							filterDataPage.setCurrentPage(currentPage);
							resultado =  this.documentoRepository.consultarDDPorRfcConsultaFechasConMinifielOld(filterDataPage);
						}
						if(resultado.getData().isEmpty()){
							filterDataPage.setCurrentPage(currentPage);
							resultado =  this.documentoRepositoryHistorico.consultarDDPorRfcConsultaFechasConMinifiel(filterDataPage);
						}
						return resultado; 
					} else {
						resultado = this.documentoRepository.consultarDDPorEdocumentFechasConMinifiel(filterDataPage);
						if(resultado.getData().isEmpty()){
							filterDataPage.setCurrentPage(currentPage);
							resultado = this.documentoRepository.consultarDDPorEdocumentFechasConMinifielOld(filterDataPage);
						}
						if(resultado.getData().isEmpty()){
							filterDataPage.setCurrentPage(currentPage);
							resultado =  this.documentoRepositoryHistorico.consultarDDPorEdocumentFechasConMinifiel(filterDataPage);
						}
						return resultado;
					}
				}
			} else {// Usuario sin FIEL.
				loggerDigitalizacion.debug("<Consultando como Usuario Externo Sin FIEL [{}]>", userProfile.getRfcSolicitante());
				FilterDataPage resultado = null;
				filterDataPage.setCurrentPage(currentPage);
				
				if (this.digitalizarDocumentosHelper.validaFiltroRFC(filterDataPage.getConstraints())) {
					throw new PersonaFisicaSinFielException("consultaPorRFC.noDisponible");
				}
				resultado = this.documentoRepository.consultarDDPorEdocumentFechasComoUsuarioExternoSinFiel(filterDataPage);
				if(resultado.getData().isEmpty()){
					filterDataPage.setCurrentPage(currentPage);
					resultado = this.documentoRepository.consultarDDPorEdocumentFechasComoUsuarioExternoSinFielOld(filterDataPage);
				}
				if(resultado.getData().isEmpty()){
					filterDataPage.setCurrentPage(currentPage);
					resultado = this.documentoRepositoryHistorico.consultarDDPorEdocumentFechasComoUsuarioExternoSinFiel(filterDataPage);
				}
				return resultado;
			}

		} else { // Usuario Interno con privilegios de consulta = Funcionario AGA
			loggerDigitalizacion.debug("<Consultando como Usuario Interno [{}]>", userProfile.getRfcSolicitante());
			FilterDataPage resultado = null;
			filterDataPage.setCurrentPage(currentPage);
			
			if (this.digitalizarDocumentosHelper.validaFiltroRFC(filterDataPage.getConstraints())) {
				resultado = documentoRepository.consultarDDPorRfcConsultaFechasComoUsuarioInterno(filterDataPage);
				if(resultado.getData().isEmpty()){
					filterDataPage.setCurrentPage(currentPage);
					resultado = documentoRepository.consultarDDPorRfcConsultaFechasComoUsuarioInternoOld(filterDataPage);
				}
				if(resultado.getData().isEmpty()){
					filterDataPage.setCurrentPage(currentPage);
					resultado = documentoRepositoryHistorico.consultarDDPorRfcConsultaFechasComoUsuarioInterno(filterDataPage);
				}					
				return resultado;
				
			} else {
				resultado = documentoRepository.consultarDDPorEdocumentFechasComoUsuarioInterno(filterDataPage);
				if(resultado.getData().isEmpty()){
					filterDataPage.setCurrentPage(currentPage);
					resultado = documentoRepository.consultarDDPorEdocumentFechasComoUsuarioInternoOld(filterDataPage);
				}
				if(resultado.getData().isEmpty()){
					filterDataPage.setCurrentPage(currentPage);
					resultado = documentoRepositoryHistorico.consultarDDPorEdocumentFechasComoUsuarioInterno(filterDataPage);
				}
				return resultado;
			}
		}
	}

	/**
	 * Obtiene una lista de documentos digitalizados de acuerdo a las reglas de negocio para usaurios externos con fiel
	 * y sin fiel, usuarios internos, y usuarios con sello vucem o sello cove.
	 * 
	 * @param userProfile contiene los datos de sesion necesarios para las validaciones, como son usuario, rol.
	 * @param filterDataPage contiene los filtros de consulta necesarios para la obtencion de datos.
	 * @return un objeto FilterDataPage que envuelve la lista de documentos digitalzados.
	 */
	public FilterDataPage generarReporteDocumentosDigitalizados(VuUserProfile userProfile, FilterDataPage filterDataPage) {
		long currentPage = filterDataPage.getCurrentPage();
		//Usuario Externo
		if(userProfile.isIngresoComoExterno()){
			loggerDigitalizacion.debug("<Generarndo Reporte como Usuario Externo [{}]>", userProfile.getRfcSolicitante());
				
			//Usuario con FIEL o con SELLO.
			if(userProfile.isIngresoConFiel()){
				boolean isFiel = isCertificadoFiel(userProfile.getCertificado());
					
				//Si el tipo de certificado es diferente de fiel, agregamos el serial number a la consulta para filtrar por certificado.
				if(isFiel){
					loggerDigitalizacion.debug("<Generarndo Reporte con FIEL [{}]>", userProfile.getRfcSolicitante());
					FilterDataPage resultado = null;
					
					if(this.digitalizarDocumentosHelper.validaFiltroRFC(filterDataPage.getConstraints())){
						resultado = this.documentoRepository.consultaTotalDDPorRfcConsultaFechasComoUsuarioExterno(filterDataPage);
						if(resultado.getData().isEmpty()){
							filterDataPage.setCurrentPage(currentPage);
							resultado = this.documentoRepositoryHistorico.consultaTotalDDPorRfcConsultaFechasComoUsuarioExterno(filterDataPage);
						}							
						return resultado;
					} else {
						resultado = this.documentoRepository.consultaTotalDDPorEdocumentFechasComoUsuarioExterno(filterDataPage);
						if(resultado.getData().isEmpty()){
							filterDataPage.setCurrentPage(currentPage);
							resultado = this.documentoRepositoryHistorico.consultaTotalDDPorEdocumentFechasComoUsuarioExterno(filterDataPage);
						}
						return resultado;
					}				
					
				} else {
					//Filtramos por certificado utilizado en el momento del registro de digitalizacion.
					loggerDigitalizacion.debug("<Generarndo Reporte como Usuario Externo con SELLO: [{}] y Serial Number: [{}]>", 
							userProfile.getRfcSolicitante(), userProfile.getCertificado().getCertSerialNumber());
					FilterDataPage resultado = null;
					
					if(this.digitalizarDocumentosHelper.validaFiltroRFC(filterDataPage.getConstraints())){
						resultado =  this.documentoRepository.consultaTotalDDPorRfcConsultaFechasConMinifiel(filterDataPage);
						if(resultado.getData().isEmpty()){
							filterDataPage.setCurrentPage(currentPage);
							resultado =  this.documentoRepositoryHistorico.consultaTotalDDPorRfcConsultaFechasConMinifiel(filterDataPage);
						}
						return resultado;
					} else {
						resultado = this.documentoRepository.consultaTotalDDPorEdocumentFechasConMinifiel(filterDataPage);
						if(resultado.getData().isEmpty()){
							filterDataPage.setCurrentPage(currentPage);
							resultado = this.documentoRepositoryHistorico.consultaTotalDDPorEdocumentFechasConMinifiel(filterDataPage);
						}
						return resultado;
					}
				}
			} else {
				//Usuario sin FIEL.
				loggerDigitalizacion.debug("<DocumentoServicesPOJOImpl Consultando como Usuario Externo Sin FIEL [{}]>", userProfile.getRfcSolicitante());
				FilterDataPage resultado = null;
				filterDataPage.setCurrentPage(currentPage);
				resultado = this.documentoRepository.consultaTotalDDPorEdocumentFechasComoUsuarioExternoSinFiel(filterDataPage);
				if(resultado.getData().isEmpty()){
					filterDataPage.setCurrentPage(currentPage);
					resultado = this.documentoRepositoryHistorico.consultaTotalDDPorEdocumentFechasComoUsuarioExternoSinFiel(filterDataPage);
				}
				return resultado;
			}
			
		} else {
			//Usuario Interno con privilegios de consulta = Funcionario AGA
			loggerDigitalizacion.debug("<Generarndo Reporte como Usuario Interno [{}]>", userProfile.getRfcSolicitante());
			FilterDataPage resultado = null;
			filterDataPage.setCurrentPage(currentPage);
			
			if(digitalizarDocumentosHelper.validaFiltroRFC(filterDataPage.getConstraints())){
				resultado = this.documentoRepository.consultaTotalDDPorRfcConsultaFechasComoUsuarioInterno(filterDataPage);
				if(resultado.getData().isEmpty()){
					filterDataPage.setCurrentPage(currentPage);
					resultado = this.documentoRepositoryHistorico.consultaTotalDDPorRfcConsultaFechasComoUsuarioInterno(filterDataPage);
				}
				return resultado;
			} else {
				resultado = this.documentoRepository.consultaTotalDDPorEdocumentFechasComoUsuarioInterno(filterDataPage);
				if(resultado.getData().isEmpty()){
					filterDataPage.setCurrentPage(currentPage);
					resultado = this.documentoRepositoryHistorico.consultaTotalDDPorEdocumentFechasComoUsuarioInterno(filterDataPage);
				}
				return resultado;
			}
		}
	}
	
	public DocumentoOficialDigi generarAcuseDocumentosDigitalizados(String eDocument) {
		DocumentoOficialDigi doc = this.documentoRepository.obtenerAcuseEdocument(eDocument); 
		if (doc == null) {
			doc = this.documentoRepository.obtenerAcuseEdocumentOld(eDocument);
			if(doc == null){
				Long idDocumento = this.documentoRepositoryHistorico.obtenerAcuseIdEdocument(eDocument);
				if (idDocumento != null) {
					byte[] documento = this.documentoRepositoryHistorico.obtenerAcuseEdocument(idDocumento);
					if (documento != null) {
						doc = new DocumentoOficialDigi();
						doc.setDocumentoElectronico(documento);
					}
				}
			}							
		}
		return doc;
	}
	
	public TramiteDigi obtenerNumeroFolio(String idEdocument){
		TramiteDigi tramiteDigi = this.documentoRepository.obtenerNumFolioTramite(idEdocument); 		
		if(tramiteDigi == null){
			Tramite tramite = this.documentoRepository.obtenerNumFolioTramiteOld(idEdocument);
			if(tramite != null && tramite.getSolicitud() != null){
				tramiteDigi = new TramiteDigi();
		    	SolicitudDigitalizarDocumento solicitud = new SolicitudDigitalizarDocumento();
		    	tramiteDigi.setSolicitud(solicitud);
		    	tramiteDigi.getSolicitud().setIdSolicitud(tramite.getSolicitud().getIdSolicitud());
		    	tramiteDigi.setNumFolioTramite(tramite.getNumFolioTramite());
		    	tramiteDigi.getSolicitud().setDiscriminatorValue(tramite.getSolicitud().getDiscriminatorValue());
			}	    	
		}
	    if (tramiteDigi == null){
	    	Tramite tramite = this.documentoRepositoryHistorico.obtenerNumFolioTramite(idEdocument);
	    	if(tramite != null && tramite.getSolicitud() != null){
		    	tramiteDigi = new TramiteDigi();
		    	SolicitudDigitalizarDocumento solicitud = new SolicitudDigitalizarDocumento();
		    	tramiteDigi.setSolicitud(solicitud);
		    	tramiteDigi.getSolicitud().setIdSolicitud(tramite.getSolicitud().getIdSolicitud());
		    	tramiteDigi.setNumFolioTramite(tramite.getNumFolioTramite());
		    	tramiteDigi.getSolicitud().setDiscriminatorValue(tramite.getSolicitud().getDiscriminatorValue());
	    	}
	    }	    		   
		return tramiteDigi;
	}
	
	@SuppressWarnings("unused")
	public String validaRFCEnIDC(String rfc) {
		try {
			logger.debug("Entrando a validar rfc en IDC.");
			Solicitante solicitante = idcService.buscarContribuyente(rfc, new Solicitante());
        	
		} catch (IDCNoDisponibleException e) {
			logger.error("IDCNoDisponibleException DigitalizarDocumentosRules: {}",	e);
			return "El RFC no esta disponible en IDC.";
		} catch (IDCException e) {
			logger.error("IDCException DigitalizarDocumentosRules: [{}]", e.getMessage());
			return "El RFC es invalido en IDC.";
		} catch (ContribuyenteNoEncontradoException e) {
			logger.error("ContribuyenteNoEncontradoException DigitalizarDocumentosRules: [{}]", e.getMessage());
			return "El RFC no se encuentra en IDC.";
		} catch (ContribuyenteInactivoException e) {
			logger.error("ContribuyenteInactivoException DigitalizarDocumentosRules: [{}]", e.getMessage());
			return "Su petici\u00F3n no puede ser procesada debido a inconsistencias en el IDC, verificar su informaci\u00F3n con el SAT.";
		} catch (RFCNoVigenteException e) {
			logger.error("RFCNoVigenteException DigitalizarDocumentosRules: [{}]", e.getMessage());
			return "El RFC no esta vigente en IDC.";
		}
		
		return null;
	}
	
	public boolean validaHistorico(String folioTramite) {
		return this.documentoRepositoryHistorico.validaHistorico(folioTramite);
	}
	
	public boolean esTramiteDigi(String idEdocument){
		TramiteDigi tramiteDigi = this.documentoRepository.obtenerNumFolioTramite(idEdocument);
		if(tramiteDigi != null && tramiteDigi.getSolicitud()!= null){
			return true;
		}
		return false;
	}
	public boolean esTramiteOld(String idEdocument){
		Tramite tramite = this.documentoRepository.obtenerNumFolioTramiteOld(idEdocument);
		if(tramite != null && tramite.getSolicitud() != null){
			return true;
		}		
		return false;
	}
}
