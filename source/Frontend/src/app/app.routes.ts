import { Routes }                                           from '@angular/router';
import { AdminComponent }                                   from './admin/admin.component';
import { CreateArtworkComponent }                           from './admin/pages/artworks/create-artwork/create-artwork.component';
import { GetArtworksComponent as AdminArtworksComponent }   from './admin/pages/artworks/get-artworks/get-artworks.component';
import { GetOrdersComponent }                               from './admin/pages/orders/get-orders/get-orders.component';
import { EditOrderComponent }                               from './admin/pages/orders/edit-order/edit-order.component';
import { UpdateArtworkComponent }                           from './admin/pages/artworks/update-artwork/update-artwork.component';
import { AuthGuard }                                        from './utils/auth.guard';
import { IndexComponent }                                   from './pages/index/index.component';
import { ContactsComponent }                                from './pages/contacts/contacts.component';
import { ArtworkDetailsComponent }                          from './pages/artworks/artwork-details/artwork-details.component';
import { GetArtworksComponent as ArtworksComponent }        from './pages/artworks/get-artworks/get-artworks.component';
import { OrderComponent }                                   from './pages/order/order.component';
import { LoginComponent }                                   from './pages/login/login.component';

export const routes: Routes = [
    { path: "",                             component: IndexComponent },
    { path: "admin",                        component: AdminComponent, canActivate: [AuthGuard],
        children: [
            { path: "",                     component: GetOrdersComponent },
            { path: "artworks",             component: AdminArtworksComponent },
            { path: "artworks/create",      component: CreateArtworkComponent },
            { path: "artworks/edit/:id",    component: UpdateArtworkComponent },
            { path: "orders",               component: GetOrdersComponent },
            { path: "orders/edit/:id",      component: EditOrderComponent },
        ]
    },
    { path: "artworks/all",                 component: ArtworksComponent},
    { path: "artworks/details/:id",         component: ArtworkDetailsComponent },
    { path: "contacts",                     component: ContactsComponent },
    { path: "login",                        component: LoginComponent },
    { path: "order",                        component: OrderComponent }
];
