// semantic ui imports
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ROOT_FOLDER } from '../hooks/useFolder';

const FolderBreadcrumbs = ({ currentFolder }) => {
  // if currentFolder is ROOT_FOLDER then path is empty, else start path with ROOT_FOLDER
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];

  // add currentFolder to path
  if (currentFolder) {
    path = [...path, ...currentFolder.path, currentFolder];
  }

  return (
    <div style={{ padding: '0px 0px 20px 0px' }}>
      <Breadcrumb size="large">
        {path.map((folder, index) => (
          <span key={folder.id}>
            <Breadcrumb.Section>
              <Link to={folder.id ? `/folder/${folder.id}` : '/'}>
                {folder.name}
              </Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
          </span>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default FolderBreadcrumbs;
