import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnChanges,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  BsDatepickerConfig,
  BsDatepickerDirective,
  BsDatepickerModule,
  BsLocaleService,
} from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';

const BS_LOCALE_ES = 'es';

(() => {
  try {
    defineLocale(BS_LOCALE_ES, esLocale);
  } catch (error) {
    // eslint-disable-next-line no-empty
    if (!(error instanceof Error) || !/already defined/i.test(error.message)) {
      throw error;
    }
  }
})();

@Component({
  selector: 'date-picker',
  standalone: true,
  imports: [BsDatepickerModule, NgClass],
  templateUrl: './date-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor, OnChanges {
  @ViewChild('dp', { static: false }) datepicker?: BsDatepickerDirective;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() hasError = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() isDisable = false;

  private localeService = inject(BsLocaleService);
  private onChange = (value: Date | undefined) => {};
  private onTouched = () => {};

  bsConfig = this.initDateConfig();
  value?: Date | null;

  constructor() {}

  ngOnChanges(): void {
    // TODO: ADD VALIDATION FOR THE INPUTS MIN AND MAX
    this.bsConfig = {
      ...this.initDateConfig(),
      minDate: this.minDate,
      maxDate: this.maxDate,
    };
  }

  onChangeValue(value: Date | undefined): void {
    this.value = value;
    this.onChange(value);
  }

  writeValue(value: Date | undefined): void {
    this.value = value ?? null;

    // Clear visual input if value is null
    if (!value && this.datepicker) {
      this.datepicker.bsValue = undefined;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleBlur(): void {
    this.onTouched();
  }

  private initDateConfig(): Partial<BsDatepickerConfig> {
    this.localeService.use(BS_LOCALE_ES);
    return {
      containerClass: 'theme-default',
      dateInputFormat: 'DD/MM/YYYY',
      showWeekNumbers: false,
      keepDatesOutOfRules: true,
    };
  }
}
