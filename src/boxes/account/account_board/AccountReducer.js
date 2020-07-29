export default function accountReducer(state = {}, action) {
  switch (action.type) {
    case 'POST_LOGIN_REQUEST': return action.payload;
    case 'GET_ACCOUNT_INFO': return action.payload;
    case 'PATCH_UPDATE_PASSWORD': return action.payload;
    case 'PATCH_UPDATE_USER': return action.payload;
    case 'DELETE_USER': return action.payload;
    case 'LOGOUT' : return {};
    default: return state;
  }
}