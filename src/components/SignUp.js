import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const SignUp = () => {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const profileImgRef = useRef();
    const { signUp } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSumbit = async (e) => {
        e.preventDefault();
        if (passwordConfirmRef.current.value !== passwordRef.current.value) return setError("Password do not match");

        try {
            setError("");
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value, profileImgRef.current.files[0], usernameRef.current.value);
            history.push("/");

        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h1>Sign - Up</h1>
                    <Form onSubmit={handleSumbit}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group id="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" ref={usernameRef} required />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Form.Group id="profileImg">
                            <Form.Label>Profile Img</Form.Label>
                            <Form.Control type="file" ref={profileImgRef} />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-2" type="submit" >Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account ? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}

export default SignUp
