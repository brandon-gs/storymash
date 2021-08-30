import NotFound from "./index"
// Testing-libary
import { jestStore, render } from "test/testUtils"

describe("NotFound", () => {
  it("Render NotFound without auth", () => {
    const component = render(<NotFound />, { router: { pathname: "/test/imposible/route" } })
    expect(component.queryByText(/Crear cuenta/i)).toBeTruthy()
    expect(component.queryByText(/Iniciar sesión/i)).toBeTruthy()
    expect(component).toMatchSnapshot()
  })
  it("Render NotFound with auth", () => {
    jestStore.getState().authentication.auth = true
    const component = render(<NotFound />, { router: { pathname: "/test/imposible/route" } })
    expect(component.queryByText(/Ir a la sección de historias/i)).toBeTruthy()
    expect(component).toMatchSnapshot()
  })
})
