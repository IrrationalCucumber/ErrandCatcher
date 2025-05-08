import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { startCase } from "lodash";
import { useForm } from "react-hook-form";

const ProfileForm = ({ user = {} }) => {
  const [mode, setMode] = useState("view");
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    defaultValues: user
  });

  const handleEditClick = () => {
    setMode("edit");
  };

  const handleCancelClick = () => {
    reset(user);
    setMode("view");
  };

  const handleVerifyClick = () => {
    // Handle verification logic
  };

  const handleUnverifyClick = () => {
    // Handle unverification logic
  };


  const onSubmit = (data) => {
    // Handle form submission, e.g., send data to the server
    console.log(data);
    // After submission, navigate back to view mode
    setMode("view");
  };

  const imageUrl = user.profile_image ? "http://localhost:8080" + user.profile_image : "https://placehold.co/250x250";

  return (
    <Container>
      <Form className="pb-2" onSubmit={handleSubmit(onSubmit)}>
        <Row className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
          <Col md={4}>
            <div className="text-center mb-4">
              <Image src={imageUrl} roundedCircle style={{ height: "250px", width: "250px" }} className="mb-4" />
              {user.type === "catcher" && user.status === "verified" && (
                <Button variant="success" disabled>Rating: 4.5 / 5</Button>
              )}
            </div>
            {mode !== "view" && (
              <Form.Group className="mb-3" controlId="profileImage">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <div className="d-flex align-items-center">
                {mode === "view" ? (
                <Form.Label>{user?.username}</Form.Label>
                ) : (
                <Form.Control
                    type="text"
                    defaultValue={user?.username}
                />
                )}
                {mode === "view" && user?.type !== "admin" && (
                <Link to={``}>
                    <i className="fas fa-check-circle" style={{ color: "green", marginRight: ".5rem", cursor: "pointer" }} onClick={handleVerifyClick} />
                </Link>
                )}
                {mode === "view" && user?.type !== "admin" && (
                <Link to={``}>
                    <i className="fas fa-check-circle" style={{ color: "gray", marginRight: ".5rem", cursor: "pointer" }} onClick={handleUnverifyClick} />
                </Link>
                )}
            </div>
            </Form.Group>

                

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ minHeight: "100px" }}
                defaultValue={user.description || ""}
                disabled={mode === "view"}
                {...register("description")}
              />
            </Form.Group>
          </Col>
          <Col md={{ span: 7, offset: 1 }}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="first_name">
                  <Form.Label>First Name</Form.Label>
                  {mode === "view" ? (
                    <Form.Control type="text" value={user.first_name || ""} disabled />
                  ) : (
                    <>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        defaultValue={user.first_name || ""}
                        {...register("first_name", { required: true })}
                      />
                      {errors.first_name && <Alert variant="danger" className="mt-2">First Name is required</Alert>}
                    </>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="last_name">
                  <Form.Label>Last Name</Form.Label>
                  {mode === "view" ? (
                    <Form.Control type="text" value={user.last_name || ""} disabled />
                  ) : (
                    <>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        defaultValue={user.last_name || ""}
                        {...register("last_name", { required: true })}
                      />
                      {errors.last_name && <Alert variant="danger" className="mt-2">Last Name is required</Alert>}
                    </>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  {mode === "view" ? (
                    <Form.Control type="text" value={startCase(user.gender) || ""} disabled />
                  ) : (
                    <>
                      <Form.Select defaultValue={user.gender || ""} {...register("gender", { required: true })}>
                        <option value="" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Form.Select>
                      {errors.gender && <Alert variant="danger" className="mt-2">Gender is required</Alert>}
                    </>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="birthday">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={user.birthday || ""}
                    disabled={mode === "view"}
                    {...register("birthday", { required: true })}
                  />
                  {errors.birthday && <Alert variant="danger" className="mt-2">Birthday is required</Alert>}
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                defaultValue={user.email || ""}
                disabled={mode === "view"}
                {...register("email", { required: true })}
              />
              {errors.email && <Alert variant="danger" className="mt-2">Email is required</Alert>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="contact_number">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contact Number"
                defaultValue={user.contact_number || ""}
                disabled={mode === "view"}
                {...register("contact_number", { required: true })}
              />
              {errors.contact_number && <Alert variant="danger" className="mt-2">Contact Number is required</Alert>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                defaultValue={user.address || ""}
                disabled={mode === "view"}
                {...register("address", { required: true })}
              />
              {errors.address && <Alert variant="danger" className="mt-2">Address is required</Alert>}
            </Form.Group>
            {mode !== "view" && (
                <>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <Spinner animation="border" /> : "Submit"}
                </Button>
                <Button variant="secondary" onClick={handleCancelClick} style={{ marginLeft: "1rem" }}>
                    Cancel
                </Button>
                </>
              
            )}
            {mode === "view" && (
              <>
                <Button variant="primary" onClick={handleEditClick} style={{ marginRight: ".5rem" }}>
                    Edit
                </Button>

                {user.type !== "admin" && user.status === "unverified" && (
                  <Button as="a" variant="success" href="/profile/verification">
                    Request Verification
                  </Button>
                )}
              </>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ProfileForm;
