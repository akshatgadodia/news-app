export const initialLoggedInDetails = {
    isLoggedIn: false,
    name: null,
    language: 'english',
    role: null
  };
  
  export const reducer = (state, action) => {
    if (action.type === "UserLogin") {
      return {
        isLoggedIn: true,
        name: action.payload.name,
        language: 'english',
        role: action.payload.role
      };
    }
    if (action.type === "UserLogout") {
      return {
        isLoggedIn: false,
        name: null,
        language: 'english',
        role: null
      };
    }
    if (action.type === "LanguageChange") {
      console.log(state);
      return {
        isLoggedIn: state.isLoggedIn,
        name: state.name,
        language: action.payload.language,
        role: action.payload.role
      };
    }
  };