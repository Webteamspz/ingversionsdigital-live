import { useState, useEffect } from 'react';

const StagingLogin = ({ children }) => {
  const isStaging = import.meta.env.VITE_APP_ENV === 'staging';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Component load hone par check karo ki kya user pehle se logged in hai
  useEffect(() => {
    const savedUser = sessionStorage.getItem('staging_user');
    if (savedUser) {
      setLoggedInUser(savedUser);
    }
  }, []);

  // Agar production hai, toh seedha website dikhao
  if (!isStaging) {
    return children;
  }

  // Agar user logged in hai, toh website dikhao
  if (loggedInUser) {
    return (
      <>
        {/* Ek chota sa badge jo dikhayega ki kisne login kiya hai (Optional) */}
        <div style={{ 
          position: 'fixed', bottom: '10px', left: '10px', 
          background: 'rgba(0,0,0,0.8)', color: '#fff', 
          padding: '5px 10px', borderRadius: '5px', 
          fontSize: '12px', zIndex: 9999 
        }}>
          Logged in as: <strong>{loggedInUser}</strong>
          <button 
            onClick={() => { sessionStorage.removeItem('staging_user'); window.location.reload(); }}
            style={{ marginLeft: '10px', background: 'red', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', padding: '2px 5px' }}
          >
            Logout
          </button>
        </div>
        
        {children}
      </>
    );
  }

  // Login Handle karne ka function
  const handleLogin = (e) => {
    e.preventDefault();
    
    try {
      // .env se JSON string read karke object mein convert kar rahe hain
      const envUsers = import.meta.env.VITE_STAGING_USERS || "{}";
      const validUsers = JSON.parse(envUsers);
      
      // Check karo ki username exist karta hai aur password match karta hai
      if (validUsers[username] && validUsers[username] === password) {
        setLoggedInUser(username);
        sessionStorage.setItem('staging_user', username); // Session mein save kar lo
      } else {
        alert("Galat Username ya Password!");
      }
    } catch (error) {
      console.error("JSON parse error in VITE_STAGING_USERS", error);
      alert("Configuration error! Console check karo.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }}>
      <form onSubmit={handleLogin} style={{ padding: '30px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center', width: '300px' }}>
        <h2>Staging Access</h2>
        <p style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>Please login to view staging.</p>
        
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase())} // Taki case-sensitive issue na ho
          style={{ padding: '10px', width: '100%', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
          required
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', width: '100%', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
          required
        />
        
        <button 
          type="submit"
          style={{ padding: '10px', width: '100%', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default StagingLogin;