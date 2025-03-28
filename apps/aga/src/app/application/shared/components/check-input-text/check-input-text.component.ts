/* eslint-disable class-methods-use-this */
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'lib-check-input-text',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './check-input-text.component.html',
  styleUrl: './check-input-text.component.scss',
})
export class CheckInputTextComponent implements OnChanges {
  @Input({ required: true }) idCheckbox!: string;
  @Input({ required: true }) idInputTexto!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) required!: boolean;
  @Input({ required: true }) reverse!: boolean;
  @Input({required: true}) hidden!: boolean;
  @Input({ required: true }) tipo!: string;


  forma: FormGroup;

  constructor(private fb: FormBuilder) {
    this.forma = this.fb.group({
      checkbox: [false],
      texto: [{ value: '', disabled: true }],
    });
  }

  ngOnChanges(changes: SimpleChanges): void { 
    if (changes['reverse']) {
      this.reverse = changes['reverse'].currentValue;
    }
    if (changes['required']) {
      this.required = changes['required'].currentValue;
    }
  }
  
  cambioInputTexto(): void {
    const CHECKBOX = this.forma.get('checkbox')?.value;

    if (this.tipo === 'invisible' && !this.hidden) {
      this.hidden = true;
      this.activarInputTexto();
    } else if (this.tipo === 'invisible' && this.hidden) {
      this.hidden = false;
      this.desactivarInputTexto();
    }

    if (CHECKBOX) {
      this.activarInputTexto();
     
    } else {
      this.desactivarInputTexto();
    }
  }


  activarInputTexto(): void {
    this.forma.get('texto')?.enable();
    this.forma.get('texto')?.setValidators([Validators.required]);
    this.forma.get('texto')?.updateValueAndValidity();
  }

  desactivarInputTexto(): void {
    this.forma.get('texto')?.disable();
    this.forma.get('texto')?.clearValidators();
    this.forma.get('texto')?.updateValueAndValidity();
  }
}
