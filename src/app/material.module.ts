import { NgModule } from '@angular/core';
import { MatCardModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSelectModule,MatIconModule } from '@angular/material';

@NgModule({
imports: [MatCardModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatIconModule],
exports: [MatCardModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatIconModule]
})

export class MaterialModule {}