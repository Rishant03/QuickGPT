import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyUserData, dummyChats } from "../assets/assets"; // ✅ import dummyChats
import axios from 'axios';
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]); // ✅ start with []
  const [selectedChat, setSelectedChat] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [loadingUser, setLoadingUser] = useState(true)

  const fetchUser = async () => {
    try{
      await axios.get('/api/user/data', {
  headers: { Authorization: `Bearer ${token}` }
})

        if(data.success){
          setUser(data.user)
        } else{
          toast.error(data.message);
        }
    } catch (error) {
  toast.error(
    error.response?.data?.message ||
    error.message ||
    "Something went wrong"
  );
}
 finally{
      setLoadingUser(false)
    }
  }






  const createNewChat = async () => {
    try{
      if(!user) return toast('Login to create a new chat')
        navigate('/')
     await axios.get('/api/user/create', {
  headers: { Authorization: `Bearer ${token}` }
})

      await fetchUsersChats()
    } catch (error) {
  toast.error(
    error.response?.data?.message ||
    error.message ||
    "Something went wrong"
  );
}

  }

  const fetchUsersChats = async () => {
    try{
      await axios.get('/api/user/data', {
  headers: { Authorization: `Bearer ${token}` }
})

        if(data.success){
          setChats(data.chats)
          // If the user has no chats, create one
         if (data.chats.length === 0) {
  await axios.get('/api/chat/create', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const updated = await axios.get('/api/chat/get', {
    headers: { Authorization: `Bearer ${token}` }
  });
  setChats(updated.data.chats);
  setSelectedChat(updated.data.chats[0] || null);
}

        } else{
          toast.error(data.message)
        }
    } catch (error) {
  toast.error(
    error.response?.data?.message ||
    error.message ||
    "Something went wrong"
  );
}


  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    if (user) {
      fetchUsersChats();
    } else {
      setChats([]); // ✅ keep array instead of null
      setSelectedChat(null);
    }
  }, [user]);

  useEffect(() => {
    if(token){
      fetchUser()
    } else{
      setUser(null)
      setLoadingUser(false)
    }
    
  }, [token]);

  const value = {
    navigate,
    user,
    setUser,
    fetchUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    theme,
    setTheme, // ✅ pass setTheme so you can toggle from UI
    createNewChat,
    loadingUser,
    fetchUsersChats,
    token,
    setToken,
    axios
  }

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
