import UsersManager from '../components/Admin/UsersManager';
import LocationsManager from '../components/Admin/LocationsManager';

export default function Admin() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Painel Administrativo</h1>
      <UsersManager />
      <LocationsManager />
    </div>
  );
}
