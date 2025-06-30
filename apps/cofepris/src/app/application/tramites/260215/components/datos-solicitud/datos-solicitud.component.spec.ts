import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosDeLaComponent } from './datos-solicitud.component';

describe('DatosDeLaComponent', () => {
  let component: DatosDeLaComponent;
  let fixture: ComponentFixture<DatosDeLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DatosDeLaComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con valores predeterminados', () => {
    expect(component.forma).toBeDefined();
    expect(component.forma.get('rfcDel')?.value).toBe(
      component.solicitudState?.rfcDel
    );
    expect(component.forma.get('denominacion')?.value).toBe(
      component.solicitudState?.denominacion
    );
    expect(component.forma.get('correo')?.value).toBe(
      component.solicitudState?.correo
    );
  });

  it('debería alternar el estado de colapsable', () => {
    const initialState = component.colapsable;
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(!initialState);
  });

  it('debería habilitar todos los controles del formulario cuando se llama alternarControlesDeFormulario', () => {
    component.forma.disable();
    component.alternarControlesDeFormulario();
    Object.keys(component.forma.controls).forEach((controlName) => {
      expect(component.forma.get(controlName)?.enabled).toBe(true);
    });
  });

  it('debería establecer valores en el store cuando se llama setValoresStore', () => {
    const mockStoreMethod = jest.fn();
    const mockForm = {
      get: jest.fn().mockReturnValue({ value: 'testValue' }),
    } as unknown as typeof component.forma;

    component['tramite260215Store'] = { mockMethod: mockStoreMethod } as any;
    component.setValoresStore(mockForm, 'mockField', 'mockMethod' as any);

    expect(mockForm.get).toHaveBeenCalledWith('mockField');
    expect(mockStoreMethod).toHaveBeenCalledWith('testValue');
  });
});
