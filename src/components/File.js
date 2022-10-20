// semantic ui imports
import { Button, Icon } from 'semantic-ui-react';

const File = ({ file }) => {
  return (
    <a href={file.url}>
      <Button secondary inverted>
        <Icon name="file" />
        {file.name}
      </Button>
    </a>
  );
};

export default File;
