import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Main, SignIn } from 'routing/pages';
import { PrivateRoute } from 'routing/components/PrivateRoute';
import { ParamsPreserver } from 'routing/components/ParamsPreserver';

export const Routing = () => (
  <Router>
    <ParamsPreserver />
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<PrivateRoute element={<Main />} />} />
    </Routes>
  </Router>
);
