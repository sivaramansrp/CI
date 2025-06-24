import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  WizardComponent,
  BtnContinuarComponent,
  SolicitanteComponent,
} from '@ng-mf/data-access-user';
import { PantallasComponent } from './pantallas.component';
import { DatosComponent } from '../datos/datos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PantallasComponent', () => {
  let component: PantallasComponent;
  let fixture: ComponentFixture<PantallasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WizardComponent,
        BtnContinuarComponent,
        HttpClientTestingModule,
        SolicitanteComponent,
      ],
      declarations: [PantallasComponent, DatosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PantallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update title and call wizardComponent methods on getValorIndice', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;
  });
});
