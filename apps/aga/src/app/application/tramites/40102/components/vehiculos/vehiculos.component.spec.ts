// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Pipe,
  PipeTransform,
  Directive,
  Input,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VehiculosComponent } from './vehiculos.component';

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value: any) {
    return value;
  }
}

@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  transform(value: any) {
    return value;
  }
}

@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  transform(value: any) {
    return value;
  }
}

describe('VehiculosComponent', () => {
  let fixture: ComponentFixture<VehiculosComponent>;
  let component: VehiculosComponent;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        VehiculosComponent,
        TranslatePipe,
        PhoneNumberPipe,
        SafeHtmlPipe,
        MyCustomDirective,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        {
          provide: ToastrService,
          useValue: { error: jest.fn(), success: jest.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculosComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
  });

  afterEach(() => {
    if (component) {
      component.ngOnDestroy = function () {};
    }
    if (fixture) {
      fixture.destroy();
    }
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select a tab and update activeTab', () => {
    component.selectTab('parquevehicular');
    expect(component.selectedTab).toBe('Parque vehicular');
    expect(component.activeTab).toBe('parquevehicular');
  });

  it('should initialize form on ngOnInit()', () => {
    component.fb.group = jest.fn().mockReturnValue({
      controls: {},
    });
    component.ngOnInit();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should open and close modals correctly', () => {
    component.modalInstance = { show: jest.fn(), hide: jest.fn() };

    component.openDialogCapturaSPFisicaValidacion();
    expect(component.modalInstance.show).toHaveBeenCalled();

    component.openDialogCapturaSPMoralValidacion();
    expect(component.modalInstance.show).toHaveBeenCalled();

    component.closeModal();
    expect(component.modalInstance.hide).toHaveBeenCalled();
  });
});
