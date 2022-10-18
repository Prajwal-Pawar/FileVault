import { useParams } from 'react-router-dom';
// semantic ui imports
import { Container } from 'semantic-ui-react';
import AddFolder from './AddFolder';
import Navbar from './Navbar';
import { useFolder } from '../hooks/useFolder';
import Folder from './Folder';
import FolderBreadcrumbs from './FolderBreadcrumbs';

const Dashboard = () => {
  // getting folderId param from url
  const { folderId } = useParams();
  // getting folder, childFolders from useFolder hook
  const { folder, childFolders } = useFolder(folderId);

  return (
    <>
      <Navbar />
      <Container>
        {/* breadcrumbs */}
        <FolderBreadcrumbs currentFolder={folder} />

        <AddFolder currentFolder={folder} />

        {/* if childFolders exists, render folder */}
        {childFolders.length > 0 && (
          <div>
            {/* iterate over childFolders */}
            {childFolders.map((childFolder) => (
              <div
                key={childFolder.id}
                style={{
                  display: 'inline-block',
                  padding: '20px 10px 10px 0px',
                }}
              >
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
