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
@Component({
  selector: 'app-contenedor',
   templateUrl: './contenedor.component.html',
  styleUrl: './contenedor.component.scss',


})
export class ContenedorComponent   {
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
  exceptionCaught: boolean = false;
  actionBean = { requiereGuardadoParcial: false };
  nonSelectionTextTipoContendor:string = 'Selecciona un valor';

  constructor(
    private fb: FormBuilder,
    private datosTramiteService: DatosTramiteService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
     this.cargarCatalogAduanas();
     this.cargarCatalogContenedores();
     this.tabSeleccionado();
     this.configurarValidaciones();
     this.setFormValues();
     
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
    const tipoBusqueda = this.solicitudForm.get('tipoBusqueda')?.value;
    if (tipoBusqueda === 'Contenedor') {
      this.seccionContenedorVisible = false;
      this.seccionContenedor = true;
      this.seccionAduanaaFechaVisible = true;
      this.seccionExcelVisible = false;
    } else if (tipoBusqueda === 'Archivo CSV') {
      this.seccionExcelVisible = true;
      this.seccionAduanaaFechaVisible = true;
      this.seccionContenedorVisible = true;
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
        console.log('Solicitud enviada exitosamente', response);
      },
      error => {
        // Manejar el error
        console.error('Error al enviar la solicitud', error);
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
    tipoContenedor: this.solicitudForm.get('tipoContenedor')?.value,
    digito: this.solicitudForm.get('digitoDeControl')?.value,
    aduana:this.solicitudForm.get('aduana')?.value,
    inicialesContenedor:this.solicitudForm.get('inicialesContenedor')?.value,
    numeroContenedor:this.solicitudForm.get('numeroContenedor')?.value,
    
  };
  console.log('inside agregar button 1'+nuevoContenedor.aduana);

  if (nuevoContenedor.aduana ) {
    this.contenedores.push(nuevoContenedor);
    console.log(nuevoContenedor.aduana)
    // Limpiar los campos después de agregar
    this.solicitudForm.patchValue({
      contenedores: '',
      digitoDeControl: ''
    });
  }
}


adjuntarArchivo(): void {
  const archivoInput = document.getElementById('archivoSeleccionado') as HTMLInputElement;
  if (archivoInput && archivoInput.files && archivoInput.files.length > 0) {
    const archivo = archivoInput.files[0];
    this.datosTramiteService.uploadArchivo(archivo).subscribe(
      response => {
        // Manejar la respuesta exitosa de la carga
        console.log('Archivo cargado exitosamente', response);
        this.archivoSeleccionado = archivo.name;
      },
      error => {
        // Manejar el error de carga
        console.error('Error al cargar el archivo', error);
      }
    );
  }
}

  openModalCancelarTramite(): void {
    // Implementar la lógica para abrir el modal "Cancelar Tramite"
    // Dependiendo de la librería de modales que uses, puede variar
  }

  tabSeleccionado(): void {
    const currentIdx = localStorage.getItem('currentIdx');
    if (currentIdx !== null) {
      // Implementar la lógica para seleccionar la pestaña actual basada en currentIdx
      // Por ejemplo, puedes usar una librería de tabs de Angular y establecer el índice activo
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

  
}
