import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegistroPageComponent } from './pages/registro-page/registro-page.component';
import { TestPageComponent } from './pages/test-page/test-page.component';

export const ROUTES: Routes = [
    {
        path: 'registro',
        component: RegistroPageComponent,
        children: [
          { path: 'registro',
            component: RegistroPageComponent
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'registro',
          },
        ]
    },
    {
      path: 'test',
      component: TestPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})

export class DespachoMercanciasRoutingModule { }
