export enum MenuRoutes {
  HomeIndex = 0,
  PlankIndex = 1,
  FavoriteIndex = 2,
  RankIndex = 3,
  TrendingIndex = 4,
}

export const MenuTabsRoutes: Record<string, number> = {
  "/": MenuRoutes.HomeIndex,
  "/plank": MenuRoutes.PlankIndex,
  "/favorites": MenuRoutes.FavoriteIndex,
  "/rank": MenuRoutes.RankIndex,
  "/trending": MenuRoutes.TrendingIndex,
}

export const MenuTabsRoutesArray = ["/", "/plank", "/favorites", "/rank", "/trending"]

export const getMenuTabIndex = (pathname: string) => {
  return MenuTabsRoutes.hasOwnProperty(pathname) ? MenuTabsRoutes[pathname] : 5
}
