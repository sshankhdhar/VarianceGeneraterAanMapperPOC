import { NgModule } from '@angular/core';

import { MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatStepperModule,
  MatRadioModule,
  MatCardModule,
  MatTableModule,
  MatIconModule,
  MatProgressBarModule
} from '@angular/material';


const MaterialComponents=[
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatStepperModule,
  MatRadioModule,
  MatCardModule,
  MatTableModule,
  MatIconModule,
  MatProgressBarModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
