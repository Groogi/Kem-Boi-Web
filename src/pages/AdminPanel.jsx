import SideNavbar from "../components/Admin/SideNavBar";
import SubNav from "../components/Admin/SubNav";
import UserList from "../components/Admin/UserList";
import BonusEntryForm from "../components/Admin/BonusEntryForm";
import FooterAdmin from "../components/Admin/FooterAdmin";

function AdminPanel(){
    return (
        <>
            <div className="bg-background text-on-surface min-h-screen">
                <SideNavbar/>
                <main className="ml-64 p-8 min-h-screen">
                    <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <SubNav/>                        
                    </header>
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                        <UserList/>
                        <BonusEntryForm/>
                    </div>
                </main>
                <FooterAdmin/>
            </div>
        </>
    )
}

export default AdminPanel;