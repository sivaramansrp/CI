import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, REGEX_RFC, TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Mencione, MENCIONE_TABLA } from '../../models/datos-comunes.model';
import { Subject, takeUntil } from 'rxjs';
import { DatosComunesService } from '../../services/datos-comunes.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-federal-de-trabajao',
  standalone: true,
  imports: [CommonModule,TablaDinamicaComponent,CatalogoSelectComponent,ReactiveFormsModule],
  templateUrl: './federal-de-trabajao.component.html',
  styleUrl: './federal-de-trabajao.component.scss',
})
export class FederalDeTrabajaoComponent implements OnInit,OnDestroy {

  public numeroDeEmpleadosForm!: FormGroup;
  public tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
  public mencioneTablaDatos: Mencione[] = [];
  public configuracionTabla:ConfiguracionColumna<Mencione>[] = MENCIONE_TABLA;
  private destroyNotifier$: Subject<void> = new Subject();
  modalRef?: BsModalRef;
  public bimestreTresCatalogo: Catalogo[] = [];



  constructor(
    private datosComunesSvc: DatosComunesService,
    private fb: FormBuilder,
    private modalService: BsModalService,
  ) {
    // Constructor vacío
  }


  ngOnInit(): void {
    this.getMencioneDatos();
    this.getBancoCatalogDatos();
    this.cerearFormulario();
  }

  public cerearFormulario(): void {
    this.numeroDeEmpleadosForm = this.fb.group({
      rfc: ['',[Validators.required,Validators.pattern(REGEX_RFC)]],
      razonSocial: ['',[Validators.required,Validators.minLength(3)]],
      numeroEmpleados: ['',[Validators.required]],
      empleadosPropios: ['',[Validators.required, Validators.maxLength(8)]],
      archivoNacionales: ['',[Validators.required]],
    });
  }

  public getMencioneDatos(): void {
    this.datosComunesSvc.getTablaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.mencioneTablaDatos = DATOS.data;
    });
  }

  public abrirModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg',});
  }

  public getBancoCatalogDatos(): void {
    this.datosComunesSvc.getBancoDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const API_DATOS = JSON.parse(JSON.stringify(response));
      this.bimestreTresCatalogo = API_DATOS.data;
    });
  }


  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
