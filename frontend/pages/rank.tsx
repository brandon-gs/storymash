import React, { useEffect, useState } from "react"
// Components
import { CircleLoader, Layout, ListStories } from "components"
import { Box, Container, Typography } from "@material-ui/core"
import Head from "next/head"
// ServerProps
import { configUser } from "services"
// Helpers
import { wrapper } from "store"
// Hooks
import { useSelector } from "react-redux"
import { useThunkDispatch } from "hooks"
// Redux Actions
import actions from "store/actions"

const StoriesRankPage = () => {
  const dispatch = useThunkDispatch()
  const [loading, setIsLoading] = useState<boolean>(true)
  const { stories } = useSelector(state => state)

  useEffect(() => {
    const getRankStories = async () => {
      await dispatch(actions.asyncUpdateDataStories(stories))
      setIsLoading(false)
    }
    if (loading) {
      getRankStories()
    }
  }, [dispatch, stories, loading])

  return (
    <Layout>
      <Head>
        <title>Storymash | Ranking </title>
      </Head>

      <Container maxWidth="lg">
        {loading ? (
          <CircleLoader />
        ) : (
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
        )}
      </Container>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  await configUser(ctx, store)
  return {
    props: {},
  }
})

export default StoriesRankPage
