import "./Notification2.css"
import Navbar from "../components/Navbar";


export default function Notification(){

    const notificationData = [
        {
            id: 1,
            name: "Jhon Doe",
            notifMessage: "posted an errand",
            postMessage:"Looking for a plumber",
            time: "10 mins ago",
            postImg: "/images/post1.jpg",
            profileImg: "/images/profile1.jpg"
        },
        {
            id: 1,
            name: "Richard Miles",
            notifMessage: "Approved your application",
            postMessage:"Your application is approved please go to the said location.",
            time: "10 mins ago",
            postImg: "/images/post2.jpg",
            profileImg: "/images/profile2.jpg"
        }
    ]

    const cardList = notificationData.map(data =>([
        <NotificationCard 
            key={data.id}
            name={data.name}
            notifMessage={data.notifMessage}
            time={data.time}
            postImg={data.postImg}
            postMessage={data.postMessage}
            profileImg={data.profileImg}
        />
    ]))

    function NotificationCard(props){
        return(
            <div className="notif-card-container">
               <div className="notif-card-content">
                    <img src={props.profileImg} className="notif-img" alt="profile"/>
                    <div className="notif-details">
                        <div style={{
                            display: "flex",
                            gap: "5px"
                        }}>
                            <p style={{fontWeight: "bold"}} className="notif-name">{props.name}</p>
                            <p className="notif-message">{props.notifMessage}</p>
                        </div>
                        <p className="notif-post-message">{props.postMessage}</p>
                        <p className="notif-time">{props.time}</p>
                    </div>
                    <img src={props.postImg} className="post-img" alt="post"/>
               </div>
            </div>
        )
    }


    return(
        <div className="notification2-container">
            <Navbar
        page1="HOME" 
        home={`/e-home`}
        page2="COMMISSIONS"
        commissionList={`/commissions`}
        page3="APPLICANTS"
        applicants={`/applicants`}
        map={`/map`}
        button="SIGN OUT"
        pageButton="/sign-in"
      />
            <main className="notification-main">
                <div style={{
                    display: "flex",
                    gap: "10px"
                }}>
                    <p className="notification-title">Notifications</p>
                    <img src="/images/notification_icon.svg" className="icon" alt="notification_icon"/>
                </div>
                <div className="notification-list">
                    {cardList}
                </div> 
            </main>
        </div>
    )
}