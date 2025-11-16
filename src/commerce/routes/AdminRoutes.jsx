import { Routes, Route } from 'react-router-dom';
import { AdminPanelPage, ProductEdit, ProductForm, ProductList } from '../';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminPanelPage />}>
        <Route index element={<h3>Seleccioná una acción del panel</h3>} />
        <Route path="add" element={<ProductForm />} />
        <Route path="list" element={<ProductList />} />
        <Route path="edit/:id" element={<ProductEdit />} />
        <Route path="*" element={<p>Página no encontrada</p>} />
      </Route>
    </Routes>
  );
};
