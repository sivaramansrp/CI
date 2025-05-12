import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPageComponent } from './solicitud-page.component';
import { AvisoImportacionSustanciasQuimicasModule } from '../../aviso-importacion-sustancias-quimicas.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SolicitudPageComponent', () => {
  let component: SolicitudPageComponent;
  let fixture: ComponentFixture<SolicitudPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudPageComponent],
      imports:[AvisoImportacionSustanciasQuimicasModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
