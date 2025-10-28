import { FaUserFriends } from "react-icons/fa";
import { GiShakingHands } from "react-icons/gi";
import { SlChart } from "react-icons/sl";
import { IoCard } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiFillThunderbolt } from "react-icons/ai";
import { VscBook } from "react-icons/vsc";
import { SquareCheckBig } from "lucide-react";
import { Link } from "react-router-dom";

function ServicePage() {
  return (
    <div className="w-full font-poppins bg-[#003B42] text-white">
      <div className="text-primary-200 w-full border-b fixed z-10 h-2"></div>
      <div className="text-center capitalize max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="space-y-4 sm:space-y-6 mb-12">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold">
            our services
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto">
            Empowering to save smarter, Grow faster, and achieve more together
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10">
          <img
            className="w-full h-64 sm:h-80 lg:h-[401px] object-cover rounded-lg"
            src="image/a7340be7921cddd2db3026831c360300e38943b4.jpg"
            alt="Service illustration 1"
          />
          <img
            className="w-full h-64 sm:h-80 lg:h-[401px] object-cover rounded-lg"
            src="image/9be5ea9f89818e29af05a4a31e94a933c1cfd2d9.jpg"
            alt="Service illustration 2"
          />
        </div>
        <div className="mt-12 sm:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-[#002f32] p-6 rounded-xl text-left space-y-4">
              <FaUserFriends className="w-12 h-12 text-secondary-300" />
              <h2 className="text-[#F4F4F4] text-2xl sm:text-3xl lg:text-4xl font-bold">
                Create a Tontine circle
              </h2>
              <p className="text-[#F4F4F4] text-base sm:text-lg lg:text-xl">
                Start your own saving group with 5-20 trusted friend, family or
                colleagues. Set the rules, invite members, and begin building
                wealth together
              </p>
            </div>
            <div className="bg-[#002f32] p-6 rounded-xl text-left space-y-4">
              <div className="flex gap-2">
                <GiShakingHands className="w-12 h-12" />
                <FaUserFriends className="w-12 h-12 text-secondary-300" />
              </div>
              <h2 className="text-[#F4F4F4] text-2xl sm:text-3xl lg:text-4xl font-bold">
                Join Existing Group
              </h2>
              <p className="text-[#F4F4F4] text-base sm:text-lg lg:text-xl">
                Don't have a circle yet? Join an already active tontine that
                matches your goals, schedule, contribution level.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 mt-12">
          <img
            className="w-full h-64 sm:h-80 lg:h-[401px] object-cover rounded-lg"
            src="image/3d7d19d46a8b49b810ff346704e80eab1ba710fb.jpg"
            alt="Service illustration 3"
          />
          <img
            className="w-full h-64 sm:h-80 lg:h-[401px] object-cover rounded-lg"
            src="image/b52ee2eadca59daa367f27ffeb421731a953fc98.jpg"
            alt="Service illustration 4"
          />
        </div>
        <div className="mt-12 sm:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-[#002f32] p-6 rounded-xl text-left space-y-4">
              <IoCard className="w-12 h-12 text-secondary-300" />
              <h2 className="text-[#F4F4F4] text-2xl sm:text-3xl lg:text-4xl font-bold">
                Secure Contribution
              </h2>
              <p className="text-[#F4F4F4] text-base sm:text-lg lg:text-xl">
                Easily contribute via mobile money or bank transfer. Every
                transaction is encrypted and tracked to ensure transparency and
                trust
              </p>
            </div>
            <div className="bg-[#002f32] p-6 rounded-xl text-left space-y-4">
              <div className="flex gap-2">
                <SlChart className="w-12 h-12 text-secondary-300" />
              </div>
              <h2 className="text-[#F4F4F4] text-2xl sm:text-3xl lg:text-4xl font-bold">
                Track & Manage your Circle
              </h2>
              <p className="text-[#F4F4F4] text-base sm:text-lg lg:text-xl">
                Stay on top of your savings with real time dashboards. View
                contributions, payout schedules, and group performance all in
                one place.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 mt-12">
          <img
            className="w-full h-64 sm:h-80 lg:h-[401px] object-cover rounded-lg"
            src="image/db8ca82f6fb9ef4a4ed0da74a73fea1d2022c46e.jpg"
            alt="Service illustration 5"
          />
          <img
            className="w-full h-64 sm:h-80 lg:h-[401px] object-cover rounded-lg"
            src="image/a1333eb4795af0a5477d96165b386faa1f4921f7.jpg"
            alt="Service illustration 6"
          />
        </div>
        <div className="mt-12 sm:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-[#002f32] p-6 rounded-xl text-left space-y-4">
              <div className="flex gap-2">
                <AiFillThunderbolt className="w-10 h-10 text-secondary-300" />
                <IoIosNotificationsOutline className="w-10 h-10 text-secondary-300" />
              </div>
              <h2 className="text-[#F4F4F4] text-2xl sm:text-3xl lg:text-4xl font-bold">
                Automated Reminders
              </h2>
              <p className="text-[#F4F4F4] text-base sm:text-lg lg:text-xl">
                Never miss a payment. Get instant SMS or Email reminders when
                it's time to contribute or when your payout is coming up.
              </p>
            </div>
            <div className="bg-[#002f32] p-6 rounded-xl text-left space-y-4">
              <div className="flex gap-2 items-center">
                <img
                  src="image/2064495_education_graduation_learn_school_student_icon.svg"
                  className="w-12 h-12"
                  alt="Education icon"
                />
                <VscBook className="w-10 h-10 text-secondary-300" />
              </div>
              <h2 className="text-[#F4F4F4] text-2xl sm:text-3xl lg:text-4xl font-bold">
                Financial Literacy Support
              </h2>
              <p className="text-[#F4F4F4] text-base sm:text-lg lg:text-xl">
                Access tips, guides, and workshops designed to help you make
                better financial decisions and maximize your savings potential
              </p>
            </div>
          </div>
        </div>
        <div className="mt-16 sm:mt-24">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-8 sm:mb-10">
            Why choose Aguka Services
          </h2>
          <img
            src="image/a37628210e9032f7556be6b22e02808bb3992ac1.jpg"
            alt="why choose aguka"
            className="w-full max-w-5xl h-48 sm:h-80 lg:h-[600px] mx-auto rounded-3xl object-cover"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 max-w-4xl mx-auto">
            <div className="bg-[#344A46] p-4 rounded-xl">
              <div className="flex gap-2 items-center">
                <SquareCheckBig className="w-8 h-8 sm:w-10 sm:h-10 text-[#64DB86]" />
                <span className="text-lg sm:text-xl lg:text-2xl font-bold">
                  Simple & Transparent
                </span>
              </div>
            </div>
            <div className="bg-[#344A46] p-4 rounded-xl">
              <div className="flex gap-2 items-center">
                <SquareCheckBig className="w-8 h-8 sm:w-10 sm:h-10 text-[#64DB86]" />
                <span className="text-lg sm:text-xl lg:text-2xl font-bold">
                  Safe & Secure
                </span>
              </div>
            </div>
            <div className="bg-[#344A46] p-4 rounded-xl sm:col-span-2 lg:col-span-1">
              <div className="flex gap-2 items-center">
                <SquareCheckBig className="w-8 h-8 sm:w-10 sm:h-10 text-[#64DB86]" />
                <span className="text-lg sm:text-xl lg:text-2xl font-bold">
                  Community-Powered Wealth Building
                </span>
              </div>
            </div>
          </div>
          <img
            src="image/887f3273bca97c5fb03f4741386d1416a39ef45a.jpg"
            alt="why choose aguka"
            className="w-300 h-150 mt-4 ml-70 rounded-[30px]"
          />
          <div className="space-y-15 m-15">
            <h1 className="text-4xl">Ready to start Saving Smarter?</h1>
            <div className="flex gap-10 place-content-center text-3xl font-bold font-poppins ">
              <Link
                to="/registergroup"
                className="bg-[#F9A825] text-black p-4 rounded-2xl cursor-pointer"
              >
                Create your circle
              </Link>
              <button className="bg-[#82807D] text-white p-4 rounded-2xl cursor-pointer ">
                Join a group
              </button>
            </div>
            <div className="place-items-center">
              <hr className="w-300" />
            </div>
          </div>
          <div className="mt-20">
            <span>
              &copy; 2025 Aguka.all rights reserved.Building Wealth through
              community.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicePage;
