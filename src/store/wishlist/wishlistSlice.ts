import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishlist from "./act/actGetWishlist";
import { authLogout } from "@store/auth/authSlice";
import { TProduct, TLoading, isString } from "@types";

interface IWishlist {
  itemsId: number[];
  productsFullInfo: TProduct[];
  error: string | null;
  loading: TLoading;
}

const initialState: IWishlist = {
  itemsId: [],
  productsFullInfo: [],
  error: null,
  loading: "idle",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      if (!state.itemsId.includes(id)) {
        state.itemsId.push(id);
      }
    },

    cleanWishlistProductsFullInfo: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    // like toggle
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });

    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        if (!state.itemsId.includes(action.payload.id)) {
          state.itemsId.push(action.payload.id);
        }
      } else {
        state.itemsId = state.itemsId.filter(
          (id) => id !== action.payload.id
        );
        state.productsFullInfo = state.productsFullInfo.filter(
          (product) => product.id !== action.payload.id
        );
      }
    });

    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // get wishlist
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";

      if (action.payload.dataType === "ProductsFullInfo") {
        state.productsFullInfo = action.payload.data as TProduct[];
      } else if (action.payload.dataType === "productsIds") {
        state.itemsId = action.payload.data as number[];
      }
    });

    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // logout reset
    builder.addCase(authLogout, (state) => {
      state.itemsId = [];
      state.productsFullInfo = [];
      state.error = null;
      state.loading = "idle";
    });
  },
});

export const {
  addToWishlist,
  cleanWishlistProductsFullInfo,
} = wishlistSlice.actions;

export { actLikeToggle, actGetWishlist };

export default wishlistSlice.reducer;
