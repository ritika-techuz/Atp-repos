import Profile from './components/ProfilePage';
import ChangePassword from './components/ChangePassword';

export const AdminRoutes = [{
    path: 'profile',
    element: <Profile />
}, {
    path: 'change-password',
    element: <ChangePassword />
}]