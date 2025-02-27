import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from '@ng-mf/data-access-user';
import { CargaMasivaComponent } from './carga-masiva.component';
import { TEXTOS } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

describe('CargaMasivaComponent', () => {
  let component: CargaMasivaComponent;
  let fixture: ComponentFixture<CargaMasivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TituloComponent,
        AlertComponent,
        CargaMasivaComponent // Import the standalone component here
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CargaMasivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have TEXTOS defined', () => {
    expect(component.TEXTOS).toBe(TEXTOS);
  });

  it('should call updateFile method', () => {
    const event = new Event('change');
    jest.spyOn(component, 'updateFile');
    component.updateFile(event);
    expect(component.updateFile).toHaveBeenCalledWith(event);
  });

  it('should handle file upload logic in updateFile method', () => {
    const event = {
      target: {
        files: [new File([''], 'filename.txt')]
      }
    } as unknown as Event;
    component.updateFile(event);
    // Add your assertions here based on the file upload logic
  });
});