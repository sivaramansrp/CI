import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CamState, camCertificadoStore } from '../../estados/cam-certificado.store';
import { ConsultaioQuery, SeccionLibQuery, SeccionLibState, TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CertificadoDeOrigenComponent } from '../../../../shared/components/certificado-de-origen/certificado-de-origen.component';
import { CommonModule } from '@angular/common';
import { DatosCertificadoDeComponent } from '../../../../shared/components/datos-certificado-de/datos-certificado-de.component';
import { DatosDelDestinatarioComponent } from '../../../../shared/components/datos-del-destinatario/datos-del-destinatario.component';
import { DestinatarioComponent } from '../../../../shared/components/destinatario/destinatario.component';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';
interface FormValues {
   [key: string]: unknown;
}
/**
 * @descripcion
 * El componente `CamDestinatarioComponent` es responsable de gestionar los datos y las interacciones
 * relacionadas con el formulario de destinatario en el módulo CAM.
 */
@Component({
  selector: 'app-cam-destinatario',
  templateUrl: './cam-destinatario.component.html',
  styleUrl: './cam-destinatario.component.scss',
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule,CertificadoDeOrigenComponent,
      DatosCertificadoDeComponent,
      DatosDelDestinatarioComponent,TituloComponent,DestinatarioComponent]
})
export class CamDestinatarioComponent implements OnInit, OnDestroy,AfterViewInit {
  /**
   * @descripcion
   * Formulario para capturar los datos del exportador.
   */
  exportadorForm!: FormGroup;

  /**
   * @descripcion
   * Valores actuales del formulario de destinatario.
   */
  formDestinatarioValues!: FormValues;

  /**
   * @descripcion
   * Valores actuales del formulario de datos del destinatario.
   */
  formDatosDelDestinatarioValues!: FormValues;

  /**
   * @descripcion
   * Notificador para gestionar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @descripcion
   * Estado actual del formulario de exportador.
   */
  private exportadoState!: CamState;

  /**
   * @descripcion
   * Estado actual de la sección.
   */
  private seccionState!: SeccionLibState;

  /**
   * Indicates whether the form is in read-only mode.
   *
   * @remarks
   * When set to `true`, the form fields will be displayed as read-only and cannot be edited by the user.
   *
   * @compodoc
   * @description
   * Indica si el formulario se encuentra en modo solo lectura. Si es `true`, los campos del formulario no podrán ser editados por el usuario.
   */
  esFormularioSoloLectura:boolean=false;

  /**
   * @descripcion
   * Constructor que inicializa los servicios y dependencias requeridas.
   * @param fb - Instancia de FormBuilder para gestionar formularios.
   * @param store - Almacén para gestionar el estado del formulario de certificado.
   * @param query - Consulta para obtener el estado del formulario.
   * @param seccionStore - Almacén para gestionar el estado de la sección.
   * @param seccionQuery - Consulta para obtener el estado de la sección.
   */
  constructor(
    private readonly fb: FormBuilder,
    private store: camCertificadoStore,
    private query: camCertificadoQuery,
    private seccionQuery: SeccionLibQuery,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.query.selectFormDatosDelDestinatario$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((estado) => {
        this.formDatosDelDestinatarioValues = estado;
      });

    this.query.selectFormDestinatario$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((estado) => {
        this.formDestinatarioValues = estado;
      });
        this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
      })
    )
    .subscribe()
  }

  /**
   * @descripcion
   * Hook del ciclo de vida que se llama después de inicializar el componente.
   * Obtiene los datos iniciales para el formulario.
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = seccionState;
        })
      )
      .subscribe();
    this.query.selectCam$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.exportadoState = state as CamState;
        })
      )
      .subscribe();

    this.initActionFormBuild();
  }
/**
 * @inheritdoc
 * 
 * @description
 * Método del ciclo de vida de Angular que se ejecuta después de que la vista del componente ha sido inicializada.
 * 
 * @remarks
 * Si el formulario está en modo solo lectura (`esFormularioSoloLectura` es verdadero), deshabilita el formulario `exportadorForm`.
 * En caso contrario, habilita el formulario para permitir la edición.
 * 
 * @see https://angular.io/api/core/AfterViewInit
 */
ngAfterViewInit(): void {
  if(this.esFormularioSoloLectura){
    this.exportadorForm.disable();
  }
  else{
    this.exportadorForm.enable();
  }
}
  /**
   * @descripcion
   * Inicializa el formulario de exportador con los valores actuales del estado.
   */
  initActionFormBuild(): void {
    this.exportadorForm = this.fb.group({
      lugar: [this.exportadoState.lugar, Validators.required],
      exportador: [this.exportadoState.exportador, Validators.required],
      empresa: [this.exportadoState.empresa, Validators.required],
      cargo: [this.exportadoState.cargo, Validators.required],
      lada: [this.exportadoState.lada],
      telfono: [this.exportadoState.telfono, Validators.required],
      fax: [this.exportadoState.fax, Validators.required],
      correo: [this.exportadoState.correo, Validators.required],
    });
  }

  /**
   * @descripcion
   * Actualiza el almacén con los datos del destinatario.
   * @param e - Los datos del destinatario a almacenar.
   */
  datosDelDestinatarioFunc(e: unknown): void {
    this.store.setFormDatosDelDestinatario(e as FormValues);
  }

  /**
 * @descripcion
 * Actualiza el almacén con los datos del formulario de datos del destinatario.
 * @param event - Objeto que contiene el nombre del grupo de formulario, el campo, el valor y el nombre del estado del almacén.
 */
setValoresStoreDatos(event: { formGroupName: string, campo: string, valor: undefined, storeStateName: string }): void {
  const { campo: CAMPO, valor: VALOR } = event;
  this.store.setFormDatosDelDestinatario({ [CAMPO]: VALOR });
}

/**
 * @descripcion
 * Actualiza el almacén con los datos del formulario de destinatario.
 * @param event - Objeto que contiene el nombre del grupo de formulario, el campo, el valor y el nombre del estado del almacén.
 */
setValoresStoreDe(event: { formGroupName: string, campo: string, valor: undefined, storeStateName: string }): void {
  const { campo: CAMPO, valor: VALOR } = event;
  this.store.setFormDestinatario({ [CAMPO]: VALOR });
}
  /**
   * @descripcion
   * Actualiza el almacén con el estado de validación del formulario de destinatario.
   * @param valida - El estado de validación del formulario.
   */
  setFormValida(valida: boolean): void {
    this.store.setFormValida({ destinatrio: valida });
  }

  /**
   * @descripcion
   * Actualiza el almacén con el estado de validación de los datos del destinatario.
   * @param valida - El estado de validación de los datos del destinatario.
   */
  setFormValidaDestinatario(valida: boolean): void {
    this.store.setFormValida({ datosDestinatario: valida });
  }

  /**
   * @descripcion
   * Actualiza el almacén con un valor específico del formulario.
   * @param form - El formulario que contiene el valor.
   * @param campo - El campo del formulario cuyo valor se actualizará.
   * @param metodoNombre - El método del almacén que se llamará para actualizar el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof camCertificadoStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: camCertificadoStore) => void)(VALOR);
  }

  /**
   * @descripcion
   * Hook del ciclo de vida que se llama cuando el componente se destruye.
   * Limpia los recursos y suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}