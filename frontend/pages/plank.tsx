import React from "react"
// Types
import { NextPage } from "next"
// Components
import { Layout, ListStories, NotFollowers } from "components"
import { Box, Container, Grid, Typography } from "@material-ui/core"
import Head from "next/head"
// ServerProps
import { configUser, configStoriesPlank } from "services"
// Helpers
import { wrapper } from "store"

interface StoriesPageProps {
  stories: Story[]
}

const PlankPage: NextPage<StoriesPageProps> = ({ stories }) => {
  return (
    <Layout>
      <Head>
        <title>Storymash | Tablon</title>
      </Head>
      <Container maxWidth="lg">
        <Box mt={3}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Typography component="h1" variant="h4" align="center">
                Mi tablón
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="p" variant="subtitle1" align="center">
                En esta sección podras encontrar historias de todos los usuarios a los que sigues.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ alignSelf: "normal" }}>
              {stories.length > 0 ? (
                <Box mt={3}>
                  <ListStories stories={stories} />
                </Box>
              ) : (
                <Box mb={4}>
                  <NotFollowers />
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  await configUser(ctx, store)
  const stories = await configStoriesPlank(ctx, store)
  return {
    props: {
      stories,
    },
  }
})

export default PlankPage
