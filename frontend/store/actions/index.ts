import authActions from "./auth.actions"
import appActions from "./app.actions"
import storiesActions from "./stories.actions"
import favoritesStories from "./favorites.actions"

export default {
  ...authActions,
  ...appActions,
  ...storiesActions,
  ...favoritesStories,
}
