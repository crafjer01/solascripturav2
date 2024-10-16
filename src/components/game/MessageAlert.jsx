import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const MessageAlert = ({ message, setOpenMessage, openMessage, currentParticipant }) => {
    const {title, description  } = message;
  const handleClose = () => {
    setOpenMessage(false);
  };

  return (
    <>
      <Dialog
        open={openMessage}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            { title }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { description } 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
