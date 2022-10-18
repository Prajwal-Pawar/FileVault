import { Link } from 'react-router-dom';
// semantic ui imports
import { Button, Icon } from 'semantic-ui-react';

const Folder = ({ folder }) => {
  return (
    <Link to={`/folder/${folder.id}`}>
      <Button primary inverted>
        <Icon name="folder" />
        {folder.name}
      </Button>
    </Link>
  );
};

export default Folder;
