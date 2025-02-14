import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { RevisionService } from '../../../../core/services/220501/revision.service';
import { of } from 'rxjs';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let mockRevisionService: jasmine.SpyObj<RevisionService>;

  beforeEach(async () => {
    mockRevisionService = jasmine.createSpyObj('RevisionService', [
      'getJustificacion',
      'getBanco'
    ]);

    mockRevisionService.getJustificacion.and.returnValue(of({code: 200, message:'Success', data: []}));
    mockRevisionService.getBanco.and.returnValue(of({code: 200, message:'Success', data: []}));

    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechosComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: RevisionService, useValue: mockRevisionService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms with correct controls on ngOnInit', fakeAsync(() => {
    mockRevisionService.getJustificacion.and.returnValue(of({ code: 200, message: 'Success', data: [] }));
    mockRevisionService.getBanco.and.returnValue(of({ code: 200, message: 'Success', data: [] }));

    component.ngOnInit();
    tick();

    expect(component.pagoForm.get('banco')).toBeTruthy();
    expect(component.pagoForm.get('justificacion')).toBeTruthy();
    // Add more assertions for other form controls as per your component's form structure
  }));

  it('should get justificación', fakeAsync(() => {
    const mockResponse = { code: 200, message: 'Success', data: [{ id: 1, descripcion: 'Justificación 1' }] };
    mockRevisionService.getJustificacion.and.returnValue(of(mockResponse));
    component.getJustificacion();
    tick();
    expect(mockRevisionService.getJustificacion).toHaveBeenCalled();
    expect(component.justificacion.catalogos).toEqual(mockResponse.data);
  }));

  it('should get banco', fakeAsync(() => {
    const mockResponse = { code: 200, message: 'Success', data: [{ id: 1, descripcion: 'Banco 1' }] };
    mockRevisionService.getBanco.and.returnValue(of(mockResponse));
    component.getBanco();
    tick();
    expect(mockRevisionService.getBanco).toHaveBeenCalled();
    expect(component.banco.catalogos).toEqual(mockResponse.data);
  }));
});