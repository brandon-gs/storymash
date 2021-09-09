export enum MenuRoutes {
  HomeIndex = 0,
  PlankIndex = 1,
  FavoriteIndex = 2,
  TrendingIndex = 3,
  RankIndex = 4,
}

export const MenuTabsRoutes: Record<string, number> = {
  "/": MenuRoutes.HomeIndex,
  "/plank": MenuRoutes.PlankIndex,
  "/favorites": MenuRoutes.FavoriteIndex,
  "/trending": MenuRoutes.TrendingIndex,
  "/rank": MenuRoutes.RankIndex,
}

export const MenuTabsRoutesArray = ["/", "/plank", "/favorites", "/trending", "rank"]

export const getMenuTabIndex = (pathname: string) => {
  return MenuTabsRoutes.hasOwnProperty(pathname) ? MenuTabsRoutes[pathname] : 5
}
