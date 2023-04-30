import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';

const useAuth = () => {
  const { token, user, appInit, mostReadBlog, marginDiv, showCreateForum, query, searchData, visible,
     setToken, fetchUser, fetchMostReadBlog, setMarginDiv, handleShowCreateForum, setQuery,
    setVisible } = useContext(AuthContext);

  return {
    user,
    token,
    appInit,
    mostReadBlog,
    marginDiv,
    showCreateForum,
    query,
    visible,
    searchData,
    isAuthenticated: Boolean(token),
    setToken,
    removeToken: setToken,
    fetchUser,
    fetchMostReadBlog,
    setMarginDiv,
    handleShowCreateForum,
    setQuery,
    setVisible,
  };
};

export default useAuth;
