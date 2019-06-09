import { Component, OnInit } from '@angular/core';
import { Router,Routes, RouterLink } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Health And Advisors',  icon: 'pe-7s-note2', class: '' },
    { path: '/chat', title: 'NGO Government and Services',  icon:'pe-7s-note2', class: ''},
    { path: '/jobs', title: 'Chat',  icon:'pe-7s-note2', class: '' },
    { path: '/scheduling', title: 'Scheduling an Appointment',  icon:'pe-7s-note2', class: '' },
    { path: '/appointment', title: 'Appointment Dates',  icon:'pe-7s-note2', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  showSidebarItems:any=true;

  constructor(private router:Router) { 
    this.showSidebarItems=localStorage.getItem("showAdminItems");
  }

  logoutUser(){
      localStorage.clear();
      this.router.navigate(["login"]);
  }
  ngOnInit() {
  }

  isSideBaristrue(){
    if(this.showSidebarItems=="true"){
      return true;
    }
    return false;

  }

  isSideBarisfalse(){
    if(this.showSidebarItems=="false"){
      return true;
    }
    return false;

  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
