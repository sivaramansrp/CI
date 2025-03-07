import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppSolicitanteTabsComponent } from './app-solicitante-tabs.component';

describe('AppSolicitanteTabsComponent', () => {
  let component: AppSolicitanteTabsComponent;
  let fixture: ComponentFixture<AppSolicitanteTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSolicitanteTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppSolicitanteTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
