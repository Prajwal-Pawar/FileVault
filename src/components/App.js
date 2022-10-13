import AuthProvider from '../providers/AuthProvider';
import Signup from './Signup';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Signup />
      </AuthProvider>
    </div>
  );
}

export default App;
