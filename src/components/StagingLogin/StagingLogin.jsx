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
        <div style={{ 
          position: 'fixed', bottom: '15px', left: '15px', 
          background: '#1e293b', color: '#f8fafc', 
          padding: '8px 12px', borderRadius: '6px', 
          fontSize: '13px', zIndex: 9999,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          <span>Logged in as: <strong style={{ color: '#38bdf8' }}>{loggedInUser}</strong></span>
          <button 
            onClick={() => { sessionStorage.removeItem('staging_user'); window.location.reload(); }}
            style={{ 
              background: '#ef4444', color: 'white', border: 'none', 
              borderRadius: '4px', cursor: 'pointer', padding: '4px 8px',
              fontSize: '12px', fontWeight: 'bold'
            }}
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
      const envUsers = import.meta.env.VITE_STAGING_USERS || "{}";
      const validUsers = JSON.parse(envUsers);
      
      if (validUsers[username] && validUsers[username] === password) {
        setLoggedInUser(username);
        sessionStorage.setItem('staging_user', username);
      } else {
        alert("Galat Username ya Password!");
      }
    } catch (error) {
      console.error("JSON parse error in VITE_STAGING_USERS", error);
      alert("Configuration error! Console check karo.");
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#e2e8f0', // Thoda darker gray background taaki card highlight ho
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      
      {/* YEH STYLE BLOCK ADD KIYA HAI AUTOFILL FIX KARNE KE LIYE */}
      <style>
        {`
          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus, 
          input:-webkit-autofill:active {
              -webkit-box-shadow: 0 0 0 30px #f8fafc inset !important;
              -webkit-text-fill-color: #000 !important; /* Yahan #000 force kar diya hai */
              transition: background-color 5000s ease-in-out 0s;
          }
        `}
      </style>

      <form onSubmit={handleLogin} style={{ 
        padding: '40px', 
        background: '#ffffff', 
        borderRadius: '12px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.05)', // Premium shadow
        textAlign: 'center', 
        width: '100%',
        maxWidth: '360px',
        boxSizing: 'border-box'
      }}>
        {/* Explicit Dark Colors diye hain taaki gayab na ho */}
        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#0f172a', fontWeight: '700' }}>
          Staging Access
        </h2>
        <p style={{ margin: '0 0 25px 0', fontSize: '14px', color: '#64748b' }}>
          Please enter your credentials.
        </p>
        
        <div style={{ textAlign: 'left', marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#475569', fontWeight: '600' }}>
            Username
          </label>
          <input 
            type="text" 
            placeholder="e.g. developer" 
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            style={{ 
              padding: '12px', 
              width: '100%', 
              border: '1px solid #cbd5e1', 
              borderRadius: '8px', 
              boxSizing: 'border-box',
              fontSize: '14px',
              color: '#0f172a', // Input text color explicitly dark
              backgroundColor: '#f8fafc',
              outline: 'none'
            }}
            required
          />
        </div>
        
        <div style={{ textAlign: 'left', marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#475569', fontWeight: '600' }}>
            Password
          </label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              padding: '12px', 
              width: '100%', 
              border: '1px solid #cbd5e1', 
              borderRadius: '8px', 
              boxSizing: 'border-box',
              fontSize: '14px',
              color: '#0f172a', // Input text color explicitly dark
              backgroundColor: '#f8fafc',
              outline: 'none'
            }}
            required
          />
        </div>
        
        <button 
          type="submit"
          style={{ 
            padding: '12px', 
            width: '100%', 
            backgroundColor: '#2563eb', // Bright Blue
            color: '#ffffff', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            fontWeight: '600',
            fontSize: '15px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default StagingLogin;