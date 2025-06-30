import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasoUnoComponent } from './paso-uno.component';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('PasoUnoComponent', () => {
  let fixture: ComponentFixture<PasoUnoComponent>;
  let component: PasoUnoComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, PasoUnoComponent],
      providers: [provideHttpClient()]
    }).overrideComponent(PasoUnoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngAfterViewInit()', async () => {
    component.ngAfterViewInit();
  });

  it('should call fetchGetDatosConsulta and update store on success', () => {
    const mockRespuesta = {
      success: true,
      datos: {
        regimen_0: 'r0',
        regimen_2: 'r2',
        manifiesto: 'man'
      }
    };
    component.solicitudService = {
      getDatosConsulta: jest.fn().mockReturnValue(of(mockRespuesta))
    } as any;
    component.tramite32201Store = {
      setRegimen_0: jest.fn(),
      setRegimen_2: jest.fn(),
      setManifiesto: jest.fn()
    } as any;

    component.fetchGetDatosConsulta();

    expect(component.solicitudService.getDatosConsulta).toHaveBeenCalled();
    expect(component.tramite32201Store.setRegimen_0).toHaveBeenCalledWith('r0');
    expect(component.tramite32201Store.setRegimen_2).toHaveBeenCalledWith('r2');
    expect(component.tramite32201Store.setManifiesto).toHaveBeenCalledWith('man');
  });
});