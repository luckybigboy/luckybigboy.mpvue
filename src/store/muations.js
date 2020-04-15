import { EXPORT_LISTITEM, EXPORT_MOVIEITEM } from './mutation-type'

export default {
  [EXPORT_LISTITEM] (state, { listData }) {
    state.listArr = listData;
  },
  [EXPORT_MOVIEITEM] (state, { movieItem }) {
    state.movieItem = movieItem;
  }
}