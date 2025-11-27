// src/redux/slices/dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllProducts,
  getAllBookingsByUserId,
  getAllCategories,
  getAllProducts,
  getAllProductsOrdersByStatus,
  getFvrtSalons,
  getNearbySalons,
  getReviewsByProductId,
  getReviewsBySalonId,
  getSalonById,
  getServicesByStylistId,
  getStylistByServiceId,
  getTimeSlotsByDate,
  getTimeSlotsByDateAndStylistId,
} from '../GlobalFunctions/index.tsx';

// 🧠 Helper to reduce boilerplate
const handleAsync = (builder, thunk, key, onSuccess) => {
  builder
    .addCase(thunk.pending, (state, action) => {
      if (!action.meta.arg?.silent) state.loading[key] = true;
      state.error[key] = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.loading[key] = false;
      onSuccess(state, action);
    })
    .addCase(thunk.rejected, (state, action) => {
      if (!action.meta.arg?.silent) state.loading[key] = false;
      state.error[key] = action.payload;
    });
};

// =============== 🔥 Thunks ===============
export const fetchCategories = createAsyncThunk(
  'data/fetchCategories',
  async ({ silent = false } = {}, { rejectWithValue }) => {
    try {
      const response = await getAllCategories();
      return { data: response.data, silent };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchNearbySalons = createAsyncThunk(
  'data/fetchNearbySalons',
  async ({ lat, lng, serviceId, silent = false }, { rejectWithValue }) => {
    try {
      const res = await getNearbySalons(lat, lng, serviceId);
      console.log('🔥 fetchNearbySalons called with:', serviceId, res?.data);
      return { data: res?.data, lat, lng, serviceId, silent };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSalonById = createAsyncThunk(
  'data/fetchSalonById',
  async ({ id, silent = false }, { rejectWithValue }) => {
    console.log('🔥 fetchSalonById called for ID:', id);
    try {
      const response = await getSalonById(id);
      console.log('✅ API success:', response.data);
      return { id, data: response.data, silent };
    } catch (error) {
      console.log('❌ API error:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchFavSalons = createAsyncThunk(
  'data/fetchFavSalons',
  async ({ userId, silent = false }, { rejectWithValue }) => {
    try {
      const response = await getFvrtSalons(userId);
      console.log('🔥 fetchFavSalons called for user:', response.data);
      return { userId, data: response.data, silent };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchProducts = createAsyncThunk(
  'data/fetchProducts',
  async ({ categoryId, silent = false }, { rejectWithValue }) => {
    try {
      const response = await getAllProducts(categoryId);
      console.log('reeedsa', response);
      return { categoryId, data: response.data, silent };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchTechnicians = createAsyncThunk(
  'data/fetchTechnicians',
  async ({ serviceId, silent = false }, { rejectWithValue }) => {
    try {
      const res = await getStylistByServiceId(serviceId);
      console.log(
        '✅ getStylistByServiceId full response:====',
        res.data.technicianId,
      );
      return { data: res.data.technicianId, serviceId, silent };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const fetchStylistServices = createAsyncThunk(
  'data/fetchStylistServices',
  async ({ salonId, technicianId, silent = false }, { rejectWithValue }) => {
    try {
      const res = await getServicesByStylistId(salonId, technicianId);
      console.log('✅ getServicesByStylistId full response:', res.data);
      return { data: res.data, salonId, technicianId, silent }; // ✅ small tweak here
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// export const fetchStylistTimeSlots = createAsyncThunk(
//   'data/fetchStylistTimeSlots',
//   async ({ stylistId, date, silent = false }, { rejectWithValue }) => {
//     try {
//       const res = await getTimeSlotsByDate(stylistId, date);
//       console.log('✅ getServicesByStylistId full response:', res.data);
//       return { data: res.data, stylistId, date, silent }; // ✅ small tweak here
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   },
// );
export const fetchStylistTimeSlots = createAsyncThunk(
  'data/fetchStylistTimeSlots',
  async ({ stylistId, date, silent = false }, { rejectWithValue }) => {
    try {
      const res = await getTimeSlotsByDateAndStylistId(stylistId, date);
      console.log('✅ Time slots fetched:', res.data);
      return { stylistId, date, data: res.data, silent };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchBookingsByUserId = createAsyncThunk(
  'data/fetchBookingsByUserId',
  async ({ userId, status, silent = false }, { rejectWithValue }) => {
    try {
      const response = await getAllBookingsByUserId(userId, status);
      return { userId, status, data: response, silent };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchProductOrdersByStatus = createAsyncThunk(
  'data/fetchProductOrdersByStatus',
  async ({ userId, status, silent = false }, { rejectWithValue }) => {
    try {
      const response = await getAllProductsOrdersByStatus(userId, status);
      return { userId, status, data: response, silent };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchAllProductsData = createAsyncThunk(
  'data/fetchAllProductsData',
  async ({ silent = false } = {}, { rejectWithValue }) => {
    try {
      const response = await fetchAllProducts(); // your API call
      return { data: response?.data, silent };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSalonReviewsById = createAsyncThunk(
  'data/fetchSalonReviewsById',
  async ({ salonId, silent = false }, { rejectWithValue }) => {
    try {
      const response = await getReviewsBySalonId(salonId);
      return { salonId, data: response?.data, silent };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const fetchProductReviewsById = createAsyncThunk(
  'data/fetchProductReviewsById',
  async ({ productId, silent = false }, { rejectWithValue }) => {
    try {
      const response = await getReviewsByProductId(productId);
      return { productId, data: response?.data, silent };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// =============== 🧱 Slice ===============
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    categories: [],
    categoriesCache: null,
    salons: [],
    salonsById: {},
    nearbySalonsCache: {}, // 🧠 cache nearby data
    favSalons: [],
    favSalonsCache: {},
    allProducts: {},
    technicians: [],
    techniciansCache: {},
    stylistServices: [],
    allProductsData: [],
    stylistServicesCache: {},
    stylistTimeSlots: {},
    stylistTimeSlotsCache: {},
    bookingsByUser: {},
    productOrders: {},
    salonReviews: {},
    productReviews: {},
    loading: {
      categories: false,
      salons: false,
      salonById: false,
      favSalons: false,
      nearBy: false,
      allProducts: false,
      technicians: false,
      stylistServices: false,
      stylistTimeSlots: false,
      bookingsByUser: false,
      productOrders: false,
      allProductsData: false,
      salonReviews: false,
      productReviews: false,
    },
    error: {
      categories: null,
      salons: null,
      salonById: null,
      favSalons: null,
      nearby: null,
      allProducts: null,
      technicians: null,
      stylistServices: null,
      stylistTimeSlots: null,
      bookingsByUser: null,
      productOrders: null,
      allProductsData: null,
      salonReviews: null,
      productReviews: null,
    },
  },
  reducers: {
    clearSalonCache: state => {
      state.salonsById = {};
      state.nearbySalonsCache = {};
      state.favSalonsCache = {};
    },
    setFavSalons: (state, action) => {
      const { userId, salons } = action.payload;
      state.favSalonsCache[userId] = salons;
      state.favSalons = salons; // optional: keep both in sync
    },
    setSalons: (state, action) => {
      state.salons = action.payload;
    },
    setProducts: (state, action) => {
      const { categoryId, data } = action.payload;
      state.allProducts[categoryId] = data; // ✅ store per-category cache
    },
    setTechnicians: (state, action) => {
      state.technicians = action.payload;
    },
    setStylistServices: (state, action) => {
      state.stylistServices = action.payload;
    },
    setStylistTimeSlots: (state, action) => {
      state.stylistTimeSlots = action.payload;
    },
  },
  extraReducers: builder => {
    handleAsync(builder, fetchCategories, 'categories', (state, action) => {
      state.categories = action.payload.data; // ✅ not action.payload
      state.categoriesCache = action.payload.data; // optional cache
    });

    // ✅ CACHED nearby salons
    handleAsync(builder, fetchNearbySalons, 'nearBy', (state, action) => {
      const { data, lat, lng, serviceId } = action.payload;
      const cacheKey = `${serviceId}_${lat.toFixed(3)}_${lng.toFixed(3)}`;
      state.nearbySalonsCache[cacheKey] = data;
      state.salons = data; // optional: set main list
    });

    handleAsync(builder, fetchSalonById, 'salonById', (state, action) => {
      const { id, data } = action.payload;
      console.log('✅ Salon fetched successfully:', id, data);
      state.salonsById[id] = data;
    });

    handleAsync(builder, fetchFavSalons, 'favSalons', (state, action) => {
      const { userId, data } = action.payload;
      state.favSalonsCache[userId] = data;
      state.favSalons = data;
    });
    handleAsync(builder, fetchProducts, 'allProducts', (state, action) => {
      const { categoryId, data } = action.payload;
      state.allProducts[categoryId] = data; // ✅ Cache per category
    });
    handleAsync(builder, fetchTechnicians, 'technicians', (state, action) => {
      const { data, serviceId } = action.payload;
      state.techniciansCache[serviceId] = data;
      state.technicians = data; // ✅ Set the active list too
    });
    handleAsync(
      builder,
      fetchStylistServices,
      'stylistServices',
      (state, action) => {
        const { data, salonId, technicianId } = action.payload;
        const cacheKey = `${salonId}_${technicianId}`;
        state.stylistServicesCache[cacheKey] = data || [];
        state.stylistServices = data;
      },
    );

    handleAsync(
      builder,
      fetchStylistTimeSlots,
      'stylistTimeSlots',
      (state, action) => {
        const { stylistId, date, data } = action.payload;
        const cacheKey = `${stylistId}_${date}`;
        state.stylistTimeSlots[cacheKey] = data; // ✅ Cache result
      },
    );

    handleAsync(
      builder,
      fetchBookingsByUserId,
      'bookingsByUser',
      (state, action) => {
        const { userId, status, data } = action.payload;
        const cacheKey = `${userId}_${status}`;
        state.bookingsByUser[cacheKey] = data;
      },
      (state, action) => {
        // ✅ pending
        if (!action.meta.arg.silent) {
          state.loading.bookingsByUser = true;
        }
      },
      state => {
        // ✅ rejected
        state.loading.bookingsByUser = false;
      },
    );

    // 📦 Handle Fetch Product Orders
    handleAsync(
      builder,
      fetchProductOrdersByStatus,
      'productOrders',
      (state, action) => {
        const { userId, status, data } = action.payload;
        const cacheKey = `${userId}_${status}`;
        state.productOrders[cacheKey] = data;
      },
    );

    handleAsync(
      builder,
      fetchAllProductsData,
      'allProductsData',
      (state, action) => {
        state.allProductsData = action.payload.data;
      },
    );

    handleAsync(
      builder,
      fetchSalonReviewsById,
      'salonReviews',
      (state, action) => {
        const { salonId, data } = action.payload;
        state.salonReviews[salonId] = data;
      },
    );
    handleAsync(
      builder,
      fetchProductReviewsById,
      'productReviews',
      (state, action) => {
        const { productId, data } = action.payload;
        state.productReviews[productId] = data;
      },
    );

    builder.addCase('data/clearBookingsCacheForStatus', (state, action) => {
      const key = action.payload;
      delete state.bookingsByUser[key];
    });
  },
});

export const {
  clearSalonCache,
  setFavSalons,
  setTechnicians,
  setStylistServices,
} = dataSlice.actions;
export default dataSlice.reducer;
