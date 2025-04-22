import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { HttpClientModule } from '@angular/common/http';
import { RevisionDocumentalComponent } from '../../components/revision-documental/revision-documental.component';
import { SolicitudComponent } from '../../components/solicitud/solicitud.component';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [
        SolicitanteComponent,
        HttpClientModule,
        SolicitudComponent,
        RevisionDocumentalComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
