import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateInputs = () => {
    if (!name || !email || !password) {
      toast.error('All fields are required');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email');
      return false;
    }

    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
    ) {
      toast.error(
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number'
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const newUser = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/register', newUser);
      console.log(response.data);
      setName('');
      setEmail('');
      setPassword('');
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error('Failed to register. Please try again.');
    }
  };

  return (
    <div className="container-sm">
      <ToastContainer position="top-center" />
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: '25px' }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h2 fw-bold mb-3 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="nameInput">
                              Your Name
                            </label>
                            <input
                              type="text"
                              id="nameInput"
                              className="form-control"
                              placeholder='Enter a Name'
                              value={name}
                              onChange={(event) => setName(event.target.value)}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="emailInput">
                              Your Email
                            </label>
                            <input
                              type="email"
                              id="emailInput"
                              className="form-control"
                              placeholder='Enter a Email'
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="passwordInput"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              id="passwordInput"
                              className="form-control"
                              placeholder='Enter a Password'
                              value={password}
                              onChange={(event) =>
                                setPassword(event.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
