
export default function Home() {
    // get the username from the localStorage
    const username = localStorage.getItem("username");
    return (
        <div>
            <h1 className="welcome">Hello {username}, welcome to our homepage!</h1>            
        </div>
    )
}