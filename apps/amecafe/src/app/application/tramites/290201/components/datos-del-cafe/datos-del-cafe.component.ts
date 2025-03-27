import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Catalogo, CatalogosSelect, ConfiguracionColumna, TituloComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarSolicitudService } from '../../services/registrar-solicitud.service';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, Validators } from '@angular/forms';
import { TableComponent } from '@libs/shared/data-access-user/src';
import { AcuseComponent } from '@libs/shared/data-access-user/src';
import { DatosDeLaSolicitudComponent } from '../datos-de-la-solicitud/datos-de-la-solicitud.component';
import { Solicitud290201State,Solicitud290201Store } from '../../../../estados/tramites/tramites290201.store';
import { Solicitud290201Query } from '../../../../estados/queries/tramites290201.query';
import { map, ReplaySubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-datos-del-cafe',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule,CatalogoSelectComponent,TableComponent,AcuseComponent,DatosDeLaSolicitudComponent],
  templateUrl: './datos-del-cafe.component.html',
  styleUrl: './datos-del-cafe.component.scss',
})
export class DatosDelCafeComponent implements OnDestroy, OnInit{
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private destroyNotifier$: Subject<void> = new Subject();

  tableData: any[] = []; 
  dataCafeForm!: FormGroup;
  public dataCafeState!: Solicitud290201State;
  public envasadoenData: CatalogosSelect = {
      labelNombre: 'Envasado',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
    public utilizoCafeComoData: CatalogosSelect = {
      labelNombre: 'Utilizo cafe como materia prima importada para elaborar este producto?',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
    public paisdeimportacionData: CatalogosSelect = {
      labelNombre: 'Pais de importacion',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
    public fraccionarancelariaData: CatalogosSelect = {
      labelNombre: 'Fraccion arancelaria',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
    public unidaddemedidaData: CatalogosSelect = {
      labelNombre: 'Unidad de medida',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
    public dolarData: CatalogosSelect = {
      labelNombre: ' ',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
    public elcafeData: CatalogosSelect = {
      labelNombre: 'EI cafe tiene caracteristicas especiales?',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
    public paisdetransbordoData: CatalogosSelect = {
      labelNombre: 'Pais de transbordo',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
    public mediodetransporteData: CatalogosSelect = {
      labelNombre: 'Medio de transporte',
      required: true,
      primerOpcion: 'Selecciona un medio de transporte',
      catalogos: [],
    };
  
    isFormVisible: boolean = false; 
    selectedRow: any = null;
    selectedRows: Set<number> = new Set();

  constructor(
      private registrarsolicitud: RegistrarSolicitudService,
      private fb: FormBuilder,
      private solicitud290201Store: Solicitud290201Store,
    private solicitud290201Query: Solicitud290201Query,
    ){
      this.getEnvasadoenData();
      this.getUtilicoCafeComoData();
      this.getPaisDeImportacionData();
      this.getFraccionArancelariaData();
      this.getUnidadDeMedidaData();
      this.getDollarData();
      this.getElcafeData();
      this.getPaisDeTransbordoData();
      this.getMediaDeTransporte();
    }

    createForm(){
      this.dataCafeForm = this.fb.group({
        datosDelTramiteRealizar: this.fb.group({
        envasadoen: [this.dataCafeState?.envasadoen, Validators.required],
        utilizoCafeComo:[this.dataCafeState?.utilizoCafeComo,Validators.required],
        cantidadutilizada:[this.dataCafeState?.cantidadutilizada,Validators.required],
        numerodepedimento:[this.dataCafeState?.numerodepedimento,Validators.required],
        paisdeimportacion:[this.dataCafeState?.paisdeimportacion,Validators.required],
        fraccionarancelaria:[this.dataCafeState?.fraccionarancelaria,Validators.required],
        cantidad:[this.dataCafeState?.cantidad,Validators.required],
        unidaddemedida: [this.dataCafeState?.unidaddemedida, Validators.required],
        precioapplicable:[this.dataCafeState?.precioapplicable,Validators.required],
        dolar:[this.dataCafeState?.dolar,Validators.required],
        lote:[this.dataCafeState?.lote,Validators.required],
        otrasmarcas:[this.dataCafeState?.otrasmarcas,Validators.required],
        elcafe:[this.dataCafeState?.elcafe,Validators.required],
        fechaexportacion:[this.dataCafeState?.fechaexportacion,Validators.required],
        paisdetransbordo:[this.dataCafeState?.paisdetransbordo,Validators.required],
        mediodetransporte:[this.dataCafeState?.mediodetransporte,Validators.required],
        Identificadordel:[this.dataCafeState?.Identificadordel,Validators.required],
        observaciones:[this.dataCafeState?.observaciones,Validators.required]
          
      })
         })

    }
    ngOnInit(): void {
      this.solicitud290201Query.selectSolicitud$.pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          console.log('seccionState:', seccionState); 
          this.dataCafeState = seccionState
        })
      )
      .subscribe();

      this.createForm()
        
    }

    getEnvasadoenData(){
        this.registrarsolicitud.getEnvasadoenData()
        .pipe(takeUntil(this.destroyed$))
     .subscribe((data) => {
          this.envasadoenData.catalogos = data as Catalogo[];
        })
      }
      getUtilicoCafeComoData(){
        this.registrarsolicitud.getUtilicoCafeComoData()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.utilizoCafeComoData.catalogos = data as Catalogo[];
        })
      }
      getPaisDeImportacionData(){
        this.registrarsolicitud.getPaisDeImportacionData()
        .pipe(takeUntil(this.destroyed$))
     .subscribe((data) => {
          this.paisdeimportacionData.catalogos = data as Catalogo[];
        })
      }
      getFraccionArancelariaData(){
        this.registrarsolicitud.getFraccionArancelariaData()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.fraccionarancelariaData.catalogos = data as Catalogo[];
        })
      }

      getUnidadDeMedidaData(){
        this.registrarsolicitud.getUnidadDeMedidaData()
        .pipe(takeUntil(this.destroyed$))
     .subscribe((data) => {
          this.unidaddemedidaData.catalogos = data as Catalogo[];
        })
      }
      getDollarData(){
        this.registrarsolicitud.getDollarData()
        .pipe(takeUntil(this.destroyed$))
     .subscribe((data) => {
          this.dolarData.catalogos = data as Catalogo[];
        })
      }
      getElcafeData(){
        this.registrarsolicitud.getUtilicoCafeComoData()
        .pipe(takeUntil(this.destroyed$))
     .subscribe((data) => {
          this.elcafeData.catalogos = data as Catalogo[];
        })
      }

      getPaisDeTransbordoData(){
        this.registrarsolicitud.getPaisDeImportacionData()
        .pipe(takeUntil(this.destroyed$))
     .subscribe((data) => {
          this.paisdetransbordoData.catalogos = data as Catalogo[];
        })
      }
      getMediaDeTransporte(){
        this.registrarsolicitud.getMediaDeTransporte()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.mediodetransporteData.catalogos = data as Catalogo[];
        })
      }

    
      onSubmit(){
        this.isFormVisible = false; 

        const formData = {...this.dataCafeForm.value };
        formData.datosDelTramiteRealizar.envasadoen = this.envasadoenData.catalogos.find(
          (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.envasadoen)
        )?.descripcion;
      formData.datosDelTramiteRealizar.utilizoCafeComo = this.utilizoCafeComoData.catalogos.find(
       (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.utilizoCafeComo)
      )?.descripcion;

      formData.datosDelTramiteRealizar.paisdeimportacion = this.paisdeimportacionData.catalogos.find(
       (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.paisdeimportacion)
     )?.descripcion;
     formData.datosDelTramiteRealizar.fraccionarancelaria = this.fraccionarancelariaData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.fraccionarancelaria)
     )?.descripcion;

     formData.datosDelTramiteRealizar.unidaddemedida = this.unidaddemedidaData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.unidaddemedida)
     )?.descripcion;

     formData.datosDelTramiteRealizar.dolar = this.dolarData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.dolar)
     )?.descripcion;

    formData.datosDelTramiteRealizar.elcafe = this.elcafeData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.elcafe)
    )?.descripcion;

    formData.datosDelTramiteRealizar.paisdetransbordo = this.paisdetransbordoData.catalogos.find(
      (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.paisdetransbordo)
    )?.descripcion;

    formData.datosDelTramiteRealizar.mediodetransporte = this.mediodetransporteData.catalogos.find(
     (item: Catalogo) => String(item.id) === String(formData.datosDelTramiteRealizar.mediodetransporte)
    )?.descripcion;

    this.tableData.push(formData);
      }

      onAgregar(){
        if (this.dataCafeForm.valid) {    
        }
        this.isFormVisible = true;
      }
      onRowClick(rowData: any) {
        this.dataCafeForm.patchValue({
            envasadoen: this.envasadoenData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.envasadoen
            )?.id || '',
            utilizoCafeComo: this.utilizoCafeComoData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.utilizoCafeComo
            )?.id || '',
            paisdeimportacion: this.paisdeimportacionData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.paisdeimportacion
            )?.id || '',
            fraccionarancelaria: this.fraccionarancelariaData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.fraccionarancelaria
            )?.id || '',
            unidaddemedida: this.unidaddemedidaData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.unidaddemedida
            )?.id || '',
            dolar: this.dolarData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.dolar
            )?.id || '',
            elcafe: this.elcafeData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.elcafe
            )?.id || '',
            paisdetransbordo: this.paisdetransbordoData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.paisdetransbordo
            )?.id || '',
            mediodetransporte: this.mediodetransporteData.catalogos.find(
                (item: Catalogo) => item.descripcion === rowData.datosDelTramiteRealizar.mediodetransporte
            )?.id || '',
          
      
        });
    
        this.isFormVisible = true;
    }

      onCheckboxClick(event: Event, index: number): void {
        event.stopPropagation(); 
    
        if (this.selectedRows.has(index)) {
          this.selectedRows.delete(index); 
        } else {
          this.selectedRows.add(index); 
        }
      }
      onDeleteSelectedRows(): void {
       
        this.tableData = this.tableData.filter((_, index) => !this.selectedRows.has(index));
    
     
        this.selectedRows.clear();
        this.dataCafeForm.reset();
       this.isFormVisible = false;
      }
      
      
  get datosDelTramiteRealizar(): FormGroup {
    return this.dataCafeForm.get('datosDelTramiteRealizar') as FormGroup;
  }

      setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud290201Store): void {
        const VALOR = form.get(campo)?.value;
        (this.solicitud290201Store[metodoNombre] as (value: any) => void)(VALOR);
      }
      
      ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
      }
    }



