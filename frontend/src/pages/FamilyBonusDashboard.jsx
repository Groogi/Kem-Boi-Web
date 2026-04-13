import TopAppBar from "../components/FamilyDashboard/TopAppBar"
import SidebarNavFamily from "../components/FamilyDashboard/SidebarNavFamily"
import WelcomeSectionFamily from "../components/FamilyDashboard/WelcomeSectionFamily"
import DecorativeAbstract from "../components/FamilyDashboard/DecorativeAbstract"
import PrimaryBonusCard from "../components/FamilyDashboard/PrimaryBonusCard"
import ProgressBar from "../components/FamilyDashboard/ProgressBar"
import ImageBleed from "../components/FamilyDashboard/ImageBleed"
import GiveawayCard from "../components/FamilyDashboard/GiveawayCard"
import ComingSoonGrid from "../components/FamilyDashboard/ComingSoonGrid"
import FlavourFloat from "../components/FamilyDashboard/FlavourFloat"
import FooterFamily from "../components/FamilyDashboard/FooterFamily"
import MobileBottomNavbar from "../components/FamilyDashboard/MobileBottomNavbar"

function FamilyBonusDashboard(){
    return (
        <div className="bg-background text-on-background">
            <TopAppBar/>
            <SidebarNavFamily/>
            <div className="pt-24 pb-12 px-6 lg:ml-64 max-w-7xl">
                <header className="mb-12">
                    <div className="relative overflow-hidden bg-primary-container rounded-xl p-8 lg:p-12">
                        <WelcomeSectionFamily/>
                        <DecorativeAbstract/>
                    </div>
                </header>
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="md:col-span-2 bg-surface-container-lowest rounded-lg p-8 flex flex-col justify-between relative overflow-hidden group">
                        <div className="relative z-10">
                            <PrimaryBonusCard/>
                            <ProgressBar/>
                        </div>
                        <ImageBleed/>
                    </div>
                    <GiveawayCard/>
                </section>
                <ComingSoonGrid/>
                <FlavourFloat/>
            </div>
            <FooterFamily/>
            <MobileBottomNavbar/>
        </div>
    )
}

export default FamilyBonusDashboard