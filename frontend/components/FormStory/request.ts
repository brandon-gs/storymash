import axios from "axios"

export async function createStory(
  body: { story: Story; part: StoryPart },
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
  body: Story,
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
  body: StoryPart,
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
