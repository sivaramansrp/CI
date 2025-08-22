import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransporteComponent } from './transporte.component';
import { provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { TransporteDespacho } from '../../../core/models/shared/agregar-transporte.model';

describe('TransporteComponent', () => {
    let component: TransporteComponent;
    let fixture: ComponentFixture<TransporteComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [TransporteComponent],
        providers: [provideHttpClient(), FormBuilder]
    })
    .compileComponents();
    
        fixture = TestBed.createComponent(TransporteComponent);
        component = fixture.componentInstance;
        
        // Set up required inputs
        component.catalogoTransporte = [];
        component.tablaTransporte = [];
        component.tipoTransporteSeleccionado = '1';
        
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('modificarTransporte', () => {
        it('should not modify transport when all fields are empty and no observations', () => {
            // Arrange
            const originalTransport: TransporteDespacho = {
                tipo_transporte: '1',
                emp_transportista: 'Original Company',
                numero_porte: 'ABC123',
                fecha_porte: '2024-01-01',
                marca_transporte: 'Original Brand',
                modelo_transporte: '2020',
                placas_transporte: 'XYZ789',
                contenedor_transporte: 'Container123',
                observaciones: 'Original observations',
                seleccionado: false
            };

            // Set up component state
            component.bodyTabla = [originalTransport];
            component.registroSeleccionado = originalTransport;
            component.tipoTransporteForma.get('tipoTransporte')?.setValue('1');
            component.accionModificar = true;
            
            // Clear all form fields (simulate user clicking "Limpiar")
            component.limpiarFormulario();
            
            // Spy on cerrarModal to verify the method exits early
            const cerrarModalSpy = jasmine.createSpy('cerrarModal');
            component.cerrarModal = cerrarModalSpy;

            // Act
            component.modificarTransporte();

            // Assert
            expect(cerrarModalSpy).toHaveBeenCalled();
            // Verify original data is preserved
            expect(component.bodyTabla[0].emp_transportista).toBe('Original Company');
            expect(component.bodyTabla[0].numero_porte).toBe('ABC123');
            expect(component.bodyTabla[0].marca_transporte).toBe('Original Brand');
        });

        it('should modify transport when at least one field has a value', () => {
            // Arrange
            const originalTransport: TransporteDespacho = {
                tipo_transporte: '1',
                emp_transportista: 'Original Company',
                numero_porte: 'ABC123',
                fecha_porte: '2024-01-01',
                marca_transporte: 'Original Brand',
                modelo_transporte: '2020',
                placas_transporte: 'XYZ789',
                contenedor_transporte: 'Container123',
                observaciones: 'Original observations',
                seleccionado: false
            };

            // Set up component state
            component.bodyTabla = [originalTransport];
            component.registroSeleccionado = originalTransport;
            component.tipoTransporteForma.get('tipoTransporte')?.setValue('1');
            component.accionModificar = true;
            
            // Set one field with a new value
            component.carreteroForma.get('emp_transportista')?.setValue('New Company');
            
            // Spy on modal methods
            const cerrarModalSpy = jasmine.createSpy('cerrarModal');
            const enviarTransporteTablaSpy = jasmine.createSpy('enviarTransporteTabla');
            component.cerrarModal = cerrarModalSpy;
            component.enviarTransporteTabla = enviarTransporteTablaSpy;

            // Act
            component.modificarTransporte();

            // Assert
            expect(cerrarModalSpy).toHaveBeenCalled();
            expect(enviarTransporteTablaSpy).toHaveBeenCalled();
            // Verify data was modified
            expect(component.bodyTabla[0].emp_transportista).toBe('New Company');
        });

        it('should modify transport when observations have a value even if other fields are empty', () => {
            // Arrange
            const originalTransport: TransporteDespacho = {
                tipo_transporte: '1',
                emp_transportista: 'Original Company',
                numero_porte: 'ABC123',
                observaciones: 'Original observations',
                seleccionado: false
            };

            // Set up component state
            component.bodyTabla = [originalTransport];
            component.registroSeleccionado = originalTransport;
            component.tipoTransporteForma.get('tipoTransporte')?.setValue('1');
            component.accionModificar = true;
            
            // Clear form but set observations
            component.limpiarFormulario();
            component.observaciones.setValue('New observations only');
            
            // Spy on modal methods
            const cerrarModalSpy = jasmine.createSpy('cerrarModal');
            const enviarTransporteTablaSpy = jasmine.createSpy('enviarTransporteTabla');
            component.cerrarModal = cerrarModalSpy;
            component.enviarTransporteTabla = enviarTransporteTablaSpy;

            // Act
            component.modificarTransporte();

            // Assert
            expect(cerrarModalSpy).toHaveBeenCalled();
            expect(enviarTransporteTablaSpy).toHaveBeenCalled();
            // Verify observations were updated
            expect(component.bodyTabla[0].observaciones).toBe('New observations only');
        });
    });
});