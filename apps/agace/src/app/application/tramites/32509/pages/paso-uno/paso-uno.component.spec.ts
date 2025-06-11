import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TipoDeAvisoComponent } from '../../components/tipo-de-aviso/tipo-de-aviso.component';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitanteComponent, TipoDeAvisoComponent, CommonModule, PasoUnoComponent, HttpClientModule], // Use imports instead of declarations
      declarations: [], // Use declarations instead of imports
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});