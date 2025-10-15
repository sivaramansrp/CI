import { Component, OnDestroy, OnInit } from '@angular/core';
import { HistoricoColumnas, MercanciaTabla } from '../../models/peru-certificado.module';
import { Subject, map, takeUntil } from 'rxjs';
import { ConfiguracionColumna, ConsultaioQuery } from '@ng-mf/data-access-user';
import { FormBuilder } from '@angular/forms';
import { PeruCertificadoService } from '../../services/peru-certificado.service';
import { Tramite110205Query } from '../../estados/tramite110205.query';
import { Tramite110205Store } from '../../estados/tramite110205.store';
import { CONFIGURACION_PRODUCTOR_EXPORTADOR } from '../../../../shared/constantes/certificado-tabla.enum';

@Component({
  selector: 'app-peru-historico-productores',
  templateUrl: './peru-historico-productores.component.html',
  styleUrl: './peru-historico-productores.component.scss',
})
export class PeruHistoricoProductoresComponent implements OnInit, OnDestroy {
  /**
   * Lista de productores disponibles para el exportador.
   */
  productoresExportador: HistoricoColumnas[] = [];
  /**
   * @property {MercanciaTabla[]} mercancia - Arreglo que contiene información de las mercancías.
   * @command Este arreglo se utiliza para almacenar y gestionar los datos relacionados con las mercancías en el componente.
   */
  mercancia: MercanciaTabla[] = [];

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property tramiteState
   * @command
   * Este objeto se utiliza para almacenar y gestionar el estado actual del trámite.
   */
  public tramiteState!: { [key: string]: unknown };
  /**
   * @public
   * @property {Object} agregarDatosProductor - Objeto utilizado para agregar datos relacionados con un productor.
   * @description Este objeto puede contener claves con valores de diferentes tipos, incluyendo cadenas, números, booleanos, objetos o indefinidos.
   * @command Este objeto es utilizado para gestionar la información de los productores en el componente.
   */
  public agregarDatosProductor!: { [key: string]: unknown };

  /**
   * @descripcion
   * Indica si el formulario se encuentra en modo solo lectura.
   */
  esFormularioSoloLectura: boolean = false;

  tableColumns: ConfiguracionColumna<HistoricoColumnas>[] =
      CONFIGURACION_PRODUCTOR_EXPORTADOR;

  /**
   * Constructor del componente.
   *
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {peruCertificadoService} peruCertificadoService - Servicio para obtener datos relacionados con los productores.
   * @param {Tramite110216Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110216Query} tramiteQuery - Query para obtener el estado del trámite.
   */
  constructor(
    public fb: FormBuilder,
    private peruCertificadoService: PeruCertificadoService,
    public store: Tramite110205Store,
    public tramiteQuery: Tramite110205Query,
    private consultaQuery: ConsultaioQuery
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   *
   * Carga los datos iniciales, configura los formularios y suscribe al estado del trámite.
   */
  ngOnInit(): void {
    this.cargarMercancia();
    this.tramiteQuery.formulario$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
          // Call cargarProductorPorExportador only when productorMismoExportador is checked
          if (seccionState?.['productorMismoExportador']) {
            this.cargarProductorPorExportador();
          }
        })
      )
      .subscribe();
    this.tramiteQuery.agregarDatosProductorFormulario$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.agregarDatosProductor = seccionState;
        })
      )
      .subscribe();

    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }

  /**
   * Carga la lista de productores disponibles para el exportador desde el servicio.
   */
  cargarProductorPorExportador(): void {
    this.peruCertificadoService
      .obtenerProductorPorExportador()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.productoresExportador = respuesta.datos;
      });
  }

  /**
   * Carga la lista de productores disponibles para el exportador desde el servicio.
   */
  cargarMercancia(): void {
    this.peruCertificadoService
      .obtenerMercancia()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.mercancia = respuesta.datos;
      });
  }

  /**
   * Establece valores en el estado del store para un formulario histórico.
   *
   * @param event - Objeto que contiene los datos necesarios para actualizar el store.
   * @param event.formGroupName - Nombre del grupo de formulario (no utilizado en este método).
   * @param event.campo - Nombre del campo que se actualizará en el store.
   * @param event.valor - Valor que se asignará al campo en el store.
   * @param event.storeStateName - Nombre del estado del store (no utilizado en este método).
   *
   * @returns void
   */
  setValoresStore(event: {
    formGroupName: string;
    campo: string;
    valor: undefined;
    storeStateName: string;
  }): void {
    const { campo: CAMPO, valor: VALOR } = event;
    this.store.setFormHistorico({ [CAMPO]: VALOR });
  }

  /**
   * Establece valores en el store para agregar datos del formulario del productor.
   *
   * @param event - Objeto que contiene los datos necesarios para actualizar el store.
   * @param event.formGroupName - Nombre del grupo de formulario (no utilizado en este método).
   * @param event.campo - Nombre del campo que se actualizará en el store.
   * @param event.valor - Valor que se asignará al campo en el store.
   * @param event.storeStateName - Nombre del estado del store (no utilizado en este método).
   *
   * @returns void
   *
   * @command Actualiza el estado del store con los valores proporcionados.
   */
  setValoresStoreAgregarForm(event: {
    formGroupName: string;
    campo: string;
    valor: string | number | boolean | null;
    storeStateName: string;
  }): void {
    const { campo: CAMPO, valor: VALOR } = event;
    this.store.setAgregarFormDatosProductor({ [CAMPO]: VALOR });
  }

  /**
   * Método que se ejecuta al destruir el componente.
   *
   * Libera los recursos y cancela las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  conseguirDisponiblesDatos(): void {
    const SELECTED_RFC = this.agregarDatosProductor['numeroRegistroFiscal'];
    console.log('Selected RFC:', SELECTED_RFC);
    const PAYLOAD = {
      rfc_solicitante: SELECTED_RFC,
    };
    this.peruCertificadoService
      .obtenerProductoruNevo(PAYLOAD)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response: any) => {
          console.log('Response from agregar productor nuevo:', response);
          const MAPPED_DATA: HistoricoColumnas[] = (response?.datos ?? []).map(
            (item: any) => ({
              id: item.id,
              nombreProductor: item.nombreCompleto,
              numeroRegistroFiscal: item.rfc,
              direccion: item.direccionCompleta,
              correoElectronico: item.correoElectronico,
              telefono: item.telefono,
              fax: item.fax,
            })
          );
          // this.datosTablaUno$ = of(MAPPED_DATA || []);
          //     this.store.setmercanciaTabla(this.datosTablaUno$ as unknown as Mercancia[]);

          this.store.setProductores(MAPPED_DATA);
        },
        error: () => {
          // this.toastr.error('Error al buscar Mercancia');
        },
      });

    // this.mercanciasDisponibles = true;
  }
}
