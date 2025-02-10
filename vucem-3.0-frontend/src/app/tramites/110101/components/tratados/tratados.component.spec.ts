// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { TratadosComponent } from './tratados.component';


// fdescribe('TratadosComponent', () => {
//   let component: TratadosComponent;
//   let fixture: ComponentFixture<TratadosComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [TratadosComponent]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TratadosComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should select values correctly', () => {
//     component.seleccionar({ id: 1, descripcion: 'CANADA' }, 0);
//     component.seleccionar({ id: 2, descripcion: 'Free Trade Agreement' }, 1);
//     component.seleccionar({ id: 3, descripcion: 'Preferential Origin' }, 2);
//     expect(component.selectedValues).toEqual({
//       pais: { id: 1, descripcion: 'CANADA' },
//       tratado: { id: 2, descripcion: 'Free Trade Agreement' },
//       origen: { id: 3, descripcion: 'Preferential Origin' }
//     });
//   });

//   it('should add tratado when all values are selected', () => {
//     component.selectedValues = {
//       pais: { id: 1, descripcion: 'CANADA' },
//       tratado: { id: 2, descripcion: 'Free Trade Agreement' },
//       origen: { id: 3, descripcion: 'Preferential Origin' }
//     };
//     component.agregarTratado();
//     expect(component.tableBody.length).toBe(1);
//   });

//   it('should not add tratado if values are missing', () => {
//     component.selectedValues = {
//       pais: { id: 1, descripcion: 'CANADA' },
//       tratado: { id: 2, descripcion: 'Free Trade Agreement' }
//     };
//     component.agregarTratado();
//     expect(component.tableBody.length).toBe(0);
//   });
// });





import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TratadosComponent } from './tratados.component';

fdescribe('TratadosComponent', () => {
  let component: TratadosComponent;
  let fixture: ComponentFixture<TratadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Move TratadosComponent to imports
      imports: [TratadosComponent] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TratadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select values correctly', () => {
    component.seleccionar({ id: 1, descripcion: 'CANADA' }, 0);
    component.seleccionar({ id: 2, descripcion: 'Free Trade Agreement' }, 1);
    component.seleccionar({ id: 3, descripcion: 'Preferential Origin' }, 2);
    expect(component.selectedValues).toEqual({
      pais: { id: 1, descripcion: 'CANADA' },
      tratado: { id: 2, descripcion: 'Free Trade Agreement' },
      origen: { id: 3, descripcion: 'Preferential Origin' }
    });
  });

  it('should add tratado when all values are selected', () => {
    component.selectedValues = {
      pais: { id: 1, descripcion: 'CANADA' },
      tratado: { id: 2, descripcion: 'Free Trade Agreement' },
      origen: { id: 3, descripcion: 'Preferential Origin' }
    };
    component.agregarTratado();
    expect(component.tableBody.length).toBe(1);
  });

  it('should not add tratado if values are missing', () => {
    component.selectedValues = {
      pais: { id: 1, descripcion: 'CANADA' },
      tratado: { id: 2, descripcion: 'Free Trade Agreement' }
    };
    component.agregarTratado();
    expect(component.tableBody.length).toBe(0);
  });
});
