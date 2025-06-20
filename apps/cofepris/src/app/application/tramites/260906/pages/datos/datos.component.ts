import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { map, takeUntil } from 'rxjs';
import { Sanitario260906Store } from '../../../../estados/tramites/sanitario260906.store';
import { SanitarioService } from '../../services/sanitario.service';
import { Subject } from 'rxjs';
import { Tramite260906Store } from '../../../../estados/tramites/tramite260906.store';

/**
 * Componente que gestiona la visualización de datos y permite cambiar entre diferentes pestañas o subtítulos.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit, OnDestroy {
  /**
   * Índice del subtítulo seleccionado.
   * Se utiliza para determinar qué sección de datos se muestra.
   * Inicialmente, el valor es 1.
   */
  indice: number = 1;

  /**
   * Método para cambiar el índice del subtítulo seleccionado.
   *
   * @param i - Índice del nuevo subtítulo seleccionado.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
 * @property {ConsultaioState} consultaDatos
 * @description
 * Datos de consulta del trámite almacenados en el estado global.
 */
  consultaDatos!: ConsultaioState;

  /**
   * @property {boolean} esDatosRespuesta
   * @description
   * Bandera que indica si los datos ya fueron obtenidos y se deben mostrar directamente.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description
   * Subject para cancelar suscripciones automáticamente al destruir el componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * @constructor
   * @param service Servicio que maneja la obtención de datos relacionados al aviso.
   * @param consultaioQuery Consulta reactiva al estado del trámite.
   * @param unicoStore Store de estado donde se guardan los datos de la consulta.
   */
  constructor(
    private service: SanitarioService,
    private consultaioQuery: ConsultaioQuery,
    private tramiteStore: Tramite260906Store,
    private sanitarioStore: Sanitario260906Store
  ) { }

  /**
   * @method
   * @name ngOnInit
   * @description
   * Ciclo de vida del componente. Se ejecuta al inicializar. 
   * Suscribe al estado de datos de consulta y decide si hacer la petición al servicio.
   */
  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
        })
      )
      .subscribe();

    if (this.consultaDatos?.update) {
      this.fetchGetDatosConsulta();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
* @method
* @name fetchGetDatosConsulta
* @description
* Obtiene los datos del trámite desde el servicio y actualiza el estado global (`store`) si la respuesta es exitosa.
*/
  public fetchGetDatosConsulta(): void {
    this.service
      .getDatosConsulta()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        if (respuesta.success) {
          this.esDatosRespuesta = true;

          this.tramiteStore.setRfcResponsableSanitario(respuesta?.datos?.rfcResponsableSanitario);
          this.tramiteStore.setDenominacion(respuesta?.datos?.denominacion);
          this.tramiteStore.setCorreo(respuesta?.datos?.correo);
          this.tramiteStore.setTipoOperacionJustificacion(respuesta?.datos?.tipoOperacionJustificacion);
          this.tramiteStore.setCodigoPostal(respuesta?.datos?.codigoPostal);
          this.tramiteStore.setEstado(respuesta?.datos?.estado);
          this.tramiteStore.setMuncipio(respuesta?.datos?.muncipio);
          this.tramiteStore.setLocalidad(respuesta?.datos?.localidad);
          this.tramiteStore.setColonia(respuesta?.datos?.colonia);
          this.tramiteStore.setCalle(respuesta?.datos?.calle);
          this.tramiteStore.setLada(respuesta?.datos?.lada);
          this.tramiteStore.setTelefono(respuesta?.datos?.telefono);
          this.tramiteStore.setClaveScianModal(respuesta?.datos?.claveScianModal);
          this.tramiteStore.setClaveDescripcionModal(respuesta?.datos?.claveDescripcionModal);
          this.tramiteStore.setAvisoCheckbox(respuesta?.datos?.avisoCheckbox);
          this.tramiteStore.setLicenciaSanitaria(respuesta?.datos?.licenciaSanitaria);
          this.tramiteStore.setRegimen(respuesta?.datos?.regimen);
          this.tramiteStore.setAduanasEntradas(respuesta?.datos?.aduanasEntradas);
          this.tramiteStore.setNumeroPermiso(respuesta?.datos?.numeroPermiso);
          this.tramiteStore.setTiempoPrograma(respuesta?.datos?.tiempoPrograma);
          this.tramiteStore.setClasificacion(respuesta?.datos?.clasificacion);
          this.tramiteStore.setEspecificarClasificacionProducto(respuesta?.datos?.especificarClasificacionProducto);
          this.tramiteStore.setDenominacionEspecifica(respuesta?.datos?.denominacionEspecifica);
          this.tramiteStore.setDenominacionDistintiva(respuesta?.datos?.denominacionDistintiva);
          this.tramiteStore.setDenominacionComun(respuesta?.datos?.denominacionComun);
          this.tramiteStore.setTipoDeProducto(respuesta?.datos?.tipoDeProducto);
          this.tramiteStore.setFormaFarmaceutica(respuesta?.datos?.formaFarmaceutica);
          this.tramiteStore.setEstadoFisico(respuesta?.datos?.estadoFisico);
          this.tramiteStore.setFraccionArancelaria(respuesta?.datos?.fraccionArancelaria);
          this.tramiteStore.setDescripcionFraccion(respuesta?.datos?.descripcionFraccion);
          this.tramiteStore.setCantidadUMT(respuesta?.datos?.cantidadUMT);
          this.tramiteStore.setUMT(respuesta?.datos?.UMT);
          this.tramiteStore.setCantidadUMC(respuesta?.datos?.cantidadUMC);
          this.tramiteStore.setUMC(respuesta?.datos?.UMC);
          this.tramiteStore.setPresentacion(respuesta?.datos?.presentacion);
          this.tramiteStore.setNumeroRegistro(respuesta?.datos?.numeroRegistro);
          this.tramiteStore.setFechaCaducidad(respuesta?.datos?.fechaCaducidad);
          this.tramiteStore.setCumplimiento(respuesta?.datos?.cumplimiento);
          this.tramiteStore.setRfc(respuesta?.datos?.rfc);
          this.tramiteStore.setNombre(respuesta?.datos?.nombre);
          this.tramiteStore.setApellidoPaterno(respuesta?.datos?.apellidoPaterno);
          this.tramiteStore.setApellidoMaterno(respuesta?.datos?.apellidoMaterno);
          this.tramiteStore.setTipoOperacion(respuesta?.datos?.tipoOperacion);
          this.tramiteStore.setInformacionConfidencial(respuesta?.datos?.informacionConfidencial);
          this.tramiteStore.setManifesto(respuesta?.datos?.manifesto);

          this.sanitarioStore.setreferencia(respuesta?.datos?.referencia);
          this.sanitarioStore.setcadenaDependencia(respuesta?.datos?.cadenaDependencia);
          this.sanitarioStore.setbanco(respuesta?.datos?.banco);
          this.sanitarioStore.setLlave(respuesta?.datos?.llave);
          this.sanitarioStore.settipoFetch(respuesta?.datos?.tipoFetch);
          this.sanitarioStore.setimporte(respuesta?.datos?.importe);
          this.sanitarioStore.setSelectedEstado(respuesta?.datos?.selectedEstado);
          this.sanitarioStore.setClave(respuesta?.datos?.setClave);
          this.sanitarioStore.setDescripcion(respuesta?.datos?.setDescripcion);
          this.sanitarioStore.setDespecificarClasificacion(respuesta?.datos?.setDespecificarClasificacion);
          this.sanitarioStore.setFabricante(respuesta?.datos?.Fabricante);
          this.sanitarioStore.setDestinatario(respuesta?.datos?.Destinatario);
          this.sanitarioStore.setProveedor(respuesta?.datos?.Proveedor);
          this.sanitarioStore.setFacturador(respuesta?.datos?.Facturador);
          this.sanitarioStore.setTercerosNacionalidad(respuesta?.datos?.tercerosNacionalidad);
          this.sanitarioStore.setTipoPersona(respuesta?.datos?.tipoPersona);
          this.sanitarioStore.setRfc(respuesta?.datos?.rfc);
          this.sanitarioStore.setCurp(respuesta?.datos?.curp);
          this.sanitarioStore.setNombre(respuesta?.datos?.nombre);
          this.sanitarioStore.setPrimerApellido(respuesta?.datos?.primerApellido);
          this.sanitarioStore.setSegundoApellido(respuesta?.datos?.segundoApellido);
          this.sanitarioStore.setDenominacionRazonSocial(respuesta?.datos?.denominacionRazonSocial);
          this.sanitarioStore.setPais(respuesta?.datos?.pais);
          this.sanitarioStore.setEstadoLocalidad(respuesta?.datos?.estadoLocalidad);
          this.sanitarioStore.setMunicipioAlcaldia(respuesta?.datos?.municipioAlcaldia);
          this.sanitarioStore.setLocalidad(respuesta?.datos?.localidad);
          this.sanitarioStore.setEntidadFederativa(respuesta?.datos?.entidadFederativa);
          this.sanitarioStore.setCodigoPostaloEquivalente(respuesta?.datos?.codigoPostaloEquivalente);
          this.sanitarioStore.setColonia(respuesta?.datos?.colonia);
          this.sanitarioStore.setColoniaoEquivalente(respuesta?.datos?.coloniaoEquivalente);
          this.sanitarioStore.setCalle(respuesta?.datos?.calle);
          this.sanitarioStore.setNumeroExterior(respuesta?.datos?.numeroExterior);
          this.sanitarioStore.setNumeroInterior(respuesta?.datos?.numeroInterior);
          this.sanitarioStore.setLada(respuesta?.datos?.lada);
          this.sanitarioStore.setTelefono(respuesta?.datos?.telefono);
          this.sanitarioStore.setCorreoElectronico(respuesta?.datos?.correoElectronico);
          this.sanitarioStore.setExtranjeroCodigo(respuesta?.datos?.extranjeroCodigo);
          this.sanitarioStore.setExtranjeroEstado(respuesta?.datos?.extranjeroEstado);
          this.sanitarioStore.setExtranjeroColonia(respuesta?.datos?.extranjeroColonia);
          this.sanitarioStore.setEstado(respuesta?.datos?.estado);
        }
      });
  }


  /**
   * @method
   * @name ngOnDestroy
   * @description
   * Ciclo de vida del componente. Se ejecuta al destruir.
   * Finaliza las suscripciones activas para prevenir fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
