  import { ComponentFixture, TestBed } from '@angular/core/testing';
  import { FederatariosYPlantasVistaComponent } from './federatarios-y-plantas-vista.component';
  import { ActivatedRoute } from '@angular/router';
  import { HttpClientTestingModule } from '@angular/common/http/testing';
  import { Tramite80101Query } from '../../estados/tramite80101.query';
  import { of } from 'rxjs';
  import { Tramite80101Store } from '../../estados/tramite80101.store';
  import { NO_ERRORS_SCHEMA } from '@angular/core';
  import { FederatariosYPlantasComponent } from '../../../../shared/components/federatarios-y-planta/federatarios-y-plantas.component';

  describe('FederatariosYPlantasVistaComponent', () => {
    let component: FederatariosYPlantasVistaComponent;
    let fixture: ComponentFixture<FederatariosYPlantasVistaComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FederatariosYPlantasVistaComponent, FederatariosYPlantasComponent, HttpClientTestingModule],
        providers: [
          { provide: ActivatedRoute, useValue: {} },
          {
            provide: Tramite80101Query,
            useValue: {
              selectDatosFederatarios$: of([]),
            },
          },
          {
            provide: Tramite80101Store,
            useValue: {
              setFederatarios: jest.fn(),
            },
          },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(FederatariosYPlantasVistaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
