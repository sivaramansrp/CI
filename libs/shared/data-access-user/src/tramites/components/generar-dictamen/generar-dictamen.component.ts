import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ValidacionesFormularioService } from "../../../core/services/shared/validaciones-formulario/validaciones-formulario.service";


@Component({
  selector: 'app-generar-dictamen',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './generar-dictamen.component.html',
  styleUrl: './generar-dictamen.component.scss',
})
export class GenerarDictamenComponent implements OnInit {
  public dictamenForm!: FormGroup;
  @Output() public enviarEvento = new EventEmitter<{ events: string, datos: unknown }>();
  @Input() public botonDeCancelar = '';
  @Input() public botonGuardar = '';


  constructor(private fb: FormBuilder, private validacionesService: ValidacionesFormularioService,) { }
  ngOnInit(): void {
    this.dictamenForm = this.fb.group({
      cumplimiento: ['1'],
      mensajeDictamen: ['', [Validators.required]]
    });
  }
  isValid(field: string): boolean {
    const VALIDATIONRESULT = this.validacionesService.isValid(
      this.dictamenForm,
      field
    );
    return VALIDATIONRESULT === null ? false : VALIDATIONRESULT;
  }
  guardarFirmar(): void {
    this.dictamenForm.markAllAsTouched();
    if (this.dictamenForm.valid) {
      this.enviarEvento.emit({
        datos: this.dictamenForm.value,
        events: "guardar"
      });
    }
  }
  cancelar(): void {
    this.enviarEvento.emit({ events: "cancelar", datos: null });
  }
}
