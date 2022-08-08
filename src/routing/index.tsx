import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Main, SignIn } from 'routing/pages';
import { PrivateRoute } from 'routing/components/PrivateRoute';

export const Routing = () => (
  <Router>
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<PrivateRoute element={<Main />} />} />
    </Routes>
  </Router>
);
