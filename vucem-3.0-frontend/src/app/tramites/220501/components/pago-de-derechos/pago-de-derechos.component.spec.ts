import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { RevisionService } from '../../../../core/services/220501/revision.service';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let revisionService: RevisionService; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechosComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [RevisionService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    revisionService = TestBed.inject(RevisionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.pagoForm).toBeDefined();
    expect(component.pagoForm.get('exentoPagoNo')).toBeDefined();
    expect(component.pagoForm.get('exentoPagoSi')).toBeDefined();
    expect(component.pagoForm.get('justificacion')).toBeDefined();
    expect(component.pagoForm.get('claveReferencia')).toBeDefined();
    expect(component.pagoForm.get('cadenaDependencia')).toBeDefined();
    expect(component.pagoForm.get('banco')).toBeDefined();
    expect(component.pagoForm.get('llavePago')).toBeDefined();
    expect(component.pagoForm.get('importePago')).toBeDefined();
    expect(component.pagoForm.get('fetchapago')).toBeDefined();
  });
  
 it('should get justificación', () => {
    spyOn(revisionService, 'getJustificacion').and.callThrough();
    component.getJustificacion();
    expect(revisionService.getJustificacion).toHaveBeenCalled();
  });

  it('should get banco', () => {
    spyOn(revisionService, 'getBanco').and.callThrough();
    component.getBanco();
    expect(revisionService.getBanco).toHaveBeenCalled();
  });
});