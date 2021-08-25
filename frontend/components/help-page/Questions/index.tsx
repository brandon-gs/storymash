import React from "react"
import Image from "next/image"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

export default function Questions() {
  const classes = useStyles()

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        className={classes.title}
        color="primary"
        style={{ margin: "16px 0" }}
      >
        Preguntas frecuentes
      </Typography>
      <Typography component="p" variant="subtitle1" style={{ margin: "8px 0 16px" }}>
        Bienvenido a Storymash, una nueva forma de crear y descubrir historias. Si tienes curiosidad
        y quieres saber de qué va todo esto, has llegado al lugar apropiado. Te invitamos a que
        sigas adelante, porque estás a punto de descubrir todo lo que necesitas saber para
        convertirte en un experto miembro de la comunidad Storymash.
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="primary" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading} component="p">
            ¿Qué es Storymash?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Typography component="p" variant="body1" className={classes.summary}>
            Storymash es una <span className={classes.title}>comunidad literaria</span> en la que
            autores y lectores interactúan desde el comienzo de cada historia . ¿Te imaginas conocer
            la opinión de tus fans desde las primeras líneas de tu relato? ¿O que sean los usuarios
            quienes decidan qué historias continúan? Eso es exactamente lo que te proponemos en
            Storymash.
          </Typography>
          <Image
            width="100%"
            height="64%"
            layout="responsive"
            src="/img/register.jpg"
            className={classes.image}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="primary" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading} component="p">
            ¿Cómo funciona Storymash?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Typography component="p" variant="body1" className={classes.summary}>
            No te asustes, la idea es muy simple: cada usuario tiene una{" "}
            <span className={classes.title}>caja </span>con un tamaño máximo para escribir el
            <span className={classes.title}>comienzo de una historia</span>. Una vez publicada, para
            poder continuarla tendrás que recibir un número determinado de “
            <span className={classes.title}>me gusta</span>”, que funcionarán a modo de votos. Una
            vez que lo consigas, <span className={classes.title}>podrás añadir más cajas</span> con
            más espacio y publicar las siguientes partes de tu relato libremente. El número de “me
            gusta” necesarios para continuar varía, pero no te preocupes. Te diremos cuántos
            necesitas :)
          </Typography>
          <Image
            width="100%"
            height="64%"
            layout="responsive"
            src="/img/questions/question_2.png"
            className={classes.image}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="primary" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading} component="p">
            ¿Puedo personalizar mi perfil?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Typography component="p" variant="body1" className={classes.summary}>
            ¡Por supuesto! Puedes cambiar tu imagen, nombre de usuario, poner el link de tu web y
            otros datos más. Para ello, debes hacer clic en el icono con tu avatar y seleccionar “Tu
            perfil”. Una vez allí solo tienes que hacer clic sobre el botón “editar”.
          </Typography>
          <Box maxWidth={355} maxHeight={168} minHeight="100%" minWidth="auto" marginX="auto">
            <Image
              width={355}
              height={168}
              layout="intrinsic"
              src="/img/questions/question_3.png"
              className={classes.imageHeight}
              quality={100}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="primary" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading} component="p">
            ¿Qué son los "me gusta" en las historias?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Typography component="p" variant="body1" className={classes.summary}>
            El <span className={classes.title}>"like"</span> o{" "}
            <span className={classes.title}>"me gusta"</span> en una historia se usa para indicar
            que te gusta lo que el autor ha escrito. Él recibirá una notificación de que te ha
            gustado su historia. ¡Es la mejor forma de premiar su trabajo! Además, ese relato se
            añadirá a tu <span className={classes.title}>lista de favoritos </span>para que puedas
            encontrarlo fácilmente. Dar like es muy sencillo: solo tienes que hacer clic en el
            corazón blanco que aparece en la esquina inferior de cada caja, que cambiará de color en
            cuanto lo hagas. Puedes dar “me gusta” a todas las cajas de una historia.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="primary" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading} component="p">
            ¿Cómo puedo seguir a un usuario?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Typography component="p" variant="body1" className={classes.summary}>
            ¡Muy fácil! Solo tienes que <span className={classes.title}>entrar en su perfil</span>{" "}
            (haciendo clic sobre su avatar en cualquiera de sus historias) y presionar el{" "}
            <span className={classes.title}>bóton "Seguir"</span>
          </Typography>
          <Box maxWidth={636} maxHeight={321} minWidth="auto" minHeight="100%" marginX="auto">
            <Image
              width={636}
              height={321}
              layout="intrinsic"
              src="/img/questions/question_4.png"
              quality={100}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Container>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginBottom: theme.spacing(6),
    },
    title: {
      fontWeight: "bold",
    },
    image: {
      width: "100%",
    },
    imageHeight: {
      margin: "auto",
      width: "max-content",
      height: "100%",
    },
    summary: {
      color: theme.palette.grey[700],
      marginBottom: theme.spacing(2),
    },
    heading: {
      fontSize: theme.typography.pxToRem(17),
      fontWeight: theme.typography.fontWeightRegular,
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
  })
)
