import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DatosCertificado110203Component } from './datos-certificado-110203.component';
import { Tramite110203Store } from '../../../../estados/tramites/tramite110203.store';
import { Tramite110203Query } from '../../../../estados/queries/tramite110203.query';


describe('DatosCertificado110203Component', () => {
  let component: DatosCertificado110203Component;
  let fixture: ComponentFixture<DatosCertificado110203Component>;
  let tramite110203Store: Tramite110203Store;


  const mockSolicitudState = {
    observaciones: 'Test observations',
    precisa: true,
    presenta: false,
  };

  const tramite110203StoreMock = {
    setObservaciones: jest.fn(),
  
  };

  const tramite110203QueryMock = {
    selectSolicitud$: of(mockSolicitudState),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule,DatosCertificado110203Component],
      providers: [
        FormBuilder,
        { provide: Tramite110203Store, useValue: tramite110203StoreMock },
        { provide: Tramite110203Query, useValue: tramite110203QueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosCertificado110203Component);
    component = fixture.componentInstance;
    tramite110203Store = TestBed.inject(Tramite110203Store);
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with values from solicitudState', () => {
    expect(component.certificadoForm).toBeTruthy();
    expect(component.certificadoForm.controls['observaciones'].value).toBe('Test observations');
    expect(component.certificadoForm.controls['precisa'].value).toBe(true);
    expect(component.certificadoForm.controls['presenta'].value).toBe(false);
  });

  it('should open the modal and initialize the form correctly when abrirModal is called', () => {
    component.abrirModal();
    expect(component.modal).toBe('show');
    expect(component.mercanciasForm).toBeTruthy();
    expect(component.mercanciasForm.get('comercial')?.value).toBe('Patitos de hule');
    expect(component.mercanciasForm.get('ingles')?.value).toBe('rubber ducklings');
    expect(component.mercanciasForm.get('cantidad')?.value).toBe('20000');
    expect(component.mercanciasForm.get('fecha')?.value).toBe('18/02/2025');
  });

  it('should disable certain form controls when getRegistroForm is called', () => {
    component.getRegistroForm();
    expect(component.mercanciasForm.get('comercial')?.disabled).toBe(true);
    expect(component.mercanciasForm.get('ingles')?.disabled).toBe(true);
    expect(component.mercanciasForm.get('cantidad')?.disabled).toBe(true);
    expect(component.mercanciasForm.get('fecha')?.disabled).toBe(true);
  });

  it('should call tramite110203Store.setObservaciones with correct value from the form', () => {
 
    component.certificadoForm.controls['observaciones'].setValue('Updated observations');

  
    component.setValoresStore(component.certificadoForm, 'observaciones', 'setObservaciones');

   
    expect(tramite110203Store.setObservaciones).toHaveBeenCalledWith('Updated observations');
  });

  it('should initialize the form correctly when ngOnInit is called', () => {
    component.ngOnInit();
    expect(component.certificadoForm.get('observaciones')?.value).toBe('Test observations');
    expect(component.certificadoForm.get('precisa')?.value).toBe(true);
    expect(component.certificadoForm.get('presenta')?.value).toBe(false);
  });

  it('should clean up on ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
  });
});
