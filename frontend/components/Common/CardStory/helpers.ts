export const getUrl = (redirect: boolean, story: Story) => {
  const urlStory = {
    href: "/story/read/[id]",
    as: `/story/read/${story._id}`,
  }
  const noRedirect = {
    href: "#",
    as: "",
  }
  return redirect ? urlStory : noRedirect
}
