import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { formaDatosInfo, INSTALACIONES_PRINCIPALES_TABLA, InstalacionesPrincipalesTablaInfo} from '@libs/shared/data-access-user/src/core/models/6502/dato-comunes.model';
import { map, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroPoblacionalService } from '../../service/registro-poblacional.service';
import modal from 'bootstrap/js/dist/modal';
import Modal from 'bootstrap/js/dist/modal';
import { Solicitud6502State, Tramite6502Store } from '../../../../core/estados/tramites/tramite6502.store';
import { Tramite6502Query } from '../../../../core/queries/tramite6502.query';

@Component({
  selector: 'app-aviso-de-cambio',
  standalone: true,
  imports: [
    CommonModule,
    TablaDinamicaComponent,
    TituloComponent,
    ReactiveFormsModule
  ],
  templateUrl: './aviso-de-cambio.component.html',
  styleUrl: './aviso-de-cambio.component.scss',
})
export class AvisoDeCambioComponent implements OnDestroy,OnInit,AfterViewInit{
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
  modalInstance!:modal
  modalForma!:FormGroup
  /**
   * Estado actual de la solicitud del trámite
   */
  public solicitudState!: Solicitud6502State;
  @ViewChild('modal', { static: false }) modal!: ElementRef;
  constructor(
    private fb: FormBuilder,
    private service: RegistroPoblacionalService,
    private tramite6502Store: Tramite6502Store,
    private tramite6502Query: Tramite6502Query,
    
  ) {
    //Añade lógica aquí
  }
  private destroyNotifier$: Subject<void> = new Subject();
  instalacionesPrincipalesTabla: ConfiguracionColumna<InstalacionesPrincipalesTablaInfo>[] = INSTALACIONES_PRINCIPALES_TABLA;
  instalacionesPrincipalesTablaDatos: InstalacionesPrincipalesTablaInfo[] = [];
  formaDatos:formaDatosInfo[] = []
  ngOnInit(): void {
    this.tramite6502Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.obtenerFormaDatos()
    this.obtenerInstalacionesPrincipalesTablaDatos()
  }
  ngAfterViewInit(): void {
    if (this.modal) {
      this.modalInstance = new Modal(this.modal.nativeElement);
    }
  }
  crearFormulario():void{
    this.modalForma = this.fb.group({
      nombre:[{value:this.formaDatos[0]?.nombre, disabled:true}],
      registroFederal:[{value:this.formaDatos[0]?.registroFederal, disabled:true}],
      curp:[{value:this.formaDatos[0]?.curp, disabled:true}],
      curpActualizada:[this.solicitudState?.curpActualizada,Validators.required],
      confirmacioCurpActualizada:[this.solicitudState?.confirmacioCurpActualizada,Validators.required]
    })
  }
  obtenerInstalacionesPrincipalesTablaDatos(): void {
    this.service.obtenerInstalacionesPrincipalesTablaDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.data;
        this.instalacionesPrincipalesTablaDatos.push(DATOS[0]);
      });
  }

  obtenerFormaDatos(): void {
    this.service.obtenerFromaDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.data;
        this.formaDatos.push(DATOS[0]);
        this.crearFormulario()
      });
  }

  openModal(): void {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  hideModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  /**
   * Establece un valor en el store del trámite.
   * 
   * @param form Formulario reactivo que contiene el valor.
   * @param campo Nombre del campo a obtener.
   * @param metodoNombre Nombre del método en el store a invocar.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite6502Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite6502Store[metodoNombre] as (value: string) => void)(VALOR);
  }

  /**
   * Método que se ejecuta al destruir el componente
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
