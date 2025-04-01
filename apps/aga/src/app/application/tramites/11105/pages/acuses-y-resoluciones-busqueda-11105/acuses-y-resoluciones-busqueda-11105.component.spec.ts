import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AcusesYResolucionesBusqueda11105Component } from './acuses-y-resoluciones-busqueda-11105.component';
import { AcusesYResoluionesFolioDelTramiteBusquedaComponent } from '@libs/shared/data-access-user/src';

describe('AcusesYResolucionesBusqueda11105Component', () => {
  let component: AcusesYResolucionesBusqueda11105Component;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        AcusesYResoluionesFolioDelTramiteBusquedaComponent,
        AcusesYResolucionesBusqueda11105Component
      ],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(AcusesYResolucionesBusqueda11105Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined constructor', () => {
    expect(component).toBeDefined();
  });
});