import axios from "axios"

type StoryRequest = {
  title: string
  category: Array<string>
}

export async function createStory(
  body: { story: StoryRequest; part: { content: string } },
  token: string
): Promise<User | Message> {
  try {
    const { data } = await axios.post("/api/story/", body, {
      headers: { authorization: token },
    })
    return data
  } catch (error) {
    return { message: "Error al crear historia" }
  }
}

export async function editStory(
  idStory: string,
  body: StoryRequest,
  token: string
): Promise<User | Message> {
  try {
    const { data } = await axios.put(`/api/story/${idStory}`, body, {
      headers: { authorization: token },
    })
    return data
  } catch (error) {
    return { message: "Error al editar historia" }
  }
}

export async function createStoryPart(
  idStory: string,
  part: string,
  token: string
): Promise<User | Message> {
  try {
    const { data } = await axios.post(`/api/story/part/${idStory}`, part, {
      headers: { authorization: token },
    })
    return data.user
  } catch (error) {
    return { message: "Error al agregar otra parte a la historia" }
  }
}

export async function editStoryPart(
  idStoryPart: string,
  body: { content: string },
  token: string
): Promise<User | Message> {
  try {
    const { data } = await axios.put(`/api/story/part/${idStoryPart}`, body, {
      headers: { authorization: token },
    })
    return data.user
  } catch (error) {
    return { message: "Error al editar parte de la historia" }
  }
}
