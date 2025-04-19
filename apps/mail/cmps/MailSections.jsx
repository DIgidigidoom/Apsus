const { Outlet } = ReactRouterDOM

export function MailSection({ children }) {
    return (
        <div className="main-mail-container">
            <Outlet/>
        </div>
    )
}