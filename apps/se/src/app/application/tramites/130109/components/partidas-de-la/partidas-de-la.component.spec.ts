import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PartidasDeLaComponent } from './partidas-de-la.component';
import { CatalogosService } from '@ng-mf/data-access-user';

describe('PartidasDeLaComponent', () => {
  let component: PartidasDeLaComponent;
  let fixture: ComponentFixture<PartidasDeLaComponent>;
  let mockCatalogosService;

  beforeEach(async () => {
    mockCatalogosService = {
      getCatalogos: jasmine.createSpy('getCatalogos').and.returnValue(of({ /* mock data */ }))
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PartidasDeLaComponent],
      providers: [{ provide: CatalogosService, useValue: mockCatalogosService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidasDeLaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should validate cantidad field', () => {
    const cantidad = component.form.controls['cantidad'];
    expect(cantidad.valid).toBeFalsy();

    cantidad.setValue('');
    expect(cantidad.hasError('required')).toBeTruthy();

    cantidad.setValue('abc');
    expect(cantidad.hasError('pattern')).toBeTruthy();

    cantidad.setValue('1234567890123456789');
    expect(cantidad.hasError('maxlength')).toBeTruthy();

    cantidad.setValue('123456');
    expect(cantidad.valid).toBeTruthy();
  });

  it('should validate fraccionArancelariaTIGIE field', () => {
    const fraccionArancelariaTIGIE = component.form.controls['fraccionArancelariaTIGIE'];
    expect(fraccionArancelariaTIGIE.valid).toBeFalsy();

    fraccionArancelariaTIGIE.setValue('');
    expect(fraccionArancelariaTIGIE.hasError('required')).toBeTruthy();

    fraccionArancelariaTIGIE.setValue('some value');
    expect(fraccionArancelariaTIGIE.valid).toBeTruthy();
  });

  it('should validate descripcion field', () => {
    const descripcion = component.form.controls['descripcion'];
    expect(descripcion.valid).toBeFalsy();

    descripcion.setValue('');
    expect(descripcion.hasError('required')).toBeTruthy();

    descripcion.setValue('a'.repeat(256));
    expect(descripcion.hasError('maxlength')).toBeTruthy();

    descripcion.setValue('Valid description');
    expect(descripcion.valid).toBeTruthy();
  });

  it('should validate valorPartidaUSD field', () => {
    const valorPartidaUSD = component.form.controls['valorPartidaUSD'];
    expect(valorPartidaUSD.valid).toBeFalsy();

    valorPartidaUSD.setValue('');
    expect(valorPartidaUSD.hasError('required')).toBeTruthy();

    valorPartidaUSD.setValue('-1');
    expect(valorPartidaUSD.hasError('min')).toBeTruthy();

    valorPartidaUSD.setValue('abc');
    expect(valorPartidaUSD.hasError('pattern')).toBeTruthy();

    valorPartidaUSD.setValue('123456789012345678901');
    expect(valorPartidaUSD.hasError('maxlength')).toBeTruthy();

    valorPartidaUSD.setValue('12345.67');
    expect(valorPartidaUSD.valid).toBeTruthy();
  });
});