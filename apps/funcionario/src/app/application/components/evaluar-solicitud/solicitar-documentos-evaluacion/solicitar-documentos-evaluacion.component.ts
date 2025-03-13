import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, TablaDinamicaComponent, TipoDocumento } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import data  from '../../../../../../../../libs/shared/theme/assets/json/funcionario/cat-tipo-documento.json';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-solicitar-documentos',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, FormsModule, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './solicitar-documentos-evaluacion.component.html',
  styleUrl: './solicitar-documentos-evaluacion.component.scss',
})
export class SolicitarDocumentosEvaluacionComponent {
  /**
     * Catálogo de tipo de documentos
     */
   catTipoDocumento!: Catalogo[];

   ngOnInit(): void {
    this.catTipoDocumento = data;
  }

  formSolicitudDocumentos: FormGroup = this.fb.group({
    tipoDocumento: ['', [Validators.required]],
    });
    
  constructor(private fb: FormBuilder,
      private toastr: ToastrService,
    ) { }
    
    tipoDocumentoSeleccionado() {
    this.toastr.success('Tipo de docuemento seleccionado');
  }


   
  
  documentos = [
    'Pasaporte',
    'DNI',
    'Licencia de Conducir',
    'Acta de Nacimiento'
  ];
  

  documentosSeleccionados: string[] = [];
  documentoSeleccionado: string = '';

  agregarDocumento() {
    if (this.documentoSeleccionado && !this.documentosSeleccionados.includes(this.documentoSeleccionado)) {
      this.documentosSeleccionados.push(this.documentoSeleccionado);
    }
  }

  eliminarDocumento(index: number) {
    this.documentosSeleccionados.splice(index, 1);
  }


  tipoDocumento: TipoDocumento[] = [];
  configuracionTabla: ConfiguracionColumna<any>[] = [
    { encabezado: 'Tipo de documento', clave: (item: any) => item.tipoDocumento, orden: 1 },
   
  ];
}
