import { Routes } from '@angular/router';
import { ReportPage } from './report-page/report-page';
import { StudentOverview } from './student-overview/student-overview';
import { PricingPage } from './pricing-page/pricing-page';

export const routes: Routes = [
    { path: '', redirectTo: '/students', pathMatch: 'full' },
    { path: 'students', component: StudentOverview },
    { path: 'reports', component: ReportPage },
    { path: 'pricing', component: PricingPage }
];
