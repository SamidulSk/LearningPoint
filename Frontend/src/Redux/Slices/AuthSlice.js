import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data: (() => {
    const data = localStorage.getItem("data");
    try {
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error("Error parsing JSON from localStorage:", e);
      return {};
    }
  })(),
};

// ✅ Register
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "Creating your account...",
      success: (data) => data?.data?.message,
      error: "Failed to create account",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// ✅ Login
export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("user/login", data);
    toast.promise(res, {
      loading: "Authenticating...",
      success: (data) => data?.data?.message,
      error: "Failed to log in",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// ✅ Logout
export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.post("user/logout");
    toast.promise(res, {
      loading: "Logging out...",
      success: (data) => data?.data?.message,
      error: "Failed to log out",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// ✅ Update Profile
export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
  try {
    const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
    toast.promise(res, {
      loading: "Updating profile...",
      success: (data) => data?.data?.message,
      error: "Failed to update profile",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// ✅ Get User Data
export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = axiosInstance.get("user/me");
    return (await res).data;
  } catch (error) {
    toast.error(error.message);
  }
});

// ✅ Forgot Password
export const forgotPassword = createAsyncThunk("/auth/forgotPassword", async (email) => {
  try {
    const res = axiosInstance.post("user/reset", { email });
    toast.promise(res, {
      loading: "Sending reset link...",
      success: (data) => data?.data?.message,
      error: "Failed to send reset link",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        if (!action?.payload?.user) return;
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      });
  },
});

export default authSlice.reducer;
