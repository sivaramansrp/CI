import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, InputCheckComponent, InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { DatosComunesService } from '../../services/datos-comunes.service';
import { Subject, takeUntil } from 'rxjs';
import { CONTROL_INVENTARIOS_TABLA, ControlInventarios, DATOS_COMUNES_TEXTOS_TRES, INSTALACIONES_PRINCIPALES_TABLA, InstalacionesPrincipalesTablaInfo } from '../../models/datos-comunes.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import radio_si_no from 'libs/shared/theme/assets/json/31601/radio_si_no.json';
import dinamicaradio from 'libs/shared/theme/assets/json/31602/dinamica-radio-datos.json';



@Component({
  selector: 'app-datos-comunes-dos',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    AlertComponent,
    TablaDinamicaComponent,
    InputRadioComponent,
    TituloComponent,
    InputCheckComponent
  ],
  templateUrl: './datos-comunes-dos.component.html',
  styleUrl: './datos-comunes-dos.component.scss',
})
export class DatosComunesDosComponent implements OnInit,OnDestroy {

  private destroyNotifier$: Subject<void> = new Subject();
  modalRef?: BsModalRef;
  public dinamicaRadio = dinamicaradio;
  public comboBimestresIDC: Catalogo[] = [];
  public TEXTOS = DATOS_COMUNES_TEXTOS_TRES;
  public tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
  public instalacionesPrincipalesTabla: ConfiguracionColumna<InstalacionesPrincipalesTablaInfo>[] = INSTALACIONES_PRINCIPALES_TABLA;
  public instalacionesPrincipalesTablaDatos: InstalacionesPrincipalesTablaInfo[] = [];
  public opcionDeBotonDeRadio = radio_si_no;
  public sectorProductivoAgace: Catalogo[] = [];
  public rutaDeContexto: string = '';
  public controlInentariosTabla: ConfiguracionColumna<ControlInventarios>[] = CONTROL_INVENTARIOS_TABLA;
  public controlInentariosTablaDatos: ControlInventarios[] = [];


  constructor(
    private datosComunesSvc: DatosComunesService,
    private modalService: BsModalService
  ) {
    // Constructor de la clase DatosComunesDosComponent
  }

  ngOnInit(): void {
    this.getComboBimestres();
    this.getInstalacionesPrincipalesTablaDatos();
    this.getSectorProductivoAgace();
    this.getControlInventariosDatos();
  }

  public getSectorProductivoAgace(): void {
    this.datosComunesSvc.getProductivoDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const API_DATOS = JSON.parse(JSON.stringify(response));
      this.sectorProductivoAgace = API_DATOS;
    });
  }

  public getComboBimestres(): void {
    this.datosComunesSvc.getComboBimestres().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.comboBimestresIDC = DATOS.data;
    });
  }

  public getInstalacionesPrincipalesTablaDatos(): void {
    this.datosComunesSvc.getInstalacionesPrincipalesDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.instalacionesPrincipalesTablaDatos = DATOS.data;
    });
  }

  public getControlInventariosDatos(): void {
    this.datosComunesSvc.getControlInventariosTabla().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.controlInentariosTablaDatos = DATOS;
    });
  }

  public abrirModal(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg',});
  }


  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }


}
