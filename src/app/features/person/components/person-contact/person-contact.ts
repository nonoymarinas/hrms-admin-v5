import { Component,Input  } from '@angular/core';
import { ManualInput } from '../../../../shared/ui/inputs/manual-input/manual-input';
import { ViewItem } from '../../../../shared/ui/view/view-item/view-item';
import { ButtonType01 } from "../../../../shared/ui/button/button-type-01/button-type-01";


@Component({
  selector: 'app-person-contact',
  standalone: true,
  imports: [ManualInput, ViewItem, ButtonType01],
  templateUrl: './person-contact.html',
  styleUrl: './person-contact.scss',
})
export class PersonContact {
   @Input() isEditMode = true;
}
