import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from '../providers/AuthProvider';
import Dashboard from './Dashboard';
import {
  ForgotPassword,
  Login,
  Signup,
  PrivateRoute,
  UpdateProfile,
  Profile,
} from './authentication';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/folder/:folderId"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            {/* user routes */}
            {/* private route */}
            <Route
              exact
              path="/user"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            {/* private route */}
            <Route
              exact
              path="/update-profile"
              element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              }
            />
            {/* auth routes */}
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
