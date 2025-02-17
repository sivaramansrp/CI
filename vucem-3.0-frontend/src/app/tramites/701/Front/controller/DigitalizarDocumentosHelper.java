package mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.helper;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.activation.DataHandler;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;

import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.constants.DigitalizarDocumentosConstants;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.exception.DigitalizarDocumentoException;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.exception.MensajeRespuestaNotificacionException;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.model.CatalogoTipoDocumento;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.model.DigitalizarDocumento;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.model.InfPeticionWS;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.model.ListaRfcsDeConsulta;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.model.RegistroDigitalizarDocumento;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.ws.oxml.ConsultaDigitalizarDocumentoRequest;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.ws.oxml.ConsultaDigitalizarDocumentoResponse;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.ws.oxml.Documento;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.ws.oxml.RegistroDigitalizarDocumentoRequest;
import mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.ws.oxml.TipoDeDocumento;
import mx.gob.ventanillaunica.www.common.catalogs.model.Catalogo;
import mx.gob.ventanillaunica.www.common.domain.model.CertificadoUtilizado;
import mx.gob.ventanillaunica.www.common.domain.model.Firma;
import mx.gob.ventanillaunica.www.common.helper.DateHelper;
import mx.gob.ventanillaunica.www.common.helper.DocumentFileSystemHelper;
import mx.gob.ventanillaunica.www.common.repository.model.Constraint;
import mx.gob.ventanillaunica.www.common.repository.model.FilterDataPage;
import mx.gob.ventanillaunica.www.common.ws.helper.WebServiceHelper;
import mx.gob.ventanillaunica.www.common.ws.oxml.respuesta.FirmaElectronica;
import net.sourceforge.stripes.action.FileBean;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.softtek.codec.helper.CodecHelper;
import com.softtek.grid.helper.GridParams;
import com.softtek.helper.BaseSerializableHelper;
import com.softtek.mail.model.MailMessage;
import com.softtek.mail.model.MailMessageAttachment;

@Component
public class DigitalizarDocumentosHelper extends BaseSerializableHelper {

	private static final long serialVersionUID = 6348662948322253612L;
	@Autowired
	private DateHelper dateHelper;
	@Autowired
	private CodecHelper codecHelper;
	@Autowired
	private WebServiceHelper webServiceHelper;
	@Autowired
	private DocumentFileSystemHelper documentFileSystemHelper;
	
	private @Value("${mail_services.from}") String mailFrom;
	private @Value("${mail_services.personal_from}") String mailPersonalFrom;
	private @Value("${file_system.document_path_digitalizacion}") String documentPathDigitalizacion;
	
	protected final Logger loggerDigitalizacion = LoggerFactory.getLogger("digitalizacion");
	
	/**
	 * Prepara el objeto FilterDataPage con los criterios de busqueda para realizar la consulta de 
	 * documentos digitalizados. 
	 * 
	 * @param eDocument
	 * @param fechaInicio
	 * @param fechaFin
	 * @param rfcConsulta
	 * @param rfcPropietario
	 * @param certificado
	 * @param tipoTramite
	 * @param gridParams
	 * @return un objeto FilterDataPage que envuelve los datos necesarios para los criterios de busqueda
	 * en la consulta de digitalizar documentos.
	 */
	public FilterDataPage prepararFiltrosDigitalizarDocumentos(String eDocument, Date fechaInicio, Date fechaFin, String rfcConsulta,
			String rfcPropietario,  CertificadoUtilizado  certificadoUtilizado, Integer tipoTramite, GridParams gridParams) {
        
		FilterDataPage filterDataPage = new FilterDataPage();
        List<Constraint> constraints = new ArrayList<Constraint>();
        
        if(tipoTramite != null){
        	constraints.add( new Constraint(DigitalizarDocumentosConstants.FILTRO_TIPO_TRAMITE , Constraint.IGUAL, tipoTramite));
        }
        
        if( eDocument != null && !eDocument.trim().equals("") ){
            constraints.add( new Constraint(DigitalizarDocumentosConstants.FILTRO_EDOCUMENT , Constraint.IGUAL, eDocument));
        }
        
        if( rfcConsulta != null && !rfcConsulta.trim().equals("") ){
            constraints.add( new Constraint(DigitalizarDocumentosConstants.FILTRO_RFC_CONSULTA , Constraint.IGUAL, rfcConsulta));
        }
        
        if( fechaInicio != null ){
            constraints.add( new Constraint(DigitalizarDocumentosConstants.FILTRO_FECHA_INICIO , Constraint.MENOR_IGUAL, fechaInicio));
        }
        
        if( fechaFin != null ){
            constraints.add( new Constraint(DigitalizarDocumentosConstants.FILTRO_FECHA_FIN , Constraint.MENOR_IGUAL, fechaFin));
        } 
        
        if( rfcPropietario != null && !rfcPropietario.trim().equals("") ){
            constraints.add( new Constraint(DigitalizarDocumentosConstants.FILTRO_RFC_PROPIETARIO , Constraint.IGUAL, rfcPropietario));
        }
        
        if(certificadoUtilizado != null){
        	String certificateSerialNumber = certificadoUtilizado.getCertSerialNumber(); 
        	if( certificateSerialNumber != null && !certificateSerialNumber.trim().equals("")){
            	constraints.add( new Constraint(DigitalizarDocumentosConstants.FILTRO_NUMERO_DE_CERTIFICADO , Constraint.IGUAL, certificateSerialNumber));
            }
        }        
        
        if (gridParams != null) {
            filterDataPage.setCurrentPage(gridParams.getRequestedPage());
        }
        
        filterDataPage.setConstraints(constraints);

        return filterDataPage;
    }
	
	/**
	 * Verifica si la lista de constraints contiene el rfc de consulta.
	 * 
	 * @param constraints es la lista de filtros para realizar las busquedas 
	 * de documentos digitalizados.
	 * 
	 * @return true en caso de que el filtro de busqueda por rfc de consulta 
	 * se encuentre presente dentro de la lista de filtros.
	 */
	public boolean validaFiltroRFC(List<Constraint> constraints) {
		for (Constraint constraint : constraints) {
			if (constraint.getAtributo().equals(DigitalizarDocumentosConstants.FILTRO_RFC_CONSULTA))
				return true;
		}
		return false;
	}
	
	/**
     * Calcula los dias de diferencia entre dos fechas
     * 
     * @return un numero negativo si fechaInicio es > que fechaFin<br>
     * y un numero positivo si fechaInicio es < que fechaFin. 
     */
    public static int getDiasDeDiferencia(Date fechaInicio, Date fechaFin) {
        Calendar calStart = Calendar.getInstance();
        Calendar calEnd = Calendar.getInstance();
        calStart.setTime(fechaInicio);
        calEnd.setTime(fechaFin);
        int endYear = calEnd.get( Calendar.YEAR );
        int startYear = calStart.get( Calendar.YEAR );
        
        int endDay = (365 * endYear) + calEnd.get(Calendar.DAY_OF_YEAR);
        int startDay =  (365 * startYear)+ calStart.get(Calendar.DAY_OF_YEAR);
        
        int differenceDays = endDay - startDay;
        
        return differenceDays;
    }
	
	/**
	 * Genera una lista de documentos del tipo DigitalizarDocumento.
	 * 
	 * @see mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.model.DigitalizarDocumento
	 * @param listaDocumentos es una lista con los datos necesarios de cada documento.
	 * @return una lista de documentos.
	 */
	public List<DigitalizarDocumento> getDigitalizarDocumento(List<?> listaDocumentos){
		List<DigitalizarDocumento> listaDigitalizarDocumento = new ArrayList<DigitalizarDocumento>();
		
		if(listaDocumentos != null){
			Iterator<?> it = listaDocumentos.iterator();
			while(it.hasNext()){
				Object[] doc = (Object[]) it.next();
				DigitalizarDocumento digitalizarDocumento = new DigitalizarDocumento();
				digitalizarDocumento.setIdDocumento((BigDecimal)doc[0]);
				digitalizarDocumento.setTipoDocumento((BigDecimal)doc[1]);
				digitalizarDocumento.setNombreTipoDocumento((String)doc[2]);
				digitalizarDocumento.setNombreDocumento((String)doc[3]);
				digitalizarDocumento.setRfcPropietario((String)doc[4]);
				digitalizarDocumento.setRfcConsulta(String.valueOf(doc[5]));
				digitalizarDocumento.setFechaCreacion(this.dateHelper.convertDateToString((Date)doc[6]));
				digitalizarDocumento.seteDocument((String)doc[7]);
				listaDigitalizarDocumento.add(digitalizarDocumento);
			}
		}		
		
		return listaDigitalizarDocumento;
	}
	
	/**
	 * Genera una lista de mapas con los datos correspondientes a los documentos digitalizados, 
	 * cada documento digitalizado esta representado por un mapa contiene una pareja de clave/valor 
	 * en donde la clave es el nombre de la columna correspondiente a la tabla y el valor 
	 * corresponde al valor de la columna.
	 * 
	 * @see mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.model.DigitalizarDocumento
	 * @param listaDocumentos es una lista de objetos DigitalizarDocumento.
	 * @return una lista de mapas con los registros de los documentos digitalizados.
	 */
	public List<Map<String, String>> preparaDatosParaReporte(List<DigitalizarDocumento> listaDocumentos){
		List<Map<String, String>> listaDeDatos = new ArrayList<Map<String, String>>();
		
		if(listaDocumentos != null){
        	for(DigitalizarDocumento digDocumento: listaDocumentos){    			
    			Map<String, String> mapDatos = new HashMap<String, String>();
    	        mapDatos.put(DigitalizarDocumentosConstants.COLUMNA_TIPO_DE_DOCUMENTO, digDocumento.getNombreTipoDocumento());
    	        mapDatos.put(DigitalizarDocumentosConstants.COLUMNA_NOMBRE_DE_DOCUMENTO, digDocumento.getNombreDocumento());
    	        mapDatos.put(DigitalizarDocumentosConstants.COLUMNA_RFC_CONSULTA, digDocumento.getRfcConsulta() != null ? digDocumento.getRfcConsulta() : "");
    	        mapDatos.put(DigitalizarDocumentosConstants.COLUMNA_FECHA_DE_CREACION, digDocumento.getFechaCreacion());
    	        mapDatos.put(DigitalizarDocumentosConstants.COLUMNA_EDOCUMENT, digDocumento.geteDocument());    	        
    	        
    	        listaDeDatos.add(mapDatos);
    		}
        }
		
		return listaDeDatos;
	}
	
	/**
	 * Genera una cadena que representa una tabla en html.
	 * 
	 * @param tableName es el nombre de la tabla dentro del html.
	 * @param listColumns contiene una lista con los nombres de las columnas para la tabla.
	 * @param listData contiene los datos para la tabla.
	 * @return una cadena que representa una tabla en html.
	 */
	public static String buildHtmlTable( String tableName, List<String> listColumns,
            List<Map<String, String>> listData ) {
		Document document = DocumentHelper.createDocument();
		document.setXMLEncoding(DigitalizarDocumentosConstants.ENCODING_UTF8);
		StringBuffer sb = new StringBuffer("text/html; charset=")
		.append(DigitalizarDocumentosConstants.ENCODING_UTF8);
		Element html = document.addElement("html");
		
		Element head = html.addElement("head");
		Element meta = head.addElement("meta");
		meta.addAttribute("http-equiv", "Content-Type");
		meta.addAttribute("content", sb.toString());
		
		if(listColumns != null && (listData != null)){
		
		    Element body = html.addElement("body");
		    Element h1 = body.addElement("h1");
		
		    if(tableName != null)
		        h1.addText(tableName);
		
		    Element table = body.addElement("table");
		
		    table.addAttribute("border", "1");
		    Element headerTr = table.addElement("tr");
		
		    for(String col : listColumns){
		        Element headerTh = headerTr.addElement("th");
		
		        if(col != null)
		            headerTh.setText( col );
		    }
		
		    for(Map<String, String> dataMap : listData ){
		        Element dataTr = table.addElement("tr");
		
		        for(String dataCol : listColumns){
		            Element dataTd = dataTr.addElement("td");
		            String data = dataMap.get(dataCol);
		            StringBuffer sbData = new StringBuffer("'")
		            .append(data)
		            .append("'");
		            
		            data = sbData.toString();
		
		            if(data != null)
		                dataTd.setText(data);
		        }
		    }
		}
		
		String result = document.asXML();
		result = result.replaceFirst( "[<?].*[?>]", "" ).replaceFirst( "\n", "" );
		
		return result;
		
	}
	
	/**
	 * Crea un XMLGregorianCalendar a partir de un GregorianCalendar
	 * 
	 * @param date
	 *            GregorianCalendar fuente
	 * @return XMLGregorianCalendar generado
	 */
	public XMLGregorianCalendar obtenerCalendarioXML(
			GregorianCalendar calendario) {
		XMLGregorianCalendar xml = null;
		try {

			xml = DatatypeFactory.newInstance().newXMLGregorianCalendar(
					calendario);

		} catch (DatatypeConfigurationException e) {
			loggerDigitalizacion.error("DatatypeConfigurationException, error al obtener la fecha  [{}]", e);
		}

		return xml;
	}
	
	/**
	 * Obtiene una lista de catalogos apartir de un mapa.
	 *  
	 * @param mapCatalogo es el mapa que contiene la lista de catalogos.
	 * @return una lista con objetos de tipo Catalogo.
	 */
	public List<Catalogo> obtenerListaCatalogo(Map<String, Object> mapCatalogo){
		List<Catalogo> listaCatalogo = new ArrayList<Catalogo>();
		
		if(mapCatalogo != null){
			Iterator<Object> iteDocumento = mapCatalogo.values().iterator();
			Catalogo docto = null;
			while(iteDocumento.hasNext()){
				docto = (Catalogo)iteDocumento.next(); 
				listaCatalogo.add(docto);
			}
		}
		
		return listaCatalogo;
	}
	
	/**
	 * Devuelve una lista de mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.ws.oxml.TipoDeDocumento a partir de la lista 
	 * de objetos del tipo mx.gob.ventanillaunica.www.common.catalog.model.Catalogo. 
	 * 
	 * @param listaTipoDocumentos es la lista de catalogo correspondiente a los tipos de documentos. 
	 * @return una lista que contiene objetos del tipo mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.ws.oxml.TipoDeDocumento.
	 */
	public static List<TipoDeDocumento> obtieneListaTipoDeDocumentos(List<? extends Catalogo> documentos){
		List<TipoDeDocumento> listaTipoDeDocumento = new ArrayList<TipoDeDocumento>();
		TipoDeDocumento tipoDeDocumento = null;
		for (Catalogo documento : documentos) {
			tipoDeDocumento = new TipoDeDocumento();
			tipoDeDocumento.setIdTipoDeDocumento(new Long(documento.getClave()));
			tipoDeDocumento.setDescripcion(documento.getDescripcion());
			listaTipoDeDocumento.add(tipoDeDocumento);
		}		
		return listaTipoDeDocumento;
	}	
	
	/**
	 * Reemplaza todos los objetos que se encuentren en la colleccion listaTipoDocumento.
	 * Este procedimiento se lleva a acabo para saber que tipos de documentos son de sagarpa.
	 * 
	 * @param listaTipoDocumento es la colleccion en donde seran reemplazados los objetos.
	 * @param listaTipoDocumentoSagarpa es la colleccion que contiene los objetos a reemplazar.
	 */
	public void complementaListaCatalogoTipoDocumentoSagarpa(List<CatalogoTipoDocumento> listaTipoDocumento, 
			List<CatalogoTipoDocumento> listaTipoDocumentoSagarpa){
			
		if(listaTipoDocumento != null){
			for(CatalogoTipoDocumento catTipoDocumento: listaTipoDocumentoSagarpa){
				Collections.replaceAll(listaTipoDocumento, catTipoDocumento, catTipoDocumento);
			}		
		}

	}
	
	/**
	 * 
	 * @param listaTipoDocumento
	 * @param listaTipoDocumentoSagarpa
	 */
	public void addListaCatalogoTipoDocumentoSagarpa(Set<CatalogoTipoDocumento> listaTipoDocumento, 
			Set<CatalogoTipoDocumento> listaTipoDocumentoSagarpa){
		
		if(listaTipoDocumento != null && listaTipoDocumentoSagarpa != null){
			listaTipoDocumento.addAll(listaTipoDocumentoSagarpa);
			//Set<CatalogoTipoDocumento> s = new HashSet<CatalogoTipoDocumento>(listaTipoDocumentoSagarpa);
			/*for(CatalogoTipoDocumento catTipoDocumento: listaTipoDocumentoSagarpa){
				listaTipoDocumento.add(catTipoDocumento);
			}*/		
		}		
	}
	
	/**
	 * Genera una lista con objetos CatalogoTipoDocumento apartir de un arreglo de objetos que 
	 * representan la clave y el nombre del tipo de documento así como al tipo de tramite al 
	 * que pertenecen.
	 * 
	 * @param tuples es una arreglo de objetos con los datos correspondientes a un tipo de documento.
	 * @return una lista de objetos CatalogoTipoDocumento.
	 */
	public Set<CatalogoTipoDocumento> obtenerListaCatalogoTipoDocumento(List<Object[]> tuples){
		Set<CatalogoTipoDocumento> listaCatalogoTipoDocumento = new HashSet<CatalogoTipoDocumento>();
		
		if (tuples != null){
			Object[] tuple;
	        for (int index = 0; index < tuples.size(); index++) {
	            tuple = tuples.get(index);
	            CatalogoTipoDocumento catalogo = new CatalogoTipoDocumento();
	            catalogo.setClave(((BigDecimal) tuple[0]).toString());
	            catalogo.setDescripcion((String) tuple[1]);
	            catalogo.setTipoTramite(((BigDecimal) tuple[2]).longValue());
	            listaCatalogoTipoDocumento.add(catalogo);
	        }
		}
		
		return listaCatalogoTipoDocumento;
	}
	
	/**
	 * Generar un objeto MailMessage, el cual representa el mensaje de notificacion que es enviado cuando el proceso
	 * del registro de digitalizacion concluye.
	 * 
	 * @param respuesta es un objeto ConsultaDigitalizarDocumentoResponse que representa la respuesta al proceso de registro. 
	 * @param to representa la direccion de correo a quien se enviara la notificacion.
	 * @param numeroDeOperacion es el identificador que se le proporciona al usuario cuando se recibe su peticion de registro.
	 * @param fechaRecepcion representa la fecha en que se recibe la peticion de registro.
	 * @return un objeto MailMessage que representa el mensaje de notificacion.
	 * @throws DigitalizarDocumentoException
	 */
	public MailMessage generarMensajeDeCorreo(ConsultaDigitalizarDocumentoResponse respuesta, 
			String to, long numeroDeOperacion, Date fechaRecepcion) throws MensajeRespuestaNotificacionException {
		
		String xmlRespuesta = null;
		try {
			xmlRespuesta = obtenXML(respuesta);
			loggerDigitalizacion.debug("xml de salida para notificacion por correo\n: [{}]", xmlRespuesta);
		} catch (JAXBException e) {
			throw new MensajeRespuestaNotificacionException(e.getMessage());
		} 
		
		StringBuilder mensajePersonalTo = new StringBuilder("No. de Operaci\u00F3n : ");
		mensajePersonalTo.append(String.valueOf(numeroDeOperacion));
				
		MailMessage mailMessage = new MailMessage(mailFrom, mailPersonalFrom, to, mensajePersonalTo.toString());
		StringBuilder body = new StringBuilder();
		body.append("Se anexa la respuesta de registro de Digitalizar Documentos con n\u00FAmero de Operaci\u00F3n : ");
		body.append(numeroDeOperacion);
		body.append("\n");
		body.append(". Recibido en la fecha : ");
		body.append(dateHelper.convertDateHoursToString(fechaRecepcion));
		//body.append("</p>");
		body.append("\n\n");
		//body.append("<p>");
		body.append(xmlRespuesta);
		//body.append("</p>");
		mailMessage.setBody(body.toString());
		
		StringBuilder sbAttachment = new StringBuilder("resultado_operacion_");
		sbAttachment.append(numeroDeOperacion);
		sbAttachment.append(".txt");
		
		MailMessageAttachment attachment = new MailMessageAttachment(sbAttachment.toString(), "text/plain", xmlRespuesta.getBytes(Charset.forName(DigitalizarDocumentosConstants.ENCODING_UTF8)));
		mailMessage.addAttachment(attachment);
		
		return mailMessage;
	}
	
	/**
	 * Devuelve la representacion en xml de la clase ConsultaDigitalizarDocumentoResponse, la cual es utilizada
	 * para indicar la respuesta a la operacion que registra la digitalizacion de un documento.
	 * 
	 * @param respuestaPeticion clase a convertir en xml.
	 * @return la representacion en xml de la clase ConsultaDigitalizarDocumentoResponse
	 * @throws JAXBException
	 */
	public String obtenXML(ConsultaDigitalizarDocumentoResponse respuestaPeticion) throws JAXBException {
		JAXBContext context = JAXBContext.newInstance(respuestaPeticion.getClass());

		StringWriter writer = new StringWriter();
	    Marshaller m = context.createMarshaller();
	    m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
	    m.setProperty(Marshaller.JAXB_SCHEMA_LOCATION, "/mx/gob/ventanillaunica/www/aga/digitalizarDocumentos/ws/wsdls/DigitalizarDocumento.xsd");
	    m.marshal(respuestaPeticion, writer);
	    
	    return writer.toString();
	}	
	
	/**
	 * Genera el nombre correspondiente a un archivo, el nombre contiene el path donde será almacenado el archivo.
	 * @param nombreArchivoOrigen representa el nombre que se le proporcionara a un archivo.
	 * @return el path + nombre del archivo.
	 */
	public String crearNombreCompletoArchivoOrigen(String nombreArchivoOrigen){
		StringBuffer sbArchivOrigen = new StringBuffer();
		sbArchivOrigen.append(getDocumentPathDigitalizacion()).append(nombreArchivoOrigen);
		return sbArchivOrigen.toString();
	}
	
	/**
	 * Genera el nombre correspondiente a un archivo, el nombre contiene el path donde será almacenado el archivo.
	 * @param nombreArchivoOrigen representa el nombre que se le proporcionara a un archivo.
	 * @return el path + nombre del archivo.
	 */
	public String crearNombreCompletoArchivoDestino(String nombreArchivoDestino){
		StringBuffer sbArchivoDestino = new StringBuffer();
		sbArchivoDestino.append(this.documentFileSystemHelper.getRutaArchivos()).append(nombreArchivoDestino);
		return sbArchivoDestino.toString();
	}
	
	/**
	 * Devuelve un objeto a partir de una arreglo de bytes, el objeto es la 
	 * representacion de los parametros que se reciben en una petición por 
	 * web service para la digitalizacion de un documento. 
	 * 
	 * @param bytes es la representacion de un objeto.
	 * @return un objeto.
	 * @throws IOException
	 * @throws ClassNotFoundException
	 */
	public Object toObject(byte[] bytes) throws IOException, ClassNotFoundException {
      Object obj = null;
      ObjectInputStream ois = new ObjectInputStream (new ByteArrayInputStream (bytes));
      obj = ois.readObject();
      ois.close();
      return obj;
    }
	
	/**
	 * Obtiene el rfc del solicitante desde la cadena original que se encuentra dentro de la
	 * FimraElectronica.
	 * 
	 * @param firmaElectronica es la firma electronica que es enviada en cada una de las 
	 * peticiones que entran por web service.
	 * @return el rfc del solicitante.
	 */
	public String getRfcSolicitanteFromFirmaElectronica(FirmaElectronica firmaElectronica){
		String rfcSolicitante = "";
		
		if(firmaElectronica != null){
			String strCadenaOriginal = firmaElectronica.getCadenaOriginal();
			if(strCadenaOriginal != null){
				String[] elementsCadenaOriginal = strCadenaOriginal.split("\\|");
				if(elementsCadenaOriginal != null && elementsCadenaOriginal.length > 0){
					rfcSolicitante = elementsCadenaOriginal[1];
				}
			}
		}
				
		return rfcSolicitante;
	}
	
	/**
	 * Genera la cadena original de acuerdo a los datos recibidos por el cliente que consume el web service.
	 * 
	 * @param peticion es el objeto que representa el elemento padre dentro del mensaje de entrada para al ws. 
	 * @param rfcSolicitante es el rfc del solicitante.
	 * @return una cadena de caracteres que representa la cadena original generada por VUCEM.
	 */
	public String generarCadenaOriginalRegistroDigitalizacionWS(
			RegistroDigitalizarDocumentoRequest peticion, String rfcSolicitante) {

		StringBuilder sb = new StringBuilder();
		Documento doc = peticion.getDocumento();

		sb.append("|");
		sb.append(rfcSolicitante != null ? rfcSolicitante : "");
		sb.append("|");
		sb.append(peticion.getCorreoElectronico() != null ? peticion
				.getCorreoElectronico() : "");
		sb.append("|");
		sb.append(doc.getIdTipoDocumento());
		sb.append("|");
		sb.append(doc.getNombreDocumento() != null ? doc.getNombreDocumento()
				: "");
		sb.append("|");

		// Agregamos la lista de RFC a la cadena original.
		String rfcDeConsulta = doc.getRfcConsulta();
		if (rfcDeConsulta != null && !rfcDeConsulta.trim().equals("")) {
			sb.append(rfcDeConsulta);
			sb.append("|");
		}

		return sb.toString();
	}

	/**
	 * Genera la cadena original correspondiente a la operacion de consulta
	 * edocument digitalizacion documentos.
	 * 
	 * @param peticion es el objeto que representa el elemento padre dentro del
	 * mensaje de entrada para al ws.
	 * 
	 * @param rfcSolicitante es el rfc del solicitante.
	 * @return una cadena de caracteres que representa la cadena original generada por VUCEM.
	 */
	public String generarCadenaOriginalConsultarEdocumentWS(ConsultaDigitalizarDocumentoRequest peticion, String rfcSolicitante) {
		StringBuilder sb = new StringBuilder();
		sb.append("|");
		sb.append(rfcSolicitante != null ? rfcSolicitante : "");
		sb.append("|");
		sb.append(peticion.getNumeroOperacion());
		sb.append("|");
		return sb.toString();
	}
	
	/**
	 * Genera un objeto RegistroDigitalizarDocumento el cual envuelve los datos necesarios para realizar
	 * el registro y la digitalizacion del documento, este objeto es almacenado en base de datos para con
	 * la finalidad de que sea recuperado en otro momento y apartir de este se realize el registro y la
	 * digitalización del documento.
	 *
	 * @see RegistroDigitalizarDocumento 
	 * @param peticion es el objeto enviado por una aplicacion cliente para consumimr el servicio correspondiente
	 * a la digitalizacion del documento.
	 * @return un objeto RegistroDigitalizarDocumento que encapsula los datos para realizar el registro y
	 * la digitalizacion del documento.
	 */
	public RegistroDigitalizarDocumento getBeanRegistroDigitalizarDocumento(
			RegistroDigitalizarDocumentoRequest peticion, InfPeticionWS peticionWS, 
			String rfcCapturista, Firma firma) {

		RegistroDigitalizarDocumento registroDD = new RegistroDigitalizarDocumento();
		registroDD.setIdPeticionWS(peticionWS.getIdPeticionWS());
		registroDD.setIdControlWS(peticionWS.getIdControlWS());
		
		// Obtenemos la lista de rfc´s de consulta.
		mx.gob.ventanillaunica.www.aga.digitalizarDocumentos.ws.oxml.Documento documento = 
			peticion.getDocumento();
		
		if (documento != null) {
			// registroDD.setArchivoFisico(preparaDocumentoFisico(documento,
			// rfcSolicitante, peticionWS.getIdControlWS()));
							
			if (documento.getRfcConsulta() != null
					&& !documento.getRfcConsulta().trim().equals("")) {

				ListaRfcsDeConsulta listaRfcsDeConsulta = new ListaRfcsDeConsulta();
				List<String> listaRfcs = new ArrayList<String>();

				String rfcDeConsulta = documento.getRfcConsulta();
				if (rfcDeConsulta != null && !rfcDeConsulta.trim().equals("")) {
					listaRfcs.add(rfcDeConsulta);
				}

				listaRfcsDeConsulta.setRfcDeConsulta(listaRfcs);
				registroDD.setListaRfcDeConsulta(listaRfcsDeConsulta);
			}
			
		}		
		
		//FirmaElectronica firma = peticion.getPeticionBase().getFirmaElectronica();
		registroDD.setRfcSolicitante(rfcCapturista);
		registroDD.setCorreoElectronico(peticion.getCorreoElectronico());
		
		/*if(firma != null){
			registroDD.setCertificado(firma.getCertificado());
			registroDD.setCadenaOriginal(firma.getCadenaOriginal());
			registroDD.setFirma(firma.getFirma());
		}*/
		
		registroDD.setFirma(firma);
		
		
		return registroDD;
	}
	
	/**
	 * Devuelve un arreglo de bytes que representan el contenido del archivo.
	 * 
	 * @param dataHandler es un objeto que envuelve contenido binario como archivos, imagenes, etc.
	 * @return un arreglo de bytes que representa el contenido del archivo.
	 * @throws IOException
	 */
	public byte[] getArrayOfBytesFromInputStream(DataHandler dataHandler) throws IOException {
		ByteArrayOutputStream output = new ByteArrayOutputStream();
		dataHandler.writeTo(output);
		output.close();
	    return output.toByteArray();

		/*ByteArrayOutputStream bosArrayData = new ByteArrayOutputStream((1024 * 1024));
		byte[] arrayBuffer = new byte[1024];
		int bytesLeidos;
		
		if(inputStream != null){
			while((bytesLeidos = inputStream.read(arrayBuffer)) >= 0){
				bosArrayData.write(arrayBuffer, 0, bytesLeidos);
			}
			
			inputStream.close();
		}		
		
		bosArrayData.close();
		
		return bosArrayData.toByteArray();*/
	}

	/**
	 * Genera un objeto Firma apartir de un objeto FirmaElectronica.
	 * 
	 * @see mx.gob.ventanillaunica.www.common.domain.model.Firma, mx.gob.ventanillaunica.www.common.ws.oxml.respuesta.FirmaElectronica
	 * @param firmaElectronica es la firma electronica proporcionada por las peticiones que entran por Web Service.
	 * @return firma representa la firma para un tramite dentro de la ventanilla.
	 */
	public Firma creaFirma(FirmaElectronica firmaElectronica, String rfcSolicitante){
		Firma firma = new Firma();
		firma = this.webServiceHelper.obtenerFirma(firmaElectronica);
		
		firma.setCadenaOriginal(
				this.codecHelper.encodeHexString(firmaElectronica
						.getCadenaOriginal()
						.getBytes(
								Charset.forName(WebServiceHelper.ENCODING_TYPE))));
		firma.setClaveUsuario(rfcSolicitante);
		
		return firma;
	}
	
	/**
	 * Procesa los caracteres especiales que se encuentran escapados dentro de un cadena, 
	 * a los cuales les aplica la conversion correspondiente en su formato unicode.
	 * 
	 * @param cadena la cadena escapada.
	 * @return una cadena a la cual se le aplica el proceso inverso correspondiente de escapar caracteres.
	 */
	public String unescape(String cadena){
		String s = "";
		try {
			if(cadena != null && !cadena.trim().equals("")){
				s = URLDecoder.decode(cadena, DigitalizarDocumentosConstants.ENCODING_ISO);
			}			
		} catch (UnsupportedEncodingException e) {
			loggerDigitalizacion.error("UnsupportedEncodingException [{}]", e);
			loggerDigitalizacion.error("UnsupportedEncodingException, error al decodificar la cadena  [{}]", cadena);
		}
		return s;
	}
	
	/**
	 * Genera un objeto FileBean de Stripes.
	 * 
	 * @param file es el descriptor que representa un archivo en un file system
	 * @param nombreArchivoAdjunto es el nombre del archivo que fue adjuntado.
	 * 
	 * @return un objeto FileBean que encapsula un objeto file.
	 */
	public FileBean generarFileBean(File file, String nombreArchivoAdjunto){
		StringBuilder sbNombreArchivoAdjunto = new StringBuilder(nombreArchivoAdjunto);
		sbNombreArchivoAdjunto.append(".pdf");
		return new FileBean(file, DigitalizarDocumentosConstants.CONTENT_TYPE_FILE_PDF, sbNombreArchivoAdjunto.toString());
	}
	
	/**
	 * @return the mailFrom
	 */
	public String getMailFrom() {
		return mailFrom;
	}

	/**
	 * @param mailFrom the mailFrom to set
	 */
	public void setMailFrom(String mailFrom) {
		this.mailFrom = mailFrom;
	}

	/**
	 * @return the mailPersonalFrom
	 */
	public String getMailPersonalFrom() {
		return mailPersonalFrom;
	}

	/**
	 * @param mailPersonalFrom the mailPersonalFrom to set
	 */
	public void setMailPersonalFrom(String mailPersonalFrom) {
		this.mailPersonalFrom = mailPersonalFrom;
	}

	public String getDocumentPathDigitalizacion() {
		return documentPathDigitalizacion;
	}
}
