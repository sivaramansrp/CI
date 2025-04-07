
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BusquedaFolioComponent } from './busqueda-folio.component';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import { FormBuilder } from '@angular/forms';

@Injectable()
class MockServicioDeMensajesService {
  establecerDatosDePermiso(): void {
    // Mock implementation of establecerDatosDePermiso
  }
}



describe('BusquedaFolioComponent', () => {
  let fixture: ComponentFixture<BusquedaFolioComponent>;
  let component: BusquedaFolioComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        BusquedaFolioComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ServicioDeMensajesService, useClass: MockServicioDeMensajesService },
        FormBuilder
      ]
    }).overrideComponent(BusquedaFolioComponent, {

    }).compileComponents();
    
    fixture = TestBed.createComponent(BusquedaFolioComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

});