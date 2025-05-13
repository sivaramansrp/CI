import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { formaDatosInfo, INSTALACIONES_PRINCIPALES_TABLA, InstalacionesPrincipalesTablaInfo} from '@libs/shared/data-access-user/src/core/models/6502/dato-comunes.model';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroPoblacionalService } from '../../service/registro-poblacional.service';
import modal from 'bootstrap/js/dist/modal';
import Modal from 'bootstrap/js/dist/modal';

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
  @ViewChild('modal', { static: false }) modal!: ElementRef;
  constructor(
    private fb: FormBuilder,
    private service: RegistroPoblacionalService,
    
  ) {
    //Añade lógica aquí
  }
  private destroyNotifier$: Subject<void> = new Subject();
  instalacionesPrincipalesTabla: ConfiguracionColumna<InstalacionesPrincipalesTablaInfo>[] = INSTALACIONES_PRINCIPALES_TABLA;
  instalacionesPrincipalesTablaDatos: InstalacionesPrincipalesTablaInfo[] = [];
  formaDatos:formaDatosInfo[] = []
  ngOnInit(): void {
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
      curpActualizada:['',Validators.required],
      confirmacioCurpActualizada:['',Validators.required]
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
   * Método que se ejecuta al destruir el componente
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
