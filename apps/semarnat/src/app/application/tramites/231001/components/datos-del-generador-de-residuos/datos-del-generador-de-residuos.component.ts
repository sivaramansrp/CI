import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosPasos } from '@ng-mf/data-access-user';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { MateriaprimaformserviceService } from '../../services/materia-prima-formservice.service';
import { OnInit } from '@angular/core';
import { PASOS } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud231001State } from '../../../../tramites/231001/estados/tramites/tramite231001.store';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite231001Query } from '../../../../tramites/231001/estados/queries/tramite231001.query';
import { Tramite231001Store } from '../../../../tramites/231001/estados/tramites/tramite231001.store';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { WizardComponent } from '@ng-mf/data-access-user';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-datos-del-generador-de-residuos',
  standalone: true,
  imports: [ CommonModule,
      CatalogoSelectComponent,
      TituloComponent,
      ReactiveFormsModule
      ],
  templateUrl: './datos-del-generador-de-residuos.component.html',
  styleUrl: './datos-del-generador-de-residuos.component.scss',
})
export class DatosDelGeneradorDeResiduosComponent implements OnInit {
  /**
   * Subject utilizado para limpiar las suscripciones y evitar fugas de memoria.
   * Se debe emitir y completar en ngOnDestroy.
   */
  private destroyed$: Subject<void> = new Subject();

  /**
   *  datosForm
   *  FormGroup que contiene el formulario de datos.
   */
  datosForm!: FormGroup;

  /**
   *  aduanas
   *  Arreglo que almacena los catálogos de aduanas.
   */
  aduanas!: Catalogo[];

  /**
   *  selectedAduana
   *  Aduana seleccionada en el formulario.
   */
  selectedAduana!: string | number;

  /**
   *  pasos
   *  Lista de pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   *  indice
   *  Índice del paso actual en el wizard.
   */
  indice: number = 1;

  /**
   *  texto
   *  Texto del aviso de privacidad.
   */
  texto: string = 'Aviso de Privacidad simplificado';

  /**
   *  solicitudForm
   *  FormGroup que contiene el formulario de solicitud.
   */
  solicitudForm!: FormGroup;
    /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando se establece en `true`, todos los controles del formulario y elementos interactivos
   * se deshabilitan, impidiendo que el usuario realice cambios. Esta propiedad normalmente se
   * configura según el estado de la aplicación, por ejemplo, al visualizar una solicitud enviada
   * o cuando el usuario no tiene permisos de edición.
   */
    esFormularioSoloLectura: boolean = false;
      /**
   * Estado actual de la sección del trámite 120501.
   * Esta propiedad almacena los datos del estado de la sección, obtenidos generalmente
   * desde el store o desde una consulta al backend. Se utiliza para inicializar y actualizar
   * los formularios del componente con los valores correspondientes a la solicitud en curso.
   */
     private seccionState!: Solicitud231001State;
  /**
   * Constructor del componente.
   */
  constructor(
    public fb: FormBuilder,
    private catalogosServices: CatalogosService,
    private tramite231001Query: Tramite231001Query,
    private tramite231001Store: Tramite231001Store,
    private consultaioQuery: ConsultaioQuery,
    private serviceMateria:MateriaprimaformserviceService
  ) {

    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();


  }

  /**
   * Verifica si un control del formulario es inválido y ha sido interactuado por el usuario.
   */
  isInvalid(id: string): boolean | undefined {
    const CONTROL = this.solicitudForm.get('datosdelForm')?.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

  /**
   * Maneja el envío del formulario.
   */
  onSubmit(): void {
    this.solicitudForm.markAllAsTouched();
  }

  /**
   * Referencia al componente del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Inicializa el componente.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
   this.aduanasdata();
  }

  
  /**
   * Obtiene los datos de las aduanas desde el servicio de catálogos.
   */
  aduanasdata(): void {
    this.serviceMateria.getSubPartidaFraccion().pipe(
      takeUntil(this.destroyed$)).subscribe(
      (data) => {
        this.aduanas = data;
      }
    );
  }


  /**
 * Obtiene el valor de un campo específico del formulario y lo establece en el store utilizando el método proporcionado.
 */
setValoresStore(form: FormGroup, campo: string): void {
  const VALOR = form.get(campo)?.value;
  this.tramite231001Store.actualizarEstado({ [campo]: VALOR });
}

     /**
 * Inicializa el estado de los formularios según el modo de solo lectura.
 *
 * Si el formulario está en modo solo lectura (`esFormularioSoloLectura`), llama a `guardarDatosFormulario()`
 * para deshabilitar todos los controles. En caso contrario, inicializa los formularios normalmente.
 */
   inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); 
    } else {
      this.inicializarFormulario();
    }
  }
    /**
 * Guarda y actualiza el estado de los formularios según el modo de solo lectura.
 *
 * Inicializa los formularios y luego los deshabilita si el formulario está en modo solo lectura,
 * o los habilita si está en modo edición.
 */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.solicitudForm.disable();
      this.datosForm.disable();
     
    } else {
      this.solicitudForm.enable();
      this.datosForm.enable();
    }
}
  /**
 * Inicializa los formularios principales del componente con los valores actuales del estado.
 */
  inicializarFormulario(): void {
    this. obtenerEstadoSolicitud();
    this.solicitudForm = this.fb.group({
        numeroRegistroAmbiental: [this.seccionState?.numeroRegistroAmbiental, Validators.required],
        descripcionGenerica1: [this.seccionState?.descripcionGenerica1, Validators.required],
        numeroProgramaImmex: [this.seccionState?.numeroProgramaImmex, Validators.required],
    });
    
      this.datosForm = this.fb.group({
      aduanas: [this.seccionState?.aduanas, Validators.required],
    });
  }
    /**
   * Suscribe al observable `selectSolicitud$` del query `tramite120501Query` para obtener el estado actual de la solicitud y actualizar la propiedad `seccionState` con los datos recibidos. La suscripción se mantiene activa hasta que se emite un valor en `destroyed$`, evitando fugas de memoria.
   */
  obtenerEstadoSolicitud(): void {
    this.tramite231001Query.selectSolicitud$?.pipe(takeUntil(this.destroyed$))
      .subscribe((data: Solicitud231001State) => {
        this.seccionState = data;
      });
  }

  
}
