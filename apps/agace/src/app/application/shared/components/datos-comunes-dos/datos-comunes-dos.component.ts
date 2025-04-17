import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, InputCheckComponent, InputRadioComponent, REGEX_RFC, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { DatosComunesService } from '../../services/datos-comunes.service';
import { map, Subject, takeUntil } from 'rxjs';
import { CONTROL_INVENTARIOS_TABLA, ControlInventarios, DATOS_COMUNES_TEXTOS_TRES, INSTALACIONES_PRINCIPALES_TABLA, InstalacionesPrincipalesTablaInfo } from '../../models/datos-comunes.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import radio_si_no from 'libs/shared/theme/assets/json/31601/radio_si_no.json';
import dinamicaradio from 'libs/shared/theme/assets/json/31602/dinamica-radio-datos.json';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosComunesState, DatosComunesStore } from '../../estados/stores/datos-comunes.store';
import { DatosComunesQuery } from '../../estados/queries/datos-comunes.query';



@Component({
  selector: 'app-datos-comunes-dos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
  public comunesDosForm!: FormGroup;
  public instalacionesPrincipalesForm!: FormGroup;
  public modificarForm!: FormGroup;
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
  public solicitudState!: DatosComunesState;


  constructor(
    private datosComunesSvc: DatosComunesService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private datosComunesStore: DatosComunesStore,
    private datosComunesQuery: DatosComunesQuery
  ) {
    // Constructor de la clase DatosComunesDosComponent
  }

  ngOnInit(): void {
    this.datosComunesQuery.selectSolicitud$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
      this.solicitudState = seccionState;
    })).subscribe();
    this.getComboBimestres();
    this.getInstalacionesPrincipalesTablaDatos();
    this.getSectorProductivoAgace();
    this.getControlInventariosDatos();
    this.crearComunesDosFormulario();
    this.crearInstalacionesPrincipalesFormulario();
    this.crearModificarForm();
  }

  public crearComunesDosFormulario(): void {
    this.comunesDosForm = this.fb.group({
        comboBimestresIDCSeleccione:[this.solicitudState?.comboBimestresIDCSeleccione],
        ingresar: [this.solicitudState?.ingresar, Validators.required],
        encuentraSus: [this.solicitudState?.encuentraSus, Validators.required],
        registrosQue:[this.solicitudState?.registrosQue],
        registrosQue2:[this.solicitudState?.registrosQue2],
        momentoIngresar: [this.solicitudState?.momentoIngresar, Validators.required],
        indiqueCuenta: [this.solicitudState?.indiqueCuenta, Validators.required],
        indiqueCheck:[this.solicitudState?.indiqueCheck],
        nombreDel: [
          this.solicitudState?.nombreDel,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(250),
          ],
        ],
        lugarDeRadicacion: [
          this.solicitudState?.lugarDeRadicacion,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(250),
          ],
        ],
        contabilidad: [this.solicitudState?.contabilidad, Validators.required],
        rmfRadio: [this.solicitudState?.rmfRadio, Validators.required],
        vinculacionRegistroCancelado: [this.solicitudState?.vinculacionRegistroCancelado, Validators.required],
        proveedoresListadoSAT: [this.solicitudState?.proveedoresListadoSAT, Validators.required],
        numeroAutorizacionCITES: ['',[Validators.required,Validators.pattern(REGEX_RFC)]],
        archivoNacionales: ['']
    });
  }

  public crearInstalacionesPrincipalesFormulario(): void {
    this.instalacionesPrincipalesForm = this.fb.group({
      instalacionesPrincipales: [''],
      municipioAlcaldia: [''],
      tipoDeInstalacion: [''],
      entidadFederative: [''],
      registroAnte: [''],
      colonia: [''],
      codigoPostal: [''],
      procesoProductivo: [''],
      acreditacionDelUso: ['']
    });
  }

  public crearModificarForm(): void {
    this.modificarForm = this.fb.group({
      nombreDelSistema: [''],
      indiqueCheckSi: [''],
      lugar: ['']
    });
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

  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof DatosComunesStore): void {
    const VALOR = form.get(campo)?.value;
    (this.datosComunesStore[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  public abrirModal(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg',});
  }


  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }


}
