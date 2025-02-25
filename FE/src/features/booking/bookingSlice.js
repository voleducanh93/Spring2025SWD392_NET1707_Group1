import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../utils/http";
import axios from "axios";
const BASE_URL = "/Booking";

// Async thunk để tạo booking mới
export const createBooking = createAsyncThunk("booking/create", async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://localhost:7134/api/Booking?userId=6925ea13-7bad-4e2e-aa2f-a9c0cffb02bb", bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

  // Slice của Booking
const bookingSlice = createSlice({
    name: "booking",
    initialState: {
      bookings: [],
      status: "idle", // idle | loading | succeeded | failed
      error: null,
    },
    reducers: {
      addBooking(state, action) {
        state.bookings.push(action.payload);
      },
      removeBooking(state, action) {
        state.bookings = state.bookings.filter(b => b.childId !== action.payload);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createBooking.pending, (state) => {
          state.status = "loading";
        })
        .addCase(createBooking.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.bookings.push(action.payload);
        })
        .addCase(createBooking.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
    },
  });

  export const { addBooking, removeBooking } = bookingSlice.actions;

export default bookingSlice.reducer;