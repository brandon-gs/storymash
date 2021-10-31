import React from "react"
// Components
import { Layout, ListStories } from "components"
import { Box, Container, Typography } from "@material-ui/core"
import Head from "next/head"
// ServerProps
import { configRankStories, configUser } from "services"
// Helpers
import { wrapper } from "store"
import { useSelector } from "react-redux"

const StoriesRankPage = () => {
  const { stories } = useSelector(state => state)

  return (
    <Layout>
      <Head>
        <title>Storymash | Ranking </title>
      </Head>

      <Container maxWidth="lg">
        <Box mt={3}>
          <Typography component="h1" variant="h4" align="center">
            {stories.docs.length === 0
              ? "No se encontraron resultados"
              : "Resultado de la búsqueda"}
          </Typography>
          <Box mt={3}>
            <ListStories stories={stories.docs} />
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  await configUser(ctx, store)
  await configRankStories(ctx, store)
  return {
    props: {},
  }
})

export default StoriesRankPage
