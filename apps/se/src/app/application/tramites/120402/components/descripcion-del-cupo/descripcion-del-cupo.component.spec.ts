import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DescripcionDelCupoComponent } from './descripcion-del-cupo.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import { DescripcionDelCupoService } from '@ng-mf/data-access-user';

describe('DescripcionDelCupoComponent', () => {
  let component: DescripcionDelCupoComponent;
  let fixture: ComponentFixture<DescripcionDelCupoComponent>;
  let mockService: any;

  const mockData = {
    claveDelCupo: '1234',
    mecanismoDeAsignacion: 'Subasta',
    descripcionDelProducto: 'Producto X',
    unidadDeMedida: 'KG',
    regimenAduanero: 'Importación temporal',
    fechaDeInicioDeVigenciaDelCupo: '2025-01-01',
    fechaDeFinDeVigenciaDelCupo: '2025-12-31',
    fraccionesArancelarias: '1001.10.01',
    tratadoAcuerdo: 'TLCAN',
    paises: 'MX, US, CA',
  };

  beforeAll(() => {
    // Suppress specific Angular form warning
    jest.spyOn(console, 'warn').mockImplementation((msg) => {
      if (
        typeof msg === 'string' &&
        msg.includes("using the disabled attribute with a reactive form directive")
      ) {
        return;
      }
      console.warn(msg);
    });
  });

  beforeEach(async () => {
    mockService = {
      getDescripcionDelCupo: jest.fn().mockReturnValue(of(mockData)),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, DescripcionDelCupoComponent],
      providers: [
        FormBuilder,
        { provide: DescripcionDelCupoService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DescripcionDelCupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    expect(component.form).toBeDefined();
    const controls = [
      'claveDelCupo',
      'mecanismoDeAsignacion',
      'descripcionDelProducto',
      'unidadDeMedida',
      'regimenAduanero',
      'fechaDeInicioDeVigenciaDelCupo',
      'fechaDeFinDeVigenciaDelCupo',
      'fraccionesArancelarias',
      'tratadoAcuerdo',
      'paises',
    ];
    controls.forEach(control => {
      expect(component.form.get(control)).toBeDefined();
    });
  });

  it('should call loadDescripcionDelCupo and patch form values', fakeAsync(() => {
    component.loadDescripcionDelCupo();
    tick(); // Simulate async observable
    fixture.detectChanges();

    expect(mockService.getDescripcionDelCupo).toHaveBeenCalled();
    expect(component.form.get('claveDelCupo')?.value).toBe('1234');
    expect(component.form.get('mecanismoDeAsignacion')?.value).toBe('Subasta');
  }));

  it('should clean up subscriptions on ngOnDestroy', () => {
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
