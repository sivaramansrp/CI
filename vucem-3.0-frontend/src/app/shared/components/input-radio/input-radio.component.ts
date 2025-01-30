/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
// eslint-disable-next-line sort-imports
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.scss'
})
export class InputRadioComponent {

  FormInputRadio!: FormGroup;
  @Input() radioOptions: { label: string; value: any }[] = [];
  @Input() selectedValue: any;
  @Input() isRequired: boolean=false;
  @Input() layout: 'vertical' | 'horizontal' = 'vertical'; 
  @Output() valueChange = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createFormRadio();

  }
  createFormRadio() {
    const validators = this.isRequired ? [Validators.required] : [];
    this.FormInputRadio = this.fb.group({
      seleccion: [this.selectedValue || '', validators]
    });
  }
  onSelectionChange(value: any) {
    this.selectedValue = value;
    this.valueChange.emit(value);
  }
}
