import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TratadosComponent } from './tratados.component';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';

describe('TratadosComponent', () => {
  let component: TratadosComponent;
  let fixture: ComponentFixture<TratadosComponent>;
  let service: CertificadoTecnicoJaponService;

  beforeEach(async () => {
    const serviceMock = {
      gettratados: jasmine.createSpy('gettratados').and.returnValue(of({
        tratadoAcuerdo: 'Acuerdo 1',
        paísBloque: 'Bloque 1',
        paísdeOrigen: 'País 1',
        paísDestino: 'País 2',
        fechadeExpedición: '2025-03-07',
        fechadeVencimiento: '2026-03-07'
      }))
    };

    await TestBed.configureTestingModule({
      declarations: [TratadosComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: CertificadoTecnicoJaponService, useValue: serviceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(TratadosComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CertificadoTecnicoJaponService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const form = component.detallesdeltransporte;
    expect(form.value).toEqual({
      tratadoAcuerdo: '',
      paísBloque: '',
      paísdeOrigen: '',
      paísDestino: '',
      fechadeExpedición: '',
      fechadeVencimiento: ''
    });
  });

  it('should call getTabledatas on ngOnInit', () => {
    spyOn(component, 'getTabledatas');
    component.ngOnInit();
    expect(component.getTabledatas).toHaveBeenCalled();
  });

  it('should update the form with data from the service', () => {
    component.getTabledatas();
    expect(component.detallesdeltransporte.value).toEqual({
      tratadoAcuerdo: 'Acuerdo 1',
      paísBloque: 'Bloque 1',
      paísdeOrigen: 'País 1',
      paísDestino: 'País 2',
      fechadeExpedición: '2025-03-07',
      fechadeVencimiento: '2026-03-07'
    });
  });
});