import { ActivatedRoute, Router } from '@angular/router';
import {
  CatalogoSelectComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { CommonModule,Location} from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject,map, takeUntil } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Destinatario } from '../../../../shared/models/terceros-relacionados.model';
import { Otros } from '../../models/exporticon-estupefacientes.model';
import { TIPO_TABLA_DATOS } from '../../constants/exporticon-estupefacientes.enum';
import { Tramite260302Query } from '../../estados/tramite260302Query.query';
import { Tramite260302Store } from '../../estados/tramite260302Store.store';

@Component({
  selector: 'app-datos-generales',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
  ],
  templateUrl: './datos-generales.component.html',
  styleUrl: './datos-generales.component.scss',
})
export class DatosGeneralesComponent implements OnDestroy, OnInit {
  /**
   * Variable que almacena el tipo de dato, que se inicializa más tarde.
   * Se usa el operador `!` para indicar que la variable no es nula ni indefinida en el momento de su uso.
   */
  tipoDatos!: string;

  /**
   * Lista de objetos `Catalogo` que contiene los datos de los países.
   * Esta variable se utiliza para almacenar los países en un catálogo.
   */
  paisesDatos: Catalogo[] = [];

  /**
   * @property {Subject<void>} unsubscribe$
   * Subject para cancelar suscripciones activas y evitar fugas de memoria.
   * Se completa en el hook `ngOnDestroy`.
   * @private
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * @property {FormGroup} agregarProveedorForm
   * Formulario reactivo utilizado para capturar los datos del proveedor.
   */
  agregarDatosForm!: FormGroup;

  /**
   * Asigna el valor de `TIPO_TABLA_DATOS` a la variable `tipoTablaDatos`.
   * `TIPO_TABLA_DATOS` es un objeto o constante que define los tipos de datos para las tablas.
   */
  tipoTablaDatos = TIPO_TABLA_DATOS;

    /**
   * @property {Subject<void>} destroyNotifier$
   * Subject utilizado para limpiar las suscripciones activas al destruir el componente.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  public datoSeleccionado!: Destinatario

  constructor(
    private route: ActivatedRoute,
    private datosSolicitudService: DatosSolicitudService,
    private fb: FormBuilder,
    private tramiteStore: Tramite260302Store,
    private router: Router,
    private ubicaccion: Location,
    private tramiteQuery: Tramite260302Query
  ) {
    this.tipoDatos = this.route.snapshot.paramMap.get('tipo') || '';
    this.crearFormulario();
    this.cargarDatos();
  }

   /**
     * @method ngOnInit
     * @description Hook del ciclo de vida que se ejecuta al inicializar el componente.
     * Se suscribe al estado del trámite y guarda su valor localmente para uso posterior.
     */
    ngOnInit(): void {
      this.tramiteQuery.getDestinatarioSeleccionado$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.datoSeleccionado = seccionState?.[0] ?? {} as Destinatario;
          })
        )
        .subscribe();
    }

  /**
   * Crea y inicializa el formulario con los campos y validaciones necesarios.
   * Este formulario incluye información personal y de contacto.
   * 
   * @returns {void}
   */
  crearFormulario(): void {
    this.agregarDatosForm = this.fb.group({
      nombreRazonSocial: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150),
        ],
      ],
      pais: [this.obtenerValor('pais'), Validators.required],
      estado: [this.obtenerValor('estadoLocalidad')],
      codigoPostal: [this.obtenerValor('codigoPostal')],
      colonia: [this.obtenerValor('colonia')],
      calle: [this.obtenerValor('calle'), Validators.required],
      numeroExterior: [this.obtenerValor('numeroExterior')],
      numeroInterior: [this.obtenerValor('numeroInterior')],
      lada: [''],
      telefono: [this.obtenerValor('telefono')],
      correoElectronico: [this.obtenerValor('correoElectronico'), [Validators.required, Validators.email]],
    });
  }

  /**
   * @method cargarDatos
   * @description Obtiene la lista de países del servicio de datos y la almacena en `paisesDatos`.
   */
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerListaPaises()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.paisesDatos = data;
      });
  }

  /**
   * Navega a la ruta 'pago/importacion-materias-primas-estupefacientes'.
   */
  cancelar(): void {
    this.ubicaccion.back();
  }

  /**
   * Resetea los valores del formulario 'agregarDatosForm'.
   * Restaura el formulario a su estado inicial.
   */
  limpiarFormulario(): void {
    this.agregarDatosForm.reset();
  }

  /**
   * Guarda los datos del formulario dependiendo del tipo de datos (`tipoDatos`).
   * Dependiendo del valor de `tipoDatos`, se llama a un método específico para guardar los datos.
   * Luego navega a la ruta 'pago/importacion-materias-primas-estupefacientes'.
   */
  guardarDatos(): void {
    switch (this.tipoDatos) {
      case this.tipoTablaDatos.DESTINATARIO:
        this.addDestinatario([this.agregarDatosForm.getRawValue()]);
        break;
      case this.tipoTablaDatos.OTROS:
        this.addOtros([this.agregarDatosForm.value]);

       break;
      default:
        break;
    }
    this.ubicaccion.back();
  }

  /**
   * @method addDestinatario
   * @description Agrega nuevos fabricantes a la tabla de datos del trámite.
   *
   * @param newFabricantes - Lista de objetos `Fabricante` a agregar.
   */
  addDestinatario(newDestinatario: Destinatario[]): void {
    this.tramiteStore.updateDestinatarioTablaDatos(newDestinatario);
  }

  /**
   * Actualiza los datos de tipo 'Otros' en el store 'tramiteStore'.
   * Recibe un array de objetos de tipo 'Facturador' y actualiza la información correspondiente.
   *
   * @param datos - Array de objetos `Facturador` con los datos a actualizar.
   */
  addOtros(datos: Otros[]): void {
    this.tramiteStore.updateOtrosTablaDatos(datos);
  }

   /**
     * Obtiene el valor de un campo específico del formulario o de los datos seleccionados.
     * @param {keyof TablaMercanciasDatos | keyof MercanciaForm} field - Nombre del campo a obtener.
     * @returns {string | number | undefined | string[]} - Valor del campo especificado.
     */
    public obtenerValor(field: keyof Destinatario): string | number | undefined | string[] {
      return this.datoSeleccionado?.[field as keyof Destinatario] ?? '';
    }

      /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  
}
