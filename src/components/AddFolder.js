import { useState } from 'react';
// semantic ui imports
import { Button, Form, Icon, Modal, Header } from 'semantic-ui-react';
import { database } from '../configs/firebase';
import { useAuth } from '../providers/AuthProvider';
import { ROOT_FOLDER } from '../hooks/useFolder';

const AddFolder = ({ currentFolder }) => {
  // hooks
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  // get currentUser and logout from useAuth
  const { currentUser } = useAuth();

  // to open modal
  const openModal = () => {
    setOpen(true);
  };

  // to close modal
  const closeModal = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // cant create a folder, if we arent inside a folder
    if (currentFolder == null) {
      return;
    }

    // for breadcrumbs
    const path = [...currentFolder.path];

    if (currentFolder !== ROOT_FOLDER) {
      // add folder to path
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    //  create folder in firebase
    database.folders.add({
      name: name,
      userId: currentUser.uid,
      parentId: currentFolder.id,
      path: path,
      createdAt: database.getCurrentTimestamp,
    });

    setName('');
    closeModal();
  };

  return (
    <>
      <Button secondary inverted onClick={openModal} animated="fade">
        <Button.Content visible>Add Folder</Button.Content>
        <Button.Content hidden>
          <Icon name="folder" />
        </Button.Content>
      </Button>
      <Modal basic open={open} size="small">
        <Header icon>
          <Icon name="folder" />
          Add Folder
        </Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit} id="add-folder-form">
            <Form.Field>
              <input
                type="text"
                placeholder="Folder Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Close
          </Button>
          {/* form="add-folder-form" to submit form with id add-folder-form
          because button is outside the form */}
          <Button color="green" inverted type="submit" form="add-folder-form">
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default AddFolder;
