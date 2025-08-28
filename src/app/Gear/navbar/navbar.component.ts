import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MainService } from '../../Services/main.service';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule, RouterModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public nav:Router,public eRef:ElementRef,public service:MainService,public router:Router){
  
  }
  search=false;
 isToggle=false;
 searchToggle(){
  if (!this.search){
    this.search=!this.search
    this.service.searchInput=''
  }
  else{
    this.service.searchHandler()
    this.search=!this.search
  }
 

 }

   @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    
    
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.search = false;
      
    }
  }
  onLogout(){
    this.service.deleteJwtKey();
    this.router.navigate(["/"])
  }
//  onChange(){
//   this.nav.navigate(["/main/search"]);
//  }

}
