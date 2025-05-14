import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitanteService } from '@ng-mf/data-access-user';
describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [SolicitanteComponent, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [SolicitanteService],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
