import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Anteriores, ANTERIORES_TABLA, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { ComercioExteriorService } from '../../services/comercio-exterior.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'numero-de-empleados',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,TablaDinamicaComponent,CatalogoSelectComponent],
  templateUrl: './numero-de-empleados.component.html',
  styleUrl: './numero-de-empleados.component.scss',
})
export class NumeroDeEmpleadosComponent implements OnInit,OnDestroy {

  public numeroDeEmpleadosDatos: Anteriores[] = [];
  public configuracionTabla: ConfiguracionColumna<Anteriores>[] = ANTERIORES_TABLA;
  modalRef?: BsModalRef;
  public agregarForm!: FormGroup;
  public bimestreUnoCatalogo: Catalogo[] = [];
  public bimestreDosCatalogo: Catalogo[] = [];
  public bimestreTresCatalogo: Catalogo[] = [];
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private comercioExteriorSvc: ComercioExteriorService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.getAnterioresTablaDatos();
    this.crearAgregarForm();
    this.getBancoCatalogDatos();
  }

  public getAnterioresTablaDatos(): void {
    this.comercioExteriorSvc.getAnterioresDatos().subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.numeroDeEmpleadosDatos = DATOS;
    })
  }


  public abrirModal(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg',});
  }

  public crearAgregarForm(): void {
    this.agregarForm = this.fb.group({
      rfc: [''],
      registroInput: [{ value: '', disabled: true }],
      razonSocialInput: [{ value: '', disabled: true }],
      numeroUno: [''],
      numeroDos: [''],
      numeroTres: [''],
      agregarCatalogoUno: [''],
      agregarCatalogoDos: [''],
      agregarCatalogoTres: [''],
    });
  }

  public getBancoCatalogDatos(): void {
    this.comercioExteriorSvc.getBancoDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const API_DATOS = JSON.parse(JSON.stringify(response));
      this.bimestreUnoCatalogo = API_DATOS.data;
      this.bimestreDosCatalogo = API_DATOS.data;
      this.bimestreTresCatalogo = API_DATOS.data;
    });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
