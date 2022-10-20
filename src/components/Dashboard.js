import { useParams } from 'react-router-dom';
// semantic ui imports
import { Container, Divider } from 'semantic-ui-react';
import AddFolder from './AddFolder';
import AddFile from './AddFile';
import Navbar from './Navbar';
import { useFolder } from '../hooks/useFolder';
import Folder from './Folder';
import FolderBreadcrumbs from './FolderBreadcrumbs';
import File from './File';

const Dashboard = () => {
  // getting folderId param from url
  const { folderId } = useParams();
  // getting folder, childFolders from useFolder hook
  const { folder, childFolders, childFiles } = useFolder(folderId);

  return (
    <>
      <Navbar />
      <Container>
        {/* breadcrumbs */}
        <FolderBreadcrumbs currentFolder={folder} />

        <AddFolder currentFolder={folder} />
        <AddFile currentFolder={folder} />

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

        {childFolders.length > 0 && childFiles.length > 0 && <Divider />}
        {/* if childFiles exists, render files */}
        {childFiles.length > 0 && (
          <div>
            {/* iterate over childFiles */}
            {childFiles.map((childFile) => (
              <div
                key={childFile.id}
                style={{
                  padding: '10px 0px 10px 0px',
                }}
              >
                <File file={childFile} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
