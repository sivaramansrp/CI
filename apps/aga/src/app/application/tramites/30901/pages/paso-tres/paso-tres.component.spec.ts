import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PasoTresComponent } from './paso-tres.component';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';

fdescribe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        PasoTresComponent,
        FirmaElectronicaComponent,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
         ToastrService,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigateSpy = router.navigate as jasmine.Spy;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "servicios-extraordinarios/acuse" when firma is valid', () => {
    const firma = 'valid-firma';
    component.obtieneFirma(firma);
    expect(navigateSpy).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('should not navigate when firma is empty', () => {
    const firma = '';
    component.obtieneFirma(firma);
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});