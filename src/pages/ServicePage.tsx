import { FaUserFriends } from "react-icons/fa";
import { GiShakingHands } from "react-icons/gi";
function ServicePage() {
  return (
    <div className="w-full  font-poppins bg-[#003B42] text-white">
      <div className="text-primary-200 pt-31 size-10  w-full border-b-1 fixed z-10"></div>
      <div className="text-center  capitalize p-20 ">
        <div className="pt-30 space-y-3">
          <h1 className="text-8xl font-extrabold">our services</h1>
          <p className="text-4xl ">
            Empowering to save smarter,Grow faster ,and achieve more <br />
            _together{" "}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 pt-10 ">
          <img
            className="w-full h-[461px] "
            src="image/a7340be7921cddd2db3026831c360300e38943b4.jpg"
            alt=""
          />
          <img
            className="w-full h-[461px]"
            src="image/9be5ea9f89818e29af05a4a31e94a933c1cfd2d9.jpg"
            alt=""
          />
        </div>
        <div className="w-full h-[388px]">
          <div className="grid grid-cols-2 gap-10 pt-10 ">
            <div className="w-[646px] h-[388px] grid justify-between  text-left">
              <FaUserFriends className="size-15 text-secondary-300" />
              <h1 className="text-[#F4F4F4] text-[48px] font-bold">
                Create a Tontine circle
              </h1>
              <span className="text-[#F4F4F4] text-[32px] font-poppins">
                Start your own saving group with 5-20 trusted friend, family or
                colleagues. set the rule, invite members, and begin building
                weath together
              </span>
            </div>
            <div className="w-[646px] h-[388px] grid justify-between  text-left">
              <div className="flex gap-2">
                <GiShakingHands className="size-15" />
                <FaUserFriends className="size-15 text-secondary-300" />
              </div>

              <h1 className="text-[#F4F4F4] text-[48px] font-bold">
                Join Existing Group
              </h1>
              <span className="text-[#F4F4F4] text-[32px] font-poppins mb-20">
                Don`t have a circle yet? join an already active tontine that
                matches your goals, schedule, contribution level.
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 pt-10 ">
          <img
            className="w-full h-[461px] "
            src="image/3d7d19d46a8b49b810ff346704e80eab1ba710fb.jpg"
            alt=""
          />
          <img
            className="w-full h-[461px]"
            src="image/b52ee2eadca59daa367f27ffeb421731a953fc98.jpg"
            alt=""
          />
        </div>
        <div className="w-full h-[388px]">
          <div className="grid grid-cols-2 gap-10 pt-10 ">
            <div className="w-[646px] h-[388px] grid justify-between  text-left">
              <FaUserFriends className="size-15 text-secondary-300" />
              <h1 className="text-[#F4F4F4] text-[48px] font-bold">
                secure contribution
              </h1>
              <span className="text-[#F4F4F4] text-[32px] font-poppins">
                Easly contribute via mobile money or bank transfer.Every
                transaction is encrypted and tracked to insure transparency and
                trust
              </span>
            </div>
            <div className="w-[646px] h-[388px] grid justify-between  text-left">
              <div className="flex gap-2">
                <GiShakingHands className="size-15" />
                <FaUserFriends className="size-15 text-secondary-300" />
              </div>

              <h1 className="text-[#F4F4F4] text-[48px]  font-bold">
                Join Existing GroupTrack & manage your Circle
              </h1>
              <span className="text-[#F4F4F4] text-[32px] font-poppins mb-20">
                Stay on top of your savings with real time dashboards. View
                contributions, payout schedules, and group performance all in
                one place.
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 pt-10 ">
          <img
            className="w-full h-[461px] "
            src="image/a1333eb4795af0a5477d96165b386faa1f4921f7.jpg"       
            alt=""
          />
          <img
            className="w-full h-[461px]"
            src="image/9be5ea9f89818e29af05a4a31e94a933c1cfd2d9.jpg"
            alt=""
          />
        </div>
        <div className="w-full h-[388px]">
          <div className="grid grid-cols-2 gap-10 pt-10 ">
            <div className="w-[646px] h-[388px] grid justify-between  text-left">
              <FaUserFriends className="size-15 text-secondary-300" />
              <h1 className="text-[#F4F4F4] text-[48px] font-bold">
                Autometed Reminders
              </h1>
              <span className="text-[#F4F4F4] text-[32px] font-poppins">
                Never miss a payment. Get instant SMS or Email reminders when
                it`s time to contribute or when your payout is coming up.
              </span>
            </div>
            <div className="w-[646px] h-[388px] grid justify-between  text-left">
              <div className="flex gap-2">
                <GiShakingHands className="size-15" />
                <FaUserFriends className="size-15 text-secondary-300" />
              </div>

              <h1 className="text-[#F4F4F4] text-[48px] font-bold">
                Financial Literacy Support
              </h1>
              <span className="text-[#F4F4F4] text-[32px] font-poppins mb-20">
                Access tips,guides,and workshop designed to help you make better
                financial decision and maximize your savings potential{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicePage;
