import firebase from "firebase";
class AuthService {
  async checkSignupValidatedEmail(email) {
    return await firebase.Auth().fetchSignInMethodsForEmail(email);
  }
}
export const authService = new AuthService();
