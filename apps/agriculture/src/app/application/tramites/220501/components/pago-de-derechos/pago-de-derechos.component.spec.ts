import { ComponentFixture } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RevisionService } from '@ng-mf/data-access-user';
import { TestBed } from '@angular/core/testing';
import { fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { tick } from '@angular/core/testing';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let mockRevisionService: jest.Mocked<RevisionService>;

  beforeEach(async () => {
    mockRevisionService = jasmine.createSpyObj('RevisionService', [
      'getJustificacion',
      'getBanco'
    ]);

    mockRevisionService.getJustificacion.mockReturnValue(of({code: 200, message:'Success', data: []}));
    mockRevisionService.getBanco.mockReturnValue(of({code: 200, message:'Success', data: []}));

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
    mockRevisionService.getJustificacion.mockReturnValue(of({ code: 200, message: 'Success', data: [] }));
    mockRevisionService.getBanco.mockReturnValue(of({ code: 200, message: 'Success', data: [] }));

    component.ngOnInit();
    tick();

    expect(component.pagoForm.get('banco')).toBeTruthy();
    expect(component.pagoForm.get('justificacion')).toBeTruthy();
  }));

  it('should get justificación', fakeAsync(() => {
    const MOCKRESPONSE = { code: 200, message: 'Success', data: [{ id: 1, descripcion: 'Justificación 1' }] };
    mockRevisionService.getJustificacion.mockReturnValue(of(MOCKRESPONSE));
    component.getJustificacion();
    tick();
    expect(mockRevisionService.getJustificacion).toHaveBeenCalled();
    expect(component.justificacion.catalogos).toEqual(MOCKRESPONSE.data);
  }));

  it('should get banco', fakeAsync(() => {
    const MOCKRESPONSE = { code: 200, message: 'Success', data: [{ id: 1, descripcion: 'Banco 1' }] };
    mockRevisionService.getBanco.mockReturnValue(of(MOCKRESPONSE));
    component.getBanco();
    tick();
    expect(mockRevisionService.getBanco).toHaveBeenCalled();
    expect(component.banco.catalogos).toEqual(MOCKRESPONSE.data);
  }));
});