import { Component, DoCheck, OnInit } from '@angular/core';
import { GLOBAL } from './services/global';
import { UserService } from './services/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit{
  public title:string = 'MÓDULO DE TAREAS Ci2';
  public header_color: string;
  
  
  constructor(
    private _userService: UserService,
    private router: Router
   
  ){ 
    this.header_color = GLOBAL.header_color;
  }

  ngOnInit(){
    
  }

  logout(){
    localStorage.removeItem('email');
    this.router.navigate(['/home']);
  }
}
