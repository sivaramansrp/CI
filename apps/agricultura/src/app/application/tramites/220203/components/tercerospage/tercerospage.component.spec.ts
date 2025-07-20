import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TercerospageComponent } from './tercerospage.component';
import { ConsultaioQuery, PersonaTerceros, TercerosComponent } from '@ng-mf/data-access-user';
import { AcuiculturaQuery } from '../../estados/sanidad-certificado.query';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';

describe('TercerospageComponent', () => {
  let component: TercerospageComponent;
  let fixture: ComponentFixture<TercerospageComponent>;

  const destroy$ = new Subject<void>();

  const mockConsultaQuery = {
    selectConsultaioState$: of({ readonly: true })
  };

  const mockAcuiculturaQuery = {
    seleccionarTercerosRelacionados$: of([
      { nombre: 'John Doe', correo: 'john.doe@example.com', tipo: 'Representante' } as PersonaTerceros
    ])
  };

  const mockImportacionDeAcuiculturaService = {
    updateTercerosRelacionados: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, TercerosComponent, TercerospageComponent],
      providers: [
        { provide: ConsultaioQuery, useValue: mockConsultaQuery },
        { provide: AcuiculturaQuery, useValue: mockAcuiculturaQuery },
        { provide: ImportacionDeAcuiculturaService, useValue: mockImportacionDeAcuiculturaService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TercerospageComponent);
    component = fixture.componentInstance;
  });
  it('should call updateTercerosRelacionados on onPersonasChanged', () => {
    const newPersonas: PersonaTerceros[] = [
      { nombre: 'Bob', correo: 'bob@example.com' }
    ];

    component.onPersonasChanged(newPersonas);

    expect(mockImportacionDeAcuiculturaService.updateTercerosRelacionados).toHaveBeenCalledWith(newPersonas);
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
  it('should update esFormularioSoloLectura based on selectConsultaioState$', fakeAsync(() => {
    const consultaQuery = TestBed.inject(ConsultaioQuery) as any;
    consultaQuery.selectConsultaioState$ = of({ readonly: false });
    component.ngOnInit();
    tick();
    expect(component.esFormularioSoloLectura).toBe(false);
  }));

  it('should update personas when seleccionarTercerosRelacionados$ emits', fakeAsync(() => {
    const acuiculturaQuery = TestBed.inject(AcuiculturaQuery) as any;
    const personasMock: PersonaTerceros[] = [
      { nombre: 'Alice', correo: 'alice@example.com' }
    ];
    acuiculturaQuery.seleccionarTercerosRelacionados$ = of(personasMock);
    component.ngAfterViewInit();
    tick();
    expect(component.personas).toEqual(personasMock);
  }));

  it('should not update personas if seleccionarTercerosRelacionados$ emits undefined', fakeAsync(() => {
    component.personas = [{ nombre: 'Initial', correo: 'init@example.com' }];
    const acuiculturaQuery = TestBed.inject(AcuiculturaQuery) as any;
    acuiculturaQuery.seleccionarTercerosRelacionados$ = of(undefined);
    component.ngAfterViewInit();
    tick();
    expect(component.personas).toEqual([{ nombre: 'Initial', correo: 'init@example.com' }]);
  }));

  it('should call updateTercerosRelacionados with empty array', () => {
    component.onPersonasChanged([]);
    expect(mockImportacionDeAcuiculturaService.updateTercerosRelacionados).toHaveBeenCalledWith([]);
  });
});
