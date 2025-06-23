import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { PersonaComponent } from './persona.component';
// import { ServiciosPantallaService } from '../../../../core/services/31601/servicios-pantalla.service';
// import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { TituloComponent } from '@ng-mf/data-access-user';

class MockServiciosPantallaService {
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/explicit-function-return-type
  getPersonapara() {
    // Mock data with the correct structure
    return of([
      {
        RFC: 'AAXX010101HNROZZA',
        CURP: 'AAXX010101HNROZZA',
        Nombre: 'John Doe',
        Apellido_paterno: 'Doe',
        Apellido_materno: 'Smith',
      },
      {
        RFC: 'BBYY020202MCLGZZB',
        CURP: 'BBYY020202MCLGZZB',
        Nombre: 'Jane Smith',
        Apellido_paterno: 'Smith',
        Apellido_materno: 'Johnson',
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
    // Call ngOnInit directly or via fixture.detectChanges
    component.ngOnInit();

    // Expect the service's response to populate personaparas
    expect(component.personaParas.length).toBe(2);
    expect(component.personaParas[0].nombre).toBe('John Doe');
    expect(component.personaParas[1].nombre).toBe('Jane Smith');
  });

  it('should toggle showContent', () => {
    expect(component.showContent).toBeFalsy(); // Initially false
    component.toggleContent();
    expect(component.showContent).toBe(true); // After toggle, should be true
    component.toggleContent();
    expect(component.showContent).toBeFalsy(); // After another toggle, should be false
  });

  it('should call loadPersonas and update personaparas', () => {
    // Call loadPersonas manually
    component.loadPersonas();

    // Validate if the service response is correctly assigned to personaparas
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
    // Spy on the service method
    spyOn(pantallaSvc, 'getPersonapara').and.callThrough();

    // Call loadPersonas
    component.loadPersonas();

    // Ensure the service method is called once
    expect(pantallaSvc.getPersonapara).toHaveBeenCalledTimes(1);

    // Check if the personaparas data is correctly assigned
    expect(component.personaParas.length).toBe(2);
    expect(component.personaParas[0].nombre).toBe('John Doe');
    expect(component.personaParas[1].nombre).toBe('Jane Smith');
  });
});
