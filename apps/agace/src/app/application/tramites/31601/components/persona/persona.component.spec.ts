import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { PersonaComponent } from './persona.component';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { TituloComponent } from '@ng-mf/data-access-user';

class MockServiciosPantallaService {
  getPersonapara() {
    return of([
      {
        rfc: 'AAXX010101HNROZZA',
        curp: 'AAXX010101HNROZZA',
        nombre: 'John Doe',
        apellidoPaterno: 'Doe',
        apellidoMaterno: 'Smith',
      },
      {
        rfc: 'BBYY020202MCLGZZB',
        curp: 'BBYY020202MCLGZZB',
        nombre: 'Jane Smith',
        apellidoPaterno: 'Smith',
        apellidoMaterno: 'Johnson',
      },
    ]);
  }
}

fdescribe('PersonaComponent', () => {
  let component: PersonaComponent;
  let fixture: ComponentFixture<PersonaComponent>;
  let pantallaSvc: ServiciosPantallaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientModule,
        FormsModule,
        CommonModule,
        PersonaComponent,
        TituloComponent,
      ],
      providers: [
        {
          provide: ServiciosPantallaService,
          useClass: MockServiciosPantallaService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonaComponent);
    component = fixture.componentInstance;
    pantallaSvc = TestBed.inject(ServiciosPantallaService);
    fixture.detectChanges();
  });

  it('should create the PersonaComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and load personaparas on ngOnInit', () => {
    component.ngOnInit();

    expect(component.personaParas.length).toBe(2);
    expect(component.personaParas[0].nombre).toBe('John Doe');
    expect(component.personaParas[1].nombre).toBe('Jane Smith');
  });

  it('should toggle showContent', () => {
    expect(component.showContent).toBeFalsy(); 
    component.toggleContent();
    expect(component.showContent).toBe(true); 
    component.toggleContent();
    expect(component.showContent).toBeFalsy(); 
  });

  it('should call loadPersonas and update personaparas', () => {
    component.loadPersonas();

    expect(component.personaParas).toEqual([
      {
        rfc: 'AAXX010101HNROZZA',
        curp: 'AAXX010101HNROZZA',
        nombre: 'John Doe',
        apellidoPaterno: 'Doe',
        apellidoMaterno: 'Smith',
      },
      {
        rfc: 'BBYY020202MCLGZZB',
        curp: 'BBYY020202MCLGZZB',
        nombre: 'Jane Smith',
        apellidoPaterno: 'Smith',
        apellidoMaterno: 'Johnson',
      },
    ]);
  });

it('should call getPersonapara and assign data to personaparas when loadPersonas is called', () => {
  jest.spyOn(pantallaSvc, 'getPersonapara');
  component.loadPersonas();
  expect(pantallaSvc.getPersonapara).toHaveBeenCalledTimes(1);
  expect(component.personaParas.length).toBe(2);
  expect(component.personaParas[0].nombre).toBe('John Doe');
  expect(component.personaParas[1].nombre).toBe('Jane Smith');
});
});
