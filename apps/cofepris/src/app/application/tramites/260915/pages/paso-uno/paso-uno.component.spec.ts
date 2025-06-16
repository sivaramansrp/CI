import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { provideHttpClient } from '@angular/common/http';
import { SolicitanteService } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [SolicitanteComponent, TituloComponent],
      providers: [provideHttpClient(), SolicitanteService]
    }).compileComponents();
    
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.detectChanges(); // Trigger change detection again to avoid ExpressionChangedAfterItHasBeenCheckedError
  });

  it('should create', (done) => {
    setTimeout(() => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
      done();
    });
  });
});
