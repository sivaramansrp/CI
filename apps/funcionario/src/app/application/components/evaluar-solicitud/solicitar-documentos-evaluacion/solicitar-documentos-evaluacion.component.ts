import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import data from '../../../../../../../../libs/shared/theme/assets/json/funcionario/cat-tipo-documento.json';
import { DocumentosStates, SolicitudDocumentosState } from '../../../estados/evaluacion-solicitud/documentos.store';
import { SolicitudDocumentosQuery } from '../../../estados/queries/documentos.query';
import { map, Subject, takeUntil } from 'rxjs';
import { FuncionarioService } from '../../../../../../../../libs/shared/data-access-user/src/core/services/shared/funcionario/funcionario.service';

@Component({
  selector: 'app-solicitar-documentos',
  standalone: true,
  imports: [CommonModule, FormsModule, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './solicitar-documentos-evaluacion.component.html',
  styleUrl: './solicitar-documentos-evaluacion.component.scss',
})
export class SolicitarDocumentosEvaluacionComponent {
  formSolicitudDocumentos! : FormGroup;
  catTipoDocumento!: Catalogo[];
  documentosSeleccionados: string[] = [];
  documentoSeleccionado: string = '';
  private destroyNotifier$: Subject<void> = new Subject();
  public solicitudDocumentosState!: SolicitudDocumentosState;

  constructor(private fb: FormBuilder,
    private documentosStates: DocumentosStates,
    private solicitudRequerimientoQuery: SolicitudDocumentosQuery,
    private estadoService: FuncionarioService,
  ) { }

  ngOnInit(): void {
    this.catTipoDocumento = data;
    
    this.solicitudRequerimientoQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudDocumentosState = seccionState;
        })
      )
      .subscribe();
     
      this.crearFormDocumentos();
  }

  crearFormDocumentos(): void{
    this.formSolicitudDocumentos = this.fb.group({
      tipoDocumento: ['', [Validators.required]],
    });
  }

  agregarDocumento() {
    const tipoDocumentoId = this.formSolicitudDocumentos.get('tipoDocumento')?.value;

    const selectedOption = this.catTipoDocumento.find(option => option.id === +tipoDocumentoId);
    const description = selectedOption ? selectedOption.descripcion : 'No description found';
    if (description && !this.documentosSeleccionados.includes(description)) {
      this.documentosSeleccionados.push(description.toString());
    }
    this.setValoresStore(this.formSolicitudDocumentos, 'documentosSeleccionados', 'setSolicitudDocumentos');
  }

  eliminarDocumento(index: number) {
    this.documentosSeleccionados.splice(index, 1);
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof DocumentosStates): void {
    const valor = form.get(campo)?.value;
    (this.documentosStates[metodoNombre] as (value: any) => void)(valor);
  }


}
