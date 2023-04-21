import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillDashboardPageComponent } from './pages/skill-dashboard-page/skill-dashboard-page.component';

const routes: Routes = [
  {
    path:"",
    children:[
      {
        path:"",
        component: SkillDashboardPageComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
