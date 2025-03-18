import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { CommonModule } from '@angular/common';
import { AlertComponent, AnexarDocumentosComponent, TituloComponent } from '@ng-mf/data-access-user';
import { TEXTOS } from '@ng-mf/data-access-user';

describe('PasoDosComponent Integration', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        PasoDosComponent
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component with real dependencies', () => {
    expect(component).toBeTruthy();
  });

  it('should properly initialize TEXTOS from the imported constant', () => {
    expect(component.TEXTOS).toBe(TEXTOS);
  });

  it('should pass the correct TEXTOS.INSTRUCCIONES to the AlertComponent', () => {
    // You may need to use debugElement to find the AlertComponent instance
    const alertDe = fixture.debugElement.query(de => de.componentInstance instanceof AlertComponent);
    const alertComponent = alertDe.componentInstance;
    expect(alertComponent.CONTENIDO).toBe(TEXTOS.INSTRUCCIONES);
  });

  it('should render all child components', () => {
    const componentHTML = fixture.nativeElement.innerHTML;
    expect(componentHTML).toContain('ng-titulo');
    expect(componentHTML).toContain('ng-alert');
    expect(componentHTML).toContain('anexar-documentos');
  });
});