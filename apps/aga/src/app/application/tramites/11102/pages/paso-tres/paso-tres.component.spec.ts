import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnexarDocumentosComponent, FirmaElectronicaComponent, TramiteFolioService } from '@libs/shared/data-access-user/src';
import { PasoTresComponent } from './paso-tres.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
 
class MockTramiteFolioService {
 
}
 
describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[AnexarDocumentosComponent,FirmaElectronicaComponent,
        ToastrModule.forRoot()
      ],
      declarations: [PasoTresComponent],
      providers: [
        ToastrService,
        { provide: TramiteFolioService, useClass: MockTramiteFolioService }, // Provide the mock service
    ]
    })
    .compileComponents();
   
    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});