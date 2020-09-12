import authActions from "./auth.actions"
import appActions from "./app.actions"
import storiesActions from "./stories.actions"

export default {
  ...authActions,
  ...appActions,
  ...storiesActions,
}
