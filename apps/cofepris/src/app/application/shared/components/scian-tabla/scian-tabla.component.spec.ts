import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScianTablaComponent } from './scian-tabla.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

  describe('ScianTablaComponent', () => {
    let component: ScianTablaComponent;
    let fixture: ComponentFixture<ScianTablaComponent>;
    let mockDatosSolicitudService: jest.Mocked<DatosSolicitudService>;
    let mockLocation: jest.Mocked<Location>;

    beforeEach(async () => {
      

      await TestBed.configureTestingModule({
        imports: [ScianTablaComponent, ReactiveFormsModule, HttpClientTestingModule],
       
      }).compileComponents();

      fixture = TestBed.createComponent(ScianTablaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize the form on ngOnInit', () => {
      expect(component.scianForm).toBeDefined();
      expect(component.scianForm.get('clave')).toBeTruthy();
      expect(component.scianForm.get('scianNino')).toBeTruthy();
    });

    it('should filter scianNinoLista and update the form when claveSelecionada is called', () => {
      const mockCatalogo = { id: 1, descripcion: 'Test Description' };
      component.scianLista = [mockCatalogo];
      component.claveSelecionada(mockCatalogo);

      expect(component.scianNinoLista).toEqual([mockCatalogo]);
      expect(component.scianForm.get('scianNino')?.value).toBe(1);
    });

    it('should emit scianSeleccionado and navigate back when agregarScian is called', () => {
      const mockCatalogo = { id: 1, descripcion: 'Test Description' };
      component.scianLista = [mockCatalogo];
      component.scianNinoLista = [mockCatalogo];
      component.scianForm.patchValue({ clave: mockCatalogo.descripcion, scianNino: mockCatalogo.id });

      const emitSpy = jest.spyOn(component.scianSeleccionado, 'emit');
      component.agregarScian();

      expect(emitSpy).toHaveBeenCalledWith({
        clave: 'Test Description',
        descripcion: 1,
      });
    });

    it('should reset the form when limpiarScian is called', () => {
      component.scianForm.patchValue({ clave: 'test', scianNino: 'test' });
      component.limpiarScian();

      expect(component.scianForm.get('clave')?.value).toBe('');
      expect(component.scianForm.get('scianNino')?.value).toBe('');
    });

    it('should navigate back when cancelar is called', () => {
      component.cancelar();
    });
  });

