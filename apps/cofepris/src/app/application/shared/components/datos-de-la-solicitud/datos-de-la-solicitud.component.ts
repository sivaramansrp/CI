import { ALERTA_DE_MANIFESTO_Y_DECLARACIONES, ALERTA_OPCIONS } from '../../constantes/datos-solicitud.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { Catalogo, DatosDeTablaSeleccionados, DatosSolicitudFormState, OpcionConfig, TablaMercanciasConfig, TablaMercanciasDatos, TablaOpcionConfig } from '../../models/datos-solicitud.model';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { delay, takeUntil } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ScianConfig } from '../../models/datos-solicitud.model';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaScianConfig } from '../../models/datos-solicitud.model';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule, TituloComponent, CatalogoSelectComponent, TablaDinamicaComponent, AlertComponent,
    ReactiveFormsModule, FormsModule
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  public destroyNotifier$: Subject<void> = new Subject();

  @Input() public scianConfig!: ScianConfig<TablaScianConfig>;
  @Input() public tablaMercanciasConfig!: TablaMercanciasConfig<TablaMercanciasDatos>;
  @Input() public opcionConfig!: OpcionConfig<TablaOpcionConfig>;
  @Input() public datosSolicitudFormState!: DatosSolicitudFormState;

  @Output() opcionSeleccionado: EventEmitter<TablaOpcionConfig[]> = new EventEmitter<TablaOpcionConfig[]>();
  @Output() scianSeleccionado: EventEmitter<TablaScianConfig[]> = new EventEmitter<TablaScianConfig[]>();
  @Output() mercanciasSeleccionado: EventEmitter<TablaMercanciasDatos[]> = new EventEmitter<TablaMercanciasDatos[]>();
  @Output() datosDeTablaSeleccionados: EventEmitter<DatosDeTablaSeleccionados> = new EventEmitter<DatosDeTablaSeleccionados>();

  @Output() datasolicituActualizar: EventEmitter<DatosSolicitudFormState> = new EventEmitter<DatosSolicitudFormState>();

  public datosSolicitudForm!: FormGroup;
  public estadoDatos: Catalogo[] = [];
  public regimenDatos: Catalogo[] = [];
  public adunasDeEntradasDatos: Catalogo[] = [];
  /**
   *
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';
  public alertaDeManifestoContenido = ALERTA_DE_MANIFESTO_Y_DECLARACIONES;
  public alertaOpicion = ALERTA_OPCIONS;
  public tablaMercanciasLista: TablaMercanciasDatos[] = [];
  public scianLista: TablaScianConfig[] = [];
  public opcionLista: TablaOpcionConfig[] = [];

  public opcionesColapsable = false;

  constructor(public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.crearDatosSolicitudForm();
    this.datosSolicitudForm.valueChanges.pipe(
      takeUntil(this.destroyNotifier$),
      delay(10)).subscribe(
        (value) => {
          if (value) {
            this.datasolicituActualizar.emit(value);
          }
        }
      );
  }

  /**
   * @method crearDatosSolicitudForm
   * @description Crea y configura el formulario reactivo `datosSolicitudForm` con los campos necesarios
   *              para capturar la información de la solicitud. Cada campo incluye validaciones como
   *              longitud mínima, longitud máxima y obligatoriedad.
   * 
   * @returns {void} Este método no retorna ningún valor.
   */
  crearDatosSolicitudForm(): void {
    this.datosSolicitudForm = this.fb.group({
      rfcSanitario: [this.datosSolicitudFormState.rfcSanitario, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      denominacionRazon: [this.datosSolicitudFormState.denominacionRazon, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      correoElectronico: [this.datosSolicitudFormState.correoElectronico, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      codigoPostal: [this.datosSolicitudFormState.codigoPostal, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      estado: [this.datosSolicitudFormState.estado, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      municipioAlcaldia: [this.datosSolicitudFormState.municipioAlcaldia, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      localidad: [this.datosSolicitudFormState.localidad, [Validators.required]],
      colonia: [this.datosSolicitudFormState.colonia, [Validators.required]],
      calle: [this.datosSolicitudFormState.calle, [Validators.required]],
      lada: [this.datosSolicitudFormState.lada, [Validators.required]],
      telefono: [this.datosSolicitudFormState.telefono, [Validators.required]],
      aviso: [this.datosSolicitudFormState.aviso, [Validators.required]],
      licenciaSanitaria: [this.datosSolicitudFormState.licenciaSanitaria, [Validators.required]],
      regimen: [this.datosSolicitudFormState.regimen, [Validators.required]],
      adunasDeEntradas: [this.datosSolicitudFormState.adunasDeEntradas, [Validators.required]],
      aeropuerto: [this.datosSolicitudFormState.aeropuerto, [Validators.required]],
      publico: [this.datosSolicitudFormState.publico, [Validators.required]],
      representanteRfc: [this.datosSolicitudFormState.representanteRfc, [Validators.required]],
      representanteNombre: [this.datosSolicitudFormState.representanteNombre, [Validators.required]],
      apellidoPaterno: [this.datosSolicitudFormState.apellidoPaterno, [Validators.required]],
      apellidoMaterno: [this.datosSolicitudFormState.apellidoMaterno, [Validators.required]],
    });
  }

  /**
   * Valida si el campo de un formulario no contiene errores
   * @param {AbstractControl} control  : Control del formulario
   * @param {string} campo  : Nombre del campo a validar, si el control es un FormGroup
   * @returns {boolean | null} : Retorna true si el campo contiene errores y ha sido tocado, de lo contrario retorna false
   */
  // eslint-disable-next-line class-methods-use-this
  public isValid(control: AbstractControl, campo?: string): boolean | null {
    if (control instanceof FormGroup && campo) {
      return control.controls[campo].errors && control.controls[campo].touched;
    }
    return control.errors && control.touched;
  }

  /**
   * Busca el RFC del representante en el formulario y, si existe, 
   * actualiza los campos relacionados con el nombre, apellido paterno 
   * y apellido materno del representante con valores predeterminados.
   *
   * @remarks
   * Este método verifica si el campo 'representanteRfc' tiene un valor 
   * en el formulario `datosSolicitudForm`. Si el valor está presente, 
   * se actualizan los campos 'representanteNombre', 'apellidoPaterno' 
   * y 'apellidoMaterno' con datos específicos.
   */
  buscarRepresentanteRfc(): void {
    const RFC = this.datosSolicitudForm.get('representanteRfc')?.value;
    if (RFC) {
      this.datosSolicitudForm.patchValue({
        representanteNombre: 'EUROFOODS DE MEXICO',
        apellidoPaterno: 'GONZALEZ',
        apellidoMaterno: 'PINAL'
      });
    }
  }

  /**
   * Elimina elementos de la configuración SCIAN que coincidan con los elementos de la lista SCIAN.
   * 
   * Este método filtra los datos de la configuración SCIAN (`scianConfig.datos`) eliminando
   * aquellos elementos cuya clave coincida con algún elemento de la lista SCIAN (`scianLista`).
   * 
   * Si hay un elemento seleccionado (`scianSeleccionado`), emite los datos actualizados
   * de la configuración SCIAN.
   */
  eliminarScian(): void {
    if(!this.scianLista.length){
      return;
    }
    this.scianConfig.datos = this.scianConfig.datos.filter((idx: TablaScianConfig) => {
      return !this.scianLista.some((idx2: TablaScianConfig) => idx2.clave === idx.clave);
    });
    if (this.scianSeleccionado) {
      this.scianSeleccionado.emit(this.scianConfig.datos);
    }
  }

  /**
   * Elimina las mercancías seleccionadas de la lista de datos de la tabla.
   * 
   * Este método filtra los datos de la tabla de mercancías (`tablaMercanciasConfig.datos`) 
   * eliminando aquellos elementos cuya clasificación de producto coincide con 
   * alguno de los elementos en la lista de mercancías (`tablaMercanciasLista`).
   * 
   * Si hay mercancías seleccionadas (`mercanciasSeleccionado`), emite el evento 
   * con los datos actualizados de la tabla de mercancías.
   */
  eliminarMercancias(): void {
    if(!this.tablaMercanciasLista.length){
      return;
    }
    this.tablaMercanciasConfig.datos = this.tablaMercanciasConfig.datos.filter((idx: TablaMercanciasDatos) => {
      return !this.tablaMercanciasLista.some((idx2: TablaMercanciasDatos) => idx2.clasificacionProducto === idx.clasificacionProducto);
    });
    if (this.mercanciasSeleccionado) {
      this.mercanciasSeleccionado.emit(this.tablaMercanciasConfig.datos);
    }
  }

  /**
   * Navega a la ruta de acciones
   * @param accionesPath
   */
  navigateToAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * Agrega los elementos seleccionados de la lista SCIAN a la configuración actual
   * y emite los datos actualizados si hay un elemento seleccionado.
   * Luego, navega a la ruta de acciones correspondiente.
   *
   * @remarks
   * - Combina los datos existentes con los nuevos elementos seleccionados de la lista SCIAN.
   * - Emite un evento con los datos actualizados si `scianSeleccionado` está definido.
   * - Redirige al usuario a la ruta '../scian-selecion'.
   */
  agregarScian(): void {
    this.scianConfig.datos = this.scianConfig.datos.concat(this.scianLista);
    if (this.scianSeleccionado) {
      this.scianSeleccionado.emit(this.scianConfig.datos);
    }
    this.navigateToAcciones('../scian-selecion');
  }

  /**
   * Agrega las mercancías seleccionadas a la configuración de la tabla y emite el evento correspondiente.
   * 
   * Este método concatena los datos de la lista de mercancías seleccionadas con los datos existentes
   * en la configuración de la tabla. Si hay un elemento seleccionado, emite un evento con los datos
   * actualizados. Finalmente, navega a la ruta especificada para realizar acciones adicionales.
   * 
   * @returns {void} Este método no devuelve ningún valor.
   */
  agregarMercancias(): void {
      this.tablaMercanciasConfig.datos = this.tablaMercanciasConfig.datos.concat(this.tablaMercanciasLista);
    if (this.mercanciasSeleccionado) {
      this.mercanciasSeleccionado.emit(this.tablaMercanciasConfig.datos);
    }
    this.navigateToAcciones('../mercancia-datos');
  }

  /**
   * Emite un evento con los datos seleccionados de las listas asociadas.
   * 
   * Este método recopila las listas seleccionadas de `scianLista`, 
   * `tablaMercanciasLista` y `opcionLista`, y las emite a través del 
   * evento `datosDeTablaSeleccionados`.
   * 
   * @remarks
   * Este método es útil para comunicar los datos seleccionados a otros 
   * componentes o servicios que estén escuchando el evento emitido.
   */
  modificarDatos(): void {
    this.datosDeTablaSeleccionados.emit({
      scianSeleccionados: this.scianLista,
      mercanciasSeleccionados: this.tablaMercanciasLista,
      opcionSeleccionados: this.opcionLista
    });
  }

  /**
   * Muestra u oculta una sección colapsable basada en el orden proporcionado.
   * 
   * @param orden - Un número que indica el orden de la sección colapsable. 
   *                Si el valor es 1, alterna el estado de `opcionesColapsable`.
   */
  mostrarColapsable(orden: number): void {
    if (orden === 1) {
      this.opcionesColapsable = !this.opcionesColapsable;
    }
  }

  /**
   * Emite un evento con los datos seleccionados de la tabla.
   * 
   * Este método recopila las listas seleccionadas de SCIAN, mercancías y opciones,
   * y las emite a través del evento `datosDeTablaSeleccionados` para que puedan ser
   * procesadas por otros componentes o servicios.
   * 
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
