import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';



describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TituloComponent,SolicitanteComponent, HttpClientTestingModule],
      declarations: [PasoUnoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  // Add more test cases as needed
});