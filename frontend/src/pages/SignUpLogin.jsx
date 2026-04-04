import TopNav from "../components/SignUpLogin/TopNavigation"
import VisualEditSide from "../components/SignUpLogin/VisualEditSide"
import LoginForm from "../components/SignUpLogin/LoginForm"

function SignUpLogin(){
    return (
        <div className="bg-surface font-body text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
            <TopNav/>
            <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <VisualEditSide/>
                    <LoginForm/>
                </div>
            </div>
            <div className="fixed top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-primary-container/20 rounded-full blur-[100px] -z-10"></div>
            <div className="fixed bottom-[-10%] left-[-5%] w-[30rem] h-[30rem] bg-secondary-container/30 rounded-full blur-[100px] -z-10"></div>
        </div>
    )
}

export default SignUpLogin