import React, { useEffect, useState } from "react";
import { Grow, Alert } from "@mui/material";
import {
  Button,
  DialogActions,
  DialogContent,
  ButtonGroup,
  Modal,
  ModalDialog,
  DialogTitle,
  Divider,
  Typography,
  Box,
  FormControl,
  FormLabel,
  Input,
  Chip,
  ChipDelete,
} from "@mui/joy";
import { Image, WarningRounded, Verified, Add } from "@mui/icons-material";
import { useAuth } from "../AuthContext";
import axios from "axios";
import "./css/style.css";
import { useNavigate } from "react-router-dom";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import LoadingBackdrop from "../LoadingSpinner";
import { Capitalize } from "../Display/DsiplayFunctions";

export default function StepContent() {
  return <div>StepContent</div>;
}
// STEP 1
//Basin info
export function Step1({ onNext, images, setImages }) {
  const { user } = useAuth();
  const userID = user.userID;
  const [alertOpen, setAlertOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(); // move next
  };
  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      const previewPic = URL.createObjectURL(file);
      if (e.target.name === "image1") {
        setImages((prevImages) => ({
          ...prevImages,
          image1: file,
          preview1: previewPic,
        }));
      } else if (e.target.name === "image2") {
        setImages((prevImages) => ({
          ...prevImages,
          image2: file,
          preview2: previewPic,
        }));
      }
    }
  }
  function handleDelete(image) {
    if (image === "image1") {
      setImages((prevImages) => ({
        ...prevImages,
        image1: null,
        preview1: "",
      }));
    } else if (image === "image2") {
      setImages((prevImages) => ({
        ...prevImages,
        image2: null,
        preview2: "",
      }));
    }
  }
  const [open, setOpen] = useState(false); // modal
  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <div className="step">
      <h1 className="step__title">
        Basic Information{" "}
        {user.userType === "Catcher" ? "Qualification skill" : "Tags"}
      </h1>
      {/*step 1 for input logic part is lacking where user input auto fill up */}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <div className="input-rows2">
            <label
              className="label2"
              style={{ marginTop: "20px" }}
              htmlFor="fileInput2"
            >
              Upload your image here
            </label>
            <p>Upload your identification card here</p>
          </div>
          <div className="input-rows2">
            <input
              type="file"
              id="fileInput1"
              name="image1"
              accept="image/*"
              onChange={handleImage}
              required
              style={{
                //  i set into display: none because i use label as htmlFor attribute
                display: "none",
              }}
            />
            {!images.preview1 ? (
              <label htmlFor="fileInput1" className="step__img__input">
                <Image />
                Choose Image File
              </label>
            ) : null}

            {images.preview1 && (
              <div className="image-preview">
                <img
                  src={images.preview1}
                  alt="Preview"
                  className="step2_img_preview"
                />
                <button
                  type="button"
                  onClick={() => handleDelete("image1")}
                  className="step2_img_preview_btn"
                >
                  X
                </button>
              </div>
            )}

            <input
              type="file"
              id="fileInput2"
              name="image2"
              accept="image/*"
              onChange={handleImage}
              required
              style={{
                //  i set into display: none because i use label as htmlFor attribute
                display: "none",
              }}
            />
            {!images.preview2 ? (
              <label htmlFor="fileInput2" className="step__img__input">
                <Image />
                Choose Image File
              </label>
            ) : null}

            {images.preview2 && (
              <div className="image-preview">
                <img
                  src={images.preview2}
                  alt="Preview"
                  className="step2_img_preview"
                />
                <button
                  type="button"
                  onClick={() => handleDelete("image2")}
                  className="step2_img_preview_btn"
                >
                  X
                </button>
              </div>
            )}
          </div>
          <div className="step__button">
            {alertOpen && (
              <Grow in={alertOpen} style={{ transformOrigin: "center" }}>
                <Alert
                  variant="filled"
                  severity="error"
                  className="step2__alert__error"
                  sx={{
                    fontWeight: "bold",
                  }}
                  onClose={() => setAlertOpen(false)}
                >
                  Please upload both images before submitting.
                </Alert>
              </Grow>
            )}
            <ButtonGroup aria-label="spacing button group">
              <Button
                variant="outlined"
                color="green"
                className="step2__nav__btn__sbmt"
                sx={{
                  // Custom color
                  backgroundColor: "",
                  "&:hover": {
                    backgroundColor: "#1A97DE", // Darker green on hover
                  },
                  margin: "20px",
                  padding: "10px",
                  width: "100px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor: "#1679ab",
                  color: "#fff",
                  border: "none",
                  fontSize: "13px",
                }}
                onClick={() => handleOpenModal()}
              >
                Next
              </Button>
              <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                  <DialogTitle>
                    <WarningRounded />
                    Confirmation
                  </DialogTitle>
                  <Divider />
                  <DialogContent>
                    Are you sure you want to submit this IDs?
                    {/* Display the current ID from state */}
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="solid"
                      color="primary"
                      onClick={onNext} // Upload the file if Yes
                    >
                      Yes
                    </Button>
                    <Button
                      variant="plain"
                      color="neutral"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                </ModalDialog>
              </Modal>
            </ButtonGroup>
          </div>
        </div>
      </form>
    </div>
  );
}
//STEP 2
// Upload Docu and ID
export function Step2({
  images,
  setImages,
  haveLicense,
  setHaveLicense,
  onNext,
  onPrev,
}) {
  const { user } = useAuth();
  const userID = user.userID;
  const [open, setOpen] = useState(false); // modal

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(); // move next
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const [alertOpen, setAlertOpen] = useState(false);
  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      const previewPic = URL.createObjectURL(file);
      if (e.target.name === "dr1") {
        setImages((prevImages) => ({
          ...prevImages,
          dr1: file,
          preview3: previewPic,
        }));
      } else if (e.target.name === "dr2") {
        setImages((prevImages) => ({
          ...prevImages,
          dr2: file,
          preview4: previewPic,
        }));
      } else if (e.target.name === "doc1") {
        setImages((prevImages) => ({
          ...prevImages,
          doc1: file,
          preview5: previewPic,
        }));
      } else if (e.target.name === "doc2") {
        setImages((prevImages) => ({
          ...prevImages,
          doc2: file,
          preview6: previewPic,
        }));
      }
    }
  }

  function handleDelete(image) {
    if (image === "dr1") {
      setImages((prevImages) => ({
        ...prevImages,
        dr1: null,
        preview3: "",
      }));
    } else if (image === "dr2") {
      setImages((prevImages) => ({
        ...prevImages,
        dr2: null,
        preview4: "",
      }));
    } else if (image === "doc1") {
      setImages((prevImages) => ({
        ...prevImages,
        doc1: null,
        preview5: "",
      }));
    } else if (image === "doc2") {
      setImages((prevImages) => ({
        ...prevImages,
        doc2: null,
        preview6: "",
      }));
    }
  }

  return (
    <div>
      <div className="step">
        <h1 className="step__title">Valid Documents</h1>
        <div className="form-group1">
          <form className="form-container" onSubmit={handleSubmit}>
            {user.userType === "Catcher" && (
              <>
                {" "}
                <div className="input-rows2">
                  <label>
                    Do you have A Driver's License? Or any certificates you want
                    to add?
                    <input
                      type="checkbox"
                      onClick={(e) => setHaveLicense(e.target.checked)}
                    />
                    YES
                  </label>
                  <label>If No, You can skip this part!</label>
                </div>
                {/* UPLOAD LICESNE IF USER HAVE IT */}
                {/* Upload license section if the user has a license */}
                {haveLicense && (
                  <>
                    <div className="input-rows2">
                      <label className="label2" htmlFor="fileInput">
                        Please upload your Driver's License here:
                      </label>
                    </div>

                    <div className="input-rows2">
                      <input
                        type="file"
                        name="dr1"
                        id="fileInput1"
                        onChange={handleImage}
                        accept="image/*"
                        style={{
                          display: "none", // Hide the input
                        }}
                      />

                      {!images.dr1 ? (
                        <label
                          htmlFor="fileInput1"
                          className="step__img__input"
                        >
                          <Image />
                          <span>Choose Image File</span>
                        </label>
                      ) : null}

                      {/* Preview the uploaded driver’s license */}
                      {images.dr1 && (
                        <div className="image-preview">
                          <img
                            src={images.preview3}
                            alt="Driver's License Preview"
                            className="step2_img_preview"
                          />
                          <button
                            type="button"
                            onClick={() => handleDelete("dr1")}
                            className="step2_img_preview_btn"
                          >
                            X
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="input-rows2">
                      <input
                        type="file"
                        name="dr2"
                        id="fileInput2"
                        onChange={handleImage}
                        accept="image/*"
                        style={{
                          display: "none", // Hide the input
                        }}
                      />

                      {!images.dr2 ? (
                        <label
                          htmlFor="fileInput2"
                          className="step__img__input"
                        >
                          <Image />
                          <span>Choose Image File</span>
                        </label>
                      ) : null}

                      {/* Preview the uploaded driver’s license */}
                      {images.dr2 && (
                        <div className="image-preview">
                          <img
                            src={images.preview4}
                            alt="Driver's License Preview"
                            className="step2_img_preview"
                          />
                          <button
                            type="button"
                            onClick={() => handleDelete("dr2")}
                            className="step2_img_preview_btn"
                          >
                            X
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="input-rows2">
                      <label className="label2" htmlFor="fileInput">
                        Please upload your upto 2 certificates here:
                      </label>
                    </div>
                    <div className="input-rows2">
                      <input
                        type="file"
                        name="doc1"
                        id="fileInput3"
                        onChange={handleImage}
                        accept="image/*"
                        style={{
                          display: "none", // Hide the input
                        }}
                      />

                      {!images.doc1 ? (
                        <label
                          htmlFor="fileInput3"
                          className="step__img__input"
                        >
                          <Image />
                          <span>Choose Image File</span>
                        </label>
                      ) : null}

                      {/* Preview the uploaded driver’s license */}
                      {images.doc1 && (
                        <div className="image-preview">
                          <img
                            src={images.preview5}
                            alt="Certificates"
                            className="step2_img_preview"
                          />
                          <button
                            type="button"
                            onClick={() => handleDelete("doc1")}
                            className="step2_img_preview_btn"
                          >
                            X
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="input-rows2">
                      <input
                        type="file"
                        name="doc2"
                        id="fileInput4"
                        onChange={handleImage}
                        accept="image/*"
                        style={{
                          display: "none", // Hide the input
                        }}
                      />

                      {!images.doc2 ? (
                        <label
                          htmlFor="fileInput4"
                          className="step__img__input"
                        >
                          <Image />
                          <span>Choose Image File</span>
                        </label>
                      ) : null}

                      {/* Preview the uploaded driver’s license */}
                      {images.doc2 && (
                        <div className="image-preview">
                          <img
                            src={images.preview6}
                            alt="Certificates"
                            className="step2_img_preview"
                          />
                          <button
                            type="button"
                            onClick={() => handleDelete("doc2")}
                            className="step2_img_preview_btn"
                          >
                            X
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}

            <div className="step2__nav__button">
              <div>
                <button className="btnn" type="button" onClick={onPrev}>
                  Prev
                </button>
                <button className="btnn" type="button" onClick={onNext}>
                  Next
                </button>
              </div>

              {/* </div>
              <button className="btnn" onClick={handleUpload}>SUBMIT</button>
              <div className="input-rows" style={{ justifyContent: "center" }}>
                <button className="btnn" type="button" onClick={onPrev}>
                  Prev
                </button> */}
              {/* <button className="btnn" type="submit" style={{}}>
                  Next
                </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
//STEP 3
// SUmmary and Submit Request
export function Step3({ details, images, haveLicense, onPrev, onNext }) {
  const { user } = useAuth();
  const userID = user.userID;
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!images.image1 || !images.image2) {
        setAlertOpen(true);
        console.log("please enter images");
        setOpen(false);

        return;
      }
      setOpen(false);
      setLoading(true);

      // 5 seconds cd
      setTimeout(() => {
        setLoading(false);

        onNext();
      }, 5000);

      // onNext();
      //wrap file images into formdata
      const formData = new FormData();

      formData.append("image1", images.image1);
      formData.append("image2", images.image2);
      formData.append("dr1", images.dr1);
      formData.append("dr2", images.dr2);
      formData.append("doc1", images.doc1);
      formData.append("doc2", images.doc2);

      // console.log(formData);
      console.log("info successfully sent to server");
      //upload docs to server
      await axios
        .post(`http://localhost:8800/upload/${userID}`, formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      //update accound data
      //await axios.put("http://localhost:8800/update-info/" + userID, details); //update skills in db
      //add notif of request
      await axios.post("http://localhost:8800/notify-admin"); // notify all admin
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="step">
      <h1 className="step__title">Summary</h1>

      <div className="form-container">
        <div className="image-previews">
          <strong>Identification</strong>
          {images.preview1 && (
            <img
              src={images.preview1}
              className="step__img__preview"
              alt="Preview 1"
            />
          )}
          {images.preview2 && (
            <img
              src={images.preview2}
              className="step__img__preview"
              alt="Preview 2"
            />
          )}
          {(images.preview3 || images.preview4) && (
            <>
              <strong>Driver's License</strong>
              <img
                src={images.preview3}
                className="step__img__preview"
                alt="Preview 3"
              />
              <img
                src={images.preview4}
                className="step__img__preview"
                alt="Preview 3"
              />
            </>
          )}
          {(images.preview5 || images.preview6) && (
            <>
              <strong>Certificates</strong>
              <img
                src={images.preview5}
                className="step__img__preview"
                alt="Preview 3"
              />
              <img
                src={images.preview6}
                className="step__img__preview"
                alt="Preview 3"
              />
            </>
          )}
        </div>

        <LoadingBackdrop
          open={loading}
          text="Please wait... Your documents are uploading to the Admin."
          icons={<HourglassBottomIcon />}
        />

        {alertOpen && (
          <Grow in={alertOpen} style={{ transformOrigin: "center" }}>
            <Alert
              variant="filled"
              severity="error"
              className="step2__alert__error"
              sx={{
                fontWeight: "bold",
              }}
              onClose={() => setAlertOpen(false)}
            >
              Please upload both images before submitting.
            </Alert>
          </Grow>
        )}

        <div className="done__nav__btn">
          <Button
            className="btnn"
            onClick={onPrev}
            size="lg"
            sx={{
              margin: "20px",
              padding: "10px",
              width: "100px",
              borderRadius: "5px",
              fontSize: "13px",
            }}
          >
            BACK
          </Button>

          <Button
            variant="outlined"
            color="success"
            size="lg"
            sx={{
              margin: "20px",
              padding: "10px",
              width: "100px",
              borderRadius: "5px",
              fontSize: "13px",
            }}
            // onClick={onSubmit}
            onClick={() => handleOpenModal()}
          >
            Submit
          </Button>

          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog variant="outlined" role="alertdialog">
              <DialogTitle>
                <WarningRounded />
                Confirmation
              </DialogTitle>
              <Divider />
              <DialogContent>
                Are you sure you want to submit your personal information?
              </DialogContent>
              <DialogActions>
                <Button
                  variant="solid"
                  color="primary"
                  // Upload the file if Yes
                  onClick={onSubmit}
                >
                  Yes
                </Button>
                <Button
                  variant="plain"
                  color="neutral"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </DialogActions>
            </ModalDialog>
          </Modal>
        </div>
      </div>
    </div>
  );
}
//Success
export function Step4() {
  const [showSuccess, setShowSuccess] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="step">
      <form className="form-container">
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Submitting Verification to the Admin!
        </h1>
        <Box className="step4__box">
          <Verified
            sx={{
              fontSize: "large",
              height: "600px",
              width: "250px",
              color: "skyblue",
            }}
          />
        </Box>
        {showSuccess && (
          <Grow in={showSuccess} style={{ transformOrigin: "center" }}>
            <Alert
              variant="filled"
              severity="success"
              sx={{
                position: "fixed",
                right: "16px",
                top: "90px",
                fontSize: "15px",
                fontWeight: "bold",
                color: "white",
              }}
              onClose={() => setShowSuccess(false)}
            >
              Wait Admin for the confirmation process.
            </Alert>
          </Grow>
        )}
        <p className="step4__text">Explore the services in Errand Catcher</p>
        <div className="done__nav__btn">
          <Button
            variant="outlined"
            color="success"
            size="lg"
            sx={{
              margin: "20px",
              padding: "10px",
              width: "100px",
              borderRadius: "5px",
              fontSize: "13px",
            }}
            onClick={() => navigate("/profile/me")}
          >
            Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
