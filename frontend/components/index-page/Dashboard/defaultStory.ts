import { getRandomNumber } from "utils/helpers"

const username = "Storymash"

const numberImage = getRandomNumber(1, 20)

const defaultDashboardStory: Story = {
  title: "¡Bienvenido!",
  category: [],
  image: `/img/default/default_story_${numberImage}.jpg`,
  views: [],
  parts: [
    {
      story: "prueba",
      author: username,
      content:
        "Storymash es una nueva forma de crear y descubrir historias. Unete a nuestra comunidad y empieza a descubrir un sin fin de historias.",
      likes: [],
      comments: [],
      createdAt: new Date(),
    },
  ],
  author: {
    _id: "id_user",
    image: "/img/logo.png",
    username,
  },
}

export default defaultDashboardStory
