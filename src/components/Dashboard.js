import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Card, Button, Alert, Form } from 'react-bootstrap';

const Dashboard = () => {
    const { currentUser, userData, createUserData, userImage, updateUserData } = useAuth();
    const [error, seterror] = useState("");
    const [edit, setEdit] = useState(false);
    const [editData, setEditData] = useState();
    const [loading, setLoading] = useState(false);
    const phone_noRef = useRef();
    const addressRef = useRef();
    const profileImgRef = useRef();

    useEffect(() => {
        setEditData(userData)
    }, [userData])

    const handleAddData = async (e) => {
        e.preventDefault();
        setLoading(true);
        seterror("");
        if (!userData) {
            const additionalData = {
                username: currentUser.displayName,
                phone_no: phone_noRef.current.value,
                address: addressRef.current.value,
                email: currentUser.email
            }
            try {
                await createUserData(currentUser, additionalData);
                setLoading(false);
            } catch (error) {
                seterror(error.message);
            }
        } else {
            try {
                await updateUserData(currentUser, editData, profileImgRef.current.files[0]);
                setEdit(false);
                setLoading(false);
            } catch (error) {
                seterror(error.message);
            }
        }

    }

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    }

    return (
        <>
            <Card>
                <Card.Body>
                    {currentUser && !edit && userData && <i className="fa fa-pencil fa-2x float-end" style={{ cursor: "pointer" }} onClick={() => setEdit(true)}></i>}
                    {edit && <i className="fa fa-times fa-2x float-end" style={{ cursor: "pointer" }} onClick={() => setEdit(false)}></i>}
                    <img src={userImage} alt="...." width="100px" height="100px" />
                    <p><b>Username</b> {currentUser.displayName}</p>
                    {!userData || edit ? (
                        <Form onSubmit={handleAddData}>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control as="textarea" name="address" rows={5} ref={addressRef} value={editData && editData.address} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone no</Form.Label>
                                <Form.Control type="tel" minLength="10" maxLength="10" ref={phone_noRef} name="phone_no" value={editData && editData.phone_no} onChange={handleChange} />
                            </Form.Group>
                           { currentUser && edit && <Form.Group>
                                <Form.Label>Profile Img</Form.Label>
                                <Form.Control type="file" ref={profileImgRef} />
                            </Form.Group>}
                            <Button disabled={loading} className="w-100 mt-2" type="submit">Save</Button>
                        </Form>
                    ) : (
                        <>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <p><b>Email:</b>  {currentUser.email}</p>
                            <p> <b>Phone no:</b>  {userData.phone_no}</p>
                            <p> <b>Address:</b>  {userData.address}</p>
                        </>
                    )}

                </Card.Body>
            </Card>
        </>
    )
}

export default Dashboard
