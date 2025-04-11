import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CapturarElTextoLibreComponent } from './capturar-el-texto-libre.component';
import { AlertComponent, TEXTOS, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CapturarElTextoLibreComponent', () => {
  let component: CapturarElTextoLibreComponent;
  let routerSpy: jest.Mocked<Router>;

  beforeEach(() => {
    const spy = {
      navigate: jest.fn(),
      events: jest.fn() as any,
    } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      imports: [
        CapturarElTextoLibreComponent,
        TituloComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AlertComponent,
      ],
      providers: [{ provide: Router, useValue: spy }],
    });

    const fixture = TestBed.createComponent(CapturarElTextoLibreComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have TEXTOS defined', () => {
    expect(component.TEXTOS).toBe(TEXTOS);
  });

  it('should have infoAlert set to "alert-info"', () => {
    expect(component.infoAlert).toBe('alert-info');
  });

  it('should navigate to the correct route on guardarYFirmar', () => {
    component.guardarYFirmar();
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      '/pago/manifiesto-aereo/firmar',
    ]);
  });
});
