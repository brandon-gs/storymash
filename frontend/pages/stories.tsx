import React from "react"
// Types
import { NextPage } from "next"
// Components
import { Layout, ListStories } from "components"
import { Box, Container, Typography } from "@material-ui/core"
import Head from "next/head"
// Hooks
import { useRouter } from "next/router"
// ServerProps
import { configStoriesBySearch, configUser } from "services"
// Helpers
import { wrapper } from "store"

interface StoriesPageProps {
  stories: Story[]
}

const StoriesPage: NextPage<StoriesPageProps> = ({ stories }) => {
  const router = useRouter()
  const { search } = router.query

  return (
    <Layout>
      <Head>
        <title>Storymash | Buscando {search} </title>
      </Head>
      <Container maxWidth="lg">
        <Box mt={3}>
          <Typography component="h1" variant="h4" align="center">
            {stories.length === 0 ? "No se encontraron resultados" : "Resultado de la búsqueda"}
          </Typography>
          <Box mt={3}>
            <ListStories stories={stories} />
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  await configUser(ctx, store)
  const stories = await configStoriesBySearch(ctx)
  return {
    props: {
      stories,
    },
  }
})

export default StoriesPage
