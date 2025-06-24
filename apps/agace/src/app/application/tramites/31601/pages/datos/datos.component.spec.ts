import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatosComponent } from './datos.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import {NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,SolicitanteComponent,require('@angular/common/http/testing').HttpClientTestingModule],
      declarations: [DatosComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: []
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener el índice inicial en 1', () => {
    expect(component.indice).toBe(1);
  });
});

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { DatosComponent } from './datos.component';
// import { SolicitanteComponent } from '@ng-mf/data-access-user';
// import { of, Subject } from 'rxjs';

// describe('DatosComponent', () => {
//   let component: DatosComponent;
//   let fixture: ComponentFixture<DatosComponent>;
//   let consultaQueryMock: any;
//   let solocitud31601ServiceMock: any;

//   beforeEach(async () => {
//     consultaQueryMock = {
//       selectConsultaioState$: new Subject<any>(),
//     };
//     solocitud31601ServiceMock = {
//       getRegistroTomaMuestrasMercanciasData: jest.fn(),
//       actualizarEstadoFormulario: jest.fn(),
//     };

//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, SolicitanteComponent],
//       declarations: [DatosComponent],
//       providers: [
//         { provide: 'ConsultaioQuery', useValue: consultaQueryMock },
//         { provide: 'Solocitud31601Service', useValue: solocitud31601ServiceMock },
//       ],
//     })
//       .overrideComponent(DatosComponent, {
//         set: {
//           providers: [
//             { provide: 'ConsultaioQuery', useValue: consultaQueryMock },
//             { provide: 'Solocitud31601Service', useValue: solocitud31601ServiceMock },
//           ],
//         },
//       })
//       .compileComponents();

//     fixture = TestBed.createComponent(DatosComponent);
//     // Emit a value BEFORE detectChanges (which triggers ngOnInit)
//     consultaQueryMock.selectConsultaioState$.next({ update: false });
//     component = fixture.componentInstance;
//     (component as any).consultaQuery = consultaQueryMock;
//     (component as any).solocitud31601Service = solocitud31601ServiceMock;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//      fixture.detectChanges();
//   });

//   it('should set indice when seleccionaTab is called', () => {
//     component.seleccionaTab(2);
//     expect(component.indice).toBe(2);
//   });

//   it('should set esDatosRespuesta to true if consultaState.update is false in ngOnInit', () => {
//     // Already emitted { update: false } in beforeEach, so just call ngOnInit again
//     component.ngOnInit();
//     expect(component.esDatosRespuesta).toBe(true);
//   });

//   it('should call guardarDatosFormulario if consultaState.update is true in ngOnInit', () => {
//     const spy = jest.spyOn(component, 'guardarDatosFormulario').mockImplementation(() => {});
//     // Emit { update: true } before ngOnInit
//     consultaQueryMock.selectConsultaioState$.next({ update: true });
//     component.ngOnInit();
//     expect(spy).toHaveBeenCalled();
//   });

//   it('guardarDatosFormulario should set esDatosRespuesta and call actualizarEstadoFormulario', () => {
//     const resp = { foo: 'bar' };
//     solocitud31601ServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(resp));
//     component.guardarDatosFormulario();
//     expect(component.esDatosRespuesta).toBe(true);
//     expect(solocitud31601ServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith(resp);
//   });

//   it('guardarDatosFormulario should not call actualizarEstadoFormulario if resp is falsy', () => {
//     solocitud31601ServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
//     component.guardarDatosFormulario();
//     expect(solocitud31601ServiceMock.actualizarEstadoFormulario).not.toHaveBeenCalled();
//   });

//   it('ngAfterViewInit should call obtenerTipoPersona on solicitante if present', () => {
//     component.solicitante = { obtenerTipoPersona: jest.fn() } as any;
//     component.ngAfterViewInit();
//     expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalled();
//   });

//   it('ngAfterViewInit should not throw if solicitante is undefined', () => {
//     component.solicitante = undefined as any;
//     expect(() => component.ngAfterViewInit()).not.toThrow();
//   });

//   it('should clean up destroyNotifier$ on ngOnDestroy', () => {
//     const destroyed$ = (component as any).destroyNotifier$;
//     const nextSpy = jest.spyOn(destroyed$, 'next');
//     const completeSpy = jest.spyOn(destroyed$, 'complete');
//     component.ngOnDestroy();
//     expect(nextSpy).toHaveBeenCalled();
//     expect(completeSpy).toHaveBeenCalled();
//   });
// });