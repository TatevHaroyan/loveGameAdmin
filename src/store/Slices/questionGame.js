import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import API from '../../services/Api';
var qs = require('querystringify');
const successNotify = () => {
  toast.success("Success Notification !", {
    position: toast.POSITION.TOP_CENTER
  });
};
const errorNotify = () => {
  toast.error("Error Notification !", {
    position: toast.POSITION.TOP_LEFT
  });
};
export const addQuestionGame = createAsyncThunk('game/addQuestionGame', async (data) => {
  const { cb, ...sendData } = data;
  console.log(sendData, "sendDatasendDatasendDatasendData");
  const response = await API.post('/questions/', sendData);
  console.log(response, 'response');
  // cb(response.data);
  return response.data;
});
export const getQuestionGame = createAsyncThunk('game/getQuestionGame', async (search) => {
  let response;
  if (search) {
    response = await API.get(`/questions/${search}`);
  } else {
    response = await API.get(`/questions/`);
  }
  console.log(response, 'response');
  return response.data;
});
const initialState = {
  questionGames: []
};
export const questionGameSlice = createSlice({
  name: 'questionGame',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getQuestionGame.fulfilled, (state, action) => {
      console.log(action.payload, 'action.payload');
      state.questionGames = action.payload;
      console.log(state, 'state');
    });
    builder.addCase(addQuestionGame.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addQuestionGame.rejected, (state) => {
      errorNotify();
    });
    builder.addCase(addQuestionGame.fulfilled, (state, action) => {
      state.questionGames.push(action.payload);
      state.loading = false;
      successNotify();
    });
  },

});

export default questionGameSlice.reducer;
