import { NgModule } from '@angular/core';
import { MatCardModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSelectModule } from '@angular/material';

@NgModule({
imports: [MatCardModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSelectModule],
exports: [MatCardModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatSelectModule]
})

export class MaterialModule {}