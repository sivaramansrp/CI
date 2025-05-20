// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcluirRelacionComponent } from './concluir-relacion.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { InputFechaComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule, Validators } from '@angular/forms';

describe('ConcluirRelacionComponent', () => {
  let component: ConcluirRelacionComponent;
  let fixture: ComponentFixture<ConcluirRelacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcluirRelacionComponent, HttpClientTestingModule,
        CommonModule,
        TituloComponent,
        ReactiveFormsModule,
        TablaDinamicaComponent,
        InputFechaComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConcluirRelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call concluirFormularioSubmit and fetch data for the table when the form is valid', () => {
    // Arrange
    const mockData = [
      { rfc: 'RFC123', denominacionORazonSocial: 'Empresa 1', norma: 'Norma 1', fechainciorelacion: '2025-01-01' },
    ];
    const concluirrelacionServiceSpy = jest.spyOn(component['concluirrelacionService'], 'obtenerTablerList').mockReturnValue({
      pipe: jest.fn().mockReturnValue({
        subscribe: jest.fn((callback) => callback(mockData)),
      }),
    } as any);
  
    component.concluirFormulario = component['fb'].group({
      rfc: ['RFC123', Validators.required],
      fechaInicial: [{ value: '2025-01-01', disabled: true }],
      fechaFinal: [{ value: '2025-12-31', disabled: true }],
    });
  
    // Act
    component.concluirFormularioSubmit();
  
    // Assert
    expect(concluirrelacionServiceSpy).toHaveBeenCalledWith('concluir-relacion-Tablea.json');
    expect(component.datosTabla).toEqual(mockData);
  });
});
