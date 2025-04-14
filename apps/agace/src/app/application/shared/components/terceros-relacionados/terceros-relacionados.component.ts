import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { REPRESENTANTE_LEGAL } from '../../constants/terceros-relacionados.enum';
import { ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from "../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { ENLACE_TABLA, EnlaceOperativo, Personas, PERSONAS_PARA } from '../../models/terceros-relacionados.model';
import { TercerosRelacionadosService } from '../../services/terceros-relacionados.service';
import { Subject, takeUntil } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'shared-terceros-relacionados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormasDinamicasComponent, TablaDinamicaComponent, TituloComponent],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent implements OnInit,OnDestroy {

  public represtantanteLegalForma: FormGroup = new FormGroup({
    represtantanteLegalFormGroup: new FormGroup({})
  });

  modalRef?: BsModalRef;
  public represtantanteLegalDatos = REPRESENTANTE_LEGAL;
  public checkbox = TablaSeleccion.CHECKBOX;
  public configuracionTabla: ConfiguracionColumna<EnlaceOperativo>[] = ENLACE_TABLA;
  public enlaceOperativoDatos: EnlaceOperativo[] = [];
  private destroyNotifier$: Subject<void> = new Subject();
  public enlaceOperativoForm!: FormGroup;
  public personaParas: Personas[] = [];
  public personasConfiguracionTabla: ConfiguracionColumna<Personas>[] = PERSONAS_PARA;

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private tercerosRelacionadosSvc: TercerosRelacionadosService
  ) {
    //
  }

  ngOnInit(): void {
    this.getEnlaceOperativo();
    this.crearEnlaceOperativoForm();
    this.getPersonas();
  }

  get represtantanteLegalFormGroup(): FormGroup {
    return this.represtantanteLegalForma.get('represtantanteLegalFormGroup') as FormGroup;
  }

  public crearEnlaceOperativoForm(): void {
    this.enlaceOperativoForm = this.fb.group({
        resigtro: ['', Validators.required],
        rfc: ['', Validators.required],
        nombre: ['', Validators.required],
        apellidoPaterno: ['', Validators.required],
        apellidoMaterno: ['', Validators.required],
        cargo: ['', Validators.required],
        cuidad: ['', Validators.required],
        telefono: ['', Validators.required],
        correo: ['', Validators.required],
        suplente: ['', Validators.required],
    });
  }

  public abrirModal(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg',});
  }

  public getEnlaceOperativo(): void {
    this.tercerosRelacionadosSvc.getEnlaceOperativoDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.enlaceOperativoDatos = DATOS;
    })
  }

  public getPersonas(): void {
    this.tercerosRelacionadosSvc.getPersonasParaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.personaParas = DATOS;
    })
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
