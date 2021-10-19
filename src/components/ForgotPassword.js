import React, { useRef, useState, useEffect } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ForgotPassword = () => {
    const emailRef = useRef();
    const { currentUser, resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (currentUser) history.push("/");
    }, [history])

    const handleSumbit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for futher instructions")
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h1>Log In</h1>
                    <Form onSubmit={handleSumbit}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form.Group id="email">
                            <Form.Label>email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-2" type="submit" >Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-2"><Link to="/login">Log In</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account ? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default ForgotPassword
