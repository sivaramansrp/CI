import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { REGEX_CORREO_ELECTRONICO, REGEX_SOLO_DIGITOS, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CAMPO_DE_REPRESENTANTE } from '../../constantes/modificacion.enum';

@Component({
  selector: 'app-datos-del-representante',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './DatosDelRepresentante.component.html',
  styleUrl: './DatosDelRepresentante.component.scss',
})
export class DatosDelRepresentanteComponent implements OnInit, OnDestroy {

  formRepresentante!: FormGroup;
  destroyNotifier$: Subject<void> = new Subject();
  campoDestinatario = false;

  @Output() formaValida: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() formRepresentanteEvent: EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }> = new EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }>();
  @Input() idProcedimiento!: number;
  @Input() datosForm!: { [key: string]: unknown };

  constructor(private validacionesService: ValidacionesFormularioService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.campoDestinatario = CAMPO_DE_REPRESENTANTE.includes(this.idProcedimiento);
    this.donanteDomicilio();
  }

  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  setValoresStore(formGroupName: string, campo: string, storeStateName: string): void {
    const VALOR = this.formRepresentante.get(campo)?.value;
    this.formaValida.emit(this.formRepresentante.valid);
    this.formRepresentanteEvent.emit({ formGroupName, campo, valor: VALOR, storeStateName });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datosForm'] && this.datosForm) {
      if (this.formRepresentante) {
        this.formRepresentante.patchValue(this.datosForm);
      } else {
        this.donanteDomicilio();
      }
    }
  }
  donanteDomicilio(): void {
    this.formRepresentante = this.fb.group({
      lugar: ['', [Validators.required, Validators.maxLength(70)]],
      nombreExportador: ['', [Validators.required, Validators.maxLength(40)]],
      empresa: ['', [Validators.required, Validators.maxLength(40)]],
      cargo: ['', [Validators.required, Validators.maxLength(40)]],
      lada: ['', []],
      telefono: ['', [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)]],
      fax: ['', [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)]],
      correoElectronico: ['', [Validators.required, Validators.pattern(REGEX_CORREO_ELECTRONICO)]],
    });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
