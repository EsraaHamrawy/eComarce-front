import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils";
import { RootState } from '../../index';

type TLikeToggleResult = {
  type: "add" | "remove";
  id: number;
};

const actLikeToggle = createAsyncThunk<TLikeToggleResult>(
  "wishlist/actLikeToggle",
  async (productId: number, thunkAPI) => {
    const { rejectWithValue, getState} = thunkAPI;

    try {
      const state = getState() as RootState;
      const userId = state.auth.user?.id;


      if(!userId){
        return rejectWithValue("User not authenticated");
      }

      const isRecordExist = await axios.get(
        `/wishlist?userId=${userId}&productId=${productId}`
      );


      if (isRecordExist.data.length > 0) {
        await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
        return { type: "remove", id: productId };
      } else {
        await axios.post("/wishlist", {
           userId, 
           productId 
          });
        return { type: "add", id: productId};
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actLikeToggle;
