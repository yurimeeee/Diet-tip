import { createSlice } from "@reduxjs/toolkit";

// 초기 상태 정의
const initialState = {
  documents: [],
  posts: [], // posts로 변경
};

export const mealDBSlice = createSlice({
  name: "mealDB",
  initialState,
  reducers: {
    addDocument: (state, action) => {
      const { collectionName, data } = action.payload;
      state.documents.push({
        collectionName,
        data,
        reply: [],
      });
    },
    addReply: (state, action) => {
      const { collectionName, documentId, replyData } = action.payload;
      const document = state.documents.find(
        (doc) =>
          doc.collectionName === collectionName && doc.data.id === documentId
      );
      if (document) {
        document.reply.push(replyData);
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { addDocument, addReply, setPosts } = mealDBSlice.actions;
export default mealDBSlice.reducer;
