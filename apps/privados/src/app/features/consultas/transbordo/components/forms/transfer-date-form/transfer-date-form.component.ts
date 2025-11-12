import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@/shared/utils/formUtils';
import { DatePickerComponent } from '@/shared/components/date-picker/date-picker.component';
import { TransferService } from '../../../services/transfer.service';
import { formatDateIso } from '@/shared/utils/serviceUtils';
import { formatDate } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-transfer-date-form',
  standalone: true,
  imports: [ReactiveFormsModule, DatePickerComponent],
  templateUrl: './transfer-date-form.component.html',
})
export class TransferDateFormComponent {
  private formBuilder = inject(FormBuilder);
  private transferService = inject(TransferService);
  formUtils = FormUtils;
  transferForm = this.formBuilder.group({
    transferDate: [null, Validators.required],
  });

  submitForm() {
    this.transferForm.markAllAsTouched();
    if (this.transferForm.valid) {
      const { transferDate } = this.transferForm.value;
      let transferDateFormatted = '';
      if (transferDate) {
        transferDateFormatted = formatDateIso(transferDate);
        transferDateFormatted = formatDate(transferDateFormatted, 'dd/MM/yyyy', 'en-US');
        this.generateReport(transferDateFormatted);
      }
    }
  }

  generateReport(transferDateFormatted: string) {
    this.transferService
      .downloadDateTransferReport(transferDateFormatted)
      .pipe(take(1))
      .subscribe();
  }

  resetForm() {
    this.transferForm.reset();
  }
}
