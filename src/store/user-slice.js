import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        fetched: false,
        id: "",
        email: "",
        name: "",
        city: "",
        profile_pic: "",
        country: "",
        post_code: "",
        street_address: ""},
        reducers: {
            setUser(state, action) {
                state.fetched = true
                state.id = action.payload.id ;
                state.email = action.payload.email;
                state.name = action.payload.name;
                state.city = action.payload.city;
                state.profile_pic = action.payload.profile_pic;
                state.country = action.payload.country;
                state.post_code = action.payload.post_code;
                state.street_address = action.payload.street_address
            },
            setUserisFetched(state, action) {
                state.fetched = action.payload
            }
        }
});

export const userActions = userSlice.actions;

export default userSlice;