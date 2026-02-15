import { Component, Input } from '@angular/core';
import { ManualInputDark } from "../../../../shared/ui/inputs/manual-input-dark/manual-input-dark";
import { SelectInputDark } from '../../../../shared/ui/inputs/select-input-dark/select-input-dark';

@Component({
  selector: 'app-person-basic',
  imports: [SelectInputDark, ManualInputDark],
  templateUrl: './person-basic.html',
  styleUrl: './person-basic.scss',
})
export class PersonBasic {
@Input() isEditMode: boolean = false;
}
