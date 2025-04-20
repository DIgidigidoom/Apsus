// const { Link, NavLink } = ReactRouterDOM
// import gmailLogo from '../assets/img/Gmail-logo-home.png'
// import noteLogo from '../assets/img/note-logo.png'


// export function Home() {

//     return <section className="home">
//         <div className="main-logo-container">
//             <img src=".../assets/img/Apsus-logo.png" alt="" />
//             <p>All Your Friendly Apps In One Place</p>
//         </div>
//         <div className="icons-nav-container">
//             <NavLink to="/mail">
//                 <img className="mail-logo-home" src=".../assets/img/Gmail-logo-home.png" alt="" />
//             </NavLink>
//             <NavLink to="/note">
//                 <img className="note-logo-home" src=".../assets/img/note-logo.png" alt="" />
//             </NavLink>
//         </div>
//     </section>
// }
// const { Link, NavLink } = ReactRouterDOM
import ApsusLogo from '../assets/img/Apsus-logo.png';
import GmailLogo from '../assets/img/Gmail-logo-home.png';
import NoteLogo from '../assets/img/note-logo.png';

export function Home() {
  return (
    <section className="home">
      <div className="main-logo-container">
        <img src={ApsusLogo} alt="Apsus Logo" />
        <p>All Your Friendly Apps In One Place</p>
      </div>
      <div className="icons-nav-container">
        <NavLink to="/mail">
          <img className="mail-logo-home" src={GmailLogo} alt="Gmail" />
        </NavLink>
        <NavLink to="/note">
          <img className="note-logo-home" src={NoteLogo} alt="Note" />
        </NavLink>
      </div>
    </section>
  );
}


// return <section className="home">
// <div className="main-logo-container">
//     <img src="./../assets/img/Apsus-logo.png" alt="" />
//     <p>All Your Friendly Apps In One Place</p>
// </div>
// <div className="icons-nav-container">
//     <NavLink to="/mail">
//         <img className="mail-logo-home" src="./../assets/img/Gmail-logo-home.png" alt="" />
//     </NavLink>
//     <NavLink to="/note">
//         <img className="note-logo-home" src="./../assets/img/note-logo.png" alt="" />
//     </NavLink>
// </div>
// </section>