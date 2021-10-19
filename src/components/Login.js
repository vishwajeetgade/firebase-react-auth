import React, { useRef, useState, useEffect } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, currentUser } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (currentUser) history.push("/");
    }, [history])

    const handleSumbit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
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
                    <h1>Log In</h1>
                    <Form onSubmit={handleSumbit}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group id="email">
                            <Form.Label>email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <div className="w-100 text-center mt-2">
                            Forgot password ? <Link to="/forgotpassword">Forgot password</Link>
                        </div>
                        <Button disabled={loading} className="w-100 mt-2" type="submit" >Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account ? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default Login
