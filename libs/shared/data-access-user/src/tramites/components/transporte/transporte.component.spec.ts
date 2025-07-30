import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransporteComponent } from './transporte.component';
import { provideHttpClient } from '@angular/common/http';

describe('TransporteComponent', () => {
    let component: TransporteComponent;
    let fixture: ComponentFixture<TransporteComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [TransporteComponent],
        providers: [provideHttpClient()]
    })
    .compileComponents();
    
        fixture = TestBed.createComponent(TransporteComponent);
        component = fixture.componentInstance;
        // Set required inputs
        component.catalogoTransporte = [
            { id: 1, descripcion: 'Carretero' },
            { id: 2, descripcion: 'Ferroviario' }
        ];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show "Selecciona un registro" message when trying to delete without selection', () => {
        // Arrange: No items selected
        component.transporteSeleccionado = [];
        
        // Act: Try to delete
        component.eliminarSeleccionados();
        
        // Assert: Should show selection message
        expect(component.nuevaNotificacion.mensaje).toBe('Selecciona un registro');
    });

    it('should show correct transport type in deletion success message', () => {
        // Arrange: Set ferroviario transport type and add mock selected items
        component.tipoTransporteForma.get('tipoTransporte')?.setValue('2'); // Ferroviario
        component.transporteSeleccionado = [{ tipo_transporte: '2' }] as any;
        component.bodyTabla = [{ tipo_transporte: '2' }] as any;
        
        // Act: Delete selected items
        component.eliminarSeleccionados();
        
        // Assert: Should show ferroviario (not cached transport type)
        expect(component.nuevaNotificacion.mensaje).toContain('ferroviario');
    });
});