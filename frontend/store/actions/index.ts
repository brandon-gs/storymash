import authActions from "./auth.actions"
import appActions from "./app.actions"
import storiesActions from "./stories.actions"
import favoritesStoriesActions from "./favorites.actions"
import tabsActions from "./tabs.actions"

export default {
  ...authActions,
  ...appActions,
  ...storiesActions,
  ...favoritesStoriesActions,
  ...tabsActions,
}
