import authActions from "./auth.actions"
import appActions from "./app.actions"
import storiesActions from "./stories.actions"
import favoritesStoriesActions from "./favorites.actions"
import tabsActions from "./tabs.actions"
import tempActions from "./temp.actions"

export default {
  ...authActions,
  ...appActions,
  ...storiesActions,
  ...favoritesStoriesActions,
  ...tabsActions,
  ...tempActions,
}
