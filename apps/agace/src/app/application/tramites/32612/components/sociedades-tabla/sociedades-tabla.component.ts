import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { CONFIGURACION_INSTALACIONES, CONFIGURACION_INSTALACIONES_TABLA, DatosDeLasInstalaciones, ENLACE_TABLA, Instalaciones, MANDATARIOS_DE_AGENTE_ADUANAL, MandatariosDeAgenteAduanal, Sociedades } from '../../models/sociedades.model';
import { EsquemaDeCertificacionService } from '../../services/esquema-de-certificacion.service';
import { Subject, takeUntil } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormGroup } from '@angular/forms';
import { CONFIGURACION_AGREGAR, CONFIGURACION_IDIQUESI, CONFIGURACION_SOCIEDADES, MANDATARIOS_DEL_AGENT } from '../../constants/sociedades-tabla.enum';

@Component({
  selector: 'app-sociedades-tabla',
  standalone: true,
  imports: [CommonModule,TablaDinamicaComponent,TituloComponent,FormasDinamicasComponent],
  templateUrl: './sociedades-tabla.component.html',
  styleUrl: './sociedades-tabla.component.scss',
})
export class SociedadesTablaComponent implements OnInit,OnDestroy {

  private destroyNotifier$: Subject<void> = new Subject();
  modalRef?: BsModalRef;
  public checkbox = TablaSeleccion.CHECKBOX;
  public configuracionTabla: ConfiguracionColumna<Sociedades>[] = ENLACE_TABLA;
  public sociedadesDatos: Sociedades[] = [];
  public configuracionDatosTabla: ConfiguracionColumna<DatosDeLasInstalaciones>[] = CONFIGURACION_INSTALACIONES;
  public instalacionesDatos: DatosDeLasInstalaciones[] = [];
  public agregarSociedadesForma: FormGroup = new FormGroup({
    agregarSociedadesFormGroup: new FormGroup({})
  });
  public agregarForma: FormGroup = new FormGroup({
    agregarFormGroup: new FormGroup({})
  });
  public agregarSociedadesDatos = CONFIGURACION_SOCIEDADES;
  public agregarDatos = CONFIGURACION_AGREGAR;
  public configuracionInstalaciones: ConfiguracionColumna<Instalaciones>[] = CONFIGURACION_INSTALACIONES_TABLA;
  public instalaciones: Instalaciones[] = [];
  public indiqueSiFormGroup: FormGroup = new FormGroup({
    indiqueSiFormGroup: new FormGroup({})
  });
  public indiqueDatos = CONFIGURACION_IDIQUESI;
  public configuracionMandatariosTabla: ConfiguracionColumna<MandatariosDeAgenteAduanal>[] = MANDATARIOS_DE_AGENTE_ADUANAL;
  public mandatariosDatos: MandatariosDeAgenteAduanal[] = [];
  public mandatariosDelAgenteFormGroup: FormGroup = new FormGroup({
    mandatariosDelAgenteFormGroup: new FormGroup({})
  });
  public mandatariosDelAgenteDatos = MANDATARIOS_DEL_AGENT;


  constructor(
    private modalService: BsModalService,
    private esquemaDeCertificacionSvc: EsquemaDeCertificacionService 
  ) {

  }

  ngOnInit(): void {
    this.getSociedadesTabla();
    this.getDatosDeLasInstalacionesDatos();
  }

  get agregarSociedadesFormGroup(): FormGroup {
    return this.agregarSociedadesForma.get('agregarSociedadesFormGroup') as FormGroup;
  }

  get agregarFormGroup(): FormGroup {
    return this.agregarForma.get('agregarFormGroup') as FormGroup;
  }

  get indiqueSiDatos(): FormGroup {
    return this.indiqueSiFormGroup.get('indiqueSiFormGroup') as FormGroup;
  }

  public getSociedadesTabla(): void {
    this.esquemaDeCertificacionSvc.getSociedadesTablaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe({
      next: (response) => {
        const API_RESPONSE = JSON.parse(JSON.stringify(response));
        this.sociedadesDatos = API_RESPONSE;
      },
      error: (error) => {
        // Manejo de errores
      }
    });
  }

  public getDatosDeLasInstalacionesDatos(): void {
    this.esquemaDeCertificacionSvc.getDatosDeLasInstalaciones().pipe(takeUntil(this.destroyNotifier$)).subscribe({
      next: (response) => {
        const API_RESPONSE = JSON.parse(JSON.stringify(response));
        this.instalacionesDatos = API_RESPONSE;
      },
      error: (error) => {
        // Manejo de errores
      }
    });
  }

  public abrirModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template,{ class: 'modal-lg',});
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
