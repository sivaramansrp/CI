
import { CommonModule } from '@angular/common';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.scss'
})
export class InputRadioComponent implements OnInit {

  FormInputRadio!: FormGroup;
  @Input() radioOptions: { label: string; value: string | number }[] = [];
  @Input() selectedValue: string | number | null = null;
  @Input() isRequired: boolean=false;
  @Input() layout: 'vertical' | 'horizontal' = 'vertical'; 
  @Output() valueChange = new EventEmitter<string | number>();
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
  onSelectionChange(value: string | number) {
    this.selectedValue = value;
    this.valueChange.emit(value);
  }
}
