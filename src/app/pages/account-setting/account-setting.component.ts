import { Component, OnInit } from '@angular/core';
import { elements } from 'chart.js';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: [
  ]
})
export class AccountSettingComponent implements OnInit{

  constructor( private settingService: SettingsService ){}
    
  ngOnInit(): void {
    this.settingService.checkCurrentTheme();
  }

  changeTheme(theme: string){
    this.settingService.changeTheme(theme);
  }
}
