import { Component } from '@angular/core';
import { IconScreenDashboard } from '../../../../shared/ui/icon/icon-screen-dashboard/icon-screen-dashboard';
import { IconScreenPerson } from '../../../../shared/ui/icon/icon-screen-person/icon-screen-person';
import { IconScreenRecords } from '../../../../shared/ui/icon/icon-screen-records/icon-screen-records';
import { IconScreenSettings } from '../../../../shared/ui/icon/icon-screen-settings/icon-screen-settings';
import { IconScreenAdmin } from '../../../../shared/ui/icon/icon-screen-admin/icon-screen-admin';
import { IconScreenProfile } from '../../../../shared/ui/icon/icon-screen-profile/icon-screen-profile';

@Component({
  selector: 'app-home-main',
  standalone: true,
  imports: [
    IconScreenDashboard,
    IconScreenPerson,
    IconScreenRecords,
    IconScreenSettings,
    IconScreenAdmin,
    IconScreenProfile,
  ],
  templateUrl: './home-main.html',
  styleUrl: './home-main.scss',
})
export class HomeMain {}
