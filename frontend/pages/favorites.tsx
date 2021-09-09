import React from "react"
// Types
import { NextPage } from "next"
// Components
import { FavoritesStories, Layout } from "components"
import { Box, Container } from "@material-ui/core"
import Head from "next/head"
// ServerProps
import { configUser, configFavoritesStories } from "services"
// Helpers
import { wrapper } from "store"

interface StoriesPageProps {
  stories: Story[]
}

const PlankPage: NextPage<StoriesPageProps> = () => {
  return (
    <Layout>
      <Head>
        <title>Storymash | Favoritas</title>
      </Head>
      <Container maxWidth="lg">
        <Box mt={3}>
          <FavoritesStories />
        </Box>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  await configUser(ctx, store)
  await configFavoritesStories(ctx, store)
  return {
    props: {},
  }
})

export default PlankPage
