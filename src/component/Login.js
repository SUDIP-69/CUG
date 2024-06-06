import React, { useRef, useState } from 'react';
import { useAuth } from '../api/AuthContext';
import { db } from '../api/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../style.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);

      // Query Firestore for admin credentials
      const q = query(collection(db, 'admins'), where('email', '==', emailRef.current.value));
      const querySnapshot = await getDocs(q);

      console.log('Query Snapshot:', querySnapshot);

      if (!querySnapshot.empty) {
        const adminDoc = querySnapshot.docs[0];
        const adminData = adminDoc.data();

        console.log('Admin Data:', adminData);

        // Check if the provided password matches
        if (adminData.password === passwordRef.current.value) {
          // Simulate login action
          await login(emailRef.current.value, passwordRef.current.value);
          console.log('Logged in successfully');
          alert('Welcome!!');
          navigate('/admin'); // Redirect to admin dashboard
        } else {
          throw new Error('Invalid password');
        }
      } else {
        // Query Firestore for dealer credentials
        const qDealer = query(collection(db, 'dealers'), where('email', '==', emailRef.current.value));
        const querySnapshotDealer = await getDocs(qDealer);

        if (!querySnapshotDealer.empty) {
          const dealerDoc = querySnapshotDealer.docs[0];
          const dealerData = dealerDoc.data();

          console.log('Dealer Data:', dealerData);

          // Check if the provided password matches
          if (dealerData.password === passwordRef.current.value) {
            // Simulate login action
            await login(emailRef.current.value, passwordRef.current.value);
            console.log('Logged in successfully');
            alert('Welcome!!');
            navigate('/dealer'); // Redirect to dealer dashboard
          } else {
            throw new Error('Invalid password');
          }
        } else {
          throw new Error('No admin or dealer found with this email');
        }
      }

    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }

    setLoading(false);
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" ref={emailRef} required placeholder="Email" />
        <input type="password" ref={passwordRef} required placeholder="Password" />
        <button type="submit" disabled={loading}>Log In</button>
      </form>
    </div>
  );
}

export default Login;