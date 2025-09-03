import { FaUserFriends } from "react-icons/fa";
import { GiShakingHands } from "react-icons/gi";
import { SlChart } from "react-icons/sl";
import { IoCard } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiFillThunderbolt } from "react-icons/ai";
import { VscBook } from "react-icons/vsc";
import { SquareCheckBig } from "lucide-react";

function ServicePage() {
  return (
    <div className="w-full  font-poppins bg-[#003B42] text-white">
      <div className="text-primary-200 pt-31 size-10  w-full border-b-1 fixed z-10"></div>
      <div className="text-center  capitalize p-20 ">
        <div className="pt-30 space-y-4">
          <h1 className="text-8xl font-extrabold">our services</h1>
          <p className="text-3xl ">
            Empowering to save smarter,Grow faster ,and achieve more <br />
            _together{" "}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 pt-10 ">
          <img
            className="w-200 h-[401px] "
            src="image/a7340be7921cddd2db3026831c360300e38943b4.jpg"
            alt=""
          />
          <img
            className="w-200 h-[401px]"
            src="image/9be5ea9f89818e29af05a4a31e94a933c1cfd2d9.jpg"
            alt=""
          />
        </div>
        <div className="w-full h-[300px]">
          <div className="grid grid-cols-2 gap-10 pt-10 ">
            <div className="w-[646px] h-[300px] grid justify-between  text-left">
              <FaUserFriends className="size-12 text-secondary-300" />
              <h1 className="text-[#F4F4F4] text-4xl font-bold">
                Create a Tontine circle
              </h1>
              <span className="text-[#F4F4F4] text-xl w-100  font-poppins">
                Start your own saving group with 5-20 trusted friend, family or
                colleagues. set the rule, invite members, and begin building
                weath together
              </span>
            </div>
            <div className="w-[646px] h-[300px] grid justify-between  text-left">
              <div className="flex gap-2">
                <GiShakingHands className="size-12" />
                <FaUserFriends className="size-12 text-secondary-300" />
              </div>

              <h1 className="text-[#F4F4F4] text-4xl font-bold">
                Join Existing Group
              </h1>
              <span className="text-[#F4F4F4] text-xl w-110 font-poppins mb-20">
                Don`t have a circle yet? join an already active tontine that
                matches your goals, schedule, contribution level.
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 pt-10 ">
          <img
             className="w-200 h-[401px] "
            src="image/3d7d19d46a8b49b810ff346704e80eab1ba710fb.jpg"
            alt=""
          />
          <img
            className="w-200 h-[401px] "
            src="image/b52ee2eadca59daa367f27ffeb421731a953fc98.jpg"
            alt=""
          />
        </div>
        <div className="w-full h-[388px]">
          <div className="grid grid-cols-2 gap-10 pt-10 ">
            <div className="w-[646px] h-[300px] grid justify-between  text-left">
              <IoCard className="size-12 text-secondary-300" />
              <h1 className="text-[#F4F4F4] text-4xl font-bold">
                secure contribution
              </h1>
              <span className="text-[#F4F4F4]  w-110 text-xl font-poppins">
                Easly contribute via mobile money or bank transfer.Every
                transaction is encrypted and tracked to insure transparency and
                trust
              </span>
            </div>
            <div className="w-[646px] h-[300px] grid justify-between  text-left">
              <div className="flex gap-2">
                <SlChart className="size-12 text-secondary-300" />
              </div>

              <h1 className="text-[#F4F4F4] text-4xl  font-bold">
                Track & manage your Circle
              </h1>
              <span className="text-[#F4F4F4]  w-100 text-xl font-poppins ">
                Stay on top of your savings with real time dashboards. View
                contributions, payout schedules, and group performance all in
                one place.
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 pt-10 ">
          <img
             className="w-200 h-[401px] "
            src="image/db8ca82f6fb9ef4a4ed0da74a73fea1d2022c46e.jpg"
            alt=""
          />
          <img
             className="w-200 h-[401px] "
            src="image/a1333eb4795af0a5477d96165b386faa1f4921f7.jpg"
            alt=""
          />
        </div>
        <div className="w-full h-[388px]">
          <div className="grid grid-cols-2 gap-10 pt-10 ">
            <div className="w-[646px] h-[300px] grid justify-between  text-left">
              <div className="flex gap-2">
                <AiFillThunderbolt className="size-15 text-secondary-300" />
                <IoIosNotificationsOutline className="size-15 text-secondary-300" />
              </div>
              <h1 className="text-[#F4F4F4] text-4xl font-bold">
                Autometed Reminders
              </h1>
              <span className="text-[#F4F4F4]  w-110 text-xl font-poppins mb-20">
                Never miss a payment. Get instant SMS or Email reminders when
                it`s time to contribute or when your payout is coming up.
              </span>
            </div>
            <div className="w-[646px] h-[300px] grid justify-between  text-left">
              <div className="flex gap-1 items-center">
                <img
                  src="image/2064495_education_graduation_learn_school_student_icon.svg"
                  className="size-20"
                />
                <VscBook className="size-15 text-secondary-300" />
              </div>

              <h1 className="text-[#F4F4F4] text-4xl font-bold">
                Financial Literacy Support
              </h1>
              <span className="text-[#F4F4F4]  w-110 text-xl font-poppins mb-20">
                Access tips,guides,and workshop designed to help you make better
                financial decision and maximize your savings potential{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="text-7xl mb-10">why choose Aguka Services</h1>
          <img
            src="image/a37628210e9032f7556be6b22e02808bb3992ac1.jpg"
            alt="why choose aguka"
            className="w-300 h-150 mt-4 ml-70 rounded-[30px]"
          />
          <div className="grid grid-cols-2 mt-10 mb-15">
            <div className="w-100  mt-10 ml-[190px]">
              <div className="flex  gap-2 items-center p-2 bg-[#344A46]">
                <SquareCheckBig className="size-10 text-[#64DB86]" />
                <span className="text-3xl font-bold font-poppins">
                  Simple & transparent
                </span>
              </div>
            </div>
            <div className="w-100  mt-10 ">
              <div className="flex  gap-2 items-center p-2 bg-[#344A46]">
                <SquareCheckBig className="size-10 text-[#64DB86]" />
                <span className="text-3xl font-bold font-poppins">
                  safe & secure
                </span>
              </div>
            </div>
            <div className="w-150  mt-10 ml-[190px]">
              <div className="flex  gap-2 items-center p-2 bg-[#344A46]">
                <SquareCheckBig className="size-10 text-[#64DB86]" />
                <span className="text-3xl font-bold font-poppins">
                  Community_Powered Wealth Building
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
              <button className="bg-[#F9A825] text-black p-4 rounded-2xl cursor-pointer">
                Create your circle
              </button>
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
