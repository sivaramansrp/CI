
import { ALERTA_DE_MANIFESTO_Y_DECLARACIONES, ALERTA_OPCIONS } from '../../constantes/datos-solicitud.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { Catalogo, DatosDeTablaSeleccionados, OpcionConfig, TablaMercanciasConfig, TablaMercanciasDatos, TablaOpcionConfig } from '../../models/datos-solicitud.model';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ScianConfig } from '../../models/datos-solicitud.model';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaScianConfig } from '../../models/datos-solicitud.model';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { tap } from 'rxjs';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule, TituloComponent, CatalogoSelectComponent, TablaDinamicaComponent, AlertComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit {

  @Input() public scianConfig!: ScianConfig<TablaScianConfig>;
  @Input() public tablaMercanciasConfig!: TablaMercanciasConfig<TablaMercanciasDatos>;
  @Input() public opcionConfig!: OpcionConfig<TablaOpcionConfig>;

  @Output() opcionSeleccionado: EventEmitter<TablaOpcionConfig[]> = new EventEmitter<TablaOpcionConfig[]>();
  @Output() scianSeleccionado: EventEmitter<TablaScianConfig[]> = new EventEmitter<TablaScianConfig[]>();
  @Output() mercanciasSeleccionado: EventEmitter<TablaMercanciasDatos[]> = new EventEmitter<TablaMercanciasDatos[]>();
  @Output() datosDeTablaSeleccionados: EventEmitter<DatosDeTablaSeleccionados> = new EventEmitter<DatosDeTablaSeleccionados>();

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
  public manifiestosCasillaDeVerificacion = false;
  public alertaDeManifestoContenido = ALERTA_DE_MANIFESTO_Y_DECLARACIONES;
  public alertaOpicion = ALERTA_OPCIONS;
  public tablaMercanciasLista: TablaMercanciasDatos[] = [];
  public scianLista: TablaScianConfig[] = [];
  public opcionLista: TablaOpcionConfig[] = [];
  public opcionesColapsable = false;

  constructor(public fb:FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.datosSolicitudForm = this.fb.group({
      rfcSanitario: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      denominacionRazon: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      correoElectronico: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      codigoPostal: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      municipioAlcaldia: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      localidad: ['', [Validators.required]],
      colonia: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      lada: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      aviso: ['', [Validators.required]],
      licenciaSanitaria: ['', [Validators.required]],
      regimen: ['', [Validators.required]],
      adunasDeEntradas: ['', [Validators.required]],
      aeropuerto: [false, [Validators.required]],
      publico: ['no', [Validators.required]],
      representanteRfc: ['', [Validators.required]],
      representanteNombre: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
    });

    this.datosSolicitudForm.statusChanges.pipe(
      tap((form) => {
      if (form) {
        this.datosSolicitudForm.patchValue({
          representanteNombre: '',
          apellidoPaterno: '',
          apellidoMaterno: ''
        });
      }
    })).subscribe();
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

    manifestoSellecionado(): void {
      this.manifiestosCasillaDeVerificacion = !this.manifiestosCasillaDeVerificacion;
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
}
