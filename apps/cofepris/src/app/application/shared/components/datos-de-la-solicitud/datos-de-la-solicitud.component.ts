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
  private destroyNotifier$: Subject<void> = new Subject();

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

  constructor(public fb:FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
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

  eliminarScian(): void {
    this.scianConfig.datos = this.scianConfig.datos.filter((idx: TablaScianConfig) =>{
      return !this.scianLista.some((idx2: TablaScianConfig) => idx2.clave === idx.clave);
    });
    if(this.scianSeleccionado){
      this.scianSeleccionado.emit(this.scianConfig.datos);
    }
  }

  eliminarMercancias(): void {
    this.tablaMercanciasConfig.datos = this.tablaMercanciasConfig.datos.filter((idx: TablaMercanciasDatos) =>{
      return !this.tablaMercanciasLista.some((idx2: TablaMercanciasDatos) => idx2.clasificacionProducto === idx.clasificacionProducto);
    });
    if(this.mercanciasSeleccionado){
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

  agregarScian(): void {
    this.scianConfig.datos = this.scianConfig.datos.concat(this.scianLista);
    if(this.scianSeleccionado){
      this.scianSeleccionado.emit(this.scianConfig.datos);
    }
    this.navigateToAcciones('../scian-selecion');
  }

  agregarMercancias(): void {
    this.tablaMercanciasConfig.datos = this.tablaMercanciasConfig.datos.concat(this.tablaMercanciasLista);
    if(this.mercanciasSeleccionado){
      this.mercanciasSeleccionado.emit(this.tablaMercanciasConfig.datos);
    }
    this.navigateToAcciones('../mercancia-datos');
  }

  modificarDatos(): void {
  this.datosDeTablaSeleccionados.emit({
    scianSeleccionados: this.scianLista,
    mercanciasSeleccionados: this.tablaMercanciasLista,
    opcionSeleccionados: this.opcionLista
  });
  }
  
  mostrarColapsable(orden: number): void {
    if (orden === 1) {
      this.opcionesColapsable = !this.opcionesColapsable;
    } 
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
