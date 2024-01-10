// auth.js
import { supabase } from "../../context/context";
import axios from "../../axios/axios";

export async function logout() {
  try {
    const response = await axios.post("/api/auth/logout", null, {
      withCredentials: true, // Set credentials option to 'include'
    });

    console.log(response);

    if (response.status === 200) {
      console.log("Server logged out");

      const { error } = await supabase.auth.signOut();
      if (!error) {
        console.log("logged out:", error);
        return true;
      } else {
        console.log("error logging out:", error);
        return false;
      }
    } else {
      console.log("Error logging out on the server:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error during logout:", error);
    return false;
  }
}
