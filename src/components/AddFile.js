import { useState } from 'react';
// semantic ui imports
import {
  Button,
  Form,
  Icon,
  Modal,
  Header,
  Message,
  Progress,
} from 'semantic-ui-react';
import { v4 as uuidV4 } from 'uuid';
import { storage, database } from '../configs/firebase';
import { useAuth } from '../providers/AuthProvider';
import { ROOT_FOLDER } from '../hooks/useFolder';
import ReactDOM from 'react-dom';

const AddFile = ({ currentFolder }) => {
  // hooks
  const [open, setOpen] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState([]);

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
    const file = e.target.files[0];

    if (currentFolder === null || file === null) {
      return;
    }

    // setting up progress bar
    const id = uuidV4(); // generates unique id
    setUploadingFiles((prevUploadingFiles) => [
      // all previous files
      ...prevUploadingFiles,
      // new file
      { id: id, name: file.name, progress: 0, error: false },
    ]);

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join('/')}/${file.name}`
        : `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`;

    // save file to firebase storage
    const uploadFile = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file);

    // when upload happens
    uploadFile.on(
      'state_changed',
      (snapshot) => {
        // getting progress in percent
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        // updating progress bar
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress };
            }

            return uploadFile;
          });
        });
      },
      // handle errors
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile === id) {
              return { ...uploadFile, error: true };
            }

            return uploadFile;
          });
        });
      },
      () => {
        // remove progress bar when upload completes
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.filter((uploadFile) => {
            return uploadFile.id !== id;
          });
        });

        uploadFile.snapshot.ref.getDownloadURL().then((url) => {
          // check if file exists already
          database.files
            .where('name', '==', file.name)
            .where('userId', '==', currentUser.uid)
            .where('folderId', '==', currentFolder.id)
            .get()
            .then((existingFiles) => {
              const existingFile = existingFiles.docs[0];

              // if file already exists
              if (existingFile) {
                existingFile.ref.update({ url: url });
              } else {
                // add files to firestore
                database.files.add({
                  url: url,
                  name: file.name,
                  createdAt: database.getCurrentTimestamp,
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                });
              }
            });
        });
      }
    );

    closeModal();
  };

  return (
    <>
      <Button secondary inverted onClick={openModal} animated="fade">
        <Button.Content visible>Add File</Button.Content>
        <Button.Content hidden>
          <Icon name="file" />
        </Button.Content>
      </Button>
      <Modal basic open={open} size="small">
        <Header icon>
          <Icon name="file" />
          Add File
        </Header>
        <Modal.Content>
          <Form id="add-file-form">
            <Form.Field>
              <input type="file" required onChange={handleSubmit} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Close
          </Button>
        </Modal.Actions>
      </Modal>

      {/* creating progress bar */}
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '25%',
              width: '50%',
            }}
          >
            {uploadingFiles.map((file) => (
              <Message key={file.id} color="teal">
                <Message.Header>Uploading {file.name}</Message.Header>
                <p>
                  {file.error && <Progress error />}
                  <Progress
                    percent={file.progress * 100}
                    progress
                    color="black"
                    indicating
                  />
                </p>
              </Message>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default AddFile;
