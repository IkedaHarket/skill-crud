import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuHeaderService } from 'src/app/core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  showResponsiveMenu: boolean = false;

  constructor(
    private readonly router: Router,
    public readonly menu : MenuHeaderService
  ){}

  toggleShowResponsiveMenu(){
    this.showResponsiveMenu = !this.showResponsiveMenu;
  }

}
