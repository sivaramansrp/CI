import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudPageComponent, HttpClientTestingModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            params: {},
            queryParams: {}
          }
        }
      }]

    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component.tituloMensaje).toBeDefined();
  });
});
