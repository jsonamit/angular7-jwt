import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { GeneralService } from '../../services/general.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userToken:Observable<any>;
  userDetail: User;
  
  constructor(
  	private _authService: AuthService,
  	private router: Router,
  	private _generalService: GeneralService
  ) { }

  
  ngOnInit() {
	  this._authService.userToken.subscribe(x => this.userToken = x);
	  this.getUserDetail();
  }
  
  getUserDetail() {
	  this._generalService.get('user')
	  	.subscribe(response => {
		  this.userDetail = response;
	  });   
  }
  
  onLogout() {
  	this._authService.logout();
  	this.router.navigate(['/login']);
  	
  }
  
  onCheck() {
        console.log(this.userToken);
  }

}