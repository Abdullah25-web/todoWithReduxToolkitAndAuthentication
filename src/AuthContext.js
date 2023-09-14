// AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const login = () => {
    // Perform the login logic here and set isAuthenticated to true
    localStorage.setItem("token", "your-auth-token");
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Perform the logout logic here and set isAuthenticated to false
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
