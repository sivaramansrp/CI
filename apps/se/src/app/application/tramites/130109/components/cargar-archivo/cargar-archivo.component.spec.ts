import { TestBed } from '@angular/core/testing';
import { CargarArchivoComponent } from './cargar-archivo.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('CargarArchivoComponent', () => {
  let component: CargarArchivoComponent;
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, TituloComponent],
      providers: [Location],
    }).compileComponents();

    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    component = new CargarArchivoComponent(location, router);
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería navegar a la ruta correcta cuando se llama a navegar', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.navegar();
    expect(navigateSpy).toHaveBeenCalledWith([
      '/pago/importacion/vehiculos-usados-adaptados'
    ], { queryParams: { indice: 2 } });
  });
});