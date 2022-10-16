// semantic ui imports
import { Container } from 'semantic-ui-react';
import AddFolder from './AddFolder';
import Navbar from './Navbar';
import { useFolder } from '../hooks/useFolder';

const Dashboard = () => {
  // getting folder from useFolder hook
  const { folder } = useFolder('CgZDWBK4gHVc1RVBWWUB');
  console.log(folder);

  return (
    <>
      <Navbar />
      <Container>
        <AddFolder currentFolder={folder} />
      </Container>
    </>
  );
};

export default Dashboard;
