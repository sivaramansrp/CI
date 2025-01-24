import { CommonModule } from '@angular/common';
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
  @Output() valueChange = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createFormRadio();

  }
  createFormRadio() {
    this.FormInputRadio = this.fb.group({
      seleccion: ['', Validators.required] // Add validation if necessary
    });
  }
  onSelectionChange(value: any) {
    this.selectedValue = value;
    this.valueChange.emit(value);
  }
}
