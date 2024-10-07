import { NavLink } from "react-router-dom"
// import { useSelector } from "react-redux"

const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: 'about', text: 'about' },
]

export const NavLinks = () => {
  // const user = useSelector((state) => state.userState.user)
  return (
    <>
        {links.map((link) => {
            const {id, url, text} = link
            if ((url === "checkout" || url === "orders")) return null
            return (
                <li key={id}>
                    <NavLink className="capitalize" to={url}> {text} </NavLink>
                </li>
            )
        })}
    </>
  )
}