import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatosTramiteService } from 'libs/shared/data-access-user/src/core/services/11202/datos-tramite.service';
import mockData from 'libs/shared/theme/assets/json/11202/contenedor-mockdata.json';
import {TEXTOS_REQUISITOS} from '../../../../constantes/11202/retorno-contenedores.enum'
import { Contenedor11202State, Contenedor11202Store } from '../../../../estados/tramites/contenedor11202.store';
import { Contenedor11202Query } from '../../../../estados/queries/contenedor11202.query';
import { map, Subject, takeUntil } from 'rxjs';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import * as XLSX from 'xlsx';
 //import { Solicitud11202State, Solicitud11202Store } from "../../../../estados/tramites/solicitud11202.store";
// import { Solicitud11202Query } from '../../../../estados/queries/solicitud11202.query';
// import { map, ReplaySubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contenedor',
   templateUrl: './contenedor.component.html',
  styleUrl: './contenedor.component.scss',


})
export class ContenedorComponent   {

  public contenedorState!: Contenedor11202State;
  TEXTOS = TEXTOS_REQUISITOS;

//  for upload excel
archivoSeleccionado1: string = '';
  selectedFile: File | null = null;
  excelData: any[] = []; // Store parsed Excel data
  tableHeaders: string[] = []; // Store table headers dynamically
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.archivoSeleccionado1 = this.selectedFile.name;
    }

    
  }
  procesarArchivo() {
    console.log('inside procesarArchivo');
    if (!this.selectedFile) {
      alert('Por favor, seleccione un archivo antes de enviarlo.');
      return;
    }
    console.log('inside procesarArchivo1');
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length > 0) {
        this.tableHeaders = jsonData[0] as string[]; // First row as headers
        this.excelData = jsonData.slice(1).map((row: any) =>
          Object.fromEntries(row.map((cell: any, index: number) => [this.tableHeaders[index], cell]))
        );
      }
    };

    reader.readAsArrayBuffer(this.selectedFile);
  }


//end of upload excel


   private destroyNotifier$: Subject<void> = new Subject();
onPageChange($event: Event) {
throw new Error('Method not implemented.');
}
ngSubmit() {

throw new Error('Method not implemented.');

}
  solicitudForm!: FormGroup;
  isAdjuntarArchivoVisible: boolean = false;
  seccionAduanaaFechaVisible: boolean = false;
  seccionContenedorVisible: boolean = false;
  seccionContenedor:boolean=false;
  agregarTipoContenedorVisible: boolean = false;
  seccionExcelVisible: boolean = false;
  catalogAduanas: any[] = [];
  catalogContenedores: any[] = [];
  contenedores: any[] = [];
  archivoSeleccionado: string = '';
  cargarArchivoVisible: boolean = false;
  exceptionCaught: boolean = false;
  actionBean = { requiereGuardadoParcial: false };
  nonSelectionTextTipoContendor:string = 'Selecciona un valor';
  cargarArchivo: boolean = false;

  constructor(
    private fb: FormBuilder,
    // private solicitudStore: Solicitud11202Store,
    // private solicitudQuery: Solicitud11202Query,


    private datosTramiteService: DatosTramiteService,

    private contenedorStore:Contenedor11202Store,
    private contenedorQuery:Contenedor11202Query,
    
  ) {}

 

  ngOnInit(): void {
    this.inicializarFormulario();
     this.cargarCatalogAduanas();
     this.cargarCatalogContenedores();
     this.tabSeleccionado();
     this.configurarValidaciones();
     this.setFormValues();
    
   
     this.contenedorQuery.selectSolicitud$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.contenedorState = seccionState;
      })
    )
    .subscribe();
    this.crearFormSolicitud();
    console.log();
     
  }

  

  inicializarFormulario(): void {
    this.solicitudForm = this.fb.group({
      idSolicitud: [''],
      tipoBusqueda: ['', Validators.required],
      aduana: [''],
      inicialesContenedor: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[a-zA-Z0-9]*$'),
        ],
      ],
      numeroContenedor: [
        '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern('^[a-zA-Z0-9]*$'),
        ],
      ],
      contenedores: [''],
      digitoDeControl: [
        '',
        [
          Validators.required,
          Validators.maxLength(1),
          Validators.pattern('^[0-9]$'),
        ],
      ],
      archivoSeleccionado: [''],
    });

    // Suscribirse a los cambios para sanitizar y formatear entradas
    this.solicitudForm
      .get('inicialesContenedor')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          const sanitized = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
          this.solicitudForm
            .get('inicialesContenedor')
            ?.setValue(sanitized, { emitEvent: false });
        }
      });

    this.solicitudForm
      .get('numeroContenedor')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          const sanitized = value.replace(/[^a-zA-Z0-9]/g, '');
          this.solicitudForm
            .get('numeroContenedor')
            ?.setValue(sanitized, { emitEvent: false });
        }
      });

    this.solicitudForm
      .get('digitoDeControl')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          const sanitized = value.replace(/[^0-9]/g, '');
          this.solicitudForm
            .get('digitoDeControl')
            ?.setValue(sanitized, { emitEvent: false });
        }
      });
  }
//set forms values
  setFormValues() {
    this.solicitudForm.get('inicialesContenedor')?.setValue(mockData.inicialesContenedor);
    this.solicitudForm.get('numeroContenedor')?.setValue(mockData.numeroContenedor);
  
  }
//incomplete
cargarCatalogAduanas(): void {
  this.datosTramiteService.getAduanas().subscribe({
    next: (data: any[]) => {
          this.catalogAduanas = data;
    },
    error: (error) => {
      console.error('Error al cargar aduanas', error);
    },
    complete: () => {
      console.log('Carga de aduanas completada.');
    }
  });
}

cargarCatalogContenedores(): void {
  this.datosTramiteService.getContenedores().subscribe({
    next: (data: any[]) => {
    this.catalogContenedores = data;
  }
  ,
   error: error => {
      console.error('Error al cargar contenedores', error);
    },
    complete: () => {
      console.log('Carga de contenedores completada.');
    }
});
   
}

  configurarValidaciones(): void {
    // Aquí puedes configurar validaciones adicionales si es necesario
  }


 

 

  

  mostrarCampos(): void {

    console.log('inside mostrarCampos');
    const tipoBusqueda = this.solicitudForm.get('tipoBusqueda')?.value;
    if (tipoBusqueda === 'Contenedor') {
      console.log('inside mostrarCamposwwww');
      this.seccionContenedorVisible = false;
      this.seccionContenedor = true;
      this.seccionAduanaaFechaVisible = true;
      this.cargarArchivoVisible=false;
      this.seccionExcelVisible = false;
      this.cargarArchivo=true;
    } else if (tipoBusqueda === 'Archivo CSV') {
      this.seccionExcelVisible = true;
      this.seccionAduanaaFechaVisible = true;
      this.seccionContenedorVisible = true;
      this.cargarArchivo=true;
          } else {
      this.seccionAduanaaFechaVisible = false;
      this.seccionContenedorVisible = false;
      this.seccionExcelVisible = false;
    }
  }
  limpiarCampos(): void {
    this.solicitudForm.reset();
    this.contenedores = [];
    this.archivoSeleccionado = '';
    this.exceptionCaught = false;
  }
//incomplete
datosCaptura(): void {
  if (this.solicitudForm.valid) {
    this.datosTramiteService.submitSolicitud(this.solicitudForm.value).subscribe(
      response => {
        // Manejar la respuesta exitosa
        alert('Constancia no encontrada, ¿Deseas agregar una nueva constancia?.');

      },
      error => {
               this.exceptionCaught = true;
      }
    );
  } else {
    this.exceptionCaught = true;
  }
}
agregarAGrid(): void {
   console.log('inside agregar button');
  const nuevoContenedor = {
    tipoContenedor:this.datosContenedor.get('tipoContenedor')?.value,
     //  tipoContenedor: this.solicitudForm.get('tipoContenedor')?.value,
    digito: this.solicitudForm.get('digitoDeControl')?.value,
    aduana:this.datosGenerales.get('aduana')?.value,
    inicialesContenedor:this.datosContenedor.get('inicialesContenedor')?.value,
    numeroContenedor:this.datosContenedor.get('numeroContenedor')?.value,
    
  };
  console.log('tipoContenedor'+nuevoContenedor.tipoContenedor);
  console.log('inside agregar button 1'+nuevoContenedor.aduana);

  if (nuevoContenedor.aduana ) {
    this.contenedores.push(nuevoContenedor);
    console.log(nuevoContenedor.aduana)
    // Limpiar los campos después de agregar
    this.solicitudForm.patchValue({
      contenedores: '',
      digitoDeControl: ''
    });
  }else{
    this.exceptionCaught = true;
  }
}
//incomplete

adjuntarArchivo(): void {

 this.cargarArchivoVisible=true;
  }



  openModalCancelarTramite(): void {
    this.solicitudForm.reset();
    this.contenedores = [];
    this.archivoSeleccionado = '';
    this.exceptionCaught = false;

  }

  tabSeleccionado(): void {
    const currentIdx = localStorage.getItem('currentIdx');
    if (currentIdx !== null) {
      
    }
  }

  cancelarRadioButton(): void {
    this.solicitudForm.get('tipoBusqueda')?.setValue('');
    this.mostrarCampos();
  }

  mostrarTIpoContenedor(): void {
    this.agregarTipoContenedorVisible = true;
  }

  vaiarGridRC(): void {
    // Implementar la lógica necesaria para "vaiarGridRC"
    // Esta función fue referenciada en el HTML original
  }

  crearFormSolicitud(): void {
    this.solicitudForm = this.fb.group({
      idSolicitud: [this.contenedorState?.idSolicitud],
      tipoBusqueda: [this.contenedorState?.tipoBusqueda, Validators.required],  
      datosGenerales: this.fb.group({
        aduana: [this.contenedorState?.aduana],
      }),

      datosContenedor: this.fb.group({
        inicialesContenedor: [this.contenedorState?.inicialesContenedor], 
        numeroContenedor: [this.contenedorState?.numeroContenedor],
        tipoContenedor: [this.contenedorState?.tipoContenedor],
      }),
          });
  }

  
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Contenedor11202Store): void {
    const valor = form.get(campo)?.value;
    (this.contenedorStore[metodoNombre] as (value: any) => void)(valor);
  }

  get datosGenerales():FormGroup{
    return this.solicitudForm.get('datosGenerales') as FormGroup;
  }

  get datosContenedor(): FormGroup {
    return this.solicitudForm.get("datosContenedor") as FormGroup;
  }
}
