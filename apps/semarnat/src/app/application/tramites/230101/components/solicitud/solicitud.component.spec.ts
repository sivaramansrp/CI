import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudComponent } from './solicitud.component';
import { ReplaySubject, Subject } from 'rxjs';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      imports: [ReactiveFormsModule], // Import ReactiveFormsModule for FormControl
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize default values correctly', () => {
    expect(component.disponsibleAduanaCheckboxes).toBeTruthy();
    expect(component.TEXTOS).toBeTruthy();
    expect(component.mercanicias).toBeTruthy();
    expect(component.detalle).toBeTruthy();
    expect(component.selectRangoDias).toEqual(component.crosListAduanas);
  });

  it('should initialize form controls correctly', () => {
    expect(component.fecha).toBeDefined();
    expect(component.fecha.value).toBe('');
    expect(component.fechaSeleccionada).toBeDefined();
    expect(component.fechaSeleccionada.value).toBe('');
  });

  it('should clean up resources on destroy', () => {
  
    const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});
