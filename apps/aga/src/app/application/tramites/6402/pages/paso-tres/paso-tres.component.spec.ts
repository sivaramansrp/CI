// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform, Directive, Input, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { PasoTresComponent } from './paso-tres.component';
import { ToastrService } from 'ngx-toastr';

// Mock Router
@Injectable()
class MockRouter {
  navigate = jest.fn();
}

// Mock Pipes
@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

// Mock Directive
@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom: any;
}

// Mock ToastrService
class MockToastrService {
  success() {}
  error() {}
}

describe('PasoTresComponent', () => {
  let fixture: ComponentFixture<PasoTresComponent>;
  let component: PasoTresComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PasoTresComponent,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [
        TranslatePipe,
        PhoneNumberPipe,
        SafeHtmlPipe,
        MyCustomDirective
      ],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: ToastrService, useClass: MockToastrService },
        { provide: 'ToastConfig', useValue: {} } // 🔧 Fix for ToastConfig token
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy(); // ✅ Removed invalid ngOnDestroy override
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #obtieneFirma()', async () => {
    const router = TestBed.inject(Router);
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.obtieneFirma('firma_valida');
    expect(navigateSpy).toHaveBeenCalledWith(['aviso-traslado/acuse']);
  });
});
