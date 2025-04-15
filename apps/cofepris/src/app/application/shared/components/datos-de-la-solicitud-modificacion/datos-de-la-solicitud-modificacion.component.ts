import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, Notificacion,NotificacionesComponent, Pedimento, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EstablecimientoService } from '../../services/establecimiento.service';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { PropietarioTipoPersona } from '../../models/datos-de-la-solicitud.model';
import { SCIAN_DATA } from '../../constantes/datos-scian.enum';
import { ScianData } from '../../models/datos-modificacion.model';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-datos-de-la-solicitud-modificacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NotificacionesComponent,InputRadioComponent,TituloComponent, TablaDinamicaComponent],
  templateUrl: './datos-de-la-solicitud.component-modificacion.html',
  styleUrl: './datos-de-la-solicitud.component-modificacion.scss',
})
export class DatosDeLaSolicitudModificacionComponent implements OnInit, OnDestroy {
  datosSolicitudform!: FormGroup;
  manifiestosRepresentanteForm!: FormGroup;
    /**
      * Configuración de columnas para la tabla de datos SCIAN.
      */
     configuracionTabla: ConfiguracionColumna<ScianData>[] = SCIAN_DATA;
   /**
   * Datos cargados dinámicamente para la tabla SCIAN.
   */
   datosData: ScianData[] = [];
     /**
      * Enum para la selección de tablas.
      */
     tipoSeleccionTabla = TablaSeleccion;
     private destroy$ = new Subject<void>();
      /**
     * Notificación actual que se muestra en el componente.
     * 
     * Esta propiedad almacena los datos de la notificación que se mostrará al usuario.
     * Se utiliza para configurar el tipo, categoría, mensaje y otros detalles de la notificación.
     */
    /**
 * Índice del elemento que se desea eliminar.
 * 
 * Esta propiedad almacena el índice del elemento seleccionado para su eliminación
 * en la lista de pedimentos.
 */
elementoParaEliminar!: number;
    public nuevaNotificacion!: Notificacion;
    /**
     * Lista de pedimentos.
     * 
     * Esta propiedad almacena un arreglo de objetos de tipo `Pedimento`, que representan
     * los pedimentos gestionados en el componente.
     */
    pedimentos: Array<Pedimento> = [];
    /**
 * Abre el modal de confirmación para eliminar un pedimento.
 * 
 * Este método configura los datos de la notificación que se mostrará en el modal
 * de confirmación. También almacena el índice del elemento que se desea eliminar.
 * 
 * @param i - Índice del pedimento que se desea eliminar. Por defecto, es 0.
 */
abrirModal(i: number = 0): void {
  this.nuevaNotificacion = {
    tipoNotificacion: 'alert',
    categoria: 'danger',
    modo: 'action',
    titulo: '',
    mensaje: 'Por el momento no hay comunicación con el Sistema de COFEPRIS, favor de capturar su establecimiento.',
    cerrar: false,
    tiempoDeEspera: 2000,
    txtBtnAceptar: 'Aceptar',
    txtBtnCancelar: 'Cancelar',
  };

  this.elementoParaEliminar = i;
}

  /**
    * Opciones genéricas para el formulario.
    */
   genericOptions: PropietarioTipoPersona[] = [];
     /**
   * Opciones para el radio de información confidencial.
   */
  informacionConfidencialRadioOption: PropietarioTipoPersona[]=[];

  constructor( private formBuilder: FormBuilder,
    private establecimientoService: EstablecimientoService,
  ) { 
    //Reservado para futuras inyecciones de dependencias o inicializaciones.
  }

  ngOnInit(): void { 
    this.datosSolicitudform = this.formBuilder.group({
      ideGenerica1: ['',Validators.required],
      observaciones: ['',Validators.required],
      establecimientoRazonSocial: ['',Validators.required],
      establecimientoCorreoElectronico: ['',Validators.required],
      establecimientoDomicilioCodigoPostal: ['',Validators.required],
      establecimientoEstados: ['',Validators.required],
      descripcionMunicipio: ['',Validators.required],
      localidad: [''],
      establishomentoColonias: [''],
      calle: ['',Validators.required],
      lada: [''],
      telefono: ['',Validators.required],
      avisoCheckbox: [''],
      noLicenciaSanitaria: [''],
      regimen: ['',Validators.required],
      aduanasEntradas: ['',Validators.required],
      aifaCheckbox: ['',Validators.required],
    });

    this.manifiestosRepresentanteForm = this.formBuilder.group({
      manifests: ['',Validators.required],
      informacionConfidencialRadio: ['',Validators.required],
    });

    this.establecimientoService
    .getJustificationData()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: PropietarioTipoPersona[]) => {
      this.genericOptions = data; // Bind the fetched data
    });

    this.establecimientoService
    .getInformacionConfidencialRadioOptions()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: PropietarioTipoPersona[]) => {
      this.informacionConfidencialRadioOption = data; // Bind the fetched data
     
    });
  }
  
  /**
 * Elimina un pedimento de la lista.
 * 
 * Este método elimina el pedimento seleccionado de la lista de pedimentos si
 * el usuario confirma la acción en el modal de confirmación.
 * 
 * @param borrar - Indica si se debe proceder con la eliminación. Si es `true`,
 * se elimina el pedimento correspondiente.
 */
eliminarPedimento(borrar: boolean): void {
  if (borrar) {
    this.pedimentos.splice(this.elementoParaEliminar, 1);
  }
}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
