import { EXPORT_LISTITEM, EXPORT_MOVIEITEM } from './mutation-type'
import listData from '@/data/list_template'

export default {
  getList ({ commit }) {
    commit(EXPORT_LISTITEM, { listData })
  },
  getMovieItem ({ commit }, movieItem) {
    commit(EXPORT_MOVIEITEM, { movieItem })
  }
}