import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { getItemFromLocalStorage, setItemsInLocalStorage, removeItemFromLocalStorage } from '@/utils';
import axiosInstance from '@/utils/axios';

const initialState = {
  user: null,
  register: () => {},
  login: () => {},
  googleLogin: () => {},
  logout: () => {},
  loading: true,
  uploadPicture: () => {},
  updateUser: () => {},
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getItemFromLocalStorage('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (formData) => {
    const { name, email, password } = formData;
    try {
      const { data } = await axiosInstance.post('user/register', {
        name,
        email,
        password,
      });
      if (data.user && data.token) {
        setUser(data.user);
        setItemsInLocalStorage('user', data.user);
        setItemsInLocalStorage('token', data.token);
      }
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      return { success: false, message };
    }
  };

  const login = async (formData) => {
    const { email, password } = formData;
    try {
      const { data } = await axiosInstance.post('user/login', {
        email,
        password,
      });
      if (data.user && data.token) {
        setUser(data.user);
        setItemsInLocalStorage('user', data.user);
        setItemsInLocalStorage('token', data.token);
      }
      return { success: true, message: 'Login successful' };
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      return { success: false, message };
    }
  };

  const googleLogin = async (credential) => {
    const decoded = jwt_decode(credential);
    try {
      const { data } = await axiosInstance.post('user/google/login', {
        name: `${decoded.given_name} ${decoded.family_name}`,
        email: decoded.email,
      });
      if (data.user && data.token) {
        setUser(data.user);
        setItemsInLocalStorage('user', data.user);
        setItemsInLocalStorage('token', data.token);
      }
      return { success: true, message: 'Login successful' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      const { data } = await axiosInstance.get('/user/logout');
      if (data.success) {
        setUser(null);
        removeItemFromLocalStorage('user');
        removeItemFromLocalStorage('token');
      }
      return { success: true, message: 'Logout successful' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Something went wrong!' };
    }
  };

  const uploadPicture = async (picture) => {
    try {
      const formData = new FormData();
      formData.append('picture', picture);
      const { data } = await axiosInstance.post('/user/upload-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (userDetails) => {
    const { name, password, picture, phone, bio } = userDetails;
    const email = JSON.parse(getItemFromLocalStorage('user'))?.email;
    try {
      const { data } = await axiosInstance.put('/user/update-user', {
        name, password, email, picture, phone, bio
      });
      // Update local storage and context state if user details were successfully updated
      if (data?.user) {
        setUser(data.user);
        setItemsInLocalStorage('user', data.user);
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register,
        login,
        googleLogin,
        logout,
        loading,
        uploadPicture,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
