import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosDeLaComponent } from './datosDeLa.component';

describe('DatosDeLaComponent', () => {
  let component: DatosDeLaComponent;
  let fixture: ComponentFixture<DatosDeLaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDeLaComponent, HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.forma).toBeDefined();
    expect(component.forma.get('rfcDel')?.value).toBe(component.solicitudState?.rfcDel);
    expect(component.forma.get('denominacion')?.value).toBe(component.solicitudState?.denominacion);
    expect(component.forma.get('correo')?.value).toBe(component.solicitudState?.correo);
  });

  it('should toggle colapsable state', () => {
    const initialState = component.colapsable;
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(!initialState);
  });

  it('should enable all form controls when toggleFormControls is called', () => {
    component.forma.disable();
    component.toggleFormControls();
    Object.keys(component.forma.controls).forEach((controlName) => {
      expect(component.forma.get(controlName)?.enabled).toBe(true);
    });
  });

  it('should set values in the store when setValoresStore is called', () => {
    const mockStoreMethod = jest.fn();
    const mockForm = {
      get: jest.fn().mockReturnValue({ value: 'testValue' }),
    } as unknown as typeof component.forma;

    component['tramite260211Store'] = { mockMethod: mockStoreMethod } as any;
    component.setValoresStore(mockForm, 'mockField', 'mockMethod' as any);

    expect(mockForm.get).toHaveBeenCalledWith('mockField');
    expect(mockStoreMethod).toHaveBeenCalledWith('testValue');
  });
});
