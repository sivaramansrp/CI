import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosComunesService } from '../../services/datos-comunes.service';
import { Subject, takeUntil } from 'rxjs';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, InputCheckComponent, InputRadioComponent, TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import dinamicaradio from 'libs/shared/theme/assets/json/31602/dinamica-radio-datos.json';
import radio_si_no from 'libs/shared/theme/assets/json/31601/radio_si_no.json';
import { AGREGAR_MIEMBRO_TABLA, DATOS_COMUNES_TEXTOS, DATOS_COMUNES_TEXTOS_DOS, Miembro } from '../../models/datos-comunes.model';
import { FederalDeTrabajaoComponent } from '../federal-de-trabajao/federal-de-trabajao.component';
import { DatosComunesDosComponent } from '../datos-comunes-dos/datos-comunes-dos.component';
import { TituloComponent } from "../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'shared-datos-comunes',
  standalone: true,
  imports: [
    CommonModule,
    InputRadioComponent,
    InputCheckComponent,
    CatalogoSelectComponent,
    AlertComponent,
    FederalDeTrabajaoComponent,
    DatosComunesDosComponent,
    TituloComponent,
    TablaDinamicaComponent
],
  templateUrl: './datos-comunes.component.html',
  styleUrl: './datos-comunes.component.scss',
})
export class DatosComunesComponent implements OnInit, OnDestroy {


  public dinamicaRadio = dinamicaradio;
  private destroyNotifier$: Subject<void> = new Subject();
  public radioOptions = radio_si_no;
  public sectorProductivoAgace: Catalogo[] = [];
  public serviciosAgace: Catalogo[] = [];
  public TEXTOS = DATOS_COMUNES_TEXTOS;
  public comboBimestresIDC: Catalogo[] = [];
  public TEXTOSDOS = DATOS_COMUNES_TEXTOS_DOS;
  public infoAlert = 'alert-danger';
  public cambioObj = {
    empleadosPropios: false,
    deTrabajao: false,
    obligadoaTributaren: '',
  };
  public tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
  public agregarMiembroTabla: ConfiguracionColumna<Miembro>[] = AGREGAR_MIEMBRO_TABLA;
  public agregarMiembroTablaDatos: Miembro[] = [];
  modalRef?: BsModalRef;
  public enSuCaracterDeOptions: Catalogo[] = [];
  public nacionalidadOptions: Catalogo[] = [];
  public tipoDePersona: Catalogo[] = [];


  constructor(
    private datosComunesSvc: DatosComunesService,
    private modalService: BsModalService
  ) {
    // Constructor de la clase DatosComunesComponent
  }

  ngOnInit(): void {
    this.getSectorProductivoAgace();
    this.getServiciosAgace();
    this.getAgregarMiembroTablaDatos();
  }

  public getSectorProductivoAgace(): void {
    this.datosComunesSvc.getProductivoDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      this.sectorProductivoAgace = JSON.parse(JSON.stringify(response));
    });
  }

  public getServiciosAgace(): void {
    this.datosComunesSvc.getServiciosAgaceDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      this.serviciosAgace = JSON.parse(JSON.stringify(response));
    });
  }

  public getAgregarMiembroTablaDatos(): void {
    this.datosComunesSvc.getAgregarMiembroTabla().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.agregarMiembroTablaDatos = DATOS;
    });
  }

  public onRadioCambio(value: string | number,nombre:string): void {
    if(nombre === 'empleadosPropios') {
      this.cambioObj.empleadosPropios = value === 'Si' ? true : false;
    }
    if(nombre === 'deTrabajao') {
      this.cambioObj.deTrabajao = value === 'Si' ? true : false;
    }
    if(nombre === 'obligadoaTributaren') {
      this.cambioObj.obligadoaTributaren = value === 'Si' ? 'Si' : 'No';
    }
  }

  public abrirModal(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg',});
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
