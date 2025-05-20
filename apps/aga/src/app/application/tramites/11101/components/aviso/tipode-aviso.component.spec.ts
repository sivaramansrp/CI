
  import { TestBed } from '@angular/core/testing';
  import { TipodeAvisoComponent } from './tipode-aviso.component';
  import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

  jest.mock('@libs/shared/theme/assets/json/11101/aviso-mockdata.json', () => ({
    default: {
      numeroderegistro: '12345',
      NobmreDenominationRazonSocial: 'Test Name',
      rfctaxid: 'RFC123456',
      Telefono: '1234567890',
      correoelectronico: 'test@example.com',
      entidadadfederativa: 'Test State',
      alcadilamunicipio: 'Test Municipality',
      colonia: 'Test Colony',
      codigopostal: '12345',
      calle: 'Test Street',
      numeroletraexterior: '123',
      numeroletrainterior: 'A',
      entrecalle: 'Street 1',
      ycalle: 'Street 2',
    }
  }));
  describe('TipodeAvisoComponent', () => {
    let component: TipodeAvisoComponent;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule, TipodeAvisoComponent],
        providers: [FormBuilder],
      });
  
      const fixture = TestBed.createComponent(TipodeAvisoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  
    it('should initialize the form on ngOnInit', () => {
      component.ngOnInit();
      expect(component.avisoForm).toBeDefined();
      expect(component.avisoForm.controls['numeroderegistro']).toBeDefined();
      expect(component.avisoForm.controls['NobmreDenominationRazonSocial']).toBeDefined();
    });
  
    it('should set form values correctly in setFormValues', () => {
      component.ngOnInit();
      component.setFormValues();
      expect(component.avisoForm.get('numeroderegistro')?.value).toBe('12345');
      expect(component.avisoForm.get('NobmreDenominationRazonSocial')?.value).toBe('Test Name');
      expect(component.avisoForm.get('rfctaxid')?.value).toBe('RFC123456');
      expect(component.avisoForm.get('Telefono')?.value).toBe('1234567890');
      expect(component.avisoForm.get('correoelectronico')?.value).toBe('test@example.com');
    });
  
    it('should toggle isManualSelected and CargaMasiva in setManual', () => {
      component.setManual(true);
      expect(component.isManualSelected).toBe(true);
      component.setManual(false);
      expect(component.isManualSelected).toBe(false);
      expect(component.cargaMasiva).toBe(true);
    });
  
    it('should toggle isManualSelected and CargaMasiva in setManual', () => {
      component.setManual(true);
      expect(component.isManualSelected).toBe(true);
      expect(component.cargaMasiva).toBe(false);
    
      component.setManual(false);
      expect(component.isManualSelected).toBe(false);
      expect(component.cargaMasiva).toBe(true);
    });
  });
  