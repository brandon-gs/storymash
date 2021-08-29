import axios from "axios"
import { useEffect, useState } from "react"
import { getRandomNumber } from "utils/getRandomNumber"

export default function useRandomStory(useDefault: boolean = false) {
  const [storyLoaded, setStoryLoaded] = useState<boolean>(false)
  const [isDefaultStory, setIsDefaultStory] = useState<boolean>(true)
  const [story, setStory] = useState<Story>(defaultStory)

  // GET RANDOM STORY
  const getRandomStory = async () => {
    try {
      const {
        data: { docs },
      }: RandomStoryResponse = await axios.get("/api/story/random/?limit=10&page=0&offset=0")
      if (docs.length > 0) {
        const idxRandomStory = getRandomNumber(0, docs.length)
        const randomStory = docs[idxRandomStory]
        setStory(randomStory)
        setIsDefaultStory(false)
      } else {
        setStory(defaultStory)
        setIsDefaultStory(true)
      }
    } catch (error) {
      setStory(defaultStory)
      setIsDefaultStory(true)
    }
  }

  useEffect(() => {
    if (!useDefault) {
      getRandomStory()
    }
    setStoryLoaded(true)
  }, [])

  return { story, storyLoaded, isDefaultStory }
}

const username = "Storymash"

const numberImage = getRandomNumber(1, 20)

const defaultStory = {
  title: "¡Bienvenido!",
  category: ["Bienvendo", "Storymash"],
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
