import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { AnimatedTitleComponent } from './components/animated-title/animated-title.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MapleLeafComponent } from './components/maple-leaf/maple-leaf.component';
import { PercentageCardComponent } from './components/percentage-card/percentage-card.component';
import { PercentageCardContainerComponent } from './components/percentage-card-container/percentage-card-container.component';
import { PickColorComponent } from './components/pick-color/pick-color.component';
import { SkillInputCardComponent } from './components/skill-input-card/skill-input-card.component';
import { SkillsPageComponent } from './pages/skills-page/skills-page.component';
import { SkillDashboardPageComponent } from './pages/skill-dashboard-page/skill-dashboard-page.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AnimatedTitleComponent,
    FooterComponent,
    HeaderComponent,
    MapleLeafComponent,
    PercentageCardComponent,
    PercentageCardContainerComponent,
    PickColorComponent,
    SkillInputCardComponent,
    SkillsPageComponent,
    SkillDashboardPageComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class CoreModule { }
